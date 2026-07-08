"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

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

// Compact relative time: "3h", "2d", "5w"…
function ago(iso: string): string {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
    [4.34, "w"],
    [12, "mo"],
    [Number.POSITIVE_INFINITY, "y"],
  ];
  let v = s;
  for (const [step, label] of units) {
    if (v < step) return `${Math.floor(v)}${label}`;
    v = v / step;
  }
  return `${Math.floor(v)}y`;
}

// Accent color per activity kind (keyed by the kanji the API assigns).
const ACCENT: Record<string, string> = {
  合: "text-matcha border-matcha/30 group-hover:border-matcha group-hover:bg-matcha/5", // merged PR
  結: "text-vermilion border-vermilion/30 group-hover:border-vermilion group-hover:bg-vermilion/5", // opened PR
  打: "text-gold border-gold/30 group-hover:border-gold group-hover:bg-gold/5", // push
  検: "text-sakura-deep border-sakura/40 group-hover:border-sakura-deep group-hover:bg-sakura/5", // review
  問: "text-berry border-berry/30 group-hover:border-berry group-hover:bg-berry/5", // issue
};
const DEFAULT_ACCENT =
  "text-sumi-soft border-sumi/20 group-hover:border-sumi/40 group-hover:bg-sumi/5";

export default function GithubFeed() {
  const [events, setEvents] = useState<Activity[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { events?: Activity[]; ok?: boolean }) => {
        if (!alive) return;
        if (!data.ok || !data.events?.length) {
          setError(true);
          return;
        }
        setEvents(data.events);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mt-5 rounded-2xl border border-sumi/10 bg-card p-5 shadow-ink sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold text-sumi">
          Latest strikes
          <span className="ml-2.5 align-middle font-sans text-sm text-sakura-deep">
            最近
          </span>
        </h3>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-sumi-faint transition-colors hover:text-vermilion"
        >
          all activity ↗
        </a>
      </div>

      {error ? (
        <p className="py-6 text-center text-sm text-sumi-soft">
          Couldn&apos;t reach GitHub right now.{" "}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-vermilion underline"
          >
            See it live ↗
          </a>
        </p>
      ) : !events ? (
        // loading skeleton — a few shimmering rows
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="h-9 w-9 flex-shrink-0 animate-pulse rounded-lg bg-sumi/[0.06]" />
              <span className="flex-1 space-y-2 pt-1">
                <span
                  className="block h-3.5 animate-pulse rounded bg-sumi/[0.07]"
                  style={{ width: `${80 - i * 9}%` }}
                />
                <span
                  className="block h-2.5 animate-pulse rounded bg-sumi/[0.05]"
                  style={{ width: `${45 - i * 4}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="relative">
          {/* timeline spine */}
          <span
            aria-hidden
            className="absolute bottom-5 left-[18px] top-5 w-px bg-gradient-to-b from-sumi/15 via-sumi/10 to-transparent"
          />
          {events.map((e) => {
            const accent = ACCENT[e.kanji] ?? DEFAULT_ACCENT;
            const headline = e.detail ?? `${e.verb} ${e.repo}`;
            return (
              <li key={e.id} className="relative">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative -mx-2 flex items-start gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-sumi/[0.03]"
                >
                  {/* kanji seal marker (sits over the spine) */}
                  <span
                    aria-hidden
                    className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-card font-serif text-sm transition-colors ${accent}`}
                  >
                    {e.kanji}
                  </span>

                  <span className="min-w-0 flex-1 pt-0.5">
                    {/* headline: the real PR title / commit message */}
                    <span className="line-clamp-1 block text-[14px] font-medium text-sumi transition-colors group-hover:text-vermilion">
                      {headline}
                    </span>
                    {/* subline: what + where + when */}
                    <span className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-[12px] text-sumi-faint">
                      <span>{e.verb}</span>
                      <span className="font-mono text-sumi-soft">{e.repo}</span>
                      <span aria-hidden>·</span>
                      <span className="font-mono">{ago(e.date)} ago</span>
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-2 flex-shrink-0 text-sumi-faint opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
