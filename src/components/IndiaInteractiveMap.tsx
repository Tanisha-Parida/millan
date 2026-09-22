import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Search,
  X,
  ExternalLink,
  ArrowLeft,
  Volume2,
} from '../lib/lucide-react';
import {
  CONSTELLATION_HOTSPOTS,
  getDossierForState,
  type StateDossier,
  type ConstellationHotspot,
} from '../data/indiaCraftData';

interface IndiaInteractiveMapProps {
  onBackToGlobe: () => void;
  onExploreVault?: (stateName?: string) => void;
}

export const IndiaInteractiveMap: React.FC<IndiaInteractiveMapProps> = ({
  onBackToGlobe,
  onExploreVault,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('rajasthan');
  const [hoveredHotspot, setHoveredHotspot] = useState<ConstellationHotspot | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('All');
  const [playingAudioCraft, setPlayingAudioCraft] = useState<string | null>(null);

  const selectedDossier: StateDossier = useMemo(() => {
    return getDossierForState(selectedStateId);
  }, [selectedStateId]);

  const hoveredDossier: StateDossier | null = useMemo(() => {
    if (!hoveredHotspot) return null;
    return getDossierForState(hoveredHotspot.id);
  }, [hoveredHotspot]);

  const filteredHotspots = useMemo(() => {
    return CONSTELLATION_HOTSPOTS.filter((hotspot) => {
      const dossier = getDossierForState(hotspot.id);
      const matchesSearch =
        dossier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dossier.crafts.some(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesRegion =
        activeRegionFilter === 'All' || dossier.region === activeRegionFilter;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, activeRegionFilter]);

  const handleHotspotClick = (hotspotId: string) => {
    setSelectedStateId(hotspotId);
  };

  const handleExploreArtisans = () => {
    if (onExploreVault) {
      onExploreVault(selectedDossier.name);
    } else {
      const el = document.getElementById('artisan-vault');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-[920px] flex flex-col justify-between text-[#FAF7F2]">
      {/* ------------------------------------------------------------- */}
      {/* TOP CONTROLS & BREADCRUMB */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/20 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGlobe}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#181512] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-telemetry tracking-wider text-[#FAF7F2] transition-all hover:bg-[#D4AF37]/10 active:scale-95 shadow-md shadow-[#D4AF37]/10"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
            <span className="font-semibold">← Back to Global Trade</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-telemetry text-[#FAF7F2]/50">
            <span>/</span>
            <span className="text-[#D4AF37] uppercase">Glowing Constellation Craft Map</span>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar text-xs font-telemetry">
          {['All', 'Northern', 'Western', 'Central', 'Eastern', 'Southern', 'Northeastern'].map(
            (region) => (
              <button
                key={region}
                onClick={() => setActiveRegionFilter(region)}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activeRegionFilter === region
                    ? 'bg-[#D4AF37] text-[#060709] font-bold shadow-md shadow-[#D4AF37]/30'
                    : 'bg-[#181512]/80 text-[#FAF7F2]/70 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                {region}
              </button>
            )
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN STAGE: Constellation Image Map + Living Craft Dossier Card */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
        
        {/* LEFT / CENTER: Glowing Golden Constellation Map (7 Cols) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
          
          {/* Quick Search Toolbar for States & Crafts */}
          <div className="w-full max-w-md mb-4 relative z-20">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3.5 text-[#D4AF37]/60 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, craft (e.g. Pichwai, Rogan, Blue Pottery)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#181512]/90 border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-telemetry text-[#FAF7F2] placeholder-[#FAF7F2]/40 outline-none shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#FAF7F2]/40 hover:text-[#FAF7F2]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* High-Resolution Constellation Map Canvas Container */}
          <div className="relative w-full max-w-[620px] aspect-[1024/1007] p-1 flex items-center justify-center">
            
            {/* Ambient Deep Space Gold Aura */}
            <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

            {/* Core Artwork: High-Resolution Golden Constellation Map */}
            <img
              src="/images/india-constellation-map.png"
              alt="MILAAN Golden Constellation India Craft Map"
              className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(212,175,55,0.45)] select-none pointer-events-none rounded-2xl"
            />

            {/* --------------------------------------------------------- */}
            {/* INTERACTIVE COORDINATE HOTSPOTS (PIN OVERLAY LAYER)      */}
            {/* Maps interactive hotspot pins directly over each dot      */}
            {/* --------------------------------------------------------- */}
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              {CONSTELLATION_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedStateId === hotspot.id;
                const isHovered = hoveredHotspot?.id === hotspot.id;
                const isHighlightedByFilter = filteredHotspots.some((h) => h.id === hotspot.id);

                return (
                  <div
                    key={hotspot.id}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${hotspot.xPct}%`,
                      top: `${hotspot.yPct}%`,
                    }}
                    onClick={() => handleHotspotClick(hotspot.id)}
                    onMouseEnter={() => setHoveredHotspot(hotspot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    {/* Generous Hit-Target Area */}
                    <div className="relative w-7 h-7 flex items-center justify-center group">
                      
                      {/* Outer Glowing Pulse Ring for Selected / Hovered */}
                      {isSelected ? (
                        <>
                          <span className="absolute -inset-2 rounded-full bg-[#D4AF37]/40 animate-ping" />
                          <span className="absolute -inset-1 rounded-full border border-[#FAF7F2] opacity-80 animate-pulse" />
                        </>
                      ) : isHovered ? (
                        <span className="absolute -inset-1.5 rounded-full border border-[#D4AF37] opacity-90 animate-ping" />
                      ) : isHighlightedByFilter ? (
                        <span className="absolute inset-0 rounded-full border border-[#D4AF37]/40 opacity-50 group-hover:opacity-100 transition-opacity" />
                      ) : null}

                      {/* Hotspot Pin Core Dot */}
                      <div
                        className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'w-3.5 h-3.5 bg-gradient-to-tr from-[#C85A32] via-[#D4AF37] to-[#FAF7F2] ring-2 ring-[#FAF7F2] shadow-[0_0_15px_rgba(255,255,255,0.9)] scale-125'
                            : isHovered
                            ? 'w-3 h-3 bg-[#FAF7F2] ring-2 ring-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.9)] scale-125'
                            : isHighlightedByFilter
                            ? 'w-2.5 h-2.5 bg-[#D4AF37] opacity-90 group-hover:scale-125 shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                            : 'w-2 h-2 bg-[#D4AF37]/50'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Floating Quick Tooltip Badge on Hover */}
              <AnimatePresence>
                {hoveredHotspot && hoveredDossier && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full pb-3"
                    style={{
                      left: `${hoveredHotspot.xPct}%`,
                      top: `${Math.max(6, hoveredHotspot.yPct)}%`,
                    }}
                  >
                    <div className="bg-[#0E0C0A]/95 border border-[#D4AF37] px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md whitespace-nowrap text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                        <span className="text-xs font-serif-luxury font-bold text-[#FAF7F2]">
                          {hoveredDossier.name}
                        </span>
                        <span className="text-[9px] font-telemetry uppercase text-[#D4AF37] px-1 py-0.2 rounded bg-[#D4AF37]/15">
                          {hoveredDossier.region}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#FAF7F2]/80 font-sans mt-0.5">
                        {hoveredDossier.crafts[0]?.name}
                      </div>
                      <div className="text-[9px] text-[#D4AF37] font-telemetry mt-0.5">
                        Click to view craft heritage →
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Quick State Pill Carousel for Ease of Tap */}
          <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar max-w-full">
            {['Rajasthan', 'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Odisha', 'Tamil Nadu', 'Jammu & Kashmir', 'Madhya Pradesh'].map((stateName) => {
              const dossier = getDossierForState(stateName);
              const isSelected = selectedStateId === dossier.id;

              return (
                <button
                  key={dossier.id}
                  onClick={() => setSelectedStateId(dossier.id)}
                  className={`text-[11px] font-telemetry px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#060709] font-bold shadow'
                      : 'bg-[#14110E] text-[#FAF7F2]/60 hover:text-[#FAF7F2] border border-[#D4AF37]/15'
                  }`}
                >
                  {dossier.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT: Living Craft Heritage Dossier Card (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDossier.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#14110E]/95 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl flex flex-col justify-between max-h-[820px] overflow-y-auto no-scrollbar"
            >
              {/* Dossier Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-telemetry uppercase tracking-wider">
                    <MapPin size={12} />
                    <span>
                      {selectedDossier.region} India • {selectedDossier.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-telemetry text-[#58D68D] bg-[#2D5A43]/30 px-2.5 py-1 rounded-full border border-[#2D5A43]">
                    <ShieldCheck size={12} />
                    <span>{selectedDossier.giClusters} GI Clusters</span>
                  </div>
                </div>

                {/* Card Title matching specification */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F2] font-semibold tracking-tight">
                  {selectedDossier.name} <br />
                  <span className="gold-gradient-text italic font-cormorant font-light text-xl sm:text-2xl">
                    Living Craft Heritage
                  </span>
                </h3>
                
                <p className="text-xs font-serif-luxury italic text-[#D4AF37] mt-1.5">
                  "{selectedDossier.tagline}"
                </p>

                <p className="text-xs text-[#FAF7F2]/75 font-sans leading-relaxed mt-2 pb-4 border-b border-[#D4AF37]/15">
                  {selectedDossier.summary}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-2xl bg-[#0E0C0A] border border-[#D4AF37]/15">
                    <div className="text-[10px] font-telemetry uppercase text-[#FAF7F2]/50">
                      Active Master Guilds
                    </div>
                    <div className="text-base font-serif-luxury font-bold text-[#FAF7F2] mt-0.5">
                      {selectedDossier.activeArtisans}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0E0C0A] border border-[#D4AF37]/15">
                    <div className="text-[10px] font-telemetry uppercase text-[#FAF7F2]/50">
                      Administrative Capital
                    </div>
                    <div className="text-base font-serif-luxury font-bold text-[#D4AF37] mt-0.5">
                      {selectedDossier.capital}
                    </div>
                  </div>
                </div>

                {/* Curated Traditional Crafts Section */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs font-telemetry text-[#FAF7F2]/60 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#D4AF37]" />
                      Renowned Artisanal Traditions ({selectedDossier.crafts.length})
                    </span>
                    <span className="text-[10px] text-[#D4AF37]">GI Registry Verified</span>
                  </div>

                  <div className="space-y-3">
                    {selectedDossier.crafts.map((craft, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#0E0C0A]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-serif-luxury font-bold text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors">
                              {craft.name}
                            </div>
                            <div className="text-[11px] font-telemetry text-[#FAF7F2]/50 mt-0.5">
                              {craft.category}
                            </div>
                          </div>

                          <span className="text-[10px] font-telemetry px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] whitespace-nowrap">
                            {craft.giTag}
                          </span>
                        </div>

                        <p className="text-xs text-[#FAF7F2]/80 font-sans leading-relaxed">
                          {craft.significance}
                        </p>

                        <div className="pt-2 border-t border-[#D4AF37]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-telemetry text-[#FAF7F2]/60">
                          <div>
                            <span className="text-[#D4AF37]">Guild: </span>
                            <span>{craft.communities}</span>
                          </div>

                          <button
                            onClick={() => {
                              setPlayingAudioCraft(
                                playingAudioCraft === craft.name ? null : craft.name
                              );
                            }}
                            className="flex items-center gap-1 text-[10px] text-[#FAF7F2]/50 hover:text-[#D4AF37] transition-colors"
                          >
                            <Volume2 size={12} />
                            <span>{playingAudioCraft === craft.name ? 'Listening...' : 'Hear Dialect'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Direct CTA: Explore Artisans in [State] */}
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <button
                  onClick={handleExploreArtisans}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C85A32] via-[#D4AF37] to-[#C85A32] text-[#060709] font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold tracking-wide"
                >
                  <span>Explore Artisans in {selectedDossier.name}</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default IndiaInteractiveMap;
