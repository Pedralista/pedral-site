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
    const variants: Record<string, number> = {};
    const numeralStock: Record<string, Record<string, number>> = {};
    let stock: number;

    if (c.variants) {
      let totalSellable = 0;
      for (const v of c.variants) {
        const rawVariantStock = await getLiveStock(c.slug, slugifyPart(v.name), v.stock);
        const soldOut = new Set(v.soldOutNumerals ?? []);
        let sellableVariantStock = rawVariantStock;

        if (v.numeralStock) {
          numeralStock[v.name] = {};
          sellableVariantStock = 0;
          for (const [dial, fallback] of Object.entries(v.numeralStock)) {
            const dialStock = await getLiveStock(
              c.slug,
              `${slugifyPart(v.name)}-${slugifyPart(dial)}`,
              fallback
            );
            numeralStock[v.name][dial] = dialStock;
            // A retired dial's Redis counter never learns it was manually
            // sold out (only real sales decrement it) — exclude it here so
            // it can't inflate "remaining" on the collections grid.
            if (!soldOut.has(dial)) sellableVariantStock += dialStock;
          }
        }

        variants[v.name] = sellableVariantStock;
        totalSellable += sellableVariantStock;
      }
      stock = totalSellable;
    } else {
      stock = await getLiveStock(c.slug, "base", c.stock);
    }

    result[c.slug] = { stock, variants, numeralStock };
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
