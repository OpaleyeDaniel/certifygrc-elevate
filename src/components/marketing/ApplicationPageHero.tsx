import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollEase } from "@/lib/motion";
import { BRAND_PRIMARY, BRAND_PRIMARY_RGB } from "@/lib/brandColors";
import type { ReactNode } from "react";

/** Compliance Operating System product visual */
const HERO_IMAGE = "/ecosystem/compliance-os.png";

type ApplicationPageHeroProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Application hero — light + dark themes: copy left, Compliance OS visual on the right.
 */
export default function ApplicationPageHero({ children, className }: ApplicationPageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden section-padding -mt-[72px]",
        "pt-[calc(var(--section-padding-y,3rem)+72px)] md:pt-[calc(var(--section-padding-y,4rem)+72px)]",
        "pb-12 md:pb-16 lg:pb-20",
        "bg-gradient-to-b from-background via-background to-primary/[0.05]",
        "dark:from-[hsl(222,47%,5%)] dark:via-[hsl(225,42%,7%)] dark:to-[hsl(222,47%,6%)]",
        className,
      )}
    >
      {/* Ambient wash — soft in light, glow in dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-40"
        style={{
          background: `radial-gradient(ellipse 72% 58% at 78% 40%, rgba(${BRAND_PRIMARY_RGB}, 0.12) 0%, rgba(${BRAND_PRIMARY_RGB}, 0.04) 38%, transparent 68%)`,
        }}
      />

      <div className="container-wide relative">
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-6 xl:gap-10">
          <motion.div
            className="relative z-10 max-w-lg space-y-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: scrollEase, delay: 0.06 }}
          >
            {children}
          </motion.div>

          <motion.div
            className="relative mx-auto aspect-[4/3] w-full max-w-[620px] sm:aspect-[16/12] lg:mx-0 lg:mr-[-1.5rem] lg:aspect-auto lg:h-[min(520px,74vh)] lg:max-w-none xl:mr-[-2.5rem] xl:h-[min(560px,76vh)]"
            initial={{ opacity: 0, x: 28, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.85, ease: scrollEase, delay: 0.14 }}
          >
            {/* Outer ring */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[94%] -translate-x-[48%] -translate-y-1/2 rounded-full sm:w-[90%] lg:w-[min(100%,540px)]",
                "border border-border/40 bg-primary/[0.04]",
                "dark:border-white/[0.07] dark:bg-white/[0.02]",
              )}
            />

            {/* Blue accent orb — pale glow (light) / solid orb (dark) */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6%] right-[2%] aspect-square w-[52%] rounded-full sm:w-[48%] lg:bottom-[8%] lg:right-[4%] lg:w-[46%] dark:hidden"
              style={{
                background: `radial-gradient(circle at 42% 38%, rgba(${BRAND_PRIMARY_RGB}, 0.28) 0%, rgba(${BRAND_PRIMARY_RGB}, 0.12) 48%, rgba(${BRAND_PRIMARY_RGB}, 0.04) 72%, transparent 100%)`,
                boxShadow: `0 0 72px rgba(${BRAND_PRIMARY_RGB}, 0.18)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6%] right-[2%] hidden aspect-square w-[52%] rounded-full sm:w-[48%] lg:bottom-[8%] lg:right-[4%] lg:w-[46%] dark:block"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${BRAND_PRIMARY} 0%, rgba(${BRAND_PRIMARY_RGB}, 0.85) 55%, rgba(${BRAND_PRIMARY_RGB}, 0.35) 100%)`,
                boxShadow: `0 0 80px rgba(${BRAND_PRIMARY_RGB}, 0.45)`,
              }}
            />

            {/* Perspective grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[8%] right-0 h-[38%] overflow-hidden opacity-35 dark:opacity-70"
              style={{
                maskImage: "linear-gradient(to top, black 25%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 95%)",
              }}
            >
              <div
                className="absolute inset-x-0 bottom-0 h-full origin-bottom dark:hidden"
                style={{
                  transform: "perspective(520px) rotateX(68deg)",
                  backgroundImage: `
                    linear-gradient(rgba(${BRAND_PRIMARY_RGB}, 0.22) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(${BRAND_PRIMARY_RGB}, 0.22) 1px, transparent 1px)
                  `,
                  backgroundSize: "42px 42px",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 hidden h-full origin-bottom dark:block"
                style={{
                  transform: "perspective(520px) rotateX(68deg)",
                  backgroundImage: `
                    linear-gradient(rgba(${BRAND_PRIMARY_RGB}, 0.55) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(${BRAND_PRIMARY_RGB}, 0.55) 1px, transparent 1px)
                  `,
                  backgroundSize: "42px 42px",
                }}
              />
            </div>

            {/* Vertical accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[2%] top-[18%] h-[58%] w-[3.5%] min-w-[10px] rounded-full opacity-80 dark:opacity-90"
              style={{
                background: `linear-gradient(180deg, rgba(${BRAND_PRIMARY_RGB}, 0.08) 0%, rgba(${BRAND_PRIMARY_RGB}, 0.35) 50%, rgba(${BRAND_PRIMARY_RGB}, 0.1) 100%)`,
              }}
            />

            <img
              src={HERO_IMAGE}
              alt="CertifyGRC Compliance Operating System dashboard preview"
              className={cn(
                "relative z-[1] h-full w-full object-contain object-center lg:scale-[1.04] xl:scale-[1.08]",
                "drop-shadow-[0_28px_56px_rgba(48,92,222,0.16)]",
                "dark:drop-shadow-[0_32px_64px_rgba(0,0,0,0.55)]",
              )}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
