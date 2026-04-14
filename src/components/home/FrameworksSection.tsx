import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

const frameworks = [
  {
    name: "COBIT",
    image: "/framework-marquee/01.png",
    description: "IT governance & management framework",
  },
  {
    name: "ISO 42001",
    image: "/framework-marquee/02.png",
    description: "AI Management System Standard (AIMS)",
  },
  { 
    name: "ISO 22301",
    image: "/framework-marquee/03.png",
    description: "Business Continuity Management System",
  },
  {
    name: "ISO 20000",
    image: "/framework-marquee/04.png",
    description: "IT Service Management System Standard",
  },
  {
    name: "ISO 27001",
    image: "/framework-marquee/05.png",
    description: "Information Security Management System (ISMS)",
  },
  {
    name: "SOC 2",
    image: "/framework-marquee/06.png",
    description: "Service organization controls for trust & security",
  },
  {
    name: "PIPEDA",
    image: "/framework-marquee/07.png",
    description: "Privacy protection standards for organizations",
  },
  {
    name: "PCI DSS",
    image: "/framework-marquee/08.png",
    description: "Payment Card Industry Data Security Standard",
  },
  {
    name: "NIST CSF",
    image: "/framework-marquee/09.png",
    description: "Cybersecurity Framework for critical infrastructure protection",
  },
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
            <ScrollReveal key={fw.name} delayMs={index * 50}>
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
