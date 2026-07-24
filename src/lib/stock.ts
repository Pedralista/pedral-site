import { Redis } from "@upstash/redis";
import type { Collection } from "@/lib/collections";

// ── Live stock counters, backed by the same Upstash Redis already used for
// rate limiting. Requires UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in
// env — falls back to the static numbers already in collections.ts when those
// aren't set (local dev) or if Redis errors, so a Redis hiccup never breaks a
// page render or blocks an order from completing.

const useUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient: Redis | null = null;
function getRedis(): Redis {
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redisClient;
}

export function slugifyPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stockKey(slug: string, part: string): string {
  return `stock:${slug}:${part}`;
}

/**
 * Reads the live remaining count for one counter, seeding it from `fallback`
 * (the static number in collections.ts) the first time it's ever read. After
 * that, Redis is the source of truth until the next sale decrements it.
 */
export async function getLiveStock(
  slug: string,
  part: string,
  fallback: number
): Promise<number> {
  if (!useUpstash) return fallback;
  try {
    const redis = getRedis();
    const key = stockKey(slug, part);
    const setIfAbsent = await redis.set(key, fallback, { nx: true });
    if (setIfAbsent === null) {
      const existing = await redis.get<number>(key);
      return existing ?? fallback;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Decrements one live counter by 1 (seeding it first if this is the first
 * sale against it), clamped at 0 so it can never go negative. Silently
 * no-ops on any Redis failure — a tracking miss must never block order
 * fulfillment or fail the webhook.
 */
export async function decrementStock(
  slug: string,
  part: string,
  fallback: number
): Promise<void> {
  if (!useUpstash) return;
  try {
    const redis = getRedis();
    const key = stockKey(slug, part);
    await redis.set(key, fallback, { nx: true });
    const newValue = await redis.decr(key);
    if (newValue < 0) await redis.set(key, 0);
  } catch {
    // Swallow — see docblock above.
  }
}

export interface StockTarget {
  part: string;
  fallback: number;
}

/**
 * Given a collection and the variant-name string stored in Stripe checkout
 * metadata (e.g. "Hand-Wound" or "Hand-Wound · Black Mother of Pearl"),
 * returns every counter that represents one unit of this purchase: the
 * product total, the matching variant, and the matching dial/numeral option
 * if the product tracks stock at that level too.
 */
export function resolveStockTargets(
  collection: Collection,
  variantName: string | undefined
): StockTarget[] {
  const targets: StockTarget[] = [{ part: "base", fallback: collection.stock }];
  if (!variantName || !collection.variants) return targets;

  const variant = collection.variants.find(
    (v) => variantName === v.name || variantName.startsWith(`${v.name} ·`)
  );
  if (!variant) return targets;

  targets.push({ part: slugifyPart(variant.name), fallback: variant.stock });

  if (variant.numeralOptions && variant.numeralStock) {
    const dial = variant.numeralOptions.find((opt) => variantName.endsWith(opt));
    if (dial && variant.numeralStock[dial] !== undefined) {
      targets.push({
        part: `${slugifyPart(variant.name)}-${slugifyPart(dial)}`,
        fallback: variant.numeralStock[dial],
      });
    }
  }

  return targets;
}
