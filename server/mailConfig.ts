import { sanitizeEnvValue, type MailEnv } from "./mailTransport.js";

/** When set, outbound mail uses Resend's HTTPS API (works reliably on Vercel; no SMTP egress). */
export function useResendApi(env: MailEnv): boolean {
  return Boolean(sanitizeEnvValue(env.RESEND_API_KEY as string | undefined));
}

/**
 * When `MAIL_SKIP_SEND=true` and `NODE_ENV=development` (local `npm run dev`), handlers may skip
 * real outbound email so forms return 200 without Resend/SMTP. Ignored in production builds.
 */
export function shouldSkipMailSend(env: MailEnv): boolean {
  if (sanitizeEnvValue(env.MAIL_SKIP_SEND as string | undefined) !== "true") return false;
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  return true;
}

/**
 * Required env for sending:
 * - Always: CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO
 * - Either: RESEND_API_KEY (Resend) or SMTP_HOST + SMTP_USER + SMTP_PASS (SMTP)
 */
export function getMissingOutboundMailKeys(env: MailEnv): string[] {
  const missing: string[] = [];
  const from = sanitizeEnvValue(env.CONTACT_EMAIL_FROM as string | undefined);
  const to = sanitizeEnvValue(env.CONTACT_EMAIL_TO as string | undefined);
  if (!from) missing.push("CONTACT_EMAIL_FROM");
  if (!to) missing.push("CONTACT_EMAIL_TO");
  if (missing.length) return missing;

  if (useResendApi(env)) return [];

  const smtpRequired = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;
  for (const key of smtpRequired) {
    if (!sanitizeEnvValue(env[key] as string | undefined)) missing.push(key);
  }
  return missing;
}
