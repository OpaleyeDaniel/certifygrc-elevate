import HeroSection from "@/components/home/HeroSection";
import FrameworkCrossBanner from "@/components/home/FrameworkCrossBanner";
import PillarsSection from "@/components/home/PillarsSection";
import NistCsfSection from "@/components/home/NistCsfSection";
import LiveDemoSection from "@/components/marketing/LiveDemoSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SecurityPostureQuizSection from "@/components/home/SecurityPostureQuizSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FrameworksSection from "@/components/home/FrameworksSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import CTASection from "@/components/home/CTASection";
import WhyCertifyGrcSection from "@/components/home/WhyCertifyGrcSection";
import WaitlistSection from "@/components/marketing/WaitlistSection";

/**
 * Each section manages its own scroll-reveal via framer-motion `whileInView`.
 * No outer ScrollReveal wrapper — that caused all sections to fade as one unit,
 * masking the internal stagger animations.
 */
const Index = () => (
  <>
    <HeroSection />
    <FrameworkCrossBanner />
    <PillarsSection />
    <NistCsfSection />
    <LiveDemoSection />
    <WhyCertifyGrcSection />
    <FeaturesSection />
    <SecurityPostureQuizSection />
    <ServicesPreview />
    <FrameworksSection />
    <IndustriesSection />
    <WaitlistSection source="landing" />
    <CTASection />
  </>
);

export default Index;
