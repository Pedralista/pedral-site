// Stock line on the collection cards (homepage carousel and /collections).
// Kevin (2026-11-07): no counts on the cards, but elevated wording that
// still signals scarcity, different on each card (Collection.cardScarcity).
// At 3 or fewer pieces every card says "The final pieces".
export function cardStockLabel(stock: number, phrase?: string): string {
  if (stock <= 3) return "The final pieces";
  if (phrase) return phrase;
  return stock <= 10 ? "Very few remain" : "Strictly limited";
}
