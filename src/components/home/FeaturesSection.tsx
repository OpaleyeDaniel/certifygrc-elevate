import {
  Workflow, BarChart3, ClipboardCheck, FileText,
  Sparkles, Plug, ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Workflow, title: "Automated Compliance Workflows", description: "Streamline compliance processes with automated task assignments, reminders, and evidence collection." },
  { icon: BarChart3, title: "Real-Time Risk Insights", description: "Continuous risk monitoring with dynamic heat maps, trend analysis, and predictive indicators." },
  { icon: ClipboardCheck, title: "Audit Management System", description: "End-to-end audit lifecycle management from planning to reporting with full traceability." },
  { icon: FileText, title: "Policy & Control Management", description: "Centralized policy repository with version control, approval workflows, and control mapping." },
  { icon: Sparkles, title: "AI-Powered Recommendations", description: "Intelligent suggestions for control improvements, gap remediation, and compliance optimization." },
  { icon: Plug, title: "Integration Ready APIs", description: "Connect with your existing tools — SIEM, ITSM, HR systems, and cloud infrastructure providers." },
  { icon: ShieldCheck, title: "Role-Based Access Control", description: "Granular permissions ensuring the right people access the right data at the right time." },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="Platform Features"
            title="Built for Enterprise Compliance"
            description="Every feature designed to reduce manual effort and accelerate your path to compliance."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.08}>
              <div className="group h-full glass rounded-xl p-6 hover-lift glow-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
