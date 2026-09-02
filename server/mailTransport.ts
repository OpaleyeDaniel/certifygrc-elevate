import nodemailer from "nodemailer";

export interface SmtpTransportOptions {
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: { user: string; pass: string };
  tls?: { rejectUnauthorized?: boolean; servername?: string };
  connectionTimeout?: number;
  greetingTimeout?: number;
  socketTimeout?: number;
  debug?: boolean;
  logger?: boolean;
  requireTLS?: boolean;
  ignoreTLS?: boolean;
}

/** Trim and strip optional surrounding quotes from .env values. */
export function sanitizeEnvValue(v: string | undefined): string | undefined {
  if (v === undefined) return undefined;
  let s = String(v).trim();
  if (s.length >= 2 && ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/** Common mis-typed ports (e.g. 587 vs 597) — auto-correct to avoid silent connection failures. */
const PORT_TYPOS = new Map<number, number>([[597, 587]]);

export type MailEnv = NodeJS.ProcessEnv | Record<string, string | undefined>;

export function resolveSmtpPort(raw: string | undefined): { port: number; notice: string | null } {
  const fallback = 587;
  const cleaned = sanitizeEnvValue(raw);
  if (cleaned === undefined || cleaned === "") {
    return { port: fallback, notice: null };
  }
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0 || n > 65535) {
    return {
      port: fallback,
      notice: `[mail] Invalid SMTP_PORT "${raw}"; using ${fallback}.`,
    };
  }
  const fixed = PORT_TYPOS.get(n);
  if (fixed !== undefined) {
    return {
      port: fixed,
      notice: `[mail] SMTP_PORT ${n} is not a standard SMTP port; using ${fixed} (STARTTLS).`,
    };
  }
  return { port: n, notice: null };
}

function inferSecure(port: number, smtpSecureEnv: string | undefined): boolean {
  if (port === 587) return false;
  if (port === 465) return true;
  if (smtpSecureEnv === "true") return true;
  if (smtpSecureEnv === "false") return false;
  return false;
}

/**
 * Production-oriented SMTP transport: STARTTLS on 587, SSL on 465, sensible timeouts.
 */
export function createMailTransportFromEnv(env: MailEnv) {
  const { port, notice } = resolveSmtpPort(env.SMTP_PORT);
  if (notice) console.warn(notice);

  const host = sanitizeEnvValue(env.SMTP_HOST as string | undefined);
  const secure = inferSecure(port, sanitizeEnvValue(env.SMTP_SECURE as string | undefined));
  const user = sanitizeEnvValue(env.SMTP_USER as string | undefined);
  const pass = sanitizeEnvValue(env.SMTP_PASS as string | undefined);

  if (!host) {
    throw new Error("[mail] SMTP_HOST is empty after sanitization");
  }

  const debug = sanitizeEnvValue(env.SMTP_DEBUG as string | undefined) === "true";

  const options: SmtpTransportOptions = {
    host,
    port,
    secure,
    auth: { user: user ?? "", pass: pass ?? "" },
    tls: { rejectUnauthorized: false, servername: host },
    connectionTimeout: 30_000,
    greetingTimeout: 25_000,
    socketTimeout: 40_000,
    debug,
  };

  if (!secure && port === 587) {
    options.requireTLS = true;
  }

  return nodemailer.createTransport(options as any);
}

