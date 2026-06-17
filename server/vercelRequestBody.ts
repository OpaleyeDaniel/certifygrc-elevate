import type { VercelRequest } from "@vercel/node";

/**
 * Vercel usually parses JSON into `req.body`, but in some runtimes or edge cases it may be a string or Buffer.
 * This helper normalizes to a plain object for safe validation.
 */
export function getJsonBody<T extends Record<string, unknown>>(req: VercelRequest): T {
  const raw = req.body as unknown;
  if (raw == null) return {} as T;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return {} as T;
    }
  }
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(raw)) {
    try {
      return JSON.parse(raw.toString("utf8")) as T;
    } catch {
      return {} as T;
    }
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as T;
  }
  return {} as T;
}
