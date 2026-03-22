import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import platformDashboard from "@/assets/platform-dashboard.png";

const modules = [
  { name: "Cybersecurity (NIST CSF 2.0)", description: "Comprehensive cybersecurity posture management aligned with the NIST Cybersecurity Framework." },
  { name: "Payment Security (PCI DSS)", description: "End-to-end PCI DSS compliance tracking for organizations handling payment card data." },
  { name: "Data Security (PIPEDA)", description: "Privacy governance and PIPEDA compliance embedded into your business operations." },
];

export default function PlatformSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            badge="The CertifyGRC Platform"
            title="A Single, Powerful, Easy-to-Use Platform"
            description="A structured, audit-ready platform that helps organizations manage compliance, controls, and evidence — without spreadsheets or guesswork."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {modules.map((mod, i) => (
            <ScrollReveal key={mod.name} delay={i * 0.1}>
              <div className="glass rounded-xl p-6 hover-lift glow-border h-full group">
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{mod.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden glow-border max-w-5xl mx-auto shadow-2xl shadow-primary/5">
            <img src={platformDashboard} alt="CertifyGRC Compliance Platform Dashboard" className="w-full h-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-6">
              We automate compliance tasks, control monitoring, and audit management, making your processes seamless and efficient.
            </p>
            <Link to="/contact">
              <Button size="lg" className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                Contact Us <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
