import { motion, useReducedMotion } from "framer-motion";
import { BRAND_PRIMARY, brandAccentAt } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import { scrollEase, scrollViewport } from "@/lib/motion";

const FEATURES = [
  {
    title: "Automated compliance workflows",
    description:
      "Assign controls by framework, collect evidence automatically, and run structured assessments — so teams stop chasing spreadsheets and start operating.",
    image: "/home-features/workflow-mockup.png",
    imageAlt: "Structured compliance workflow — controls, eLearning, and certification steps",
  },
  {
    title: "Real-time command center",
    description:
      "Monitor posture, control status, and program progress from desktop or mobile. Your GRC metrics stay visible wherever your team works.",
    image: "/home-features/mobile-mockup.png",
    imageAlt: "Mobile and desktop GRC dashboard with training progress and course tracking",
  },
  {
    title: "Continuous audit readiness",
    description:
      "Expiry alerts, evidence trails, and export-ready audit packs keep you ahead of every review — with a clear record of who did what, and when.",
    image: "/home-features/compliance-mockup.png",
    imageAlt: "Compliance dashboard with training completion, activity timeline, and audit status",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: scrollEase, delay: i * 0.1 },
  }),
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white transition-shadow duration-300",
        "hover:shadow-[0_28px_56px_-24px_rgba(48,92,222,0.35)]",
        "dark:bg-[hsl(225,42%,9%)] dark:hover:shadow-[0_28px_56px_-24px_rgba(48,92,222,0.45)]",
      )}
      style={{
        border: `2px solid ${BRAND_PRIMARY}`,
        boxShadow: `0 16px 40px -20px rgba(48, 92, 222, 0.22), inset 0 -3px 0 ${BRAND_PRIMARY}`,
      }}
    >
      {/* Mockup area — flush to top edge */}
      <div
        className={cn(
          "relative overflow-hidden",
          "bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)]",
          "dark:bg-[linear-gradient(180deg,hsl(225,38%,13%)_0%,hsl(225,42%,9%)_100%)]",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(48,92,222,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-white/10 dark:bg-[hsl(225,40%,11%)]">
          <img
            src={feature.image}
            alt={feature.imageAlt}
            className="h-auto w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col px-6 pb-8 pt-5 text-center sm:px-7">
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 sm:text-xl dark:text-white">
          {feature.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[15px] dark:text-white/65">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

function StepNode({ index }: { index: number }) {
  const accent = brandAccentAt(index);
  return (
    <div className="relative z-10 flex flex-col items-center">
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-xs font-extrabold sm:h-10 sm:w-10 sm:text-sm",
          "bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.25)]",
          "dark:bg-[hsl(225,42%,10%)] dark:shadow-[0_6px_20px_-6px_rgba(48,92,222,0.55)]",
        )}
        style={{ borderColor: accent, color: accent }}
      >
        0{index + 1}
      </span>
      <span className="h-2.5 w-px" style={{ background: accent }} aria-hidden />
    </div>
  );
}

/** Serpentine flow path with animated swimmers between step nodes */
function SwimmingFlowConnectors({ count }: { count: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-[22px] hidden h-[52px] md:block"
    >
      <svg
        viewBox="0 0 1000 52"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="flowStroke1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={brandAccentAt(0)} />
            <stop offset="100%" stopColor={brandAccentAt(1)} />
          </linearGradient>
          <linearGradient id="flowStroke2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={brandAccentAt(1)} />
            <stop offset="100%" stopColor={brandAccentAt(2)} />
          </linearGradient>
          <filter id="flowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Swooping path: node 1 → dips up → node 2 → dips down → node 3 */}
        <path
          id="swimPath1"
          d="M 166 30 C 280 30, 320 6, 500 30"
          stroke="url(#flowStroke1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 10"
          filter="url(#flowGlow)"
          className="opacity-80 dark:opacity-90"
        />
        <path
          id="swimPath2"
          d="M 500 30 C 680 54, 720 30, 834 30"
          stroke="url(#flowStroke2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 10"
          filter="url(#flowGlow)"
          className="opacity-80 dark:opacity-90"
        />

        {!reduceMotion && (
          <>
            <motion.path
              d="M 166 30 C 280 30, 320 6, 500 30"
              stroke={brandAccentAt(0)}
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="4 14"
              className="opacity-40"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 500 30 C 680 54, 720 30, 834 30"
              stroke={brandAccentAt(2)}
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="4 14"
              className="opacity-40"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
            />
          </>
        )}

        {/* Arrow chevrons along the curves */}
        <path
          d="M 318 14 L 328 22 L 318 30"
          stroke={brandAccentAt(0)}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />
        <path
          d="M 682 46 L 692 38 L 682 30"
          stroke={brandAccentAt(1)}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />

        {!reduceMotion && (
          <>
            <motion.circle
              r="4"
              fill={brandAccentAt(0)}
              filter="url(#flowGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ offsetPath: 'path("M 166 30 C 280 30, 320 6, 500 30")' }}
            />
            <motion.circle
              r="3.5"
              fill={brandAccentAt(1)}
              filter="url(#flowGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
              style={{ offsetPath: 'path("M 166 30 C 280 30, 320 6, 500 30")' }}
            />
            <motion.circle
              r="4"
              fill={brandAccentAt(1)}
              filter="url(#flowGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              style={{ offsetPath: 'path("M 500 30 C 680 54, 720 30, 834 30")' }}
            />
            <motion.circle
              r="3"
              fill={brandAccentAt(2)}
              filter="url(#flowGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
              style={{ offsetPath: 'path("M 500 30 C 680 54, 720 30, 834 30")' }}
            />
          </>
        )}
      </svg>

      <div className="relative grid h-full grid-cols-3 gap-5 lg:gap-7">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex justify-center">
            <StepNode index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(48,92,222,0.07), transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="mb-12 text-center md:mb-14">
          <motion.p
            className="text-sm font-semibold md:text-base"
            style={{ color: BRAND_PRIMARY }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.55, ease: scrollEase }}
          >
            Platform Features
          </motion.p>
          <motion.h2
            className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, ease: scrollEase, delay: 0.05 }}
          >
            Built for enterprise{" "}
            <span className="text-primary">compliance</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-white/65"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, ease: scrollEase, delay: 0.1 }}
          >
            Every feature designed to reduce manual effort and accelerate your path to compliance.
          </motion.p>
        </div>

        <div className="relative mt-7 sm:mt-8">
          <SwimmingFlowConnectors count={FEATURES.length} />
          <div className="relative z-10 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
