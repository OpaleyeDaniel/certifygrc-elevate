import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import QuizLaptopFrame from "./QuizLaptopFrame";
import QuizIntro from "./QuizIntro";
import QuizQuestionCard from "./QuizQuestionCard";
import QuizAnalyzing from "./QuizAnalyzing";
import EmailGate, { type EmailGateSubmitValues } from "./EmailGate";
import QuizResults from "./QuizResults";
import { QUIZ_QUESTIONS, QUIZ_TOTAL_QUESTIONS, type QuizAnswerValue } from "@/data/securityQuizQuestions";
import { summarizeAssessment, type AssessmentAnswer } from "@/lib/securityQuizScoring";
import { assessmentLeadSchema } from "@/lib/assessmentLeadSchema";
import { submitAssessmentLead } from "@/lib/assessmentSubmit";

/**
 * State machine: intro -> question (x16) -> analyzing -> gated -> results.
 * In-progress answers persist to sessionStorage so a refresh mid-quiz doesn't
 * lose progress; cleared once results are unlocked. This is a frontend-only
 * marketing lead magnet — it never talks to the main CertifyGRC platform.
 */

const SESSION_KEY = "certifygrc-quiz-progress";

type Stage = "intro" | "question" | "analyzing" | "gated" | "results";

interface PersistedState {
  answers: AssessmentAnswer[];
  currentIndex: number;
}

interface QuizState extends PersistedState {
  stage: Stage;
  submitStatus: "idle" | "loading" | "error";
  submitError?: string;
}

type QuizAction =
  | { type: "HYDRATE"; payload: PersistedState }
  | { type: "START" }
  | { type: "ANSWER"; nistId: string; answer: QuizAnswerValue }
  | { type: "BACK" }
  | { type: "ANALYSIS_DONE" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "RESTART" };

function initState(): QuizState {
  return { stage: "intro", answers: [], currentIndex: 0, submitStatus: "idle" };
}

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "HYDRATE": {
      if (action.payload.answers.length === 0) return state;
      const clampedIndex = Math.min(Math.max(action.payload.currentIndex, 0), QUIZ_TOTAL_QUESTIONS - 1);
      return { ...state, answers: action.payload.answers, currentIndex: clampedIndex, stage: "question" };
    }
    case "START":
      return { ...state, stage: "question" };
    case "ANSWER": {
      const nextAnswers = state.answers
        .filter((a) => a.nistId !== action.nistId)
        .concat({ nistId: action.nistId, answer: action.answer });
      const isLast = state.currentIndex >= QUIZ_TOTAL_QUESTIONS - 1;
      return {
        ...state,
        answers: nextAnswers,
        currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
        stage: isLast ? "analyzing" : "question",
      };
    }
    case "BACK":
      return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) };
    case "ANALYSIS_DONE":
      return { ...state, stage: "gated" };
    case "SUBMIT_START":
      return { ...state, submitStatus: "loading", submitError: undefined };
    case "SUBMIT_ERROR":
      return { ...state, submitStatus: "error", submitError: action.error };
    case "SUBMIT_SUCCESS":
      return { ...state, submitStatus: "idle", stage: "results" };
    case "RESTART":
      return initState();
    default:
      return state;
  }
}

export default function SecurityPostureQuiz() {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (Array.isArray(parsed.answers) && parsed.answers.length > 0) {
        dispatch({
          type: "HYDRATE",
          payload: { answers: parsed.answers, currentIndex: parsed.currentIndex ?? parsed.answers.length },
        });
      }
    } catch {
      /* ignore corrupt sessionStorage */
    }
  }, []);

  useEffect(() => {
    if (state.stage === "results") {
      try {
        window.sessionStorage.removeItem(SESSION_KEY);
      } catch {
        /* ignore */
      }
      return;
    }
    if (state.answers.length === 0) return;
    try {
      const payload: PersistedState = { answers: state.answers, currentIndex: state.currentIndex };
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable (private browsing, etc.) */
    }
  }, [state.answers, state.currentIndex, state.stage]);

  const summary = useMemo(() => summarizeAssessment(state.answers), [state.answers]);

  const currentQuestion = QUIZ_QUESTIONS[state.currentIndex];
  const selectedForCurrent = state.answers.find((a) => a.nistId === currentQuestion?.nistId)?.answer;

  const handleAnswer = useCallback(
    (answer: QuizAnswerValue) => {
      if (!currentQuestion) return;
      dispatch({ type: "ANSWER", nistId: currentQuestion.nistId, answer });
    },
    [currentQuestion],
  );

  const handleGateSubmit = useCallback(
    async (values: EmailGateSubmitValues) => {
      dispatch({ type: "SUBMIT_START" });

      const payload = {
        email: values.email,
        companyName: values.companyName || undefined,
        jobTitle: values.jobTitle,
        source: "landing-security-quiz" as const,
        completedAt: new Date().toISOString(),
        results: {
          overallMaturity: summary.overallMaturity,
          postureProfile: summary.postureProfile.label,
          totalGaps: summary.totalGaps,
          gapRate: summary.gapRate,
          estimatedReadiness: summary.estimatedReadiness,
          functionBreakdown: Object.fromEntries(summary.functionBreakdown.map((f) => [f.label, f.avgScore])),
          topGaps: summary.topGaps.map((g) => ({ nistId: g.nistId, question: g.question, answer: g.answer })),
          answers: state.answers,
        },
        consentMarketing: values.consentMarketing,
        _gotcha: values._gotcha,
      };

      const parsed = assessmentLeadSchema.safeParse(payload);
      if (!parsed.success) {
        dispatch({
          type: "SUBMIT_ERROR",
          error: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
        });
        return;
      }

      const result = await submitAssessmentLead(payload);
      if (!result.ok) {
        // Never block the UX on a mail/webhook failure — still reveal results,
        // just log it so it's visible in dev tools / server logs.
        console.warn("[security-posture-quiz] lead submission failed, revealing results anyway:", result.error);
      }
      dispatch({ type: "SUBMIT_SUCCESS" });
    },
    [summary, state.answers],
  );

  return (
    <QuizLaptopFrame>
      <AnimatePresence mode="wait">
        {state.stage === "intro" && <QuizIntro key="intro" onStart={() => dispatch({ type: "START" })} />}

        {state.stage === "question" && currentQuestion && (
          <QuizQuestionCard
            key={`question-${currentQuestion.nistId}`}
            question={currentQuestion}
            index={state.currentIndex}
            total={QUIZ_TOTAL_QUESTIONS}
            selected={selectedForCurrent}
            onAnswer={handleAnswer}
            onBack={() => dispatch({ type: "BACK" })}
            canGoBack={state.currentIndex > 0}
          />
        )}

        {state.stage === "analyzing" && (
          <QuizAnalyzing key="analyzing" onDone={() => dispatch({ type: "ANALYSIS_DONE" })} />
        )}

        {state.stage === "gated" && (
          <EmailGate
            key="gated"
            summary={summary}
            status={state.submitStatus}
            error={state.submitError}
            onSubmit={handleGateSubmit}
          />
        )}

        {state.stage === "results" && (
          <QuizResults key="results" summary={summary} onRestart={() => dispatch({ type: "RESTART" })} />
        )}
      </AnimatePresence>
    </QuizLaptopFrame>
  );
}
