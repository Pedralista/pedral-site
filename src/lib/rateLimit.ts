import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Upstash distributed rate limiting ────────────────────────────────────────
// Requires UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in env.
// Falls back to in-memory when those vars are absent (local dev).

// Cache limiter instances — one per unique (limit, window) combination
const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`;
  if (!upstashLimiters.has(cacheKey)) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    const windowSec = Math.ceil(windowMs / 1000);
    upstashLimiters.set(
      cacheKey,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
        analytics: false,
      })
    );
  }
  return upstashLimiters.get(cacheKey)!;
}

// ── In-memory fallback (local dev only) ──────────────────────────────────────
const memStore = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of memStore.entries()) {
    if (now > val.resetAt) memStore.delete(key);
  }
}, 5 * 60 * 1000);

function memRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = memStore.get(identifier);
  if (!entry || now > entry.resetAt) {
    memStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) return { allowed: false, remaining: 0 };
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

// ── Public API ────────────────────────────────────────────────────────────────
const useUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number }> {
  if (!useUpstash) {
    return memRateLimit(identifier, limit, windowMs);
  }
  // Fails open to the in-memory limiter if Upstash errors (2026-11-25: the
  // free plan's 500k monthly request cap was hit and every checkout and
  // newsletter sign-up returned 500 until this fallback existed).
  try {
    const limiter = getUpstashLimiter(limit, windowMs);
    const result = await limiter.limit(identifier);
    return { allowed: result.success, remaining: result.remaining };
  } catch (err) {
    console.error("rateLimit: Upstash unavailable, using in-memory fallback", err);
    return memRateLimit(identifier, limit, windowMs);
  }
}

export function getIp(req: Request): string {
  // Vercel appends the real client IP as the last entry in x-forwarded-for
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return ips[ips.length - 1] ?? "unknown";
  }
  return "unknown";
}
