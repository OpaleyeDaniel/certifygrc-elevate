import type { IncomingMessage, ServerResponse } from "http";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

export function getAllowedApiOrigins(env: NodeJS.ProcessEnv): string[] {
  return parseAllowedOrigins(env.API_ALLOWED_ORIGINS);
}

function pickAllowOrigin(requestOrigin: string | undefined, allowed: string[]): string | null {
  if (!requestOrigin) return null;
  if (allowed.length === 0) return null;
  return allowed.includes(requestOrigin) ? requestOrigin : null;
}

export function applyCorsHeadersNode(
  req: IncomingMessage,
  res: ServerResponse,
  env: NodeJS.ProcessEnv,
): { allowOrigin: string | null } {
  const allowed = getAllowedApiOrigins(env);
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
  const allow = pickAllowOrigin(origin, allowed);
  if (allow) {
    res.setHeader("Access-Control-Allow-Origin", allow);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
  return { allowOrigin: allow };
}

export function applyCorsHeadersVercel(req: VercelRequest, res: VercelResponse, env: NodeJS.ProcessEnv): { allowOrigin: string | null } {
  const allowed = getAllowedApiOrigins(env);
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
  const allow = pickAllowOrigin(origin, allowed);
  if (allow) {
    res.setHeader("Access-Control-Allow-Origin", allow);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
  return { allowOrigin: allow };
}
