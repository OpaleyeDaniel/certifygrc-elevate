import type { ElementType } from "react";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Server,
  Shield,
  ShieldCheck,
  Lock,
  RefreshCw,
  CreditCard,
  Eye,
  Brain,
  Layers,
  Zap,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import { siteCs } from "@/constants/siteImages";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { brandAccentAt } from "@/lib/brandColors";

type Service = {
  key: string;
  icon: ElementType;
  title: string;
  frameworks: string[];
  description: string;
  core: string[];
  benefits: string[];
};

const services: Service[] = [
  {
    key: "it-service-management",
    icon: Server,
    title: "IT Service Management (ITSM)",
    frameworks: ["ITIL®", "ISO/IEC 20000"],
    description:
      "We help organizations design, implement, and continuously improve end-to-end IT service management capabilities that ensure technology services are reliable, customer-focused, and aligned with business objectives.",
    core: [
      "Continual service improvement (CSI) frameworks",
      "ISO/IEC 20000 gap analysis and certification readiness",
      "ITSM tool selection, configuration, and optimization",
      "Service catalog and service level management",
      "ITIL process implementation (Incident, Problem, Change, Request, Asset, Configuration)",
      "ITSM strategy and operating model design",
    ],
    benefits: [
      "Lower operational costs and improved efficiency",
      "Standardized and auditable IT processes",
      "Increased customer and user satisfaction",
      "Improved service reliability and reduced downtime",
    ],
  },
  {
    key: "it-governance",
    icon: ShieldCheck,
    title: "IT Governance",
    frameworks: ["COBIT®", "ISO/IEC 38500"],
    description:
      "We support boards and executive management in establishing effective IT governance frameworks that ensure technology decisions deliver business value while managing risk and regulatory obligations.",
    core: [
      "Governance maturity assessments and roadmaps",
      "Roles, responsibilities, and decision-rights definition",
      "IT strategy and portfolio governance",
      "Board-level IT governance structures and charters",
      "COBIT-based governance framework design",
    ],
    benefits: [
      "Increased return on IT investments",
      "Reduced technology and compliance risk",
      "Improved alignment between business and IT",
      "Stronger executive oversight and accountability",
    ],
  },
  {
    key: "information-cybersecurity",
    icon: Lock,
    title: "Information & Cybersecurity",
    frameworks: ["NIST CSF®", "ISO/IEC 27001", "SOC 2"],
    description:
      "We help organizations establish and mature information security and cybersecurity programs that protect critical assets, support regulatory compliance, and build stakeholder trust.",
    core: [
      "Security policies, standards, and awareness programs",
      "NIST CSF implementation and gap remediation",
      "SOC 2 Type I & II readiness and control mapping",
      "ISO/IEC 27001 ISMS design and implementation",
      "Cybersecurity risk assessments and maturity evaluations",
    ],
    benefits: [
      "Stronger security governance and accountability",
      "Enhanced customer and partner trust",
      "Improved regulatory and contractual compliance",
      "Reduced likelihood and impact of cyber incidents",
    ],
  },
  {
    key: "business-continuity",
    icon: Landmark,
    title: "Business Continuity Management (BCM)",
    frameworks: ["BCI GPG v7", "ISO 22301"],
    description:
      "We enable organizations to build resilient operations that can withstand and recover from disruptions. Our BCM services ensure critical services are identified, protected, and recoverable within acceptable timeframes.",
    core: [
      "Plan testing, simulations, and exercises",
      "ISO 22301 management system design and readiness",
      "Crisis management and incident response frameworks",
      "Business continuity and disaster recovery planning",
      "Business impact analysis (BIA) and risk assessments",
    ],
    benefits: [
      "Compliance with regulatory and contractual requirements",
      "Protection of brand reputation and stakeholder confidence",
      "Faster and more effective crisis response",
      "Reduced operational downtime during disruptions",
    ],
  },
  {
    key: "payment-security",
    icon: CreditCard,
    title: "Payment & Card Security",
    frameworks: ["PCI DSS"],
    description:
      "We help organizations that handle payment card data meet PCI DSS compliance requirements while reducing fraud and data-breach risk. Our services focus on practical, risk-based implementation that minimizes business disruption.",
    core: [
      "Ongoing compliance and security advisory",
      "Support for SAQs, ROC preparation, and audits",
      "Policy, procedure, and evidence development",
      "Control design, implementation, and remediation",
      "PCI DSS scoping and gap assessments",
    ],
    benefits: [
      "More secure payment environments",
      "Improved trust with customers and partners",
      "Avoidance of fines, penalties, and card brand sanctions",
      "Reduced risk of payment fraud and card data breaches",
    ],
  },
  {
    key: "privacy-data-protection",
    icon: Eye,
    title: "Privacy & Data Protection",
    frameworks: ["PIPEDA", "NIST Privacy Framework"],
    description:
      "We help organizations embed privacy by design into business operations, ensuring personal information is handled lawfully, transparently, and responsibly.",
    core: [
      "Breach response planning and privacy training",
      "Privacy impact assessments (PIAs)",
      "Data mapping and personal information inventories",
      "Privacy governance and accountability frameworks",
      "PIPEDA compliance assessments and remediation",
    ],
    benefits: [
      "Increased readiness for audits and investigations",
      "Clear accountability for personal data management",
      "Improved customer trust and organizational reputation",
      "Reduced risk of privacy violations and regulatory penalties",
    ],
  },
  {
    key: "ai-governance",
    icon: Brain,
    title: "Artificial Intelligence (AI) Governance",
    frameworks: ["NIST AI RMF", "ISO/IEC 42001"],
    description:
      "We help organizations adopt AI responsibly by establishing AI governance, risk, and control frameworks that address ethical, legal, and operational risks across the AI lifecycle.",
    core: [
      "ISO/IEC 42001 readiness and implementation support",
      "Policy development for ethical and responsible AI",
      "Model lifecycle management and accountability controls",
      "AI governance frameworks and operating models",
      "AI risk and impact assessments",
    ],
    benefits: [
      "Sustainable and trustworthy AI innovation",
      "Regulatory readiness for emerging AI regulations",
      "Increased confidence in AI-driven decision-making",
      "Reduced legal, ethical, and reputational risk",
    ],
  },
  {
    key: "enterprise-architecture",
    icon: Layers,
    title: "Enterprise Architecture & Digital Transformation",
    frameworks: ["Enterprise Architecture Practices"],
    description:
      "We help organizations design and execute enterprise-wide digital transformation initiatives through structured enterprise architecture practices that align business strategy, technology, and execution.",
    core: [
      "Digital capability and maturity assessments",
      "Architecture governance and standards",
      "Cloud, platform, and legacy modernization",
      "Target-state architecture and transformation roadmaps",
      "Business, application, data, and technology architecture",
    ],
    benefits: [
      "Stronger alignment between strategy and execution",
      "Improved scalability and future-readiness",
      "Faster execution of digital initiatives",
      "Reduced technology complexity and redundancy",
    ],
  },
  {
    key: "agile-project-program-management",
    icon: RefreshCw,
    title: "Agile Project & Program Management",
    frameworks: ["Scrum", "PMBOK® Guide vs8"],
    description:
      "We support organizations in adopting agile and hybrid delivery models that balance speed, governance, and risk management.",
    core: [
      "Benefits realization and performance reporting",
      "Program and portfolio management",
      "Hybrid PMO design and governance integration",
      "Scrum team enablement and coaching",
      "Agile transformation and delivery models",
    ],
    benefits: [
      "Reduced delivery and execution risk",
      "Better stakeholder engagement and alignment",
      "Improved delivery predictability and transparency",
      "Faster time-to-market for strategic initiatives",
    ],
  },
  {
    key: "osfi-compliance",
    icon: Shield,
    title: "OSFI Compliance",
    frameworks: ["B-10", "B-13", "E-21"],
    description:
      "We help federally regulated financial institutions meet OSFI expectations by strengthening governance, technology risk management, and operational resilience in line with supervisory guidelines.",
    core: [
      "Ongoing compliance monitoring and advisory",
      "Documentation, evidence, and examination readiness",
      "Governance, policy, and control framework alignment",
      "Technology, cyber, and third-party risk management",
      "OSFI guideline gap assessments (e.g., B-10, B-13, E-21)",
    ],
    benefits: [
      "Enhanced operational resilience and stability",
      "Stronger governance and risk management posture",
      "Improved confidence from regulators and boards",
      "Reduced regulatory and supervisory risk",
    ],
  },
];

export default function ConsultingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);

  const sortedServices = useMemo(() => services, []);

  return (
    <>
      <ScrollReveal>
        <PageHero
          backgroundUrl={heroImagery.consulting.background}
          foregroundUrl={heroImagery.consulting.foreground}
          foregroundAlt={heroImagery.consulting.foregroundAlt}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Confidence Through Compliance</span>
          </div>

          <h1 className="font-display font-bold text-display-lg md:text-display-xl text-foreground tracking-tight">
            Confidence Through <span className="gradient-text">Compliance</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Helping businesses meet regulatory demands while enabling sustainable growth.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => setConsultOpen(true)}
              className="glow-primary text-base px-8 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a Consultation Now <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </PageHero>
      </ScrollReveal>

      {/* Services */}
      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading
              badge="Our Expertise"
              title="Specialized GRC Consulting"
              description="Choose the domain you need. Each service is delivered with real-world delivery, audit-ready evidence, and measurable outcomes."
            />

            <PremiumCardGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-10">
              {sortedServices.map((service, i) => {
                const accent = brandAccentAt(i);
                return (
                  <PremiumCard
                    key={service.key}
                   
                    padding="none"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedService(service)}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedService(service)}
                    className="text-left"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden border-b border-border/50">
                      <img
                        src={siteCs(Math.min(i + 1, 10))}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <div
                        className="absolute bottom-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: `${accent}e6` }}
                      >
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-6 pt-5">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        {service.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {service.frameworks.map((fw) => (
                          <span
                            key={fw}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: `${accent}14`,
                              color: accent,
                              border: `1px solid ${accent}28`,
                            }}
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-4 inline-flex items-center text-sm font-medium" style={{ color: accent }}>
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </PremiumCard>
                );
              })}
            </PremiumCardGrid>
          </div>
        </section>
      </ScrollReveal>

      {/* Service Detail */}
      <Dialog
        open={!!selectedService}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto" style={{ background: "hsl(220,42%,8%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
          {selectedService && (
            <>
              <DialogHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <selectedService.icon className="w-6 h-6 text-primary" />
                </div>
                <DialogTitle className="font-display text-2xl">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription>{selectedService.description}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedService.frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {fw}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <PremiumCard padding="md" animate={false} interactive={false}>
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Core Consulting Services
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {selectedService.core.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </PremiumCard>
                <PremiumCard padding="md" animate={false} interactive={false}>
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Business Benefits
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {selectedService.benefits.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </PremiumCard>
              </div>

              <Button
                className="w-full mt-6 glow-primary"
                size="lg"
                onClick={() => {
                  setSelectedService(null);
                  setConsultOpen(true);
                }}
              >
                Book a Consultation Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <ScrollReveal>
        <section className="section-padding bg-muted/20">
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Build Your Compliance Roadmap with Expert Guidance
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Select your domain, review the deliverables, then book a consultation to move from requirements to audit-ready outcomes.
            </p>
            <Button size="lg" onClick={() => setConsultOpen(true)} className="glow-primary text-base px-8">
              Start the Conversation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>
      </ScrollReveal>

      <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
    </>
  );
}
