import type { IncomingMessage } from "http";
import type { VercelRequest } from "@vercel/node";

/**
 * Best-effort client IP for abuse controls. Prefer `x-forwarded-for` when behind a trusted proxy (Vercel, Cloudflare).
 */
export function clientIpFromVercelRequest(req: VercelRequest): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0]!.trim();
  }
  if (Array.isArray(xff) && xff[0]) {
    return String(xff[0]).split(",")[0]!.trim();
  }
  const rip = req.socket?.remoteAddress;
  return typeof rip === "string" && rip ? rip : "unknown";
}

export function clientIpFromIncomingMessage(req: IncomingMessage): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0]!.trim();
  }
  const rip = req.socket?.remoteAddress;
  return typeof rip === "string" && rip ? rip : "unknown";
}
