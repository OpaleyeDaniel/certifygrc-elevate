import { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

interface HeroSectionProps {
  onBookDemo: () => void;
  onBookConsultation: () => void;
}

const rotatingWords = ["Simplified", "Intelligent", "Secure", "Automated", "Scalable"];

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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Flowing lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,200 Q400,100 800,250 T1600,200" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
          <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,200 Q400,100 800,250 T1600,200;M0,250 Q400,180 800,150 T1600,250;M0,200 Q400,100 800,250 T1600,200" />
        </path>
        <path d="M0,400 Q400,300 800,450 T1600,400" fill="none" stroke="hsl(var(--accent))" strokeWidth="1">
          <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,400 Q400,300 800,450 T1600,400;M0,350 Q400,450 800,350 T1600,350;M0,400 Q400,300 800,450 T1600,400" />
        </path>
      </svg>

      <div className="container-wide relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-wide">Enterprise GRC Platform</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-foreground tracking-tight leading-[1.08] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Smarter Governance.{" "}
              <span className="gradient-text">Safer Decisions.</span>
            </h1>

            <div className="mt-5 flex items-center gap-2 text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <span>Practical GRC Solutions —</span>
              <span
                className={`inline-block font-semibold text-primary transition-all duration-400 ${
                  isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>
            </div>

            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              CertifyGRC delivers an integrated ecosystem of GRC software, expert consulting, and professional training — purpose-built to help regulated organizations simplify compliance, manage risk, and drive governance excellence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
              <Button size="lg" onClick={onBookDemo} className="glow-primary text-base px-8 h-12">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onBookConsultation} className="border-primary/30 hover:border-primary text-base px-8 h-12">
                <Play className="w-4 h-4 mr-1" />
                Book Consultation
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
              {["SOC 2 Ready", "ISO 27001 Aligned", "NIST CSF"].map((badge) => (
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
              {/* Glare overlay */}
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
