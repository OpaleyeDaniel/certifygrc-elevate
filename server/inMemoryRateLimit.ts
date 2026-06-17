type WindowBucket = { count: number; resetAt: number };

const buckets = new Map<string, WindowBucket>();
const PRUNE_EVERY = 500;

let pruneCounter = 0;

function pruneIfNeeded() {
  pruneCounter++;
  if (pruneCounter < PRUNE_EVERY) return;
  pruneCounter = 0;
  const now = Date.now();
  for (const [k, b] of buckets) {
    if (now >= b.resetAt) buckets.delete(k);
  }
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

/**
 * Fixed-window counter (per serverless instance). Good enough to blunt casual abuse; upgrade to Redis/Upstash for strict global limits.
 */
export function rateLimitFixedWindow(key: string, limit: number, windowMs: number): RateLimitResult {
  pruneIfNeeded();
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 1, resetAt: now + windowMs };
    buckets.set(key, b);
    return { ok: true };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) };
  }
  b.count += 1;
  return { ok: true };
}

const dedupe = new Map<string, number>();

export function peekDedupe(key: string, windowMs: number): boolean {
  const last = dedupe.get(key);
  return last != null && Date.now() - last < windowMs;
}

export function markDedupe(key: string): void {
  const now = Date.now();
  dedupe.set(key, now);
  if (dedupe.size > 5000) {
    for (const [k, t] of dedupe) {
      if (now - t > 60 * 60 * 1000) dedupe.delete(k);
    }
  }
}
