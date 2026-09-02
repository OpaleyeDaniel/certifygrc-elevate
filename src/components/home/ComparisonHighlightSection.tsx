import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, XCircle, AlertCircle, Sparkles, Shield, Cpu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function ComparisonHighlightSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background border-b border-border/40">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.08),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
        >
          <motion.div variants={revealUp} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Modern Vanta &amp; Drata Alternative
            </span>
          </motion.div>
          <motion.h2
            variants={revealUp}
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Why Security Leaders Choose <span className="gradient-text">CertifyGRC</span>
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Legacy compliance platforms give you a software dashboard and leave policy writing, remediation,
            and auditor defense entirely on your plate. CertifyGRC pairs intelligent automation with expert advisory
            and workforce drills.
          </motion.p>
        </motion.div>

        {/* 3-Way Comparative Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {/* Card 1: Traditional Legacy Tools (Vanta / Drata) */}
          <motion.div
            variants={revealUp}
            className="rounded-2xl border border-border/70 bg-card/60 p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tool-Only Automation
                </span>
                <span className="text-xs rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                  Vanta &amp; Drata
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Software-Only Checklist</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Automates basic evidence polling for SOC 2, but leaves complex NIST CSF 2.0 governance, policy tailoring,
                and auditor negotiations to your internal team.
              </p>

              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                  <span>No hands-on vCISO advisory (requires expensive consulting partners)</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>Limited depth for NIST CSF 2.0 Govern and OSFI financial guidelines</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                  <span>Employee training &amp; phishing simulations are costly add-on upsells</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>High starting contracts ($15k–$30k+) with steep annual renewal hikes</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-border/50 text-xs text-muted-foreground text-center">
              Best for: Tech startups wanting a bare-minimum SOC 2 checkbox
            </div>
          </motion.div>

          {/* Card 2: CertifyGRC (Featured Center) */}
          <motion.div
            variants={revealUp}
            className="rounded-2xl border-2 border-primary bg-gradient-to-b from-primary/[0.08] via-card to-card p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-3 right-6 rounded-full bg-primary px-3.5 py-0.5 text-[11px] font-bold tracking-wider text-primary-foreground uppercase shadow-sm">
              Recommended Choice
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Hybrid Software + Advisory
                </span>
                <span className="text-xs rounded-md bg-primary/15 px-2.5 py-1 font-bold text-primary">
                  CertifyGRC
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Intelligent GRC + Expert Delivery</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                Automated continuous evidence collection mapped to NIST CSF 2.0, ISO 27001, and SOC 2, backed by
                certified practitioners who do the actual heavy lifting.
              </p>

              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>Full NIST CSF 2.0 coverage across all 6 functions (Govern to Recover)</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>Integrated vCISO advisory &amp; policy drafting included</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>Native CyberDrill: phishing simulations &amp; tabletop exercises included</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>Multi-framework deduplication: "Test once, comply across many"</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>Transparent, flexible pricing with no forced multi-year lock-in</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-primary/20">
              <Button asChild className="glow-primary w-full h-11 text-sm font-semibold rounded-xl">
                <Link to="/compare">
                  Compare CertifyGRC vs. Vanta &amp; Drata <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Card 3: Traditional Big-4 Consulting */}
          <motion.div
            variants={revealUp}
            className="rounded-2xl border border-border/70 bg-card/60 p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Manual Advisory
                </span>
                <span className="text-xs rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                  Legacy Consulting
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Spreadsheets &amp; Audits</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Manual point-in-time assessments conducted via spreadsheets and endless interviews that become obsolete
                days after the report is issued.
              </p>

              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                  <span>No software automation or continuous cloud evidence sync</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                  <span>Exorbitant billable hourly rates ($50,000–$150,000+ per audit)</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>Point-in-time snapshot leaves blind spots for the other 364 days</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                  <span>No integrated employee simulations or automated gap remediation</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-border/50 text-xs text-muted-foreground text-center">
              Best for: Organizations with unlimited budgets requiring a legacy brand name audit
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Trust Bar Below */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-12 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Unified Standards Mapped Out-of-the-Box
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs text-foreground/75 font-semibold">
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">NIST CSF 2.0</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">ISO/IEC 27001:2022</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">SOC 2 Type II</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">PCI DSS 4.0</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">OSFI B-10 / B-13</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">ISO 42001 (AI Governance)</span>
            <span className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">HIPAA &amp; PIPEDA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
