import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function mailchimpHash(email: string) {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  const { email, action } = await req.json();

  if (!email || !action) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DC = API_KEY?.split("-")[1];

  if (!API_KEY || !AUDIENCE_ID || !DC) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (action === "unsubscribe") {
    const hash = mailchimpHash(email);
    const res = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "unsubscribed" }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
