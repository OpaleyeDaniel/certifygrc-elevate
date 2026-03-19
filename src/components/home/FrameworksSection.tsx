import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, FileCheck, Lock, CreditCard, Settings, Brain, Server, RefreshCw, Cpu, Eye } from "lucide-react";

const frameworks = [
  { name: "NIST CSF", description: "Cybersecurity Framework for critical infrastructure protection", icon: Shield },
  { name: "ISO 27001", description: "International standard for information security management", icon: Lock },
  { name: "SOC 2", description: "Service organization controls for trust and security", icon: FileCheck },
  { name: "PCI DSS", description: "Payment card industry data security standard", icon: CreditCard },
  { name: "COBIT", description: "IT governance and management framework", icon: Settings },
  { name: "NIST AI RMF", description: "Risk management framework for artificial intelligence", icon: Brain },
  { name: "ISO 20000", description: "IT service management system standard", icon: Server },
  { name: "ISO 22301", description: "Business continuity management standard", icon: RefreshCw },
  { name: "ISO 42001", description: "AI management system standard", icon: Cpu },
  { name: "PIPEDA", description: "Canadian privacy legislation framework", icon: Eye },
];

export default function FrameworksSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="Compliance Frameworks"
            title="Framework Coverage"
            description="Comprehensive support across the most critical governance and compliance standards."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {frameworks.map((fw, index) => (
            <ScrollReveal key={fw.name} delay={index * 0.05}>
              <div className="group relative glass rounded-xl p-5 text-center hover-lift hover-glow cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <fw.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground block">
                  {fw.name}
                </span>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {fw.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
