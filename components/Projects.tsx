"use client";

import { motion } from "motion/react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { projects, projectsChapter } from "@/lib/content";

export default function Projects() {
  return (
    <Section id="works">
      <ChapterHeading chapter={projectsChapter} />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.06}
            className={p.featured ? "md:col-span-2" : ""}
          >
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sumi/10 bg-card p-7 shadow-ink transition-colors hover:border-vermilion/50 ${
                p.featured ? "md:flex-row md:items-center md:gap-8" : ""
              }`}
            >
              {/* giant kanji watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[7rem] leading-none text-sakura/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-sakura/20"
              >
                {p.kanji}
              </span>

              {p.featured && (
                <div className="relative mb-6 flex h-40 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sakura-light via-washi to-washi-deep md:mb-0 md:h-48 md:w-64">
                  <span className="font-serif text-7xl text-vermilion/80">
                    {p.kanji}
                  </span>
                  <span className="absolute left-3 top-3 seal h-8 w-8 bg-washi/70 text-xs">
                    作
                  </span>
                </div>
              )}

              <div className="relative flex flex-1 flex-col">
                <div className="mb-3 flex items-center gap-3">
                  {p.featured && (
                    <span className="rounded-full bg-vermilion/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-vermilion">
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-xs text-sumi-faint">
                    {p.year}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-sumi">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-sumi-soft">
                  {p.blurb}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-sumi/10 bg-washi-deep px-2.5 py-1 font-mono text-[11px] text-sumi-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4 pt-1">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-sm font-medium text-vermilion underline-offset-4 hover:underline"
                    >
                      Live ↗
                    </a>
                  )}
                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-sm font-medium text-sumi-soft underline-offset-4 hover:text-sumi hover:underline"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
