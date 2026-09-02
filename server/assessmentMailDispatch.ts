import type { MailEnv } from "./mailTransport.js";
import { resolveInternalTo, resolveMailFrom, PUBLIC_REPLY_EMAIL } from "./mailConfig.js";
import { buildAssessmentConfirmationHtml, buildAssessmentInternalHtml } from "./assessmentEmailHtml.js";
import { getPublicSiteOrigin } from "./waitlistSiteUrl.js";
import { sendMailUnified } from "./sendMailUnified.js";
import type { AssessmentLeadInput } from "../src/lib/assessmentLeadSchema.js";

function logMailFailure(phase: "internal" | "confirmation", err: unknown): void {
  const e = err as { code?: string; command?: string; responseCode?: number; message?: string };
  console.error(
    `[assessment-mail] ${phase} send failed:`,
    "code=",
    e?.code ?? "n/a",
    "command=",
    e?.command ?? "n/a",
    "responseCode=",
    e?.responseCode ?? "n/a",
    "message=",
    e?.message ?? String(err),
  );
}

export async function sendAssessmentLeadEmails(
  env: MailEnv,
  _fromLegacy: string,
  _toLegacy: string,
  data: AssessmentLeadInput,
): Promise<{ internalOk: true; confirmationSent: boolean } | { internalOk: false; error: unknown }> {
  const submittedAtUtc = new Date().toISOString();
  const origin = getPublicSiteOrigin(env);
  const softwareUrl = `${origin}/software`;
  const fromAddress = resolveMailFrom(env);
  // Prefer the address resolved by the API/middleware (always mercy@certifygrc.ca).
  const toInternal = (_toLegacy && _toLegacy.includes("@") ? _toLegacy : resolveInternalTo(env)).toLowerCase();
  const maturity = Math.round(data.results.overallMaturity);

  // 1. Internal team notification first (required — ensures CertifyGRC team always gets the lead and score).
  let internalHtml: string;
  try {
    internalHtml = buildAssessmentInternalHtml({
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      submittedAtUtc,
      results: data.results,
    });
  } catch (err) {
    console.error("[assessment-mail] buildAssessmentInternalHtml failed (no send attempted):", err);
    return { internalOk: false, error: err };
  }

  if (toInternal) {
    try {
      const internalSubject = `[Free Assessment] ${data.fullName} (${data.jobTitle}) — Score: ${maturity}/5 (${data.results.postureProfile}) · ${data.email}`;
      await sendMailUnified(env, "assessment lead internal", {
        from: `"CertifyGRC Website" <${fromAddress}>`,
        to: toInternal,
        subject: internalSubject,
        html: internalHtml,
      });
      console.info("[assessment-mail] Internal notification sent to team");
    } catch (err) {
      logMailFailure("internal", err);
      return { internalOk: false, error: err };
    }
  }

  // 2. Visitor confirmation / score report second.
  let confirmationHtml: string;
  try {
    confirmationHtml = buildAssessmentConfirmationHtml({
      fullName: data.fullName,
      results: data.results,
      softwareUrl,
    });
  } catch (err) {
    console.error("[assessment-mail] buildAssessmentConfirmationHtml failed; internal notification already delivered:", err);
    return { internalOk: true, confirmationSent: false };
  }

  try {
    await sendMailUnified(env, "assessment lead confirmation", {
      from: `"CertifyGRC" <${fromAddress}>`,
      to: data.email,
      replyTo: PUBLIC_REPLY_EMAIL,
      subject: `Your NIST CSF maturity report (${maturity}/5)`,
      html: confirmationHtml,
    });
    console.info("[assessment-mail] Visitor confirmation report sent");
    return { internalOk: true, confirmationSent: true };
  } catch (err) {
    logMailFailure("confirmation", err);
    console.error("[assessment-mail] Visitor confirmation failed; internal notification was already delivered.");
    return { internalOk: true, confirmationSent: false };
  }
}
