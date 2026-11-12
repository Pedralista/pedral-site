import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { checkOwnerDiscount, OWNER_PERCENT_OFF } from "@/lib/owner-discount";

// Checks the lifetime owner code + email from the product page, so the page can
// show the discount before checkout. The checkout route checks it again.
export async function POST(req: NextRequest) {
  const { allowed } = await rateLimit(`owner-code:${getIp(req)}`, 8, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many tries — please wait a minute." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const result = checkOwnerDiscount(body?.code, body?.email);
  if (!result.ok) {
    return NextResponse.json(
      { error: "This code doesn't match that email. Use the email address from your Pedral order." },
      { status: 400 },
    );
  }
  return NextResponse.json({ percentOff: OWNER_PERCENT_OFF });
}
