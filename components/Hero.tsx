"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import HeroCharacter from "./HeroCharacter";
import { profile } from "@/lib/content";

function RotatingRole() {
  const roles = profile.hero.rotating;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold text-vermilion"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Marks() {
  const widths = [10, 4, 4, 10, 4, 16];
  return (
    <span className="flex items-end gap-1" aria-hidden>
      {widths.map((w, i) => (
        <span key={i} className="h-3.5 bg-sumi" style={{ width: w }} />
      ))}
    </span>
  );
}

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // The hero is pinned by pure CSS (`position: sticky` on the section). We only
  // drive its gentle recede/dim from raw page scroll over the first viewport,
  // so it fades back as the content sheet rises up and covers it.
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, vh], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, vh * 0.6, vh], [1, 1, 0.4]);
  const contentY = useTransform(scrollY, [0, vh], [0, -60]);

  return (
    <section
      id="home"
      className="relative z-0 min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen"
    >
      <motion.div
        style={isDesktop ? { opacity: heroOpacity, scale: heroScale } : undefined}
        className="flex min-h-[100svh] w-full items-center px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:h-full lg:min-h-0"
      >
      {/* giant kanji watermark (elegant serif) */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[46vw] leading-none text-sumi/[0.05] lg:text-[30vw]"
      >
        {profile.hero.watermarkKanji}
      </motion.span>

      {/* vertical accent */}
      <span
        aria-hidden
        className="vertical-jp absolute right-5 top-1/2 hidden -translate-y-1/2 font-serif text-xs text-sumi-faint lg:block"
      >
        侍 の 道
      </span>

      <motion.div
        style={isDesktop ? { y: contentY } : undefined}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-x-8 gap-y-8 lg:grid-cols-12"
      >
        {/* LEFT — text */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <Marks />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sumi-soft">
              {profile.name} · {profile.handle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 font-serif font-extrabold leading-[0.98] tracking-tight text-sumi"
          >
            <span className="block text-[clamp(2.4rem,5.4vw,4.5rem)]">
              {profile.hero.headline[0]}
            </span>
            <span className="block text-[clamp(2.4rem,5.4vw,4.5rem)] text-vermilion">
              {profile.hero.headline[1]}
              <span className="ml-3 align-baseline font-sans text-xl font-normal text-sakura-deep">
                道
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-md text-base leading-relaxed text-sumi-soft sm:text-lg"
          >
            {profile.hero.manifesto}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-5 font-mono text-sm text-sumi-soft"
          >
            <span className="text-sumi-faint">currently → </span>
            <RotatingRole />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden rounded-full bg-sumi px-7 py-3 font-sans text-sm font-medium text-washi shadow-ink transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">View my works</span>
              <span className="absolute inset-0 -translate-x-full bg-vermilion transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-sumi/25 px-7 py-3 font-sans text-sm font-medium text-sumi transition-colors hover:border-sumi hover:bg-sumi hover:text-washi"
            >
              GitHub ↗
            </a>
          </motion.div>
        </div>

        {/* RIGHT — character */}
        <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroCharacter className="h-auto w-[210px] drop-shadow-[0_40px_60px_rgba(200,70,140,0.28)] sm:w-[320px] lg:w-[460px]" />

            <motion.a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              whileHover={{ y: -4 }}
              className="absolute -left-2 bottom-8 hidden w-52 items-center gap-3 rounded-2xl border border-sumi/10 bg-card/90 p-3 shadow-ink backdrop-blur-md lg:flex"
            >
              <span className="seal flex h-12 w-12 shrink-0 bg-washi-deep text-lg">
                作
              </span>
              <span className="flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-sumi-faint">
                  Selected
                </span>
                <span className="block font-serif text-sm text-sumi">
                  See the works
                </span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sumi/20 text-sumi">
                ↗
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sumi-faint">
          scroll
        </span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px origin-top bg-gradient-to-b from-vermilion to-transparent"
        />
      </motion.div>
      </motion.div>
    </section>
  );
}
