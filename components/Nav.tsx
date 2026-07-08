"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, profile } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -88 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* scroll progress — thin line pinned to the very top edge */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-sakura via-vermilion to-sakura-deep"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 px-3 transition-all duration-500 sm:px-5 ${
          scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-5"
        }`}
      >
        <nav
          className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pl-4 pr-3 transition-all duration-500 sm:pl-5 sm:pr-4 ${
            scrolled
              ? "border-sumi/10 bg-washi/80 shadow-ink backdrop-blur-xl"
              : "border-sumi/10 bg-washi/50 shadow-[0_10px_30px_-18px_rgba(28,22,19,0.4)] backdrop-blur-md"
          }`}
        >
          <button
            onClick={() => go("#home")}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="seal h-8 w-8 text-sm font-bold transition-transform duration-300 group-hover:rotate-6">
              侍
            </span>
            <span className="font-mono text-sm font-medium tracking-widest text-sumi">
              {profile.handle}
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => go(item.href)}
                  className="group relative font-sans text-sm text-sumi-soft transition-colors hover:text-sumi"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-vermilion transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* command palette trigger */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("command-palette:open"))
              }
              aria-label="Open command palette"
              title="Command palette (⌘K)"
              className="group flex items-center gap-2 rounded-full border border-sumi/20 py-1.5 pl-2.5 pr-2.5 text-sumi transition-colors hover:border-vermilion hover:text-vermilion sm:pr-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <kbd className="hidden font-mono text-[11px] tracking-wide text-sumi-faint transition-colors group-hover:text-vermilion sm:inline">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <a
              href={profile.socials.email}
              className="hidden rounded-full border border-sumi/20 px-4 py-1.5 font-mono text-xs tracking-wide text-sumi transition-colors hover:border-vermilion hover:text-vermilion md:inline-block"
            >
              Say hello
            </a>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
            <span
              className={`h-0.5 w-6 bg-sumi transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-sumi transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-sumi transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-washi/95 backdrop-blur-md md:hidden"
      >
        {nav.map((item, i) => (
          <motion.button
            key={item.href}
            onClick={() => go(item.href)}
            initial={{ opacity: 0, y: 12 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: open ? i * 0.05 : 0 }}
            className="font-serif text-2xl text-sumi"
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
