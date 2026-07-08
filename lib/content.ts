/**
 * ============================================================
 *  EDIT ME — this is the single source of truth for the site.
 *  Change the text/links here and every section updates.
 *  Lines marked  // ✏️  are the ones most worth personalising.
 * ============================================================
 */

export const profile = {
  name: "Nikhil Kumar Rajak",
  handle: "RYZRR",
  role: "Full-Stack Developer",
  kanji: "侍", // samurai — sits behind the hero
  // ✏️ One or two lines. Keep it human.
  tagline: "I build things for the web — and I build them to last.",
  metaDescription:
    "Nikhil Kumar Rajak (RYZRR) — full-stack developer crafting fast, thoughtful web experiences. MERN stack, open source, GSoC'26 @ webpack.",
  location: "India",
  email: "ryzrr.official@gmail.com",
  // ✏️ Update these URLs
  socials: {
    github: "https://github.com/ryzrr",
    twitter: "https://twitter.com/ryzrr",
    linkedin: "https://linkedin.com/in/ryzrr",
    email: "mailto:ryzrr.official@gmail.com",
  },
  // Hero content
  hero: {
    greeting: "こんにちは、はじめまして", // "Hello, nice to meet you"
    // ✏️ short micro-manifesto (shown top-left, like the reference)
    manifesto:
      "I build for the web with a craftsman's patience — precise, deliberate, and made to last.",
    // ✏️ the hero headline (2 lines). Rendered in the elegant serif.
    headline: ["The Way of", "the Builder"],
    watermarkKanji: "道", // the huge faint kanji behind the hero
    rotating: [
      "Full-Stack Developer",
      "MERN Craftsman",
      "GSoC '26 @ webpack",
      "Open-source wanderer",
    ],
  },
  /**
   * ✏️ REAL CHARACTER IMAGE (recommended):
   * Easiest way — just save your art as  public/hero-samurai.png  and refresh.
   * It's auto-detected and fades in over the SVG (transparent PNG looks best).
   * Only set this if you want a DIFFERENT filename/path, e.g. "/my-samurai.png".
   * Leave "" to use the auto-detected default (or the built-in SVG samurai).
   */
  heroImageSrc: "",
} as const;

/** A short section-header label with a kanji + romaji, storytelling style. */
export type Chapter = {
  index: string; // 壱 弐 参 ... chapter numeral
  kanji: string;
  romaji: string;
  english: string;
};

/* -------------------------------------------------------------- */
/*  ABOUT — "The Path"                                            */
/* -------------------------------------------------------------- */
export const about = {
  chapter: {
    index: "壱",
    kanji: "道",
    romaji: "Michi",
    english: "The Path",
  } satisfies Chapter,
  // ✏️ Your story. Written as short, deliberate paragraphs.
  paragraphs: [
    "I'm Nikhil — most people online know me as RYZRR. I'm a full-stack developer who fell for the web the way some people fall for a craft: slowly, then all at once.",
    "I work mostly across the MERN stack, but I care less about any single tool and more about the shape of a good idea: something fast, honest, and pleasant to use. I like problems that force me to learn.",
    "Right now I'm sharpening my edges in open source — contributing, breaking, fixing, and repeating. Every commit is a brushstroke; the picture only makes sense once you step back.",
  ],
  // ✏️ quick facts shown as a small side panel
  facts: [
    { label: "Based in", value: "India" },
    { label: "Focus", value: "Full-stack / MERN" },
    { label: "Currently", value: "GSoC '26 @ webpack" },
    { label: "Fuel", value: "Coffee & curiosity" },
  ],
};

/* -------------------------------------------------------------- */
/*  TECH STACK — "The Arsenal"                                    */
/* -------------------------------------------------------------- */
export const techChapter: Chapter = {
  index: "弐",
  kanji: "技",
  romaji: "Waza",
  english: "The Craft",
};

// ✏️ Edit categories/items freely. `level` (0–100) drives the bar.
export const techStack: {
  group: string;
  jp: string;
  items: { name: string; level: number }[];
}[] = [
  {
    group: "Languages",
    jp: "言語",
    items: [
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 72 },
      { name: "C++", level: 68 },
    ],
  },
  {
    group: "Frontend",
    jp: "表",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Motion", level: 75 },
    ],
  },
  {
    group: "Backend",
    jp: "裏",
    items: [
      { name: "Node.js", level: 87 },
      { name: "Express", level: 84 },
      { name: "REST APIs", level: 86 },
      { name: "GraphQL", level: 66 },
    ],
  },
  {
    group: "Data & Tools",
    jp: "道具",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 70 },
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 64 },
    ],
  },
];

/* -------------------------------------------------------------- */
/*  PROJECTS — "The Works"                                        */
/* -------------------------------------------------------------- */
export const projectsChapter: Chapter = {
  index: "参",
  kanji: "作",
  romaji: "Sakuhin",
  english: "The Works",
};

// ✏️ Replace with your real projects.
export const projects: {
  title: string;
  kanji: string;
  year: string;
  blurb: string;
  tech: string[];
  live?: string;
  source?: string;
  featured?: boolean;
}[] = [
  {
    title: "Project Sakura",
    kanji: "桜",
    year: "2025",
    blurb:
      "A full-stack app that does something genuinely useful. Replace this with the project you're proudest of — the one that taught you the most.",
    tech: ["Next.js", "Node", "MongoDB", "Tailwind"],
    live: "#",
    source: "https://github.com/ryzrr",
    featured: true,
  },
  {
    title: "Katana CLI",
    kanji: "刀",
    year: "2025",
    blurb:
      "A sharp little developer tool. Describe what problem it cuts through and why someone would reach for it.",
    tech: ["TypeScript", "Node"],
    source: "https://github.com/ryzrr",
  },
  {
    title: "Torii",
    kanji: "鳥",
    year: "2024",
    blurb:
      "A gateway project — an API, a platform, or a service that connects two worlds. Swap in the details.",
    tech: ["Express", "PostgreSQL", "Docker"],
    live: "#",
    source: "https://github.com/ryzrr",
  },
  {
    title: "Origami UI",
    kanji: "折",
    year: "2024",
    blurb:
      "A component library or design experiment. Perfect place to show off the visual, front-end side of your work.",
    tech: ["React", "Tailwind", "Storybook"],
    source: "https://github.com/ryzrr",
  },
];

/* -------------------------------------------------------------- */
/*  EXPERIENCE — "The Journey"                                    */
/* -------------------------------------------------------------- */
export const experienceChapter: Chapter = {
  index: "肆",
  kanji: "歴",
  romaji: "Rireki",
  english: "The Journey",
};

// ✏️ Your timeline, newest first.
export const experience: {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
  highlight?: boolean;
}[] = [
  {
    role: "Contributor — Google Summer of Code '26",
    org: "webpack",
    period: "2026",
    location: "Remote",
    points: [
      "Selected to contribute to webpack, one of the web's foundational build tools.",
      "Working on tooling that thousands of projects rely on every day.",
    ],
    highlight: true,
  },
  {
    role: "Full-Stack Developer",
    org: "Freelance / Open Source",
    period: "2024 — Present",
    location: "Remote",
    points: [
      "Building and shipping MERN-stack applications end to end.",
      "Contributing to open-source projects and learning in public.",
    ],
  },
  {
    role: "Where it began",
    org: "Self-taught",
    period: "Earlier",
    points: [
      "Started with curiosity and a browser's dev tools.",
      "Turned tutorials into projects, and projects into a craft.",
    ],
  },
];

/* -------------------------------------------------------------- */
/*  LEARNINGS — "The Teachings"                                   */
/* -------------------------------------------------------------- */
export const learningsChapter: Chapter = {
  index: "伍",
  kanji: "学",
  romaji: "Manabi",
  english: "The Lessons",
};

// ✏️ Things you've genuinely learned. Short + reflective reads best.
export const learnings: { title: string; body: string }[] = [
  {
    title: "Simple survives",
    body: "The clever solution feels great for a week. The simple one is still readable a year later. I optimise for the version of me who comes back later, confused.",
  },
  {
    title: "Ship, then sharpen",
    body: "A shipped B+ beats a perfect draft that never leaves the branch. Real feedback only lives in production.",
  },
  {
    title: "Read the source",
    body: "The fastest way to level up was to stop guessing and open the library. Everything is just code someone else wrote.",
  },
  {
    title: "Fundamentals compound",
    body: "Frameworks change; the browser, the network, and data structures don't. Time spent on basics pays interest forever.",
  },
];

/* -------------------------------------------------------------- */
/*  BUILDING NOW — "The Forge"                                    */
/* -------------------------------------------------------------- */
export const buildingChapter: Chapter = {
  index: "陸",
  kanji: "造",
  romaji: "Tsukuru",
  english: "The Forge",
};

// ✏️ What you're actively building. status: "forging" | "planned" | "shipped"
export const building: {
  title: string;
  status: "forging" | "planned" | "shipped";
  body: string;
}[] = [
  {
    title: "My GSoC '26 work at webpack",
    status: "forging",
    body: "Diving deep into a tool the whole ecosystem depends on. Learning how the sausage is made — and helping make it.",
  },
  {
    title: "This very website",
    status: "shipped",
    body: "A Japanese-inspired home on the web, hand-built with Next.js, Motion and a lot of tea.",
  },
  {
    title: "Something open-source & useful",
    status: "planned",
    body: "An idea that keeps me up at night. Replace this with the thing you can't stop thinking about.",
  },
];

/* -------------------------------------------------------------- */
/*  GITHUB ACTIVITY — "The Rhythm"                                 */
/* -------------------------------------------------------------- */
export const githubChapter: Chapter = {
  index: "漆",
  kanji: "律",
  romaji: "Ritsu",
  english: "The Rhythm",
};

// The account whose contribution graph we show — derived from socials.github
// (e.g. "https://github.com/ryzrr" → "ryzrr"). ✏️ change the URL above to update.
export const githubUser =
  profile.socials.github.replace(/\/+$/, "").split("/").pop() ?? "";

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Craft", href: "#craft" },
  { label: "Works", href: "#works" },
  { label: "Journey", href: "#journey" },
  { label: "Lessons", href: "#lessons" },
  { label: "Forge", href: "#forge" },
  { label: "Rhythm", href: "#rhythm" },
];
