import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import PillarsSection from "@/components/home/PillarsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FrameworksSection from "@/components/home/FrameworksSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      <HeroSection onBookDemo={() => setDemoOpen(true)} onBookConsultation={() => setConsultOpen(true)} />
      <TrustBar />
      <PillarsSection />
      <FeaturesSection />
      <ServicesPreview />
      <FrameworksSection />
      <WhyChooseSection />
      <IndustriesSection />
      <PricingSection />
      <CTASection onBookDemo={() => setDemoOpen(true)} onBookConsultation={() => setConsultOpen(true)} />
      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
      <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
    </>
  );
};

export default Index;
