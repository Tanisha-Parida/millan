import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  X,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react';
import type { CraftItem } from './ArtisanVaultGrid';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CraftItem[];
  onRemoveCartItem?: (id: string) => void;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveCartItem,
}) => {
  const [selectedGuild, setSelectedGuild] = useState('Sambalpuri Handloom Silk');
  const [patronName, setPatronName] = useState('');
  const [destinationCity, setDestinationCity] = useState('Tokyo, Japan');
  const [customBrief, setCustomBrief] = useState('');
  const [targetBudgetINR, setTargetBudgetINR] = useState(35000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  if (!isOpen) return null;

  const totalCartValue = cartItems.reduce((acc, item) => acc + item.priceINR, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        className="relative w-full max-w-2xl my-auto rounded-[32px] bg-[#0c0a08] border border-[#D4AF37]/40 p-6 sm:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.9)] text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1e1710] border border-[#D4AF37]/25 text-[#FAF7F2]/70 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C85A32] to-[#D4AF37] flex items-center justify-center text-[#060709] shadow-lg shadow-[#D4AF37]/20">
            <Plane size={24} />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F2] font-bold">
              Bespoke Craft Commission
            </h3>
            <p className="text-xs text-[#FAF7F2]/65 font-sans">
              Commission direct heirloom artifacts from master Indian kaarigar lineages via ONDC smart contracts.
            </p>
          </div>
        </div>

        {/* Active Cart Items Summary (if any) */}
        {cartItems.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-[#17110a] border border-[#D4AF37]/20 space-y-2">
            <div className="text-xs font-telemetry text-[#D4AF37] uppercase">
              Current Commission Bag ({cartItems.length} items):
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#D4AF37]/10">
                  <span className="text-[#FAF7F2]">{item.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-telemetry text-[#D4AF37]">₹{item.priceINR.toLocaleString()}</span>
                    {onRemoveCartItem && (
                      <button
                        onClick={() => onRemoveCartItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-[10px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between items-center text-xs font-telemetry text-[#FAF7F2]">
              <span>TOTAL VALUE:</span>
              <span className="text-[#58D68D] font-bold text-sm">₹{totalCartValue.toLocaleString()}</span>
            </div>
          </div>
        )}

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-[#131b14] border border-[#2D5A43] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#2D5A43] text-[#58D68D] mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-serif-luxury text-2xl text-[#FAF7F2] font-bold">
              Commission Contract Broadcasted
            </h4>
            <p className="text-xs text-[#FAF7F2]/80 font-sans max-w-md mx-auto leading-relaxed">
              Your bespoke brief has been dispatched through ONDC Beckn v2 protocol to the{' '}
              <strong className="text-[#D4AF37]">{selectedGuild}</strong> cluster elders. You will receive 
              a live video link and raw material provenance proof within 24 hours.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#060709] font-semibold text-xs uppercase tracking-wider"
              >
                Return to Trade Engine
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-telemetry text-[#D4AF37] text-[11px] uppercase mb-1.5">
                Target Master Artisan Guild:
              </label>
              <select
                value={selectedGuild}
                onChange={(e) => setSelectedGuild(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#19130d] border border-[#D4AF37]/25 text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
              >
                {guilds.map((g) => (
                  <option key={g} value={g} className="bg-[#120e0a]">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-telemetry text-[#D4AF37] text-[11px] uppercase mb-1.5">
                  Patron / Institution Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gallery Maison Tokyo"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#19130d] border border-[#D4AF37]/25 text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-telemetry text-[#D4AF37] text-[11px] uppercase mb-1.5">
                  Destination Global City:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paris, France"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#19130d] border border-[#D4AF37]/25 text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-telemetry text-[#D4AF37] text-[11px] uppercase mb-1.5">
                  Target Budget (INR):
                </label>
                <input
                  type="number"
                  required
                  value={targetBudgetINR}
                  onChange={(e) => setTargetBudgetINR(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#19130d] border border-[#D4AF37]/25 text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block font-telemetry text-[#D4AF37] text-[11px] uppercase mb-1.5">
                Bespoke Design Specifications & Dimensions:
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe desired motifs, color palette, dimensions, or historical period references..."
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#19130d] border border-[#D4AF37]/25 text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Fair Escrow Notice */}
            <div className="p-3.5 rounded-2xl bg-[#151009] border border-[#2D5A43]/40 flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#58D68D] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#FAF7F2]/80 leading-relaxed">
                <strong className="text-[#58D68D]">Direct Escrow Lock:</strong> 91.4% of your commission value is locked 
                in an autonomous smart contract and released directly to the artisan's personal UPI/DBT upon encrypted biometric courier dispatch.
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] font-bold text-xs tracking-wider uppercase shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Minting Beckn Commission Contract...</span>
              ) : (
                <>
                  <Send size={15} />
                  <span>Lock Smart Escrow & Disseminate Brief</span>
                </>
              )}
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
};

export default CommissionModal;
