import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FrameworksSection from "@/components/home/FrameworksSection";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ApplicationFrameworksSections from "@/components/marketing/ApplicationFrameworksSections";
import ScrollReveal from "@/components/ScrollReveal";

export default function FrameworksPage() {
  return (
    <>
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

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground tracking-tight leading-[1.05]">
          Compliance and Privacy Frameworks, <span className="gradient-text">Automated</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          CertifyGRC Software offers a robust suite of industry-leading compliance frameworks—mapped to controls, evidence, and audit-ready workflows.
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

      <ScrollReveal>
        <FrameworksSection />
      </ScrollReveal>
    </>
  );
}
