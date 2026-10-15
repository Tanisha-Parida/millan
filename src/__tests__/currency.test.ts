import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  formatPrice,
  isRatesStale,
  refreshRates,
  CURRENCY_RATES,
  CURRENCY_SYMBOLS,
  type CurrencyCode,
} from '../../src/lib/currency';

describe('formatPrice', () => {
  it('formats INR with Indian comma grouping', () => {
    expect(formatPrice(14748, 'INR')).toBe('₹14,748');
  });

  it('formats USD with 2 decimal places', () => {
    const result = formatPrice(14748, 'USD');
    // 14748 * 0.012 = 176.976 → $177.00 (depends on rounding)
    expect(result).toMatch(/^\$/);
    expect(result).toMatch(/\.\d{2}$/);
  });

  it('formats JPY with no decimals', () => {
    const result = formatPrice(1000, 'JPY');
    expect(result).toMatch(/^¥/);
    expect(result).not.toMatch(/\./);
  });

  it('returns ₹0 for zero', () => {
    expect(formatPrice(0, 'INR')).toBe('₹0');
  });

  it('includes correct symbol for every currency', () => {
    const currencies: CurrencyCode[] = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];
    for (const code of currencies) {
      expect(formatPrice(1000, code)).toMatch(new RegExp(`^\\${CURRENCY_SYMBOLS[code]}`));
    }
  });

  it('CURRENCY_RATES all multiply INR correctly', () => {
    // For INR the rate is exactly 1
    expect(CURRENCY_RATES['INR']).toBe(1);
    // All rates should be positive
    for (const rate of Object.values(CURRENCY_RATES)) {
      expect(rate).toBeGreaterThan(0);
    }
  });
});

describe('isRatesStale / refreshRates', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('isRatesStale is true immediately (rates never explicitly refreshed)', () => {
    // On a fresh import ratesFreshUntil = Date.now() at module-load time,
    // so after any tick forward it should be stale.
    vi.advanceTimersByTime(1);
    expect(isRatesStale()).toBe(true);
  });

  it('isRatesStale is false immediately after refreshRates()', () => {
    refreshRates(60_000);
    expect(isRatesStale()).toBe(false);
  });

  it('isRatesStale becomes true after the window expires', () => {
    refreshRates(60_000);
    vi.advanceTimersByTime(60_001);
    expect(isRatesStale()).toBe(true);
  });

  it('refreshRates accepts a custom window', () => {
    refreshRates(1_000);
    vi.advanceTimersByTime(500);
    expect(isRatesStale()).toBe(false);
    vi.advanceTimersByTime(501);
    expect(isRatesStale()).toBe(true);
  });
});
