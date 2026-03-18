import { Landmark, Heart, Monitor, Banknote, Factory, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

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
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <SectionHeading
          badge="Industries"
          title="Purpose-Built for Regulated Sectors"
          description="Tailored GRC solutions for the industries that need them most."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className="group glass rounded-xl p-6 text-center hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <industry.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-medium text-sm text-foreground">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
