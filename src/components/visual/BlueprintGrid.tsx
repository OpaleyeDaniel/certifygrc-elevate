import { BRAND_PRIMARY } from "@/lib/brandColors";

/**
 * BlueprintGrid — sitewide decorative technical/blueprint grid texture,
 * similar in spirit to tailwindcss.com's background grid. Thin, very
 * low-opacity lines run behind every page's content as atmospheric texture:
 * never a visible box around text, buttons, or logos.
 *
 * - Grid lines, hatch, and cross-ticks each use a dedicated CSS custom
 *   property (`--grid-line-color`, `--grid-hatch-color`, `--grid-tick-color`)
 *   defined separately for light and dark mode in index.css — a fixed white
 *   at low opacity reads muddy/invisible in light mode, so each theme gets
 *   its own tuned color instead of reusing one value.
 * - A radial mask fades the grid out toward the edges instead of rendering
 *   as one flat, hard-edged rectangle — it reads strongest near the center
 *   of the viewport (where content usually sits) and tapers into nothing.
 * - Cell size steps up at breakpoints via CSS custom properties instead of
 *   a single fixed pixel tile, so the grid stays proportionate on resize.
 * - Diagonal hatch is applied only to the outer gutters beyond the site's
 *   `container-wide` (max-w-6xl / 72rem) column on large screens — a
 *   genuinely empty margin on every page, so it can never overlap content.
 * - A handful of neutral "+" cross-ticks mark a few grid intersections for a
 *   schematic feel, plus a few brand-colored accent pins (dot + cross) that
 *   break the uniform repeating pattern, like pins on a schematic.
 * - Two large, very soft, blurred brand-color blobs sit behind the grid so
 *   otherwise-empty space reads as intentional atmosphere rather than dead
 *   space with a grid pattern slapped on top.
 *
 * Mounted once in Layout as a fixed, pointer-events-none, z-0 layer (same
 * convention as the other ambient background layers in this project) so it
 * sits behind every route, including the landing page.
 *
 * Note: this is one global viewport-fixed layer rather than per-section
 * instances, so the vignette/pins/blobs stay put relative to the viewport
 * as you scroll instead of varying section-by-section. If specific sections
 * (hero, a card grid) want their own stronger/different grid treatment,
 * that's a separate, scoped addition on top of this.
 */

const GUTTER_WIDTH = "max(0px, calc((100vw - 72rem) / 2))";

const TICKS = [
  { top: "9%", left: "6.25%" },
  { top: "24%", left: "93.75%" },
  { top: "58%", left: "87.5%" },
  { top: "91%", left: "31.25%" },
];

const ACCENT_PINS = [
  { top: "16%", left: "16%" },
  { top: "34%", left: "82%" },
  { top: "68%", left: "20%" },
  { top: "84%", left: "70%" },
];

export default function BlueprintGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft blurred brand blobs — keep otherwise-empty space feeling
          atmospheric rather than dead, sitting behind the grid lines. */}
      <div
        className="absolute -left-[10%] top-[6%] h-[520px] w-[520px] rounded-full opacity-[0.05] blur-[90px]"
        style={{ background: BRAND_PRIMARY }}
      />
      <div
        className="absolute -right-[8%] bottom-[8%] h-[460px] w-[460px] rounded-full opacity-[0.05] blur-[90px]"
        style={{ background: BRAND_PRIMARY }}
      />

      {/* Grid lines — vertical + horizontal, cell size grows at breakpoints,
          faded via a radial mask so it's strongest near the center instead
          of reading as one flat, uniform rectangle. */}
      <div
        className="absolute inset-0 [--bp-cell:56px] sm:[--bp-cell:72px] lg:[--bp-cell:96px] xl:[--bp-cell:112px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--grid-line-color) 0 1px, transparent 1px var(--bp-cell)), repeating-linear-gradient(to bottom, var(--grid-line-color) 0 1px, transparent 1px var(--bp-cell))",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
        }}
      />

      {/* Outer gutters — diagonal drafting hatch marking empty margin space
          beyond the content column. Only exists past the container edge, so
          it never touches text/buttons/logos. */}
      <div
        className="absolute inset-y-0 left-0 hidden xl:block"
        style={{
          width: GUTTER_WIDTH,
          backgroundImage: "repeating-linear-gradient(45deg, var(--grid-hatch-color) 0 1px, transparent 1px 9px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 hidden xl:block"
        style={{
          width: GUTTER_WIDTH,
          backgroundImage: "repeating-linear-gradient(45deg, var(--grid-hatch-color) 0 1px, transparent 1px 9px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      {/* A few neutral schematic cross-tick marks at grid intersections */}
      {TICKS.map((t) => (
        <CrossTick key={`tick-${t.top}-${t.left}`} top={t.top} left={t.left} />
      ))}

      {/* A few brand-colored accent pins — break the uniform repeating
          pattern, like pins marking specific points on a schematic. */}
      {ACCENT_PINS.map((p) => (
        <AccentPin key={`pin-${p.top}-${p.left}`} top={p.top} left={p.left} />
      ))}
    </div>
  );
}

function CrossTick({ top, left }: { top: string; left: string }) {
  return (
    <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <span
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        style={{ background: "var(--grid-tick-color)" }}
      />
      <span
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
        style={{ background: "var(--grid-tick-color)" }}
      />
    </span>
  );
}

function AccentPin({ top, left }: { top: string; left: string }) {
  return (
    <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[0.5px]"
        style={{ background: BRAND_PRIMARY, opacity: 0.4 }}
      />
      <span
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 opacity-40"
        style={{ background: BRAND_PRIMARY }}
      />
      <span
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 opacity-40"
        style={{ background: BRAND_PRIMARY }}
      />
    </span>
  );
}
