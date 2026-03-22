import {
  Server, Shield, Lock, RefreshCw, CreditCard,
  Eye, Brain, Building2, Zap, Landmark,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const services = [
  { icon: Server, title: "IT Service Management", frameworks: "ITIL · ISO 20000", description: "End-to-end IT service management capabilities that ensure technology delivers value." },
  { icon: Shield, title: "IT Governance", frameworks: "COBIT · ISO 38500", description: "Effective IT governance frameworks for business value and risk management." },
  { icon: Lock, title: "Information & Cybersecurity", frameworks: "NIST CSF · ISO 27001 · SOC 2", description: "Information security and cybersecurity programs that protect critical assets." },
  { icon: RefreshCw, title: "Business Continuity", frameworks: "BCI GPG · ISO 22301", description: "Resilient operations that withstand and recover from disruptions." },
  { icon: CreditCard, title: "Payment Security", frameworks: "PCI DSS", description: "PCI DSS compliance with risk-based implementation approach." },
  { icon: Eye, title: "Privacy & Data Protection", frameworks: "PIPEDA · NIST Privacy", description: "Privacy by design embedded into business operations." },
  { icon: Brain, title: "AI Governance", frameworks: "NIST AI RMF · ISO 42001", description: "Responsible AI governance addressing ethical and operational risks." },
  { icon: Building2, title: "Enterprise Architecture", frameworks: "TOGAF · Zachman", description: "Enterprise-wide digital transformation through structured architecture." },
  { icon: Zap, title: "Agile Project Management", frameworks: "Scrum · PMBOK", description: "Agile and hybrid delivery models balancing speed and governance." },
  { icon: Landmark, title: "OSFI Compliance", frameworks: "B-13 · B-10 · E-21", description: "OSFI regulatory compliance for Canadian financial institutions." },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="Consulting Services"
            title="Expert-Led, Framework-Driven"
            description="10 specialized consulting domains delivered by certified professionals who understand your regulatory landscape."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.05}>
              <Link
                to="/consulting"
                className="group block h-full glass rounded-xl p-5 hover-lift cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1">{service.title}</h3>
                <p className="text-[11px] text-muted-foreground mb-1">{service.frameworks}</p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">{service.description}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
