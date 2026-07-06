import { motion } from "framer-motion";
import { ArrowRight, Clock3, ShieldQuestion, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { QUIZ_TOTAL_QUESTIONS } from "@/data/securityQuizQuestions";

const POINTS = [
  { icon: ShieldQuestion, text: "Aligned to NIST CSF 2.0 — Govern, Identify, Protect, Detect, Respond, Recover" },
  { icon: Clock3, text: `${QUIZ_TOTAL_QUESTIONS} quick questions, about 3 minutes` },
  { icon: Sparkles, text: "Get an instant maturity profile and gap summary" },
];

export default function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="flex h-full min-h-[560px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[600px] sm:px-12"
    >
      <span
        className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ background: `${BRAND_PRIMARY}14`, border: `1px solid ${BRAND_PRIMARY}30`, color: BRAND_PRIMARY }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND_PRIMARY }} aria-hidden />
        Free Security Posture Quiz
      </span>

      <h3 className="font-display max-w-md text-2xl font-bold leading-snug text-foreground sm:text-3xl">
        How mature is your security program?
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        Answer {QUIZ_TOTAL_QUESTIONS} quick questions aligned to NIST CSF 2.0 and get a personalized maturity
        profile and gap summary — free.
      </p>

      <div className="mt-7 flex w-full max-w-xs flex-col gap-3 text-left">
        {POINTS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-start gap-2.5 text-xs text-foreground/80 sm:text-sm">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${BRAND_PRIMARY}14` }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: BRAND_PRIMARY }} aria-hidden />
            </span>
            <span className="leading-snug">{text}</span>
          </div>
        ))}
      </div>

      <Button onClick={onStart} size="lg" className="group mt-8 min-h-[44px] px-7 glow-primary">
        Take the quiz
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Button>

      <p className="mt-4 text-[11px] text-muted-foreground">No login required. Results delivered to your inbox.</p>
    </motion.div>
  );
}
