import { motion } from "framer-motion";
import { Landmark, Heart, Monitor, Banknote, Factory, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { staggerFast, scaleUp, scrollViewport } from "@/lib/motion";

const industries = [
  { icon: Landmark, name: "Government" },
  { icon: Heart, name: "Healthcare" },
  { icon: Monitor, name: "IT & Cybersecurity" },
  { icon: Banknote, name: "Finance & Banking" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Users, name: "SMEs" },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <SectionHeading
          badge="Industries"
          title="Purpose-Built for Regulated Sectors"
          description="Tailored GRC solutions for the industries that need them most."
        />

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={scaleUp}
              whileHover={{ y: -4, scale: 1.05, transition: { type: "spring", stiffness: 320, damping: 22 } }}
              className="group glass rounded-xl p-4 sm:p-6 text-center cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <industry.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-display font-medium text-xs sm:text-sm text-foreground">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
