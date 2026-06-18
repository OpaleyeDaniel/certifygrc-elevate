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
import GrcDashboardShowcase from "@/components/marketing/GrcDashboardShowcase";
import WaitlistSection from "@/components/marketing/WaitlistSection";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

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
          Application
        </span>
        <h1 className="font-display font-bold text-display-lg md:text-display-xl text-foreground tracking-tight">
          GRC Command Center, <span className="gradient-text">Built for Operators</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          See live posture, structured assessments, auditor workflows, and evidence-backed reporting in one premium workspace designed
          for teams who need clarity from the first dashboard to the final audit readout.
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
        <section
          id="live-preview"
          className="section-padding relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(222,47%,6%) 0%, hsl(222,47%,5%) 50%, hsl(220,42%,7%) 100%)" }}
        >
          {/* Subtle top gradient orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ width: 900, height: 400, background: "radial-gradient(ellipse, rgba(48,92,222,0.15), transparent 70%)" }}
          />
          <div className="mx-auto max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
                Live Preview
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight">
                Explore every screen. No sign-up required.
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base">
                25+ real application screenshots. Hit Play Demo and watch the full product tour auto-scroll through the entire platform.
              </p>
            </div>
            <GrcDashboardShowcase onBookDemo={() => setDemoOpen(true)} />
          </div>
        </section>
      </ScrollReveal>

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
              {integrations.map((name, i) => (
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

      <WaitlistSection source="application" />

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
