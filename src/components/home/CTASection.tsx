import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { useMemo, useState } from "react";
import { slideInLeft, slideInRight, staggerContainer, revealUp, scrollViewport } from "@/lib/motion";

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
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Left copy */}
          <motion.div
            className="max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <motion.h2
              variants={slideInLeft}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-4"
            >
              Ready to simplify your{" "}
              <span className="gradient-text">compliance?</span>
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Join organizations that trust CertifyGRC to navigate the complexities of governance,
              risk, and compliance.
            </motion.p>

            <motion.div variants={revealUp} className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="glow-primary text-base px-8 group"
                onClick={() => { setMode("demo"); openDemo(); }}
              >
                Book a Demo{" "}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:border-primary text-base px-8"
                onClick={() => { setMode("consultation"); openConsultation(); }}
              >
                Book Consultation
              </Button>
            </motion.div>

            <motion.div variants={revealUp} className="mt-7 flex flex-wrap gap-2">
              {widget.chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-background/70 border border-white/10 text-foreground"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
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
            <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-12 -left-10 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="rounded-[1.6rem] border border-border/60 bg-card/35 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-0.5">
              <div className="p-4 md:p-5 border-b border-border/40 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <WidgetIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Mock Scheduler</div>
                    <div className="font-display font-bold text-foreground truncate">{widget.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1 border border-border/40">
                  <button
                    type="button"
                    onClick={() => setMode("demo")}
                    className={[
                      "px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all",
                      mode === "demo"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                    aria-label="Switch to demo"
                  >
                    Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("consultation")}
                    className={[
                      "px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all",
                      mode === "consultation"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                    aria-label="Switch to consultation"
                  >
                    Consultation
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="rounded-2xl border border-border/60 bg-background/30 overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <div className="absolute inset-0">
                      <img
                        src="/home-cta-mockup/frameworks.png"
                        alt="CertifyGRC dashboards composite background"
                        className="w-full h-full object-cover object-center motion-safe:animate-float motion-reduce:animate-none"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-transparent to-primary/10 pointer-events-none" />

                    <div
                      className={[
                        "absolute left-3 top-3 w-[58%] md:w-[60%] rounded-2xl border border-white/10 bg-background/70 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/10",
                        "transition-all duration-500",
                        mode === "demo" ? "opacity-100 translate-y-0" : "opacity-90 translate-y-1",
                      ].join(" ")}
                    >
                      <img
                        src="/home-cta-mockup/table.png"
                        alt="Compliance table overlay"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    <div
                      className={[
                        "absolute right-3 bottom-3 w-[62%] rounded-2xl border border-white/10 bg-background/70 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/10",
                        "transition-all duration-500",
                        mode === "consultation" ? "opacity-100 translate-y-0" : "opacity-85 translate-y-1",
                      ].join(" ")}
                    >
                      <img
                        src="/home-cta-mockup/doc-overview.png"
                        alt="Document overview overlay"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    <div className="absolute left-3 bottom-3 right-3 pointer-events-none">
                      <div className="rounded-xl border border-white/10 bg-background/70 backdrop-blur-sm p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Book Consultation</div>
                            <div className="font-display font-bold text-foreground mt-1">CertifyGRC</div>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    What happens next
                  </div>
                  <div className="space-y-2">
                    {widget.steps.map((s, idx) => (
                      <div
                        key={s.label}
                        className={[
                          "rounded-xl border border-border/50 bg-card/40 p-3 transition-all",
                          idx === 0 ? "ring-1 ring-primary/20" : "hover:border-primary/25 hover:bg-card/50",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">{s.label}</div>
                            <div className="text-sm text-muted-foreground mt-0.5">{s.hint}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    size="lg"
                    className="glow-primary w-full"
                    onClick={() => { if (mode === "demo") openDemo(); else openConsultation(); }}
                  >
                    {mode === "demo" ? "Book a Demo" : "Book Consultation"}
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
