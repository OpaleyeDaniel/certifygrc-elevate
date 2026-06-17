/**
 * User-facing copy — never include hostnames, ports, env names, or stack traces.
 */
export const PUBLIC_MAIL_USER_MESSAGE =
  "We couldn't submit your request right now. Please try again later.";

export type MailErrorLogShape = {
  kind: string;
  code: string;
  message: string;
  responseCode?: number;
  command?: string;
  stack?: string;
};

/**
 * Structured diagnostics for server logs only (no secrets; message may contain SMTP line text).
 */
export function describeMailErrorForLog(err: unknown): MailErrorLogShape {
  const e = err as {
    name?: string;
    code?: string;
    responseCode?: number;
    command?: string;
    message?: string;
    stack?: string;
  };
  return {
    kind: typeof e?.name === "string" ? e.name : typeof err === "object" && err !== null ? err.constructor?.name ?? "Error" : "non-object",
    code: typeof e?.code === "string" ? e.code : "",
    message: typeof e?.message === "string" ? e.message : String(err),
    ...(typeof e?.responseCode === "number" ? { responseCode: e.responseCode } : {}),
    ...(typeof e?.command === "string" ? { command: e.command } : {}),
    ...(typeof e?.stack === "string" ? { stack: e.stack } : {}),
  };
}

/**
 * Maps nodemailer / network errors to a short internal reason for logs (not sent to clients).
 */
export function categorizeMailFailureReason(err: unknown): string {
  const e = err as { code?: string; responseCode?: number; message?: string };
  const code = typeof e?.code === "string" ? e.code : "";
  const responseCode = typeof e?.responseCode === "number" ? e.responseCode : 0;
  const msg = typeof e?.message === "string" ? e.message.toLowerCase() : "";

  if (code === "EAUTH" || responseCode === 535 || msg.includes("authentication") || msg.includes("auth failed")) {
    return "smtp_auth_failed";
  }
  if (
    code === "ETIMEDOUT" ||
    code === "ECONNREFUSED" ||
    code === "ESOCKET" ||
    code === "ENOTFOUND" ||
    code === "EAI_AGAIN" ||
    code === "EPROTO"
  ) {
    return "smtp_unreachable";
  }
  if (code === "ETLS" || code === "CERT_HAS_EXPIRED" || msg.includes("certificate") || msg.includes("ssl") || msg.includes("tls")) {
    return "smtp_tls_failed";
  }
  if (responseCode >= 550 || msg.includes("spam") || msg.includes("blocked")) {
    return "smtp_rejected_message";
  }
  if (msg.includes("[resend]")) {
    return "resend_api_failed";
  }
  return "smtp_send_failed";
}
