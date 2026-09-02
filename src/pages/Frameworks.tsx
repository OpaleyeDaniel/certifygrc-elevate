import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FrameworksSection from "@/components/home/FrameworksSection";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ApplicationFrameworksSections from "@/components/marketing/ApplicationFrameworksSections";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/seo/SEO";
import { createBreadcrumbSchema, createSoftwareApplicationSchema } from "@/lib/schemaOrg";

export default function FrameworksPage() {
  const frameworkSchemas = [
    createSoftwareApplicationSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Supported Frameworks", url: "/frameworks" },
    ]),
  ];

  return (
    <>
      <SEO
        title="Supported Compliance Frameworks & Standards"
        description="Explore supported GRC frameworks: NIST CSF 2.0, ISO 27001, SOC 2, HIPAA, GDPR, PCI DSS, and CIS Controls. Unified control mapping for faster multi-framework audits."
        canonical="https://certifygrc.com/frameworks"
        jsonLd={frameworkSchemas}
      />
      <PageHero
        backgroundUrl={heroImagery.frameworks.background}
        foregroundUrl={heroImagery.frameworks.foreground}
        foregroundAlt={heroImagery.frameworks.foregroundAlt}
        overlay="strong"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">Frameworks</span>
        </div>

        <h1 className="font-display font-bold text-display-lg md:text-display-xl text-foreground tracking-tight">
          Compliance and Privacy Frameworks, <span className="gradient-text">Automated</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          CertifyGRC Software offers a robust suite of industry leading compliance frameworks mapped to controls, evidence, and audit ready workflows.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Button asChild size="lg" className="glow-primary text-base px-8 transition-transform duration-300 hover:-translate-y-0.5">
            <Link to="/contact">
              Talk with an Advisor <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary text-base px-8">
            <Link to="/software">Explore Application</Link>
          </Button>
        </div>
      </PageHero>

      <ApplicationFrameworksSections showCtas />

      <div className="container-wide py-8">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Vanta &amp; Drata Alternative</span>
            <h3 className="text-xl font-bold text-foreground">Evaluating Compliance Automation Platforms?</h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              See how CertifyGRC's native NIST CSF 2.0 mapping, hybrid vCISO advisory, and employee CyberDrills outshine tool-only alternatives.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button asChild className="glow-primary text-sm font-semibold rounded-xl">
              <Link to="/compare">
                Compare Platforms <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-sm font-semibold rounded-xl border-border">
              <Link to="/compare/vanta-alternative">Vanta Alternative</Link>
            </Button>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <FrameworksSection />
      </ScrollReveal>
    </>
  );
}
