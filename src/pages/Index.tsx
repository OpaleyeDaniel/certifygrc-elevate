import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import PillarsSection from "@/components/home/PillarsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FrameworksSection from "@/components/home/FrameworksSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import CTASection from "@/components/home/CTASection";
import ConsultingResilienceSection from "@/components/home/ConsultingResilienceSection";
import PlatformSection from "@/components/home/PlatformSection";

/**
 * Each section manages its own scroll-reveal via framer-motion `whileInView`.
 * No outer ScrollReveal wrapper — that caused all sections to fade as one unit,
 * masking the internal stagger animations.
 */
const Index = () => (
  <>
    <HeroSection />
    <TrustBar />
    <PillarsSection />
    <ConsultingResilienceSection />
    <PlatformSection />
    <FeaturesSection />
    <ServicesPreview />
    <FrameworksSection />
    <WhyChooseSection />
    <IndustriesSection />
    <CTASection />
  </>
);

export default Index;
