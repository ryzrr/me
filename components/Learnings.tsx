"use client";

import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { learnings, learningsChapter } from "@/lib/content";

export default function Learnings() {
  return (
    <Section id="lessons">
      <ChapterHeading chapter={learningsChapter} />

      <p className="mb-8 max-w-xl text-base leading-relaxed text-sumi-soft sm:text-lg">
        A few things the work has taught me — the kind of lessons you only learn
        by shipping, breaking, and trying again.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {learnings.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.07}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-sumi/10 bg-card p-7 shadow-ink transition-all hover:-translate-y-1 hover:border-sakura/50">
              <span className="mb-4 block font-serif text-4xl text-sakura-deep transition-colors group-hover:text-vermilion">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-serif text-xl font-semibold text-sumi">
                {l.title}
              </h3>
              <p className="text-sm leading-relaxed text-sumi-soft">{l.body}</p>
              <span
                aria-hidden
                className="absolute bottom-4 right-5 font-serif text-2xl text-vermilion/0 transition-colors duration-300 group-hover:text-vermilion/30"
              >
                学
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
