import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Gauge,
  Users,
  FolderCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { revealUp, scrollEase, scrollViewport, staggerContainer } from "@/lib/motion";
import { BRAND_PRIMARY, brandAccentAt } from "@/lib/brandColors";
import { CSF_BRAND_VARIANTS } from "@/components/home/nistCsfBrand";
import { useBooking } from "@/contexts/BookingContext";
import { cn } from "@/lib/utils";

const CSF_FUNCTIONS = [
  { code: "GV", name: "Govern" },
  { code: "ID", name: "Identify" },
  { code: "PR", name: "Protect" },
  { code: "DE", name: "Detect" },
  { code: "RS", name: "Respond" },
  { code: "RC", name: "Recover" },
] as const;

const FEATURES = [
  {
    icon: Target,
    title: "NIST CSF 2.0 Made Practical",
    description:
      "A clear roadmap to assess, improve, and strengthen your cybersecurity program — without juggling overlapping frameworks.",
  },
  {
    icon: Sparkles,
    title: "User-friendly by design",
    description:
      "Guided workflows so admins, implementers, and auditors each see exactly what they need.",
  },
  {
    icon: Gauge,
    title: "Audit-ready, not audit-day panic",
    description:
      "Audit readiness and maturity progress in real time — before the auditor asks.",
  },
  {
    icon: Users,
    title: "Built for real collaboration",
    description:
      "Role-based access keeps teams in sync — assign, prove, and review without version chaos.",
  },
  {
    icon: FolderCheck,
    title: "Evidence where it belongs",
    description:
      "One repository, gap-linked artifacts, and cloud imports — nothing lost when audit season arrives.",
  },
] as const;

const WORKFLOW_STEPS = [
  { label: "Assess", detail: "Structured baseline" },
  { label: "Gap analysis", detail: "Prioritized findings" },
  { label: "Risk track", detail: "Owned remediation" },
  { label: "Evidence", detail: "Linked artifacts" },
  { label: "Auditor review", detail: "Verified controls" },
  { label: "Improve", detail: "Continuous maturity" },
] as const;

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={revealUp}
      custom={index * 0.04}
      className="flex gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors duration-200 hover:border-primary/25 hover:bg-card"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-base font-bold leading-snug text-foreground">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyCertifyGrcSection() {
  const { openDemo } = useBooking();

  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Why CertifyGRC"
          title="One framework, done properly — not ten, done half-way"
          description="No bloat, no busywork. Just the structure, workflow, and evidence trail a real NIST CSF 2.0 program needs."
        />

        <div className="mx-auto mt-4 grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.65, ease: scrollEase }}
            className="space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              NIST CSF 2.0 Made Practical
            </p>
            <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
              A clear roadmap to assess, improve, and strengthen your cybersecurity program
            </h3>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              CertifyGRC maps your program to Govern, Identify, Protect, Detect, Respond, and Recover — with
              workflows and evidence built in from day one.
            </p>

            <div className="flex flex-wrap gap-2">
              {CSF_FUNCTIONS.map((fn, i) => (
                <span
                  key={fn.code}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    color: CSF_BRAND_VARIANTS[i].color,
                    background: `${CSF_BRAND_VARIANTS[i].color}0c`,
                    borderColor: `${CSF_BRAND_VARIANTS[i].color}24`,
                  }}
                >
                  <span className="font-mono text-[10px] font-bold">{fn.code}</span>
                  {fn.name}
                </span>
              ))}
            </div>

            <ul className="space-y-2.5 pt-1">
              {[
                "Single framework, clear ownership",
                "Connected steps from assess to improve",
                "Audit-ready evidence by default",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.7, ease: scrollEase, delay: 0.08 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{ background: `radial-gradient(ellipse at center, ${BRAND_PRIMARY}18, transparent 70%)` }}
            />
            <div
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_24px_64px_-32px_rgba(0,0,0,0.45)]"
              style={{ boxShadow: `0 24px 64px -32px rgba(0,0,0,0.4), 0 0 0 1px ${BRAND_PRIMARY}12` }}
            >
              <img
                src="/ecosystem/compliance-os.png"
                alt="CertifyGRC compliance operating system dashboard"
                className="block w-full object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Workflow — prominent, standalone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.65, ease: scrollEase }}
          className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-card to-card px-5 py-8 sm:px-8 sm:py-10"
          style={{ boxShadow: "0 24px 60px -32px rgba(48,92,222,0.28)" }}
        >
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">End-to-end workflow</p>
            <h3 className="mt-2 font-display text-xl font-extrabold text-foreground sm:text-2xl">
              A workflow your team can follow
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Every step connects — from first assessment to auditor review and continuous improvement.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {WORKFLOW_STEPS.map((step, i) => (
              <div
                key={step.label}
                className="relative rounded-xl border border-border/50 bg-background/80 p-4 text-center"
              >
                <span
                  className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card font-display text-xs font-bold"
                  style={{ borderColor: brandAccentAt(i), color: brandAccentAt(i) }}
                >
                  {i + 1}
                </span>
                <p className="font-display text-sm font-bold text-foreground">{step.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {FEATURES.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className={cn(
            "mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl border border-border/50 px-6 py-8 sm:flex-row sm:px-10",
            "bg-gradient-to-r from-primary/[0.06] to-transparent",
          )}
        >
          <p className="max-w-md text-center text-base font-medium text-foreground sm:text-left">
            See how a focused platform changes what audit season feels like.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline" className="border-primary/30">
              <Link to="/software">
                Explore the platform
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button onClick={openDemo} size="lg" className="glow-primary group px-6">
              Book a demo
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
