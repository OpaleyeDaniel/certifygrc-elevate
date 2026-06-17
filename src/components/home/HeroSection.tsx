import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, LayoutGrid, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSupademo from "@/components/home/HeroSupademo";
import { heroImagery } from "@/constants/heroImagery";

const TRUST_PILLS = [
  { icon: CheckCircle2, label: "ISO 27001 ready" },
  { icon: Zap, label: "Continuous control testing" },
  { icon: BarChart3, label: "Executive-ready reporting" },
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

  return (
    <section
      className="relative overflow-hidden -mt-[72px] pt-[72px]"
      style={{ minHeight: "min(100svh, 920px)" }}
      aria-labelledby="home-hero-heading"
    >
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

      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-[5%] h-[420px] w-[520px] rounded-full opacity-50 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22), transparent 68%)" }}
      />

      <div className="relative z-10 container-wide flex min-h-[min(100svh,920px)] flex-col justify-center py-16 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">

          {/* Copy */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-300/90"
            >
              Enterprise GRC Platform
            </motion.p>

            <motion.h1
              id="home-hero-heading"
              custom={1}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="font-display font-bold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.125rem, 4.5vw, 3.35rem)" }}
            >
              Operationalize trust{" "}
              <span className="gradient-text block sm:inline">without the chaos</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-5 text-base md:text-lg font-medium text-white/85"
            >
              <span className="text-cyan-400">Audit-ready</span>
              <span className="text-white/40 mx-2">·</span>
              One platform for controls &amp; evidence
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-4 text-base md:text-[1.05rem] leading-relaxed text-white/55 max-w-[26rem] mx-auto lg:mx-0"
            >
              Unify frameworks, workflows, and audit-ready proof in a single system so compliance
              keeps pace with how your business actually runs.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-sm font-semibold group glow-primary"
              >
                <Link to="/consulting">
                  Start assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-sm font-semibold border-white/15 bg-white/[0.04] text-white/90 hover:bg-white/[0.08] hover:text-white"
              >
                <Link to="/software">
                  <LayoutGrid className="mr-2 h-4 w-4 opacity-80" />
                  Explore platform
                </Link>
              </Button>
            </motion.div>

            <motion.p
              custom={5}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-5 text-xs text-white/35"
            >
              No credit card required · Built for regulated teams shipping under scrutiny
            </motion.p>

            <motion.ul
              custom={6}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              {TRUST_PILLS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/65"
                >
                  <Icon className="h-3.5 w-3.5 text-indigo-400/80 shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* SupaDemo — standalone product preview */}
          <motion.div
            className="relative w-full min-w-0 mx-auto max-w-[640px] lg:max-w-none"
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
