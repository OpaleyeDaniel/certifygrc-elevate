import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Landmark, Lock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { staggerFast, revealUp, slideInLeft, slideInRight, scrollViewport } from "@/lib/motion";

const items = [
  {
    icon: ShieldCheck,
    title: "Business Continuity & Operational Resilience",
    description:
      "ISO 22301–aligned business continuity programs that protect critical services, reduce downtime, and meet regulatory expectations.",
  },
  {
    icon: Landmark,
    title: "Regulatory & Governance Compliance (Canada Focus)",
    description:
      "OSFI-aligned governance, technology risk, and third-party risk compliance for federally regulated and regulated-adjacent organizations.",
  },
  {
    icon: Lock,
    title: "Cybersecurity & Information Security",
    description:
      "Risk-based cybersecurity and information security programs aligned with ISO 27001, SOC 2, and NIST CSF.",
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
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — sticky sidebar */}
          <motion.div
            className="lg:sticky lg:top-28"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <SectionHeading
              badge="Consulting"
              title="Compliance & Operational Resilience Consulting"
              description="Operational Resilience & Regulatory Compliance for Regulated and Growing Organizations"
            />
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              We help organizations strengthen business continuity, cybersecurity, and regulatory
              compliance so they can operate confidently, meet regulatory expectations, and scale
              sustainably.
            </p>
            <div className="mt-8 glass rounded-2xl p-6 glow-border">
              <ConsultingIllustration />
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="glow-primary px-8 group">
                <Link to="/consulting">
                  Explore More Services{" "}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — card grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6 sm:mb-8">
              What We Help You Get Right
            </h3>
            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
            >
              {items.map((it) => (
                <motion.div
                  key={it.title}
                  variants={revealUp}
                  whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="glass rounded-2xl p-7 glow-border cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <it.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {it.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                </motion.div>
              ))}
            </motion.div>
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
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="720" height="360" rx="22" fill="hsl(var(--card))" fillOpacity="0.55" stroke="hsl(var(--border))" />
      <circle cx="150" cy="90" r="110" fill="url(#cr-soft)" />
      <circle cx="590" cy="280" r="120" fill="url(#cr-soft)" />
      <rect x="34" y="36" width="310" height="288" rx="20" fill="hsl(var(--muted))" fillOpacity="0.25" stroke="hsl(var(--border))" />
      <rect x="60" y="64" width="190" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      <rect x="60" y="88" width="250" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.08" />
      <rect x="60" y="106" width="230" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.06" />
      <rect x="60" y="140" width="258" height="74" rx="18" fill="hsl(var(--muted))" fillOpacity="0.25" stroke="hsl(var(--border))" />
      <rect x="84" y="162" width="118" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      <rect x="84" y="184" width="210" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.06" />
      <path d="M84 206 H 272" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <path d="M84 206 H 238" stroke="url(#cr-grad)" strokeWidth="6" strokeLinecap="round" />
      <rect x="60" y="232" width="258" height="76" rx="18" fill="hsl(var(--muted))" fillOpacity="0.22" stroke="hsl(var(--border))" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="84" y={254 + i * 18} width="12" height="12" rx="4" fill="url(#cr-grad)" />
          <rect x="104" y={256 + i * 18} width="180" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.07" />
        </g>
      ))}
      <rect x="368" y="36" width="318" height="288" rx="20" fill="hsl(var(--muted))" fillOpacity="0.22" stroke="hsl(var(--border))" />
      <rect x="394" y="64" width="210" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      {[{ x: 394, y: 96 }, { x: 540, y: 96 }, { x: 394, y: 194 }, { x: 540, y: 194 }].map((c, idx) => (
        <g key={idx}>
          <rect x={c.x} y={c.y} width="132" height="82" rx="18" fill="hsl(var(--card))" fillOpacity="0.45" stroke="hsl(var(--border))" />
          <rect x={c.x + 16} y={c.y + 18} width="42" height="42" rx="14" fill="url(#cr-grad)" fillOpacity="0.85" />
          <rect x={c.x + 66} y={c.y + 22} width="52" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.09" />
          <rect x={c.x + 66} y={c.y + 40} width="44" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.06" />
          <rect x={c.x + 66} y={c.y + 56} width="56" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.05" />
        </g>
      ))}
    </svg>
  );
}
