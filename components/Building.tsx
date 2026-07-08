"use client";

import { motion } from "motion/react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { building, buildingChapter } from "@/lib/content";

const statusMeta: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  forging: { label: "Forging", dot: "bg-vermilion", text: "text-vermilion" },
  planned: { label: "Planned", dot: "bg-gold", text: "text-gold" },
  shipped: { label: "Shipped", dot: "bg-matcha", text: "text-matcha" },
};

export default function Building() {
  return (
    <Section id="forge">
      <ChapterHeading chapter={buildingChapter} />

      <p className="mb-8 max-w-xl text-base leading-relaxed text-sumi-soft sm:text-lg">
        The forge is always warm. Here&apos;s what&apos;s on the anvil right
        now.
      </p>

      <div className="space-y-4">
        {building.map((b, i) => {
          const s = statusMeta[b.status] ?? statusMeta.planned;
          return (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-sumi/10 bg-card p-6 shadow-ink transition-colors hover:border-sakura/50 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex shrink-0 items-center gap-2.5 sm:w-36">
                  <span className="relative flex h-2.5 w-2.5">
                    {b.status === "forging" && (
                      <motion.span
                        className={`absolute inline-flex h-full w-full rounded-full ${s.dot}`}
                        animate={{ opacity: [0.7, 0, 0.7], scale: [1, 2.2, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                    <span
                      className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.dot}`}
                    />
                  </span>
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${s.text}`}
                  >
                    {s.label}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-sumi">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-sumi-soft">
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
