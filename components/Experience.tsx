"use client";

import { motion } from "motion/react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { experience, experienceChapter } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="journey">
      <ChapterHeading chapter={experienceChapter} />

      <div className="relative ml-2 sm:ml-4">
        {/* the ink line */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-gradient-to-b from-vermilion via-sakura-deep to-transparent"
        />

        <div className="space-y-12 pl-8 sm:pl-12">
          {experience.map((job, i) => (
            <Reveal key={job.role + job.period} delay={i * 0.08}>
              <div className="relative">
                {/* node */}
                <span
                  className={`absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 sm:-left-12 ${
                    job.highlight
                      ? "border-vermilion bg-vermilion"
                      : "border-sakura-deep bg-washi"
                  }`}
                >
                  {job.highlight && (
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-vermilion/60" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs tracking-wide text-vermilion">
                    {job.period}
                  </span>
                  {job.location && (
                    <span className="font-mono text-xs text-sumi-faint">
                      · {job.location}
                    </span>
                  )}
                </div>

                <h3 className="mt-1 font-serif text-xl font-semibold text-sumi sm:text-2xl">
                  {job.role}
                </h3>
                <p className="font-sans text-sm font-semibold text-vermilion">
                  {job.org}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {job.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-sm leading-relaxed text-sumi-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sakura-deep" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
