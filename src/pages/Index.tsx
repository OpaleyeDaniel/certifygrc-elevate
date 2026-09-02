import HeroSection from "@/components/home/HeroSection";
import FrameworkCrossBanner from "@/components/home/FrameworkCrossBanner";
import PillarsSection from "@/components/home/PillarsSection";
import NistCsfSection from "@/components/home/NistCsfSection";
import SecurityPostureQuizSection from "@/components/home/SecurityPostureQuizSection";
import LiveDemoSection from "@/components/marketing/LiveDemoSection";
import WhyCertifyGrcSection from "@/components/home/WhyCertifyGrcSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FrameworksSection from "@/components/home/FrameworksSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ClientTestimonialsSection from "@/components/home/ClientTestimonialsSection";
import FAQSection, { HOMEPAGE_FAQS } from "@/components/home/FAQSection";
import WaitlistSection from "@/components/marketing/WaitlistSection";
import SEO from "@/components/seo/SEO";
import {
  createOrganizationSchema,
  createWebSiteSchema,
  createSoftwareApplicationSchema,
  createFAQSchema,
} from "@/lib/schemaOrg";
import { useLocation } from "react-router-dom";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/**
 * Each section manages its own scroll-reveal via framer-motion `whileInView`.
 * No outer ScrollReveal wrapper — that caused all sections to fade as one unit,
 * masking the internal stagger animations.
 */
const Index = () => {
  useSectionScroll();
  const location = useLocation();
  const isFreeAssessment = location.pathname === "/free-assessment";

  const homeSchemas = [
    createOrganizationSchema(),
    createWebSiteSchema(),
    createSoftwareApplicationSchema(),
    createFAQSchema(HOMEPAGE_FAQS),
  ];

  const seoTitle = isFreeAssessment
    ? "Free NIST CSF 2.0 Security Posture Assessment | CertifyGRC"
    : "CertifyGRC | Smarter Governance, Risk & Compliance Platform";
  const seoDescription = isFreeAssessment
    ? "Take our free 2-minute NIST CSF 2.0 cybersecurity posture quiz. Assess maturity across Govern, Identify, Protect, Detect, Respond, and Recover with instant scoring."
    : "Simplify compliance, automate risk management, and accelerate audit readiness with CertifyGRC. Aligned with NIST CSF 2.0, ISO 27001, SOC 2, and more.";
  const canonicalUrl = isFreeAssessment
    ? "https://certifygrc.com/free-assessment"
    : "https://certifygrc.com";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        jsonLd={homeSchemas}
      />
      <HeroSection />
      <FrameworkCrossBanner />
      <PillarsSection />
      <NistCsfSection />
      <SecurityPostureQuizSection />
      <WhyCertifyGrcSection />
      <FeaturesSection />
      <LiveDemoSection />
      <FrameworksSection />
      <IndustriesSection />
      <ClientTestimonialsSection />
      <FAQSection />
      <WaitlistSection source="landing" />
    </>
  );
};

export default Index;
