import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onBookDemo: () => void;
  onBookConsultation: () => void;
}

export default function CTASection({ onBookDemo, onBookConsultation }: CTASectionProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-narrow relative z-10 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-6">
          Ready to simplify your{" "}
          <span className="gradient-text">compliance?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Join organizations that trust CertifyGRC to navigate the complexities of governance, risk, and compliance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={onBookDemo} className="glow-primary text-base px-8">
            Book a Demo
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={onBookConsultation} className="border-primary/30 hover:border-primary text-base px-8">
            Book Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
