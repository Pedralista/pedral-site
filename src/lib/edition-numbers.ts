import { Redis } from "@upstash/redis";

// Numbered editions where the buyer picks their own number (e.g. Étiquette
// Famille Royale, 01–21). A number is "held" for 30 minutes while someone is in
// checkout — so two people can't pay for the same one — and becomes "sold"
// for good when the Stripe webhook confirms payment.

const HOLD_SECONDS = 30 * 60;

let redis: Redis | null = null;
function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  if (!redis) redis = new Redis({ url, token });
  return redis;
}

const soldKey = (slug: string) => `edition:${slug}:sold`;
const holdKey = (slug: string, n: number) => `edition:${slug}:hold:${n}`;

/** Sold numbers (paid) and reserved ones (held in someone's checkout). */
export async function getNumberStatus(slug: string, total: number): Promise<{ sold: number[]; reserved: number[] }> {
  const r = getRedis();
  if (!r) return { sold: [], reserved: [] };
  try {
    const sold = ((await r.smembers(soldKey(slug))) as (string | number)[]).map(Number).sort((a, b) => a - b);
    const holds = await r.mget<(string | null)[]>(
      ...Array.from({ length: total }, (_, i) => holdKey(slug, i + 1))
    );
    const reserved = holds.flatMap((h, i) => (h && !sold.includes(i + 1) ? [i + 1] : []));
    return { sold, reserved };
  } catch {
    return { sold: [], reserved: [] };
  }
}

/**
 * Holds a number for a checkout. Returns false if it's sold or already held
 * by someone else (`holder` is a random id per visitor, so reopening your own
 * checkout keeps your hold). Fails open (true) if Redis is unavailable, so a storage
 * hiccup never blocks a sale — Kevin can sort a rare clash by hand.
 */
export async function holdNumber(slug: string, n: number, holder: string): Promise<boolean> {
  const r = getRedis();
  if (!r) return true;
  try {
    if (await r.sismember(soldKey(slug), n)) return false;
    const key = holdKey(slug, n);
    const ok = await r.set(key, holder, { nx: true, ex: HOLD_SECONDS });
    if (ok !== null) return true;
    // Already held — fine if it's the same visitor reopening their checkout.
    if ((await r.get<string>(key)) === holder) {
      await r.expire(key, HOLD_SECONDS);
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

/** Marks a number as sold (called from the Stripe webhook after payment). */
export async function markNumberSold(slug: string, n: number): Promise<void> {
  const r = getRedis();
  if (!r) return;
  try {
    await r.sadd(soldKey(slug), n);
    await r.del(holdKey(slug, n));
  } catch {
    // never block the webhook
  }
}
