import { ShieldCheck, RefreshCw, Lock, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: RefreshCw,
    title: "Business Continuity & Operational Resilience",
    description: "ISO 22301–aligned business continuity programs that protect critical services, reduce downtime, and meet regulatory expectations.",
    link: "/consulting",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory & Governance Compliance",
    description: "OSFI-aligned governance, technology risk, and third-party risk compliance for federally regulated and regulated-adjacent organizations.",
    link: "/consulting",
  },
  {
    icon: Lock,
    title: "Cybersecurity & Information Security",
    description: "Risk-based cybersecurity and information security programs aligned with ISO 27001, SOC 2, and NIST CSF.",
    link: "/consulting",
  },
  {
    icon: Eye,
    title: "Privacy & Data Protection",
    description: "Practical PIPEDA compliance and privacy governance embedded into business operations.",
    link: "/consulting",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="What We Help You Get Right"
            title="Operational Resilience & Regulatory Compliance"
            description="We help organizations strengthen business continuity, cybersecurity, and regulatory compliance — so they can operate confidently, meet regulatory expectations, and scale sustainably."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <Link
                to={service.link}
                className="group flex gap-5 p-6 rounded-xl glass hover-lift h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Explore More <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
