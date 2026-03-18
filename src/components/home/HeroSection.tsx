import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookDemo: () => void;
  onBookConsultation: () => void;
}

export default function HeroSection({ onBookDemo, onBookConsultation }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Enterprise GRC Platform</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.1] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Smarter Governance.{" "}
              <span className="gradient-text">Safer Decisions.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
              CertifyGRC delivers an integrated ecosystem of GRC software, expert consulting, and professional training — purpose-built to help regulated organizations simplify compliance, manage risk, and drive governance excellence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              <Button size="lg" onClick={onBookDemo} className="glow-primary text-base px-8">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onBookConsultation} className="border-primary/30 hover:border-primary text-base px-8">
                <Play className="w-4 h-4 mr-1" />
                Book Consultation
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                SOC 2 Ready
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                ISO 27001 Aligned
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                NIST CSF
              </div>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <div className="glass rounded-2xl p-6 glow-border">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-foreground">Compliance Dashboard</h3>
                  <p className="text-xs text-muted-foreground">Real-time overview</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                  All Systems Active
                </div>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <DashboardCard label="Risk Score" value="94" suffix="/100" color="text-green-500" />
                <DashboardCard label="Compliance" value="97" suffix="%" color="text-primary" />
                <DashboardCard label="Controls" value="142" suffix=" Active" color="text-accent" />
              </div>

              {/* Chart mockup */}
              <div className="rounded-xl bg-muted/30 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium">Risk Trend — Last 12 Months</span>
                  <span className="text-xs text-green-500">↓ 23% reduction</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[65, 58, 72, 55, 48, 42, 38, 35, 30, 28, 24, 22].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent/60 transition-all duration-500"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Alert */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Next Audit: ISO 27001</p>
                  <p className="text-xs text-muted-foreground">Scheduled in 14 days — 94% prepared</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-lg animate-float hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-500 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">PCI DSS</p>
                  <p className="text-[10px] text-muted-foreground">Compliant</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass rounded-xl p-3 shadow-lg animate-float hidden md:block" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">AI</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Risk Alert</p>
                  <p className="text-[10px] text-muted-foreground">2 recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({ label, value, suffix, color }: { label: string; value: string; suffix: string; color: string }) {
  return (
    <div className="rounded-xl bg-muted/30 p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`font-display font-bold text-2xl ${color}`}>
        {value}
        <span className="text-xs font-normal text-muted-foreground">{suffix}</span>
      </p>
    </div>
  );
}
