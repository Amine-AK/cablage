// Manual grouping (not Intl) so server and client render identical strings.
export function formatPrice(amount: number, currency = "DH"): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} ${currency}`;
}
