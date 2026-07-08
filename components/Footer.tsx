"use client";

import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { profile } from "@/lib/content";

/**
 * ✏️ FOOTER IMAGE: save your attached artwork as  public/footer-pagoda.jpg
 * (a real JPG/PNG). It's used full-bleed behind this section. Until then a
 * dusk-gradient fallback shows, so it still looks good.
 */
const FOOTER_IMAGE = "/footer-pagoda.jpg";

const links = [
  { label: "GitHub", href: profile.socials.github },
  { label: "Twitter", href: profile.socials.twitter },
  { label: "LinkedIn", href: profile.socials.linkedin },
  { label: "Email", href: profile.socials.email },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-2 pb-0 pt-12 sm:px-2.5"
      // The footer is always a dark photo behind a dark scrim, so its text must
      // stay light paper regardless of theme. Pinning these tokens keeps every
      // `washi`/`sumi` utility below on its light-mode value in dark mode too.
      style={
        {
          "--color-washi": "#fbf3ec",
          "--color-sumi": "#1c1613",
        } as CSSProperties
      }
    >
      <div className="relative overflow-hidden rounded-t-[1.5rem] shadow-[0_-10px_60px_-30px_rgba(28,22,19,0.5)] ring-1 ring-sumi/10 sm:rounded-t-[2.5rem]">
        {/* dusk-gradient fallback (shows if the image isn't added yet) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#16233d] via-[#241a2c] to-[#3a1a20]" />

        {/* pagoda artwork */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top]"
          style={{ backgroundImage: `url('${FOOTER_IMAGE}')` }}
        />

        {/* legibility scrims: strong at the bottom, soft at the top, soft on the left */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a12] via-[#0b0a12]/70 to-[#0b0a12]/10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b0a12]/55 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0b0a12]/45 to-transparent" />

        {/* premium inner hairline */}
        <div className="pointer-events-none absolute inset-0 rounded-t-[1.5rem] ring-1 ring-inset ring-white/10 sm:rounded-t-[2.5rem]" />

        {/* ---------- content ---------- */}
        <div className="relative flex min-h-[560px] flex-col justify-between p-7 text-washi sm:min-h-[620px] sm:p-12 lg:p-16">
          {/* top bar */}
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-washi/75">
            <span className="flex items-center gap-2">
              <span className="text-lg text-sakura">縁</span> Let&apos;s connect
            </span>
            <span className="hidden sm:block">{profile.location}</span>
          </div>

          {/* main CTA */}
          <div>
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-sakura">
                Get in touch
              </p>
              <h2 className="max-w-2xl font-serif text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Let&apos;s build something
                <br />
                <span className="text-sakura-gradient">worth remembering.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-washi/70">
                Whether it&apos;s a project, a collaboration, or just a chat about
                the craft — my inbox is always open.
              </p>
              <a
                href={profile.socials.email}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-washi px-7 py-3.5 font-sans text-sm font-semibold text-sumi shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-sakura"
              >
                {profile.email}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </Reveal>

            {/* socials + copyright */}
            <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative font-sans text-sm text-washi/75 transition-colors hover:text-washi"
                    >
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-sakura transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 font-mono text-xs text-washi/50">
                <span>
                  © {new Date().getFullYear()} {profile.name}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/25 text-sm text-sakura">
                  侍
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
