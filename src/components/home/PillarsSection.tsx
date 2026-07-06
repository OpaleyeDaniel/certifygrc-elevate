import { motion } from "framer-motion";
import { Monitor, Radar, Compass, ArrowRight } from "lucide-react";
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
  link: string;
  label: string;
  image: string;
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
    label: "Core Product",
    image: "/ecosystem/compliance-os.png",
  },
  {
    icon: Radar,
    title: "Cyber Drill",
    description:
      "Strengthen security culture, reduce human risk, and equip teams with real-world defensive skills.",
    descriptionExtra:
      "From phishing simulations to tabletop exercises, Cyber Drill turns security awareness into muscle memory — so your team recognizes and reports real threats before they become incidents.",
    features: ["Security awareness", "Phishing simulation", "Human risk management"],
    link: "/cyber-aware",
    label: "Training",
    image: "/ecosystem/cyber-drill.png",
  },
  {
    icon: Compass,
    title: "Compliance Advisory",
    description:
      "Operational resilience and regulatory programs delivered with practical execution and audit-ready outcomes.",
    descriptionExtra:
      "Our advisors work alongside your team to close gaps in BCM, cyber, privacy, and AI governance — translating regulatory requirements like OSFI guidelines into practical, audit-ready programs.",
    features: ["OSFI & Canada focus", "BCM & cyber", "Privacy & AI governance"],
    link: "/consulting",
    label: "Advisory",
    image: "/ecosystem/compliance-advisory.png",
  },
];

const IMAGE_SIDES: ImageSide[] = ["right", "left", "right"];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "Our Ecosystem" — Drata-style alternating feature rows: copy on one side,
 * a floating product mockup with brand glow on the other.
 */
export default function PillarsSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Our Ecosystem"
          title="One platform, three ways to operationalize trust"
          description="Technology enabled GRC with advisory depth and professional development under one roof."
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
      className="overflow-hidden rounded-[2rem] border border-border/60 bg-card"
    >
      <div
        className={cn(
          "grid items-center gap-8 p-6 sm:p-8 md:gap-8 lg:gap-10 lg:p-8 xl:p-10",
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

          <Link
            to={pillar.link}
            className="group mt-7 inline-flex items-center gap-2 text-base font-bold text-foreground transition-all duration-200 hover:gap-3 hover:text-primary"
          >
            {pillar.title}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
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
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-3 sm:p-4 lg:rounded-[1.35rem] lg:p-5 xl:p-6"
            style={{
              boxShadow: `0 28px 56px -24px rgba(0,0,0,0.45), 0 16px 40px -20px ${BRAND_PRIMARY}30`,
            }}
          >
            <img
              src={pillar.image}
              alt={`${pillar.title} product preview`}
              className="block h-auto max-h-[min(420px,72vw)] w-full max-w-none object-contain lg:max-h-none lg:scale-[1.08] lg:object-center xl:scale-[1.12]"
              loading="lazy"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
