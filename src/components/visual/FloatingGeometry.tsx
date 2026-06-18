import type { MotionValue } from "framer-motion";
import { useReducedMotion, motion, useScroll, useSpring, useTransform } from "framer-motion";

import { BRAND_INDIGO, BRAND_LIGHT, BRAND_PALE, BRAND_PRIMARY } from "@/lib/brandColors";

/**
 * FloatingGeometry — Cybersecurity & Compliance Visual Objects
 *
 * Fixed-position SVG objects themed around GRC concepts:
 *   • ComplianceMatrix   — 4×4 status grid (compliance assessment)
 *   • SecurityShield     — layered shield geometry (cybersecurity)
 *   • FrameworkTree      — hierarchical structure (ISO/NIST tree)
 *   • NetworkTopology    — hub-and-spoke nodes (security network)
 *   • RiskMatrix         — 3×3 risk quadrant (risk assessment)
 *   • ControlDomain      — ring of control nodes (control domains)
 *   • AuditTrail         — linear pathway with nodes (audit flow)
 *   • DataFlowPath       — branching data pipeline
 *
 * All objects:
 *   • Stroke-only (weightless, no fill)
 *   • Very low opacity (0.035 – 0.065)
 *   • Slow float + rotation animations
 *   • Scroll parallax at three depth layers
 *   • Hidden on mobile
 */

const SPRING = { stiffness: 48, damping: 26, mass: 1.0 };

/* ──────────────────────────────────────────────────────────────────
   SVG Shape Library — Cybersecurity / GRC themed
   ────────────────────────────────────────────────────────────────── */

/** Compliance Status Matrix — 4×4 grid with some cells "active" */
function ComplianceMatrix({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const cells = 4;
  const cellSize = size / cells;
  const active = [0, 2, 5, 6, 10, 11, 14, 15]; // indices of highlighted cells
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Grid lines */}
      {Array.from({ length: cells + 1 }, (_, i) => (
        <g key={i}>
          <line x1={i * cellSize} y1={0} x2={i * cellSize} y2={size}
            stroke={color} strokeWidth="0.7" opacity={opacity} />
          <line x1={0} y1={i * cellSize} x2={size} y2={i * cellSize}
            stroke={color} strokeWidth="0.7" opacity={opacity} />
        </g>
      ))}
      {/* Active cells — slightly filled */}
      {active.map(idx => {
        const r = Math.floor(idx / cells);
        const c = idx % cells;
        return (
          <rect key={idx}
            x={c * cellSize + 1} y={r * cellSize + 1}
            width={cellSize - 2} height={cellSize - 2}
            fill={color} opacity={opacity * 0.35}
            rx={1}
          />
        );
      })}
      {/* Corner tick marks */}
      {[[0,0],[size,0],[size,size],[0,size]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={color} opacity={opacity * 0.9} />
      ))}
    </svg>
  );
}

/** Security Shield — layered shield with inner hex grid */
function SecurityShield({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const w = size;
  const h = size * 1.15;
  const shieldPath = `M${w/2} 6 L${w-6} ${h*0.22} L${w-6} ${h*0.52} C${w-6} ${h*0.76} ${w*0.7} ${h*0.9} ${w/2} ${h-4} C${w*0.3} ${h*0.9} 6 ${h*0.76} 6 ${h*0.52} L6 ${h*0.22} Z`;
  const innerPath = `M${w/2} ${h*0.12} L${w-14} ${h*0.28} L${w-14} ${h*0.52} C${w-14} ${h*0.70} ${w*0.7} ${h*0.82} ${w/2} ${h*0.90} C${w*0.3} ${h*0.82} 14 ${h*0.70} 14 ${h*0.52} L14 ${h*0.28} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={shieldPath} stroke={color} strokeWidth="1.2" opacity={opacity} />
      <path d={innerPath} stroke={color} strokeWidth="0.6" opacity={opacity * 0.5} />
      {/* Center checkmark suggestion */}
      <line x1={w*0.36} y1={h*0.50} x2={w*0.47} y2={h*0.62} stroke={color} strokeWidth="1.5" opacity={opacity * 0.8} strokeLinecap="round" />
      <line x1={w*0.47} y1={h*0.62} x2={w*0.66} y2={h*0.38} stroke={color} strokeWidth="1.5" opacity={opacity * 0.8} strokeLinecap="round" />
    </svg>
  );
}

/** Framework Hierarchy — tree structure (ISO/NIST control hierarchy) */
function FrameworkTree({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  const nodes = [
    { x: s * 0.50, y: s * 0.10 },  // root
    { x: s * 0.22, y: s * 0.40 },  // level 2 left
    { x: s * 0.78, y: s * 0.40 },  // level 2 right
    { x: s * 0.10, y: s * 0.72 },  // level 3
    { x: s * 0.34, y: s * 0.72 },  // level 3
    { x: s * 0.64, y: s * 0.72 },  // level 3
    { x: s * 0.90, y: s * 0.72 },  // level 3
  ];
  const edges: [number, number][] = [
    [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],
  ];
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeWidth="0.8" opacity={opacity * 0.8}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i}
          cx={n.x} cy={n.y}
          r={i === 0 ? 4.5 : 3}
          fill={color} opacity={i === 0 ? opacity * 1.2 : opacity * 0.85}
        />
      ))}
    </svg>
  );
}

/** Network Topology — hub-and-spoke (security network) */
function NetworkTopology({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  const hub = { x: s * 0.50, y: s * 0.50 };
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return { x: hub.x + Math.cos(a) * s * 0.38, y: hub.y + Math.sin(a) * s * 0.38 };
  });
  // Cross-connections between some spokes
  const cross: [number, number][] = [[0,1],[2,3],[4,5],[1,2]];
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Spoke lines */}
      {spokes.map((sp, i) => (
        <line key={i}
          x1={hub.x} y1={hub.y} x2={sp.x} y2={sp.y}
          stroke={color} strokeWidth="0.8" opacity={opacity * 0.9}
        />
      ))}
      {/* Cross connections */}
      {cross.map(([a, b], i) => (
        <line key={i}
          x1={spokes[a].x} y1={spokes[a].y}
          x2={spokes[b].x} y2={spokes[b].y}
          stroke={color} strokeWidth="0.5" opacity={opacity * 0.45}
          strokeDasharray="2 3"
        />
      ))}
      {/* Spoke nodes */}
      {spokes.map((sp, i) => (
        <circle key={i} cx={sp.x} cy={sp.y} r={2.8}
          fill={color} opacity={opacity * 0.95}
        />
      ))}
      {/* Hub rings */}
      <circle cx={hub.x} cy={hub.y} r={7} stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx={hub.x} cy={hub.y} r={3.5} fill={color} opacity={opacity * 1.1} />
    </svg>
  );
}

/** Risk Matrix — 3×3 quadrant with risk gradient (high/med/low) */
function RiskMatrix({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  const cell = s / 3;
  // Cells range from empty (low risk) to filled (high risk)
  const intensity = [0.05, 0.12, 0.30, 0.10, 0.22, 0.42, 0.18, 0.35, 0.55];
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Grid */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <line x1={i*cell} y1={0} x2={i*cell} y2={s} stroke={color} strokeWidth="0.7" opacity={opacity} />
          <line x1={0} y1={i*cell} x2={s} y2={i*cell} stroke={color} strokeWidth="0.7" opacity={opacity} />
        </g>
      ))}
      {/* Risk intensity fill */}
      {intensity.map((v, idx) => {
        const r = Math.floor(idx / 3);
        const c = idx % 3;
        return (
          <rect key={idx}
            x={c * cell + 1} y={r * cell + 1}
            width={cell - 2} height={cell - 2}
            fill={color} opacity={opacity * v}
          />
        );
      })}
      {/* Corner circles */}
      {[[0,0],[s,0],[s,s],[0,s]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill={color} opacity={opacity * 0.8} />
      ))}
    </svg>
  );
}

/** Audit Trail — flowing pathway with milestone nodes */
function AuditTrail({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  const milestones = [
    { x: s * 0.10, y: s * 0.50 },
    { x: s * 0.28, y: s * 0.25 },
    { x: s * 0.50, y: s * 0.60 },
    { x: s * 0.72, y: s * 0.32 },
    { x: s * 0.90, y: s * 0.55 },
  ];
  const path = milestones.map((m, i) => `${i === 0 ? "M" : "L"}${m.x},${m.y}`).join(" ");
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Path */}
      <path d={path} stroke={color} strokeWidth="0.9" opacity={opacity * 0.8} strokeLinecap="round" />
      {/* Milestones */}
      {milestones.map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy={m.y} r={i === 0 || i === milestones.length - 1 ? 5 : 3.5}
            stroke={color} strokeWidth="1" fill="none" opacity={opacity} />
          <circle cx={m.x} cy={m.y} r={1.5}
            fill={color} opacity={opacity * 0.9} />
        </g>
      ))}
    </svg>
  );
}

/** Control Domain — circular arrangement of control domains */
function ControlDomain({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  const cx = s / 2;
  const r1 = s * 0.42;
  const r2 = s * 0.24;
  const domainCount = 7;
  const domains = Array.from({ length: domainCount }, (_, i) => {
    const a = (2 * Math.PI * i) / domainCount - Math.PI / 2;
    return {
      x: cx + Math.cos(a) * r1,
      y: cx + Math.sin(a) * r1,
    };
  });
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Outer ring */}
      <circle cx={cx} cy={cx} r={r1} stroke={color} strokeWidth="0.7" opacity={opacity * 0.5} strokeDasharray="4 6" />
      {/* Inner ring */}
      <circle cx={cx} cy={cx} r={r2} stroke={color} strokeWidth="0.6" opacity={opacity * 0.35} />
      {/* Spoke lines */}
      {domains.map((d, i) => (
        <line key={i}
          x1={cx} y1={cx} x2={d.x} y2={d.y}
          stroke={color} strokeWidth="0.5" opacity={opacity * 0.4}
        />
      ))}
      {/* Domain nodes */}
      {domains.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3.5}
          fill={color} opacity={opacity * (i % 3 === 0 ? 1.1 : 0.75)}
        />
      ))}
      {/* Center */}
      <circle cx={cx} cy={cx} r={5} stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx={cx} cy={cx} r={2} fill={color} opacity={opacity * 1.1} />
    </svg>
  );
}

/** Data Flow Path — branching pipeline (data/evidence collection) */
function DataFlowPath({ color, opacity, size }: { color: string; opacity: number; size: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Main trunk */}
      <line x1={s*0.10} y1={s*0.50} x2={s*0.90} y2={s*0.50}
        stroke={color} strokeWidth="0.9" opacity={opacity} />
      {/* Branches above */}
      <polyline points={`${s*0.30},${s*0.50} ${s*0.30},${s*0.22} ${s*0.55},${s*0.22}`}
        stroke={color} strokeWidth="0.7" opacity={opacity * 0.7} />
      <polyline points={`${s*0.60},${s*0.50} ${s*0.60},${s*0.22} ${s*0.82},${s*0.22}`}
        stroke={color} strokeWidth="0.7" opacity={opacity * 0.7} />
      {/* Branches below */}
      <polyline points={`${s*0.45},${s*0.50} ${s*0.45},${s*0.78} ${s*0.70},${s*0.78}`}
        stroke={color} strokeWidth="0.7" opacity={opacity * 0.6} />
      {/* Nodes on trunk */}
      {[0.10, 0.30, 0.45, 0.60, 0.75, 0.90].map((px, i) => (
        <circle key={i} cx={s*px} cy={s*0.50} r={i === 0 || i === 5 ? 4 : 2.5}
          fill={color} opacity={opacity * (i === 0 || i === 5 ? 1.0 : 0.75)} />
      ))}
      {/* Branch endpoints */}
      {[[s*0.55,s*0.22],[s*0.82,s*0.22],[s*0.70,s*0.78]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={color} opacity={opacity * 0.7} />
      ))}
    </svg>
  );
}

/* ─── Shape configuration ─────────────────────────────────────────── */
type ShapeType =
  | "complianceMatrix" | "shield" | "frameworkTree"
  | "networkTopology"  | "riskMatrix" | "auditTrail"
  | "controlDomain"    | "dataFlow";

interface ShapeConfig {
  type: ShapeType;
  left?: string; right?: string;
  top?: string; bottom?: string;
  size: number;
  color: string;
  opacity: number;
  depth: number;      // 0 = far/slow, 1 = near/fast
  rotation: number;
  floatDur: number;
  floatAmp: number;
  rotateDeg: number;
}

const SHAPES: ShapeConfig[] = [
  { type: "complianceMatrix", right: "3%",  top: "4%",   size: 120, color: BRAND_LIGHT, opacity: 0.14, depth: 0.08, rotation: 8,   floatDur: 18, floatAmp: 10, rotateDeg: 4 },
  { type: "networkTopology",  left: "1.5%", top: "30%",  size: 108, color: BRAND_PRIMARY, opacity: 0.15, depth: 0.22, rotation: 0,   floatDur: 22, floatAmp: 14, rotateDeg: 8 },
  { type: "frameworkTree",    right: "2%",  top: "60%",  size: 130, color: BRAND_INDIGO, opacity: 0.12, depth: 0.09, rotation: 0,   floatDur: 26, floatAmp: 8,  rotateDeg: 0 },
  { type: "riskMatrix",       right: "5%",  top: "40%",  size: 72,  color: BRAND_LIGHT, opacity: 0.16, depth: 0.34, rotation: 0,   floatDur: 14, floatAmp: 16, rotateDeg: 6 },
  { type: "auditTrail",       left: "3%",   top: "8%",   size: 90,  color: BRAND_INDIGO, opacity: 0.13, depth: 0.18, rotation: 0,   floatDur: 20, floatAmp: 11, rotateDeg: 0 },
  { type: "shield",           left: "3.5%", top: "74%",  size: 70,  color: BRAND_PRIMARY, opacity: 0.14, depth: 0.12, rotation: 0,   floatDur: 24, floatAmp: 9,  rotateDeg: 4 },
  { type: "controlDomain",    right: "7%",  top: "20%",  size: 88,  color: BRAND_PALE, opacity: 0.13, depth: 0.30, rotation: 18,  floatDur: 16, floatAmp: 13, rotateDeg: 30 },
  { type: "dataFlow",         right: "20%", top: "84%",  size: 74,  color: BRAND_INDIGO, opacity: 0.11, depth: 0.15, rotation: 0,   floatDur: 21, floatAmp: 7,  rotateDeg: -6 },
];

const RENDERERS: Record<ShapeType, typeof ComplianceMatrix> = {
  complianceMatrix: ComplianceMatrix,
  shield:           SecurityShield,
  frameworkTree:    FrameworkTree,
  networkTopology:  NetworkTopology,
  riskMatrix:       RiskMatrix,
  auditTrail:       AuditTrail,
  controlDomain:    ControlDomain,
  dataFlow:         DataFlowPath,
};

/* ─── Individual shape — owns its own parallax transform ──────────── */
function FloatingShape({ cfg, smoothScrollY }: { cfg: ShapeConfig; smoothScrollY: MotionValue<number> }) {
  const parallaxY = useTransform(smoothScrollY, (v) => v * cfg.depth * -0.052);

  const Shape = RENDERERS[cfg.type];

  const posStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 2,
    pointerEvents: "none",
    willChange: "transform",
    ...(cfg.left   && { left:   cfg.left }),
    ...(cfg.right  && { right:  cfg.right }),
    ...(cfg.top    && { top:    cfg.top }),
    ...(cfg.bottom && { bottom: cfg.bottom }),
  };

  return (
    <motion.div
      aria-hidden
      style={{ ...posStyle, y: parallaxY }}
      className="hidden sm:block"
    >
      <motion.div
        animate={{
          y:      [0, -cfg.floatAmp, 0],
          rotate: [cfg.rotation, cfg.rotation + cfg.rotateDeg, cfg.rotation],
        }}
        transition={{
          duration: cfg.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Shape color={cfg.color} opacity={cfg.opacity} size={cfg.size} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main export ──────────────────────────────────────────────────── */
export default function FloatingGeometry() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, SPRING);

  if (reducedMotion) return null;

  return (
    <>
      {SHAPES.map((cfg, i) => (
        <FloatingShape key={i} cfg={cfg} smoothScrollY={smoothScrollY} />
      ))}
    </>
  );
}
