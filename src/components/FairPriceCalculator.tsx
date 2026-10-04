import React, { useState, useId } from 'react';
import {
  computeBreakdown,
  DEFAULT_EXAMPLE,
  formatINR,
  type PricingInput,
} from '../lib/pricing';

export const FairPriceCalculator: React.FC = () => {
  const [params, setParams] = useState<PricingInput>(DEFAULT_EXAMPLE);

  const breakdown = computeBreakdown(params);
  const makerTotal = breakdown.materials + breakdown.labour;

  // Percentage widths for the stacked result bar
  const total = breakdown.buyerTotal;
  const materialsPct = total > 0 ? (breakdown.materials / total) * 100 : 0;
  const labourPct = total > 0 ? (breakdown.labour / total) * 100 : 0;
  const feePct = total > 0 ? (breakdown.milaanFee / total) * 100 : 0;
  const shippingPct = total > 0 ? (breakdown.shipping / total) * 100 : 0;

  const handleReset = () => {
    setParams(DEFAULT_EXAMPLE);
  };

  const updateParam = (key: keyof PricingInput, val: number) => {
    setParams((prev) => ({
      ...prev,
      [key]: Math.max(0, isNaN(val) ? 0 : val),
    }));
  };

  const matId = useId();
  const hrsId = useId();
  const rateId = useId();
  const shipId = useId();

  return (
    <section
      id="fair-price"
      className="bg-khadi-deep section-padding border-t border-clay/30"
      aria-label="Fair price interactive calculator"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <h2 className="font-heading text-3xl sm:text-4xl text-ink font-normal leading-tight">
            Fair price calculator
          </h2>
          <p className="text-ink-soft text-base sm:text-lg mt-3">
            Every rupee is transparently accounted for before a craft is listed. Adjust the parameters to see how fair wages work.
          </p>
        </div>

        {/* 2-Column Layout: Controls on Left, Sticky Results Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── LEFT: 4 Inputs in a Parchment Panel (7 cols) ─────────────── */}
          <div className="lg:col-span-7 bg-parchment border border-clay/70 rounded-[4px] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-clay/40">
              <h3 className="font-heading text-lg text-ink font-semibold">
                Cost parameters
              </h3>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-madder hover:text-madder-dark font-medium underline underline-offset-4 cursor-pointer"
              >
                Reset to example
              </button>
            </div>

            {/* 1. Materials Cost */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor={matId} className="font-body text-sm text-ink font-medium">
                  Raw materials cost
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-ink-soft">₹</span>
                  <input
                    id={matId}
                    type="number"
                    min="0"
                    max="50000"
                    step="100"
                    value={params.materials || ''}
                    onChange={(e) => updateParam('materials', parseInt(e.target.value, 10))}
                    className="w-24 h-9 px-2 text-right bg-khadi/60 border border-clay rounded-[6px] text-ink font-body text-sm font-semibold tabular-nums focus:outline-none focus:border-madder [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="100"
                value={params.materials}
                onChange={(e) => updateParam('materials', parseInt(e.target.value, 10))}
                className="w-full accent-madder h-2 bg-clay/30 rounded-lg cursor-pointer"
                aria-label="Raw materials cost slider"
              />
              <div className="flex justify-between text-xs text-ink-soft mt-1">
                <span>₹500</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* 2. Hours of Work */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor={hrsId} className="font-body text-sm text-ink font-medium">
                  Hours of handloom crafting
                </label>
                <div className="flex items-center gap-1">
                  <input
                    id={hrsId}
                    type="number"
                    min="1"
                    max="300"
                    step="1"
                    value={params.hours || ''}
                    onChange={(e) => updateParam('hours', parseInt(e.target.value, 10))}
                    className="w-20 h-9 px-2 text-right bg-khadi/60 border border-clay rounded-[6px] text-ink font-body text-sm font-semibold tabular-nums focus:outline-none focus:border-madder [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-xs text-ink-soft">hrs</span>
                </div>
              </div>
              <input
                type="range"
                min="4"
                max="120"
                step="1"
                value={params.hours}
                onChange={(e) => updateParam('hours', parseInt(e.target.value, 10))}
                className="w-full accent-madder h-2 bg-clay/30 rounded-lg cursor-pointer"
                aria-label="Hours of crafting slider"
              />
              <div className="flex justify-between text-xs text-ink-soft mt-1">
                <span>4 hrs</span>
                <span>120 hrs</span>
              </div>
            </div>

            {/* 3. Skill Rate Per Hour */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor={rateId} className="font-body text-sm text-ink font-medium">
                  Artisan hourly skill rate
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-ink-soft">₹</span>
                  <input
                    id={rateId}
                    type="number"
                    min="50"
                    max="1000"
                    step="10"
                    value={params.ratePerHour || ''}
                    onChange={(e) => updateParam('ratePerHour', parseInt(e.target.value, 10))}
                    className="w-24 h-9 px-2 text-right bg-khadi/60 border border-clay rounded-[6px] text-ink font-body text-sm font-semibold tabular-nums focus:outline-none focus:border-madder [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-xs text-ink-soft">/hr</span>
                </div>
              </div>
              <input
                type="range"
                min="150"
                max="600"
                step="25"
                value={params.ratePerHour}
                onChange={(e) => updateParam('ratePerHour', parseInt(e.target.value, 10))}
                className="w-full accent-madder h-2 bg-clay/30 rounded-lg cursor-pointer"
                aria-label="Skill rate per hour slider"
              />
              <div className="flex justify-between text-xs text-ink-soft mt-1">
                <span>₹150/hr (Fair wage base)</span>
                <span>₹600/hr (Master kaarigar)</span>
              </div>
            </div>

            {/* 4. Shipping Cost */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor={shipId} className="font-body text-sm text-ink font-medium">
                  Insured direct shipping
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-ink-soft">₹</span>
                  <input
                    id={shipId}
                    type="number"
                    min="0"
                    max="5000"
                    step="50"
                    value={params.shipping || ''}
                    onChange={(e) => updateParam('shipping', parseInt(e.target.value, 10))}
                    className="w-24 h-9 px-2 text-right bg-khadi/60 border border-clay rounded-[6px] text-ink font-body text-sm font-semibold tabular-nums focus:outline-none focus:border-madder [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={params.shipping}
                onChange={(e) => updateParam('shipping', parseInt(e.target.value, 10))}
                className="w-full accent-madder h-2 bg-clay/30 rounded-lg cursor-pointer"
                aria-label="Insured shipping slider"
              />
              <div className="flex justify-between text-xs text-ink-soft mt-1">
                <span>₹200</span>
                <span>₹2,000</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Sticky Result Card (5 cols) ───────────────────────── */}
          <div
            className="lg:col-span-5 bg-parchment border border-clay/70 rounded-[4px] p-6 sm:p-8 shadow-sm lg:sticky lg:top-24 space-y-6"
            aria-live="polite"
          >
            <div>
              <span className="text-xs text-ink-soft uppercase tracking-wider font-semibold">
                Transparent buyer total
              </span>
              {/* Big figure allowed here in tabular Mukta / Rozha */}
              <div className="font-heading text-4xl sm:text-5xl text-ink font-bold tabular-nums mt-1">
                {formatINR(total)}
              </div>
              <p className="text-xs text-ink-soft mt-1">
                Inclusive of artisan compensation, raw materials, platform fee, and delivery.
              </p>
            </div>

            {/* Stacked Breakdown Bar */}
            <div>
              <div
                className="w-full h-8 rounded-[4px] overflow-hidden flex border border-clay/60 bg-clay/20"
                role="progressbar"
                aria-label={`Breakdown: Materials ${Math.round(materialsPct)}%, Labour ${Math.round(labourPct)}%, Platform fee ${Math.round(feePct)}%, Shipping ${Math.round(shippingPct)}%`}
                aria-valuenow={Math.round(materialsPct + labourPct)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  style={{ width: `${materialsPct}%` }}
                  className="bg-clay h-full transition-all duration-300"
                  title={`Materials: ${formatINR(breakdown.materials)}`}
                />
                <div
                  style={{ width: `${labourPct}%` }}
                  className="bg-neem h-full transition-all duration-300"
                  title={`Labour: ${formatINR(breakdown.labour)}`}
                />
                <div
                  style={{ width: `${feePct}%` }}
                  className="bg-haldi h-full transition-all duration-300"
                  title={`Platform fee: ${formatINR(breakdown.milaanFee)}`}
                />
                <div
                  style={{ width: `${shippingPct}%` }}
                  className="bg-ink-soft h-full transition-all duration-300"
                  title={`Shipping: ${formatINR(breakdown.shipping)}`}
                />
              </div>

              {/* All 4 Segments Clearly Labelled in Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-body">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-clay shrink-0" />
                  <span className="text-ink">
                    Materials:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(breakdown.materials)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-neem shrink-0" />
                  <span className="text-ink">
                    Labour:{' '}
                    <span className="font-semibold text-neem tabular-nums">
                      {formatINR(breakdown.labour)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-haldi shrink-0" />
                  <span className="text-ink">
                    Milaan fee (8%):{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(breakdown.milaanFee)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-ink-soft shrink-0" />
                  <span className="text-ink">
                    Shipping:{' '}
                    <span className="font-semibold tabular-nums">
                      {formatINR(breakdown.shipping)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Maker keeps highlight */}
            <div className="bg-neem/10 border border-neem/30 rounded-[4px] p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-neem font-semibold uppercase tracking-wide">
                  Maker receives
                </div>
                <div className="text-xs text-ink-soft">
                  Materials reimbursed + hourly labour
                </div>
              </div>
              <div className="text-right">
                <div className="font-heading text-2xl text-neem font-bold tabular-nums">
                  {formatINR(makerTotal)}
                </div>
                <div className="text-xs text-neem font-medium">
                  {breakdown.makerSharePct}% of buyer total
                </div>
              </div>
            </div>

            {/* Formula in Plain Words */}
            <p className="text-xs text-ink-soft/90 leading-relaxed pt-3 border-t border-clay/40">
              Formula: price = raw materials + (hours × hourly rate) + Milaan fee (8%) + insured shipping
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FairPriceCalculator;
