import type { MailEnv } from "./mailTransport.js";
import { buildAssessmentConfirmationHtml, buildAssessmentInternalHtml } from "./assessmentEmailHtml.js";
import { getPublicSiteOrigin } from "./waitlistSiteUrl.js";
import { sendMailUnified } from "./sendMailUnified.js";
import type { AssessmentLeadInput } from "../src/lib/assessmentLeadSchema.js";

export async function sendAssessmentLeadEmails(
  env: MailEnv,
  from: string,
  toInternal: string,
  data: AssessmentLeadInput,
): Promise<void> {
  const submittedAtUtc = new Date().toISOString();
  const origin = getPublicSiteOrigin(env);
  const softwareUrl = `${origin}/software`;

  await sendMailUnified(env, "assessment lead internal", {
    from: `"CertifyGRC Website" <${from}>`,
    to: toInternal,
    subject: `[Security Quiz] ${data.email} — ${data.results.postureProfile} (${data.results.overallMaturity.toFixed(1)}/5.0)`,
    html: buildAssessmentInternalHtml({
      email: data.email,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      submittedAtUtc,
      results: data.results,
    }),
  });

  await sendMailUnified(env, "assessment lead confirmation", {
    from: `"CertifyGRC" <${from}>`,
    to: data.email,
    subject: "Your NIST CSF maturity report - CertifyGRC",
    html: buildAssessmentConfirmationHtml({
      results: data.results,
      softwareUrl,
    }),
  });
}
