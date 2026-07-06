import type { VercelRequest, VercelResponse } from "@vercel/node";
import { jsonMethodNotAllowed, jsonTooManyRequests } from "./mailApiResponse.js";
import { rateLimitFixedWindow } from "./inMemoryRateLimit.js";
import { clientIpFromVercelRequest } from "./requestIdentity.js";
import { applyApiSecurityHeadersVercel } from "./securityHeaders.js";
import { applyCorsHeadersVercel, getAllowedApiOrigins } from "./publicApiCors.js";

export type PublicFormRoute =
  | "send-waitlist"
  | "send-contact"
  | "send-consultation"
  | "send-partner"
  | "send-assessment-lead";

const RATE: Record<PublicFormRoute, { limit: number; windowMs: number }> = {
  "send-waitlist": { limit: 12, windowMs: 15 * 60 * 1000 },
  "send-contact": { limit: 10, windowMs: 15 * 60 * 1000 },
  "send-consultation": { limit: 8, windowMs: 15 * 60 * 1000 },
  "send-partner": { limit: 8, windowMs: 15 * 60 * 1000 },
  "send-assessment-lead": { limit: 12, windowMs: 15 * 60 * 1000 },
};

/**
 * Shared guards for public JSON form endpoints.
 * Returns true when the response has already been fully written (caller must return immediately).
 */
export function enforcePublicFormApiGuards(req: VercelRequest, res: VercelResponse, env: NodeJS.ProcessEnv, route: PublicFormRoute): boolean {
  applyApiSecurityHeadersVercel(res);
  applyCorsHeadersVercel(req, res, env);

  const allowedList = getAllowedApiOrigins(env);
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;

  if (req.method === "OPTIONS") {
    if (allowedList.length > 0 && origin && !allowedList.includes(origin)) {
      res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Invalid origin" } });
      return true;
    }
    res.statusCode = 204;
    res.end();
    return true;
  }

  if (req.method !== "POST") {
    res.status(405).json(jsonMethodNotAllowed());
    return true;
  }

  if (allowedList.length > 0) {
    if (origin && !allowedList.includes(origin)) {
      console.warn(JSON.stringify({ event: "api_cors_blocked", route, origin }));
      res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Invalid origin" } });
      return true;
    }
  }

  const ip = clientIpFromVercelRequest(req);
  const cfg = RATE[route];
  const rl = rateLimitFixedWindow(`${route}:${ip}`, cfg.limit, cfg.windowMs);
  if (!rl.ok) {
    res.setHeader("Retry-After", String(rl.retryAfterSec));
    res.status(429).json(jsonTooManyRequests());
    return true;
  }

  return false;
}
