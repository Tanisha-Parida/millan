import { MILAAN_FEE_PCT } from '../config';

export interface PricingInput {
  materials: number;
  hours: number;
  ratePerHour: number;
  shipping: number;
  feePct?: number;
}

export interface PricingBreakdown {
  materials: number;
  labour: number;
  milaanFee: number;
  shipping: number;
  buyerTotal: number;
  makerEarnings: number;
  makerSharePct: number;
}

/**
 * Single source of truth for all money calculations across the site.
 *
 * - `makerEarnings` = labour only (materials are reimbursed, not income)
 * - `milaanFee` = feePct × (materials + labour)
 * - `buyerTotal` = materials + labour + milaanFee + shipping
 * - `makerSharePct` = (materials + labour) / buyerTotal × 100
 */
export function computeBreakdown(input: PricingInput): PricingBreakdown {
  const { materials, hours, ratePerHour, shipping, feePct = MILAAN_FEE_PCT } = input;

  const labour = hours * ratePerHour;
  const makerBase = materials + labour;
  const milaanFee = Math.round(makerBase * feePct);
  const buyerTotal = makerBase + milaanFee + shipping;
  const makerSharePct = buyerTotal > 0 ? Math.round((makerBase / buyerTotal) * 100) : 0;

  return {
    materials,
    labour,
    milaanFee,
    shipping,
    buyerTotal,
    makerEarnings: labour,
    makerSharePct,
  };
}

/** Default example used across Journey, Money Bars, and Calculator. */
export const DEFAULT_EXAMPLE: PricingInput = {
  materials: 3200,
  hours: 36,
  ratePerHour: 275,
  shipping: 600,
};

/** Pre-computed breakdown for static sections. */
export const EXAMPLE_BREAKDOWN = computeBreakdown(DEFAULT_EXAMPLE);

/** Format a number as Indian rupees. */
export function formatINR(val: number): string {
  return '₹' + val.toLocaleString('en-IN');
}
