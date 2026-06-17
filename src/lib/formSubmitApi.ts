/**
 * Generic copy for server/mail failures — never show SMTP or infrastructure details from the API.
 */
export const PUBLIC_FORM_SUBMISSION_ERROR =
  "We couldn't submit your request right now. Please try again later.";

export const RATE_LIMIT_FORM_MESSAGE = "Too many attempts. Please wait a few minutes and try again.";

export const FORBIDDEN_FORM_MESSAGE = "Request blocked. If this keeps happening, contact support.";

/**
 * When the SPA is hosted separately from Vercel functions, set `VITE_API_BASE_URL` to the API origin
 * (e.g. `https://your-project.vercel.app` or `https://api.example.com`) **without** a trailing slash.
 * Same-origin deployments should leave this unset.
 */
export function resolveFormApiUrl(path: string): string {
  const base = typeof import.meta.env.VITE_API_BASE_URL === "string" ? import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, "") : "";
  if (!path.startsWith("/")) {
    return base ? `${base}/${path}` : `/${path}`;
  }
  return base ? `${base}${path}` : path;
}

/** Parses API error payloads: nested `{ error: { message } }`, legacy string `error`, or top-level `message`. */
export function extractApiErrorMessage(json: Record<string, unknown> | null): string | undefined {
  if (!json) return undefined;
  const e = json.error;
  if (typeof e === "string" && e.trim()) return e;
  if (e && typeof e === "object" && e !== null && "message" in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  const m = json.message;
  if (typeof m === "string" && m.trim()) return m;
  return undefined;
}

/**
 * User-visible message for form POST responses. Validation messages (400) pass through; other failures use public copy.
 */
export function formSubmitUserMessage(res: Response, json: Record<string, unknown> | null): string {
  const failed = !res.ok || json?.success === false;
  if (!failed) return "";

  if (res.status === 400) {
    return extractApiErrorMessage(json) ?? PUBLIC_FORM_SUBMISSION_ERROR;
  }
  if (res.status === 429) {
    return extractApiErrorMessage(json) ?? RATE_LIMIT_FORM_MESSAGE;
  }
  if (res.status === 403) {
    return extractApiErrorMessage(json) ?? FORBIDDEN_FORM_MESSAGE;
  }
  if (res.status === 503) {
    return "This service is temporarily unavailable. Please try again later.";
  }
  return PUBLIC_FORM_SUBMISSION_ERROR;
}
