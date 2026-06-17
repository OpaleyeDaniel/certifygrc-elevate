import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Shield } from "lucide-react";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";
import { revealUp, scrollEase, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ease = [...scrollEase] as [number, number, number, number];

export default function EarlyAccessPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Early access assessment | CertifyGRC";
    return () => {
      document.title = "CertifyGRC | Smarter Governance, Safer Decisions";
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-primary/8 blur-3xl md:right-[10%]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-cyan-500/6 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.div variants={revealUp} className="mb-6 flex justify-center">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5",
                "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
              )}
            >
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Early access
            </span>
          </motion.div>

          <motion.h1
            variants={revealUp}
            className="font-display font-bold tracking-tight text-foreground text-display-md md:text-display-lg"
          >
            Compliance readiness &amp; access request
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Tell us about your organization&apos;s priorities so we can prepare the right onboarding path,
            timing, and follow-up. This short assessment helps us understand fit for early access no
            obligation.
          </motion.p>

          <motion.div
            variants={revealUp}
            className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3 text-left text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-4 py-2.5 shadow-sm backdrop-blur-sm">
              <ClipboardCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>About two minutes · Encrypted submission</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: reduceMotion ? 0 : 0.2 }}
        >
          <div
            className="rounded-[1.35rem] p-6 sm:p-8 md:p-10 md:px-12"
            style={{ background: "linear-gradient(145deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px -12px rgba(99,102,241,0.2)" }}
          >
            <PartnerApplicationForm variant="earlyAccess" />
          </div>
        </motion.div>

        <motion.p
          className="mx-auto mt-10 max-w-lg text-center text-sm leading-relaxed text-muted-foreground"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.45 }}
        >
          We review every submission carefully and respond with next steps. If you need help sooner, contact{" "}
          <a href="mailto:info@certifygrc.com" className="font-medium text-primary hover:underline">
            info@certifygrc.com
          </a>
          .
        </motion.p>
      </div>
    </div>
  );
}
