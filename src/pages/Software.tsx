import { useState } from "react";
import { ArrowRight, Monitor, BarChart3, Shield, Workflow, Plug, Lock, Sparkles, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import ApplicationPageHero from "@/components/marketing/ApplicationPageHero";
import ApplicationFrameworksSections from "@/components/marketing/ApplicationFrameworksSections";
import ScrollReveal from "@/components/ScrollReveal";
import LiveDemoSection from "@/components/marketing/LiveDemoSection";
import WaitlistSection from "@/components/marketing/WaitlistSection";
import ApplicationClosingCTA from "@/components/marketing/ApplicationClosingCTA";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import SEO from "@/components/seo/SEO";
import { createSoftwareApplicationSchema, createBreadcrumbSchema } from "@/lib/schemaOrg";

const features = [
  { icon: Monitor, title: "Unified Dashboard", description: "Single pane of glass for all your GRC metrics, compliance status, and risk indicators." },
  { icon: BarChart3, title: "Advanced Analytics", description: "Real-time reporting with customizable dashboards, trend analysis, and executive summaries." },
  { icon: Shield, title: "Control Mapping", description: "Map controls across multiple frameworks simultaneously, eliminating duplication and reducing effort." },
  { icon: Workflow, title: "Workflow Automation", description: "Automate evidence collection, task assignments, review cycles, and escalation paths." },
  { icon: Plug, title: "Integration Hub", description: "Pre-built connectors for AWS, Azure, GCP, Jira, ServiceNow, Slack, and 50+ tools." },
  { icon: Lock, title: "Enterprise Security", description: "SOC 2 Type II certified. End-to-end encryption, SSO, MFA, and granular RBAC." },
  { icon: Sparkles, title: "AI Engine", description: "Machine learning-powered risk scoring, gap analysis, and remediation recommendations." },
  { icon: FileText, title: "Evidence Library", description: "Centralized evidence repository with automated collection, tagging, and audit-trail." },
];

const integrations = [
  "AWS", "Azure", "Google Cloud", "Jira", "ServiceNow",
  "Slack", "Okta", "GitHub", "Datadog", "Splunk",
  "PagerDuty", "Confluence", "Salesforce", "Zendesk",
];

export default function SoftwarePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  const softwareSchemas = [
    createSoftwareApplicationSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Software & Platform", url: "/software" },
    ]),
  ];

  return (
    <>
      <SEO
        title="Compliance Automation Software & GRC Platform"
        description="Looking for top compliance automation software? CertifyGRC provides automated evidence collection, continuous cloud monitoring, and audit readiness for SOC 2, ISO 27001, and NIST CSF 2.0 — combining modern software with dedicated vCISO advisory."
        keywords="compliance automation software, software like Drata, software like Vanta, Vanta alternative, Drata alternative, best GRC software, SOC 2 compliance tool, ISO 27001 automation, continuous evidence collection, audit readiness"
        canonical="https://certifygrc.com/software"
        jsonLd={softwareSchemas}
      />
      <ApplicationPageHero>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          Application
        </span>
        <h1 className="font-display text-display-lg font-bold tracking-tight text-foreground dark:text-white md:text-display-xl">
          GRC Command Center, <span className="gradient-text">Built for Operators</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground dark:text-white/65">
          See live posture, structured assessments, auditor workflows, and evidence-backed reporting in one premium workspace designed
          for teams who need clarity from the first dashboard to the final audit readout.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            size="lg"
            onClick={() => setDemoOpen(true)}
            className="glow-primary w-fit px-8 text-base transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a Demo <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/30 bg-transparent px-8 text-base text-foreground hover:bg-primary/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Link to="/contact">Talk with an Advisor</Link>
          </Button>
        </div>
      </ApplicationPageHero>

      <ApplicationFrameworksSections showCtas={false} hideIntroBlock />

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading badge="Features" title="Built for enterprise delivery" description="Everything your teams need to run continuous compliance programs." />
            <PremiumCardGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-10">
              {features.map((f) => (
                  <PremiumCard key={f.title} padding="md" interactive={false}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                        border: `1px solid ${BRAND_PRIMARY}28`,
                      }}
                    >
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </PremiumCard>
              ))}
            </PremiumCardGrid>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-muted/20">
          <div className="container-wide">
            <SectionHeading badge="Integrations" title="Connects with your stack" description="Pre-built connectors for the tools your teams already use." />
            <PremiumCardGrid className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-10">
              {integrations.map((name) => (
                <PremiumCard
                  key={name}
                  padding="sm"
                  interactive={false}
                  className="!h-auto"
                  contentClassName="!flex-row px-5 py-3"
                >
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">{name}</span>
                </PremiumCard>
              ))}
            </PremiumCardGrid>
          </div>
        </section>
      </ScrollReveal>

      <LiveDemoSection />

      <WaitlistSection source="application" />

      <ScrollReveal>
        <ApplicationClosingCTA onBookDemo={() => setDemoOpen(true)} />
      </ScrollReveal>

      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
    </>
  );
}
