import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollEase, scrollViewport } from "@/lib/motion";

type ApplicationClosingCTAProps = {
  onBookDemo?: () => void;
};

const ease = scrollEase;

export default function ApplicationClosingCTA({ onBookDemo }: ApplicationClosingCTAProps) {
  return (
    <section className="section-padding pt-8 pb-16 md:pb-20">
      <div className="container-wide">
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] px-6 py-14 sm:px-10 sm:py-16 md:rounded-[2rem] md:px-12 md:py-20 lg:py-24",
            "bg-[linear-gradient(145deg,#eef6ff_0%,#e3f0ff_38%,#dcecff_100%)]",
            "shadow-[0_24px_80px_-32px_rgba(48,92,222,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]",
            "dark:bg-[linear-gradient(145deg,hsl(225,42%,11%)_0%,hsl(225,38%,9%)_45%,hsl(222,47%,7%)_100%)]",
            "dark:shadow-[0_24px_80px_-32px_rgba(48,92,222,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]",
          )}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.7, ease }}
        >
          {/* Grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(48,92,222,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(48,92,222,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Dot overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(48,92,222,0.14) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Soft diamond accents */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-[18%] h-16 w-16 rotate-45 rounded-lg border border-indigo-200/40 bg-white/30 dark:border-white/10 dark:bg-white/[0.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[22%] right-[12%] h-12 w-12 rotate-12 rounded-md border border-indigo-200/35 bg-white/25 dark:border-white/10 dark:bg-white/[0.03]"
          />

          {/* Floating UI cards — flush to top / bottom edges */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden w-[min(42%,220px)] md:block lg:w-[240px]"
            initial={{ opacity: 0, x: -20, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={scrollViewport}
            transition={{ duration: 0.75, ease, delay: 0.15 }}
          >
            <img
              src="/application-cta/progress-card.png"
              alt=""
              className="w-full translate-y-[2px] drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-[1] hidden w-[min(42%,220px)] md:block lg:w-[230px]"
            initial={{ opacity: 0, x: 20, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 5 }}
            viewport={scrollViewport}
            transition={{ duration: 0.75, ease, delay: 0.22 }}
          >
            <img
              src="/application-cta/onboarding-card.png"
              alt=""
              className="w-full -translate-y-[2px] drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </motion.div>

          {/* Center copy */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.p
              className="text-sm font-semibold tracking-wide text-[#6366f1] md:text-base dark:text-primary"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.55, ease }}
            >
              Why CertifyGRC
            </motion.p>

            <motion.h2
              className="mt-3 font-display text-[clamp(1.75rem,4vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#1e3a8a] dark:text-white"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
            >
              Compliance management made easier
            </motion.h2>

            <motion.p
              className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 md:text-base dark:text-white/70"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              Digitise the work that protects your organisation. CertifyGRC brings together
              framework mapping, control monitoring, evidence collection, and audit reporting —
              with secure, searchable records and exports ready for reviewers.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold shadow-[0_12px_32px_-8px_rgba(99,102,241,0.55)] dark:shadow-[0_12px_32px_-8px_rgba(48,92,222,0.55)]"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                }}
              >
                <a href="#waitlist">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              {onBookDemo ? (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={onBookDemo}
                  className="h-12 rounded-full border-slate-300/80 bg-white/70 px-8 text-base font-semibold text-slate-700 hover:bg-white dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                >
                  Book a demo
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-slate-300/80 bg-white/70 px-8 text-base font-semibold text-slate-700 hover:bg-white dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                >
                  <Link to="/contact">Talk with an advisor</Link>
                </Button>
              )}
            </motion.div>

            <motion.p
              className="mt-5 text-xs text-slate-500 md:text-sm dark:text-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Built for regulated teams shipping under scrutiny
            </motion.p>
          </div>

          {/* Mobile card strip */}
          <div className="relative z-10 mt-10 flex justify-center gap-4 md:hidden">
            <img
              src="/application-cta/progress-card.png"
              alt="Training and compliance progress tracking"
              className="w-[44%] max-w-[160px] -rotate-3 drop-shadow-lg"
              draggable={false}
            />
            <img
              src="/application-cta/onboarding-card.png"
              alt="Structured onboarding workflow"
              className="w-[44%] max-w-[160px] rotate-2 drop-shadow-lg"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
