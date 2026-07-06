/**
 * Pure scoring logic for the landing-page Security Posture Quiz.
 *
 * Mirrors the semantics of the main CertifyGRC platform's NIST CSF 2.0
 * assessment model (Yes/Partial/No answers, maturity 1–5, gap = Partial/No),
 * simplified for a 16-question lead-magnet sample instead of the full
 * 106-control assessment. Kept as pure, unit-testable functions — no React,
 * no side effects — so the math can be verified independently of the UI.
 */
import {
  NIST_FUNCTION_CODE,
  NIST_FUNCTION_LABEL,
  NIST_FUNCTIONS,
  QUIZ_QUESTIONS,
  type NistFunction,
  type QuizAnswerValue,
  type QuizQuestion,
} from "@/data/securityQuizQuestions";

export interface AssessmentAnswer {
  nistId: string;
  answer: QuizAnswerValue;
}

/** Answer → maturity points (1–3 scale for this sample quiz; the full
 *  platform additionally supports 4 Managed / 5 Optimizing for mature Yes
 *  answers backed by evidence, which this short quiz doesn't collect). */
export const ANSWER_SCORES: Record<QuizAnswerValue, number> = {
  Yes: 3,
  Partial: 2,
  No: 1,
};

/** Gap = Partial or No (maturity < 3), same definition used platform-wide. */
export function isGap(answer: QuizAnswerValue): boolean {
  return answer === "Partial" || answer === "No";
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Overall maturity on a 1.0–5.0 display scale (this quiz's answers only
 *  ever produce 1–3, same as the platform's Yes/Partial/No mapping). */
export function overallMaturity(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const sum = answers.reduce((acc, a) => acc + ANSWER_SCORES[a.answer], 0);
  return round1(sum / answers.length);
}

export function totalGaps(answers: AssessmentAnswer[]): number {
  return answers.filter((a) => isGap(a.answer)).length;
}

/** Percentage of answered questions that are gaps, rounded to a whole number. */
export function gapRate(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  return Math.round((totalGaps(answers) / answers.length) * 100);
}

/** Simplified proxy for the platform's `approved controls / total controls`
 *  audit-readiness metric — NOT the full formula, just a quick estimate
 *  based on how many answers were a clean "Yes". */
export function estimatedReadiness(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const yesCount = answers.filter((a) => a.answer === "Yes").length;
  return Math.round((yesCount / answers.length) * 100);
}

export interface FunctionScore {
  function: NistFunction;
  label: string;
  code: string;
  avgScore: number;
  gapCount: number;
  totalCount: number;
}

/** Per-function breakdown across all 6 NIST CSF functions. Functions with no
 *  answered questions in this sample still appear, with avgScore 0, so the
 *  chart always shows all 6 bars. */
export function functionScores(
  answers: AssessmentAnswer[],
  questions: QuizQuestion[] = QUIZ_QUESTIONS,
): FunctionScore[] {
  const byId = new Map(questions.map((q) => [q.nistId, q]));

  return NIST_FUNCTIONS.map((fn) => {
    const scoresForFn = answers
      .map((a) => ({ q: byId.get(a.nistId), answer: a.answer }))
      .filter((x): x is { q: QuizQuestion; answer: QuizAnswerValue } => x.q?.function === fn);

    const totalCount = scoresForFn.length;
    const avgScore =
      totalCount === 0 ? 0 : round1(scoresForFn.reduce((acc, x) => acc + ANSWER_SCORES[x.answer], 0) / totalCount);
    const gapCount = scoresForFn.filter((x) => isGap(x.answer)).length;

    return {
      function: fn,
      label: NIST_FUNCTION_LABEL[fn],
      code: NIST_FUNCTION_CODE[fn],
      avgScore,
      gapCount,
      totalCount,
    };
  });
}

/** Lowest-scoring functions (only those with at least one answered
 *  question) — shown as "Priority focus areas" in the results screen. */
export function weakestFunctions(scores: FunctionScore[], count = 3): FunctionScore[] {
  return scores
    .filter((s) => s.totalCount > 0)
    .slice()
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, count);
}

export interface PostureProfile {
  label: string;
  description: string;
  color: "red" | "amber" | "blue" | "emerald" | "green";
}

/** "Personality test"-style posture label, keyed off overall maturity. */
export function getPostureProfile(avg: number): PostureProfile {
  if (avg < 1.75) {
    return {
      label: "Reactive",
      description: "Security practices are largely ad hoc. Significant gaps exist across core controls.",
      color: "red",
    };
  }
  if (avg < 2.5) {
    return {
      label: "Developing",
      description: "Some controls exist but implementation is inconsistent. Priority remediation needed.",
      color: "amber",
    };
  }
  if (avg < 3.25) {
    return {
      label: "Defined",
      description: "Foundational controls are in place. Focus on consistency, evidence, and audit readiness.",
      color: "blue",
    };
  }
  if (avg < 4.0) {
    return {
      label: "Managed",
      description: "Strong program with measurable controls. Optimize gaps in weaker functions.",
      color: "emerald",
    };
  }
  return {
    label: "Optimizing",
    description: "Mature security posture. Continuous improvement and auditor-ready documentation.",
    color: "green",
  };
}

export interface TopGapItem {
  nistId: string;
  function: NistFunction;
  question: string;
  answer: QuizAnswerValue;
  remediation: string;
}

/** Up to `limit` answered-Partial/No questions, worst ("No") first, each
 *  with a one-sentence plain-English remediation hint. */
export function topGaps(
  answers: AssessmentAnswer[],
  questions: QuizQuestion[] = QUIZ_QUESTIONS,
  limit = 5,
): TopGapItem[] {
  const byId = new Map(questions.map((q) => [q.nistId, q]));
  const severity: Record<QuizAnswerValue, number> = { No: 0, Partial: 1, Yes: 2 };

  return answers
    .filter((a) => isGap(a.answer))
    .map((a) => {
      const q = byId.get(a.nistId);
      if (!q) return null;
      return {
        nistId: q.nistId,
        function: q.function,
        question: q.question,
        answer: a.answer,
        remediation: q.remediation,
      } satisfies TopGapItem;
    })
    .filter((x): x is TopGapItem => x !== null)
    .sort((a, b) => severity[a.answer] - severity[b.answer])
    .slice(0, limit);
}

export interface AssessmentSummary {
  overallMaturity: number;
  totalGaps: number;
  gapRate: number;
  estimatedReadiness: number;
  postureProfile: PostureProfile;
  functionBreakdown: FunctionScore[];
  weakestFunctions: FunctionScore[];
  topGaps: TopGapItem[];
}

/** Convenience: computes every derived value in one call for the results screen + lead payload. */
export function summarizeAssessment(
  answers: AssessmentAnswer[],
  questions: QuizQuestion[] = QUIZ_QUESTIONS,
): AssessmentSummary {
  const maturity = overallMaturity(answers);
  const scores = functionScores(answers, questions);
  return {
    overallMaturity: maturity,
    totalGaps: totalGaps(answers),
    gapRate: gapRate(answers),
    estimatedReadiness: estimatedReadiness(answers),
    postureProfile: getPostureProfile(maturity),
    functionBreakdown: scores,
    weakestFunctions: weakestFunctions(scores),
    topGaps: topGaps(answers, questions),
  };
}
