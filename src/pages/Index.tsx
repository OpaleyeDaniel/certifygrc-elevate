import HeroSection from "@/components/home/HeroSection";
import FrameworkCrossBanner from "@/components/home/FrameworkCrossBanner";
import PillarsSection from "@/components/home/PillarsSection";
import NistCsfSection from "@/components/home/NistCsfSection";
import SecurityPostureQuizSection from "@/components/home/SecurityPostureQuizSection";
import LiveDemoSection from "@/components/marketing/LiveDemoSection";
import WhyCertifyGrcSection from "@/components/home/WhyCertifyGrcSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FrameworksSection from "@/components/home/FrameworksSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ClientTestimonialsSection from "@/components/home/ClientTestimonialsSection";
import WaitlistSection from "@/components/marketing/WaitlistSection";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/**
 * Each section manages its own scroll-reveal via framer-motion `whileInView`.
 * No outer ScrollReveal wrapper — that caused all sections to fade as one unit,
 * masking the internal stagger animations.
 */
const Index = () => {
  useSectionScroll();

  return (
  <>
    <HeroSection />
    <FrameworkCrossBanner />
    <PillarsSection />
    <NistCsfSection />
    <SecurityPostureQuizSection />
    <WhyCertifyGrcSection />
    <FeaturesSection />
    <LiveDemoSection />
    <ServicesPreview />
    <FrameworksSection />
    <IndustriesSection />
    <ClientTestimonialsSection />
    <WaitlistSection source="landing" />
  </>
  );
};

export default Index;
