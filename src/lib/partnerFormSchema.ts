import type { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

export const INDUSTRIES = [
  "FinTech",
  "SaaS / Software",
  "Healthcare",
  "Government / Public Sector",
  "Consulting / Advisory",
  "Banking & Financial Services",
  "Insurance",
  "Technology / IT Services",
  "Manufacturing",
  "Retail & eCommerce",
  "Energy & Utilities",
  "Education",
  "Telecommunications",
  "Professional Services",
  "Other",
] as const;

export const REGIONS = [
  "North America",
  "Europe",
  "Africa",
  "Asia",
  "Middle East",
  "South America",
  "Oceania",
] as const;

export const FRAMEWORK_OPTIONS = ["NIST CSF", "ISO 27001", "SOC 2", "PCI DSS", "None yet"] as const;

export const STAGE_OPTIONS = [
  "Exploring / Awareness",
  "Planning Implementation",
  "Actively Implementing",
  "Audit / Certification Phase",
  "Already Certified / Mature",
] as const;

export const CHALLENGE_OPTIONS = [
  "Lack of visibility into compliance status",
  "Manual / spreadsheet-driven processes",
  "Difficulty mapping controls across frameworks",
  "Audit readiness challenges",
  "Resource / skill gaps",
  "Tool complexity",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately (0–3 months)",
  "Short-term (3–6 months)",
  "Long-term (6+ months)",
  "Just exploring",
] as const;

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requiredFrom<const T extends readonly string[]>(list: T, label: string) {
  return z
    .string()
    .refine((s): s is T[number] => (list as readonly string[]).includes(s), { message: label });
}

const partnerFormFields = {
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  workEmail: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .max(320)
    .refine((v) => emailRx.test(v), "Enter a valid work email"),
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  jobTitle: z.string().trim().min(1, "Job title / role is required").max(200),
  companySize: requiredFrom(COMPANY_SIZES, "Select company size"),
  industry: z.string().trim().min(1, "Select industry").max(120),
  primaryRegion: requiredFrom(REGIONS, "Select primary region"),
  frameworks: z
    .array(z.enum(FRAMEWORK_OPTIONS))
    .min(1, "Select at least one framework option")
    .max(FRAMEWORK_OPTIONS.length),
  currentStage: requiredFrom(STAGE_OPTIONS, "Select your current stage"),
  usesGrcTool: z
    .string()
    .refine((v): v is "yes" | "no" => v === "yes" || v === "no", {
      message: "Select whether you use a GRC tool",
    }),
  grcToolName: z.string().max(300).optional(),
  challenges: z
    .array(z.enum(CHALLENGE_OPTIONS))
    .min(1, "Select at least one challenge")
    .max(3, "Select at most 3 challenges"),
  desiredOutcome: z.string().trim().min(1, "This field is required").max(2000),
  implementationTimeline: requiredFrom(TIMELINE_OPTIONS, "Select an implementation timeline"),
  willingDemo: z.boolean(),
  willingActiveUse: z.boolean(),
  willingFeedback: z.boolean(),
  consentContact: z.boolean().refine((v) => v === true, {
    message: "You must agree to be contacted regarding your request",
  }),
  consentUpdates: z.boolean(),
  /** Distinguishes Alliance page vs public early-access page (same API + validation). */
  submissionContext: z.enum(["partner", "early_access"]).optional(),
};

const partnerFormBase = z.object(partnerFormFields);

/** Step 1 only — used for Continue (avoids validating step 2 fields early). */
export const partnerStep1OnlySchema = partnerFormBase
  .pick({
    fullName: true,
    workEmail: true,
    companyName: true,
    jobTitle: true,
    companySize: true,
    industry: true,
    primaryRegion: true,
    frameworks: true,
    currentStage: true,
  })
  .superRefine((data, ctx) => {
    if (data.frameworks.includes("None yet") && data.frameworks.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'If you select "None yet", deselect other frameworks',
        path: ["frameworks"],
      });
    }
  });

export const partnerFormSchema = partnerFormBase.superRefine((data, ctx) => {
  if (data.frameworks.includes("None yet") && data.frameworks.length > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'If you select "None yet", deselect other frameworks',
      path: ["frameworks"],
    });
  }
  if (data.usesGrcTool === "yes") {
    const trimmed = (data.grcToolName ?? "").trim();
    if (!trimmed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specify the tool name",
        path: ["grcToolName"],
      });
    }
  }
  const willing = data.willingDemo || data.willingActiveUse || data.willingFeedback;
  if (!willing) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Select at least one commitment option",
      path: ["willingDemo"],
    });
  }
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export const partnerFormDefaults: DefaultValues<PartnerFormValues> = {
  fullName: "",
  workEmail: "",
  companyName: "",
  jobTitle: "",
  companySize: undefined,
  industry: "",
  primaryRegion: undefined,
  frameworks: [],
  currentStage: undefined,
  usesGrcTool: undefined,
  grcToolName: "",
  challenges: [],
  desiredOutcome: "",
  implementationTimeline: undefined,
  willingDemo: false,
  willingActiveUse: false,
  willingFeedback: false,
  consentContact: false,
  consentUpdates: false,
};

export const partnerStep1Fields: (keyof PartnerFormValues)[] = [
  "fullName",
  "workEmail",
  "companyName",
  "jobTitle",
  "companySize",
  "industry",
  "primaryRegion",
  "frameworks",
  "currentStage",
];

/** Cleared when entering step 2 so step-2 errors are not shown prematurely. */
export const partnerStep2Fields: (keyof PartnerFormValues)[] = [
  "usesGrcTool",
  "grcToolName",
  "challenges",
  "desiredOutcome",
  "implementationTimeline",
  "willingDemo",
  "willingActiveUse",
  "willingFeedback",
  "consentContact",
  "consentUpdates",
];
