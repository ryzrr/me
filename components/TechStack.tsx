"use client";

import { motion } from "motion/react";
import Section from "./Section";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
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
                      <span className="font-sans text-sm font-medium text-sumi">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-sumi-soft">
                        {item.level}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-sumi/15">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sakura via-sakura-deep to-vermilion"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
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
