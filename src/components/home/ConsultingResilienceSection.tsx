import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Landmark, Lock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { slideInLeft, slideInRight, scrollViewport } from "@/lib/motion";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const items = [
  {
    icon: ShieldCheck,
    title: "Business Continuity & Operational Resilience",
    description:
      "ISO 22301-aligned business continuity programs that protect critical services, reduce downtime, and meet regulatory expectations.",
  },
  {
    icon: Landmark,
    title: "Regulatory & Governance Compliance",
    description:
      "OSFI-aligned governance, technology risk, and third-party risk compliance for federally regulated organizations.",
  },
  {
    icon: Lock,
    title: "Cybersecurity & Information Security",
    description:
      "Risk-based cybersecurity programs aligned with ISO 27001, SOC 2, and NIST CSF.",
  },
  {
    icon: FileText,
    title: "Privacy & Data Protection",
    description:
      "Practical PIPEDA compliance and privacy governance embedded into business operations.",
  },
];

export default function ConsultingResilienceSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            className="lg:sticky lg:top-24"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <SectionHeading
              center={false}
              badge="Consulting"
              title="Compliance & Operational Resilience"
              description="Strengthening business continuity, cybersecurity, and regulatory compliance so organizations can operate with confidence."
            />
            <div className="mt-6 rounded-2xl p-5 overflow-hidden" style={{ background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--background)))", border: "1px solid hsl(var(--border))", boxShadow: "0 1px 0 hsl(var(--foreground) / 0.04) inset, 0 8px 32px -8px rgba(0,0,0,0.3)" }}>
              <ConsultingIllustration />
            </div>
            <div className="mt-6">
              <Button asChild size="lg" className="glow-primary px-7 group">
                <Link to="/consulting">
                  Explore services{" "}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <h3 className="font-display font-semibold text-display-sm text-foreground mb-5">
              What we help you get right
            </h3>
            <PremiumCardGrid className="grid sm:grid-cols-2 gap-3 md:gap-3.5">
              {items.map((it) => (
                <PremiumCard key={it.title} padding="md" interactive={false}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                      border: `1px solid ${BRAND_PRIMARY}28`,
                    }}
                  >
                    <it.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-2 leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{it.description}</p>
                </PremiumCard>
              ))}
            </PremiumCardGrid>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ConsultingIllustration() {
  return (
    <svg viewBox="0 0 720 360" role="img" aria-label="Consulting and resilience illustration" className="w-full h-auto">
      <defs>
        <linearGradient id="cr-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="cr-soft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="720" height="360" rx="22" fill="hsl(var(--card))" fillOpacity="0.4" stroke="hsl(var(--border))" />
      <circle cx="150" cy="90" r="110" fill="url(#cr-soft)" />
      <circle cx="590" cy="280" r="120" fill="url(#cr-soft)" />
      <rect x="34" y="36" width="310" height="288" rx="20" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--border))" />
      <rect x="60" y="64" width="190" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.08" />
      <rect x="60" y="88" width="250" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.06" />
      <rect x="60" y="106" width="230" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.05" />
      <rect x="60" y="140" width="258" height="74" rx="18" fill="hsl(var(--muted))" fillOpacity="0.22" stroke="hsl(var(--border))" />
      <rect x="84" y="162" width="118" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.08" />
      <rect x="84" y="184" width="210" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.05" />
      <path d="M84 206 H 272" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
      <path d="M84 206 H 238" stroke="url(#cr-grad)" strokeWidth="6" strokeLinecap="round" />
      <rect x="60" y="232" width="258" height="76" rx="18" fill="hsl(var(--muted))" fillOpacity="0.18" stroke="hsl(var(--border))" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="84" y={254 + i * 18} width="12" height="12" rx="4" fill="url(#cr-grad)" />
          <rect x="104" y={256 + i * 18} width="180" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.06" />
        </g>
      ))}
      <rect x="368" y="36" width="318" height="288" rx="20" fill="hsl(var(--muted))" fillOpacity="0.18" stroke="hsl(var(--border))" />
      <rect x="394" y="64" width="210" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.08" />
      {[{ x: 394, y: 96 }, { x: 540, y: 96 }, { x: 394, y: 194 }, { x: 540, y: 194 }].map((c, idx) => (
        <g key={idx}>
          <rect x={c.x} y={c.y} width="132" height="82" rx="18" fill="hsl(var(--card))" fillOpacity="0.5" stroke="hsl(var(--border))" />
          <rect x={c.x + 16} y={c.y + 18} width="42" height="42" rx="14" fill="url(#cr-grad)" fillOpacity="0.8" />
          <rect x={c.x + 66} y={c.y + 22} width="52" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.07" />
          <rect x={c.x + 66} y={c.y + 40} width="44" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.05" />
          <rect x={c.x + 66} y={c.y + 56} width="56" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.04" />
        </g>
      ))}
    </svg>
  );
}
