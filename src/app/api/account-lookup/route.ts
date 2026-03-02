import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

function mailchimpHash(email: string) {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DC = API_KEY?.split("-")[1];
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedral.eu";

  const [stripeResult, mailchimpResult] = await Promise.allSettled([
    (async () => {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length === 0) return null;
      const session = await stripe.billingPortal.sessions.create({
        customer: customers.data[0].id,
        return_url: `${origin}/account`,
      });
      return session.url;
    })(),

    (async () => {
      if (!API_KEY || !AUDIENCE_ID || !DC) return null;
      const hash = mailchimpHash(email);
      const res = await fetch(
        `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
          },
        }
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data.status === "unsubscribed" || data.status === "cleaned") return null;
      return {
        status: data.status as string,
        since: (data.timestamp_opt || data.timestamp_signup) as string | null,
        firstName: (data.merge_fields?.FNAME as string) || null,
      };
    })(),
  ]);

  const stripePortalUrl = stripeResult.status === "fulfilled" ? stripeResult.value : null;
  const subscriber = mailchimpResult.status === "fulfilled" ? mailchimpResult.value : null;

  if (!stripePortalUrl && !subscriber) {
    return NextResponse.json(
      { error: "No account or subscription found for this email." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    isCustomer: !!stripePortalUrl,
    stripePortalUrl,
    isSubscriber: !!subscriber,
    subscriber,
  });
}
