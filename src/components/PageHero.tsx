import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

export type PageHeroProps = {
  children: ReactNode;
  backgroundUrl: string;
  foregroundUrl?: string;
  foregroundAlt?: string;
  overlay?: "default" | "strong";
  className?: string;
};

/**
 * Premium split hero — real photography, white text in both themes.
 *
 * Overlay strategy (two layers):
 *  1. Top readability scrim: always dark/black-based → text is always readable
 *  2. Bottom page-blend: thin strip at the very bottom fades to background
 *
 * This prevents the "white wash" in light mode caused by using `from-background/80`
 * (which is near-white in light mode) as the main overlay.
 */
export default function PageHero({
  children,
  backgroundUrl,
  foregroundUrl,
  foregroundAlt = "",
  overlay = "default",
  className,
}: PageHeroProps) {
  const [foregroundLoaded, setForegroundLoaded] = useState(false);

  // More opaque top scrim for "strong" pages (busy photography)
  const topScrim = overlay === "strong"
    ? "from-black/60 via-black/35 to-transparent"
    : "from-black/50 via-black/20 to-transparent";

  return (
    <section
      className={cn(
        "relative overflow-hidden section-padding",
        foregroundUrl ? "" : "min-h-[44vh] md:min-h-[50vh] flex items-center",
        className,
      )}
    >
      {/* ── Background photo with subtle drift animation ── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 motion-safe:animate-hero-bg-drift bg-cover bg-center scale-105 motion-reduce:animate-none motion-reduce:scale-100"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      </div>

      {/*
        ── Layer 1: Top readability scrim ──
        Always dark/black — guarantees white text is readable over ANY photo,
        in both light and dark mode.
      */}
      <div
        className={cn("absolute inset-0 bg-gradient-to-b", topScrim)}
        aria-hidden
      />

      {/*
        ── Layer 2: Bottom page-blend ──
        Only a thin strip at the very bottom so the section blends into the page.
        Using `to-background` here is intentional — it only covers ~28% of height.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Subtle accent glow — adds depth without washing out the image */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.10),transparent_55%)] pointer-events-none"
        aria-hidden
      />

      {/* ── Content — hero-text-white forces white text in both themes ── */}
      <div className="container-wide relative z-10">
        {foregroundUrl ? (
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left column text */}
            <div className="max-w-3xl space-y-5 hero-text-white motion-safe:animate-hero-text-in motion-reduce:animate-none">
              {children}
            </div>

            {/* Right column image */}
            <div className="relative group motion-safe:animate-hero-media-in motion-reduce:animate-none lg:justify-self-end w-full max-w-none mx-auto lg:w-full">
              <div className="absolute -inset-8 lg:-inset-10 rounded-[2rem] bg-gradient-to-br from-primary/22 via-transparent to-accent/18 blur-2xl opacity-70 motion-safe:animate-hero-glow-pulse motion-reduce:animate-none" />
              <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full bg-primary/12 blur-2xl" aria-hidden />
              <div className="absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-accent/12 blur-2xl" aria-hidden />

              <div className="relative rounded-2xl border border-white/20 bg-white/8 backdrop-blur-xl shadow-[0_32px_100px_-28px_hsl(var(--primary)/0.38)] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                <div className="absolute -top-20 left-0 w-full h-40 bg-[radial-gradient(ellipse_at_top,hsla(var(--accent)/0.18),transparent_58%)] pointer-events-none" aria-hidden />
                <div className="relative min-h-[min(56vw,340px)] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[min(58vh,560px)] xl:min-h-[min(56vh,600px)] aspect-[4/3] sm:aspect-auto lg:aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={foregroundUrl}
                    alt={foregroundAlt}
                    className="h-full w-full min-h-full object-cover object-center motion-safe:animate-hero-image-float motion-reduce:animate-none [image-rendering:auto]"
                    loading="eager"
                    decoding="async"
                    onLoad={() => setForegroundLoaded(true)}
                    initial={{ opacity: 0, y: 12, scale: 1.02 }}
                    animate={{
                      opacity: foregroundLoaded ? 1 : 0,
                      y: foregroundLoaded ? 0 : 12,
                      scale: foregroundLoaded ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center space-y-5 hero-text-white motion-safe:animate-hero-text-in motion-reduce:animate-none">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
