// Stock line on the collection cards (homepage carousel and /collections).
// Kevin (2026-11-07): no counts on the cards — just a word.
export function cardStockLabel(stock: number): string {
  return stock <= 10 ? "Few left" : "Limited";
}
