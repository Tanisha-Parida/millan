import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Plane, X, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { formatPrice, type CurrencyCode } from '../lib/currency';
import { useModalA11y } from '../hooks/useModalA11y';

import { VAULT_ITEMS } from '../data/vaultItems';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartIds?: string[];
  cartItems?: CraftItem[];
  publishedItems?: CraftItem[];
  onRemoveCartItem?: (id: string) => void;
  activeCurrency?: CurrencyCode;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  cartIds = [],
  cartItems = [],
  publishedItems = [],
  onRemoveCartItem,
  activeCurrency = 'INR',
}) => {
  const [selectedGuild, setSelectedGuild] = useState('Sambalpuri Handloom Silk');
  const [patronName, setPatronName] = useState('');
  const [destinationCity, setDestinationCity] = useState('Tokyo, Japan');
  const [customBrief, setCustomBrief] = useState('');
  const [targetBudgetINR, setTargetBudgetINR] = useState(35000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const panelRef = useModalA11y(isOpen, onClose);

  const guilds = [
    'Sambalpuri Handloom Silk (Odisha)',
    'Bastar Lost-Wax Dhokra (Chhattisgarh)',
    'Nizamabad Black Luster Clay (UP)',
    'Kutch Mirrorwork & Rogan Art (Gujarat)',
    'Channapatna Lacquer Woodcraft (Karnataka)',
    'Mithila Natural Pigment Canvas (Bihar)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const itemsToDisplay = React.useMemo(() => {
    if (cartItems.length > 0) return cartItems;
    if (!cartIds || cartIds.length === 0) return [];
    return cartIds.flatMap((id) => {
      const seeded = VAULT_ITEMS.find((x) => x.id === id);
      if (seeded) return [seeded];
      const pub = publishedItems.find((x) => x.id === id);
      if (pub) return [pub];
      return [];
    });
  }, [cartItems, cartIds, publishedItems]);

  if (!isOpen) return null;

  const totalCartValue = itemsToDisplay.reduce((acc, item) => acc + item.priceINR, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-indigo/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <m.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        className="relative w-full max-w-2xl my-auto rounded bg-khadi p-6 sm:p-8 shadow-xl text-left focus:outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded bg-cream border border-kiln/20 text-indigo hover:text-madder flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded bg-madder flex items-center justify-center text-khadi">
            <Plane size={24} />
          </div>
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-indigo">
              Your bag
            </h3>
            <p className="text-base text-kiln font-body">
              Commission a one-of-a-kind piece directly from a master artisan family.
            </p>
          </div>
        </div>

        {itemsToDisplay.length > 0 && (
          <div className="mb-6 p-4 rounded bg-cream border border-kiln/20 space-y-2">
            <div className="text-base font-body text-kiln">
              Current commission bag ({itemsToDisplay.length} items):
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 no-scrollbar">
              {itemsToDisplay.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-lg font-body py-1 border-b border-kiln/10"
                >
                  <span className="text-indigo">{item.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-indigo">
                      {formatPrice(item.priceINR, activeCurrency)}
                    </span>
                    {onRemoveCartItem && (
                      <button
                        onClick={() => onRemoveCartItem(item.id)}
                        className="text-madder hover:text-madder/80 text-base"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between items-center text-lg font-display text-indigo">
              <span>Total value:</span>
              <span className="text-neem">
                {formatPrice(totalCartValue, activeCurrency)}
              </span>
            </div>
          </div>
        )}

        {isSubmitted ? (
          <div className="p-8 rounded bg-cream border border-neem/20 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-neem/10 text-neem mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-display text-2xl text-indigo">Request sent</h4>
            <p className="text-lg text-kiln font-body max-w-md mx-auto leading-relaxed">
              Your brief has been sent to the{' '}
              <strong className="text-indigo font-medium">{selectedGuild}</strong> cooperative. Expect a
              reply with a video call link and photos of materials within 24 hours.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-madder text-khadi font-body text-lg transition-colors hover:bg-madder/90"
              >
                Keep browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-lg font-body">
            <div>
              <label className="block text-kiln mb-1.5">
                Craft tradition:
              </label>
              <select
                value={selectedGuild}
                onChange={(e) => setSelectedGuild(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-cream border border-kiln/30 text-indigo focus:outline-none focus:border-kiln"
              >
                {guilds.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-kiln mb-1.5">
                  Your name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gallery Maison Tokyo"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-cream border border-kiln/30 text-indigo focus:outline-none focus:border-kiln"
                />
              </div>

              <div>
                <label className="block text-kiln mb-1.5">
                  Deliver to (city, country):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paris, France"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-cream border border-kiln/30 text-indigo focus:outline-none focus:border-kiln"
                />
              </div>

              <div>
                <label className="block text-kiln mb-1.5">
                  Budget (₹):
                </label>
                <input
                  type="number"
                  required
                  value={targetBudgetINR}
                  onChange={(e) => setTargetBudgetINR(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3.5 py-2.5 rounded bg-cream border border-kiln/30 text-indigo focus:outline-none focus:border-kiln"
                />
              </div>
            </div>

            <div>
              <label className="block text-kiln mb-1.5">
                Describe what you'd like made:
              </label>
              <textarea
                rows={3}
                required
                placeholder="Motifs, colors, size, occasion — anything that helps the artisan picture it..."
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-cream border border-kiln/30 text-indigo focus:outline-none focus:border-kiln"
              />
            </div>

            <div className="p-3.5 rounded bg-cream border border-kiln/20 flex items-start gap-3">
              <ShieldCheck size={20} className="text-neem shrink-0 mt-0.5" />
              <div className="text-base text-kiln leading-relaxed">
                <strong className="text-neem">Secure escrow payment:</strong> your money is
                held safely and released to the artisan only when your piece is on its way — most of
                it goes straight to the maker.
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded bg-madder text-khadi font-body text-lg transition-colors hover:bg-madder/90 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Sending your request…</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send commission request</span>
                </>
              )}
            </button>
          </form>
        )}
      </m.div>
    </div>
  );
};

export default CommissionModal;
