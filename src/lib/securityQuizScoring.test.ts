import { describe, it, expect } from "vitest";
import { QUIZ_QUESTIONS } from "@/data/securityQuizQuestions";
import {
  ANSWER_SCORES,
  isGap,
  overallMaturity,
  totalGaps,
  gapRate,
  estimatedReadiness,
  functionScores,
  weakestFunctions,
  getPostureProfile,
  topGaps,
  summarizeAssessment,
  type AssessmentAnswer,
} from "./securityQuizScoring";

const allYes: AssessmentAnswer[] = QUIZ_QUESTIONS.map((q) => ({ nistId: q.nistId, answer: "Yes" }));
const allNo: AssessmentAnswer[] = QUIZ_QUESTIONS.map((q) => ({ nistId: q.nistId, answer: "No" }));
const allPartial: AssessmentAnswer[] = QUIZ_QUESTIONS.map((q) => ({ nistId: q.nistId, answer: "Partial" }));

describe("ANSWER_SCORES / isGap", () => {
  it("maps answers to the documented maturity points", () => {
    expect(ANSWER_SCORES.Yes).toBe(3);
    expect(ANSWER_SCORES.Partial).toBe(2);
    expect(ANSWER_SCORES.No).toBe(1);
  });

  it("treats Partial and No as gaps, Yes as not a gap", () => {
    expect(isGap("Yes")).toBe(false);
    expect(isGap("Partial")).toBe(true);
    expect(isGap("No")).toBe(true);
  });
});

describe("overallMaturity", () => {
  it("returns 0 for no answers", () => {
    expect(overallMaturity([])).toBe(0);
  });

  it("returns 3 when every answer is Yes", () => {
    expect(overallMaturity(allYes)).toBe(3);
  });

  it("returns 1 when every answer is No", () => {
    expect(overallMaturity(allNo)).toBe(1);
  });

  it("averages a mix of answers correctly, rounded to 1 decimal for display", () => {
    const mix: AssessmentAnswer[] = [
      { nistId: "a", answer: "Yes" }, // 3
      { nistId: "b", answer: "Partial" }, // 2
      { nistId: "c", answer: "No" }, // 1
      { nistId: "d", answer: "No" }, // 1
    ];
    // (3+2+1+1)/4 = 1.75, rounded to 1 decimal place (half rounds up) = 1.8
    expect(overallMaturity(mix)).toBe(1.8);
  });
});

describe("totalGaps / gapRate", () => {
  it("counts zero gaps when everything is Yes", () => {
    expect(totalGaps(allYes)).toBe(0);
    expect(gapRate(allYes)).toBe(0);
  });

  it("counts every question as a gap when everything is Partial or No", () => {
    expect(totalGaps(allPartial)).toBe(QUIZ_QUESTIONS.length);
    expect(gapRate(allPartial)).toBe(100);
    expect(totalGaps(allNo)).toBe(QUIZ_QUESTIONS.length);
  });

  it("computes a partial gap rate correctly", () => {
    const answers: AssessmentAnswer[] = [
      { nistId: "a", answer: "Yes" },
      { nistId: "b", answer: "No" },
      { nistId: "c", answer: "Yes" },
      { nistId: "d", answer: "Partial" },
    ];
    // 2 gaps / 4 = 50%
    expect(totalGaps(answers)).toBe(2);
    expect(gapRate(answers)).toBe(50);
  });

  it("returns 0 for an empty answer set instead of NaN", () => {
    expect(gapRate([])).toBe(0);
  });
});

describe("estimatedReadiness", () => {
  it("is 100 when every answer is Yes", () => {
    expect(estimatedReadiness(allYes)).toBe(100);
  });

  it("is 0 when no answer is Yes", () => {
    expect(estimatedReadiness(allNo)).toBe(0);
    expect(estimatedReadiness(allPartial)).toBe(0);
  });

  it("is 0 for an empty answer set instead of NaN", () => {
    expect(estimatedReadiness([])).toBe(0);
  });
});

describe("functionScores", () => {
  it("always returns all 6 NIST functions, even with zero answers", () => {
    const scores = functionScores([]);
    expect(scores).toHaveLength(6);
    expect(scores.map((s) => s.function)).toEqual([
      "GOVERN",
      "IDENTIFY",
      "PROTECT",
      "DETECT",
      "RESPOND",
      "RECOVER",
    ]);
    expect(scores.every((s) => s.avgScore === 0 && s.totalCount === 0)).toBe(true);
  });

  it("buckets questions by their function and averages correctly", () => {
    const scores = functionScores(allYes);
    for (const s of scores) {
      expect(s.avgScore).toBe(3);
      expect(s.gapCount).toBe(0);
      expect(s.totalCount).toBeGreaterThan(0);
    }
    const total = scores.reduce((acc, s) => acc + s.totalCount, 0);
    expect(total).toBe(QUIZ_QUESTIONS.length);
  });

  it("counts gaps per function", () => {
    const scores = functionScores(allNo);
    for (const s of scores) {
      expect(s.gapCount).toBe(s.totalCount);
    }
  });
});

describe("weakestFunctions", () => {
  it("excludes functions with no answered questions", () => {
    const partial = functionScores([{ nistId: "GV.OC-01", answer: "No" }]);
    const weakest = weakestFunctions(partial, 3);
    expect(weakest.every((s) => s.totalCount > 0)).toBe(true);
    expect(weakest).toHaveLength(1);
  });

  it("sorts ascending by average score (worst first)", () => {
    const scores = functionScores(allYes);
    // Manually depress GOVERN's score by overriding one entry's avgScore via a mixed answer set instead.
    const mixed = [
      ...QUIZ_QUESTIONS.filter((q) => q.function === "GOVERN").map((q) => ({ nistId: q.nistId, answer: "No" as const })),
      ...QUIZ_QUESTIONS.filter((q) => q.function !== "GOVERN").map((q) => ({ nistId: q.nistId, answer: "Yes" as const })),
    ];
    const weakest = weakestFunctions(functionScores(mixed), 1);
    expect(weakest[0].function).toBe("GOVERN");
    expect(scores.length).toBeGreaterThan(0); // sanity, keeps `scores` referenced
  });
});

describe("getPostureProfile", () => {
  it("labels the full range correctly", () => {
    expect(getPostureProfile(1.0).label).toBe("Reactive");
    expect(getPostureProfile(1.74).label).toBe("Reactive");
    expect(getPostureProfile(1.75).label).toBe("Developing");
    expect(getPostureProfile(2.49).label).toBe("Developing");
    expect(getPostureProfile(2.5).label).toBe("Defined");
    expect(getPostureProfile(3.24).label).toBe("Defined");
    expect(getPostureProfile(3.25).label).toBe("Managed");
    expect(getPostureProfile(3.99).label).toBe("Managed");
    expect(getPostureProfile(4.0).label).toBe("Optimizing");
    expect(getPostureProfile(5.0).label).toBe("Optimizing");
  });
});

describe("topGaps", () => {
  it("returns nothing when there are no gaps", () => {
    expect(topGaps(allYes)).toEqual([]);
  });

  it("orders No before Partial and caps at the limit", () => {
    const answers: AssessmentAnswer[] = QUIZ_QUESTIONS.slice(0, 6).map((q, i) => ({
      nistId: q.nistId,
      answer: i % 2 === 0 ? "Partial" : "No",
    }));
    const gaps = topGaps(answers, QUIZ_QUESTIONS, 5);
    expect(gaps.length).toBe(5);
    expect(gaps[0].answer).toBe("No");
    // Every "No" should sort before every "Partial" in the result.
    const firstPartialIndex = gaps.findIndex((g) => g.answer === "Partial");
    const lastNoIndex = gaps.map((g) => g.answer).lastIndexOf("No");
    if (firstPartialIndex !== -1 && lastNoIndex !== -1) {
      expect(lastNoIndex).toBeLessThan(firstPartialIndex);
    }
  });

  it("includes a remediation hint for every gap", () => {
    const gaps = topGaps(allNo, QUIZ_QUESTIONS, 16);
    expect(gaps.every((g) => g.remediation.length > 0)).toBe(true);
  });
});

describe("summarizeAssessment", () => {
  it("produces an internally consistent summary", () => {
    const summary = summarizeAssessment(allPartial);
    expect(summary.overallMaturity).toBe(2);
    expect(summary.totalGaps).toBe(QUIZ_QUESTIONS.length);
    expect(summary.gapRate).toBe(100);
    expect(summary.estimatedReadiness).toBe(0);
    expect(summary.postureProfile.label).toBe("Developing");
    expect(summary.functionBreakdown).toHaveLength(6);
    expect(summary.topGaps.length).toBeLessThanOrEqual(5);
  });
});
