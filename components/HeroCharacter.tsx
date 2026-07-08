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

      {/* real image overlays only when it actually loads (no broken-image flash) */}
      <motion.img
        ref={imgRef}
        src={src}
        alt={`${profile.name} as a samurai`}
        draggable={false}
        className={`absolute left-0 top-0 h-auto transition-opacity duration-500 ${className} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        animate={reduce || !loaded ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}
