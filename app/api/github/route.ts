import { githubUser } from "@/lib/content";

/**
 * Recent public GitHub activity — normalized into a small, render-ready shape,
 * enriched with REAL commit messages / PR titles and REAL deep links.
 *
 * Why this is a bit involved: GitHub's public events feed now returns an
 * *abbreviated* payload — it drops commit messages, PR titles, sizes, etc.
 * (verified against the live API). What it DOES give us is enough to rebuild
 * real links (commit SHA, PR number, branch ref) plus the API URLs to fetch
 * the missing text. So we:
 *   1. Fetch the events feed (1 request).
 *   2. Keep the "PRs & commits" events and take the newest handful.
 *   3. Enrich just those in parallel — one small request each — to pull the
 *      actual commit message / PR title. Failures degrade gracefully.
 *
 * Everything runs server-side and is revalidated every 30 min, so the whole
 * site shares one warm cache and only spends a dozen-ish requests an hour —
 * well inside GitHub's 60/hr unauthenticated ceiling. Set GITHUB_TOKEN to
 * raise that ceiling to 5,000/hr.
 */
export const revalidate = 1800;

type Activity = {
  id: string;
  kind: string;
  kanji: string;
  verb: string;
  repo: string;
  detail?: string;
  url: string;
  date: string;
};

// Only the event types that read as "real work": pushes, PRs, reviews, issues,
// branch/tag/repo creation and releases. Stars/comments are filtered out.
const ALLOWED = new Set([
  "PushEvent",
  "PullRequestEvent",
  "PullRequestReviewEvent",
  "IssuesEvent",
  "CreateEvent",
  "ReleaseEvent",
]);

const REPO_URL = (repo: string) => `https://github.com/${repo}`;
const clip = (s: string, n = 100) =>
  s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

type RawEvent = {
  id: string;
  type: string;
  repo?: { name: string };
  payload?: Record<string, unknown>;
  created_at: string;
};

const token = process.env.GITHUB_TOKEN;
const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "nikhil.me-portfolio",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

// Small cached JSON GET; returns null on any failure so callers can fall back.
async function ghJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: GH_HEADERS, next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Turn one raw event into a rich Activity, fetching the missing text when
// it's cheap and worthwhile (commit message / PR / issue title).
async function enrich(ev: RawEvent): Promise<Activity | null> {
  const repo = ev.repo?.name;
  if (!repo) return null;
  const p = ev.payload ?? {};
  const base = { id: ev.id, kind: ev.type, repo, date: ev.created_at };

  switch (ev.type) {
    case "PushEvent": {
      const sha = p.head as string | undefined;
      const branch = ((p.ref as string) || "").replace("refs/heads/", "");
      const url = sha ? `${REPO_URL(repo)}/commit/${sha}` : REPO_URL(repo);
      let detail: string | undefined;
      if (sha) {
        const c = await ghJson<{ commit?: { message?: string } }>(
          `https://api.github.com/repos/${repo}/commits/${sha}`
        );
        detail = c?.commit?.message?.split("\n")[0];
      }
      return {
        ...base,
        kanji: "打",
        verb: "pushed to",
        detail: detail ? clip(detail) : branch ? `${branch} branch` : undefined,
        url,
      };
    }

    case "PullRequestEvent": {
      const number = p.number as number | undefined;
      const action = (p.action as string) ?? "opened";
      const prRef = p.pull_request as { url?: string } | undefined;
      let title: string | undefined;
      let htmlUrl: string | undefined;
      if (prRef?.url) {
        const pr = await ghJson<{ title?: string; html_url?: string }>(prRef.url);
        title = pr?.title;
        htmlUrl = pr?.html_url;
      }
      const merged = action === "merged";
      const verb =
        merged
          ? "merged a PR in"
          : action === "opened" || action === "reopened"
            ? "opened a PR in"
            : `${action} a PR in`;
      return {
        ...base,
        kanji: merged ? "合" : "結",
        verb,
        detail: title
          ? `#${number} ${clip(title, 80)}`
          : number
            ? `#${number}`
            : undefined,
        url: htmlUrl || (number ? `${REPO_URL(repo)}/pull/${number}` : REPO_URL(repo)),
      };
    }

    case "PullRequestReviewEvent": {
      const pr = p.pull_request as { number?: number; html_url?: string } | undefined;
      const number = pr?.number;
      return {
        ...base,
        kanji: "検",
        verb: "reviewed a PR in",
        detail: number ? `#${number}` : undefined,
        url: pr?.html_url || (number ? `${REPO_URL(repo)}/pull/${number}` : REPO_URL(repo)),
      };
    }

    case "IssuesEvent": {
      const number = p.number as number | undefined;
      const action = (p.action as string) ?? "opened";
      const issueRef = p.issue as { url?: string } | undefined;
      let title: string | undefined;
      let htmlUrl: string | undefined;
      if (issueRef?.url) {
        const issue = await ghJson<{ title?: string; html_url?: string }>(issueRef.url);
        title = issue?.title;
        htmlUrl = issue?.html_url;
      }
      return {
        ...base,
        kanji: "問",
        verb: `${action} an issue in`,
        detail: title ? `#${number} ${clip(title, 80)}` : number ? `#${number}` : undefined,
        url: htmlUrl || (number ? `${REPO_URL(repo)}/issues/${number}` : REPO_URL(repo)),
      };
    }

    case "CreateEvent": {
      const refType = (p.ref_type as string) ?? "repository";
      const ref = p.ref as string | null;
      return {
        ...base,
        kanji: "生",
        verb: `created a ${refType} in`,
        detail: ref ?? undefined,
        url: ref && refType === "branch"
          ? `${REPO_URL(repo)}/tree/${ref}`
          : REPO_URL(repo),
      };
    }

    case "ReleaseEvent": {
      const rel = p.release as
        | { name?: string; tag_name?: string; html_url?: string }
        | undefined;
      return {
        ...base,
        kanji: "発",
        verb: "released",
        detail: rel?.name || rel?.tag_name,
        url: rel?.html_url ?? `${REPO_URL(repo)}/releases`,
      };
    }

    default:
      return null;
  }
}

export async function GET() {
  if (!githubUser) {
    return Response.json({ events: [], ok: false });
  }

  const raw = await ghJson<RawEvent[]>(
    `https://api.github.com/users/${githubUser}/events/public?per_page=30`
  );
  if (!raw || !Array.isArray(raw)) {
    return Response.json({ events: [], ok: false });
  }

  // Keep meaningful events, take the newest handful, then enrich in parallel.
  const candidates = raw.filter((e) => ALLOWED.has(e.type)).slice(0, 8);
  const enriched = await Promise.all(candidates.map(enrich));
  const events = enriched.filter((e): e is Activity => e !== null).slice(0, 7);

  return Response.json({ events, ok: events.length > 0 });
}
