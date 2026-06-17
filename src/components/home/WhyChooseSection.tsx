import { Rocket, Building, Compass, Layers, Target, Lightbulb } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";

const reasons = [
  { icon: Rocket, title: "Execution-First Delivery", description: "We don't just advise — we implement. Practical outcomes, not theoretical frameworks.", accent: "#6366f1" },
  { icon: Building, title: "Built for Regulated Industries", description: "Deep domain expertise in finance, healthcare, government, and critical infrastructure.", accent: "#8b5cf6" },
  { icon: Compass, title: "Framework Agnostic, Risk Driven", description: "We adapt to your regulatory landscape rather than forcing a single framework approach.", accent: "#06b6d4" },
  { icon: Layers, title: "Consulting + SaaS Advantage", description: "Unique combination of expert advisory and a purpose-built technology platform.", accent: "#10b981" },
  { icon: Target, title: "Business-Aligned Governance", description: "GRC strategies that support business objectives, not just check compliance boxes.", accent: "#f59e0b" },
  { icon: Lightbulb, title: "Future-Ready by Design", description: "AI governance, emerging regulations, and evolving threats — we stay ahead so you can too.", accent: "#ec4899" },
];

export default function WhyChooseSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Why CertifyGRC"
          title="The CertifyGRC advantage"
          description="What sets us apart in a crowded GRC landscape."
        />

        <PremiumCardGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
          {reasons.map((reason) => (
            <PremiumCard key={reason.title} accent={reason.accent} padding="md">
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${reason.accent}18, ${reason.accent}08)`,
                    border: `1px solid ${reason.accent}28`,
                  }}
                >
                  <reason.icon className="w-5 h-5" style={{ color: reason.accent }} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">{reason.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
