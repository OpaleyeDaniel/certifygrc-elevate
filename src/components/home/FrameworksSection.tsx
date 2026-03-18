import SectionHeading from "@/components/SectionHeading";

const frameworks = [
  { name: "NIST CSF", description: "Cybersecurity Framework for critical infrastructure protection" },
  { name: "ISO 27001", description: "International standard for information security management" },
  { name: "SOC 2", description: "Service organization controls for trust and security" },
  { name: "PCI DSS", description: "Payment card industry data security standard" },
  { name: "COBIT", description: "IT governance and management framework" },
  { name: "NIST AI RMF", description: "Risk management framework for artificial intelligence" },
  { name: "ISO 20000", description: "IT service management system standard" },
  { name: "ISO 22301", description: "Business continuity management standard" },
  { name: "ISO 42001", description: "AI management system standard" },
  { name: "PIPEDA", description: "Canadian privacy legislation framework" },
];

export default function FrameworksSection() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <SectionHeading
          badge="Compliance Frameworks"
          title="Framework Coverage"
          description="Comprehensive support across the most critical governance and compliance standards."
        />

        <div className="flex flex-wrap justify-center gap-3">
          {frameworks.map((fw, index) => (
            <div
              key={fw.name}
              className="group relative px-5 py-3 rounded-xl glow-border bg-card/50 hover:bg-primary/10 cursor-pointer transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
            >
              <span className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {fw.name}
              </span>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-popover border border-border shadow-lg text-xs text-popover-foreground max-w-[200px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                {fw.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
