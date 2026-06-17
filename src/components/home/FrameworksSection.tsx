import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";

const ACCENTS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#14b8a6", "#a855f7"];

const frameworks = [
  { name: "COBIT", image: "/framework-marquee/01.png", description: "IT governance & management framework" },
  { name: "ISO 42001", image: "/framework-marquee/02.png", description: "AI Management System Standard (AIMS)" },
  { name: "ISO 22301", image: "/framework-marquee/03.png", description: "Business Continuity Management System" },
  { name: "ISO 20000", image: "/framework-marquee/04.png", description: "IT Service Management System Standard" },
  { name: "ISO 27001", image: "/framework-marquee/05.png", description: "Information Security Management System" },
  { name: "SOC 2", image: "/framework-marquee/06.png", description: "Service organization controls for trust & security" },
  { name: "PIPEDA", image: "/framework-marquee/07.png", description: "Privacy protection standards for organizations" },
  { name: "PCI DSS", image: "/framework-marquee/08.png", description: "Payment Card Industry Data Security Standard" },
  { name: "NIST CSF", image: "/framework-marquee/09.png", description: "Cybersecurity Framework for critical infrastructure" },
];

export default function FrameworksSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Compliance Frameworks"
          title="Comprehensive framework coverage"
          description="Support across the most critical governance and compliance standards — built into the platform from day one."
        />

        <div className="relative overflow-hidden mask-fade mb-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 z-10 bg-gradient-to-l from-background to-transparent" />
          <div className="flex gap-6 motion-safe:animate-scroll w-max items-center">
            {[...frameworks, ...frameworks].map((fw, index) => (
              <div
                key={`${fw.name}-${index}`}
                className="group flex-shrink-0 flex flex-col items-center gap-2.5 cursor-pointer min-w-[120px]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-2.5 flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ background: "linear-gradient(145deg, hsl(220,42%,11%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-display font-semibold text-[10px] text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center">
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <PremiumCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 max-w-4xl mx-auto">
          {frameworks.map((fw, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <PremiumCard key={fw.name} accent={accent} padding="sm" contentClassName="flex flex-row items-start gap-4">
                <div
                  className="w-12 h-12 flex-shrink-0 rounded-xl p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
                    border: `1px solid ${accent}25`,
                  }}
                >
                  <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-display font-semibold text-sm text-foreground block group-hover:text-primary transition-colors">
                    {fw.name}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{fw.description}</p>
                </div>
              </PremiumCard>
            );
          })}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
