import { motion, useReducedMotion } from "framer-motion";
import { BRAND_PRIMARY, brandAccentAt } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import { scrollEase, scrollViewport } from "@/lib/motion";

const FEATURES = [
  {
    title: "Automated compliance workflows",
    description:
      "Evidence validation, automated control checks, and structured assessments — assign by framework, collect proof automatically, and stop chasing spreadsheets.",
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

/** Rounded-rect orbit — clockwise: top-left → top → right → bottom → left */
const ORBIT_PATH =
  "M 64 36 C 64 36 64 20 80 20 H 920 C 936 20 936 36 936 36 V 364 C 936 380 920 380 920 380 H 80 C 64 380 64 364 64 364 V 36 Z";

const STEP_POSITIONS = [
  { left: "2.5%", top: "5%", align: "items-start" },
  { left: "97.5%", top: "5%", align: "items-end -translate-x-full" },
  { left: "50%", top: "95%", align: "items-center -translate-x-1/2" },
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

function StepNode({ index, compact = false }: { index: number; compact?: boolean }) {
  const accent = brandAccentAt(index);
  return (
    <div className="relative z-20 flex flex-col items-center">
      <span
        className={cn(
          "flex items-center justify-center rounded-full border-2 font-display font-extrabold",
          compact
            ? "h-8 w-8 text-xs sm:h-10 sm:w-10 sm:text-sm"
            : "h-10 w-10 text-sm sm:h-11 sm:w-11",
          "bg-white shadow-[0_8px_20px_-6px_rgba(48,92,222,0.45)]",
          "dark:bg-[hsl(225,42%,10%)] dark:shadow-[0_8px_24px_-6px_rgba(48,92,222,0.6)]",
        )}
        style={{ borderColor: accent, color: accent }}
      >
        0{index + 1}
      </span>
    </div>
  );
}

/** Circular orbit connector wrapping the card grid */
function OrbitalFlowConnectors() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      <svg
        viewBox="0 0 1000 400"
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandAccentAt(0)} />
            <stop offset="50%" stopColor={brandAccentAt(1)} />
            <stop offset="100%" stopColor={brandAccentAt(2)} />
          </linearGradient>
          <filter id="orbitGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="orbitArrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={brandAccentAt(1)} />
          </marker>
        </defs>

        {/* Soft outer glow ring */}
        <path
          d={ORBIT_PATH}
          stroke={BRAND_PRIMARY}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-[0.08] dark:opacity-[0.14]"
        />

        {/* Main dashed orbit track */}
        <path
          id="orbitTrack"
          d={ORBIT_PATH}
          stroke="url(#orbitGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 14"
          filter="url(#orbitGlow)"
          className="opacity-90"
        />

        {/* Inner echo track for depth */}
        <path
          d="M 88 52 C 88 52 88 40 100 40 H 900 C 912 40 912 52 912 52 V 348 C 912 360 900 360 900 360 H 100 C 88 360 88 348 88 348 V 52 Z"
          stroke={BRAND_PRIMARY}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 18"
          className="opacity-25"
        />

        {!reduceMotion && (
          <>
            {/* Flowing dash animation along the orbit */}
            <motion.path
              d={ORBIT_PATH}
              stroke={brandAccentAt(0)}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 20"
              className="opacity-60"
              animate={{ strokeDashoffset: [0, -104] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />

            {/* Primary traveling dot */}
            <motion.circle
              r="6"
              fill={brandAccentAt(0)}
              filter="url(#orbitGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: `path("${ORBIT_PATH}")` }}
            />

            {/* Trailing dot */}
            <motion.circle
              r="4"
              fill={brandAccentAt(1)}
              className="opacity-80"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: -0.35 }}
              style={{ offsetPath: `path("${ORBIT_PATH}")` }}
            />

            {/* Small sparkle dot */}
            <motion.circle
              r="3"
              fill={brandAccentAt(2)}
              className="opacity-70"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: -1.2 }}
              style={{ offsetPath: `path("${ORBIT_PATH}")` }}
            />

            {/* Animated arrow head riding the path */}
            <motion.g
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: -0.6 }}
              style={{ offsetPath: `path("${ORBIT_PATH}")`, offsetRotate: "auto" }}
            >
              <path
                d="M -10 -5 L 6 0 L -10 5 Z"
                fill={brandAccentAt(1)}
                filter="url(#orbitGlow)"
              />
            </motion.g>
          </>
        )}

        {/* Direction chevrons along the orbit */}
        <path d="M 488 18 L 512 18 L 500 34 Z" fill={brandAccentAt(0)} className="opacity-80" />
        <path d="M 948 188 L 948 212 L 932 200 Z" fill={brandAccentAt(1)} className="opacity-80" />
        <path d="M 512 382 L 488 382 L 500 366 Z" fill={brandAccentAt(2)} className="opacity-80" />
        <path d="M 52 212 L 52 188 L 68 200 Z" fill={brandAccentAt(0)} className="opacity-80" />
      </svg>

      {/* Step nodes pinned to orbit corners */}
      {STEP_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className={cn("absolute z-20 flex", pos.align)}
          style={{ left: pos.left, top: pos.top }}
        >
          <StepNode index={i} />
        </div>
      ))}
    </div>
  );
}

/** Mobile: compact step rail above cards */
function MobileStepRail() {
  return (
    <div aria-hidden className="mb-5 flex flex-wrap items-center justify-center gap-2 px-1 md:hidden">
      {FEATURES.map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <StepNode index={i} compact />
          {i < FEATURES.length - 1 && (
            <svg width="24" height="10" viewBox="0 0 32 12" fill="none" aria-hidden className="shrink-0">
              <path
                d="M0 6 C8 6 8 2 16 6 C24 10 24 6 32 6"
                stroke={brandAccentAt(i)}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />
            </svg>
          )}
        </div>
      ))}
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

        <MobileStepRail />

        <div className="relative px-0 pb-6 pt-4 sm:px-2 md:px-10 md:pb-10 md:pt-16">
          <OrbitalFlowConnectors />
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
