/**
 * HeroParticleRing — a rotating "particle ring" ambient background for the
 * hero section, in the style of the classic react-three-fiber particle-ring
 * demo (indigo→violet gradient sphere cloud on a tilted, spinning ring).
 *
 * Reimplemented on a plain 2D canvas instead of three.js / @react-three/fiber
 * / @react-three/drei — those packages aren't installable in this project's
 * sandbox (npm registry access is blocked here), so this reproduces the same
 * point-cloud math (inner ring + sparse outer halo, per-point left→right
 * color gradient, slow continuous rotation) without any new dependencies.
 *
 * Color is theme-aware: a cool indigo→violet gradient in dark mode, and a
 * vivid micro-blue gradient in light mode.
 *
 * Perf notes (this file was the source of real jank near the hero):
 * - Every point's fill color used to be recomputed from hex strings on every
 *   single animation frame (`lerpColor` doing string parsing + allocation
 *   ~1800 times, 60x a second). Colors are fixed per point, so they're now
 *   precomputed once per theme instead of inside the render loop.
 * - `ctx.shadowBlur`/`shadowColor` were applied per-particle in light mode —
 *   canvas shadow rendering is extremely expensive and scales badly with
 *   shape count. Removed entirely in favor of a cheap two-circle glow (a
 *   larger translucent halo circle behind a solid core), which is just one
 *   extra plain `fill()` call instead of an unoptimized shadow pass.
 * - The ambient background halo gradient is now rebuilt only on resize/theme
 *   change instead of every frame.
 */
import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const NUM_POINTS = 1200;
const NUM_OUTER = Math.round(NUM_POINTS / 4);

type RingPoint = {
  x: number;
  y: number;
  z: number;
  /** Precomputed fill color — fixed at generation per theme, so it never
   *  needs to be recalculated inside the animation loop. */
  color: string;
};

function randomFromInterval(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function lerpColor(a: string, b: string, t: number) {
  const c0 = hexToRgb(a);
  const c1 = hexToRgb(b);
  const r = Math.round(c0.r + (c1.r - c0.r) * t);
  const g = Math.round(c0.g + (c1.g - c0.g) * t);
  const bch = Math.round(c0.b + (c1.b - c0.b) * t);
  return `rgb(${r}, ${g}, ${bch})`;
}

function buildRing(
  count: number,
  minR: number,
  maxR: number,
  depth: number,
  leftColor: string,
  rightColor: string,
): RingPoint[] {
  return Array.from({ length: count }, () => {
    const radius = randomFromInterval(minR, maxR);
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = randomFromInterval(-depth, depth);
    const ratio = Math.min(1, Math.max(0, (x + MAX_RADIUS) / (MAX_RADIUS * 2)));
    return { x, y, z, color: lerpColor(leftColor, rightColor, ratio) };
  });
}

const THEME_COLORS: Record<"dark" | "light", { left: string; right: string; glow: string; composite: GlobalCompositeOperation }> = {
  dark: {
    left: "#305CDE",
    right: "#8B5CF6",
    glow: "rgba(99,102,241,0.18)",
    composite: "lighter",
  },
  light: {
    // Vivid micro-blue instead of white — reads as a cool, crisp particle
    // field against the light hero wash rather than a faint pale wash.
    left: "#60A5FA",
    right: "#305CDE",
    glow: "rgba(48,92,222,0.10)",
    composite: "source-over",
  },
};

export default function HeroParticleRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Geometry + color are both precomputed once per theme — nothing here
  // touches string parsing or allocation during the animation loop.
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const inner = useMemo(
    () => buildRing(NUM_POINTS, MIN_RADIUS, MAX_RADIUS, DEPTH, colors.left, colors.right),
    [colors.left, colors.right],
  );
  const outer = useMemo(
    () => buildRing(NUM_OUTER, MIN_RADIUS / 2, MAX_RADIUS * 2, DEPTH * 10, colors.left, colors.right),
    [colors.left, colors.right],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let haloGradient: CanvasGradient | null = null;

    const buildHalo = () => {
      const cx = width * 0.5;
      const cy = height * 0.42;
      const haloR = Math.min(width, height) * 0.55;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      g.addColorStop(0, colors.glow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      haloGradient = g;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildHalo();
    };
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    // Fixed isometric-ish tilt so the ring reads as a spinning disc, not a
    // flat circle — mimics the camera angle from the original three.js demo.
    const tilt = -0.34;
    const squash = 0.56;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    let raf = 0;
    let rotation = 0;
    let last = performance.now();

    const drawSet = (
      points: RingPoint[],
      depthRange: number,
      baseSize: number,
      cx: number,
      cy: number,
      scale: number,
    ) => {
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const xr = p.x * cosR - p.y * sinR;
        const yr = p.x * sinR + p.y * cosR;
        const ys = yr * squash;
        const xt = xr * cosT - ys * sinT;
        const yt = xr * sinT + ys * cosT;

        const depthT = (p.z + depthRange) / (depthRange * 2);
        const size = baseSize * (0.55 + depthT * 0.9);
        const alpha = 0.28 + depthT * 0.62;
        const px = cx + xt * scale;
        const py = cy + yt * scale - p.z * scale * 0.12;

        ctx.fillStyle = p.color;

        // Cheap glow: one extra soft, larger, low-alpha circle behind the
        // solid core — costs one more fill() call, not an unoptimized
        // per-shape canvas shadow pass.
        ctx.globalAlpha = alpha * 0.22;
        ctx.beginPath();
        ctx.arc(px, py, size * 2.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduceMotion) {
        rotation += dt * 0.22;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.42;
      const scale = Math.min(width, height) / (MAX_RADIUS * 2.6);

      // Soft ambient halo behind the ring — rebuilt only on resize, not per frame.
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      if (haloGradient) {
        ctx.fillStyle = haloGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = colors.composite;

      drawSet(outer, DEPTH * 10, isDark ? 1.1 : 0.65, cx, cy, scale);
      drawSet(inner, DEPTH, isDark ? 1.5 : 0.85, cx, cy, scale);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [inner, outer, isDark, reduceMotion, colors.composite, colors.glow]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
    </motion.div>
  );
}
