import { ScrollReveal } from "@/hooks/useScrollReveal";

const logos = [
  "FinServ Corp", "SecureHealth", "GovTech Solutions", "CyberShield Inc",
  "DataGuard Pro", "ComplianceAI", "RiskMatrix", "AuditPro Systems",
];

export default function TrustBar() {
  return (
    <ScrollReveal>
      <section className="py-16 border-y border-border/30">
        <div className="container-wide">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide uppercase">
            Trusted by regulated organizations across finance, healthcare, and government
          </p>
          <div className="relative overflow-hidden mask-fade">
            <div className="flex gap-8 animate-scroll">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-8 py-3 rounded-lg bg-muted/20 border border-border/20 text-muted-foreground/60 text-sm font-semibold whitespace-nowrap tracking-wide"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
