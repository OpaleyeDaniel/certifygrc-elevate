import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { FRAMEWORKS as frameworks, type Framework } from "@/constants/frameworks";

/**
 * Icon + name chip used inside the trust strip. Carries its own trailing
 * margin (instead of the track relying on flex `gap`) so the doubled track
 * loops seamlessly — see the note on `FrameworkTrustStrip` below.
 */
function FrameworkChip({ fw }: { fw: Framework }) {
  return (
    <div
      className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4"
      style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1.5 md:h-10 md:w-10"
      >
        <img src={fw.image} alt="" className="h-full w-full object-contain" loading="lazy" draggable={false} />
      </span>
      <span className="whitespace-nowrap font-display text-xs font-semibold text-foreground/80 md:text-sm">
        {fw.name}
      </span>
    </div>
  );
}

/**
 * Single clean horizontal trust strip — the bold crossing effect already
 * lives under the hero, so this stays a simple, well-lit logo row instead
 * of repeating (and diluting) that treatment.
 *
 * Spacing note: the track uses per-chip trailing margin (`mr-3` on
 * `FrameworkChip`) instead of a flex `gap` on this container. Flex `gap`
 * only inserts space BETWEEN children, never after the last one — so a
 * doubled N-item row only gets (N-1) gaps, and translateX(-50%) lands half
 * a gap short of a true full-copy repeat, causing a visible seam at the
 * loop point. Per-item trailing margin makes the track's total width an
 * exact multiple of (chip + margin), so -50% always lands exactly on the
 * boundary between the two copies.
 */
function FrameworkTrustStrip() {
  const row = [...frameworks, ...frameworks];

  return (
    <div aria-hidden className="relative mb-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

      <div
        className="flex w-max items-center py-2 motion-safe:animate-marquee-stream motion-reduce:animate-none"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {row.map((fw, i) => (
          <FrameworkChip key={`row-${fw.name}-${i}`} fw={fw} />
        ))}
      </div>
    </div>
  );
}

export default function FrameworksSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Compliance Frameworks"
          title="Comprehensive framework coverage"
          description="Support across the most critical governance and compliance standards — built into the platform from day one."
        />

        <FrameworkTrustStrip />

        <PremiumCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 max-w-4xl mx-auto">
          {frameworks.map((fw) => (
            <PremiumCard key={fw.name} padding="sm" contentClassName="flex flex-row items-start gap-4">
              <div
                className="w-12 h-12 flex-shrink-0 rounded-xl p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_PRIMARY}12, ${BRAND_PRIMARY}06)`,
                  border: `1px solid ${BRAND_PRIMARY}25`,
                }}
              >
                <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-semibold text-sm text-foreground block group-hover:text-primary transition-colors">
                  {fw.name}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{fw.description}</p>
              </div>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
