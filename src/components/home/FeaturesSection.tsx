import { motion } from "framer-motion";
import {
  Workflow,
  BarChart3,
  ClipboardCheck,
  FileText,
  Sparkles,
  Plug,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { scrollEase, scrollViewport } from "@/lib/motion";

const features = [
  {
    icon: Workflow,
    title: "Automated Compliance Workflows",
    description:
      "Streamline compliance with automated task assignments, reminders, and evidence collection across every framework simultaneously.",
    tag: "Core",
    variant: "hero" as const,
  },
  {
    icon: BarChart3,
    title: "Real-Time Risk Insights",
    description: "Continuous risk monitoring with dynamic heat maps and predictive indicators.",
    tag: null,
    variant: "default" as const,
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Intelligent suggestions for control improvements and gap remediation.",
    tag: "AI",
    variant: "default" as const,
  },
  {
    icon: ClipboardCheck,
    title: "Audit Management",
    description: "End-to-end audit lifecycle from planning to reporting with full traceability.",
    tag: null,
    variant: "default" as const,
  },
  {
    icon: FileText,
    title: "Policy & Control Management",
    description: "Centralized policy repository with version control and approval workflows.",
    tag: null,
    variant: "default" as const,
  },
  {
    icon: Plug,
    title: "Integration-Ready APIs",
    description: "Connect with SIEM, ITSM, HR systems, and cloud infrastructure providers.",
    tag: null,
    variant: "default" as const,
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description: "Granular permissions ensuring the right people access the right data.",
    tag: null,
    variant: "default" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: scrollEase },
  },
};

function FeatureCard({
  feature,
  className = "",
}: {
  feature: (typeof features)[number];
  className?: string;
}) {
  const isHero = feature.variant === "hero";
  const Icon = feature.icon;

  return (
    <PremiumCard
      animate={false}
      solidAccent={isHero}
      featured={isHero}
      accent={isHero ? BRAND_PRIMARY : undefined}
      padding={isHero ? "lg" : "md"}
      className={className}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <motion.div
          className={`flex shrink-0 items-center justify-center rounded-xl ${isHero ? "w-12 h-12" : "w-10 h-10"}`}
          style={{
            background: isHero ? "rgba(255,255,255,0.12)" : `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
            border: isHero ? "1px solid rgba(255,255,255,0.18)" : `1px solid ${BRAND_PRIMARY}28`,
          }}
          whileHover={{ rotate: [0, -4, 4, 0], transition: { duration: 0.45 } }}
        >
          <Icon
            className={`${isHero ? "w-6 h-6 text-white" : "w-5 h-5 text-primary"}`}
            strokeWidth={1.8}
          />
        </motion.div>
        {feature.tag && (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: isHero ? "rgba(255,255,255,0.14)" : `${BRAND_PRIMARY}14`,
              border: isHero ? "1px solid rgba(255,255,255,0.22)" : `1px solid ${BRAND_PRIMARY}28`,
              color: isHero ? "#ffffff" : undefined,
            }}
          >
            {feature.tag}
          </span>
        )}
      </div>

      <h3
        className={`font-display font-bold leading-snug mb-2 ${
          isHero ? "text-xl md:text-2xl text-white" : "text-base text-foreground"
        }`}
      >
        {feature.title}
      </h3>
      <p
        className={`leading-relaxed flex-1 ${
          isHero ? "text-sm md:text-base max-w-md text-white/78" : "text-sm text-muted-foreground"
        }`}
      >
        {feature.description}
      </p>

      {isHero && (
        <div className="mt-6 flex flex-wrap gap-2">
          {["NIST CSF 2.0", "SOC 2", "ISO 27001"].map((label) => (
            <span
              key={label}
              className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </PremiumCard>
  );
}

export default function FeaturesSection() {
  const [hero, sideA, sideB, ...bottomRow] = features;

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(210,218,255,0.65) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 95% 90% at 50% 45%, black 12%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 90% at 50% 45%, black 12%, transparent 92%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Platform Features"
          title="Built for enterprise compliance"
          description="Every feature designed to reduce manual effort and accelerate your path to compliance."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-3.5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          <motion.div variants={cardVariants} className="sm:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[260px]">
            <FeatureCard feature={hero} className="min-h-[260px] lg:min-h-full" />
          </motion.div>

          <motion.div variants={cardVariants} className="lg:col-span-5 min-h-[140px]">
            <FeatureCard feature={sideA} />
          </motion.div>

          <motion.div variants={cardVariants} className="lg:col-span-5 min-h-[140px]">
            <FeatureCard feature={sideB} />
          </motion.div>

          {bottomRow.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="sm:col-span-1 lg:col-span-3 min-h-[150px]"
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
