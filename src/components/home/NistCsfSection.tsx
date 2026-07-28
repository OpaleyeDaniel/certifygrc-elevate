import { useEffect, useRef, useState } from "react";
import { Building2, Search, ShieldCheck, Eye } from "lucide-react";
import { motion, useInView, useReducedMotion, AnimatePresence, animate } from "framer-motion";
import { revealUp, scrollEase, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CSF_BRAND_VARIANTS } from "@/components/home/nistCsfBrand";

/* ─── CSF 2.0 Function Data ─────────────────────────────────────────── */
/* Respond & Recover are intentionally left out of this interactive list —
   only functions with a real product screenshot are shown here. The full
   6-function framework is still represented in the stats bar below. */

const CSF_FUNCTIONS = [
  {
    id: "govern",
    code: "GV",
    name: "Govern",
    icon: Building2,
    ...CSF_BRAND_VARIANTS[0],
    blurb: "Set cybersecurity strategy, policy, and oversight from the top down.",
    isNew: true,
    image: "/nist-csf/govern.png",
    /** Wide dashboard — anchor left so sidebar + assessment stay visible when cropped. */
    imageObjectPosition: "12% 8%",
  },
  {
    id: "identify",
    code: "ID",
    name: "Identify",
    icon: Search,
    ...CSF_BRAND_VARIANTS[1],
    blurb: "Map assets, data, and risk so nothing critical goes unmanaged.",
    isNew: false,
    image: "/nist-csf/identify.png",
  },
  {
    id: "protect",
    code: "PR",
    name: "Protect",
    icon: ShieldCheck,
    ...CSF_BRAND_VARIANTS[2],
    blurb: "Enforce access controls, data security, and safeguards at scale.",
    isNew: false,
    image: "/nist-csf/protect.png",
  },
  {
    id: "detect",
    code: "DE",
    name: "Detect",
    icon: Eye,
    ...CSF_BRAND_VARIANTS[3],
    blurb: "Continuously monitor for anomalies before they become incidents.",
    isNew: false,
    image: "/nist-csf/detect.png",
  },
] as const;

type CsfFunction = (typeof CSF_FUNCTIONS)[number];

/* ─── Category row (left list) — flat, no card, no dropdown ────────────── */

function CategoryRow({
  fn,
  isActive,
  onClick,
  index,
}: {
  fn: CsfFunction;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={revealUp}
      custom={index * 0.05}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      aria-pressed={isActive}
      className="group flex w-full items-start gap-4 border-l-2 py-3.5 pl-4 text-left transition-colors duration-200"
      style={{ borderColor: isActive ? fn.color : "transparent" }}
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-lg font-bold transition-colors duration-200 sm:text-xl",
              isActive ? "" : "text-muted-foreground/70 group-hover:text-foreground/70",
            )}
            style={isActive ? { color: fn.color } : undefined}
          >
            {fn.name}
          </span>
          {fn.isNew && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide transition-opacity duration-200"
              style={{
                background: `${fn.color}18`,
                color: fn.color,
                border: `1px solid ${fn.color}30`,
                opacity: isActive ? 1 : 0.5,
              }}
            >
              New 2.0
            </span>
          )}
        </span>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.span
              key="blurb"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="mt-1.5 block max-w-sm text-sm leading-relaxed text-muted-foreground">
                {fn.blurb}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

/* ─── Count-up stat card ─────────────────────────────────────────────────
   Parses "6", "22", "106+", "100%" into a leading number plus any suffix
   ("+", "%"), then animates that number from 0 to its target once the card
   scrolls into view. Runs once (viewport `once: true`) so it doesn't
   re-count every time you scroll past it. Respects reduced-motion by
   jumping straight to the final value instead of animating. */

function CountUpStat({
  value,
  label,
  accent,
  index,
}: {
  value: string;
  label: string;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(reduceMotion ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.5,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, target, prefix, suffix, value, index]);

  return (
    <motion.div
      ref={ref}
      variants={revealUp}
      custom={index * 0.08}
      className="rounded-xl p-4 text-center"
      style={{ background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--background)))", border: "1px solid hsl(var(--border))" }}
    >
      <p className="font-display font-bold text-2xl tabular-nums" style={{ color: accent }}>
        {display}
      </p>
      <p className="mt-1 text-xs text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────────── */

export default function NistCsfSection() {
  const [active, setActive] = useState<string>("govern");
  const activeFn = CSF_FUNCTIONS.find((f) => f.id === active)!;

  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left: heading, description, interactive category list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <motion.div variants={revealUp}>
              <span
                className="inline-flex items-center gap-2 mb-4 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase"
                style={{
                  background: "rgba(48,92,222,0.08)",
                  border: "1px solid rgba(48,92,222,0.2)",
                  color: "hsl(var(--primary))",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
                Flagship Framework
              </span>
            </motion.div>

            <motion.h2
              variants={revealUp}
              className="font-display font-bold text-foreground text-display-lg"
            >
              Built Around <span className="gradient-text">NIST CSF 2.0</span>
            </motion.h2>

            <motion.p variants={revealUp} className="mt-4 text-muted-foreground text-body-lg leading-relaxed">
              The NIST Cybersecurity Framework 2.0 is the gold standard for enterprise risk management.
              CertifyGRC automates every function — from governance strategy to recovery planning.
            </motion.p>

            <div className="mt-9">
              {CSF_FUNCTIONS.map((fn, i) => (
                <CategoryRow
                  key={fn.id}
                  fn={fn}
                  isActive={active === fn.id}
                  onClick={() => setActive(fn.id)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: large preview image, swaps with the active category */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/40 shadow-[0_24px_64px_-24px_rgba(48,92,222,0.35)] aspect-[4/3] lg:aspect-[908/1024]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFn.id}
                  src={activeFn.image}
                  alt={`${activeFn.name} function dashboard preview`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [...scrollEase] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition:
                      "imageObjectPosition" in activeFn && activeFn.imageObjectPosition
                        ? activeFn.imageObjectPosition
                        : "center center",
                  }}
                  loading="lazy"
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: "6", label: "Core functions", accent: "hsl(var(--primary))" },
            { value: "22", label: "Categories covered", accent: "hsl(var(--accent))" },
            { value: "106+", label: "Subcategory outcomes", accent: "#4A6FD4" },
            { value: "100%", label: "Automated mapping", accent: "#5B7FE8" },
          ].map(({ value, label, accent }, i) => (
            <CountUpStat key={label} value={value} label={label} accent={accent} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
