import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Starter",
    description: "For small teams beginning their compliance journey",
    features: ["Up to 5 users", "Single framework support", "Basic risk register", "Policy management", "Email support"],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For growing organizations scaling compliance",
    features: ["Up to 25 users", "Multi-framework support", "Advanced risk analytics", "Audit management", "API integrations", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    features: ["Unlimited users", "All frameworks included", "AI-powered recommendations", "Custom workflows", "SSO & RBAC", "Dedicated CSM", "On-premise option"],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading badge="Pricing" title="Plans for Every Stage" description="Flexible pricing designed to scale with your compliance needs." />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.12}>
              <div className={`rounded-2xl p-8 h-full ${
                plan.highlighted
                  ? "glass glow-border relative ring-2 ring-primary/30"
                  : "glass"
              }`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-display font-bold text-3xl text-primary">Coming Soon</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.highlighted ? "glow-primary" : ""}`} variant={plan.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
