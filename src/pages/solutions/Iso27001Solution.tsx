import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Workflow,
  Sparkles,
  Users,
  Database,
  Building2,
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

const ANNEX_A_THEMES = [
  {
    theme: "Organizational Controls (37 Controls)",
    icon: Building2,
    summary: "Policies for information security, supplier relationships, asset management, and threat intelligence.",
    examples: ["A.5.1 Policies for Information Security", "A.5.7 Threat Intelligence", "A.5.19 Supplier Relationships"],
  },
  {
    theme: "People Controls (8 Controls)",
    icon: Users,
    summary: "Screening, terms of employment, security awareness training, and remote working safeguards.",
    examples: ["A.6.3 Information Security Awareness & Training", "A.6.7 Remote Working", "A.6.8 Event Reporting"],
  },
  {
    theme: "Physical Controls (14 Controls)",
    icon: Lock,
    summary: "Physical security perimeters, entry controls, equipment maintenance, and secure disposal.",
    examples: ["A.7.1 Physical Security Perimeter", "A.7.4 Physical Security Monitoring", "A.7.14 Secure Disposal"],
  },
  {
    theme: "Technological Controls (34 Controls)",
    icon: Database,
    summary: "User endpoint devices, privileged access rights, secure coding, data masking, and log monitoring.",
    examples: ["A.8.1 User Endpoint Devices", "A.8.9 Configuration Management", "A.8.28 Secure Coding"],
  },
];

const ISO_FAQS = [
  {
    question: "How does CertifyGRC simplify ISO/IEC 27001:2022 certification?",
    answer:
      "CertifyGRC automates the entire lifecycle of your Information Security Management System (ISMS). We provide pre-built policy templates aligned with Clauses 4 through 10, continuous automated evidence polling for the 93 Annex A controls, an automated Statement of Applicability (SoA) engine, and integrated risk treatment planning.",
  },
  {
    question: "Does CertifyGRC support the new 2022 updates to ISO 27001?",
    answer:
      "Yes. CertifyGRC is fully aligned with the ISO/IEC 27001:2022 revision, including all newly introduced controls such as Threat Intelligence (A.5.7), Information Security for Cloud Services (A.5.23), ICT Readiness for Business Continuity (A.5.30), Physical Security Monitoring (A.7.4), Configuration Management (A.8.9), Information Deletion (A.8.10), Data Masking (A.8.11), and Secure Coding (A.8.28).",
  },
  {
    question: "How is the Statement of Applicability (SoA) generated?",
    answer:
      "Our platform generates a real-time, auditor-ready Statement of Applicability. For each of the 93 Annex A controls, CertifyGRC tracks whether the control is included or excluded, the justification, implementation status, and links directly to technical evidence.",
  },
  {
    question: "Can we pursue ISO 27001 and SOC 2 or NIST CSF 2.0 at the same time?",
    answer:
      "Yes! CertifyGRC features a unified control engine. When you connect your cloud infrastructure (AWS, Azure, GCP) or implement security policies, that evidence automatically maps across ISO 27001, SOC 2, and NIST CSF 2.0, saving hundreds of hours of duplicate effort.",
  },
];

export default function Iso27001SolutionPage() {
  const pageSchemas = [
    createSoftwareApplicationSchema(),
    createFAQSchema(ISO_FAQS),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/frameworks" },
      { name: "ISO 27001 Software", url: "/solutions/iso-27001" },
    ]),
  ];

  return (
    <>
      <SEO
        title="ISO 27001:2022 Compliance Automation & ISMS Platform | CertifyGRC"
        description="Automate your ISO/IEC 27001:2022 Information Security Management System (ISMS). Real-time Statement of Applicability (SoA), Annex A 93-control mapping, and continuous audit readiness."
        canonical="https://certifygrc.com/solutions/iso-27001"
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
                <Sparkles className="h-3.5 w-3.5" /> ISO/IEC 27001:2022 ISMS Automation Platform
              </span>
            </motion.div>

            <motion.h1
              variants={revealUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]"
            >
              Streamlined <span className="gradient-text">ISO 27001:2022</span> Compliance &amp; ISMS
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Accelerate certification and maintain continuous compliance. Automate your Information Security Management
              System (ISMS), map all 93 Annex A controls, generate instant Statement of Applicability (SoA) reports, and
              partner with experienced auditors.
            </motion.p>

            <motion.div
              variants={revealUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="glow-primary h-12 px-7 rounded-xl font-semibold text-sm">
                <Link to="/contact">
                  Schedule ISO 27001 Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 rounded-xl font-semibold text-sm border-border hover:bg-muted">
                <Link to="/free-assessment">Take Free Posture Assessment</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Annex A 4 Themes */}
      <section className="section-padding container-wide">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Annex A Control Architecture</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-1">
            Full Automated Coverage of the 93 ISO 27001:2022 Controls
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            The 2022 revision restructured Annex A into 4 intuitive themes. CertifyGRC provides out-of-the-box policies,
            automated checks, and evidence collection across all 4 themes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ANNEX_A_THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.theme}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{theme.theme}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                    {theme.summary}
                  </p>
                  <div className="space-y-1.5 pt-3 border-t border-border/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Sample Automated Controls:
                    </span>
                    <ul className="space-y-1 text-xs text-foreground/80">
                      {theme.examples.map((ex, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ISMS Lifecycle */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">End-to-End ISMS Management</span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-1">
              From Gap Analysis to Stage 2 Audit Defense
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-2xl font-black text-primary mb-2">01</div>
              <h4 className="font-bold text-foreground mb-1">Scoping &amp; Context</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Define internal and external context (Clause 4), stakeholder requirements, and ISMS boundaries.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-2xl font-black text-primary mb-2">02</div>
              <h4 className="font-bold text-foreground mb-1">Risk Assessment &amp; RTP</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automate asset risk scoring, impact matrices, and generate dynamic Risk Treatment Plans (Clause 6).
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-2xl font-black text-primary mb-2">03</div>
              <h4 className="font-bold text-foreground mb-1">Statement of Applicability</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Instantly generate your dynamic SoA report linking controls directly to live cloud evidence.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-2xl font-black text-primary mb-2">04</div>
              <h4 className="font-bold text-foreground mb-1">Audit Defense &amp; Surveillance</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Share read-only auditor vaults, participate in Stage 1/2 audits, and maintain annual surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding container-wide max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">ISO 27001 FAQs</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {ISO_FAQS.map((faq, i) => (
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
      </section>

      {/* CTA */}
      <section className="section-padding container-wide">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card to-card p-8 md:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            Accelerate Your ISO 27001 Certification
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
            Eliminate manual spreadsheets and audit chaos. Speak with our certified ISO 27001 Lead Auditors and
            compliance architects today.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="glow-primary h-12 px-8 rounded-xl font-semibold text-sm">
              <Link to="/contact">
                Talk with an ISO Specialist <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-semibold text-sm border-border">
              <Link to="/software">Explore Software Platform</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
