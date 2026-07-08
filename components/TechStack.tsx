"use client";

import { motion } from "motion/react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import { techChapter, techStack } from "@/lib/content";

export default function TechStack() {
  return (
    <Section id="craft">
      <ChapterHeading chapter={techChapter} />

      <p className="mb-8 max-w-xl text-base leading-relaxed text-sumi-soft sm:text-lg">
        The tools I reach for. A weapon is only as good as the hand that wields
        it — I keep these sharp.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {techStack.map((cat, ci) => (
          <Reveal key={cat.group} delay={ci * 0.06}>
            <div className="h-full rounded-2xl border border-sumi/10 bg-card p-6 shadow-ink transition-colors hover:border-sakura/50">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-sumi">
                  {cat.group}
                </h3>
                <span className="font-serif text-2xl text-sakura-deep">
                  {cat.jp}
                </span>
              </div>

              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-sans text-sm font-medium text-sumi">
                        <TechIcon
                          name={item.name}
                          className="h-4 w-4 shrink-0 text-vermilion"
                        />
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-sumi-soft">
                        {item.level}
                      </span>
                    </div>
                    {/* Trigger in-view on the full-size track, not the bar:
                        the bar starts at width:0, and a zero-width target can
                        fail to fire IntersectionObserver on mobile (leaving the
                        bar empty). The track always has real dimensions. */}
                    <motion.div
                      className="h-1.5 overflow-hidden rounded-full bg-sumi/15"
                      initial="hidden"
                      whileInView="shown"
                      viewport={{ once: true, margin: "-60px" }}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sakura via-sakura-deep to-vermilion"
                        variants={{
                          hidden: { width: 0 },
                          shown: { width: `${item.level}%` },
                        }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
