import { useState } from "react";
import {
  Server, Shield, Lock, RefreshCw, CreditCard,
  Eye, Brain, Building2, Zap, Landmark, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import BookingModal from "@/components/BookingModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import consultingHero from "@/assets/consulting-hero.png";

const services = [
  {
    icon: Server,
    title: "IT Service Management (ITSM)",
    frameworks: ["ITIL 4", "ISO 20000"],
    description: "We help organizations design, implement, and continuously improve end-to-end IT service management capabilities that ensure technology delivers value, supports business operations, and meets service-level expectations.",
  },
  {
    icon: Shield,
    title: "IT Governance",
    frameworks: ["COBIT 2019", "ISO 38500"],
    description: "We support boards and executive management in establishing effective IT governance frameworks that ensure technology decisions deliver business value while managing risk and regulatory obligations.",
  },
  {
    icon: Lock,
    title: "Information & Cybersecurity",
    frameworks: ["NIST CSF", "ISO 27001", "SOC 2"],
    description: "We help organizations establish and mature information security and cybersecurity programs that protect critical assets, support regulatory compliance, and build trust with stakeholders.",
  },
  {
    icon: RefreshCw,
    title: "Business Continuity Management (BCM)",
    frameworks: ["BCI GPG v7", "ISO 22301"],
    description: "We enable organizations to build resilient operations that can withstand and recover from disruptions. Our BCM services ensure critical services are identified, protected, and recoverable.",
  },
  {
    icon: CreditCard,
    title: "Payment & Card Security",
    frameworks: ["PCI DSS v4.0"],
    description: "We help organizations that handle payment card data meet PCI DSS compliance requirements while reducing fraud and data-breach risk. Our services focus on practical, risk-based implementation.",
  },
  {
    icon: Eye,
    title: "Privacy & Data Protection",
    frameworks: ["PIPEDA", "NIST Privacy"],
    description: "We help organizations embed privacy by design into business operations, ensuring personal information is handled lawfully, transparently, and responsibly.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence (AI) Governance",
    frameworks: ["NIST AI RMF", "ISO 42001"],
    description: "We help organizations adopt AI responsibly by establishing AI governance, risk, and control frameworks that address ethical, legal, and operational risks across the AI lifecycle.",
  },
  {
    icon: Building2,
    title: "Enterprise Architecture & Digital Transformation",
    frameworks: ["TOGAF", "Zachman"],
    description: "We help organizations design and execute enterprise-wide digital transformation initiatives through structured enterprise architecture practices that align business strategy, technology, and execution.",
  },
  {
    icon: Zap,
    title: "Agile Project & Program Management",
    frameworks: ["Scrum", "PMBOK 8th Ed"],
    description: "We support organizations in adopting agile and hybrid delivery models that balance speed, governance, and risk management.",
  },
  {
    icon: Landmark,
    title: "OSFI Compliance",
    frameworks: ["B-13", "B-10", "E-21"],
    description: "We help federally regulated financial institutions meet OSFI expectations by strengthening governance, technology risk management, outsourcing oversight, and operational resilience.",
  },
];

export default function ConsultingPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Consulting Services
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6 leading-[1.1]">
                Confidence Through <span className="gradient-text">Compliance</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Helping businesses meet regulatory demands while enabling sustainable growth. 10 specialized consulting domains delivered by certified professionals who understand your regulatory landscape.
              </p>
              <Button size="lg" onClick={() => setConsultOpen(true)} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                Book a Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden glow-border shadow-2xl shadow-primary/5">
                <img src={consultingHero} alt="CertifyGRC consulting team reviewing compliance strategy" className="w-full h-auto" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading badge="Our Expertise" title="Specialized GRC Consulting" description="Each domain is led by certified professionals with deep industry experience." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.06}>
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-left group glass rounded-xl p-6 hover-lift hover-glow transition-all w-full h-full active:scale-[0.98]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.frameworks.map((fw) => (
                      <span key={fw} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        {fw}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Learn More <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-lg glass-strong">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <selectedService.icon className="w-6 h-6 text-primary" />
                </div>
                <DialogTitle className="font-display text-xl">{selectedService.title}</DialogTitle>
                <DialogDescription>{selectedService.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedService.frameworks.map((fw) => (
                  <span key={fw} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                    {fw}
                  </span>
                ))}
              </div>
              <Button className="w-full mt-4 glow-primary active:scale-[0.97] transition-transform" onClick={() => { setSelectedService(null); setConsultOpen(true); }}>
                Book a Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="section-padding bg-muted/20">
        <ScrollReveal>
          <div className="container-narrow text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Let's Build Your Compliance Roadmap
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Every organization's GRC journey is unique. Let our experts craft a strategy tailored to your industry and objectives.
            </p>
            <Button size="lg" onClick={() => setConsultOpen(true)} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
              Start the Conversation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
    </>
  );
}
