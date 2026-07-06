import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { scrollEase } from "@/lib/motion";

export type PageHeroProps = {
  children: ReactNode;
  backgroundUrl: string;
  foregroundUrl?: string;
  foregroundAlt?: string;
  /** How the foreground image fills its frame — use contain for product/dashboard shots */
  foregroundFit?: "cover" | "contain";
  overlay?: "default" | "strong";
  className?: string;
  /** When "none", skip the built-in CSS hero text entrance (use Framer Motion in children instead). */
  textEntrance?: "css" | "none";
};

/**
 * Premium split hero — cinematic depth layers, scroll parallax, dark enterprise scrim.
 */
export default function PageHero({
  children,
  backgroundUrl,
  foregroundUrl,
  foregroundAlt = "",
  foregroundFit = "cover",
  overlay = "default",
  className,
  textEntrance = "css",
}: PageHeroProps) {
  const [foregroundLoaded, setForegroundLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });
  const bgY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.6], [0.14, 0.04]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -48]);
  const mediaY = useTransform(smoothProgress, [0, 1], [0, -32]);

  const topScrim =
    overlay === "strong"
      ? "from-black/68 via-black/42 to-transparent"
      : "from-black/58 via-black/32 to-transparent";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden section-padding -mt-[72px] pt-[calc(var(--section-padding-y,3rem)+72px)] md:pt-[calc(var(--section-padding-y,4rem)+72px)]",
        foregroundUrl ? "" : "min-h-[36vh] md:min-h-[42vh] flex items-center",
        className,
      )}
    >
      {/* Layer 1 — photography with scroll drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 motion-safe:animate-hero-bg-drift bg-cover bg-center scale-105 motion-reduce:animate-none motion-reduce:scale-100"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      </motion.div>

      {/* Layer 2 — cyber dot grid */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: "radial-gradient(circle, rgba(200,210,255,0.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 75% at 50% 40%, black 5%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 40%, black 5%, transparent 90%)",
        }}
      />

      {/* Layer 3 — ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(48,92,222,0.14),transparent_58%)]"
      />

      {/* Layer 4 — readability scrim */}
      <div className={cn("absolute inset-0 bg-gradient-to-b", topScrim)} aria-hidden />

      {/* Layer 5 — bottom page blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Layer 6 — lateral depth vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/18 pointer-events-none md:from-black/22"
        aria-hidden
      />

      <div className="container-wide relative z-10">
        {foregroundUrl ? (
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-10 lg:gap-14 xl:gap-20 items-center">
            <motion.div
              className="max-w-3xl space-y-5 hero-text-white"
              style={{ y: contentY }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: scrollEase, delay: 0.08 }}
            >
              {children}
            </motion.div>

            <motion.div
              style={{ y: mediaY }}
              className="relative group motion-safe:animate-hero-media-in motion-reduce:animate-none lg:justify-self-end w-full max-w-none mx-auto lg:w-full"
            >
              <div
                className="absolute -inset-8 lg:-inset-10 rounded-[2rem] opacity-80 blur-2xl motion-safe:animate-hero-glow-pulse motion-reduce:animate-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(48,92,222,0.22), transparent 68%)" }}
              />
              <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full bg-indigo-500/10 blur-2xl" aria-hidden />
              <div className="absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-primary/10 blur-2xl" aria-hidden />

              <div
                className="relative rounded-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.08) inset, 0 32px 80px -24px rgba(0,0,0,0.65), 0 0 48px rgba(48,92,222,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="absolute -top-20 left-0 w-full h-40 bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.18),transparent_58%)] pointer-events-none"
                  aria-hidden
                />
                <div className="relative w-full overflow-hidden max-[480px]:pb-[75%] pb-[62.5%]">
                  <motion.img
                    src={foregroundUrl}
                    alt={foregroundAlt}
                    className={cn(
                      "absolute inset-0 h-full w-full object-center motion-safe:animate-hero-image-float motion-reduce:animate-none",
                      foregroundFit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover",
                    )}
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
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-5 hero-text-white"
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: scrollEase, delay: 0.08 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
