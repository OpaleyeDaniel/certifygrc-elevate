import { describe, it, expect } from "vitest";
import { assessmentLeadSchema, JOB_TITLE_OPTIONS } from "./assessmentLeadSchema";

const validPayload = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  companyName: "Acme Corp",
  jobTitle: "CISO" as const,
  source: "landing-security-quiz" as const,
  completedAt: "2026-09-02T12:00:00.000Z",
  consentMarketing: true,
  results: {
    overallMaturity: 3.5,
    postureProfile: "Defined",
    totalGaps: 4,
    gapRate: 25,
    estimatedReadiness: 75,
    functionBreakdown: {
      GOVERN: 4,
      IDENTIFY: 3,
      PROTECT: 4,
      DETECT: 3,
      RESPOND: 4,
      RECOVER: 3,
    },
    topGaps: [
      {
        nistId: "GV.OC-01",
        question: "Is organizational mission understood?",
        answer: "Partial" as const,
      },
    ],
    answers: [
      {
        nistId: "GV.OC-01",
        answer: "Partial" as const,
      },
    ],
  },
};

describe("assessmentLeadSchema", () => {
  it("validates a complete and correct payload", () => {
    const parsed = assessmentLeadSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.fullName).toBe("Jane Doe");
      expect(parsed.data.email).toBe("jane.doe@example.com");
      expect(parsed.data.jobTitle).toBe("CISO");
      expect(parsed.data.companyName).toBe("Acme Corp");
      expect(parsed.data.results.overallMaturity).toBe(3.5);
    }
  });

  it("lowercases email and trims inputs", () => {
    const parsed = assessmentLeadSchema.safeParse({
      ...validPayload,
      fullName: "  Alex Morgan  ",
      email: "  ALEX.MORGAN@ACME.COM  ",
      companyName: "  Acme Inc  ",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.fullName).toBe("Alex Morgan");
      expect(parsed.data.email).toBe("alex.morgan@acme.com");
      expect(parsed.data.companyName).toBe("Acme Inc");
    }
  });

  it("requires fullName with at least 2 characters", () => {
    const missingName = assessmentLeadSchema.safeParse({
      ...validPayload,
      fullName: "",
    });
    expect(missingName.success).toBe(false);

    const singleChar = assessmentLeadSchema.safeParse({
      ...validPayload,
      fullName: "J",
    });
    expect(singleChar.success).toBe(false);
  });

  it("requires a valid jobTitle from JOB_TITLE_OPTIONS", () => {
    for (const title of JOB_TITLE_OPTIONS) {
      const parsed = assessmentLeadSchema.safeParse({
        ...validPayload,
        jobTitle: title,
      });
      expect(parsed.success).toBe(true);
    }

    const invalidTitle = assessmentLeadSchema.safeParse({
      ...validPayload,
      jobTitle: "Unrecognized Title",
    });
    expect(invalidTitle.success).toBe(false);
  });

  it("rejects invalid email formats", () => {
    const invalidEmail = assessmentLeadSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });
    expect(invalidEmail.success).toBe(false);
  });

  it("requires marketing consent to be true", () => {
    const noConsent = assessmentLeadSchema.safeParse({
      ...validPayload,
      consentMarketing: false,
    });
    expect(noConsent.success).toBe(false);
  });

  it("requires companyName with at least 2 characters", () => {
    const missingCompany = assessmentLeadSchema.safeParse({
      ...validPayload,
      companyName: "",
    });
    expect(missingCompany.success).toBe(false);

    const singleCharCompany = assessmentLeadSchema.safeParse({
      ...validPayload,
      companyName: "A",
    });
    expect(singleCharCompany.success).toBe(false);
  });

  it("rejects bot submissions when honeypot _gotcha is populated", () => {
    const botSubmission = assessmentLeadSchema.safeParse({
      ...validPayload,
      _gotcha: "spam-bot-value",
    });
    expect(botSubmission.success).toBe(false);
  });
});
