"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SamuraiCharacter from "./SamuraiCharacter";
import { profile } from "@/lib/content";

/**
 * Zero-config real-character drop-in:
 *   → Just save your art as  public/hero-samurai.png  and refresh.
 *
 * The animated SVG samurai renders as the base. If the image is found it
 * fades in on top (with a soft glow); if it's missing, nothing flashes.
 * Set `profile.heroImageSrc` to override the path.
 */
const DEFAULT_SRC = "/hero-samurai.png";

export default function HeroCharacter({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = profile.heroImageSrc || DEFAULT_SRC;
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  // Robust load detection via the actual DOM node — handles the case where
  // the image is already complete (cache / hot-reload) before React binds,
  // which a JSX onLoad prop would miss.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    setStatus("loading");
    if (img.complete) {
      setStatus(img.naturalWidth > 0 ? "loaded" : "error");
      return;
    }
    const onLoad = () => setStatus("loaded");
    const onError = () => setStatus("error");
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src]);

  const loaded = status === "loaded";

  return (
    <span className="relative inline-block">
      {/* soft glow behind a (transparent) real image */}
      {loaded && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sakura/30 blur-3xl"
        />
      )}

      {/* SVG base — hidden once a real image successfully loads */}
      <SamuraiCharacter className={`${className} ${loaded ? "invisible" : ""}`} />

      {/* real image overlays only when it actually loads (no broken-image flash).
          A bottom gradient mask dissolves the image's own lower edge so the
          character never reads as a hard-cut cutout (works for any drop-in art).

          The soft glow lives on this WRAPPER, not on the masked <img> itself:
          a mask + drop-shadow on the same element makes some browsers cast the
          shadow from the rectangular box (a visible rectangle behind the art),
          so the filter must sit one level up where it reads the masked shape. */}
      <motion.span
        className="absolute left-0 top-0 block drop-shadow-[0_36px_48px_rgba(200,70,140,0.24)]"
        animate={reduce || !loaded ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={`${profile.name} as a samurai`}
          draggable={false}
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 86%, rgba(0,0,0,0.5) 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 86%, rgba(0,0,0,0.5) 95%, transparent 100%)",
          }}
          className={`block h-auto transition-opacity duration-500 ${className} ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.span>

      {/* CLOUD PUFF at the base — purely atmospheric. The gradient mask above
          already dissolves the character's edge into whatever background sits
          behind it (works in both themes); this is just a small, round, blurred
          sakura glow at the feet for warmth — deliberately compact (not a wide
          band) so it never reads as a rectangle. Wrapper mirrors the image box
          so it stays glued to the real bottom edge at every breakpoint. */}
      {loaded && (
        <span
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 aspect-[864/1152] ${className}`}
        >
          <span className="absolute inset-x-[30%] bottom-[2%] h-[16%] rounded-full bg-sakura/25 blur-2xl" />
        </span>
      )}
    </span>
  );
}
