import type { VercelResponse } from "@vercel/node";
import { categorizeMailFailureReason, describeMailErrorForLog, PUBLIC_MAIL_USER_MESSAGE } from "./mailErrors.js";

export type MailApiErrorCode =
  | "MAIL_UNAVAILABLE"
  | "MAIL_NOT_CONFIGURED"
  | "BAD_REQUEST"
  | "METHOD_NOT_ALLOWED"
  | "INTERNAL_ERROR";

export type ApiErrorPayload = {
  success: false;
  error: { code: MailApiErrorCode | string; message: string };
};

export function jsonBadRequest(message: string): ApiErrorPayload {
  return { success: false, error: { code: "BAD_REQUEST", message } };
}

export function jsonMethodNotAllowed(): ApiErrorPayload {
  return { success: false, error: { code: "METHOD_NOT_ALLOWED", message: "Method not allowed" } };
}

export function jsonTooManyRequests(message = "Too many requests. Please try again in a few minutes."): ApiErrorPayload {
  return { success: false, error: { code: "RATE_LIMITED", message } };
}

/**
 * Logs full diagnostics; returns a safe JSON body for the client.
 */
export function respondMailTransportFailure(res: VercelResponse, route: string, err: unknown): VercelResponse {
  const diag = describeMailErrorForLog(err);
  const reason = categorizeMailFailureReason(err);
  console.error(
    JSON.stringify({
      event: "mail_transport_failure",
      route,
      reason,
      ...diag,
    }),
  );
  console.error(`[${route}] mail_transport_failure reason=${reason}`, diag.code || "no-code", diag.message);

  return res.status(502).json({
    success: false,
    error: { code: "MAIL_UNAVAILABLE", message: PUBLIC_MAIL_USER_MESSAGE },
  } satisfies ApiErrorPayload);
}

export function respondMailNotConfigured(res: VercelResponse, route: string, missingKeys: string[]): VercelResponse {
  console.error(
    JSON.stringify({
      event: "mail_not_configured",
      route,
      missingKeys,
    }),
  );

  return res.status(503).json({
    success: false,
    error: { code: "MAIL_NOT_CONFIGURED", message: PUBLIC_MAIL_USER_MESSAGE },
  } satisfies ApiErrorPayload);
}

export function respondUnexpectedError(res: VercelResponse, route: string, err: unknown): VercelResponse {
  const diag = describeMailErrorForLog(err);
  console.error(JSON.stringify({ event: "api_unexpected_error", route, ...diag }));
  console.error(`[${route}] unexpected_error`, diag);

  return res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: PUBLIC_MAIL_USER_MESSAGE },
  });
}

/** Same JSON as `respondMailTransportFailure` — for non-Vercel dev servers (e.g. Vite middleware). */
export function mailTransportFailurePayload(): ApiErrorPayload {
  return {
    success: false,
    error: { code: "MAIL_UNAVAILABLE", message: PUBLIC_MAIL_USER_MESSAGE },
  };
}

/** Same JSON as `respondMailNotConfigured` — for non-Vercel dev servers. */
export function mailNotConfiguredPayload(): ApiErrorPayload {
  return {
    success: false,
    error: { code: "MAIL_NOT_CONFIGURED", message: PUBLIC_MAIL_USER_MESSAGE },
  };
}
