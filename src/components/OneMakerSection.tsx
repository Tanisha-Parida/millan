import React from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { EXAMPLE_BREAKDOWN, formatINR } from '../lib/pricing';

export const OneMakerSection: React.FC = () => {
  const reduced = useReducedMotion();
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
          <p className="text-ink-soft text-base sm:text-lg mt-3">
            Follow the journey of a hand-tied Sambalpuri silk saree from the weaver's voice to your home.
          </p>
        </div>

        {/* Continuous Stitched Thread Container */}
        <div className="relative">
          {/* Desktop Connecting Thread (stitched madder line) */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-1 pointer-events-none z-0">
            <svg
              className="w-full h-4 overflow-visible"
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="var(--color-madder)"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                initial={{ pathLength: reduced ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* 4 Stops along the journey */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {/* ─── STOP 1: She speaks ───────────────────────────────────────── */}
            <div className="flex flex-col">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm">
                  1
                </span>
                {/* Audio Waveform Glyph */}
                <div
                  className="flex items-center gap-1 h-5 text-madder"
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

              <h3 className="font-heading text-xl text-ink font-semibold mb-3">
                She speaks
              </h3>

              <div className="bg-parchment/60 border border-clay/50 rounded-[4px] p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-heading text-lg text-ink leading-relaxed mb-3">
                    “ମୋର ଏଇ ଶାଢ଼ୀ ବୁଣିବା ପାଇଁ ୩୬ ଘଣ୍ଟା ଲାଗିଲା। ସବୁ ସୂତା କୁ ହାତରେ ବାନ୍ଧି ପ୍ରାକୃତିକ ରଙ୍ଗ ଦିଆଯାଇଛି।”
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    “It took 36 hours of hand calculation on our wooden pit loom. Every single yarn was tied and dip-dyed in natural indigo before weaving.”
                  </p>
                </div>
                <p className="text-xs text-ink-soft/80 mt-4 pt-3 border-t border-clay/30">
                  Recorded in Sambalpuri Kosli dialect
                </p>
              </div>
            </div>

            {/* ─── STOP 2: The listing appears ─────────────────────────────── */}
            <div className="flex flex-col">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm">
                  2
                </span>
                <span className="text-xs text-ink-soft uppercase tracking-wider font-medium">
                  Instant catalog
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3">
                The listing appears
              </h3>

              {/* Hang Tag Shape with Punched Hole */}
              <div className="bg-parchment border border-clay/70 rounded-[4px] p-5 relative shadow-sm flex-1 flex flex-col justify-between">
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
                  <h4 className="font-heading text-lg text-ink font-semibold leading-snug mb-1">
                    Sambalpuri Bandha silk saree
                  </h4>
                  <p className="text-sm text-ink font-medium">
                    Minati & Dinabandhu Meher
                  </p>
                  <p className="text-xs text-ink-soft mb-3">
                    Pit-Loom Bandha · Barpali, Odisha
                  </p>

                  <div className="inline-block bg-khadi/70 border border-clay/40 rounded-[2px] px-2.5 py-1 text-xs text-ink-soft">
                    36 hours of handloom work
                  </div>
                </div>

                <p className="text-xs text-ink-soft/90 mt-4 pt-3 border-t border-clay/30">
                  Written in Odia, English and Hindi.
                </p>
              </div>
            </div>

            {/* ─── STOP 3: A fair price is set ─────────────────────────────── */}
            <div className="flex flex-col">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm">
                  3
                </span>
                <span className="text-xs text-ink-soft uppercase tracking-wider font-medium">
                  Transparent math
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3">
                A fair price is set
              </h3>

              {/* Ledger Format with Dotted Leaders & Tabular Figures */}
              <div className="bg-parchment border border-clay/70 rounded-[4px] p-5 shadow-sm flex-1 flex flex-col justify-between font-body text-sm text-ink">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-ink-soft whitespace-nowrap">Materials reimbursed</span>
                    <span className="border-b border-dotted border-clay flex-1 mx-1" aria-hidden="true" />
                    <span className="tabular-nums font-medium">{formatINR(materials)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-ink-soft whitespace-nowrap">Artisan labour (36h × ₹275)</span>
                    <span className="border-b border-dotted border-clay flex-1 mx-1" aria-hidden="true" />
                    <span className="tabular-nums font-medium">{formatINR(labour)}</span>
                  </div>

                  <div className="pt-1.5 border-t border-clay/40 flex items-baseline justify-between gap-2 text-neem font-semibold">
                    <span className="whitespace-nowrap">Artisan receives</span>
                    <span className="border-b border-dotted border-neem/40 flex-1 mx-1" aria-hidden="true" />
                    <span className="tabular-nums">{formatINR(makerTotal)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 text-ink-soft">
                    <span className="whitespace-nowrap">Milaan fee (8%)</span>
                    <span className="border-b border-dotted border-clay flex-1 mx-1" aria-hidden="true" />
                    <span className="tabular-nums">{formatINR(milaanFee)}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 text-ink-soft">
                    <span className="whitespace-nowrap">Insured shipping</span>
                    <span className="border-b border-dotted border-clay flex-1 mx-1" aria-hidden="true" />
                    <span className="tabular-nums">{formatINR(shipping)}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-ink/20 flex items-baseline justify-between font-semibold text-base text-ink">
                  <span>Buyer total</span>
                  <span className="tabular-nums text-lg font-bold">{formatINR(buyerTotal)}</span>
                </div>
              </div>
            </div>

            {/* ─── STOP 4: The buyer pays the maker ────────────────────────── */}
            <div className="flex flex-col">
              {/* Marker with number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-madder text-bone font-heading text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm">
                  4
                </span>
                <span className="text-xs text-neem uppercase tracking-wider font-semibold">
                  Direct transfer
                </span>
              </div>

              <h3 className="font-heading text-xl text-ink font-semibold mb-3">
                The buyer pays the maker
              </h3>

              <div className="bg-parchment border border-clay/70 rounded-[4px] p-5 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-ink-soft leading-relaxed mb-5">
                    Funds transfer directly to Minati and Dinabandhu upon dispatch without middlemen holding back earnings.
                  </p>

                  <div className="bg-neem/10 border border-neem/30 rounded-[4px] p-4 text-center">
                    <div className="text-xs text-neem font-medium uppercase tracking-wide mb-1">
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

                <p className="text-xs text-ink-soft/80 mt-4 pt-3 border-t border-clay/30">
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
