"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rot: number;
  rotSpeed: number;
  drag: number; // how strongly the wind carries this petal (lighter = more)
  color: string;
  alpha: number;
};

const COLORS = ["#f7d3e0", "#f4c6d7", "#f9b8ce", "#fbe4ec", "#e9a7c0"];

export default function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // A small, tasteful handful of petals — enough to feel alive, not busy.
    const count = Math.max(7, Math.min(16, Math.round((width * height) / 130000)));
    const petals: Petal[] = Array.from({ length: count }, () => spawn(true));

    function spawn(initial = false): Petal {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20,
        size: 6 + Math.random() * 9,
        speedY: 0.4 + Math.random() * 0.9,
        swayAmp: 0.5 + Math.random() * 0.9, // per-petal flutter strength
        swayFreq: 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        drag: 0.55 + Math.random() * 0.7,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        alpha: 0.4 + Math.random() * 0.45,
      };
    }

    // draw a single cherry-blossom petal (notched teardrop)
    const drawPetal = (p: Petal) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.7, -s * 0.7, s * 0.7, s * 0.6, 0, s);
      ctx.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.7, -s * 0.7, 0, -s);
      ctx.fill();
      // little notch highlight
      ctx.globalAlpha = p.alpha * 0.5;
      ctx.strokeStyle = "#d96a95";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(0, s * 0.6);
      ctx.stroke();
      ctx.restore();
    };

    // Global breeze: layered slow sine waves make gusts swell and fade so every
    // petal drifts together in flowing waves — the anime "wind through the trees" feel.
    const windAt = (time: number) =>
      Math.sin(time * 0.20) * 0.9 +
      Math.sin(time * 0.08 + 2.1) * 1.5 +
      Math.sin(time * 0.47 + 0.7) * 0.35 +
      0.35; // faint rightward base drift

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.016;
      const wind = windAt(t);
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        // fall + a touch of lift when a gust swells (petals hang in the air)
        p.y += p.speedY - Math.max(0, wind) * 0.05 * p.drag;
        // carried by the breeze + its own gentle flutter
        p.x += wind * p.drag + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
        // spin a little faster while the wind is strong
        p.rot += p.rotSpeed + wind * 0.003;

        // wrap horizontally so a steady gust never empties the screen
        if (p.x > width + 30) p.x = -30;
        else if (p.x < -30) p.x = width + 30;

        if (p.y > height + 20) petals[i] = spawn(false);
        drawPetal(p);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
