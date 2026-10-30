import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/collections";
import { getNumberStatus, numberPool } from "@/lib/edition-numbers";

// Which numbers of a numbered edition are sold (paid) or reserved (in checkout).
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const collection = collections.find((c) => c.slug === slug && c.editionNumbers);
  if (!collection?.editionNumbers) {
    return NextResponse.json({ error: "Unknown edition" }, { status: 404 });
  }
  const pool = numberPool(collection, req.nextUrl.searchParams.get("dial") ?? undefined);
  if (!pool) {
    return NextResponse.json({ error: "Unknown dial" }, { status: 404 });
  }
  const { sold, reserved } = await getNumberStatus(pool, collection.editionNumbers);
  return NextResponse.json({ total: collection.editionNumbers, sold, reserved }, { headers: { "Cache-Control": "no-store" } });
}
