import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Gauge,
  RadioTower,
  BadgeCheck,
  ScanEye,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSupademo from "@/components/home/HeroSupademo";
import HeroParticleRing from "@/components/home/HeroParticleRing";
import { heroImagery } from "@/constants/heroImagery";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const TRUST_PILLS = [
  { icon: BadgeCheck, label: "NIST CSF 2.0 ready" },
  { icon: ScanEye, label: "Continuous control testing" },
  { icon: FileCheck2, label: "Executive-ready reporting" },
];

const VALUE_PROPS = ["Build trust", "Strengthen resilience", "Accelerate growth"];

const PROOF_STATS = [
  { icon: ShieldCheck, value: "40+", label: "Frameworks mapped" },
  { icon: Gauge, value: "70%", label: "Faster audit prep" },
  { icon: RadioTower, value: "24/7", label: "Continuous monitoring" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: i * 0.07 },
  }),
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { openDemo } = useBooking();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative overflow-hidden -mt-[72px] pt-[72px]"
      style={{ minHeight: "min(100svh, 920px)" }}
      aria-labelledby="home-hero-heading"
    >
      {isDark ? (
        <>
          {/* Background photo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${heroImagery.home.background})` }}
          />

          {/* Dark scrim */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(5,8,16,0.82) 0%, rgba(8,12,22,0.9) 45%, rgba(4,6,14,0.94) 100%)",
            }}
          />

          {/* Dot grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(210,218,255,0.55) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, black 10%, transparent 88%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, black 10%, transparent 88%)",
            }}
          />
        </>
      ) : (
        <>
          {/* Light-mode wash — soft brand tint, kept translucent so the
              ambient network canvas underneath reads clearly through it
              instead of being washed out. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(236,240,252,0.6) 0%, rgba(223,231,250,0.5) 45%, rgba(248,250,255,0.62) 100%)",
            }}
          />
          {/* Soft top sheen so the navbar edge blends cleanly */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)" }}
          />
        </>
      )}

      {/* Rotating particle-ring ambience — sits above the flat background wash,
          below the copy/demo panel */}
      <HeroParticleRing />

      <div className="relative z-10 container-wide flex min-h-[min(100svh,920px)] flex-col justify-center pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-32 xl:max-w-[78rem]">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[0.92fr_1.18fr] lg:gap-10 xl:gap-6">

          {/* Copy */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mb-5 flex justify-center lg:justify-start"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.14), hsl(var(--accent) / 0.08))",
                  border: "1px solid hsl(var(--primary) / 0.32)",
                  color: "hsl(var(--primary))",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
                Enterprise GRC Platform
              </span>
            </motion.div>

            <motion.h1
              id="home-hero-heading"
              custom={1}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.125rem, 4.5vw, 3.35rem)" }}
            >
              Operationalize trust{" "}
              <span className="gradient-text block sm:inline">without the chaos</span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start"
            >
              {VALUE_PROPS.map((phrase, i) => (
                <span
                  key={phrase}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold tracking-[-0.01em] sm:text-[13px]",
                    i === 0
                      ? "bg-primary/12 text-primary"
                      : "bg-foreground/[0.04] text-foreground/70",
                  )}
                >
                  <span
                    className={cn("h-1 w-1 rounded-full", i === 0 ? "bg-primary" : "bg-foreground/30")}
                    aria-hidden
                  />
                  {phrase}
                </span>
              ))}
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-5 text-base md:text-[1.05rem] leading-relaxed text-muted-foreground max-w-[28rem] mx-auto lg:mx-0"
            >
              The AI-Powered Cyber Resilience &amp; Compliance Platform that helps organizations
              implement, validate, and sustain cybersecurity and compliance programs.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="h-12 px-7 text-sm font-semibold group glow-primary"
                onClick={openDemo}
              >
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-sm font-semibold group border-transparent bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-[hsl(222,47%,12%)] dark:text-white dark:hover:bg-[hsl(222,47%,16%)]"
              >
                <Link to="/cyber-aware">
                  <PlayCircle className="mr-2 h-4 w-4 opacity-90 transition-transform group-hover:scale-110" />
                  See CyberDrill in action
                </Link>
              </Button>
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-10 grid grid-cols-3 gap-1 border-t border-foreground/[0.08] pt-6 sm:flex sm:items-center sm:justify-center sm:gap-7 lg:justify-start"
            >
              {PROOF_STATS.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={cn(
                    "flex min-w-0 flex-col items-center px-1 text-center sm:flex-row sm:gap-2 sm:px-0 sm:text-left",
                    i > 0 && "border-l border-foreground/[0.08] sm:border-l-0",
                  )}
                >
                  <Icon className="mb-0.5 h-3.5 w-3.5 shrink-0 text-primary/70 sm:mb-0 sm:h-4 sm:w-4" aria-hidden />
                  <div className="min-w-0">
                    <div className="font-display text-sm font-bold leading-none text-foreground sm:text-lg">
                      {value}
                    </div>
                    <div className="mt-1 text-[9px] leading-tight text-muted-foreground sm:text-[11px]">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={6}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {TRUST_PILLS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1.5 text-[10.5px] font-semibold tracking-[-0.01em] text-foreground/70 backdrop-blur-sm sm:text-[11px]"
                >
                  <Icon className="h-3 w-3 shrink-0 text-primary/80" aria-hidden />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* SupaDemo — standalone product preview, staged as a panel emerging from the backdrop */}
          <motion.div
            className="relative w-full min-w-0 mx-auto max-w-[640px] lg:max-w-none lg:justify-self-end xl:mr-[-2rem] 2xl:mr-[-4rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.18 }}
          >
            <HeroSupademo />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
