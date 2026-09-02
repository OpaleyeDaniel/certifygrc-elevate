import { z } from "zod";

export const JOB_TITLE_OPTIONS = ["CISO", "IT Director", "Compliance Officer", "Executive", "Other"] as const;
export type JobTitleOption = (typeof JOB_TITLE_OPTIONS)[number];

const quizAnswerValueSchema = z.enum(["Yes", "Partial", "No"]);

const assessmentAnswerSchema = z.object({
  nistId: z.string().min(1),
  answer: quizAnswerValueSchema,
});

const topGapSchema = z.object({
  nistId: z.string().min(1),
  question: z.string().min(1),
  answer: quizAnswerValueSchema,
});

const assessmentResultsSchema = z.object({
  overallMaturity: z.number().min(0).max(5),
  postureProfile: z.string().min(1),
  totalGaps: z.number().int().min(0),
  gapRate: z.number().min(0).max(100),
  estimatedReadiness: z.number().min(0).max(100),
  functionBreakdown: z.record(z.string(), z.number()),
  topGaps: z.array(topGapSchema).max(16),
  answers: z.array(assessmentAnswerSchema).max(32),
});

/** Shared lead fields (honeypot validated separately on the server). */
export const assessmentLeadCoreSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email address")
    .email("Enter a valid work email address")
    .max(254, "Email is too long")
    .transform((s) => s.toLowerCase()),
  companyName: z
    .string()
    .trim()
    .min(2, "Enter your company name")
    .max(160, "Company name is too long"),
  jobTitle: z.enum(JOB_TITLE_OPTIONS, {
    errorMap: () => ({ message: "Select your job title" }),
  }),
  source: z.literal("landing-security-quiz"),
  completedAt: z.string().min(1),
  results: assessmentResultsSchema,
  consentMarketing: z
    .boolean()
    .refine((v) => v === true, { message: "Please agree to receive your results to continue." }),
});

/** Browser validation before POST — does not block on honeypot autofill false positives. */
export const assessmentLeadClientSchema = assessmentLeadCoreSchema;

/** Lead capture payload posted from the landing-page Security Posture Quiz
 *  ("gate" step) — a marketing lead magnet, not a real CertifyGRC platform
 *  assessment. See `securityQuizScoring.ts` for how `results` is computed. */
export const assessmentLeadSchema = assessmentLeadCoreSchema
  .extend({
    /** Honeypot — must stay empty (bots often fill hidden fields). */
    _gotcha: z.string().max(200).optional(),
  })
  .refine((d) => !d._gotcha?.trim(), {
    message: "Something interfered with the form. Refresh the page and try again.",
  })
  .transform(({ _gotcha: _discard, ...rest }) => rest);

/** Validated + normalized shape (email lowercased, honeypot stripped). */
export type AssessmentLeadInput = z.infer<typeof assessmentLeadCoreSchema>;

/** Wire payload accepted from the browser (includes optional honeypot). */
export type AssessmentLeadRequestBody = z.input<typeof assessmentLeadSchema>;
