"use client";

import { motion } from "motion/react";
import type { Chapter } from "@/lib/content";

/**
 * Storytelling section header: a giant faded kanji watermark, a chapter
 * numeral + romaji "eyebrow", the English title, and an ink-brush underline
 * that paints itself into view.
 */
export default function ChapterHeading({
  chapter,
  align = "left",
}: {
  chapter: Chapter;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`relative mb-8 ${isCenter ? "text-center" : "text-left"}`}
    >
      {/* watermark kanji */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-8 select-none font-serif text-[6.5rem] leading-none text-sumi/[0.05] sm:text-[9rem] ${
          isCenter ? "left-1/2 -translate-x-1/2" : "-left-1"
        }`}
      >
        {chapter.kanji}
      </span>

      <div className="relative">
        <div
          className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-vermilion ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="font-serif text-lg not-italic tracking-normal">
            {chapter.index}
          </span>
          <span className="h-px w-8 bg-vermilion/50" />
          <span>{chapter.romaji}</span>
        </div>

        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-sumi sm:text-5xl">
          {chapter.english}
          <span className="ml-3 align-middle font-sans text-2xl text-sakura-deep">
            {chapter.kanji}
          </span>
        </h2>

        {/* self-painting brush underline */}
        <svg
          className={`mt-4 h-3 w-44 overflow-visible ${
            isCenter ? "mx-auto" : ""
          }`}
          viewBox="0 0 180 12"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M2 7 C 40 2, 80 11, 118 5 S 170 3, 178 6"
            stroke="#d24d8a"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
