import { useState } from "react";
import { ArrowRight, Monitor, BarChart3, Shield, Workflow, Plug, Lock, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import InteractiveDashboard from "@/components/InteractiveDashboard";

import soc2 from "@/assets/frameworks/soc2.png";
import pciDss from "@/assets/frameworks/pci-dss.png";
import nistCsf from "@/assets/frameworks/nist-csf.png";
import nistAiRmf from "@/assets/frameworks/nist-ai-rmf.png";
import cobit from "@/assets/frameworks/cobit.png";
import iso42001 from "@/assets/frameworks/iso-42001.png";
import iso22301 from "@/assets/frameworks/iso-22301.png";
import iso20000 from "@/assets/frameworks/iso-20000.png";
import iso27001 from "@/assets/frameworks/iso-27001.png";

const features = [
  { icon: Monitor, title: "Unified Dashboard", description: "Single pane of glass for all your GRC metrics, compliance status, and risk indicators." },
  { icon: BarChart3, title: "Advanced Analytics", description: "Real-time reporting with customizable dashboards, trend analysis, and executive summaries." },
  { icon: Shield, title: "Control Mapping", description: "Map controls across multiple frameworks simultaneously, eliminating duplication." },
  { icon: Workflow, title: "Workflow Automation", description: "Automate evidence collection, task assignments, review cycles, and escalation paths." },
  { icon: Plug, title: "Integration Hub", description: "Pre-built connectors for AWS, Azure, GCP, Jira, ServiceNow, Slack, and 50+ tools." },
  { icon: Lock, title: "Enterprise Security", description: "SOC 2 Type II certified. End-to-end encryption, SSO, MFA, and granular RBAC." },
  { icon: Sparkles, title: "AI Engine", description: "ML-powered risk scoring, gap analysis, and remediation recommendations." },
  { icon: FileText, title: "Evidence Library", description: "Centralized evidence repository with automated collection, tagging, and audit-trail." },
];

const frameworkBadges = [
  { name: "NIST CSF", image: nistCsf },
  { name: "ISO 27001", image: iso27001 },
  { name: "SOC 2", image: soc2 },
  { name: "PCI DSS", image: pciDss },
  { name: "COBIT", image: cobit },
  { name: "NIST AI RMF", image: nistAiRmf },
  { name: "ISO 20000", image: iso20000 },
  { name: "ISO 22301", image: iso22301 },
  { name: "ISO 42001", image: iso42001 },
];

const frameworkDetails = [
  {
    name: "ISO 27001 Compliance with CertifyGRC",
    desc: "CertifyGRC provides an end-to-end solution to help businesses navigate ISO 27001 compliance with ease.",
    points: ["Implementation Made Easy", "Risk Management & Continuous Monitoring", "Improve customer retention"],
    image: iso27001,
  },
  {
    name: "PCI DSS Compliance with CertifyGRC",
    desc: "CertifyGRC streamlines PCI DSS compliance by automating security control assessments, tracking compliance gaps, and facilitating audits.",
    points: ["PCI DSS Control Implementation & Assessment", "Risk-Based Approach to Payment Security", "Audit & Compliance Reporting"],
    image: pciDss,
  },
  {
    name: "SOC 2 Compliance with CertifyGRC",
    desc: "CertifyGRC provides a comprehensive approach to achieving and maintaining SOC 2 compliance.",
    points: ["SOC 2 Trust Principles Implementation", "Risk & Security Management", "Audit & Evidence Management"],
    image: soc2,
  },
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
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-wide">Frameworks</span>
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-4 leading-[1.08] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Compliance and Privacy Frameworks, <span className="gradient-text">Automated</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
              CertifyGRC Software offers a robust suite of over 9 industry-leading compliance frameworks, including NIST CSF, ISO 27001, SOC 2, PCI-DSS, PIPEDA, COBIT, NIST AI RMF, ISO 20000, ISO 22301, and ISO 42001.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              <Button size="lg" onClick={() => setDemoOpen(true)} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                Request a Demo <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Scrolling framework badges */}
          <div className="relative overflow-hidden mask-fade mb-8 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <div className="flex gap-6 animate-scroll items-center">
              {[...frameworkBadges, ...frameworkBadges].map((fw, i) => (
                <div key={`${fw.name}-${i}`} className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl glass p-1.5 hover:scale-110 transition-transform duration-300">
                  <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              badge="Live Platform Preview"
              title="Experience the Dashboard"
              description="Explore a live preview of the CertifyGRC compliance dashboard — interact with tabs to see compliance, risk, and audit views."
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <InteractiveDashboard />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Framework Details */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              badge="Frameworks"
              title="Tailored to Your Company's Needs"
              description="Users can delve into detailed clauses and controls specified by these standards, gaining clarity on necessary actions through the implementation guidance provided by the software."
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-12 glow-border">
              <p className="text-muted-foreground leading-relaxed text-center">
                With our efficient evidence mapping system, organizations can map the evidence required to demonstrate compliance against specific controls, ensuring thorough documentation and audit readiness.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8 max-w-5xl mx-auto">
            {frameworkDetails.map((fw, i) => (
              <ScrollReveal key={fw.name} delay={i * 0.1}>
                <div className={`glass rounded-2xl overflow-hidden glow-border hover-lift ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8">
                    <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-background/50 p-3 flex items-center justify-center">
                      <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">{fw.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{fw.desc}</p>
                      <div className="space-y-2">
                        {fw.points.map((point) => (
                          <div key={point} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                <div className="px-5 py-3 rounded-xl glass hover-lift text-sm font-medium text-foreground">{name}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">See the Platform in Action</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Schedule a personalized demo and discover how CertifyGRC can transform your compliance operations.</p>
            <Button size="lg" onClick={() => setDemoOpen(true)} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
              Book Your Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
    </>
  );
}
