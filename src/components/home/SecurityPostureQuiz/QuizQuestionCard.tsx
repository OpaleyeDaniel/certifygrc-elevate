import { motion } from "framer-motion";
import { ArrowLeft, Check, CircleDashed, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NIST_FUNCTION_LABEL, QUIZ_ANSWER_OPTIONS, type QuizAnswerValue, type QuizQuestion } from "@/data/securityQuizQuestions";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { cn } from "@/lib/utils";

const ANSWER_ICON: Record<QuizAnswerValue, typeof Check> = {
  Yes: Check,
  Partial: CircleDashed,
  No: X,
};

const ANSWER_TONE: Record<QuizAnswerValue, string> = {
  Yes: "#16A34A",
  Partial: "#D97706",
  No: "#DC2626",
};

interface QuizQuestionCardProps {
  question: QuizQuestion;
  index: number;
  total: number;
  selected?: QuizAnswerValue;
  onAnswer: (answer: QuizAnswerValue) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuizQuestionCard({
  question,
  index,
  total,
  selected,
  onAnswer,
  onBack,
  canGoBack,
}: QuizQuestionCardProps) {
  const percent = Math.round(((index + 1) / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full min-h-[560px] flex-col px-6 py-7 sm:min-h-[600px] sm:px-10 sm:py-9"
    >
      {/* Progress header */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{percent}%</span>
        </div>
        <Progress value={percent} className="mt-2 h-1.5" />
      </div>

      {/* Question body */}
      <div className="flex flex-1 flex-col justify-center py-8">
        <span
          className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
          style={{ background: `${BRAND_PRIMARY}14`, color: BRAND_PRIMARY }}
        >
          {NIST_FUNCTION_LABEL[question.function]} · {question.nistId}
        </span>
        <h3 className="font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {question.question}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{question.helper}</p>
      </div>

      {/* Answer options — 3 large tappable cards */}
      <div role="radiogroup" aria-label={question.question} className="grid gap-3 sm:grid-cols-3">
        {QUIZ_ANSWER_OPTIONS.map((opt) => {
          const Icon = ANSWER_ICON[opt.value];
          const tone = ANSWER_TONE[opt.value];
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onAnswer(opt.value)}
              className={cn(
                "group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-4 py-3.5 text-center transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                isSelected ? "shadow-sm" : "border-border/60 hover:border-border hover:bg-foreground/[0.02]",
              )}
              style={isSelected ? { borderColor: tone, background: `${tone}0f` } : undefined}
            >
              <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" style={{ color: isSelected ? tone : "hsl(var(--muted-foreground))" }} aria-hidden />
              <span className="text-sm font-bold text-foreground">{opt.label}</span>
              <span className="text-[11px] text-muted-foreground">{opt.helper}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-start">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back
        </button>
      </div>
    </motion.div>
  );
}
