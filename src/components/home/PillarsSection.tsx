import { motion } from "framer-motion";
import { Monitor, Radar, Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { BRAND_PRIMARY } from "@/lib/brandColors";

type ImageSide = "left" | "right";

interface Pillar {
  icon: typeof Monitor;
  title: string;
  description: string;
  descriptionExtra: string;
  features: string[];
  highlights?: string[];
  link: string;
  ctaLabel: string;
  label: string;
  image: string;
  transparentImage?: boolean;
  showFrameworksLink?: boolean;
}

const pillars: Pillar[] = [
  {
    icon: Monitor,
    title: "Compliance Operating System",
    description:
      "A structured, audit-ready platform for compliance, controls, and evidence — no spreadsheets, no guesswork.",
    descriptionExtra:
      "CertifyGRC brings frameworks, controls, and evidence into one system so compliance teams standardize governance, strengthen accountability, and cut duplicate audit work across every regulation you're mapped to.",
    features: ["Framework automation", "Evidence mapping", "Executive reporting"],
    link: "/software",
    ctaLabel: "Learn more",
    label: "Core Product",
    image: "/ecosystem/compliance-os.png",
    transparentImage: true,
    showFrameworksLink: true,
  },
  {
    icon: Radar,
    title: "CyberDrill",
    description: "Validate your team's readiness before attackers do.",
    descriptionExtra:
      "Strengthen your security culture, reduce human risk, and prepare employees to respond confidently to real-world cyber threats. From phishing simulations and tabletop exercises to interactive security drills, CyberDrill transforms awareness into measurable readiness—helping your organization detect, report, and respond to threats before they become incidents.",
    features: ["Build Security Culture", "Validate Readiness", "Reduce Human Risk"],
    link: "/cyber-aware",
    ctaLabel: "Learn more",
    label: "Simulation and Training",
    image: "/ecosystem/cyber-drill.png",
    transparentImage: true,
  },
  {
    icon: Compass,
    title: "Cybersecurity & Compliance Consulting",
    description: "Build resilient security and compliance programs with confidence.",
    descriptionExtra:
      "Our experts help organizations assess, implement, and optimize cybersecurity and compliance programs across information security, business continuity, PCI DSS, privacy, and other globally recognized frameworks. From gap assessments and governance to implementation and audit readiness, we deliver practical solutions that strengthen resilience and accelerate compliance.",
    features: [],
    highlights: ["Information & Cybersecurity", "Business Continuity", "PCI DSS & Compliance"],
    link: "/consulting",
    ctaLabel: "Speak to an advisor today",
    label: "Advisory",
    image: "/ecosystem/compliance-advisory.png",
  },
];

const IMAGE_SIDES: ImageSide[] = ["right", "left", "right"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function PillarsSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Our Ecosystem"
          title="One platform, three ways to operationalize trust"
          description="Technology-enabled GRC with advisory depth and professional development under one roof."
        />

        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:gap-10">
          {pillars.map((pillar, i) => (
            <EcosystemRow key={pillar.title} pillar={pillar} imageSide={IMAGE_SIDES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemRow({ pillar, imageSide }: { pillar: Pillar; imageSide: ImageSide }) {
  const isImageRight = imageSide === "right";
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className="overflow-hidden rounded-[1.35rem] border border-border/60 bg-card sm:rounded-[2rem]"
    >
      <div
        className={cn(
          "grid items-center gap-6 p-5 sm:gap-8 sm:p-8 md:gap-8 lg:gap-10 lg:p-8 xl:p-10",
          isImageRight ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-[3fr_2fr]",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.06, ease }}
          className={cn(
            "flex flex-col justify-center py-2 lg:py-4 lg:pr-2 xl:pr-4",
            isImageRight ? "lg:order-1" : "lg:order-2",
          )}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
            {pillar.label}
          </span>

          <h3 className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.35rem]">
            {pillar.title}
          </h3>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/85 lg:text-lg">
            {pillar.description}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">
            {pillar.descriptionExtra}
          </p>

          {pillar.highlights && pillar.highlights.length > 0 ? (
            <ul className="mt-5 space-y-2.5">
              {pillar.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {pillar.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          <Link
            to={pillar.link}
            className="group mt-7 inline-flex items-center gap-2 text-base font-bold text-foreground transition-all duration-200 hover:gap-3 hover:text-primary"
          >
            {pillar.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {pillar.showFrameworksLink && (
            <Link
              to="/frameworks"
              className="group mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-2.5"
            >
              See all frameworks
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className={cn(
            "relative flex min-h-[260px] items-center sm:min-h-[320px] lg:min-h-[420px] xl:min-h-[460px]",
            isImageRight ? "lg:order-2 lg:-mr-2 xl:-mr-4" : "lg:order-1 lg:-ml-2 xl:-ml-4",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-90"
            style={{
              background: `radial-gradient(ellipse 88% 82% at 50% 50%, ${BRAND_PRIMARY}22 0%, ${BRAND_PRIMARY}08 42%, transparent 72%)`,
            }}
          />

          <div
            className={cn(
              "relative flex h-full w-full items-center justify-center overflow-hidden",
              pillar.transparentImage
                ? "rounded-2xl bg-transparent p-1 sm:p-2 lg:rounded-[1.35rem] lg:p-3"
                : "rounded-2xl border border-border/50 bg-background/40 p-3 sm:p-4 lg:rounded-[1.35rem] lg:p-5 xl:p-6",
            )}
            style={
              pillar.transparentImage
                ? { boxShadow: `0 24px 48px -28px ${BRAND_PRIMARY}55` }
                : {
                    boxShadow: `0 28px 56px -24px rgba(0,0,0,0.45), 0 16px 40px -20px ${BRAND_PRIMARY}30`,
                  }
            }
          >
            <img
              src={pillar.image}
              alt={`${pillar.title} product preview`}
              className={cn(
                "block h-auto w-full object-contain",
                pillar.transparentImage
                  ? "max-h-[min(440px,74vw)] drop-shadow-[0_28px_48px_rgba(48,92,222,0.28)] lg:max-h-none lg:scale-[1.06] xl:scale-[1.1]"
                  : "max-h-[min(420px,72vw)] max-w-none lg:max-h-none lg:scale-[1.08] lg:object-center xl:scale-[1.12]",
              )}
              loading="lazy"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
