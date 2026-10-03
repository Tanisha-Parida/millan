import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hero-dark/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <m.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-khadi border border-kiln/20 p-6 sm:p-8 shadow-lg text-left overflow-hidden focus:outline-none text-indigo"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream border border-kiln/20 text-indigo hover:text-madder flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h3 className="font-display text-2xl text-indigo font-bold">
                  Maker's story
                </h3>
                <p className="text-xs text-kiln font-body mt-1">
                  Origin: {item.region}, {item.state} • {item.hoursToCraft} hours of handwork
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              {/* Left: Artifact & Artisan Profile */}
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden border border-kiln/20 relative">
                  <img
                    src={item.image}
                    alt={`${item.title} handcrafted by ${item.artisan} in ${item.region}, ${item.state}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-cream/90 text-[13px] font-body text-indigo border border-kiln/20">
                    {item.region}, {item.state}
                  </div>
                </div>

                <div className="p-3.5 bg-cream border border-kiln/20 text-xs space-y-1.5 font-body">
                  <div className="text-indigo font-semibold">{item.artisan}</div>
                  <div className="text-indigo/80">{item.lineage}</div>
                  <div className="text-kiln text-[13px]">
                    {item.hoursToCraft} hours of handwork
                  </div>
                </div>
              </div>

              {/* Right: Transparent Escrow & Authentic Maker Lineage Breakdown */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-body text-xs text-kiln mb-2">
                    Where your money goes
                  </h4>

                  {/* Cost breakdown bars */}
                  <div className="space-y-2.5 text-xs font-body">
                    <div>
                      <div className="flex justify-between text-indigo mb-1">
                        <span>To the artisan, directly</span>
                        <span className="font-semibold">
                          91.4% ({formatPrice(Math.round(item.priceINR * 0.914), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-cream overflow-hidden">
                        <div className="w-[91.4%] h-full bg-neem" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-indigo mb-1">
                        <span>Raw materials</span>
                        <span>
                          5.6% ({formatPrice(Math.round(item.priceINR * 0.056), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-cream overflow-hidden">
                        <div className="w-[5.6%] h-full bg-haldi" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-indigo mb-1">
                        <span>Shipping &amp; insurance</span>
                        <span className="text-kiln">
                          3.0% ({formatPrice(Math.round(item.priceINR * 0.03), activeCurrency)})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-cream overflow-hidden">
                        <div className="w-[3%] h-full bg-kiln/40" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentic Maker Lineage Card */}
                <div className="p-3.5 bg-cream border border-neem/40">
                  <div className="flex items-center gap-2 text-xs text-neem font-body mb-1.5">
                    <CheckCircle2 size={14} />
                    <span>Verified maker lineage</span>
                  </div>
                  <div className="text-xs text-indigo leading-relaxed space-y-1 font-body">
                    <div>
                      <span className="text-kiln">Maker:</span> {item.artisan}
                    </div>
                    <div>
                      <span className="text-kiln">Lineage:</span> {item.lineage}
                    </div>
                    <div>
                      <span className="text-kiln">Materials:</span> {item.materials}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart?.(item);
                      onClose();
                    }}
                    className="flex-1 py-2.5 rounded bg-madder text-khadi font-semibold text-xs transition-all flex items-center justify-center gap-2 hover:bg-madder/90 font-body"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to bag</span>
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CraftDetailModal;
