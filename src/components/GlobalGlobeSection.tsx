import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Globe,
} from '../lib/lucide-react';
import IndiaInteractiveMap from './IndiaInteractiveMap';

interface GlobalGlobeSectionProps {
  onOpenCommissionModal?: () => void;
  onExploreVault?: (stateName?: string) => void;
}

export const GlobalGlobeSection: React.FC<GlobalGlobeSectionProps> = ({
  onOpenCommissionModal,
  onExploreVault,
}) => {
  const [viewMode, setViewMode] = useState<'globe' | 'india-map'>('globe');
  const [isHoveringIndia, setIsHoveringIndia] = useState(false);

  return (
    <section
      id="global-trade"
      className="relative w-full py-20 px-4 sm:px-8 bg-[#0b0806] border-t border-[#D4AF37]/20 overflow-hidden select-none"
    >
      {/* Ambient Celestial Glow Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-[#D4AF37]/12 via-[#C85A32]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Star & Grid Network Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#D4AF37 1px, transparent 1px), linear-gradient(to right, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px, 120px 120px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[11px] font-telemetry tracking-widest text-[#D4AF37] uppercase">
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>CROSS-BORDER PROTOCOL • BECKN ONDC ESCROW</span>
          </div>
          
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#FAF7F2] font-semibold tracking-tight">
            Global Trade Corridor
          </h2>

          <p className="text-sm sm:text-base text-[#FAF7F2]/70 font-sans leading-relaxed">
            Direct, decentralized commerce seamlessly connecting India's rural master ateliers with
            curated luxury corridors across London, Paris, New York, Tokyo, and Milan.
          </p>
        </div>

        {/* Dynamic View Transition: Static Globe View ↔ India Constellation Map */}
        <AnimatePresence mode="wait">
          {viewMode === 'globe' ? (
            <motion.div
              key="static-globe-view"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full flex flex-col items-center"
            >
              {/* Main Globe Display Stage */}
              <div className="relative w-full max-w-[760px] aspect-square flex items-center justify-center my-4">
                
                {/* 1. Surrounding Dark Telemetry HUD Card: TOP-LEFT */}
                <div className="absolute top-2 left-2 sm:top-6 sm:left-4 z-20 max-w-[270px] sm:max-w-[300px]">
                  <div className="p-4 rounded-2xl bg-[#14110E]/90 border border-[#D4AF37]/35 shadow-2xl backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-telemetry tracking-widest uppercase text-[#FAF7F2]/60">
                        LIVE TRADE CORRIDOR
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#58D68D]/20 border border-[#58D68D]/40 text-[#58D68D] text-[9px] font-telemetry font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#58D68D] animate-ping" />
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-serif-luxury font-bold text-[#FAF7F2]">
                      <span>Nizamabad, UP</span>
                      <ArrowRight size={13} className="text-[#D4AF37]" />
                      <span>Mayfair, London</span>
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/15 space-y-1 text-[11px] font-telemetry text-[#FAF7F2]/75">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D4AF37]">Settlement:</span>
                        <span className="text-[#58D68D] font-bold">Beckn Escrow Settled</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#FAF7F2]/55">
                        <span>Direct DBT Payout:</span>
                        <span className="text-[#FAF7F2]">91.4% to Artisan</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#FAF7F2]/55">
                        <span>Transit Corridor:</span>
                        <span className="text-[#FAF7F2]">Air Freight Priority</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Surrounding Dark Telemetry HUD Card: BOTTOM-RIGHT */}
                <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-4 z-20 max-w-[270px] sm:max-w-[310px]">
                  <div
                    onClick={onOpenCommissionModal}
                    className="p-4 rounded-2xl bg-[#14110E]/90 border border-[#D4AF37]/35 shadow-2xl backdrop-blur-md space-y-2 cursor-pointer hover:border-[#D4AF37] transition-all hover:bg-[#1a140e]"
                    title="Click to view smart contract escrow & commissions"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-telemetry tracking-widest uppercase text-[#FAF7F2]/60">
                        SMART CONTRACT ESCROW
                      </span>
                      <span className="text-[9px] font-telemetry px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                        ONDC v2.0
                      </span>
                    </div>

                    <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#D4AF37] tracking-tight">
                      ₹6,42,80,000
                    </div>

                    <div className="text-[11px] font-telemetry text-[#FAF7F2]/80 leading-snug">
                      Beckn decentralized fulfillment protocol with 0% platform intermediary commission.
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-[10px] font-telemetry text-[#FAF7F2]/50">
                      <span>Multi-Sig Escrow</span>
                      <span className="text-[#58D68D] flex items-center gap-1">
                        <ShieldCheck size={11} /> 100% Guaranteed
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Surrounding Micro HUD: TOP-RIGHT (Currency Oracle) */}
                <div className="hidden sm:block absolute top-6 right-4 z-20 max-w-[220px]">
                  <div className="p-3 rounded-2xl bg-[#14110E]/80 border border-[#D4AF37]/20 shadow-xl backdrop-blur-md space-y-1 text-right">
                    <div className="text-[9px] font-telemetry uppercase tracking-wider text-[#FAF7F2]/50">
                      Cross-Border Currency
                    </div>
                    <div className="text-xs font-telemetry font-bold text-[#FAF7F2]">
                      INR • USD • EUR • GBP • JPY
                    </div>
                    <div className="text-[10px] font-telemetry text-[#D4AF37]/80 flex items-center justify-end gap-1">
                      <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Zero-Spread FX Active</span>
                    </div>
                  </div>
                </div>

                {/* 4. Surrounding Micro HUD: BOTTOM-LEFT (Sovereign Charter) */}
                <div className="hidden sm:block absolute bottom-6 left-4 z-20 max-w-[220px]">
                  <div className="p-3 rounded-2xl bg-[#14110E]/80 border border-[#D4AF37]/20 shadow-xl backdrop-blur-md space-y-1">
                    <div className="text-[9px] font-telemetry uppercase tracking-wider text-[#FAF7F2]/50">
                      Proof of Human Hand
                    </div>
                    <div className="text-xs font-telemetry font-bold text-[#FAF7F2] flex items-center gap-1.5">
                      <Cpu size={12} className="text-[#D4AF37]" />
                      <span>Cryptographic Provenance</span>
                    </div>
                    <div className="text-[10px] font-telemetry text-[#58D68D]">
                      Tamper-Proof GI Registry
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* CORE ARTWORK: Static High-Resolution Golden Celestial Globe */}
                {/* ------------------------------------------------------------- */}
                <div
                  className="relative w-full h-full p-6 flex items-center justify-center cursor-pointer group"
                  onClick={() => setViewMode('india-map')}
                  title="Click to drill down into India's living craft heritage"
                >
                  <img
                    src="/images/golden-trade-globe.png"
                    alt="MILAAN Golden Celestial Globe"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_60px_rgba(212,175,55,0.35)] select-none pointer-events-none group-hover:drop-shadow-[0_0_80px_rgba(212,175,55,0.55)] transition-all duration-500"
                  />

                  {/* ----------------------------------------------------------- */}
                  {/* "CLICK ON INDIA" HOTSPOT OVER THE INDIAN SUBCONTINENT       */}
                  {/* Positioned directly over the illuminated subcontinent        */}
                  {/* ----------------------------------------------------------- */}
                  <div
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: '63.5%',
                      top: '41.5%',
                    }}
                    onMouseEnter={() => setIsHoveringIndia(true)}
                    onMouseLeave={() => setIsHoveringIndia(false)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('india-map');
                    }}
                  >
                    {/* Concentric Pulsing Radar Halo Rings */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute -inset-4 rounded-full bg-[#D4AF37]/35 animate-ping" />
                      <span className="absolute -inset-2.5 rounded-full border-2 border-[#D4AF37] opacity-80 animate-pulse" />

                      {/* Golden Beacon Center Dot */}
                      <span className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-[#C85A32] via-[#D4AF37] to-[#FAF7F2] ring-2 ring-[#FAF7F2] shadow-[0_0_20px_rgba(212,175,55,1)]" />

                      {/* Floating "📍 CLICK ON INDIA" Pill Badge */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-13 whitespace-nowrap z-40 pointer-events-auto transition-all duration-300 ${
                          isHoveringIndia ? 'scale-[1.08]' : 'hover:scale-[1.08]'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E0C0A]/95 border border-[#D4AF37] shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
                            isHoveringIndia
                              ? 'shadow-[0_0_35px_rgba(212,175,55,0.85)] border-[#FAF7F2] bg-[#1a140e]'
                              : 'shadow-[0_0_22px_rgba(212,175,55,0.45)]'
                          }`}
                        >
                          <span className="text-xs">📍</span>
                          <span className="text-[11px] sm:text-xs font-telemetry tracking-widest font-bold text-[#FAF7F2] uppercase">
                            CLICK ON INDIA
                          </span>
                          <Sparkles size={11} className="text-[#D4AF37]" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Sub-Globe Drill-Down Prompt Button */}
              <div className="mt-4 flex flex-col items-center gap-2">
                <button
                  onClick={() => setViewMode('india-map')}
                  className="group px-6 py-3 rounded-full bg-[#181512] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-telemetry tracking-wider text-[#FAF7F2] hover:text-[#D4AF37] flex items-center gap-2.5 shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/30 transition-all hover:bg-[#D4AF37]/10 active:scale-95"
                >
                  <Globe size={15} className="text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                  <span>EXPLORE INDIA CRAFT CONSTELLATION MAP</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                </button>
                <span className="text-[11px] font-telemetry text-[#FAF7F2]/45">
                  Interactive state-by-state living craft dossiers & GI certified lineages
                </span>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="india-map-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Living Constellation India Map Drill-Down View */}
              <IndiaInteractiveMap
                onBackToGlobe={() => setViewMode('globe')}
                onExploreVault={onExploreVault}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GlobalGlobeSection;
