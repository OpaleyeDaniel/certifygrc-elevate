import { Monitor, Users, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const pillars = [
  {
    icon: Monitor,
    title: "Software Platform",
    description: "Real-time compliance tracking, risk monitoring, and audit automation in a single, intelligent dashboard.",
    link: "/software",
    features: ["Compliance Tracking", "Risk Monitoring", "Audit Automation"],
  },
  {
    icon: Users,
    title: "Consulting Services",
    description: "Framework-agnostic advisory from certified GRC professionals across 10+ specialized domains.",
    link: "/consulting",
    features: ["ISO 27001", "SOC 2", "NIST CSF"],
  },
  {
    icon: GraduationCap,
    title: "E-Learning",
    description: "Professional development and certification programs to build GRC competency across your organization.",
    link: "/e-learning",
    features: ["Certification Prep", "Custom Training", "On-Demand"],
  },
];

export default function PillarsSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Our Ecosystem"
          title="Three Pillars of GRC Excellence"
          description="An integrated approach to governance, risk, and compliance that combines technology, expertise, and education."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <Link
              key={pillar.title}
              to={pillar.link}
              className="group glass rounded-2xl p-8 hover-lift hover-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pillar.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {pillar.features.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground border border-border/50">
                    {f}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
