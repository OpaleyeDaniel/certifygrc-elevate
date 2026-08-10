import type { MailEnv } from "./mailTransport.js";
import { resolveInternalTo, resolveMailFrom, PUBLIC_REPLY_EMAIL } from "./mailConfig.js";
import { buildAssessmentConfirmationHtml, buildAssessmentInternalHtml } from "./assessmentEmailHtml.js";
import { getPublicSiteOrigin } from "./waitlistSiteUrl.js";
import { sendMailUnified } from "./sendMailUnified.js";
import type { AssessmentLeadInput } from "../src/lib/assessmentLeadSchema.js";

export async function sendAssessmentLeadEmails(
  env: MailEnv,
  _fromLegacy: string,
  _toLegacy: string,
  data: AssessmentLeadInput,
): Promise<void> {
  const submittedAtUtc = new Date().toISOString();
  const origin = getPublicSiteOrigin(env);
  const softwareUrl = `${origin}/software`;
  const fromAddress = resolveMailFrom(env);
  // Prefer the address resolved by the API/middleware (always mercy@certifygrc.ca).
  const toInternal = (_toLegacy && _toLegacy.includes("@") ? _toLegacy : resolveInternalTo(env)).toLowerCase();
  const maturity = Math.round(data.results.overallMaturity);

  // User confirmation first — must succeed before unlocking quiz results.
  await sendMailUnified(env, "assessment lead confirmation", {
    from: `"CertifyGRC" <${fromAddress}>`,
    to: data.email,
    replyTo: PUBLIC_REPLY_EMAIL,
    subject: `Your NIST CSF maturity report (${maturity}/5)`,
    html: buildAssessmentConfirmationHtml({
      results: data.results,
      softwareUrl,
    }),
  });

  // Internal team copy (free-assessment / quiz lead) → mercy@certifygrc.ca
  if (toInternal) {
    try {
      await sendMailUnified(env, "assessment lead internal", {
        from: `"CertifyGRC Website" <${fromAddress}>`,
        to: toInternal,
        subject: `[Security Quiz] ${data.email} — ${maturity}/5 · ${data.results.totalGaps} gaps`,
        html: buildAssessmentInternalHtml({
          email: data.email,
          companyName: data.companyName,
          jobTitle: data.jobTitle,
          submittedAtUtc,
          results: data.results,
        }),
      });
    } catch (err) {
      console.error("[assessment-mail] internal notification failed (visitor email was sent):", err);
    }
  }
}
