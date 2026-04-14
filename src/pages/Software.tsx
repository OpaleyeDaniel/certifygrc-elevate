import { useState } from "react";
import { ArrowRight, Monitor, BarChart3, Shield, Workflow, Plug, Lock, Sparkles, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import { applicationDashboards } from "@/constants/applicationDashboards";
import ApplicationFrameworksSections from "@/components/marketing/ApplicationFrameworksSections";
import ScrollReveal from "@/components/ScrollReveal";
import GrcDashboardExperienceMock from "@/components/marketing/GrcDashboardExperienceMock";

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
  const dash = applicationDashboards;

  return (
    <>
      <PageHero
        backgroundUrl={heroImagery.software.background}
        foregroundUrl={dash.hero}
        foregroundAlt={heroImagery.software.foregroundAlt}
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
          Frameworks
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
          Compliance and Privacy Frameworks, <span className="gradient-text">Automated</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          CertifyGRC Software offers a robust suite of over 3 industry-leading compliance frameworks, including{" "}
          <strong className="text-foreground font-medium">
            NIST CSF, ISO 27001, SOC 2, PCI-DSS, PIPEDA, COBIT, NIST AI RMF, ISO 20000, ISO 22301, ISO 42001
          </strong>
          .
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            size="lg"
            onClick={() => setDemoOpen(true)}
            className="glow-primary text-base px-8 w-fit transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary/30 text-base px-8">
            <Link to="/contact">Talk with an Advisor</Link>
          </Button>
        </div>
      </PageHero>

      <ApplicationFrameworksSections showCtas={false} hideIntroBlock />

      <ScrollReveal>
        <section className="section-padding bg-muted/20 border-y border-border/40">
          <div className="container-wide">
            <SectionHeading
              badge="Application"
              title="GRC dashboard experience"
              description="The same structured, audit-ready workspace your teams use to run controls, evidence, and framework coverage day to day."
            />
            <GrcDashboardExperienceMock features={features} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading badge="Features" title="Built for enterprise delivery" description="Everything your teams need to run continuous compliance programs." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {features.map((f) => (
                <div key={f.title} className="glass rounded-xl p-6 hover-lift glow-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-muted/20">
          <div className="container-wide">
            <SectionHeading badge="Integrations" title="Connects with your stack" description="Pre-built connectors for the tools your teams already use." />
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-10">
              {integrations.map((name) => (
                <div key={name} className="px-5 py-3 rounded-xl glass hover-lift text-sm font-medium text-foreground">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">See CertifyGRC in action</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Schedule a personalized walkthrough of the application and frameworks experience.
            </p>
            <Button size="lg" onClick={() => setDemoOpen(true)} className="glow-primary text-base px-8">
              Book Your Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>
      </ScrollReveal>

      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
    </>
  );
}
