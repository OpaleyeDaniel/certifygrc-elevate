import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const STEPS = ["Reviewing your answers", "Mapping to NIST CSF 2.0 functions", "Calculating your maturity profile"];

export default function QuizAnalyzing({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(onDone, reduceMotion ? 400 : 2400);
    return () => window.clearTimeout(t);
  }, [onDone, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full min-h-[560px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[600px]"
    >
      <motion.span
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: `${BRAND_PRIMARY}14` }}
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck className="h-7 w-7" style={{ color: BRAND_PRIMARY }} aria-hidden />
      </motion.span>

      <h3 className="font-display mt-5 text-xl font-bold text-foreground">Analyzing your security posture…</h3>

      <div className="mt-6 space-y-2.5 text-left">
        {STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25 + i * 0.5, duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND_PRIMARY }} aria-hidden />
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
