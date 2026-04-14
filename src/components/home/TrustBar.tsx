const frameworks = [
  "NIST CSF",
  "ISO 27001",
  "SOC 2",
  "PCI DSS",
  "COBIT",
  "NIST AI RMF",
  "ISO 20000",
  "ISO 22301",
  "ISO 42001",
  "PIPEDA",
];

/** Framework ticker aligned with homepage on [certifygrc.com](https://certifygrc.com/) */
export default function TrustBar() {
  const doubled = [...frameworks, ...frameworks];
  return (
    <section className="py-12 md:py-16 border-y border-border/30 bg-muted/10 overflow-x-hidden">
      <div className="container-wide mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Frameworks supported across the CertifyGRC ecosystem
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-4 md:gap-6 animate-scroll w-max">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-full bg-card/80 border border-border/50 text-sm font-medium text-foreground shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
