import { GraduationCap, Shield, Brain, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ScrollReveal from "@/components/ScrollReveal";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";

const categories = [
  {
    icon: Shield,
    title: "ISO & Standards Training",
    courses: ["ISO 27001 Lead Implementer", "ISO 27001 Lead Auditor", "ISO 22301 Foundation", "ISO 20000 Practitioner"],
    accent: "#6366f1",
  },
  {
    icon: Brain,
    title: "Cybersecurity Programs",
    courses: ["NIST CSF Implementation", "SOC 2 Readiness", "PCI DSS Compliance", "Incident Response Planning"],
    accent: "#8b5cf6",
  },
  {
    icon: BookOpen,
    title: "Governance & Risk",
    courses: ["COBIT 2019 Foundation", "Enterprise Risk Management", "IT Governance Essentials", "Regulatory Compliance"],
    accent: "#06b6d4",
  },
  {
    icon: GraduationCap,
    title: "AI & Emerging Tech",
    courses: ["AI Governance Fundamentals", "NIST AI RMF Workshop", "Responsible AI Practices", "Data Ethics"],
    accent: "#10b981",
  },
];

export default function CyberAwarePage() {
  return (
    <>
      <PageHero
        backgroundUrl={heroImagery.eLearning.background}
        foregroundUrl={heroImagery.eLearning.foreground}
        foregroundAlt={heroImagery.eLearning.foregroundAlt}
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
          E-Learning
        </span>
        <h1 className="font-display font-bold text-display-lg md:text-display-xl text-foreground tracking-tight">
          Elevate Your <span className="gradient-text">GRC Expertise</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Professional development programs designed to build GRC competency across your entire organization from foundational to advanced.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent border border-accent/20 w-fit transition-transform duration-300 hover:-translate-y-0.5">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Full Course Catalog Coming Soon</span>
        </div>
      </PageHero>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading badge="Course Catalog" title="Learning Paths" description="Structured programs across four key domains of GRC excellence." />
            <PremiumCardGrid className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <PremiumCard key={cat.title} accent={cat.accent} padding="lg" interactive={false}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accent}18, ${cat.accent}08)`,
                      border: `1px solid ${cat.accent}28`,
                    }}
                  >
                    <cat.icon className="w-6 h-6" style={{ color: cat.accent }} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4">{cat.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {cat.courses.map((course) => (
                      <li key={course} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${cat.accent}99` }} />
                        {course}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-primary/30" disabled>
                    Coming Soon
                  </Button>
                </PremiumCard>
              ))}
            </PremiumCardGrid>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={120}>
        <section className="section-padding bg-muted/20">
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Get Early Access
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Be among the first to access our comprehensive GRC training programs. Sign up for notifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="h-12" />
              <Button className="w-full sm:w-auto glow-primary px-8 whitespace-nowrap">
                Notify Me
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
