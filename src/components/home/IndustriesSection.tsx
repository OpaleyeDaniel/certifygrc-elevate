import { Landmark, Heart, Monitor, Banknote, Factory, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const industries = [
  { icon: Landmark, name: "Government" },
  { icon: Heart, name: "Healthcare" },
  { icon: Monitor, name: "IT & Cybersecurity" },
  { icon: Banknote, name: "Finance & Banking" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Users, name: "SMEs" },
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
            <PremiumCard key={industry.name} padding="sm" className="text-center">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                  border: `1px solid ${BRAND_PRIMARY}28`,
                }}
              >
                <industry.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-medium text-xs text-foreground">{industry.name}</h3>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
