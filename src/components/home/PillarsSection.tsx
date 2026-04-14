import { motion } from "framer-motion";
import { Monitor, Users, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { staggerFast, revealUp, cardHover, scrollViewport } from "@/lib/motion";

const pillars = [
  {
    icon: Monitor,
    title: "Software Application",
    description:
      "A structured, audit-ready platform for compliance, controls, and evidence — without spreadsheets or guesswork.",
    link: "/software",
    features: ["Framework automation", "Evidence mapping", "Executive reporting"],
  },
  {
    icon: Users,
    title: "Consulting Services",
    description:
      "Operational resilience and regulatory programs delivered with practical execution and audit-ready outcomes.",
    link: "/consulting",
    features: ["OSFI & Canada focus", "BCM & cyber", "Privacy & AI governance"],
  },
  {
    icon: GraduationCap,
    title: "E-Learning",
    description:
      "Professional learning that builds GRC competency — from foundational standards to advanced practitioner skills.",
    link: "/e-learning",
    features: ["Role-based paths", "Certification prep", "Workshops"],
  },
];

export default function PillarsSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Our ecosystem"
          title="Software, consulting, and learning together"
          description="The same narrative you see on CertifyGRC: technology-enabled GRC with advisory depth and professional development."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.title} variants={revealUp}>
              <motion.div whileHover={cardHover}>
                <Link
                  to={pillar.link}
                  className="group glass rounded-2xl p-8 hover-glow flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pillar.features.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground border border-border/50"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
