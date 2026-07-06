import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * CyberGridCanvas — Security Network Infrastructure Background
 *
 * Renders a live compliance/security network visualization:
 *   • Node grid: compliance checkpoints at grid intersections
 *   • Edges:     pre-defined topology connections (18% density)
 *   • Packets:   data/compliance events flowing along established paths
 *   • Pulses:    node activation events when packets arrive
 *
 * The result looks like a live security monitoring or compliance
 * infrastructure map — meaningful, not decorative.
 */

/* ─── Config ──────────────────────────────────────────────────────── */
const CELL       = 68;     // node spacing (px)
const CONN_PROB  = 0.18;   // fraction of adjacent pairs that form an edge
const DIAG_PROB  = 0.055;  // diagonal connection probability
const MAX_PKTS   = 14;     // max simultaneous packets (desktop)
const MAX_MOB    = 7;      // max packets on mobile
const SPAWN_MS   = 880;    // ms between packet spawns
const PKT_SPD    = 1.3;    // pixels per frame along edge
const PULSE_DECAY= 0.022;  // activation decay per frame (1 → 0)
const TRAIL_LEN  = 18;     // max trail segment count

type RGB = readonly [number, number, number];
const BRAND: RGB = [48, 92, 222];
const BRAND_LIGHT_RGB: RGB = [91, 127, 232];
const BRAND_INDIGO_RGB: RGB = [74, 111, 212];
const PALETTE: RGB[] = [BRAND, BRAND, BRAND, BRAND, BRAND_LIGHT_RGB, BRAND_INDIGO_RGB, BRAND_LIGHT_RGB];

/** Edge/node "ink" — bright silver on dark backgrounds, deep navy ink on light ones. */
interface InkPalette {
  edge: string;
  node: string;
  pulse: string;
}
const DARK_INK: InkPalette = { edge: "220,230,255", node: "230,235,255", pulse: "180,200,255" };
const LIGHT_INK: InkPalette = { edge: "30,41,68", node: "22,30,54", pulse: "48,92,222" };

/* ─── Types ───────────────────────────────────────────────────────── */
interface NetworkNode {
  x: number;
  y: number;
  pulse: number;          // 0–1 activation intensity (decays each frame)
  neighbors: NetworkNode[];
}

interface Packet {
  from: NetworkNode;
  to:   NetworkNode;
  t:    number;           // 0–1 progress along current edge
  dist: number;           // pixel length of current edge (cached)
  rgb:  RGB;
  alpha: number;
  trail: { t: number }[]; // previous t values for trail
}

/* ─── Network builder ─────────────────────────────────────────────── */
function buildNetwork(W: number, H: number): NetworkNode[] {
  const cols = Math.ceil(W / CELL) + 1;
  const rows = Math.ceil(H / CELL) + 1;

  // Create node grid
  const grid: NetworkNode[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      x: c * CELL,
      y: r * CELL,
      pulse: 0,
      neighbors: [] as NetworkNode[],
    })),
  );

  // Wire up connections (right, down, down-right diagonal)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = grid[r][c];
      if (c + 1 < cols && Math.random() < CONN_PROB) {
        const nb = grid[r][c + 1];
        n.neighbors.push(nb);
        nb.neighbors.push(n);
      }
      if (r + 1 < rows && Math.random() < CONN_PROB) {
        const nb = grid[r + 1][c];
        n.neighbors.push(nb);
        nb.neighbors.push(n);
      }
      if (c + 1 < cols && r + 1 < rows && Math.random() < DIAG_PROB) {
        const nb = grid[r + 1][c + 1];
        n.neighbors.push(nb);
        nb.neighbors.push(n);
      }
    }
  }

  return grid.flat();
}

function edgeDist(a: NetworkNode, b: NetworkNode): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/* ─── Packet helpers ─────────────────────────────────────────────── */
function spawnPacket(nodes: NetworkNode[]): Packet | null {
  const candidates = nodes.filter(n => n.neighbors.length > 0);
  if (!candidates.length) return null;
  const from = candidates[Math.floor(Math.random() * candidates.length)];
  const to   = from.neighbors[Math.floor(Math.random() * from.neighbors.length)];
  return {
    from, to,
    t: 0,
    dist: edgeDist(from, to),
    rgb:  PALETTE[Math.floor(Math.random() * PALETTE.length)],
    alpha: 0.55 + Math.random() * 0.35,
    trail: [],
  };
}

function advancePacket(p: Packet): Packet | null {
  const step = PKT_SPD / p.dist;

  // Record trail
  p.trail.push({ t: p.t });
  if (p.trail.length > TRAIL_LEN) p.trail.shift();

  p.t += step;

  if (p.t >= 1) {
    // Arrived — activate destination node
    p.to.pulse = 1;

    // Continue to a different neighbor if available
    const next = p.to.neighbors.filter(n => n !== p.from);
    if (next.length > 0) {
      const newTo = next[Math.floor(Math.random() * next.length)];
      return {
        from:  p.to,
        to:    newTo,
        t:     0,
        dist:  edgeDist(p.to, newTo),
        rgb:   p.rgb,
        alpha: p.alpha,
        trail: [],
      };
    }
    // Dead end — reverse
    const newTo = p.from;
    return {
      from:  p.to,
      to:    newTo,
      t:     0,
      dist:  edgeDist(p.to, newTo),
      rgb:   p.rgb,
      alpha: p.alpha,
      trail: [],
    };
  }
  return p;
}

/* ─── Renderer ────────────────────────────────────────────────────── */
function paintFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  nodes: NetworkNode[],
  packets: Packet[],
  ink: InkPalette,
) {
  ctx.clearRect(0, 0, W, H);

  // Build edge set (deduplicated by rendering each neighbor pair once)
  const drawn = new Set<string>();
  for (const n of nodes) {
    for (const nb of n.neighbors) {
      const key = n.x < nb.x || (n.x === nb.x && n.y < nb.y)
        ? `${n.x},${n.y}|${nb.x},${nb.y}`
        : `${nb.x},${nb.y}|${n.x},${n.y}`;
      if (drawn.has(key)) continue;
      drawn.add(key);

      // Edge visibility fade at screen edges
      const ex = Math.min(
        Math.min(n.x, nb.x) / (W * 0.10),
        Math.min(W - n.x, W - nb.x) / (W * 0.10),
        1,
      );
      const ey = Math.min(
        Math.min(n.y, nb.y) / (H * 0.10),
        Math.min(H - n.y, H - nb.y) / (H * 0.10),
        1,
      );
      const fade = Math.sqrt(ex * ey);
      if (fade < 0.01) continue;

      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = `rgba(${ink.edge},${0.16 * fade})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
  }

  // Nodes
  for (const n of nodes) {
    const ex = Math.min(n.x / (W * 0.10), (W - n.x) / (W * 0.10), 1);
    const ey = Math.min(n.y / (H * 0.10), (H - n.y) / (H * 0.10), 1);
    const fade = Math.sqrt(ex * ey);
    if (fade < 0.01) continue;

    // Decay pulse
    if (n.pulse > 0) {
      n.pulse = Math.max(0, n.pulse - PULSE_DECAY);
      // Activation halo
      const radius = 4 + n.pulse * 20;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius);
      g.addColorStop(0, `rgba(${ink.pulse},${n.pulse * 0.65 * fade})`);
      g.addColorStop(1, `rgba(${ink.pulse},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Node dot — bright silver on dark bg, deep ink on light bg
    const r = n.neighbors.length > 0 ? 1.6 + n.pulse * 2.2 : 1.0;
    const a = n.neighbors.length > 0
      ? (0.32 + n.pulse * 0.45) * fade
      : 0.18 * fade;

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ink.node},${a})`;
    ctx.fill();
  }

  // Packets + trails
  for (const p of packets) {
    const { from: a, to: b, t, rgb, alpha } = p;

    // Draw trail
    for (let i = 0; i < p.trail.length; i++) {
      const tt = p.trail[i].t;
      const tx = a.x + (b.x - a.x) * tt;
      const ty = a.y + (b.y - a.y) * tt;
      const frac = (i + 1) / p.trail.length;
      const ta = frac * frac * alpha * 0.65;
      const tr = 0.5 + frac * 1.8;
      ctx.beginPath();
      ctx.arc(tx, ty, tr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${ta})`;
      ctx.fill();
    }

    // Head position
    const hx = a.x + (b.x - a.x) * t;
    const hy = a.y + (b.y - a.y) * t;

    // Glow halo around head
    const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 16);
    glow.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha * 0.58})`);
    glow.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
    ctx.beginPath();
    ctx.arc(hx, hy, 16, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Head dot
    ctx.beginPath();
    ctx.arc(hx, hy, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
    ctx.fill();
  }
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function CyberGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ink = isDark ? DARK_INK : LIGHT_INK;

    const isMobile = window.innerWidth < 768;
    const maxPkts  = isMobile ? MAX_MOB : MAX_PKTS;

    let W = 0, H = 0;
    let rafId = 0;
    let lastSpawn = 0;
    let nodes: NetworkNode[] = [];
    let packets: Packet[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild network on resize
      nodes   = buildNetwork(W, H);
      packets = [];
    }

    resize();

    function loop(ts: number) {
      rafId = requestAnimationFrame(loop);

      // Spawn new packet if below cap
      if (packets.length < maxPkts && ts - lastSpawn > SPAWN_MS) {
        const p = spawnPacket(nodes);
        if (p) packets.push(p);
        lastSpawn = ts;
      }

      // Advance all packets (returns updated packet or null if dead end chosen)
      const next: Packet[] = [];
      for (const p of packets) {
        const advanced = advancePacket(p);
        if (advanced) next.push(advanced);
      }
      packets = next;

      paintFrame(ctx!, W, H, nodes, packets, ink);
    }

    rafId = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [reducedMotion, isDark]);

  // Reduced-motion: static dot grid
  if (reducedMotion) {
    const dotColor = isDark ? "230,235,255" : "22,30,54";
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${dotColor},0.45) 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 5%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 5%, transparent 90%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 1 }}
    />
  );
}
