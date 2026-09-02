import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  FileCheck2,
  Users,
  Compass,
  Sparkles,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/seo/SEO";
import {
  createSoftwareApplicationSchema,
  createFAQSchema,
  createBreadcrumbSchema,
} from "@/lib/schemaOrg";
import { revealUp, staggerContainer, scrollViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NIST_FUNCTIONS = [
  {
    code: "GV",
    name: "Govern",
    color: "hsl(var(--primary))",
    summary:
      "Establish and monitor your organization's cybersecurity risk management strategy, policy oversight, and supply chain risk.",
    categories: [
      "GV.OC: Organizational Context",
      "GV.RM: Risk Management Strategy",
      "GV.RR: Roles, Responsibilities & Authorities",
      "GV.PO: Policy & Oversight",
      "GV.SC: Cybersecurity Supply Chain Risk Management (C-SCRM)",
    ],
  },
  {
    code: "ID",
    name: "Identify",
    color: "#3b82f6",
    summary:
      "Determine cybersecurity risks to enterprise assets, systems, data, and critical business capabilities.",
    categories: [
      "ID.AM: Asset Management & Hardware/Software Inventory",
      "ID.RA: Risk Assessment & Vulnerability Analysis",
      "ID.IM: Improvement & Posture Roadmaps",
    ],
  },
  {
    code: "PR",
    name: "Protect",
    color: "#10b981",
    summary:
      "Deploy safeguards to contain or prevent the impact of potential cybersecurity events across all digital touchpoints.",
    categories: [
      "PR.AA: Identity Management, Authentication & Access Control",
      "PR.AT: Awareness & Role-Based CyberDrill Training",
      "PR.DS: Data Security, Cryptography & Privacy",
      "PR.PS: Platform Security & Secure Architecture",
      "PR.IR: Technology Infrastructure Resilience",
    ],
  },
  {
    code: "DE",
    name: "Detect",
    color: "#f59e0b",
    summary:
      "Find and analyze potential cybersecurity attacks, anomalies, and unauthorized access in real time.",
    categories: [
      "DE.CM: Continuous Security & Log Monitoring",
      "DE.AE: Adverse Event Analysis & Anomaly Detection",
    ],
  },
  {
    code: "RS",
    name: "Respond",
    color: "#ef4444",
    summary:
      "Execute coordinated actions regarding a detected cybersecurity incident to contain damage and maintain operations.",
    categories: [
      "RS.MA: Incident Management & Containment Workflows",
      "RS.AN: Incident Analysis & Forensic Triaging",
      "RS.CO: Stakeholder, Customer & Regulatory Communications",
      "RS.MI: Incident Mitigation & Threat Eradication",
    ],
  },
  {
    code: "RC",
    name: "Recover",
    color: "#8b5cf6",
    summary:
      "Restore capabilities or services that were impaired due to a cybersecurity incident, ensuring business continuity.",
    categories: [
      "RC.RP: Incident Recovery Plan Execution",
      "RC.CO: Recovery Communication & Transparency",
    ],
  },
];

const NIST_FAQS = [
  {
    question: "What makes CertifyGRC the premier software platform for NIST CSF 2.0?",
    answer:
      "Unlike legacy compliance platforms that treat NIST CSF as an afterthought or map it secondary to SOC 2, CertifyGRC was architected from the ground up natively around NIST CSF 2.0. We provide full out-of-the-box coverage across all 6 core functions (including the critical Govern GV function), all 106 subcategories, automated Current vs. Target Profile modeling, and automated evidence collection from cloud providers.",
  },
  {
    question: "How does CertifyGRC handle the new 'Govern' (GV) function in NIST CSF 2.0?",
    answer:
      "NIST CSF 2.0 introduced Govern to ensure cybersecurity risk is integrated with broader enterprise governance. CertifyGRC automates policy lifecycle management, executive oversight dashboards, and Cybersecurity Supply Chain Risk Management (C-SCRM) vendor questionnaires, turning abstract governance into trackable, audit-ready operational workflows.",
  },
  {
    question: "Can CertifyGRC measure Implementation Tiers (Tier 1 through Tier 4)?",
    answer:
      "Yes. CertifyGRC evaluates your organization across all four NIST CSF Implementation Tiers: Tier 1 (Partial), Tier 2 (Risk-Informed), Tier 3 (Repeatable), and Tier 4 (Adaptive). The platform generates executive maturity curves, showing exactly which technical controls and governance procedures are needed to advance to your Target Tier.",
  },
  {
    question: "How does CertifyGRC cross-map NIST CSF 2.0 with ISO 27001 and SOC 2?",
    answer:
      "CertifyGRC's unified control engine eliminates redundant audits. When you collect evidence or satisfy a control in NIST CSF 2.0 (such as identity access management in PR.AA), that evidence automatically satisfies corresponding requirements in ISO/IEC 27001:2022 Annex A.5/A.8, SOC 2 Common Criteria CC6, and CIS Controls v8. You test once and comply everywhere.",
  },
  {
    question: "Does CertifyGRC provide advisory support for NIST CSF 2.0?",
    answer:
      "Yes. In addition to software automation, CertifyGRC provides hybrid vCISO advisory. Our certified practitioners assist in drafting your organizational Target Profile, conducting risk assessments, prioritizing gap closures, and presenting maturity metrics to board members or regulatory examiners.",
  },
];

export default function NistCsfSolutionPage() {
  const pageSchemas = [
    createSoftwareApplicationSchema(),
    createFAQSchema(NIST_FAQS),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/frameworks" },
      { name: "NIST CSF 2.0 Software", url: "/solutions/nist-csf-2-0" },
    ]),
  ];

  return (
    <>
      <SEO
        title="NIST CSF 2.0 Compliance Software & Continuous Gap Analysis Platform | CertifyGRC"
        description="The premier enterprise software platform for NIST CSF 2.0 implementation. Native mapping across Govern, Identify, Protect, Detect, Respond, and Recover with automated gap analysis and audit readiness."
        canonical="https://certifygrc.com/solutions/nist-csf-2-0"
        jsonLd={pageSchemas}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/40 bg-background">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,hsl(var(--primary)/0.14),transparent_70%)]"
          aria-hidden
        />
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={revealUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> NIST Cybersecurity Framework 2.0 Native Platform
              </span>
            </motion.div>

            <motion.h1
              variants={revealUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]"
            >
              Enterprise <span className="gradient-text">NIST CSF 2.0</span> Software &amp; Maturity Automation
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Master cybersecurity governance, continuous gap analysis, and risk mitigation. Built natively for all six
              core NIST CSF 2.0 functions — from <strong>Govern</strong> through <strong>Recover</strong> — with
              continuous evidence collection and hybrid vCISO advisory.
            </motion.p>

            <motion.div
              variants={revealUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="glow-primary h-12 px-7 rounded-xl font-semibold text-sm">
                <Link to="/free-assessment">
                  Free 2-Min Posture Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 rounded-xl font-semibold text-sm border-border hover:bg-muted">
                <Link to="/contact">Schedule Platform Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Functions Grid */}
      <section className="section-padding container-wide">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">The 6 Core Functions</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-1">
            Complete Native Coverage Across All 106 Subcategories
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            NIST CSF 2.0 expands cybersecurity beyond technical defenses into comprehensive enterprise governance.
            CertifyGRC automates each function with pre-configured control mappings, cloud evidence monitors, and policy templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NIST_FUNCTIONS.map((fn) => (
            <div
              key={fn.code}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm flex flex-col justify-between transition-all hover:border-primary/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-black px-2.5 py-1 rounded-md text-white"
                    style={{ backgroundColor: fn.color }}
                  >
                    {fn.code}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    NIST CSF 2.0
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{fn.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  {fn.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/40">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Key Categories:
                  </span>
                  <ul className="space-y-1.5 text-xs text-foreground/80">
                    {fn.categories.map((cat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profile & Maturity Tier Section */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Maturity &amp; Profiles</span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-1">
              Current vs. Target Profiles &amp; Tier Roadmaps
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-2">
              Transform qualitative framework concepts into quantitative, measurable progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Tier 1</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Partial</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ad-hoc, reactive risk management with limited awareness of organizational cyber risk context.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Tier 2</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Risk-Informed</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Approved risk management practices exist but are not yet integrated enterprise-wide across business units.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Tier 3</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Repeatable</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formally established, regularly updated policies and procedures implemented systematically across the company.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Tier 4</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Adaptive</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Continuous improvement, predictive analytics, and dynamic adaptation to evolving advanced persistent threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities */}
      <section className="section-padding container-wide">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Software Capabilities</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-1">
            Built for Modern Security Operators &amp; Executives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Continuous Cloud Evidence Sync</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Direct API integrations with AWS, Azure, Google Cloud, GitHub, GitLab, Okta, and Microsoft 365
              automatically verify controls and maintain real-time audit trails.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Automated Gap Analysis &amp; Scoring</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Instantly identify unaddressed subcategories, prioritize remediation roadmaps, and generate board-ready
              progress reports on your cybersecurity posture.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">CyberDrill Awareness &amp; Tabletop</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Address PR.AT (Awareness Training) and RS/RC (Response &amp; Recovery) with native phishing simulations
              and role-based tabletop incident exercises.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted/10 border-t border-border/40">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">NIST CSF 2.0 FAQs</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {NIST_FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/70 bg-card px-5 py-1 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground text-sm hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-wide">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card to-card p-8 md:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            Ready to Implement NIST CSF 2.0 with Confidence?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
            Take our free 2-minute posture diagnostic to pinpoint your gaps across Govern, Identify, Protect, Detect,
            Respond, and Recover, or schedule a personalized walkthrough with our compliance architects.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="glow-primary h-12 px-8 rounded-xl font-semibold text-sm">
              <Link to="/free-assessment">
                Start Free Posture Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-semibold text-sm border-border">
              <Link to="/contact">Schedule Platform Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
