import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  Shield,
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  FileText,
  DollarSign,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/seo/SEO";
import {
  createSoftwareApplicationSchema,
  createCompetitorComparisonSchema,
  createFAQSchema,
  createBreadcrumbSchema,
} from "@/lib/schemaOrg";
import { revealUp, staggerContainer, scrollViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const COMPARE_FAQS = [
  {
    question: "Is CertifyGRC a direct alternative to Vanta and Drata?",
    answer:
      "Yes. CertifyGRC provides automated continuous evidence collection, cloud integrations, and audit readiness workflows just like Vanta and Drata. However, CertifyGRC is a hybrid platform: we combine SaaS automation with hands-on vCISO advisory and built-in workforce training (CyberDrill), ensuring you are not left alone to interpret frameworks or negotiate with auditors.",
  },
  {
    question: "How does CertifyGRC compare to Vanta and Drata for NIST CSF 2.0?",
    answer:
      "CertifyGRC was architected natively around the newly released NIST CSF 2.0 framework, offering full out-of-the-box coverage for all six core functions (Govern GV, Identify ID, Protect PR, Detect DE, Respond RS, and Recover RC) across all 106 subcategories. In contrast, Vanta and Drata primarily focus on SOC 2 and ISO 27001 checklists, treating NIST CSF as a secondary mapping without dedicated governance or recovery playbooks.",
  },
  {
    question: "How does CertifyGRC pricing compare to Vanta and Drata?",
    answer:
      "Vanta and Drata typically require high annual upfront commitments ranging from $15,000 to over $35,000 per year, with mandatory upsells for additional frameworks, employee training, and premium support. CertifyGRC offers transparent, modular pricing tailored to your organization's size and stage, with multi-framework mapping and employee security drills included without penalty.",
  },
  {
    question: "What is the hybrid software + advisory advantage?",
    answer:
      "Software-only tools like Vanta and Drata leave policy drafting, risk assessments, and auditor communications to your internal team. If you lack in-house compliance expertise, you end up hiring an expensive third-party consulting firm. CertifyGRC provides software automation plus experienced compliance practitioners who write custom policies, close technical gaps, and defend your audit.",
  },
  {
    question: "Can our company easily migrate from Vanta or Drata to CertifyGRC?",
    answer:
      "Yes. Migrating to CertifyGRC is straightforward. We can ingest your existing evidence exports, policies, and cloud infrastructure connections within 48 hours. Our team maps your historical controls into CertifyGRC's unified engine, eliminating duplicated effort and preventing any interruption to your upcoming audit cycle.",
  },
  {
    question: "What compliance standards and frameworks does CertifyGRC support?",
    answer:
      "CertifyGRC supports NIST CSF 2.0, ISO/IEC 27001:2022, SOC 2 (Type I & Type II), PCI DSS 4.0, OSFI B-10 & B-13 (Canadian Financial Institutions), ISO 42001 (AI Management), NIST AI RMF, HIPAA, PIPEDA, CIS Controls, and COBIT.",
  },
];

interface FeatureRow {
  name: string;
  category: string;
  certifygrc: { status: "yes" | "partial" | "no"; text: string };
  vanta: { status: "yes" | "partial" | "no"; text: string };
  drata: { status: "yes" | "partial" | "no"; text: string };
}

const COMPARISON_FEATURES: FeatureRow[] = [
  // Frameworks
  {
    name: "NIST CSF 2.0 Native Alignment (All 6 Functions)",
    category: "Framework Coverage",
    certifygrc: { status: "yes", text: "Full native 106 subcategory mapping (Govern to Recover)" },
    vanta: { status: "partial", text: "Partial; retrofitted from SOC 2/ISO baseline" },
    drata: { status: "partial", text: "Partial; mapped from common control framework" },
  },
  {
    name: "SOC 2 Type I & II Automation",
    category: "Framework Coverage",
    certifygrc: { status: "yes", text: "Continuous evidence sync + auditor prep" },
    vanta: { status: "yes", text: "Continuous evidence polling" },
    drata: { status: "yes", text: "Continuous automated monitoring" },
  },
  {
    name: "ISO/IEC 27001:2022 Support",
    category: "Framework Coverage",
    certifygrc: { status: "yes", text: "Complete Annex A controls & ISMS documentation" },
    vanta: { status: "yes", text: "Supported with automated checks" },
    drata: { status: "yes", text: "Supported with automated checks" },
  },
  {
    name: "Canadian & Global Banking (OSFI B-10/B-13, PIPEDA)",
    category: "Framework Coverage",
    certifygrc: { status: "yes", text: "Native out-of-the-box regulatory support" },
    vanta: { status: "no", text: "Limited / US-centric tech focus" },
    drata: { status: "no", text: "Limited / US-centric tech focus" },
  },
  {
    name: "AI Risk Governance (ISO 42001 & NIST AI RMF)",
    category: "Framework Coverage",
    certifygrc: { status: "yes", text: "Dedicated AI risk & policy management" },
    vanta: { status: "partial", text: "Early beta / roadmap" },
    drata: { status: "partial", text: "Early beta / roadmap" },
  },

  // Advisory & Support
  {
    name: "Hands-on vCISO Advisory & Policy Writing",
    category: "Delivery & Advisory",
    certifygrc: { status: "yes", text: "Included hybrid model with certified practitioners" },
    vanta: { status: "no", text: "Tool only; requires external consulting partner" },
    drata: { status: "no", text: "Tool only; requires internal staff or partner firm" },
  },
  {
    name: "Audit Defense & Auditor Representation",
    category: "Delivery & Advisory",
    certifygrc: { status: "yes", text: "Experts sit in on auditor calls and validate evidence" },
    vanta: { status: "no", text: "Automated auditor portal only" },
    drata: { status: "no", text: "Auditor directory only; no direct defense" },
  },
  {
    name: "Custom Control Architecture & Tailoring",
    category: "Delivery & Advisory",
    certifygrc: { status: "yes", text: "Tailored to your specific tech stack and risk appetite" },
    vanta: { status: "partial", text: "Limited flexibility within rigid templates" },
    drata: { status: "partial", text: "Custom controls supported with manual setup" },
  },

  // Training & Workforce
  {
    name: "CyberDrill: Simulated Phishing & Tabletop Drills",
    category: "Workforce & Culture",
    certifygrc: { status: "yes", text: "Included natively with role-based exercises" },
    vanta: { status: "partial", text: "Extra cost add-on / 3rd-party integration" },
    drata: { status: "no", text: "Basic static videos only; no simulations" },
  },
  {
    name: "Employee Security Awareness Tracking",
    category: "Workforce & Culture",
    certifygrc: { status: "yes", text: "Real-time compliance dashboard & drill completion" },
    vanta: { status: "yes", text: "Basic completion tracking" },
    drata: { status: "yes", text: "Basic completion tracking" },
  },

  // Commercials & Technology
  {
    name: "Multi-Framework Deduplication ('Test Once, Comply Everywhere')",
    category: "Platform Architecture",
    certifygrc: { status: "yes", text: "Evidence maps simultaneously across all standards" },
    vanta: { status: "yes", text: "Available across select frameworks" },
    drata: { status: "yes", text: "Available across select frameworks" },
  },
  {
    name: "Contract Flexibility & Transparent Pricing",
    category: "Platform Architecture",
    certifygrc: { status: "yes", text: "Modular, transparent, no forced 3-year lock-in" },
    vanta: { status: "no", text: "Expensive annual upfront with high renewal markups" },
    drata: { status: "no", text: "High annual upfront with framework upsells" },
  },
];

interface ComparePageProps {
  defaultTab?: "overview" | "vanta" | "drata";
}

export default function ComparePage({ defaultTab = "overview" }: ComparePageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "vanta" | "drata">(defaultTab);

  useEffect(() => {
    if (location.pathname.includes("vanta")) {
      setActiveTab("vanta");
    } else if (location.pathname.includes("drata")) {
      setActiveTab("drata");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const seoTitle =
    activeTab === "vanta"
      ? "Best Vanta Alternative for NIST CSF 2.0 & Continuous GRC | CertifyGRC"
      : activeTab === "drata"
        ? "Best Drata Alternative for Enterprise Compliance & NIST | CertifyGRC"
        : "CertifyGRC vs. Vanta vs. Drata: 2026 Compliance Platform Comparison";

  const seoDescription =
    activeTab === "vanta"
      ? "Looking for an alternative to Vanta? Discover why organizations switch to CertifyGRC for comprehensive NIST CSF 2.0 coverage, hands-on vCISO advisory, and employee CyberDrills."
      : activeTab === "drata"
        ? "Compare CertifyGRC vs Drata. Discover how CertifyGRC combines automated evidence collection with expert human advisory and built-in tabletop simulations."
        : "Complete 2026 comparison between CertifyGRC, Vanta, and Drata. Evaluate NIST CSF 2.0 alignment, ISO 27001, SOC 2, pricing models, and hybrid advisory support.";

  const canonicalUrl =
    activeTab === "vanta"
      ? "https://certifygrc.com/compare/vanta-alternative"
      : activeTab === "drata"
        ? "https://certifygrc.com/compare/drata-alternative"
        : "https://certifygrc.com/compare";

  const compareSchemas = [
    createSoftwareApplicationSchema(),
    createCompetitorComparisonSchema({
      name: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      comparedTo: ["Vanta", "Drata"],
    }),
    createFAQSchema(COMPARE_FAQS),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Platform Comparison", url: "/compare" },
      ...(activeTab !== "overview"
        ? [{ name: activeTab === "vanta" ? "Vanta Alternative" : "Drata Alternative", url: canonicalUrl }]
        : []),
    ]),
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        jsonLd={compareSchemas}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/40 bg-background">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,hsl(var(--primary)/0.12),transparent_70%)]"
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
                <Sparkles className="h-3.5 w-3.5" /> 2026 Compliance Platform Evaluation
              </span>
            </motion.div>

            <motion.h1
              variants={revealUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]"
            >
              The Modern Alternative to{" "}
              <span className="gradient-text">Vanta &amp; Drata</span>
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Don't get stuck in the "shelfware trap." Discover why fast-growing technology companies and regulated
              enterprises choose CertifyGRC for comprehensive <strong>NIST CSF 2.0</strong>, <strong>ISO 27001</strong>,
              and <strong>SOC 2</strong> compliance — combining SaaS automation with hands-on vCISO advisory.
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
                <Link to="/contact">Schedule Advisory Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tabs */}
      <section className="py-8 bg-muted/20 border-b border-border/40">
        <div className="container-wide flex justify-center">
          <div className="inline-flex rounded-xl p-1 bg-card border border-border/70 shadow-sm max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                activeTab === "overview"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Full 3-Way Comparison
            </button>
            <button
              onClick={() => setActiveTab("vanta")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                activeTab === "vanta"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              CertifyGRC vs. Vanta
            </button>
            <button
              onClick={() => setActiveTab("drata")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                activeTab === "drata"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              CertifyGRC vs. Drata
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="section-padding container-wide">
        {/* Executive Highlights Grid */}
        <div className="mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Executive Summary</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              Why Companies Are Moving Away from Tool-Only Platforms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Native NIST CSF 2.0 Architecture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vanta and Drata were built originally for SOC 2 checklists. CertifyGRC is built around the latest NIST
                CSF 2.0 framework with deep coverage of the new <strong>Govern</strong> function, incident response,
                and continuous recovery.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Software + Advisory (Hybrid)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Software alone doesn't pass audits. When you buy Vanta or Drata, you still need someone to draft custom
                policies, conduct risk assessments, and talk to auditors. CertifyGRC provides expert vCISO advisory
                bundled right in.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">No Hidden Add-Ons or Lock-In</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Avoid surprise $10k+ invoices for additional frameworks, employee training, or auditor portal seats.
                CertifyGRC includes CyberDrill simulations, multi-framework deduplication, and dedicated practitioner support.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">In-Depth Matrix</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              Detailed Feature &amp; Capability Breakdown
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-sm">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-foreground">
                  <th className="py-4 px-6 w-2/5">Capability / Requirement</th>
                  <th className="py-4 px-4 w-1/5 bg-primary/10 text-primary font-bold">CertifyGRC</th>
                  <th className={cn("py-4 px-4 w-1/5", activeTab === "drata" ? "opacity-40" : "")}>Vanta</th>
                  <th className={cn("py-4 px-4 w-1/5", activeTab === "vanta" ? "opacity-40" : "")}>Drata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {COMPARISON_FEATURES.map((item, idx) => (
                  <tr
                    key={item.name}
                    className={cn(
                      "transition-colors hover:bg-muted/10",
                      idx % 2 === 0 ? "bg-card" : "bg-muted/5",
                    )}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.category}</div>
                    </td>

                    {/* CertifyGRC Column */}
                    <td className="py-4 px-4 bg-primary/[0.04]">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span className="text-xs font-semibold text-foreground">{item.certifygrc.text}</span>
                      </div>
                    </td>

                    {/* Vanta Column */}
                    <td className={cn("py-4 px-4", activeTab === "drata" ? "opacity-40" : "")}>
                      <div className="flex items-start gap-2">
                        {item.vanta.status === "yes" && <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />}
                        {item.vanta.status === "partial" && (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                        )}
                        {item.vanta.status === "no" && <X className="h-4 w-4 shrink-0 text-destructive mt-0.5" />}
                        <span className="text-xs text-muted-foreground">{item.vanta.text}</span>
                      </div>
                    </td>

                    {/* Drata Column */}
                    <td className={cn("py-4 px-4", activeTab === "vanta" ? "opacity-40" : "")}>
                      <div className="flex items-start gap-2">
                        {item.drata.status === "yes" && <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />}
                        {item.drata.status === "partial" && (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                        )}
                        {item.drata.status === "no" && <X className="h-4 w-4 shrink-0 text-destructive mt-0.5" />}
                        <span className="text-xs text-muted-foreground">{item.drata.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep Dive Section: Why Switch to CertifyGRC */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border border-border/70 bg-card p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Focused Comparison</span>
            <h3 className="text-2xl font-bold text-foreground mt-2 mb-4">Why Switch from Vanta?</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>The Vanta Challenge:</strong> Vanta is popular for tech startups pursuing their initial SOC 2.
                However, as organizations mature or enter regulated industries (like healthcare, finance, or enterprise B2B),
                they discover that Vanta is fundamentally a software monitoring tool. You are left on your own to write
                custom policies, map to NIST CSF 2.0, and handle auditor negotiations.
              </p>
              <p>
                <strong>The CertifyGRC Solution:</strong> CertifyGRC delivers a true partnership. Our certified
                compliance architects work alongside your team to draft policies, conduct risk assessments, and defend
                controls during the audit. Furthermore, we include native NIST CSF 2.0 governance and employee CyberDrill
                simulations at no extra fee.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border/50">
              <Button asChild variant="outline" className="w-full text-sm font-semibold rounded-xl">
                <Link to="/contact">Discuss a Vanta Migration</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Focused Comparison</span>
            <h3 className="text-2xl font-bold text-foreground mt-2 mb-4">Why Switch from Drata?</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>The Drata Challenge:</strong> Drata offers a slick UI for automated evidence collection, but
                customers frequently cite rigid workflow constraints, steep pricing upon renewal, and minimal support
                for non-standard enterprise frameworks like OSFI B-10/B-13, ISO 42001 (AI Governance), and deep NIST CSF 2.0
                governance profiles.
              </p>
              <p>
                <strong>The CertifyGRC Solution:</strong> CertifyGRC's unified control engine maps controls across
                multiple global standards simultaneously. You test once and comply everywhere. Plus, you get dedicated
                practitioner advisory to tailor controls specifically to your operating model rather than forcing you into
                cookie-cutter templates.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border/50">
              <Button asChild variant="outline" className="w-full text-sm font-semibold rounded-xl">
                <Link to="/contact">Discuss a Drata Migration</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 3-Step Migration Pathway */}
        <div className="mb-20 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-card to-background p-8 md:p-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Seamless Transition</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            How to Migrate to CertifyGRC in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10">
            Switching compliance platforms shouldn't mean starting from scratch. Our migration specialists handle the
            transition without disrupting your ongoing audit schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-xl border border-border/70 bg-card/80 p-6">
              <div className="text-2xl font-black text-primary mb-2">01</div>
              <h4 className="font-bold text-foreground mb-2">Evidence &amp; Policy Ingestion</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Export your current policies, evidence records, and framework mappings. Our team ingests and maps them
                into CertifyGRC within 48 hours.
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card/80 p-6">
              <div className="text-2xl font-black text-primary mb-2">02</div>
              <h4 className="font-bold text-foreground mb-2">NIST CSF 2.0 &amp; Gap Closure</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We perform an immediate delta analysis to identify unmonitored risks, map missing NIST CSF 2.0 Govern
                controls, and configure automated cloud integrations.
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card/80 p-6">
              <div className="text-2xl font-black text-primary mb-2">03</div>
              <h4 className="font-bold text-foreground mb-2">Continuous Peace of Mind</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Activate continuous monitoring, launch automated CyberDrills, and enter audit season with a dedicated
                advisory team defending your controls.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Common Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Everything you need to know about evaluating CertifyGRC alongside Vanta and Drata.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {COMPARE_FAQS.map((faq, i) => (
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

        {/* Closing CTA */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card to-card p-8 md:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            Ready for Smarter Compliance Without the Enterprise Bloat?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
            Take our free 2-minute NIST CSF 2.0 posture evaluation to see where your compliance gaps lie, or speak with
            one of our certified GRC architects today.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="glow-primary h-12 px-8 rounded-xl font-semibold text-sm">
              <Link to="/free-assessment">
                Start Free Posture Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-semibold text-sm border-border">
              <Link to="/contact">Schedule an Advisory Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
