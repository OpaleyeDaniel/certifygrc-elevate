import type { MailEnv } from "./mailTransport.js";
import { sanitizeEnvValue } from "./mailTransport.js";

/**
 * Public site origin for absolute links in emails (waitlist access form, etc.).
 * Prefer SITE_URL in production; fall back to VERCEL_URL; then default domain.
 */
export function getPublicSiteOrigin(env: MailEnv): string {
  const raw = sanitizeEnvValue(env.SITE_URL as string | undefined);
  if (raw) {
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
      const u = new URL(withProto);
      return `${u.protocol}//${u.host}`;
    } catch {
      return "https://certifygrc.vercel.app";
    }
  }
  const vercel = sanitizeEnvValue(env.VERCEL_URL as string | undefined);
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return "https://certifygrc.vercel.app";
}
