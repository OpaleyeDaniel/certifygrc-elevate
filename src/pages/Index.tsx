import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import PillarsSection from "@/components/home/PillarsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import PlatformSection from "@/components/home/PlatformSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import FrameworksSection from "@/components/home/FrameworksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
import BookingModal from "@/components/BookingModal";
import InteractiveDashboard from "@/components/InteractiveDashboard";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      <HeroSection onBookDemo={() => setDemoOpen(true)} onBookConsultation={() => setConsultOpen(true)} />
      <TrustBar />
      <PillarsSection />

      {/* Interactive Dashboard Preview */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              badge="Platform Preview"
              title="Experience the Dashboard"
              description="Interact with our compliance dashboard — explore real-time compliance tracking, risk monitoring, and audit management."
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <InteractiveDashboard />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WhyChooseSection />
      <PlatformSection />
      <ServicesPreview />
      <FrameworksSection />
      <FeaturesSection />
      <IndustriesSection />
      <PricingSection />
      <CTASection onBookDemo={() => setDemoOpen(true)} onBookConsultation={() => setConsultOpen(true)} />
      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
      <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
    </>
  );
};

export default Index;
