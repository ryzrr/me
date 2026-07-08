"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import GithubFeed from "./GithubFeed";
import { githubChapter, githubUser, profile } from "@/lib/content";

type Day = { date: string; count: number; level: number };
type ApiResponse = {
  contributions?: { date: string; count?: number; level?: number | string }[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// level 0–4 → theme-aware CSS custom properties (defined in globals.css)
const LEVEL_VARS = [
  "var(--gh-0)",
  "var(--gh-1)",
  "var(--gh-2)",
  "var(--gh-3)",
  "var(--gh-4)",
];

// Parse a "YYYY-MM-DD" string as LOCAL midnight (plain `new Date(str)` treats
// it as UTC, which can shift the weekday by one in western timezones).
const parseLocal = (s: string) => new Date(`${s}T00:00:00`);

// Split the flat day list into week-columns, padding the front so the first
// column begins on a Sunday (GitHub's layout: Sun at top, Sat at bottom).
function toWeeks(days: Day[]): (Day | null)[][] {
  const firstWeekday = days[0] ? parseLocal(days[0].date).getDay() : 0;
  const padded: (Day | null)[] = [
    ...Array<Day | null>(firstWeekday).fill(null),
    ...days,
  ];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

export default function GithubActivity() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!githubUser) {
      setError(true);
      return;
    }
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then((r) => (r.ok ? (r.json() as Promise<ApiResponse>) : Promise.reject()))
      .then((data) => {
        if (!alive) return;
        setDays(
          (data.contributions ?? []).map((c) => ({
            date: c.date,
            count: c.count ?? 0,
            level: Number(c.level) || 0,
          }))
        );
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  const total = days?.reduce((sum, d) => sum + d.count, 0) ?? 0;
  const weeks = days ? toWeeks(days) : [];

  // A month label sits above the first week-column that enters a new month.
  let lastMonth = -1;
  const monthLabels = weeks.map((week) => {
    const firstReal = week.find(Boolean) as Day | undefined;
    if (!firstReal) return "";
    const month = parseLocal(firstReal.date).getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTHS[month];
    }
    return "";
  });

  return (
    <Section id="rhythm">
      <ChapterHeading chapter={githubChapter} />

      <p className="mb-8 max-w-xl text-base leading-relaxed text-sumi-soft sm:text-lg">
        Every square is a day at the forge. I care more about showing up than
        about any single burst — consistency is its own kind of craft.
      </p>

      <Reveal>
        <div className="rounded-2xl border border-sumi/10 bg-card p-5 shadow-ink sm:p-7">
          {/* header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-sumi transition-colors hover:text-vermilion"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              @{githubUser}
              <span className="text-sumi-faint transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            {days && (
              <span className="font-mono text-xs text-sumi-soft">
                <span className="font-semibold text-vermilion">
                  {total.toLocaleString()}
                </span>{" "}
                contributions in the last year
              </span>
            )}
          </div>

          {/* graph */}
          {error ? (
            <p className="py-8 text-center text-sm text-sumi-soft">
              Couldn&apos;t load the contribution graph right now.{" "}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-vermilion underline"
              >
                See it on GitHub ↗
              </a>
            </p>
          ) : (
            <div className="overflow-x-auto pb-1">
              {days ? (
                <div className="inline-flex min-w-full flex-col gap-1.5">
                  {/* month labels — one column per week, aligned to the grid */}
                  <div className="grid grid-flow-col auto-cols-[13px] gap-[3px] sm:auto-cols-[15px]">
                    {monthLabels.map((m, i) => (
                      <span
                        key={i}
                        className="h-3 text-[10px] leading-none text-sumi-faint"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  {/* contribution cells: 7 rows (Sun→Sat), columns = weeks */}
                  <div className="grid grid-flow-col grid-rows-[repeat(7,13px)] gap-[3px] sm:grid-rows-[repeat(7,15px)]">
                    {weeks.flatMap((week, wi) =>
                      week.map((day, di) => (
                        <span
                          key={`${wi}-${di}`}
                          title={
                            day
                              ? `${day.count} contribution${
                                  day.count === 1 ? "" : "s"
                                } on ${day.date}`
                              : undefined
                          }
                          className="h-[13px] w-[13px] rounded-[3px] ring-1 ring-inset ring-sumi/[0.04] transition-transform duration-150 hover:scale-125 sm:h-[15px] sm:w-[15px]"
                          style={{
                            backgroundColor: day
                              ? LEVEL_VARS[day.level]
                              : "transparent",
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              ) : (
                // loading skeleton — a full year of shimmering empty cells
                <div className="grid grid-flow-col grid-rows-[repeat(7,13px)] gap-[3px] sm:grid-rows-[repeat(7,15px)]">
                  {Array.from({ length: 53 * 7 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[13px] w-[13px] animate-pulse rounded-[3px] bg-sumi/[0.06] sm:h-[15px] sm:w-[15px]"
                      style={{ animationDelay: `${(i % 7) * 60}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* legend */}
          <div className="mt-5 flex items-center justify-end gap-2 font-mono text-[10px] text-sumi-faint">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className="h-[13px] w-[13px] rounded-[3px] ring-1 ring-inset ring-sumi/[0.04] sm:h-[15px] sm:w-[15px]"
                style={{ backgroundColor: LEVEL_VARS[l] }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <GithubFeed />
      </Reveal>
    </Section>
  );
}
