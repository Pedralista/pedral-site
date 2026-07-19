import type { Collection } from "@/lib/collections";

// ── Order add-ons (straps + case-back engraving) ─────────────────────────────
// Feature-flagged OFF by default. Two gates must BOTH pass for add-ons to show
// on a product page (and to be accepted server-side):
//   1. the master ADDONS_ENABLED flag below, and
//   2. the per-product Collection.addOnsEnabled flag (defaults undefined/off).
// This lets Kevin flip the master switch on, then opt-in individual products
// via collections.ts without touching any component code.
//
// TODO: Kevin confirm — flip to true (or enable per-product) once strap/engraving pricing and logistics are finalized
export const ADDONS_ENABLED = false;

export interface StrapAddon {
  /** Stable identifier passed between client and server. */
  slug: string;
  name: string;
  /** Price in euros. */
  price: number;
  /** Public image path for the strap thumbnail. */
  image: string;
  /** Collection slugs this strap is offered on. Easy to extend per product. */
  compatibleWith: string[];
}

// Placeholder strap catalogue. Extend / re-price before enabling.
// TODO: Kevin confirm real price, real image paths, and per-product compatibleWith slugs
export const strapAddons: StrapAddon[] = [
  {
    slug: "epsom-noir",
    name: "Epsom Leather Strap — Noir",
    price: 120, // TODO: Kevin confirm real price
    image: "/images/addons/strap-epsom-noir.jpg", // TODO: Kevin add real image
    compatibleWith: [], // TODO: Kevin add compatible collection slugs, e.g. ["maestro", "triomphe"]
  },
  {
    slug: "epsom-cognac",
    name: "Epsom Leather Strap — Cognac",
    price: 120, // TODO: Kevin confirm real price
    image: "/images/addons/strap-epsom-cognac.jpg", // TODO: Kevin add real image
    compatibleWith: [], // TODO: Kevin add compatible collection slugs
  },
];

export interface EngravingAddon {
  /** Price in euros. */
  price: number;
  /** Maximum characters allowed on the case-back. */
  maxLength: number;
}

// Case-back engraving add-on.
// TODO: Kevin confirm real price and max character count
export const engravingAddon: EngravingAddon = {
  price: 120, // TODO: Kevin confirm real price
  maxLength: 20, // TODO: Kevin confirm max character count
};

// Allowed engraving characters: letters, numbers, spaces, and basic punctuation.
// Deliberately excludes emoji / exotic unicode — not engravable on a case-back.
const ENGRAVING_ALLOWED_CHAR = /[A-Za-z0-9 .,'&-]/;

/** Straps offered on a given collection. */
export function strapsForCollection(slug: string): StrapAddon[] {
  return strapAddons.filter((s) => s.compatibleWith.includes(slug));
}

/** Look up a strap add-on by slug (used to re-derive the real price server-side). */
export function getStrapAddon(slug: string): StrapAddon | undefined {
  return strapAddons.find((s) => s.slug === slug);
}

/**
 * Strip disallowed characters and clamp to the max length. Used both for the
 * live client-side preview and — independently — for server-side re-validation.
 * Returns "" when nothing engravable remains.
 */
export function sanitizeEngraving(input: string): string {
  return Array.from(input ?? "")
    .filter((ch) => ENGRAVING_ALLOWED_CHAR.test(ch))
    .join("")
    .slice(0, engravingAddon.maxLength);
}

/** True when the raw input contains any character that would be stripped. */
export function hasDisallowedEngravingChars(input: string): boolean {
  return Array.from(input ?? "").some((ch) => !ENGRAVING_ALLOWED_CHAR.test(ch));
}

/** Both master + per-product gates must pass for add-ons to be available. */
export function addOnsEnabledFor(collection: Collection): boolean {
  return ADDONS_ENABLED && collection.addOnsEnabled === true;
}
