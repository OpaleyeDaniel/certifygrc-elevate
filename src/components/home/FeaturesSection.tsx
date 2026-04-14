import { motion } from "framer-motion";
import {
  Workflow, BarChart3, ClipboardCheck, FileText,
  Sparkles, Plug, ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { staggerFast, revealUp, cardHover, scrollViewport } from "@/lib/motion";

const features = [
  {
    icon: Workflow,
    title: "Automated Compliance Workflows",
    description: "Streamline compliance processes with automated task assignments, reminders, and evidence collection.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Risk Insights",
    description: "Continuous risk monitoring with dynamic heat maps, trend analysis, and predictive indicators.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit Management System",
    description: "End-to-end audit lifecycle management from planning to reporting with full traceability.",
  },
  {
    icon: FileText,
    title: "Policy & Control Management",
    description: "Centralized policy repository with version control, approval workflows, and control mapping.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Intelligent suggestions for control improvements, gap remediation, and compliance optimization.",
  },
  {
    icon: Plug,
    title: "Integration Ready APIs",
    description: "Connect with your existing tools — SIEM, ITSM, HR systems, and cloud infrastructure providers.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description: "Granular permissions ensuring the right people access the right data at the right time.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <SectionHeading
          badge="Platform Features"
          title="Built for Enterprise Compliance"
          description="Every feature designed to reduce manual effort and accelerate your path to compliance."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={revealUp}
              whileHover={cardHover}
              className="group glass rounded-xl p-6 glow-border cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
