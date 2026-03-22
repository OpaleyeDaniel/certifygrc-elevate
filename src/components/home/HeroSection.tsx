import { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

interface HeroSectionProps {
  onBookDemo: () => void;
  onBookConsultation: () => void;
}

const rotatingWords = ["Smarter Compliance", "Simplified", "Intelligent", "Secure", "Automated", "Scalable"];

export default function HeroSection({ onBookDemo, onBookConsultation }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Animated gradient lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="40%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,180 Q400,80 800,220 T1600,180" fill="none" stroke="url(#line1)" strokeWidth="1">
          <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,180 Q400,80 800,220 T1600,180;M0,220 Q400,160 800,120 T1600,220;M0,180 Q400,80 800,220 T1600,180" />
        </path>
        <path d="M0,350 Q500,280 900,400 T1800,350" fill="none" stroke="url(#line2)" strokeWidth="1">
          <animate attributeName="d" dur="15s" repeatCount="indefinite" values="M0,350 Q500,280 900,400 T1800,350;M0,310 Q500,400 900,300 T1800,310;M0,350 Q500,280 900,400 T1800,350" />
        </path>
        <path d="M0,520 Q300,460 700,550 T1400,500" fill="none" stroke="url(#line1)" strokeWidth="0.5">
          <animate attributeName="d" dur="18s" repeatCount="indefinite" values="M0,520 Q300,460 700,550 T1400,500;M0,480 Q300,540 700,470 T1400,520;M0,520 Q300,460 700,550 T1400,500" />
        </path>
      </svg>

      {/* Soft ambient glow */}
      <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px]" />

      <div className="container-wide relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-wide">Start with advice. Scale with technology</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-foreground tracking-tight leading-[1.08] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Practical GRC Solutions
            </h1>

            <div className="mt-4 flex items-center gap-2 text-2xl md:text-3xl font-display font-bold animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <span className="text-muted-foreground">—</span>
              <span
                className={`inline-block gradient-text transition-all duration-400 ${
                  isAnimating ? "opacity-0 translate-y-3 blur-[2px]" : "opacity-100 translate-y-0 blur-0"
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>
            </div>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              A comprehensive GRC ecosystem that aligns people, processes, and technology to protect your organization and support sustainable growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
              <Button size="lg" onClick={onBookConsultation} className="glow-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                Explore Consulting Services
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onBookDemo} className="border-primary/30 hover:border-primary text-base px-8 h-12 active:scale-[0.97] transition-transform">
                <Play className="w-4 h-4 mr-1" />
                Explore the Platform
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
              {["SOC 2 Ready", "ISO 27001 Aligned", "NIST CSF", "PCI DSS"].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Image */}
          <div className="relative animate-fade-in-slow" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden glow-border shadow-2xl shadow-primary/10">
              <img
                src={heroDashboard}
                alt="CertifyGRC Compliance Dashboard"
                className="w-full h-auto animate-float"
                style={{ animationDuration: "8s" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent pointer-events-none" />
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
