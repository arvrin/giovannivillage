/**
 * Lightweight in-memory rate limiter — token-bucket per IP.
 *
 * Suitable for soft-launch and modest traffic on a single Vercel function
 * instance. The map is per-process, so under heavy concurrent traffic each
 * function instance has its own counters (the limit becomes "limit × N
 * instances" in the worst case). For tight enforcement at scale, swap the
 * Map for an Upstash Redis or Vercel KV adapter using the same `consume()`
 * signature — no caller changes needed.
 */

interface Bucket {
  count: number;
  /** Unix ms when this bucket resets. */
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** Unix ms when the bucket next resets. */
  resetAt: number;
  /** When `ok === false`, seconds to wait before retry. */
  retryAfterSec?: number;
}

/**
 * Consume one token for the given key in the given window. Returns whether
 * the request is allowed.
 *
 * @param key    Identifier (typically `ip:routeName`)
 * @param limit  Max requests allowed in the window
 * @param windowMs  Window size in ms (e.g. 60_000 for per-minute)
 */
export function consume(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    // First request in a new window.
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

/** Pull an IP from common request headers, falling back to 'unknown'. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
