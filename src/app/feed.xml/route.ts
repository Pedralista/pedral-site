import { collections, isHidden } from "@/lib/collections";

const siteUrl = "https://www.pedral.eu";
const brand = "Pedral";

function availability(stock: number): string {
  return stock > 0 ? "in_stock" : "out_of_stock";
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items: string[] = [];

  for (const c of collections.filter((col) => !isHidden(col) && !col.isEnquiryOnly)) {
    if (c.variants && c.variants.length > 0) {
      for (const v of c.variants) {
        const id = `${c.slug}-${v.name.toLowerCase().replace(/\s+/g, "-")}`;
        const price = v.price ?? c.price;
        const color = v.color ?? "Silver";
        items.push(`
    <item>
      <g:id>${escapeXml(id)}</g:id>
      <g:item_group_id>${escapeXml(c.slug)}</g:item_group_id>
      <title>${escapeXml(`Pedral ${c.name} — ${v.name}`)}</title>
      <description>${escapeXml(v.description ?? c.description)}</description>
      <link>${siteUrl}/collections/${c.slug}</link>
      <g:image_link>${siteUrl}${v.image ?? c.image}</g:image_link>
      <g:price>${price.toFixed(2)} EUR</g:price>
      <g:availability>${availability(v.stock)}</g:availability>
      <g:brand>${brand}</g:brand>
      <g:condition>new</g:condition>
      <g:color>${escapeXml(color)}</g:color>
      <g:gender>unisex</g:gender>
      <g:age_group>adult</g:age_group>
      <g:product_type>Watches &gt; Dress Watches</g:product_type>
      <g:google_product_category>201</g:google_product_category>
    </item>`);
      }
    } else {
      items.push(`
    <item>
      <g:id>${escapeXml(c.slug)}</g:id>
      <title>${escapeXml(`Pedral ${c.name}`)}</title>
      <description>${escapeXml(c.description)}</description>
      <link>${siteUrl}/collections/${c.slug}</link>
      <g:image_link>${siteUrl}${c.image}</g:image_link>
      <g:price>${c.price.toFixed(2)} EUR</g:price>
      <g:availability>${availability(c.stock)}</g:availability>
      <g:brand>${brand}</g:brand>
      <g:condition>new</g:condition>
      <g:color>Silver</g:color>
      <g:gender>unisex</g:gender>
      <g:age_group>adult</g:age_group>
      <g:product_type>Watches &gt; Dress Watches</g:product_type>
      <g:google_product_category>201</g:google_product_category>
    </item>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Pedral Watches</title>
    <link>${siteUrl}</link>
    <description>Stockholm-based watch microbrand. Limited editions.</description>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
