import type { IncomingMessage, ServerResponse } from "http";
import { jsonMethodNotAllowed, jsonTooManyRequests } from "./mailApiResponse.js";
import { rateLimitFixedWindow } from "./inMemoryRateLimit.js";
import { clientIpFromIncomingMessage } from "./requestIdentity.js";
import { applyApiSecurityHeadersNode } from "./securityHeaders.js";
import { applyCorsHeadersNode, getAllowedApiOrigins } from "./publicApiCors.js";
type NodePublicFormRoute = "send-waitlist" | "send-contact" | "send-consultation" | "send-partner";

const RATE: Record<NodePublicFormRoute, { limit: number; windowMs: number }> = {
  "send-waitlist": { limit: 12, windowMs: 15 * 60 * 1000 },
  "send-contact": { limit: 10, windowMs: 15 * 60 * 1000 },
  "send-consultation": { limit: 8, windowMs: 15 * 60 * 1000 },
  "send-partner": { limit: 8, windowMs: 15 * 60 * 1000 },
};

function jsonResponse(res: ServerResponse, status: number, body: object) {
  applyApiSecurityHeadersNode(res);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

/**
 * Returns true when the request is fully handled and the caller must stop.
 */
export function enforceNodeFormApiGuards(
  req: IncomingMessage,
  res: ServerResponse,
  env: NodeJS.ProcessEnv,
  route: NodePublicFormRoute,
): boolean {
  applyApiSecurityHeadersNode(res);
  applyCorsHeadersNode(req, res, env);

  const allowedList = getAllowedApiOrigins(env);
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;

  if (req.method === "OPTIONS") {
    if (allowedList.length > 0 && origin && !allowedList.includes(origin)) {
      jsonResponse(res, 403, { success: false, error: { code: "FORBIDDEN", message: "Invalid origin" } });
      return true;
    }
    res.statusCode = 204;
    res.end();
    return true;
  }

  if (req.method !== "POST") {
    jsonResponse(res, 405, jsonMethodNotAllowed());
    return true;
  }

  if (allowedList.length > 0 && origin && !allowedList.includes(origin)) {
    console.warn(JSON.stringify({ event: "api_cors_blocked", route, origin }));
    jsonResponse(res, 403, { success: false, error: { code: "FORBIDDEN", message: "Invalid origin" } });
    return true;
  }

  const ip = clientIpFromIncomingMessage(req);
  const cfg = RATE[route];
  const rl = rateLimitFixedWindow(`${route}:${ip}`, cfg.limit, cfg.windowMs);
  if (!rl.ok) {
    res.setHeader("Retry-After", String(rl.retryAfterSec));
    jsonResponse(res, 429, jsonTooManyRequests());
    return true;
  }

  return false;
}

export function jsonResponseWithHeaders(res: ServerResponse, status: number, body: object) {
  jsonResponse(res, status, body);
}
