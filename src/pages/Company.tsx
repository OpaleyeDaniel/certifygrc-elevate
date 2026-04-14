import { ShieldCheck, Users, GraduationCap, Landmark, Shield, Scale, BookOpen, LineChart, Cpu, Target, Eye } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whoWeAreBullets = [
  {
    title: "SaaS solutions",
    description: "Automate evidence mapping, controls coverage, and framework workflows in one place.",
  },
  {
    title: "Consulting services",
    description: "Practical delivery that turns regulatory expectations into implemented controls and audit-ready evidence.",
  },
  {
    title: "Professional learning",
    description: "Training paths that build competency across GRC, risk, cybersecurity, and emerging tech.",
  },
];

const mission = {
  icon: Target,
  title: "Mission",
  description: "To help organizations operationalize trust by transforming governance, risk, and compliance from a burden into a strategic capability.",
};

const vision = {
  icon: Eye,
  title: "Vision",
  description:
    "To become a trusted global reference point for governance, risk, and compliance—where organizations turn to operationalize trust, navigate regulation with confidence, and scale responsibly in a technology-driven world.",
  extra:
    "We envision a future where compliance is embedded, intelligent, and enabling—not reactive, fragmented, or burdensome.",
};

const expertise = [
  {
    icon: Landmark,
    title: "Regulatory Compliance",
    description: "Helping businesses meet industry standards with ease.",
  },
  {
    icon: BookOpen,
    title: "Training & Certification",
    description: "Equipping professionals with globally recognized skills.",
  },
  {
    icon: LineChart,
    title: "Risk Management",
    description: "Identifying, assessing, and mitigating risks proactively.",
  },
  {
    icon: Cpu,
    title: "Technology-Driven GRC Solutions",
    description: "Leveraging CertifyGRC to automate compliance and risk management processes.",
  },
];

const coreValues = [
  {
    title: "Execution Over Theory",
    description:
      "We prioritize practical outcomes over abstract recommendations. Every engagement is designed to produce working controls, usable frameworks, and audit-ready evidence.",
    icon: ShieldCheck,
  },
  {
    title: "Trust by Design",
    description:
      "We believe trust is not assumed—it is engineered through governance, accountability, and transparency. Our work is built to stand up to regulators, auditors, customers, and boards.",
    icon: Shield,
  },
  {
    title: "Regulatory Integrity",
    description:
      "We operate with a deep respect for regulatory intent, not just regulatory language. Our solutions are aligned with both compliance requirements and supervisory expectations.",
    icon: Scale,
  },
  {
    title: "Business Alignment",
    description:
      "Compliance should support—not obstruct—business objectives. We align governance and risk controls with strategy, operations, and technology realities.",
    icon: Users,
  },
  {
    title: "Clarity and Accountability",
    description:
      "We value clear ownership, defined decision rights, and measurable outcomes.",
    icon: GraduationCap,
  },
];

const whyCertifyFaq = [
  {
    question: "Execution-First Delivery",
    answer:
      "We go beyond assessments to deliver implemented controls, documented processes, and audit-ready evidence.",
  },
  {
    question: "Built for Regulated Environments",
    answer:
      "Our solutions are designed to stand up to regulators, auditors, customers, and boards—not just internal reviews.",
  },
  {
    question: "Framework-Agnostic, Risk-Driven",
    answer:
      "ISO, NIST, SOC 2, PCI DSS, OSFI—applied based on your risk profile and business context, not rigid templates.",
  },
  {
    question: "Consulting + SaaS Advantage",
    answer:
      "Our advisory approach is informed by how compliance is actually managed in systems—driving practicality and scalability.",
  },
  {
    question: "Business-Aligned Governance",
    answer:
      "We embed compliance into operations, so it enables growth, innovation, and decision-making.",
  },
  {
    question: "Future-Ready by Design",
    answer:
      "From AI governance to operational resilience, we design with evolving regulations and emerging risks in mind.",
  },
];

const team = [
  { name: "Alex Morgan", role: "GRC Delivery Lead", bio: "Turns regulatory expectations into control workflows and audit-ready evidence." },
  { name: "Priya Shah", role: "Platform Solutions", bio: "Designs evidence mapping and automation so teams can operate continuously." },
  { name: "Jordan Lee", role: "Risk & Advisory", bio: "Builds risk-driven programs that scale responsibly across frameworks." },
  { name: "Sam Taylor", role: "Learning & Enablement", bio: "Creates training paths that build competency and delivery confidence." },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        backgroundUrl={heroImagery.company.background}
        foregroundUrl={heroImagery.company.foreground}
        foregroundAlt={heroImagery.company.foregroundAlt}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Are</span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.05]">
          Empowering Businesses to Thrive in a Complex Regulatory World
        </h1>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            CertifyGRC is a governance, risk, and compliance (GRC) company delivering technology-enabled solutions that help organizations operationalize trust, meet regulatory expectations, and scale with confidence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            We operate across three integrated service pillars—SaaS solutions, Consulting Services, and Professional Learning—with a deliberate focus on practical execution, regulatory credibility, and sustainable outcomes.
          </p>
        </div>
      </PageHero>

      <ScrollReveal>
        <section className="section-padding border-b border-border/40">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Are</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-foreground">
                  CertifyGRC is the trading name under SandBP Canada.
                </h2>
              </div>

              <div className="relative">
                <div className="absolute -top-6 -left-6 w-52 h-52 rounded-full bg-primary/10 blur-2xl" aria-hidden />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-accent/10 blur-2xl" aria-hidden />

                <div className="relative rounded-[1.5rem] border border-border/60 bg-card/40 shadow-2xl shadow-primary/10 ring-1 ring-white/5 overflow-hidden">
                  <img
                    src={heroImagery.company.foreground}
                    alt="CertifyGRC company dashboard showing governance, risk, and collaboration"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-primary/10 pointer-events-none" />
                </div>

              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-muted/20 border-b border-border/40">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Vision & Mission</span>
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border/60 bg-card/70 p-8 md:p-10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <mission.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground">{mission.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/70 p-8 md:p-10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <vision.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground">{vision.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{vision.description}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{vision.extra}</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-6">Core Values</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {coreValues.map((v) => (
                  <div
                    key={v.title}
                    className="group rounded-3xl border border-border/50 bg-background/80 p-8 hover-lift hover:border-primary/25 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <v.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-lg text-foreground">{v.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading
              badge="What We Do"
              title="Helping you grow in every stage"
              description="Elevate your brand to new heights ensuring your message reaches its full potential and captivates your audience."
            />

            <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              <div className="grid sm:grid-cols-2 gap-6">
                {expertise.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border/50 bg-card/50 p-8 hover-lift glow-border transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="relative rounded-3xl border border-border/60 bg-card/40 shadow-2xl shadow-primary/10 overflow-hidden ring-1 ring-white/5">
                <img
                  src="/hero-dashboard-consulting.png"
                  alt="CertifyGRC consulting workflows mockup"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-primary/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-muted/25 border-y border-border/40">
          <div className="container-wide">
            <SectionHeading
              badge="Why CertifyGRC?"
              title="Because compliance only matters if it works in practice."
              description=""
            />

            <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              <div className="rounded-3xl border border-border/60 bg-card/40 p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {whyCertifyFaq.map((f, i) => (
                    <AccordionItem key={f.question} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-semibold text-foreground">
                        {f.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="relative rounded-3xl border border-border/60 bg-card/40 shadow-2xl shadow-primary/10 overflow-hidden ring-1 ring-white/5">
                <img
                  src="/hero-dashboard-frameworks.png"
                  alt="CertifyGRC framework execution and evidence mapping mockup"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-primary/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      
    </>
  );
}
