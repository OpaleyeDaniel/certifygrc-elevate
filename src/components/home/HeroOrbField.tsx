/**
 * HeroOrbField — a single thin, understated orbit ring with a traveling
 * "live" node behind the hero copy. Earlier iterations layered soft blurred
 * gradient orbs here too, but they read as messy blue "bubbles" against both
 * themes — removed. This keeps just the subtle continuous-monitoring motif.
 */

/** Thin orbit ring with a traveling "live" node — subtle continuous-monitoring motif. */
function OrbitRing() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-[8%] top-[12%] h-[420px] w-[420px] opacity-[0.35] sm:opacity-[0.45]"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="url(#orbit-grad)"
          strokeWidth="0.6"
          strokeDasharray="2 4"
        />
        <defs>
          <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g>
          <circle r="3.2" fill="hsl(var(--primary))">
            <animateMotion dur="9s" repeatCount="indefinite" path="M 192,100 A 92,92 0 1 1 8,100 A 92,92 0 1 1 192,100" />
          </circle>
        </g>
      </svg>
    </div>
  );
}

export default function HeroOrbField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <OrbitRing />
    </div>
  );
}
