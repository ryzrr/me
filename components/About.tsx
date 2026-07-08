"use client";

import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about">
      <ChapterHeading chapter={about.chapter} />

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* story */}
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={`leading-relaxed text-sumi-soft ${
                  i === 0
                    ? "text-xl text-sumi sm:text-2xl"
                    : "text-base sm:text-lg"
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* fact panel */}
        <Reveal delay={0.15}>
          <div className="relative rounded-2xl border border-sumi/10 bg-card p-7 shadow-ink">
            <span className="seal absolute -right-3 -top-3 h-11 w-11 rotate-6 bg-washi text-base">
              私
            </span>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-vermilion">
              At a glance
            </h3>
            <dl className="space-y-4">
              {about.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-sumi/10 pb-3 last:border-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-sumi-faint">
                    {f.label}
                  </dt>
                  <dd className="text-right font-serif text-base text-sumi">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
