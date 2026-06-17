import { motion } from "framer-motion";
import { Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { slideInLeft, slideInRight, scrollViewport } from "@/lib/motion";
import { PremiumCard, PremiumCardGrid, PremiumCardStandalone } from "@/components/ui/PremiumCard";

const categories = [
  {
    logo: "/home-platform/nist-csf-2-0.png",
    title: "Cybersecurity (NIST CSF 2.0)",
    description: "Map controls, monitor maturity, and operationalize cyber governance.",
    accent: "#6366f1",
    surface: "security" as const,
  },
  {
    logo: "/home-platform/pci-dss.png",
    title: "Payment Security (PCI DSS)",
    description: "Scope, remediate, and manage PCI DSS evidence with audit-ready workflows.",
    accent: "#818cf8",
    surface: "assessment" as const,
  },
  {
    logo: "/home-platform/pipeda.png",
    title: "Data Security (PIPEDA)",
    description: "Embed privacy governance and data protection practices into operations.",
    accent: "#06b6d4",
    surface: "compliance" as const,
  },
];

export default function PlatformSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={scrollViewport}>
            <SectionHeading
              center={false}
              badge="Platform"
              title="The CertifyGRC compliance platform"
              description="A structured, audit-ready platform to manage compliance, controls, and evidence — without spreadsheets."
            />

            <PremiumCardGrid className="grid sm:grid-cols-3 gap-3 mt-6">
              {categories.map((cat) => (
                <PremiumCard key={cat.title} accent={cat.accent} surface={cat.surface} padding="sm">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 overflow-hidden mx-auto sm:mx-0"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accent}15, ${cat.accent}06)`,
                      border: `1px solid ${cat.accent}25`,
                    }}
                  >
                    <img src={cat.logo} alt={cat.title} className="w-10 h-10 object-contain" loading="lazy" draggable={false} />
                  </div>
                  <h3 className="font-display font-semibold text-xs text-foreground mb-1 leading-snug">{cat.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{cat.description}</p>
                </PremiumCard>
              ))}
            </PremiumCardGrid>

            <div className="mt-5">
              <PremiumCardStandalone surface="compliance" accent="#6366f1" padding="md">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5 text-accent" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">
                      A single, powerful, easy-to-use platform
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      We automate compliance tasks, control monitoring, and audit management — making your processes seamless and efficient.
                    </p>
                  </div>
                </div>
              </PremiumCardStandalone>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="glow-primary px-7 group">
                <Link to="/software">
                  Explore the platform <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:border-primary/40 px-7">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-6 md:p-8"
            style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px -12px rgba(0,0,0,0.5)" }}
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <PlatformIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlatformIllustration() {
  return (
    <svg viewBox="0 0 720 480" role="img" aria-label="GRC platform illustration" className="w-full h-auto">
      <defs>
        <linearGradient id="pf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pf-soft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="720" height="480" rx="22" fill="hsl(var(--card))" fillOpacity="0.5" stroke="hsl(var(--border))" />
      <circle cx="120" cy="120" r="120" fill="url(#pf-soft)" />
      <circle cx="640" cy="390" r="140" fill="url(#pf-soft)" />
      <rect x="34" y="36" width="130" height="408" rx="20" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--border))" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="56" y={70 + i * 70} width="86" height="44" rx="14" fill="hsl(var(--card))" fillOpacity="0.5" stroke="hsl(var(--border))" />
          <rect x="70" y={86 + i * 70} width="30" height="12" rx="6" fill="url(#pf-grad)" fillOpacity={i === 0 ? 0.95 : 0.5} />
          <rect x="104" y={88 + i * 70} width="26" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.07" />
        </g>
      ))}
      <rect x="182" y="36" width="504" height="66" rx="20" fill="hsl(var(--muted))" fillOpacity="0.18" stroke="hsl(var(--border))" />
      <rect x="206" y="62" width="210" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.08" />
      <rect x="570" y="56" width="96" height="26" rx="13" fill="url(#pf-grad)" />
      {[
        { x: 182, y: 124, w: 246, h: 142 },
        { x: 440, y: 124, w: 246, h: 142 },
        { x: 182, y: 284, w: 504, h: 160 },
      ].map((c, idx) => (
        <g key={idx}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="22" fill="hsl(var(--muted))" fillOpacity="0.16" stroke="hsl(var(--border))" />
          <rect x={c.x + 22} y={c.y + 22} width="160" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.08" />
          <rect x={c.x + 22} y={c.y + 46} width={Math.min(220, c.w - 44)} height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.05" />
          <rect x={c.x + 22} y={c.y + 66} width={Math.min(190, c.w - 44)} height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.04" />
          {idx < 2 ? (
            [36, 58, 42, 70, 52, 78].map((h, i) => (
              <rect key={i} x={c.x + 30 + i * 28} y={c.y + c.h - 28 - h} width="16" height={h} rx="8" fill="url(#pf-grad)" opacity={0.3 + i * 0.07} />
            ))
          ) : (
            [0, 1, 2, 3].map((r) => (
              <g key={r}>
                <rect x={c.x + 22} y={c.y + 92 + r * 16} width="12" height="12" rx="4" fill="url(#pf-grad)" opacity="0.8" />
                <rect x={c.x + 40} y={c.y + 95 + r * 16} width={c.w - 70} height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.05" />
              </g>
            ))
          )}
        </g>
      ))}
    </svg>
  );
}
