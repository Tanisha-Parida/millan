import { describe, it, expect } from 'vitest';
import { computeBreakdown, formatINR, DEFAULT_EXAMPLE, EXAMPLE_BREAKDOWN } from '../../src/lib/pricing';

// The config module imports MILAAN_FEE_PCT from src/config.ts.
// Vitest picks it up via the default vite config without mocking.

describe('computeBreakdown', () => {
  it('matches the DEFAULT_EXAMPLE snapshot', () => {
    const b = computeBreakdown(DEFAULT_EXAMPLE);
    // materials=3200, hours=36, ratePerHour=275, shipping=600, fee=8%
    expect(b.labour).toBe(36 * 275);          // 9900
    expect(b.materials).toBe(3200);
    expect(b.shipping).toBe(600);
    expect(b.milaanFee).toBe(Math.round((3200 + 9900) * 0.08)); // 1048
    expect(b.buyerTotal).toBe(3200 + 9900 + 1048 + 600);        // 14748
    expect(b.makerEarnings).toBe(9900);
    expect(b.makerSharePct).toBe(Math.round(((3200 + 9900) / 14748) * 100)); // 89
  });

  it('EXAMPLE_BREAKDOWN equals computeBreakdown(DEFAULT_EXAMPLE)', () => {
    expect(EXAMPLE_BREAKDOWN).toEqual(computeBreakdown(DEFAULT_EXAMPLE));
  });

  it('returns zero-safe values when inputs are 0', () => {
    const b = computeBreakdown({ materials: 0, hours: 0, ratePerHour: 0, shipping: 0 });
    expect(b.buyerTotal).toBe(0);
    expect(b.makerSharePct).toBe(0);
  });

  it('uses a custom feePct when provided', () => {
    const b = computeBreakdown({ ...DEFAULT_EXAMPLE, feePct: 0.1 });
    expect(b.milaanFee).toBe(Math.round((3200 + 9900) * 0.1)); // 1310
  });

  it('makerSharePct + fee + shipping always sum to 100% (±1 due to rounding)', () => {
    const b = computeBreakdown(DEFAULT_EXAMPLE);
    const feePct = Math.round((b.milaanFee / b.buyerTotal) * 100);
    const shipPct = Math.round((b.shipping / b.buyerTotal) * 100);
    expect(b.makerSharePct + feePct + shipPct).toBeGreaterThanOrEqual(99);
    expect(b.makerSharePct + feePct + shipPct).toBeLessThanOrEqual(101);
  });

  it('never returns negative numbers for valid positive inputs', () => {
    const b = computeBreakdown({ materials: 100, hours: 5, ratePerHour: 300, shipping: 200 });
    for (const val of Object.values(b)) {
      expect(val).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('formatINR', () => {
  it('formats zero', () => {
    expect(formatINR(0)).toBe('₹0');
  });

  it('formats thousands with Indian comma grouping', () => {
    // 14748 → ₹14,748
    expect(formatINR(14748)).toMatch(/₹14,748/);
  });

  it('formats lakhs correctly', () => {
    // 100000 → ₹1,00,000
    expect(formatINR(100000)).toMatch(/₹1,00,000/);
  });
});
