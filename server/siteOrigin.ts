import type { MailEnv } from "./mailTransport.js";
import { sanitizeEnvValue } from "./mailTransport.js";

/** Canonical production marketing site — used for email links and assets. */
export const PRODUCTION_SITE_ORIGIN = "https://certifygrc.com";

export const PRODUCTION_LOGO_URL = `${PRODUCTION_SITE_ORIGIN}/certifygrc-logo.png`;

/** Full wordmark readable on white backgrounds (email header). */
export const PRODUCTION_LOGO_EMAIL_URL = `${PRODUCTION_SITE_ORIGIN}/certifygrc-logo-email.png`;

/** Round brand mark — favicon and email avatar */
export const PRODUCTION_MARK_URL = `${PRODUCTION_SITE_ORIGIN}/certifygrc-mark.png`;

const PRODUCTION_HOSTS = new Set([
  "certifygrc.com",
  "www.certifygrc.com",
  "certifygrc.vercel.app",
]);

function normalizeOrigin(raw: string): string | null {
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withProto);
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

/** Map custom domain and Vercel aliases to the public marketing origin. */
function canonicalizeMarketingOrigin(origin: string): string {
  try {
    const host = new URL(origin).hostname.toLowerCase();
    if (PRODUCTION_HOSTS.has(host)) {
      return PRODUCTION_SITE_ORIGIN;
    }
    // Vercel deployment URLs (e.g. certifygrc-elevate-xxx.vercel.app) → custom domain
    if (host.endsWith(".vercel.app") && host.includes("certifygrc")) {
      return PRODUCTION_SITE_ORIGIN;
    }
  } catch {
    /* fall through */
  }
  return origin;
}

/**
 * Public site origin for absolute links in emails (waitlist, assessment, CTAs).
 * Production deploys always use certifygrc.com; preview/dev may use SITE_URL or VERCEL_URL.
 */
export function getPublicSiteOrigin(env: MailEnv): string {
  const vercelEnv = sanitizeEnvValue(env.VERCEL_ENV as string | undefined);
  if (vercelEnv === "production") {
    return PRODUCTION_SITE_ORIGIN;
  }

  const configured = sanitizeEnvValue(env.SITE_URL as string | undefined);
  if (configured) {
    const normalized = normalizeOrigin(configured) ?? PRODUCTION_SITE_ORIGIN;
    return canonicalizeMarketingOrigin(normalized);
  }

  const vercel = sanitizeEnvValue(env.VERCEL_URL as string | undefined);
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").split("/")[0]?.toLowerCase() ?? "";
    return canonicalizeMarketingOrigin(`https://${host}`);
  }

  return PRODUCTION_SITE_ORIGIN;
}
