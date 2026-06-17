import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import FrameworkImageMarquee from "@/components/visual/FrameworkImageMarquee";
import ApplicationProductShowcase from "@/components/marketing/ApplicationProductShowcase";
import { applicationDashboards } from "@/constants/applicationDashboards";
import { revealUp, scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

type Props = {
  showCtas?: boolean;
  /** Hide the centered “Compliance and Privacy Frameworks…” block (e.g. when the hero already shows it). */
  hideIntroBlock?: boolean;
};

/** Wider than default `container-wide` so product shots can breathe on large screens */
const showcaseWrap = "mx-auto max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8";

const sections = [
  {
    key: "command-center",
    badge: "Command center",
    headline: "Your Real-Time GRC Command Center",
    body: "Get complete visibility into your compliance posture, risk exposure, and audit readiness all from a single, intelligent dashboard.",
    bullets: [
      "Monitor system health and audit readiness in real time",
      "Identify bottlenecks with workflow pressure insights",
      "Track risk distribution and assessment coverage instantly",
      "Gain clarity with centralized evidence and maturity scoring",
    ],
    imageKey: "tailored" as const,
    imageLabel: "GRC command center",
    imageAlt:
      "CertifyGRC GRC Command Center dashboard showing system health, audit readiness, assessment coverage, workflow pressure, risk mix, evidence, and maturity scoring",
    /** Text on left, image on right */
    layout: "text-first" as const,
  },
  {
    key: "nist-assessment",
    badge: "NIST CSF 2.0",
    headline: "Structured Compliance, Simplified",
    body: "Navigate complex frameworks like NIST CSF 2.0 with a guided, step-by-step assessment experience designed for speed and clarity.",
    bullets: [
      "Work across Govern, Identify, Protect, Detect, Respond, and Recover",
      "Track progress and completion across all controls",
      "Answer questions with built-in structure and guidance",
      "Stay organized with automatically saved assessments",
    ],
    imageKey: "iso" as const,
    imageLabel: "Assessment workflow",
    imageAlt:
      "CertifyGRC NIST CSF 2.0 assessment dashboard with functions, question tracking, and progress",
    layout: "image-first" as const,
  },
  {
    key: "auditor-workspace",
    badge: "Auditor workspace",
    headline: "Streamlined Audit & Review Workflow",
    body: "Empower auditors and reviewers with a centralized workspace to verify, approve, and track compliance controls efficiently.",
    bullets: [
      "Review and validate controls in one unified interface",
      "Track approval status and pending reviews in real time",
      "Ensure accountability with structured verification flows",
      "Accelerate audit readiness with clear progress tracking",
    ],
    imageKey: "soc" as const,
    imageLabel: "Control review & approvals",
    imageAlt:
      "CertifyGRC auditor workspace showing verification progress, pending reviews, and approval workflow",
    layout: "text-first" as const,
  },
  {
    key: "audit-reporting",
    badge: "Reporting",
    headline: "Audit-Ready Reports in Seconds",
    body: "Generate clear, exportable audit reports backed by real evidence, helping you demonstrate compliance with confidence.",
    bullets: [
      "Instantly view control status and identified gaps",
      "Export professional audit reports for stakeholders",
      "Back every control with mapped evidence",
      "Maintain full transparency across your compliance lifecycle",
    ],
    imageKey: "pci" as const,
    imageLabel: "Audit reporting",
    imageAlt: "CertifyGRC audit reporting interface with summaries, control tracking, and exportable evidence-backed reports",
    layout: "image-first" as const,
  },
] as const;

function ShowcaseCopyColumn({
  badge,
  headline,
  body,
  bullets,
}: {
  badge: string;
  headline: string;
  body: string;
  bullets: readonly string[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="min-w-0 max-w-xl lg:max-w-none"
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={scrollViewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.09, delayChildren: 0.03 },
        },
      }}
    >
      <motion.span
        variants={revealUp}
        className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary"
      >
        {badge}
      </motion.span>
      <motion.h3
        variants={revealUp}
        className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl md:leading-[1.2]"
      >
        {headline}
      </motion.h3>
      <motion.p
        variants={revealUp}
        className="mt-4 text-base leading-relaxed text-muted-foreground md:text-[1.0625rem] md:leading-relaxed"
      >
        {body}
      </motion.p>
      <motion.ul
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.06 },
          },
        }}
        className="mt-7 space-y-3.5"
      >
        {bullets.map((t) => (
          <motion.li
            key={t}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: scrollRevealDuration * 0.55, ease: [...scrollEase] },
              },
            }}
            className="flex items-start gap-3 text-[15px] leading-snug text-foreground/95 md:text-base md:leading-relaxed"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>{t}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function ApplicationFrameworksSections({ showCtas = true, hideIntroBlock = false }: Props) {
  const d = applicationDashboards;

  const srcFor = (key: (typeof sections)[number]["imageKey"]) => d[key];

  return (
    <>
      <ScrollReveal>
        <section className="border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent pb-4 pt-8 md:pt-12">
          <div className="container-wide mb-3">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Product experience aligned to how teams run GRC day to day
            </p>
          </div>
          <FrameworkImageMarquee />
        </section>
      </ScrollReveal>

      {!hideIntroBlock && (
        <ScrollReveal>
          <section className="section-padding">
            <div className="container-wide mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                Application
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                One platform for <span className="gradient-text">continuous compliance</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Move from scattered spreadsheets to a single operating layer: live posture, structured assessments, auditor-ready
                workflows, and evidence-backed reporting built for teams who need clarity under pressure.
              </p>
              {showCtas && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="outline" className="border-primary/30">
                    <Link to="/contact">Talk with an Advisor</Link>
                  </Button>
                  <Button asChild className="glow-primary">
                    <Link to="/software">Explore Application</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>
      )}

      {sections.map((s, index) => {
        const image = (
          <ApplicationProductShowcase
            src={srcFor(s.imageKey)}
            alt={s.imageAlt}
            label={s.imageLabel}
            className={
              s.layout === "text-first"
                ? "lg:justify-self-end xl:-mr-4"
                : "lg:justify-self-start xl:-ml-4"
            }
          />
        );

        const copy = (
          <ShowcaseCopyColumn badge={s.badge} headline={s.headline} body={s.body} bullets={s.bullets} />
        );

        const isAltBand = index % 2 === 1;

        return (
          <ScrollReveal key={s.key}>
            <section className={isAltBand ? "section-padding bg-muted/25" : "section-padding"}>
              <div className={showcaseWrap}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                  {s.layout === "text-first" ? (
                    <>
                      {copy}
                      {image}
                    </>
                  ) : (
                    <>
                      <div className="order-2 min-w-0 lg:order-1">{image}</div>
                      <div className="order-1 min-w-0 lg:order-2">{copy}</div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        );
      })}
    </>
  );
}
