import { GraduationCap, Shield, Brain, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const categories = [
  { icon: Shield, title: "ISO & Standards Training", courses: ["ISO 27001 Lead Implementer", "ISO 27001 Lead Auditor", "ISO 22301 Foundation", "ISO 20000 Practitioner"] },
  { icon: Brain, title: "Cybersecurity Programs", courses: ["NIST CSF Implementation", "SOC 2 Readiness", "PCI DSS Compliance", "Incident Response Planning"] },
  { icon: BookOpen, title: "Governance & Risk", courses: ["COBIT 2019 Foundation", "Enterprise Risk Management", "IT Governance Essentials", "Regulatory Compliance"] },
  { icon: GraduationCap, title: "AI & Emerging Tech", courses: ["AI Governance Fundamentals", "NIST AI RMF Workshop", "Responsible AI Practices", "Data Ethics"] },
];

export default function ELearningPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="container-wide relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
            E-Learning
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
            Elevate Your <span className="gradient-text">GRC Expertise</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional development programs designed to build GRC competency across your entire organization — from foundational to advanced.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent border border-accent/20">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Full Course Catalog Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading badge="Course Catalog" title="Learning Paths" description="Structured programs across four key domains of GRC excellence." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 hover-lift glow-border h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4">{cat.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {cat.courses.map((course) => (
                      <li key={course} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {course}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-primary/30" disabled>
                    Coming Soon
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/20">
        <ScrollReveal>
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Get Early Access
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Be among the first to access our comprehensive GRC training programs. Sign up for notifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="w-full sm:w-auto glow-primary px-8 whitespace-nowrap">
                Notify Me
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
