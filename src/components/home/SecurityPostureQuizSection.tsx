import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Gauge, MousePointerClick, Target } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SecurityPostureQuiz from "@/components/home/SecurityPostureQuiz/SecurityPostureQuiz";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";
import { brandAccentAt, BRAND_PRIMARY } from "@/lib/brandColors";

const HIGHLIGHTS = [
  { icon: ClipboardList, text: "16 questions across all 6 NIST CSF 2.0 functions" },
  { icon: Gauge, text: "Instant maturity score and posture profile" },
  { icon: Target, text: "Priority focus areas and top gaps to fix first" },
];

/**
 * A small "come try this" nudge that appears once the section scrolls into
 * view — a short delay, then a few gentle bounces to catch the eye, settling
 * into a slow idle pulse rather than bouncing forever (that gets annoying
 * fast). Purely decorative/marketing, so it's `pointer-events-none` and
 * respects `prefers-reduced-motion` with a plain fade-in instead.
 */
function TryItNudge() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -top-4 right-3 z-20 sm:-top-5 sm:right-8"
    >
      <motion.div
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-white shadow-[0_10px_30px_-8px_rgba(48,92,222,0.6)]"
        style={{ background: `linear-gradient(135deg, ${BRAND_PRIMARY}, #7C3AED)` }}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -6, 0, -6, 0, 0, 0, 0], opacity: [1, 1, 1, 1, 1, 0.85, 1, 0.85] }
        }
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, delay: 1.1, ease: "easeInOut" }}
      >
        <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
        Try it — 3 min
      </motion.div>
    </motion.div>
  );
}

/**
 * "Security Posture Quiz" lead magnet — a short, Typeform-style assessment
 * that estimates NIST CSF 2.0 maturity from 16 sample questions, gated
 * behind email capture. Frontend-only marketing tool, separate from (and not
 * connected to) the main CertifyGRC platform's full 106-control assessment.
 * Rendered inside a laptop mockup to match the "Live Demo" section above it.
 */
export default function SecurityPostureQuizSection() {
  return (
    <section
      id="free-assessment"
      className="section-padding relative scroll-mt-24 overflow-hidden bg-transparent sm:scroll-mt-28"
    >
      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Free Assessment"
          title="How mature is your security program?"
          description="Answer 16 quick questions aligned to NIST CSF 2.0 and get a personalized maturity profile and gap summary — free."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <motion.div variants={revealUp} className="order-2 lg:order-1">
            <h3 className="font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
              A quick pulse check before the full assessment
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              This mini quiz mirrors the same Yes / Partial / No model CertifyGRC uses across all 106 NIST CSF 2.0
              controls — just a smaller, faster sample so you can see where you stand today.
            </p>

            <div className="mt-6 space-y-3.5">
              {HIGHLIGHTS.map(({ icon: Icon, text }, i) => {
                const accent = brandAccentAt(i);
                return (
                  <div key={text} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: accent }} aria-hidden />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85">{text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="relative order-1 lg:order-2">
            <TryItNudge />
            <SecurityPostureQuiz />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
