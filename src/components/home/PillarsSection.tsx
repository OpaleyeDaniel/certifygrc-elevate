import { Monitor, Users, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const pillars = [
  {
    icon: Monitor,
    title: "Software Application",
    description:
      "A structured, audit-ready platform for compliance, controls, and evidence - no spreadsheets, no guesswork.",
    link: "/software",
    features: ["Framework automation", "Evidence mapping", "Executive reporting"],
    featured: true,
    label: "Core Product",
  },
  {
    icon: Users,
    title: "Consulting Services",
    description:
      "Operational resilience and regulatory programs delivered with practical execution and audit-ready outcomes.",
    link: "/consulting",
    features: ["OSFI & Canada focus", "BCM & cyber", "Privacy & AI governance"],
    featured: false,
    label: "Advisory",
  },
  {
    icon: GraduationCap,
    title: "Cyber Aware",
    description:
      "Strengthen security culture, reduce human risk, and equip teams with real-world defensive skills.",
    link: "/cyber-aware",
    features: ["Security awareness", "Phishing simulation", "Human risk management"],
    featured: false,
    label: "Training",
  },
];

export default function PillarsSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Our Ecosystem"
          title="Software, consulting, and learning together"
          description="Technology enabled GRC with advisory depth and professional development under one roof."
        />

        <PremiumCardGrid className="grid md:grid-cols-3 gap-4 md:gap-5">
          {pillars.map((pillar) => (
            <PremiumCard
              key={pillar.title}
              to={pillar.link}
              featured={pillar.featured}
              padding="lg"
            >
              {pillar.featured && (
                <div className="absolute top-5 right-5 z-20">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/30 text-primary">
                    <Sparkles className="h-2.5 w-2.5" />
                    {pillar.label}
                  </span>
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                  border: `1px solid ${BRAND_PRIMARY}28`,
                }}
              >
                <pillar.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
              </div>

              <h3 className="font-display font-bold text-[1.2rem] leading-snug text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {pillar.features.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/8 border border-primary/20 text-primary"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200 group-hover:gap-2.5 mt-auto">
                Learn more
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
