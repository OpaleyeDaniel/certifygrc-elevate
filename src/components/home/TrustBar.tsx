import SectionHeading from "@/components/SectionHeading";

const logos = [
  "FinServ Corp", "SecureHealth", "GovTech", "CyberShield",
  "DataGuard", "ComplianceAI", "RiskMatrix", "AuditPro",
];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-border/30">
      <div className="container-wide">
        <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
          Trusted by regulated organizations across finance, healthcare, and government
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-scroll">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground text-sm font-medium whitespace-nowrap"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
