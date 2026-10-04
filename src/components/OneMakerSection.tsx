import React from 'react';
import { EXAMPLE_BREAKDOWN, formatINR } from '../lib/pricing';

export const OneMakerSection: React.FC = () => {
  const { materials, labour, milaanFee, shipping, buyerTotal, makerSharePct } = EXAMPLE_BREAKDOWN;
  const makerTotal = materials + labour;

  return (
    <section
      id="how-it-works"
      className="bg-khadi section-padding relative overflow-hidden"
      aria-label="How one craft reaches you"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl text-ink font-normal leading-tight">
            How one craft reaches you
          </h2>
          <p className="text-ink-soft text-base sm:text-lg mt-4 max-w-[62ch]">
            Follow the journey of a hand-tied Sambalpuri silk saree from the weaver's voice to your home.
          </p>
        </div>

        {/* Continuous Stitched Thread Container */}
        <div className="relative">
          {/* Desktop Connecting Thread (horizontal running stitch madder line) */}
          <div className="hidden lg:block absolute top-4 left-8 right-8 h-[2px] pointer-events-none z-0">
            <svg
              className="w-full h-[2px] overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="var(--color-madder)"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile/Tablet Connecting Thread (vertical running stitch madder line) */}
          <div className="lg:hidden absolute top-4 bottom-12 left-4 w-[2px] -translate-x-1/2 pointer-events-none z-0">
            <svg
              className="w-[2px] h-full overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="var(--color-madder)"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 4 Stops along the journey (horizontal on lg, vertical on mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {/* ─── STOP 1: Voice ────────────────────────────────────────────── */}
            <div className="flex flex-col relative pl-12 lg:pl-0">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6 absolute left-0 top-0 lg:static">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm ring-4 ring-khadi z-10">
                  1
                </span>
                {/* Audio Waveform Glyph */}
                <div
                  className="hidden sm:flex lg:flex items-center gap-1 h-5 text-madder bg-khadi px-1.5 rounded z-10"
                  aria-hidden="true"
                  title="Audio voice recording"
                >
                  <span className="w-1 h-2.5 bg-madder rounded-full" />
                  <span className="w-1 h-4 bg-madder rounded-full" />
                  <span className="w-1 h-5 bg-madder rounded-full" />
                  <span className="w-1 h-3 bg-madder rounded-full" />
                  <span className="w-1 h-2 bg-madder rounded-full" />
                </div>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3 [text-wrap:balance]">
                Voice
              </h3>

              {/* No card borders or backgrounds on Stop 1 */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* NOTE: Odia text needs a native speaker's check. */}
                  <p className="font-heading text-lg text-ink leading-relaxed mb-4 max-w-[62ch] [text-wrap:pretty]">
                    “ମୋର ଏଇ ଶାଢ଼ୀ ବୁଣିବା ପାଇଁ ୩୬ ଘଣ୍ଟା ଲାଗିଲା। ସବୁ ସୂତା କୁ ହାତରେ ବାନ୍ଧି ପ୍ରାକୃତିକ ରଙ୍ଗ ଦିଆଯାଇଛି।”
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed max-w-[62ch] [text-wrap:pretty]">
                    “It took 36 hours to weave this saree on our pit loom. Every thread was tied by hand and dyed in natural colours.”
                  </p>
                </div>
                <p className="text-xs text-ink-soft mt-4 pt-3 border-t border-clay/40">
                  Odia
                </p>
              </div>
            </div>

            {/* ─── STOP 2: Listing ──────────────────────────────────────────── */}
            <div className="flex flex-col relative pl-12 lg:pl-0">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6 absolute left-0 top-0 lg:static">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm ring-4 ring-khadi z-10">
                  2
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3 [text-wrap:balance]">
                Listing
              </h3>

              {/* Hang Tag Shape with Punched Hole */}
              <div className="bg-parchment border border-clay/70 rounded-[4px] p-6 relative shadow-xs flex-1 flex flex-col justify-between">
                {/* Tag String & Eyelet */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-0.5 h-3 bg-clay" />
                  <div className="w-2.5 h-2.5 rounded-full bg-khadi border border-clay" />
                </div>

                <div className="pt-2">
                  <div className="text-xs text-madder font-medium mb-1">
                    Handloom textile
                  </div>
                  <h4 className="font-heading text-lg text-ink font-semibold leading-snug mb-1 [text-wrap:balance]">
                    Sambalpuri Bandha silk saree
                  </h4>
                  <p className="text-sm text-ink font-medium">
                    Minati & Dinabandhu Meher
                  </p>
                  <p className="text-xs text-ink-soft mb-3">
                    Pit-Loom Bandha · Barpali, Odisha
                  </p>

                  <div className="inline-block bg-khadi/70 border border-clay/40 rounded-[2px] px-3 py-1 text-xs text-ink-soft">
                    36 hours of handloom work
                  </div>
                </div>

                <p className="text-xs text-ink-soft/90 mt-4 pt-3 border-t border-clay/40 [text-wrap:pretty]">
                  Written in Odia, English and Hindi.
                </p>
              </div>
            </div>

            {/* ─── STOP 3: Price ────────────────────────────────────────────── */}
            <div className="flex flex-col relative pl-12 lg:pl-0">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6 absolute left-0 top-0 lg:static">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm ring-4 ring-khadi z-10">
                  3
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3 [text-wrap:balance]">
                Price
              </h3>

              {/* Ledger Format with Dotted Leaders & Right-Aligned Figures in Grid */}
              <div className="bg-parchment border border-clay/70 rounded-[4px] p-6 shadow-xs flex-1 flex flex-col justify-between font-body text-sm text-ink">
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0">
                    <span className="text-ink-soft">Materials reimbursed</span>
                    <span className="tabular-nums font-medium text-right">{formatINR(materials)}</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0">
                    <span className="text-ink-soft">Labour (36h × ₹275)</span>
                    <span className="tabular-nums font-medium text-right">{formatINR(labour)}</span>
                  </div>

                  <div className="pt-2 border-t border-clay/40 grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0 text-neem font-semibold">
                    <span>Maker receives</span>
                    <span className="tabular-nums text-right">{formatINR(makerTotal)}</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0 text-ink-soft">
                    <span>Milaan fee (8%)</span>
                    <span className="tabular-nums text-right">{formatINR(milaanFee)}</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0 text-ink-soft">
                    <span>Shipping</span>
                    <span className="tabular-nums text-right">{formatINR(shipping)}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-ink/20 grid grid-cols-[1fr_auto] gap-x-4 items-baseline min-w-0 font-semibold text-base text-ink">
                  <span>Total</span>
                  <span className="tabular-nums text-lg font-bold text-right">{formatINR(buyerTotal)}</span>
                </div>
              </div>
            </div>

            {/* ─── STOP 4: Payment ──────────────────────────────────────────── */}
            <div className="flex flex-col relative pl-12 lg:pl-0">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6 absolute left-0 top-0 lg:static">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm ring-4 ring-khadi z-10">
                  4
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3 [text-wrap:balance]">
                Payment
              </h3>

              {/* No card borders or backgrounds on Stop 4 */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4 max-w-[62ch] [text-wrap:pretty]">
                    Funds transfer directly to Minati and Dinabandhu upon dispatch without middlemen holding back earnings.
                  </p>

                  <div className="bg-neem/10 border border-neem/30 rounded-[4px] p-4 text-center">
                    <div className="text-xs text-neem font-medium mb-1">
                      Maker receives
                    </div>
                    <div className="font-heading text-3xl text-neem font-bold tabular-nums">
                      {formatINR(makerTotal)}
                    </div>
                    <div className="text-xs text-ink-soft mt-1">
                      {makerSharePct}% of buyer total
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-soft mt-4 pt-3 border-t border-clay/40 [text-wrap:pretty]">
                  Example calculation for illustrative transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneMakerSection;
