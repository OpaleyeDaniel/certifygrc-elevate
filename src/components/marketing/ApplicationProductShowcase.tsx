import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

type ApplicationProductShowcaseProps = {
  src: string;
  alt: string;
  /** Short label shown under the image (replaces the old floating pill on the image). */
  label: string;
  className?: string;
  /** Use full column width (no mid-size width cap) — for hero-style dashboard bands. */
  wide?: boolean;
  /** Optional stats or meta row between the image and the caption. */
  belowImage?: ReactNode;
  /** Subtle post-reveal float loop (honors reduced motion). */
  float?: boolean;
};

/**
 * Large, floating product UI shot for Application / Software pages — minimal chrome, maximum clarity.
 */
export default function ApplicationProductShowcase({
  src,
  alt,
  label,
  className,
  wide = false,
  belowImage,
  float = false,
}: ApplicationProductShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("relative min-w-0", className)}>
      {/* Ambient depth — no boxed frame */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 h-[min(78%,520px)] w-[min(118%,680px)] rounded-[50%] bg-gradient-to-br from-primary/18 via-primary/5 to-cyan-500/10 blur-3xl opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-[88%] -translate-x-1/2 rounded-[100%] bg-foreground/5 blur-2xl"
        aria-hidden
      />

      <motion.div
        className={cn(
          "relative mx-auto w-full",
          wide ? "max-w-none" : "max-w-[min(100%,720px)] lg:max-w-none",
        )}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ ...scrollViewport, once: true, margin: "-12% 0px" }}
        transition={{ duration: scrollRevealDuration + 0.12, ease: [...scrollEase] }}
      >
        <motion.div
          className="group relative [transform-style:preserve-3d] will-change-transform"
          animate={
            float && !prefersReducedMotion
              ? { y: [0, -5, 0] }
              : undefined
          }
          transition={
            float && !prefersReducedMotion
              ? { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          {/* Subtle 3D tilt on desktop — flattens on hover for polish */}
          <div
            className={cn(
              "origin-center transition-transform duration-700 ease-out will-change-transform",
              "md:[transform:perspective(1600px)_rotateY(-3deg)_rotateX(2deg)]",
              "md:group-hover:[transform:perspective(1600px)_rotateY(-0.5deg)_rotateX(0.5deg)]",
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl md:rounded-[1.65rem]",
                wide &&
                  "shadow-[0_42px_110px_-32px_rgba(15,23,42,0.45),0_22px_52px_-30px_rgba(37,99,235,0.2)]",
                !wide &&
                  "shadow-[0_36px_90px_-28px_rgba(15,23,42,0.4),0_18px_40px_-28px_rgba(37,99,235,0.18)]",
                "ring-1 ring-white/[0.06]",
                "transition-[transform,box-shadow] duration-700 ease-out",
                "group-hover:shadow-[0_44px_100px_-26px_rgba(15,23,42,0.55),0_24px_56px_-28px_rgba(37,99,235,0.28)]",
                "group-hover:md:-translate-y-1",
              )}
            >
              {/* Natural image height — no min-height + object-contain letterboxing */}
              <img
                src={src}
                alt={alt}
                className={cn(
                  "block h-auto w-full max-w-full select-none align-top",
                  "max-h-[min(92vh,960px)]",
                  "object-contain object-top [image-rendering:auto]",
                )}
                loading="lazy"
                decoding="async"
                sizes={
                  wide
                    ? "(max-width: 768px) 100vw, (max-width: 1280px) 92vw, min(1200px, 72vw)"
                    : "(max-width: 1024px) 100vw, min(56vw, 900px)"
                }
                draggable={false}
              />
            </div>
          </div>
        </motion.div>

        {belowImage ? <div className="mt-5 w-full min-w-0">{belowImage}</div> : null}

        <p
          className={cn(
            "text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs",
            belowImage ? "mt-4" : "mt-5",
          )}
        >
          {label}
        </p>
      </motion.div>
    </div>
  );
}
