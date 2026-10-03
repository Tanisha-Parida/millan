export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  JPY: 1.77,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

export function formatPrice(inr: number, currency: CurrencyCode = 'INR'): string {
  const value = inr * CURRENCY_RATES[currency];
  const decimals = currency === 'JPY' ? 0 : currency === 'INR' ? 0 : 2;
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString(
    currency === 'INR' ? 'en-IN' : 'en-US',
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  )}`;
}
