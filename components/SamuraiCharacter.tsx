"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A stylised "cube-skull samurai" — RYZRR's Minecraft-style skeleton
 * reforged into a samurai: horned kabuto helmet, metallic rose-steel
 * armour, shoulder plates (sode), and a katana. Pure SVG so it stays
 * crisp at any size. Ambient motion: float, eye blink, cord flutter,
 * blade glint.
 */
export default function SamuraiCharacter({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  const float = reduce ? {} : { y: [0, -14, 0], rotate: [-1, 1, -1] };

  return (
    <svg
      viewBox="0 0 420 500"
      className={className}
      role="img"
      aria-label="A cube-headed skeleton samurai wearing a horned kabuto helmet and holding a katana"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="aura" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#f7d3e0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f4c6d7" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#f4c6d7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cdd6df" />
          <stop offset="45%" stopColor="#eef2f6" />
          <stop offset="100%" stopColor="#aab4bf" />
        </linearGradient>
        <linearGradient id="boneFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7eedd" />
          <stop offset="100%" stopColor="#e6d6bd" />
        </linearGradient>
        <linearGradient id="helmet" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#fbe4ec" />
          <stop offset="48%" stopColor="#e2b4c5" />
          <stop offset="100%" stopColor="#b4899b" />
        </linearGradient>
        <linearGradient id="horn" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#9c7a30" />
          <stop offset="55%" stopColor="#c8a24e" />
          <stop offset="100%" stopColor="#f2da8e" />
        </linearGradient>
        <linearGradient id="sode" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#8f2440" />
        </linearGradient>
        <clipPath id="bladeClip">
          <path d="M -64 -6 L 150 -6 L 176 0 L 150 6 L -64 6 Z" />
        </clipPath>
      </defs>

      <ellipse cx="210" cy="205" rx="185" ry="185" fill="url(#aura)" />

      <motion.ellipse
        cx="210"
        cy="476"
        rx="98"
        ry="15"
        fill="#1c1613"
        opacity="0.16"
        animate={reduce ? {} : { rx: [98, 80, 98], opacity: [0.16, 0.1, 0.16] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      <motion.g
        animate={float}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 55%" }}
      >
        {/* ---------- KATANA (behind) ---------- */}
        <g transform="translate(258 262) rotate(-54)">
          <rect x="-152" y="-8" width="74" height="16" rx="4" fill="#201a18" />
          <g stroke="#c0392b" strokeWidth="2.4" opacity="0.9">
            <path d="M -146 -8 L -138 8 M -132 -8 L -124 8 M -118 -8 L -110 8 M -104 -8 L -96 8 M -90 -8 L -82 8" />
          </g>
          <rect x="-158" y="-9" width="9" height="18" rx="3" fill="#3a2f2a" />
          <ellipse cx="-72" cy="0" rx="7" ry="20" fill="#c29a4a" />
          <ellipse cx="-72" cy="0" rx="3.5" ry="12" fill="#a37f34" />
          <path
            d="M -64 -6 L 150 -6 L 176 0 L 150 6 L -64 6 Z"
            fill="url(#blade)"
            stroke="#8b96a2"
            strokeWidth="1"
          />
          <path d="M -60 -3.4 L 150 -3.4 L 168 0" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" />
          {!reduce && (
            <g clipPath="url(#bladeClip)">
              <motion.rect
                x="-24"
                y="-10"
                width="20"
                height="20"
                fill="#ffffff"
                opacity="0.8"
                transform="skewX(-24)"
                animate={{ x: [-70, 170] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
              />
            </g>
          )}
        </g>

        {/* ---------- SHOULDERS / DO ---------- */}
        <path
          d="M 112 378 C 122 302 176 282 210 282 C 244 282 298 302 308 378 L 308 400 L 112 400 Z"
          fill="#23202e"
          stroke="#161320"
          strokeWidth="3"
        />
        {/* collar V + red inner */}
        <path d="M 176 288 L 210 348 L 244 288 Z" fill="#c0392b" />
        <path d="M 174 286 L 210 344 L 190 302 Z" fill="#151220" opacity="0.9" />
        <path d="M 246 286 L 210 344 L 230 302 Z" fill="#151220" opacity="0.9" />
        {/* ribcage hint (skeleton identity) */}
        <g stroke="#e9dbc2" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" fill="none">
          <path d="M 210 350 L 210 388" />
          <path d="M 192 356 Q 210 364 228 356" />
          <path d="M 188 368 Q 210 378 232 368" />
          <path d="M 186 380 Q 210 391 234 380" />
        </g>

        {/* shoulder armour plates (sode) */}
        {[
          { x: 108, dir: 1 },
          { x: 312, dir: -1 },
        ].map((s, si) => (
          <g key={si}>
            {[0, 15, 30].map((dy, pi) => (
              <g key={pi}>
                <path
                  d={`M ${s.x} ${300 + dy} q ${s.dir * 30} -8 ${s.dir * 58} 0 l 0 11 q ${-s.dir * 28} -7 ${-s.dir * 58} 0 Z`}
                  fill="url(#sode)"
                  stroke="#7a1f38"
                  strokeWidth="1.5"
                />
                {/* lacing dots */}
                <g fill="#f2da8e">
                  <circle cx={s.x + s.dir * 14} cy={302 + dy} r="1.7" />
                  <circle cx={s.x + s.dir * 30} cy={299 + dy} r="1.7" />
                  <circle cx={s.x + s.dir * 46} cy={300 + dy} r="1.7" />
                </g>
              </g>
            ))}
          </g>
        ))}

        {/* chest crest (mon) */}
        <g transform="translate(210 372)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-8" rx="4" ry="6.6" fill="#f7d3e0" transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="3" fill="#c29a4a" />
        </g>

        {/* ---------- CUBE SKULL HEAD ---------- */}
        <path d="M 140 130 L 250 130 L 285 102 L 175 102 Z" fill="#f3ead7" stroke="#2a211b" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 250 130 L 285 102 L 285 222 L 250 250 Z" fill="#ddccb0" stroke="#2a211b" strokeWidth="3" strokeLinejoin="round" />
        <rect x="140" y="130" width="110" height="120" rx="4" fill="url(#boneFront)" stroke="#2a211b" strokeWidth="3" />

        {/* thin steel cheek guards */}
        <path d="M 140 150 L 150 150 L 150 232 L 140 240 Z" fill="url(#helmet)" opacity="0.85" stroke="#9a7686" strokeWidth="1" />
        <path d="M 250 150 L 240 150 L 240 232 L 250 240 Z" fill="#c9a0b0" opacity="0.85" stroke="#9a7686" strokeWidth="1" />

        {/* eyes (blink) */}
        <motion.g
          fill="#1c1613"
          animate={reduce ? {} : { scaleY: [1, 1, 0.1, 1] }}
          transition={{ duration: 4.5, times: [0, 0.92, 0.955, 0.99], repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect x="160" y="170" width="29" height="35" rx="4" />
          <rect x="205" y="170" width="29" height="35" rx="4" />
          {/* faint vermilion eye-glow */}
          <rect x="165" y="174" width="6" height="7" rx="2" fill="#e05a4a" opacity="0.7" />
          <rect x="210" y="174" width="6" height="7" rx="2" fill="#e05a4a" opacity="0.7" />
        </motion.g>
        <path d="M 196 212 L 205 212 L 200.5 224 Z" fill="#1c1613" />
        <g stroke="#1c1613" strokeWidth="2.4">
          <path d="M 166 238 L 226 238" />
          <path d="M 179 233 L 179 243 M 191 233 L 191 243 M 203 233 L 203 243 M 215 233 L 215 243" />
        </g>

        {/* ---------- KABUTO HELMET ---------- */}
        {/* dome */}
        <path
          d="M 120 142 C 116 96 168 70 205 70 C 244 70 292 96 290 142 Z"
          fill="url(#helmet)"
          stroke="#9a7686"
          strokeWidth="2.5"
        />
        {/* dome ridge + rivets */}
        <path d="M 205 72 L 205 140" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
        <path d="M 150 88 Q 205 76 260 88" stroke="#9a7686" strokeWidth="1.4" opacity="0.6" fill="none" />
        <g fill="#8f6f7e">
          <circle cx="150" cy="126" r="2.2" />
          <circle cx="205" cy="120" r="2.2" />
          <circle cx="260" cy="126" r="2.2" />
        </g>
        {/* brim (mabisashi) */}
        <path d="M 118 140 L 292 140 L 286 152 L 124 152 Z" fill="#8f2440" />
        <path d="M 118 140 L 292 140 L 289 145 L 121 145 Z" fill="#c0392b" opacity="0.8" />

        {/* fukigaeshi side flanges */}
        <path d="M 118 140 L 100 150 L 106 170 L 122 156 Z" fill="url(#horn)" stroke="#7a5e22" strokeWidth="1.2" />
        <path d="M 292 140 L 310 150 L 304 170 L 288 156 Z" fill="url(#horn)" stroke="#7a5e22" strokeWidth="1.2" />

        {/* kuwagata horns */}
        <path
          d="M 196 120 C 168 94 140 62 120 30 L 108 38 C 128 76 156 104 190 128 Z"
          fill="url(#horn)"
          stroke="#7a5e22"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 214 120 C 242 94 270 62 290 30 L 302 38 C 282 76 254 104 220 128 Z"
          fill="url(#horn)"
          stroke="#7a5e22"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* horn inner highlights */}
        <path d="M 186 122 C 162 98 140 70 124 40" stroke="#f2da8e" strokeWidth="1.6" opacity="0.7" fill="none" />
        <path d="M 224 122 C 248 98 270 70 286 40" stroke="#f2da8e" strokeWidth="1.6" opacity="0.7" fill="none" />

        {/* maedate — rising-sun crest */}
        <circle cx="205" cy="108" r="13" fill="#fdf7f1" stroke="#c29a4a" strokeWidth="2.5" />
        <circle cx="205" cy="108" r="6.5" fill="#c0392b" />

        {/* ---------- fluttering helmet cords (agemaki) ---------- */}
        <motion.path
          d="M 122 150 C 96 158 82 178 74 200 C 92 184 108 178 124 172 Z"
          fill="#c0392b"
          animate={reduce ? {} : { rotate: [-4, 6, -4], skewX: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "top right" }}
        />
        <motion.path
          d="M 124 158 C 104 172 94 196 90 218 C 104 200 118 192 128 182 Z"
          fill="#8f2440"
          animate={reduce ? {} : { rotate: [3, -6, 3], skewX: [0, 6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "top right" }}
        />
      </motion.g>
    </svg>
  );
}
