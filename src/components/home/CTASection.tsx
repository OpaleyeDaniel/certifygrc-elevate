import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { useMemo, useState } from "react";
import { slideInLeft, slideInRight, staggerGrid, revealUp, scrollViewport } from "@/lib/motion";

export default function CTASection() {
  const { openDemo, openConsultation } = useBooking();
  const [mode, setMode] = useState<"demo" | "consultation">("demo");

  const widget = useMemo(() => {
    if (mode === "consultation") {
      return {
        title: "Advisory planning session",
        subtitle: "Translate your compliance goals into a practical execution roadmap.",
        icon: Users,
        steps: [
          { label: "Framework mapping", hint: "Align priorities to controls and clauses" },
          { label: "Risk & governance", hint: "Define ownership, workflows, and accountability" },
          { label: "Delivery plan", hint: "Operationalize trust with measurable outcomes" },
        ],
        chips: ["Roadmap", "Risk posture", "Execution guidance"],
      };
    }
    return {
      title: "Live product walkthrough",
      subtitle: "See how CertifyGRC automates evidence mapping and framework coverage.",
      icon: LayoutDashboard,
      steps: [
        { label: "Connect frameworks", hint: "Map standards to controls and evidence" },
        { label: "Automate assessments", hint: "Track compliance gaps with clarity" },
        { label: "Generate audit-ready reporting", hint: "Keep documentation complete and defensible" },
      ],
      chips: ["Controls mapping", "Evidence mapping", "Audit readiness"],
    };
  }, [mode]);

  const WidgetIcon = widget.icon;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 110% 70% at 50% 110%, #1a1450 0%, #0c0a1f 50%, #020617 80%)",
      }}
    >
      {/* Dot matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(129,140,248,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 100%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 100%, black 20%, transparent 75%)",
        }}
      />
      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] opacity-[0.22]"
        style={{
          background: "radial-gradient(ellipse, rgba(48,92,222,1), transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-1/4 w-[400px] h-[350px] opacity-[0.12]"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,1), transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* Top fade from white */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent"
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Left copy */}
          <motion.div
            className="max-w-2xl"
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <motion.span
              variants={revealUp}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                background: "rgba(129,140,248,0.12)",
                border: "1px solid rgba(129,140,248,0.28)",
                color: "#a5b4fc",
              }}
            >
              Get started today
            </motion.span>
            <motion.h2
              variants={slideInLeft}
              className="font-display font-bold text-display-lg text-white mb-4"
            >
              Ready to simplify your{" "}
              <span className="gradient-text">compliance?</span>
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="text-body-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Join organizations that trust CertifyGRC to navigate the complexities of governance,
              risk, and compliance.
            </motion.p>

            <motion.div variants={revealUp} className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="px-7 group font-semibold"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                  boxShadow: "0 0 32px rgba(48,92,222,0.42), 0 4px 16px rgba(0,0,0,0.35)",
                }}
                onClick={() => { setMode("demo"); openDemo(); }}
              >
                Book a Demo{" "}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-7 font-semibold hover:-translate-y-0.5 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => { setMode("consultation"); openConsultation(); }}
              >
                Book consultation
              </Button>
            </motion.div>

            <motion.div variants={revealUp} className="mt-6 flex flex-wrap gap-2">
              {widget.chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  {c}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right widget */}
          <motion.div
            className="relative"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <div className="rounded-[1.5rem] overflow-hidden transition-transform duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset" }}>
              <div className="p-4 flex items-center justify-between gap-3 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/12 to-accent/8 border border-primary/15 flex items-center justify-center flex-shrink-0">
                    <WidgetIcon className="w-4.5 h-4.5 text-primary" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.42)" }}>Scheduler</div>
                    <div className="font-display font-bold text-sm text-white truncate">{widget.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(["demo", "consultation"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={[
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                        mode === m
                          ? "bg-primary/20 text-primary border border-primary/30 shadow-sm"
                          : "hover:text-white",
                      ].join(" ")}
                      style={{ color: mode === m ? undefined : "rgba(255,255,255,0.55)" }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden mb-4">
                  <div className="aspect-[16/9] relative">
                    <img
                      src="/home-cta-mockup/frameworks.png"
                      alt="CertifyGRC dashboard"
                      className="w-full h-full object-cover object-center motion-safe:animate-float motion-reduce:animate-none"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-primary/5 pointer-events-none" />
                    <div
                      className={[
                        "absolute left-3 top-3 w-[55%] rounded-xl border border-white/60 bg-white/90 backdrop-blur-sm overflow-hidden shadow-card",
                        "transition-all duration-500",
                        mode === "demo" ? "opacity-100 translate-y-0" : "opacity-80 translate-y-1",
                      ].join(" ")}
                    >
                      <img src="/home-cta-mockup/table.png" alt="Compliance table" className="w-full h-full object-cover object-center" loading="lazy" draggable={false} />
                    </div>
                    <div
                      className={[
                        "absolute right-3 bottom-3 w-[58%] rounded-xl border border-white/60 bg-white/90 backdrop-blur-sm overflow-hidden shadow-card",
                        "transition-all duration-500",
                        mode === "consultation" ? "opacity-100 translate-y-0" : "opacity-75 translate-y-1",
                      ].join(" ")}
                    >
                      <img src="/home-cta-mockup/doc-overview.png" alt="Document overview" className="w-full h-full object-cover object-center" loading="lazy" draggable={false} />
                    </div>
                    <div className="absolute left-3 bottom-3 right-3 pointer-events-none">
                      <div className="rounded-lg border border-white/60 bg-white/90 backdrop-blur-sm p-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">CertifyGRC</div>
                            <div className="font-display font-bold text-xs text-foreground">Compliance Platform</div>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/12 to-accent/8 border border-primary/15 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-primary" strokeWidth={1.8} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {widget.steps.map((s, idx) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 transition-all"
                      style={{
                        background: idx === 0 ? "rgba(48,92,222,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${idx === 0 ? "rgba(48,92,222,0.3)" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: "rgba(48,92,222,0.2)", border: "1px solid rgba(48,92,222,0.3)", color: "#a5b4fc" }}>
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-xs text-white">{s.label}</div>
                          <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{s.hint}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Button
                    size="lg"
                    className="w-full font-semibold"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                      boxShadow: "0 0 20px rgba(48,92,222,0.35), 0 4px 12px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => { if (mode === "demo") openDemo(); else openConsultation(); }}
                  >
                    {mode === "demo" ? "Book a demo" : "Book consultation"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
