import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Search,
  ShieldCheck,
  Eye,
  Radio,
  RefreshCw,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { revealUp, scrollEase, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CSF_BRAND_VARIANTS } from "@/components/home/nistCsfBrand";

/* ─── CSF 2.0 Function Data ─────────────────────────────────────────── */

const CSF_FUNCTIONS = [
  {
    id: "govern",
    code: "GV",
    name: "Govern",
    tagline: "Strategy & Risk Oversight",
    icon: Building2,
    ...CSF_BRAND_VARIANTS[0],
    description:
      "Establish and communicate cybersecurity risk management strategy, expectations, and policy across the organization. The Govern function is new in NIST CSF 2.0 and provides the organizational context for all other functions.",
    outcomes: [
      "Organizational Context (GV.OC)",
      "Risk Management Strategy (GV.RM)",
      "Roles, Responsibilities & Authorities (GV.RR)",
      "Policy (GV.PO)",
      "Oversight (GV.OV)",
      "Cybersecurity Supply Chain Risk Management (GV.SC)",
    ],
    isNew: true,
  },
  {
    id: "identify",
    code: "ID",
    name: "Identify",
    tagline: "Assets & Risk Assessment",
    icon: Search,
    ...CSF_BRAND_VARIANTS[1],
    description:
      "Develop an organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities. Asset management, risk assessment, and improvement planning enable informed risk decisions.",
    outcomes: [
      "Asset Management (ID.AM)",
      "Risk Assessment (ID.RA)",
      "Improvement (ID.IM)",
    ],
    isNew: false,
  },
  {
    id: "protect",
    code: "PR",
    name: "Protect",
    tagline: "Safeguards & Controls",
    icon: ShieldCheck,
    ...CSF_BRAND_VARIANTS[2],
    description:
      "Develop and implement appropriate safeguards to ensure delivery of critical infrastructure services. Controls for identity management, data security, protective technology, and platform security.",
    outcomes: [
      "Identity Management, Authentication & Access Control (PR.AA)",
      "Awareness & Training (PR.AT)",
      "Data Security (PR.DS)",
      "Platform Security (PR.PS)",
      "Technology Infrastructure Resilience (PR.IR)",
    ],
    isNew: false,
  },
  {
    id: "detect",
    code: "DE",
    name: "Detect",
    tagline: "Continuous Monitoring",
    icon: Eye,
    ...CSF_BRAND_VARIANTS[3],
    description:
      "Develop and implement appropriate activities to identify cybersecurity events. Continuous monitoring capabilities and anomalies-and-events detection enable rapid discovery of threats.",
    outcomes: [
      "Continuous Monitoring (DE.CM)",
      "Adverse Event Analysis (DE.AE)",
    ],
    isNew: false,
  },
  {
    id: "respond",
    code: "RS",
    name: "Respond",
    tagline: "Incident Management",
    icon: Radio,
    ...CSF_BRAND_VARIANTS[4],
    description:
      "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident. Incident management, communications, and mitigation ensure controlled response.",
    outcomes: [
      "Incident Management (RS.MA)",
      "Incident Analysis (RS.AN)",
      "Incident Response Reporting & Communication (RS.CO)",
      "Incident Mitigation (RS.MI)",
    ],
    isNew: false,
  },
  {
    id: "recover",
    code: "RC",
    name: "Recover",
    tagline: "Resilience & Improvements",
    icon: RefreshCw,
    ...CSF_BRAND_VARIANTS[5],
    description:
      "Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.",
    outcomes: [
      "Incident Recovery Plan Execution (RC.RP)",
      "Incident Recovery Communication (RC.CO)",
    ],
    isNew: false,
  },
] as const;

type CsfFunction = (typeof CSF_FUNCTIONS)[number];

/* ─── Mouse glow hook ────────────────────────────────────────────────── */

function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}

/* ─── Individual CSF Card ─────────────────────────────────────────────── */

function CsfCard({
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
  const { ref, onMouseMove } = useMouseGlow();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={revealUp}
      custom={index * 0.06}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        aria-pressed={isActive}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-2xl p-5 transition-all duration-300",
          isActive ? "shadow-[0_8px_32px_-8px_var(--card-glow)]" : "hover:-translate-y-1",
        )}
        style={
          {
            border: isActive ? `1px solid ${fn.color}55` : `1px solid ${fn.color}30`,
            background: isActive
              ? `linear-gradient(155deg, ${fn.color}35 0%, ${fn.color}16 42%, hsl(221,42%,12%) 100%)`
              : `linear-gradient(155deg, ${fn.color}22 0%, ${fn.color}0a 45%, hsl(221,42%,13%) 100%)`,
            boxShadow: isActive
              ? `0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px -8px ${fn.glow}`
              : `0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 20px rgba(0,0,0,0.45)`,
            "--card-glow": fn.glow,
            "--card-accent": fn.color,
            "--glow-x": "50%",
            "--glow-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Full-surface accent tint */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 0% 0%, ${fn.color}18, transparent 55%)`,
          }}
        />

        {/* Mouse-tracking glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--glow-x) var(--glow-y), var(--card-glow), transparent 70%)",
          }}
        />

        {/* Subtle hover shimmer — no harsh metallic sweep */}
        {!reduceMotion && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                transform: "skewX(-12deg)",
              }}
            />
          </div>
        )}

        {/* Active top border accent */}
        {isActive && (
          <motion.div
            layoutId="csf-active-bar"
            className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
            style={{ background: fn.color }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}

        {/* Code + icon row */}
        <div className="relative z-10 flex items-start justify-between mb-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${fn.color}18, ${fn.color}08)`,
              border: `1px solid ${fn.color}30`,
            }}
          >
            <fn.icon className="h-5 w-5" style={{ color: fn.color }} aria-hidden />
          </div>
          <div className="flex items-center gap-1.5">
            {fn.isNew && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: `${fn.color}18`, color: fn.color, border: `1px solid ${fn.color}30` }}
              >
                NEW 2.0
              </span>
            )}
            <span
              className="rounded-md px-2 py-0.5 text-xs font-bold font-mono"
              style={{ background: `${fn.color}14`, color: fn.color }}
            >
              {fn.code}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10">
          <h3 className="font-display font-bold text-foreground text-lg">{fn.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground font-medium">{fn.tagline}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────────── */

export default function NistCsfSection() {
  const [active, setActive] = useState<string>("govern");
  const reduceMotion = useReducedMotion();
  const activeFn = CSF_FUNCTIONS.find((f) => f.id === active)!;

  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(239 84% 67% / 0.7) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67% / 0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto max-w-2xl text-center mb-12"
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
            Built Around{" "}
            <span className="gradient-text">NIST CSF 2.0</span>
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="mt-4 text-muted-foreground text-body-lg leading-relaxed"
          >
            The NIST Cybersecurity Framework 2.0 is the gold standard for enterprise risk management.
            CertifyGRC automates every function - from governance strategy to recovery planning.
          </motion.p>
        </motion.div>

        {/* 6-card grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4 mb-8">
          {CSF_FUNCTIONS.map((fn, i) => (
            <CsfCard
              key={fn.id}
              fn={fn}
              isActive={active === fn.id}
              onClick={() => setActive(fn.id)}
              index={i}
            />
          ))}
        </div>

        {/* Active function detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: [...scrollEase] }}
            className="rounded-2xl border overflow-hidden"
            style={{
              borderColor: `${activeFn.color}40`,
              background: `linear-gradient(155deg, ${activeFn.color}28 0%, ${activeFn.color}10 40%, hsl(221,42%,12%) 100%)`,
              boxShadow: `0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 40px -12px ${activeFn.color}22`,
            }}
          >
            <div className="grid md:grid-cols-[1fr_auto] items-start gap-6 p-6 md:p-8">
              {/* Left: description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${activeFn.color}22, ${activeFn.color}0a)`,
                      border: `1px solid ${activeFn.color}35`,
                    }}
                  >
                    <activeFn.icon className="h-6 w-6" style={{ color: activeFn.color }} aria-hidden />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-foreground text-lg">{activeFn.name}</h3>
                      {activeFn.isNew && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{
                            background: `${activeFn.color}18`,
                            color: activeFn.color,
                            border: `1px solid ${activeFn.color}30`,
                          }}
                        >
                          NEW IN 2.0
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{activeFn.tagline}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {activeFn.description}
                </p>
              </div>

              {/* Right: outcome categories */}
              <div className="min-w-0 md:min-w-[280px]">
                <p
                  className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
                  style={{ color: activeFn.color }}
                >
                  Framework Outcomes
                </p>
                <ul className="space-y-2">
                  {activeFn.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        style={{ color: activeFn.color }}
                        aria-hidden
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA bar */}
            <div
              className="flex items-center justify-between gap-4 border-t px-6 py-4 md:px-8"
              style={{ borderColor: `${activeFn.color}20` }}
            >
              <p className="text-xs text-muted-foreground">
                CertifyGRC maps <strong className="font-semibold text-foreground">all {activeFn.outcomes.length} outcome categories</strong> for {activeFn.name} with automated evidence collection.
              </p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="shrink-0 group border-border hover:border-primary hover:text-primary"
              >
                <Link to="/frameworks">
                  See all frameworks
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom stats bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: "6", label: "Core functions", accent: "hsl(var(--primary))" },
            { value: "22", label: "Categories covered", accent: "hsl(var(--accent))" },
            { value: "106+", label: "Subcategory outcomes", accent: "#4A6FD4" },
            { value: "100%", label: "Automated mapping", accent: "#5B7FE8" },
          ].map(({ value, label, accent }, i) => (
            <motion.div
              key={label}
              variants={revealUp}
              custom={i * 0.08}
              className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="font-display font-bold text-2xl" style={{ color: accent }}>
                {value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-medium">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
