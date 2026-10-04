import React from 'react';
import { EXAMPLE_BREAKDOWN, formatINR } from '../lib/pricing';

export const ProblemSection: React.FC = () => {
  const { materials, labour, milaanFee, shipping, buyerTotal } = EXAMPLE_BREAKDOWN;
  const makerDirect = materials + labour; // ₹13,100

  // Middleman comparison based on the same ₹14,748 saree
  // Middleman retail typically yields ₹3,500 guaranteed to ₹6,000 max for the maker
  const mmMakerMin = 3500;
  const mmMakerMax = 6000;
  const mmUncertain = mmMakerMax - mmMakerMin; // 2500
  const mmCut = buyerTotal - mmMakerMax; // ~8748

  const mmMakerPct = (mmMakerMin / buyerTotal) * 100;
  const mmUncertainPct = (mmUncertain / buyerTotal) * 100;
  const mmCutPct = (mmCut / buyerTotal) * 100;

  // Milaan breakdown percentages
  const milaanMakerPct = (makerDirect / buyerTotal) * 100; // ~88.8%
  const milaanFeePct = (milaanFee / buyerTotal) * 100;     // ~7.1%
  const milaanShippingPct = (shipping / buyerTotal) * 100; // ~4.1%

  return (
    <section
      id="who-keeps-the-money"
      className="bg-parchment section-padding border-t border-clay/30"
      aria-label="Who keeps the money breakdown"
    >
      <div className="site-container">
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-left">
            <h2 className="font-heading text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Who keeps the money
            </h2>
            <p className="text-ink-soft text-base sm:text-lg mt-3">
              Comparing what reaches the weaver for the same {formatINR(buyerTotal)} handloom silk saree.
            </p>
          </div>

          <div className="space-y-12">
            {/* ─── BAR 1: Through middlemen (Illustration) ────────────────── */}
            <div className="bg-khadi/60 border border-clay/50 rounded-[4px] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
                <h3 className="font-heading text-xl text-ink font-semibold">
                  Through middlemen
                </h3>
                <span className="text-xs text-ink-soft italic">
                  Illustration based on multi-tier wholesale markups
                </span>
              </div>

              {/* Stacked comparison bar */}
              <div
                className="w-full h-10 rounded-[4px] overflow-hidden flex border border-clay/60 bg-clay/20 shadow-inner"
                role="progressbar"
                aria-label={`Middleman breakdown: maker gets between ${formatINR(mmMakerMin)} and ${formatINR(mmMakerMax)}, middlemen keep ${formatINR(mmCut)}`}
                aria-valuenow={Math.round((mmMakerMax / buyerTotal) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* Guaranteed maker share */}
                <div
                  style={{ width: `${mmMakerPct}%` }}
                  className="bg-neem/80 h-full"
                  title={`Guaranteed maker share: ${formatINR(mmMakerMin)}`}
                />
                {/* Uncertain hatched range */}
                <div
                  style={{
                    width: `${mmUncertainPct}%`,
                    backgroundImage:
                      'repeating-linear-gradient(45deg, var(--color-neem), var(--color-neem) 4px, var(--color-clay) 4px, var(--color-clay) 8px)',
                  }}
                  className="h-full opacity-80"
                  title={`Uncertain maker commission: up to ${formatINR(mmMakerMax)}`}
                />
                {/* Middlemen margin */}
                <div
                  style={{ width: `${mmCutPct}%` }}
                  className="bg-clay h-full"
                  title={`Middlemen, wholesalers, and retail margins: ${formatINR(mmCut)}`}
                />
              </div>

              {/* Clean Legend below bar (no clipped text inside segments) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-clay/40 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[2px] bg-neem shrink-0" />
                  <span className="text-ink">
                    Maker share:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(mmMakerMin)}–{formatINR(mmMakerMax)}
                    </span>{' '}
                    <span className="text-ink-soft text-xs">(24%–41%)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[2px] bg-clay shrink-0" />
                  <span className="text-ink">
                    Middlemen & traders:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(mmCut)}
                    </span>{' '}
                    <span className="text-ink-soft text-xs">(59%–76%)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ─── BAR 2: Through Milaan ────────────────────────────────────── */}
            <div className="bg-khadi/60 border border-neem/40 rounded-[4px] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
                <h3 className="font-heading text-xl text-ink font-semibold">
                  Through Milaan
                </h3>
                <span className="text-xs text-neem font-semibold">
                  Artisan keeps 89% of buyer payment
                </span>
              </div>

              {/* Stacked comparison bar */}
              <div
                className="w-full h-10 rounded-[4px] overflow-hidden flex border border-clay/60 bg-clay/20 shadow-inner"
                role="progressbar"
                aria-label={`Milaan breakdown: maker receives ${formatINR(makerDirect)} (89%), platform fee ${formatINR(milaanFee)} (8%), shipping ${formatINR(shipping)} (4%)`}
                aria-valuenow={Math.round(milaanMakerPct)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* Maker received (materials reimbursed + labour) */}
                <div
                  style={{ width: `${milaanMakerPct}%` }}
                  className="bg-neem h-full"
                  title={`Maker receives: ${formatINR(makerDirect)}`}
                />
                {/* Platform fee */}
                <div
                  style={{ width: `${milaanFeePct}%` }}
                  className="bg-haldi h-full"
                  title={`Milaan platform fee: ${formatINR(milaanFee)}`}
                />
                {/* Shipping */}
                <div
                  style={{ width: `${milaanShippingPct}%` }}
                  className="bg-ink-soft h-full"
                  title={`Direct insured shipping: ${formatINR(shipping)}`}
                />
              </div>

              {/* Clean Legend below bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-clay/40 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[2px] bg-neem shrink-0" />
                  <span className="text-ink">
                    Maker receives:{' '}
                    <span className="font-semibold text-neem tabular-nums">
                      {formatINR(makerDirect)}
                    </span>{' '}
                    <span className="text-ink-soft text-xs">(89%)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[2px] bg-haldi shrink-0" />
                  <span className="text-ink">
                    Milaan fee:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(milaanFee)}
                    </span>{' '}
                    <span className="text-ink-soft text-xs">(8%)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[2px] bg-ink-soft shrink-0" />
                  <span className="text-ink">
                    Shipping:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(shipping)}
                    </span>{' '}
                    <span className="text-ink-soft text-xs">(4%)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
