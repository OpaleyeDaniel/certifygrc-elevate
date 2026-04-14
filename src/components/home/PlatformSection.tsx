import { motion } from "framer-motion";
import { Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { staggerFast, revealUp, slideInLeft, slideInRight, scrollViewport } from "@/lib/motion";

const categories = [
  {
    logo: "/home-platform/nist-csf-2-0.png",
    title: "Cybersecurity (NIST CSF 2.0)",
    description: "Map controls, monitor maturity, and operationalize cyber governance.",
  },
  {
    logo: "/home-platform/pci-dss.png",
    title: "Payment Security (PCI DSS)",
    description: "Scope, remediate, and manage PCI DSS evidence with audit-ready workflows.",
  },
  {
    logo: "/home-platform/pipeda.png",
    title: "Data Security (PIPEDA)",
    description: "Embed privacy governance and data protection practices into operations.",
  },
];

export default function PlatformSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left — text + category cards */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <SectionHeading
              badge="Platform"
              title="The CertifyGRC Compliance Platform"
              description="A structured, audit-ready platform that helps organizations manage compliance, controls, and evidence without spreadsheets or guesswork"
            />

            <motion.div
              className="grid sm:grid-cols-3 gap-4 mt-8"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.title}
                  variants={revealUp}
                  whileHover={{ y: -4, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="glass rounded-2xl p-6 glow-border cursor-default"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 overflow-hidden border border-primary/20">
                    <img
                      src={cat.logo}
                      alt={cat.title}
                      className="w-11 h-11 object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 rounded-2xl border border-border/60 bg-muted/10 p-6"
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    A single, powerful, easy-to-use platform
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    We automate compliance tasks, control monitoring, and audit management, making
                    your processes seamless and efficient.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
            >
              <Button asChild size="lg" className="glow-primary px-8 group">
                <Link to="/software">
                  Explore the Platform{" "}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — illustration */}
          <motion.div
            className="glass rounded-2xl p-6 md:p-8 glow-border"
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
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="720" height="480" rx="22" fill="hsl(var(--card))" fillOpacity="0.55" stroke="hsl(var(--border))" />
      <circle cx="120" cy="120" r="120" fill="url(#pf-soft)" />
      <circle cx="640" cy="390" r="140" fill="url(#pf-soft)" />

      <rect x="34" y="36" width="130" height="408" rx="20" fill="hsl(var(--muted))" fillOpacity="0.25" stroke="hsl(var(--border))" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="56" y={70 + i * 70} width="86" height="44" rx="14" fill="hsl(var(--card))" fillOpacity="0.45" stroke="hsl(var(--border))" />
          <rect x="70" y={86 + i * 70} width="30" height="12" rx="6" fill="url(#pf-grad)" fillOpacity={i === 0 ? 0.95 : 0.55} />
          <rect x="104" y={88 + i * 70} width="26" height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.08" />
        </g>
      ))}

      <rect x="182" y="36" width="504" height="66" rx="20" fill="hsl(var(--muted))" fillOpacity="0.22" stroke="hsl(var(--border))" />
      <rect x="206" y="62" width="210" height="14" rx="7" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      <rect x="570" y="56" width="96" height="26" rx="13" fill="url(#pf-grad)" />

      {[
        { x: 182, y: 124, w: 246, h: 142 },
        { x: 440, y: 124, w: 246, h: 142 },
        { x: 182, y: 284, w: 504, h: 160 },
      ].map((c, idx) => (
        <g key={idx}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="22" fill="hsl(var(--muted))" fillOpacity="0.20" stroke="hsl(var(--border))" />
          <rect x={c.x + 22} y={c.y + 22} width="160" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.10" />
          <rect x={c.x + 22} y={c.y + 46} width={Math.min(220, c.w - 44)} height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.06" />
          <rect x={c.x + 22} y={c.y + 66} width={Math.min(190, c.w - 44)} height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.05" />
          {idx < 2 ? (
            <>
              {[36, 58, 42, 70, 52, 78].map((h, i) => (
                <rect key={i} x={c.x + 30 + i * 28} y={c.y + c.h - 28 - h} width="16" height={h} rx="8" fill="url(#pf-grad)" opacity={0.35 + i * 0.07} />
              ))}
            </>
          ) : (
            <>
              {[0, 1, 2, 3].map((r) => (
                <g key={r}>
                  <rect x={c.x + 22} y={c.y + 92 + r * 16} width="12" height="12" rx="4" fill="url(#pf-grad)" opacity="0.85" />
                  <rect x={c.x + 40} y={c.y + 95 + r * 16} width={c.w - 70} height="8" rx="4" fill="hsl(var(--foreground))" fillOpacity="0.06" />
                </g>
              ))}
              <rect x={c.x + 22} y={c.y + c.h - 34} width="160" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.05" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
