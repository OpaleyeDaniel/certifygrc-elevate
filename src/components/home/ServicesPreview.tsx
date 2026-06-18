import {
  Server, Shield, Lock, RefreshCw, CreditCard,
  Eye, Brain, Building2, Zap, Landmark,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

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
  { icon: Landmark, title: "OSFI Compliance", frameworks: "B-13 · B-10 · E 21" },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Consulting Services"
          title="Expert-led, framework-driven"
          description="10 specialized consulting domains delivered by certified professionals who understand your regulatory landscape."
        />

        <PremiumCardGrid className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-3.5">
          {services.map((service) => (
            <PremiumCard key={service.title} padding="sm" interactive={false}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                  border: `1px solid ${BRAND_PRIMARY}28`,
                }}
              >
                <service.icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-semibold text-xs text-foreground mb-1 leading-snug">{service.title}</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{service.frameworks}</p>
            </PremiumCard>
          ))}
        </PremiumCardGrid>
      </div>
    </section>
  );
}
