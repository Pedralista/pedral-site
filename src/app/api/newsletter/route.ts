import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { subscribeToKlaviyo } from "@/lib/klaviyo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed } = await rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email, website, source } = await req.json();

  // Honeypot — bots fill this, humans don't
  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Klaviyo since 2026-11-23 (was Mailchimp). See src/lib/klaviyo.ts.
  const SOURCES = ["Footer newsletter", "Exit-intent pop-up", "Notify me"];
  const src = typeof source === "string" && SOURCES.includes(source) ? source : "Site newsletter";
  const ok = await subscribeToKlaviyo(String(email).trim().toLowerCase(), `pedral.eu · ${src}`);
  if (ok) return NextResponse.json({ success: true });
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
}
