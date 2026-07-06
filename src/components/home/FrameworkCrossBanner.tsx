import { FRAMEWORKS, type Framework } from "@/constants/frameworks";

function Diamond() {
  return <span aria-hidden className="h-2.5 w-2.5 shrink-0 rotate-45 border-2 border-white/30 sm:h-3 sm:w-3" />;
}

function BigChip({ fw }: { fw: Framework }) {
  return (
    <div className="flex shrink-0 items-center gap-3 sm:gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-[0_6px_20px_rgba(0,0,0,0.4)] sm:h-16 sm:w-16 sm:p-2.5 lg:h-[4.25rem] lg:w-[4.25rem]">
        <img src={fw.image} alt="" className="h-full w-full object-contain" loading="lazy" draggable={false} />
      </span>
      <span className="whitespace-nowrap font-display text-lg font-extrabold uppercase tracking-tight text-white sm:text-2xl lg:text-[1.85rem]">
        {fw.name}
      </span>
    </div>
  );
}

/**
 * One badge "unit" — chip + diamond separator — carrying its OWN trailing
 * margin instead of relying on the track's flex `gap`.
 *
 * This is the actual fix: flex `gap` only inserts space BETWEEN children,
 * never after the last one. A doubled N-item array only ever gets (N-1)
 * gaps, so translateX(-50%) — half of a track that's short exactly one
 * gap-width — lands half a gap short of a true full-copy repeat. That's
 * the visible seam/jump at the loop point. Giving every unit its own
 * trailing margin (applied unconditionally, including the very last item)
 * makes the track's total width an exact multiple of (unit + margin), so
 * -50% always lands exactly on the boundary between the two copies.
 */
function BadgeUnit({ fw, i, copy }: { fw: Framework; i: number; copy: string }) {
  return (
    <div
      key={`${copy}-${fw.name}-${i}`}
      className="flex shrink-0 items-center gap-6 mr-6 sm:gap-8 sm:mr-8 lg:gap-10 lg:mr-10"
    >
      <BigChip fw={fw} />
      <Diamond />
    </div>
  );
}

/** One full pass through the badge list — rendered twice per band below. */
function BandTrack({ items, copy }: { items: Framework[]; copy: string }) {
  return (
    <>
      {items.map((fw, i) => (
        <BadgeUnit key={`${copy}-${fw.name}-${i}`} fw={fw} i={i} copy={copy} />
      ))}
    </>
  );
}

/**
 * Fine technical grid texture — thin lines both directions, plus a scatter
 * of soft diamond cross-ticks — so the band reads as a textured surface
 * instead of a flat rectangle. Sits on the STATIC backdrop, not the
 * scrolling track, so the grid holds still while badges glide over it.
 */
function GridTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    />
  );
}

/** Soft, saturated color blooms bleeding through the grid — this is what
 *  breaks the "flat blue box" look, without ever competing with the badges. */
function ColorBlooms({ colors }: { colors: [string, string] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ mixBlendMode: "screen" }}>
      <div
        className="absolute left-[8%] top-1/2 h-[220%] w-[26rem] -translate-y-1/2 rounded-full opacity-60 blur-[70px]"
        style={{ background: colors[0] }}
      />
      <div
        className="absolute left-[62%] top-1/2 h-[220%] w-[30rem] -translate-y-1/2 rounded-full opacity-50 blur-[80px]"
        style={{ background: colors[1] }}
      />
      <div
        className="absolute left-[38%] top-1/2 h-[200%] w-[22rem] -translate-y-1/2 rounded-full opacity-40 blur-[70px]"
        style={{ background: colors[0] }}
      />
    </div>
  );
}

/**
 * A single crossing band: two pixel-identical copies of the badge set,
 * back to back. `translateX(-50%)` — exactly half the track's total
 * width — lines copy 2 up perfectly where copy 1 started. Linear timing
 * (no ease) keeps the speed constant through the seam.
 *
 * Visual design: the gradient, grid texture, and color blooms all live on a
 * STATIC backdrop layer (a sibling of the animated track, not inside it),
 * so the colorful surface holds still while only the badges scroll across
 * it — a moving grid AND a moving background at once would look chaotic.
 */
function Band({
  items,
  rotate,
  animationClass,
  gradient,
  bloomColors,
  z,
}: {
  items: Framework[];
  rotate: number;
  animationClass: string;
  gradient: string;
  bloomColors: [string, string];
  z?: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 w-max"
      style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)`, zIndex: z }}
    >
      {/* Static colorful backdrop — sized to match the track, never scrolls */}
      <div className="absolute inset-0 overflow-hidden border-y border-white/10" style={{ background: gradient }}>
        <ColorBlooms colors={bloomColors} />
        <GridTexture />
      </div>

      {/* Animated track — transparent, just carries the scrolling badges */}
      <div
        className={`relative flex w-max items-center py-4 motion-reduce:animate-none sm:py-6 ${animationClass}`}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        <BandTrack items={items} copy="a" />
        <BandTrack items={items} copy="b" />
      </div>
    </div>
  );
}

/**
 * Full-bleed, big-and-bold "cross" marquee — two opposing bands sharing the
 * same rotation center so they weave through an X right in the middle of the
 * section. Sits directly under the hero with a negative top margin so it
 * flows into the hero's bottom fade instead of sitting as a separate block.
 *
 * Each band gets its own two-tone gradient + color blooms — indigo/violet
 * for one, indigo/teal for the other — so the X reads as a deliberate,
 * colorful crossing instead of two identical dark bars.
 */
export default function FrameworkCrossBanner() {
  return (
    <section
      aria-hidden
      className="relative -mt-24 h-[200px] w-full overflow-hidden sm:-mt-32 sm:h-[260px] lg:-mt-36 lg:h-[300px]"
    >
      <Band
        items={FRAMEWORKS}
        rotate={-4.5}
        animationClass="motion-safe:animate-marquee-stream"
        gradient="linear-gradient(100deg, #05070d 0%, #0d1330 16%, #1b1f52 42%, #2a1f5e 58%, #12163f 78%, #05070d 100%)"
        bloomColors={["#4A6FD4", "#7C3AED"]}
      />
      <Band
        items={[...FRAMEWORKS].reverse()}
        rotate={4.5}
        animationClass="motion-safe:animate-marquee-stream-reverse"
        gradient="linear-gradient(100deg, #05070d 0%, #0d1a2e 16%, #123650 42%, #0f2f4a 58%, #0d1a2e 78%, #05070d 100%)"
        bloomColors={["#305CDE", "#14B8A6"]}
        z={10}
      />
    </section>
  );
}
