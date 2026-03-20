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
  { icon: Server, title: "IT Service Management", frameworks: ["ITIL 4", "ISO 20000"], description: "Design, implement, and optimize IT service management practices aligned with industry best practices. We help organizations establish efficient service delivery models that reduce downtime, improve customer satisfaction, and drive operational excellence." },
  { icon: Shield, title: "IT Governance", frameworks: ["COBIT 2019", "ISO 38500"], description: "Establish robust IT governance structures that align technology investments with business strategy and ensure accountability at every level. Our consultants help boards and executives make informed technology decisions." },
  { icon: Lock, title: "Information & Cybersecurity", frameworks: ["NIST CSF", "ISO 27001", "SOC 2"], description: "Build comprehensive cybersecurity programs from risk assessment through implementation, certification, and continuous monitoring. We guide you through the entire lifecycle of information security management." },
  { icon: RefreshCw, title: "Business Continuity", frameworks: ["BCI GPG", "ISO 22301"], description: "Develop and test business continuity and disaster recovery plans that ensure organizational resilience against disruptions. Our BCM experts help you prepare for, respond to, and recover from incidents." },
  { icon: CreditCard, title: "Payment Security", frameworks: ["PCI DSS v4.0"], description: "Achieve and maintain PCI DSS compliance with expert guidance through scoping, gap analysis, remediation, and audit preparation. Stay ahead of PCI DSS v4.0 requirements with our specialized team." },
  { icon: Eye, title: "Privacy & Data Protection", frameworks: ["PIPEDA", "NIST Privacy"], description: "Navigate complex privacy regulations with comprehensive data protection programs, privacy impact assessments, and compliance roadmaps tailored to Canadian and international requirements." },
  { icon: Brain, title: "AI Governance", frameworks: ["NIST AI RMF", "ISO 42001"], description: "Implement responsible AI governance frameworks addressing bias, transparency, accountability, and regulatory compliance. Stay ahead of emerging AI regulations with structured governance programs." },
  { icon: Building2, title: "Enterprise Architecture", frameworks: ["TOGAF", "Zachman"], description: "Design and implement enterprise architecture programs that drive digital transformation and technology modernization. Align your IT landscape with strategic business objectives." },
  { icon: Zap, title: "Agile Project Management", frameworks: ["Scrum", "SAFe", "PMI"], description: "Transform project delivery with agile methodologies scaled for enterprise environments. Our certified practitioners help teams adopt frameworks that improve velocity and quality." },
  { icon: Landmark, title: "OSFI Compliance", frameworks: ["B-13", "B-10", "E-21"], description: "Specialized consulting for Canadian financial institutions navigating OSFI regulatory requirements including technology risk management, outsourcing, and operational resilience guidelines." },
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
                10 specialized consulting domains delivered by certified professionals who understand your regulatory landscape and business context.
              </p>
              <Button size="lg" onClick={() => setConsultOpen(true)} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                Book a Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden glow-border shadow-2xl shadow-primary/5">
                <img src={consultingHero} alt="Consulting team reviewing compliance strategy" className="w-full h-auto" />
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
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
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
