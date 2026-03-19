import { Landmark, Heart, Monitor, Banknote, Factory, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const industries = [
  { icon: Landmark, name: "Government", desc: "Federal & municipal compliance" },
  { icon: Heart, name: "Healthcare", desc: "HIPAA & patient data" },
  { icon: Monitor, name: "IT & Cybersecurity", desc: "SOC 2, ISO, NIST" },
  { icon: Banknote, name: "Finance & Banking", desc: "OSFI & PCI compliance" },
  { icon: Factory, name: "Manufacturing", desc: "Supply chain security" },
  { icon: Users, name: "SMEs", desc: "Scalable GRC solutions" },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading badge="Industries" title="Purpose-Built for Regulated Sectors" description="Tailored GRC solutions for the industries that need them most." />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <ScrollReveal key={industry.name} delay={index * 0.06}>
              <div className="group glass rounded-xl p-6 text-center hover-lift h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <industry.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-medium text-sm text-foreground">{industry.name}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{industry.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
