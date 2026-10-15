export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';

/**
 * Hardcoded reference rates against INR.
 *
 * These are illustrative prototype values and do NOT reflect live forex.
 * They are stale after deployment; for a live site fetch rates from a
 * provider such as exchangerate.host or OpenExchangeRates and cache with a
 * short TTL (e.g. 1 hour).
 */
export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  JPY: 1.77,
};

/**
 * Timestamp of the last time `CURRENCY_RATES` was considered fresh, in ms
 * since the Unix epoch. Used by `isRatesStale` to enforce a staleness window.
 */
let ratesFreshUntil = Date.now();

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

/** Whether the currently loaded rates have exceeded the staleness window. */
export function isRatesStale(): boolean {
  return Date.now() > ratesFreshUntil;
}

/**
 * Mark rates as fresh (call this after populating `CURRENCY_RATES` from an
 * external rate provider). The window argument sets how long the new values
 * are considered valid, in ms (default 1 hour).
 */
export function refreshRates(windowMs = 60 * 60 * 1000): void {
  ratesFreshUntil = Date.now() + windowMs;
}

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
