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

/** Framework ticker — refined marquee with fade masks */
export default function TrustBar() {
  const doubled = [...frameworks, ...frameworks];
  return (
    <section
      className="py-10 md:py-12 overflow-x-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(90deg, hsl(222,47%,5%) 0%, hsl(220,42%,8%) 50%, hsl(222,47%,5%) 100%)",
      }}
    >
      <div className="container-wide mb-5">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
          Compliance frameworks supported across the CertifyGRC ecosystem
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-3 animate-scroll w-max">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground tracking-wide"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
