import { NextResponse } from "next/server";
import { collections } from "@/lib/collections";
import { getLiveStock, slugifyPart } from "@/lib/stock";

export interface LiveStockPayload {
  stock: number;
  variants: Record<string, number>;
  numeralStock: Record<string, Record<string, number>>;
}

export async function GET() {
  const result: Record<string, LiveStockPayload> = {};

  for (const c of collections) {
    const stock = await getLiveStock(c.slug, "base", c.stock);
    const variants: Record<string, number> = {};
    const numeralStock: Record<string, Record<string, number>> = {};

    if (c.variants) {
      for (const v of c.variants) {
        variants[v.name] = await getLiveStock(c.slug, slugifyPart(v.name), v.stock);
        if (v.numeralStock) {
          numeralStock[v.name] = {};
          for (const [dial, fallback] of Object.entries(v.numeralStock)) {
            numeralStock[v.name][dial] = await getLiveStock(
              c.slug,
              `${slugifyPart(v.name)}-${slugifyPart(dial)}`,
              fallback
            );
          }
        }
      }
    }

    result[c.slug] = { stock, variants, numeralStock };
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
