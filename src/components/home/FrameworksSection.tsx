import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

import soc2 from "@/assets/frameworks/soc2.png";
import pciDss from "@/assets/frameworks/pci-dss.png";
import nistCsf from "@/assets/frameworks/nist-csf.png";
import nistAiRmf from "@/assets/frameworks/nist-ai-rmf.png";
import cobit from "@/assets/frameworks/cobit.png";
import iso42001 from "@/assets/frameworks/iso-42001.png";
import iso22301 from "@/assets/frameworks/iso-22301.png";
import iso20000 from "@/assets/frameworks/iso-20000.png";
import iso27001 from "@/assets/frameworks/iso-27001.png";

const frameworks = [
  { name: "NIST CSF", image: nistCsf, description: "Cybersecurity Framework for critical infrastructure protection" },
  { name: "ISO 27001", image: iso27001, description: "Information Security Management System (ISMS)" },
  { name: "SOC 2", image: soc2, description: "Service organization controls for trust & security" },
  { name: "PCI DSS", image: pciDss, description: "Payment Card Industry Data Security Standard" },
  { name: "COBIT", image: cobit, description: "IT governance & management framework" },
  { name: "NIST AI RMF", image: nistAiRmf, description: "Risk management framework for AI systems" },
  { name: "ISO 20000", image: iso20000, description: "IT Service Management System Standard" },
  { name: "ISO 22301", image: iso22301, description: "Business Continuity Management System" },
  { name: "ISO 42001", image: iso42001, description: "AI Management System Standard (AIMS)" },
];

export default function FrameworksSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="Compliance Frameworks"
            title="Framework Coverage"
            description="Live from your compliance program — comprehensive support across the most critical governance and compliance standards."
          />
        </ScrollReveal>

        {/* Scrolling badge carousel */}
        <div className="relative overflow-hidden mask-fade mb-16">
          <div className="flex gap-8 animate-scroll items-center">
            {[...frameworks, ...frameworks].map((fw, index) => (
              <div
                key={`${fw.name}-${index}`}
                className="group flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer min-w-[140px]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl glass p-2 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
                  <img
                    src={fw.image}
                    alt={fw.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-display font-semibold text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center">
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Static grid with descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {frameworks.map((fw, index) => (
            <ScrollReveal key={fw.name} delay={index * 0.05}>
              <div className="group glass rounded-xl p-6 hover-lift hover-glow cursor-pointer flex items-start gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-background/50 p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={fw.image} alt={fw.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-display font-semibold text-sm text-foreground block group-hover:text-primary transition-colors">
                    {fw.name}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {fw.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
