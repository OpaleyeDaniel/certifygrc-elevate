import { sanitizeEnvValue, type MailEnv } from "./mailTransport.js";

/** Default outbound sender when CONTACT_EMAIL_FROM is unset. Must be verified in Resend/SMTP. */
export const DEFAULT_OUTBOUND_FROM = "info@certifygrc.ca";

/** Default internal inbox when CONTACT_EMAIL_TO is unset. */
export const DEFAULT_INTERNAL_TO = "mercy@certifygrc.ca";

/** Public reply / display address for CertifyGRC transactional mail. */
export const PUBLIC_REPLY_EMAIL = "info@certifygrc.ca";

const CERTIFYGRC_FROM_RE = /@certifygrc\.(ca|com)$/i;

/** Public CertifyGRC From address (Resend / verified domain). */
export function resolveOutboundFrom(env: MailEnv): string {
  const configured = sanitizeEnvValue(env.CONTACT_EMAIL_FROM as string | undefined);
  if (configured && CERTIFYGRC_FROM_RE.test(configured)) {
    return configured.toLowerCase();
  }
  return DEFAULT_OUTBOUND_FROM;
}

/**
 * From address for the active transport.
 * - Resend: info@certifygrc.ca (or CONTACT_EMAIL_FROM when @certifygrc.ca/.com)
 * - SMTP: authenticated SMTP_USER (hosting relays may reject certifygrc.* in From)
 */
export function resolveMailFrom(env: MailEnv): string {
  if (useResendApi(env)) {
    return resolveOutboundFrom(env);
  }
  const smtpUser = sanitizeEnvValue(env.SMTP_USER as string | undefined);
  if (smtpUser?.includes("@")) {
    return smtpUser.toLowerCase();
  }
  return resolveOutboundFrom(env);
}

/** Inbox for all landing-page form / quiz notifications (contact, waitlist, partner, consultation, free-assessment). */
export function resolveInternalTo(_env: MailEnv): string {
  // Always route internal form submissions to Mercy — ignore stale CONTACT_EMAIL_TO overrides.
  return DEFAULT_INTERNAL_TO;
}

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
 * - CONTACT_EMAIL_TO optional — defaults to mercy@certifygrc.ca
 * - CONTACT_EMAIL_FROM optional — defaults to info@certifygrc.ca
 * - Either: RESEND_API_KEY (Resend) or SMTP_HOST + SMTP_USER + SMTP_PASS (SMTP)
 */
export function getMissingOutboundMailKeys(env: MailEnv): string[] {
  const missing: string[] = [];
  resolveInternalTo(env);

  if (useResendApi(env)) return [];

  const smtpRequired = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;
  for (const key of smtpRequired) {
    if (!sanitizeEnvValue(env[key] as string | undefined)) missing.push(key);
  }
  return missing;
}
