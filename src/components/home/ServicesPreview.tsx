import {
  Server, Shield, Lock, RefreshCw, CreditCard,
  Eye, Brain, Building2, Zap, Landmark,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const services = [
  { icon: Server, title: "IT Service Management", frameworks: "ITIL · ISO 20000" },
  { icon: Shield, title: "IT Governance", frameworks: "COBIT · ISO 38500" },
  { icon: Lock, title: "Information & Cybersecurity", frameworks: "NIST CSF · ISO 27001 · SOC 2" },
  { icon: RefreshCw, title: "Business Continuity", frameworks: "BCI GPG · ISO 22301" },
  { icon: CreditCard, title: "Payment Security", frameworks: "PCI DSS" },
  { icon: Eye, title: "Privacy & Data Protection", frameworks: "PIPEDA · NIST Privacy" },
  { icon: Brain, title: "AI Governance", frameworks: "NIST AI RMF · ISO 42001" },
  { icon: Building2, title: "Enterprise Architecture", frameworks: "TOGAF · Zachman" },
  { icon: Zap, title: "Agile Project Management", frameworks: "Scrum · SAFe" },
  { icon: Landmark, title: "OSFI Compliance", frameworks: "B-13 · B-10 · E-21" },
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
                <p className="text-xs text-muted-foreground">{service.frameworks}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
