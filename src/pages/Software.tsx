import { useState } from "react";
import { ArrowRight, Monitor, BarChart3, Shield, Workflow, Plug, Lock, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import heroDashboard from "@/assets/hero-dashboard.png";

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

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              GRC Platform
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
              The Intelligent <span className="gradient-text">GRC Platform</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Purpose-built software that unifies compliance tracking, risk management, and audit operations into a single, intelligent platform designed for regulated enterprises.
            </p>
            <Button size="lg" onClick={() => setDemoOpen(true)} className="glow-primary text-base px-8 h-12">
              Request a Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading badge="Platform Preview" title="Command Center for Compliance" description="Every metric, control, and risk indicator — unified in real-time." />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden glow-border max-w-4xl mx-auto shadow-2xl shadow-primary/5">
              <img src={heroDashboard} alt="CertifyGRC Platform Dashboard" className="w-full h-auto" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading badge="Features" title="Everything You Need" description="A comprehensive feature set designed for enterprise-grade GRC operations." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="h-full glass rounded-xl p-6 hover-lift glow-border group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading badge="Integrations" title="Connects With Your Stack" description="Pre-built connectors for the tools your team already uses." />
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {integrations.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.04}>
                <div className="px-5 py-3 rounded-xl glass hover-lift text-sm font-medium text-foreground">
                  {name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              See the Platform in Action
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Schedule a personalized demo and discover how CertifyGRC can transform your compliance operations.
            </p>
            <Button size="lg" onClick={() => setDemoOpen(true)} className="glow-primary text-base px-8 h-12">
              Book Your Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
    </>
  );
}
