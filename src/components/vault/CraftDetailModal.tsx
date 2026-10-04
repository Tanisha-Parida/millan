import React from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import type { CraftItem } from '../../types/craft';
import { formatPrice, type CurrencyCode } from '../../lib/currency';
import { useModalA11y } from '../../hooks/useModalA11y';

interface CraftDetailModalProps {
  item: CraftItem | null;
  onClose: () => void;
  onAddToCart?: (item: CraftItem) => void;
  activeCurrency?: CurrencyCode;
}

export const CraftDetailModal: React.FC<CraftDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  activeCurrency = 'INR',
}) => {
  const panelRef = useModalA11y(item !== null, onClose);

  return (
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-vat/80 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-parchment border border-clay rounded-[4px] p-6 sm:p-8 shadow-xl text-left overflow-hidden focus:outline-none text-ink my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-[6px] bg-khadi border border-clay text-ink hover:text-madder flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6 pr-12">
              <div>
                <h3 className="font-heading text-2xl text-ink font-semibold">
                  Maker's story
                </h3>
                <p className="text-xs text-ink-soft font-body mt-1">
                  Origin: {item.region}, {item.state} • {item.hoursToCraft} hours of artisan work
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              {/* Left: Artifact & Artisan Profile */}
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-[2px] border border-clay relative bg-khadi">
                  <img
                    src={item.image}
                    alt={`${item.title} handcrafted by ${item.artisan} in ${item.region}, ${item.state}`}
                    width={400}
                    height={300}
                    loading="lazy"
                    style={{
                      filter: 'saturate(0.92) contrast(1.03) sepia(0.06)',
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-[4px] bg-parchment/95 text-xs font-body text-ink border border-clay/60">
                    {item.region}, {item.state}
                  </div>
                </div>

                <div className="p-4 bg-khadi border border-clay rounded-[4px] text-xs space-y-1.5 font-body">
                  <div className="text-ink font-semibold">{item.artisan}</div>
                  <div className="text-ink-soft">{item.lineage}</div>
                  <div className="text-neem font-medium">
                    {item.hoursToCraft} hours of handwork
                  </div>
                </div>
              </div>

              {/* Right: Transparent Fair Wage & Materials Breakdown */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-body text-xs text-ink-soft uppercase tracking-wider font-semibold mb-2">
                    Where your payment goes
                  </h4>

                  {/* Cost Breakdown Bars */}
                  <div className="space-y-3 text-xs font-body">
                    <div>
                      <div className="flex justify-between text-ink mb-1">
                        <span>Maker receives (labour + materials)</span>
                        <span className="font-semibold text-neem tabular-nums">
                          89% ({formatPrice(Math.round(item.priceINR * 0.89), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-[2px] bg-clay/30 overflow-hidden">
                        <div className="w-[89%] h-full bg-neem" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-ink mb-1">
                        <span>Milaan platform fee</span>
                        <span className="font-medium text-ink-soft tabular-nums">
                          8% ({formatPrice(Math.round(item.priceINR * 0.08), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-[2px] bg-clay/30 overflow-hidden">
                        <div className="w-[8%] h-full bg-haldi" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-ink mb-1">
                        <span>Direct insured delivery</span>
                        <span className="text-ink-soft tabular-nums">
                          3% ({formatPrice(Math.round(item.priceINR * 0.03), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-[2px] bg-clay/30 overflow-hidden">
                        <div className="w-[3%] h-full bg-ink-soft" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentic Maker Lineage Card */}
                <div className="p-4 bg-khadi border border-neem/30 rounded-[4px]">
                  <div className="flex items-center gap-1.5 text-xs text-neem font-body font-semibold mb-1">
                    <CheckCircle2 size={14} />
                    <span>Verified artisan workshop</span>
                  </div>
                  <div className="text-xs text-ink-soft leading-relaxed space-y-0.5 font-body">
                    <div>
                      <span className="font-medium text-ink">Technique: </span>
                      {item.materials}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart?.(item);
                      onClose();
                    }}
                    className="btn-primary w-full h-12 text-sm gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to bag — {formatPrice(item.priceINR, activeCurrency)}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CraftDetailModal;
