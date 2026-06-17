import type { MailEnv } from "./mailTransport.js";
import type { PartnerFormValues } from "../src/lib/partnerFormSchema.js";
import { buildPartnerConfirmationHtml, buildPartnerInternalHtml } from "./partnerEmailHtml.js";
import { sendMailUnified } from "./sendMailUnified.js";

function logMailFailure(phase: "internal" | "confirmation", err: unknown): void {
  const e = err as { code?: string; command?: string; responseCode?: number; message?: string };
  console.error(
    `[partner-mail] ${phase} send failed:`,
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

/**
 * Sends the internal inbox notification first (required). Sends applicant confirmation second;
 * if confirmation fails, logs loudly but does not fail the request (inbox already received the data).
 */
export async function sendPartnerSubmissionEmails(
  env: MailEnv,
  from: string,
  internalTo: string,
  data: PartnerFormValues,
): Promise<{ internalOk: true; confirmationSent: boolean } | { internalOk: false; error: unknown }> {
  let internalHtml: string;
  try {
    internalHtml = buildPartnerInternalHtml(data);
  } catch (err) {
    console.error("[partner-mail] buildPartnerInternalHtml failed (no send attempted):", err);
    return { internalOk: false, error: err };
  }

  try {
    const internalSubject =
      data.submissionContext === "early_access"
        ? `[Early Access / Assessment] ${data.fullName} — ${data.companyName}`
        : `[Partner / Early Access] ${data.fullName} — ${data.companyName}`;

    await sendMailUnified(env, "partner-mail internal", {
      from: `"CertifyGRC Website" <${from}>`,
      to: internalTo,
      subject: internalSubject,
      html: internalHtml,
    });
    console.info("[partner-mail] Internal notification sent");
  } catch (err) {
    logMailFailure("internal", err);
    return { internalOk: false, error: err };
  }

  let confirmationHtml: string;
  try {
    confirmationHtml = buildPartnerConfirmationHtml(data);
  } catch (err) {
    console.error(
      "[partner-mail] buildPartnerConfirmationHtml failed; internal mail was already sent:",
      err,
    );
    return { internalOk: true, confirmationSent: false };
  }

  try {
    const applicantSubject =
      data.submissionContext === "early_access"
        ? "We received your early access assessment — CertifyGRC"
        : "We received your partner / early access request — CertifyGRC";

    await sendMailUnified(env, "partner-mail confirmation", {
      from: `"CertifyGRC" <${from}>`,
      to: data.workEmail,
      subject: applicantSubject,
      html: confirmationHtml,
    });
    console.info("[partner-mail] Applicant confirmation sent");
    return { internalOk: true, confirmationSent: true };
  } catch (err) {
    logMailFailure("confirmation", err);
    console.error(
      "[partner-mail] Applicant confirmation failed; internal notification was already delivered to inbox.",
    );
    return { internalOk: true, confirmationSent: false };
  }
}
