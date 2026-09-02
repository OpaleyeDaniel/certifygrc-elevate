import { ArrowRight, Radar, Shield, Target, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ScrollReveal from "@/components/ScrollReveal";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { useBooking } from "@/contexts/BookingContext";
import SEO from "@/components/seo/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/schemaOrg";

const platformFeatures = [
  {
    icon: Target,
    title: "Phishing simulations",
    description:
      "Run realistic phishing campaigns to measure click rates, reporting behaviour, and improvement over time.",
  },
  {
    icon: Shield,
    title: "Tabletop exercises",
    description:
      "Structured incident scenarios that test decision-making, communication, and response playbooks across teams.",
  },
  {
    icon: Radar,
    title: "Interactive security drills",
    description:
      "Hands-on drills that turn awareness into muscle memory — so employees recognise and report threats faster.",
  },
  {
    icon: BarChart3,
    title: "Readiness reporting",
    description:
      "Track completion, risk reduction, and program maturity with dashboards built for security and compliance leaders.",
  },
  {
    icon: Users,
    title: "Role-based assignments",
    description:
      "Assign drills by department, role, or risk profile — with clear ownership and follow-up workflows.",
  },
];

export default function CyberAwarePage() {
  const { openDemo } = useBooking();

  const cyberAwareSchemas = [
    createServiceSchema({
      name: "CertifyGRC CyberDrill & Security Awareness Training",
      serviceType: "Cybersecurity Awareness & Workforce Simulation",
      description:
        "Role-based cyber awareness training, realistic phishing simulations, and tabletop incident response exercises.",
      url: "/cyber-aware",
    }),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Cyber Awareness Training", url: "/cyber-aware" },
    ]),
  ];

  return (
    <>
      <SEO
        title="Cyber Awareness & Compliance Simulation Training"
        description="Empower your workforce with role-based cyber awareness training, simulated phishing, and compliance education designed to build a proactive security culture."
        canonical="https://certifygrc.com/cyber-aware"
        jsonLd={cyberAwareSchemas}
      />
      <PageHero
        backgroundUrl={heroImagery.eLearning.background}
        foregroundUrl={heroImagery.eLearning.foreground}
        foregroundAlt={heroImagery.eLearning.foregroundAlt}
        foregroundFit="contain"
      >
        <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          Simulation and Training
        </span>
        <h1 className="font-display text-display-lg font-bold tracking-tight text-foreground md:text-display-xl">
          Validate readiness with <span className="gradient-text">CyberDrill</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Strengthen security culture, reduce human risk, and prepare employees to respond confidently to
          real-world cyber threats — from phishing simulations to tabletop exercises and interactive drills.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="lg" onClick={openDemo} className="glow-primary px-8">
            Book a demo <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/30 bg-transparent px-8 text-foreground hover:bg-primary/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <Link to="/contact">Speak to an advisor</Link>
          </Button>
        </div>
      </PageHero>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading
              badge="Platform"
              title="Measure readiness before attackers do"
              description="CyberDrill transforms awareness into measurable readiness — helping your organization detect, report, and respond to threats before they become incidents."
            />
            <PremiumCardGrid className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {platformFeatures.map((feature) => (
                <PremiumCard key={feature.title} padding="lg" interactive={false}>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                      border: `1px solid ${BRAND_PRIMARY}28`,
                    }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </PremiumCard>
              ))}
            </PremiumCardGrid>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={120}>
        <section className="section-padding bg-muted/20">
          <div className="container-narrow text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Build security culture that lasts
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
              See how CyberDrill helps teams build security culture, validate readiness, and reduce human
              risk — with reporting your leadership team can act on.
            </p>
            <Button size="lg" onClick={openDemo} className="glow-primary px-8">
              Book a demo <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
