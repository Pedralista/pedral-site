import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/collections";
import { getNumberStatus } from "@/lib/edition-numbers";

// Which numbers of a numbered edition are sold (paid) or reserved (in checkout).
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const collection = collections.find((c) => c.slug === slug && c.editionNumbers);
  if (!collection?.editionNumbers) {
    return NextResponse.json({ error: "Unknown edition" }, { status: 404 });
  }
  const { sold, reserved } = await getNumberStatus(slug, collection.editionNumbers);
  return NextResponse.json({ total: collection.editionNumbers, sold, reserved }, { headers: { "Cache-Control": "no-store" } });
}
