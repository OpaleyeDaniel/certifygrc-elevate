import { motion } from "framer-motion";
import { Rocket, Building, Compass, Layers, Target, Lightbulb } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { staggerContainer, revealUp, slideInLeft, scrollViewport } from "@/lib/motion";

const reasons = [
  { icon: Rocket, title: "Execution-First Delivery", description: "We don't just advise — we implement. Practical outcomes, not theoretical frameworks." },
  { icon: Building, title: "Built for Regulated Industries", description: "Deep domain expertise in finance, healthcare, government, and critical infrastructure." },
  { icon: Compass, title: "Framework-Agnostic, Risk-Driven", description: "We adapt to your regulatory landscape rather than forcing a single framework approach." },
  { icon: Layers, title: "Consulting + SaaS Advantage", description: "Unique combination of expert advisory and purpose-built technology platform." },
  { icon: Target, title: "Business-Aligned Governance", description: "GRC strategies that support business objectives, not just check compliance boxes." },
  { icon: Lightbulb, title: "Future-Ready by Design", description: "AI governance, emerging regulations, and evolving threats — we stay ahead so you can too." },
];

export default function WhyChooseSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Why CertifyGRC"
          title="The CertifyGRC Advantage"
          description="What sets us apart in a crowded GRC landscape."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={index % 2 === 0 ? slideInLeft : revealUp}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group flex gap-4 p-6 rounded-xl glass cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
