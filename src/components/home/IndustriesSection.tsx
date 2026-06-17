import { motion } from "framer-motion";
import { Landmark, Heart, Monitor, Banknote, Factory, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";

const industries = [
  { icon: Landmark, name: "Government", accent: "#6366f1" },
  { icon: Heart, name: "Healthcare", accent: "#ec4899" },
  { icon: Monitor, name: "IT & Cybersecurity", accent: "#3b82f6" },
  { icon: Banknote, name: "Finance & Banking", accent: "#10b981" },
  { icon: Factory, name: "Manufacturing", accent: "#f59e0b" },
  { icon: Users, name: "SMEs", accent: "#8b5cf6" },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Industries"
          title="Purpose-built for regulated sectors"
          description="Tailored GRC solutions for the industries that need them most."
        />

        <PremiumCardGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-3.5">
          {industries.map((industry) => (
            <PremiumCard key={industry.name} accent={industry.accent} padding="sm" className="text-center">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${industry.accent}18, ${industry.accent}08)`,
                  border: `1px solid ${industry.accent}28`,
                }}
              >
                <industry.icon className="w-5 h-5" style={{ color: industry.accent }} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-medium text-xs text-foreground">{industry.name}</h3>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
