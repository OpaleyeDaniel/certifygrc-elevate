import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Landmark,
  Shield,
  Scale,
  BookOpen,
  LineChart,
  Cpu,
  Target,
  Eye,
  Building2,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { revealUp, scrollEase, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PremiumCard, PremiumCardGrid, PremiumCardStandalone } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import SEO from "@/components/seo/SEO";
import { createOrganizationSchema, createBreadcrumbSchema } from "@/lib/schemaOrg";

const heroEase = [0.16, 1, 0.3, 1] as const;

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: heroEase } },
};

const whoWeAreBullets = [
  {
    title: "SaaS solutions",
    description: "Automate evidence mapping, controls coverage, and framework workflows in one place.",
  },
  {
    title: "Consulting services",
    description: "Practical delivery that turns regulatory expectations into implemented controls and audit ready evidence.",
  },
  {
    title: "Professional learning",
    description: "Training paths that build competency across GRC, risk, cybersecurity, and emerging tech.",
  },
];

const mission = {
  icon: Target,
  title: "Mission",
  description:
    "To help organizations operationalize trust by transforming governance, risk, and compliance from a burden into a strategic capability.",
};

const vision = {
  icon: Eye,
  title: "Vision",
  description:
    "To become a trusted global reference point for governance, risk, and compliance where organizations turn to operationalize trust, navigate regulation with confidence, and scale responsibly in a technology driven world.",
  extra:
    "We envision a future where compliance is embedded, intelligent, and enabling not reactive, fragmented, or burdensome.",
};

const expertise = [
  {
    icon: Landmark,
    title: "Regulatory compliance",
    description: "Helping businesses meet industry standards with clarity and defensible evidence.",
  },
  {
    icon: BookOpen,
    title: "Training & certification",
    description: "Equipping professionals with globally recognized skills.",
  },
  {
    icon: LineChart,
    title: "Risk management",
    description: "Identifying, assessing, and mitigating risks proactively.",
  },
  {
    icon: Cpu,
    title: "Technology driven GRC",
    description: "Leveraging CertifyGRC to automate compliance and risk workflows.",
  },
];

const coreValues = [
  {
    title: "Execution over theory",
    description:
      "We prioritize practical outcomes over abstract recommendations. Every engagement is designed to produce working controls, usable frameworks, and audit ready evidence.",
    icon: ShieldCheck,
  },
  {
    title: "Trust by design",
    description:
      "We believe trust is not assumed it is engineered through governance, accountability, and transparency. Our work is built to stand up to regulators, auditors, customers, and boards.",
    icon: Shield,
  },
  {
    title: "Regulatory integrity",
    description:
      "We operate with a deep respect for regulatory intent, not just regulatory language. Our solutions are aligned with both compliance requirements and supervisory expectations.",
    icon: Scale,
  },
  {
    title: "Business alignment",
    description:
      "Compliance should support not obstruct business objectives. We align governance and risk controls with strategy, operations, and technology realities.",
    icon: Users,
  },
  {
    title: "Clarity and accountability",
    description: "We value clear ownership, defined decision rights, and measurable outcomes.",
    icon: GraduationCap,
  },
];

const whyCertifyFaq = [
  {
    question: "Execution first delivery",
    answer:
      "We go beyond assessments to deliver implemented controls, documented processes, and audit ready evidence.",
  },
  {
    question: "Built for regulated environments",
    answer:
      "Our solutions are designed to stand up to regulators, auditors, customers, and boards not just internal reviews.",
  },
  {
    question: "Framework agnostic, risk driven",
    answer:
      "ISO, NIST, SOC 2, PCI DSS, OSFI applied based on your risk profile and business context, not rigid templates.",
  },
  {
    question: "Consulting + SaaS advantage",
    answer:
      "Our advisory approach is informed by how compliance is actually managed in systems driving practicality and scalability.",
  },
  {
    question: "Business aligned governance",
    answer: "We embed compliance into operations, so it enables growth, innovation, and decision making.",
  },
  {
    question: "Future ready by design",
    answer:
      "From AI governance to operational resilience, we design with evolving regulations and emerging risks in mind.",
  },
];


function SectionShell({
  className,
  children,
  surface = "default",
}: {
  className?: string;
  children: React.ReactNode;
  surface?: "default" | "muted" | "gradient";
}) {
  return (
    <section
      className={cn(
        "section-padding border-b border-border/40 last:border-b-0",
        surface === "muted" && "bg-muted/25",
        surface === "gradient" && "relative overflow-hidden bg-gradient-to-b from-muted/15 via-background to-background",
        className,
      )}
    >
      {surface === "gradient" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.06),transparent_55%)]"
          aria-hidden
        />
      ) : null}
      <div className={cn(surface === "gradient" && "relative z-10")}>{children}</div>
    </section>
  );
}

export default function CompanyPage() {
  const reduceMotion = useReducedMotion();

  const companySchemas = [
    createOrganizationSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About CertifyGRC", url: "/company" },
    ]),
  ];

  return (
    <>
      <SEO
        title="About CertifyGRC | Our Mission, Leadership & Vision"
        description="Discover how CertifyGRC is modernizing governance, risk management, and compliance for forward-thinking organizations worldwide. Meet our team and vision."
        canonical="https://certifygrc.com/company"
        jsonLd={companySchemas}
      />
      <PageHero
        backgroundUrl={heroImagery.company.background}
        foregroundUrl={heroImagery.company.foreground}
        foregroundAlt={heroImagery.company.foregroundAlt}
        overlay="strong"
        textEntrance="none"
        className="!pt-28 !pb-16 md:!pb-20 lg:min-h-[min(88vh,920px)] lg:flex lg:items-center"
      >
        <motion.div
          className="space-y-4 md:space-y-5"
          variants={heroStagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.span
            variants={heroItem}
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"
          >
            About CertifyGRC
          </motion.span>
          <motion.h1
            variants={heroItem}
            id="company-hero-heading"
            className="font-display font-bold tracking-tight text-white text-display-lg md:text-display-xl"
          >
            Governance that scales with ambition
          </motion.h1>
          <motion.p variants={heroItem} className="max-w-xl text-lg leading-relaxed text-white/88 md:text-xl">
            Enterprise GRC software, advisory, and learning designed for teams who need trust to be operational, not theoretical.
          </motion.p>
        </motion.div>
      </PageHero>

      {/* Narrative moved from former hero: full story + trading name */}
      <ScrollReveal>
        <SectionShell>
          <div className="container-wide">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                className="space-y-6"
              >
                <motion.div variants={revealUp}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</span>
                  <h2 className="mt-3 font-display font-bold tracking-tight text-foreground text-display-md md:text-display-lg">
                    Empowering businesses to thrive in a complex regulatory world
                  </h2>
                </motion.div>
                <motion.div variants={revealUp} className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    CertifyGRC is a governance, risk, and compliance (GRC) company delivering technology-enabled solutions
                    that help organizations operationalize trust, meet regulatory expectations, and scale with confidence.
                  </p>
                  <p>
                    We operate across three integrated service pillars SaaS solutions, consulting services, and professional
                    learning with a deliberate focus on practical execution, regulatory credibility, and sustainable outcomes.
                  </p>
                </motion.div>
                <PremiumCardStandalone padding="md" interactive={false}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Building2 className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Legal entity</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        CertifyGRC is the trading name under <strong className="font-medium text-foreground">SandBP Canada</strong> {""}
                         bringing together delivery discipline and platform depth for regulated organizations.
                      </p>
                    </div>
                  </div>
                </PremiumCardStandalone>
              </motion.div>

              <motion.div
                className="relative"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.75, ease: scrollEase }}
              >
                <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/12 blur-2xl" aria-hidden />
                <div className="relative overflow-hidden rounded-[1.75rem]" style={{ background: "linear-gradient(145deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px -12px rgba(0,0,0,0.4)" }}>
                  <img
                    src={heroImagery.software.foreground}
                    alt="CertifyGRC platform and compliance intelligence"
                    className="aspect-[4/3] w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </SectionShell>
      </ScrollReveal>

      <ScrollReveal delayMs={40}>
        <SectionShell surface="muted">
          <div className="container-wide">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How we deliver</span>
              <h2 className="mt-3 font-display font-bold tracking-tight text-foreground text-display-md md:text-display-lg">Three pillars, one motion</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                One coherent operating model so strategy, tooling, and evidence stay connected from kickoff to audit.
              </p>
            </div>
            <PremiumCardGrid className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
              {whoWeAreBullets.map((item, i) => (
                <PremiumCard key={item.title} padding="lg" interactive={false}>
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ring-1 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: `${BRAND_PRIMARY}14`,
                      color: BRAND_PRIMARY,
                      borderColor: `${BRAND_PRIMARY}28`,
                      boxShadow: `0 0 0 1px ${BRAND_PRIMARY}20`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </PremiumCard>
              ))}
            </PremiumCardGrid>
          </div>
        </SectionShell>
      </ScrollReveal>

      <ScrollReveal delayMs={60}>
        <SectionShell surface="gradient">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
              >
                <motion.div variants={revealUp}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Vision &amp; mission</span>
                  <h2 className="mt-3 font-display font-bold tracking-tight text-foreground text-display-md md:text-display-lg">Why we exist</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    A clear north star keeps programs honest when frameworks, tools, and stakeholders pull in different directions.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            <PremiumCardGrid className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
              <PremiumCard padding="lg" interactive={false}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <mission.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{mission.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{mission.description}</p>
              </PremiumCard>
              <PremiumCard padding="lg" interactive={false}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                    <vision.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{vision.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{vision.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{vision.extra}</p>
              </PremiumCard>
            </PremiumCardGrid>

            <div className="mt-16">
              <h3 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">Core values</h3>
              <PremiumCardGrid className="mt-10 grid gap-4 md:grid-cols-2">
                {coreValues.map((v, i) => {
                  const accent = BRAND_PRIMARY;
                  return (
                    <PremiumCard key={v.title} padding="md" interactive={false} contentClassName="flex gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{
                          background: `${accent}12`,
                          border: `1px solid ${accent}25`,
                          color: accent,
                        }}
                      >
                        <v.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-foreground">{v.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                      </div>
                    </PremiumCard>
                  );
                })}
              </PremiumCardGrid>
            </div>
          </div>
        </SectionShell>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <SectionShell>
          <div className="container-wide">
            <SectionHeading
              badge="What we do"
              title="Depth across the GRC lifecycle"
              description="From policy to evidence capabilities that meet regulators where they are, without burying teams in busywork."
            />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="relative order-2 overflow-hidden rounded-[1.75rem] border border-border/50 shadow-elevated-lg lg:order-1"
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.7, ease: scrollEase }}
              >
                <img
                  src="/hero-dashboard-consulting.png"
                  alt="CertifyGRC consulting and delivery workflows"
                  className="aspect-[4/3] w-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-primary/10 pointer-events-none" />
              </motion.div>
              <PremiumCardGrid className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2">
                {expertise.map((item, i) => {
                  const accent = BRAND_PRIMARY;
                  return (
                    <PremiumCard key={item.title} padding="md" interactive={false}>
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{
                          background: `${accent}14`,
                          border: `1px solid ${accent}25`,
                        }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: accent }} />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </PremiumCard>
                  );
                })}
              </PremiumCardGrid>
            </div>
          </div>
        </SectionShell>
      </ScrollReveal>

      <ScrollReveal delayMs={100}>
        <SectionShell surface="muted">
          <div className="container-wide">
            <SectionHeading
              badge="Why CertifyGRC"
              title="Because compliance only matters if it works in practice"
              description=""
            />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
              <motion.div
                className="relative order-2 overflow-hidden rounded-[1.75rem] border border-border/50 shadow-elevated-lg lg:order-2"
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.7, ease: scrollEase }}
              >
                <img
                  src="/hero-dashboard-frameworks.png"
                  alt="Framework coverage and evidence mapping in CertifyGRC"
                  className="aspect-[4/3] w-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-background/25 via-transparent to-primary/10 pointer-events-none" />
              </motion.div>
              <PremiumCardStandalone padding="sm" interactive={false} className="order-1 lg:order-1">
                <Accordion type="single" collapsible className="w-full px-2 py-2 md:px-4 md:py-4">
                  {whyCertifyFaq.map((f, i) => (
                    <AccordionItem key={f.question} value={`faq-${i}`} className="border-border/50">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                        {f.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </PremiumCardStandalone>
            </div>
          </div>
        </SectionShell>
      </ScrollReveal>

      
    </>
  );
}
