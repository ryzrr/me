"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, profile } from "@/lib/content";

/**
 * ⌘K command palette — "The Menu" (品書き).
 *
 * Opens on ⌘K / Ctrl+K (or a custom `command-palette:open` event dispatched by
 * the nav button). Fuzzy-ish filtering over section jumps, quick actions, and
 * social links. Fully keyboard-driven; styled to match the Sakura & Ink system.
 */

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  kanji: string;
  keywords?: string;
  hint?: string;
  run: () => void | Promise<void>;
};

// A kanji per section, echoing each chapter's glyph.
const SECTION_KANJI: Record<string, string> = {
  "#home": "家",
  "#about": "道",
  "#craft": "技",
  "#works": "作",
  "#journey": "歴",
  "#lessons": "学",
  "#forge": "造",
  "#rhythm": "律",
};

export default function CommandPalette() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const scrollTo = useCallback(
    (href: string) => {
      close();
      // let the overlay unmount before scrolling so Lenis isn't stopped
      requestAnimationFrame(() => {
        const el = document.querySelector(href);
        if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -88 });
        else el?.scrollIntoView({ behavior: "smooth" });
      });
    },
    [lenis, close]
  );

  const commands = useMemo<Command[]>(() => {
    const navCmds: Command[] = nav.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      group: "Navigate",
      kanji: SECTION_KANJI[item.href] ?? "•",
      keywords: `go jump section ${item.href}`,
      run: () => scrollTo(item.href),
    }));

    const actionCmds: Command[] = [
      {
        id: "theme",
        label: "Toggle theme",
        group: "Actions",
        kanji: "陰",
        keywords: "dark light mode night day sumi",
        hint: "light / dark",
        run: () => {
          const el = document.documentElement;
          const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
          el.setAttribute("data-theme", next);
          try {
            localStorage.setItem("theme", next);
          } catch {
            /* storage may be blocked */
          }
        },
      },
      {
        id: "copy-email",
        label: copied ? "Copied!" : "Copy email address",
        group: "Actions",
        kanji: "写",
        keywords: "clipboard mail contact reach",
        hint: profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          } catch {
            window.location.href = profile.socials.email;
          }
        },
      },
      {
        id: "email",
        label: "Send a message",
        group: "Actions",
        kanji: "文",
        keywords: "email hello contact hire mail write",
        run: () => {
          window.location.href = profile.socials.email;
        },
      },
      {
        id: "top",
        label: "Back to top",
        group: "Actions",
        kanji: "頂",
        keywords: "scroll up home start",
        run: () => scrollTo("#home"),
      },
    ];

    const elsewhere: Command[] = [
      {
        id: "github",
        label: "GitHub",
        group: "Elsewhere",
        kanji: "源",
        keywords: "code repos source open",
        hint: "@" + profile.handle.toLowerCase(),
        run: () => {
          window.open(profile.socials.github, "_blank", "noopener");
        },
      },
      {
        id: "twitter",
        label: "X / Twitter",
        group: "Elsewhere",
        kanji: "囀",
        keywords: "tweet social x",
        run: () => {
          window.open(profile.socials.twitter, "_blank", "noopener");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Elsewhere",
        kanji: "縁",
        keywords: "work professional network",
        run: () => {
          window.open(profile.socials.linkedin, "_blank", "noopener");
        },
      },
    ];

    return [...navCmds, ...actionCmds, ...elsewhere];
  }, [scrollTo, copied]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Keep the active index in range as results change.
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(0, results.length - 1)));
  }, [results.length]);

  // Global open shortcut + custom event from the nav trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  // On open: reset, focus, and freeze the page scroll (Lenis + overflow).
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    lenis?.stop();
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      lenis?.start();
    };
  }, [open, lenis]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
      if (results[active] && results[active].id !== "theme" && results[active].id !== "copy-email") {
        close();
      }
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-sumi/40 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-sumi/10 bg-card shadow-float"
          >
            {/* seal accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-sakura via-vermilion to-sakura-deep" />

            {/* search input */}
            <div className="flex items-center gap-3 border-b border-sumi/10 px-4 py-3.5">
              <span aria-hidden className="seal h-7 w-7 text-xs">
                検
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, actions, links…"
                className="flex-1 bg-transparent font-sans text-[15px] text-sumi outline-none placeholder:text-sumi-faint"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-sumi/15 px-1.5 py-0.5 font-mono text-[10px] text-sumi-faint sm:block">
                ESC
              </kbd>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center font-serif text-sm text-sumi-soft">
                  Nothing found — try another word.
                </p>
              ) : (
                results.map((cmd, idx) => {
                  const showGroup = cmd.group !== lastGroup;
                  lastGroup = cmd.group;
                  const isActive = idx === active;
                  return (
                    <div key={cmd.id}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-sumi-faint">
                          {cmd.group}
                        </p>
                      )}
                      <button
                        type="button"
                        data-idx={idx}
                        onMouseMove={() => setActive(idx)}
                        onClick={() => {
                          cmd.run();
                          if (cmd.id !== "theme" && cmd.id !== "copy-email") close();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-vermilion/10" : ""
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border font-serif text-sm transition-colors ${
                            isActive
                              ? "border-vermilion bg-vermilion/5 text-vermilion"
                              : "border-sumi/15 text-sumi-soft"
                          }`}
                        >
                          {cmd.kanji}
                        </span>
                        <span className="flex-1 text-[15px] text-sumi">
                          {cmd.label}
                        </span>
                        {cmd.hint && (
                          <span className="hidden max-w-[45%] truncate font-mono text-[11px] text-sumi-faint sm:block">
                            {cmd.hint}
                          </span>
                        )}
                        {isActive && (
                          <span className="font-mono text-xs text-vermilion">↵</span>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* footer hint */}
            <div className="flex items-center justify-between border-t border-sumi/10 px-4 py-2.5 font-mono text-[10px] text-sumi-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-sumi/15 px-1 py-0.5">↑</kbd>
                <kbd className="rounded border border-sumi/15 px-1 py-0.5">↓</kbd>
                to navigate
              </span>
              <span>{profile.handle} · 品書き</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
