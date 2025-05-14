/**
 * Format a price with 2 decimal places
 */
export function formatPrice(price: number): string {
  return price.toFixed(2)
}

/**
 * Format a number with commas for thousands
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}
