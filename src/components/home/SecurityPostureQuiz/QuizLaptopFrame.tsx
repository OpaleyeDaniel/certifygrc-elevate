import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const VIOLET_ACCENT = "#7C3AED";

/**
 * Attention-drawing glow — a soft, blurred halo behind the whole laptop plus
 * a tighter glow hugging the bezel edges, both pulsing gently on a loop. The
 * goal is a passive "come try this" cue that catches the eye on scroll
 * without being an obnoxious flashing box. Respects `prefers-reduced-motion`
 * by holding a single steady glow instead of animating.
 */
function AttentionGlow() {
  const reduceMotion = useReducedMotion();
  const pulse = reduceMotion
    ? undefined
    : { opacity: [0.45, 0.85, 0.45], scale: [0.99, 1.01, 0.99] };

  return (
    <>
      {/* Wide soft halo — visible from a distance as you scroll toward the section */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl sm:-inset-8"
        style={{ background: `linear-gradient(135deg, ${BRAND_PRIMARY}55, ${VIOLET_ACCENT}45)` }}
        animate={pulse}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Tighter ring hugging the bezel edges */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 -z-10 rounded-[1.35rem] blur-lg sm:-inset-2"
        style={{ background: `linear-gradient(135deg, ${BRAND_PRIMARY}80, ${VIOLET_ACCENT}70)` }}
        animate={pulse}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
    </>
  );
}

/**
 * Laptop bezel frame shared with the "Live Demo" section
 * (`PlatformShowcaseSection`'s `LaptopMockup`) — same bezel, hinge, keyboard
 * deck, and ground-shadow treatment, but the "screen" holds live interactive
 * quiz UI instead of an embedded video/iframe demo. Kept as its own small
 * component so both sections can evolve independently while still looking
 * like the same physical laptop.
 */
export default function QuizLaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <AttentionGlow />

      {/* Screen + bezel */}
      <div
        className="relative overflow-hidden rounded-t-xl rounded-b-md border border-white/10 bg-[#15181f] p-2 sm:p-2.5"
        style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55)" }}
      >
        {/* Camera notch */}
        <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-white/15 sm:top-1.5" aria-hidden />

        <div className="relative min-h-[560px] w-full overflow-hidden rounded-[4px] bg-background sm:min-h-[600px]">
          {children}
        </div>
      </div>

      {/* Hinge line */}
      <div className="h-[3px] w-full bg-gradient-to-b from-white/20 to-white/5" aria-hidden />

      {/* Base / keyboard deck */}
      <div className="relative mx-auto h-4 w-[104%] max-w-none -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-[#dfe2e8] to-[#c3c7d0] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.45)] sm:h-5">
        <div className="absolute left-1/2 top-0 h-1 w-[14%] -translate-x-1/2 rounded-b-md bg-[#b7bbc4]" aria-hidden />
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full opacity-50 blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)" }}
      />
    </div>
  );
}
