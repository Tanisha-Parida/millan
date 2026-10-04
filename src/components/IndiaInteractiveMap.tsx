import React, { useState, useMemo } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ShieldCheck,
  Search,
  X,
  Volume2,
} from 'lucide-react';
import {
  CONSTELLATION_HOTSPOTS,
  getDossierForState,
  type StateDossier,
  type ConstellationHotspot,
} from '../data/indiaCraftData';
import { VAULT_ITEMS } from '../data/vaultItems';

interface IndiaInteractiveMapProps {
  onExploreCrafts?: (stateName?: string) => void;
}

export const IndiaInteractiveMap: React.FC<IndiaInteractiveMapProps> = ({
  onExploreCrafts,
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

  // Catalog maker count for the selected state
  const stateMakerCount = useMemo(() => {
    return VAULT_ITEMS.filter(
      (item) => item.state.toLowerCase() === selectedDossier.name.toLowerCase()
    ).length;
  }, [selectedDossier.name]);

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
    if (onExploreCrafts) {
      onExploreCrafts(selectedDossier.name);
    } else {
      const el = document.getElementById('artisan-vault');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full text-bone text-left">
      {/* Region Filter Chips & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-bone/15 mb-8">
        {/* Wrapped Region Chips */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-body">
          {['All', 'Northern', 'Western', 'Central', 'Eastern', 'Southern', 'Northeastern'].map(
            (region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegionFilter(region)}
                className={`min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-[6px] transition-colors cursor-pointer text-xs font-medium ${
                  activeRegionFilter === region
                    ? 'bg-madder text-bone font-semibold'
                    : 'bg-vat/80 text-bone/80 border border-clay/40 hover:bg-vat hover:text-bone'
                }`}
              >
                {region}
              </button>
            )
          )}
        </div>

        {/* Search Input: 44px high */}
        <div className="relative w-full md:w-72 h-11 shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bone/60 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state or craft..."
            className="w-full h-11 pl-10 pr-8 rounded-[6px] bg-parchment text-ink placeholder-ink-soft/70 border border-clay text-xs font-body focus:outline-none focus:border-madder"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Grid: Sticky Map on Left, Natural-Height Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ─── LEFT: Sticky Feathered Map (7 cols) ────────────────────────── */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 flex flex-col items-center">
          <div className="relative w-full max-w-[580px] aspect-[1024/1007] flex items-center justify-center">
            {/* Feathered Map Image into Vat Band Background (no hard black box) */}
            <div
              className="w-full h-full relative"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 52% 52% at 50% 50%, #000 60%, transparent 85%)',
                maskImage:
                  'radial-gradient(ellipse 52% 52% at 50% 50%, #000 60%, transparent 85%)',
              }}
            >
              <img
                src="/images/india-constellation-map.webp"
                alt="Interactive craft map of India"
                width={1024}
                height={1007}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>

            {/* Clickable Hotspots Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              {CONSTELLATION_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedStateId === hotspot.id;
                const isHovered = hoveredHotspot?.id === hotspot.id;
                const isHighlightedByFilter = filteredHotspots.some((h) => h.id === hotspot.id);

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none"
                    style={{
                      left: `${hotspot.xPct}%`,
                      top: `${hotspot.yPct}%`,
                    }}
                    onClick={() => handleHotspotClick(hotspot.id)}
                    onMouseEnter={() => setHoveredHotspot(hotspot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    aria-label={`Select state ${hotspot.id}`}
                  >
                    <div
                      className={`rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'w-4 h-4 bg-madder ring-2 ring-bone scale-125'
                          : isHovered
                            ? 'w-3.5 h-3.5 bg-haldi ring-2 ring-bone scale-110'
                            : isHighlightedByFilter
                              ? 'w-2.5 h-2.5 bg-bone/90 hover:scale-125'
                              : 'w-2 h-2 bg-bone/40'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Hover Tooltip (clean, non-overlapping) */}
              <AnimatePresence>
                {hoveredHotspot && hoveredDossier && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full pb-2"
                    style={{
                      left: `${hoveredHotspot.xPct}%`,
                      top: `${Math.max(6, hoveredHotspot.yPct)}%`,
                    }}
                  >
                    <div className="bg-parchment text-ink border border-clay px-3 py-1.5 rounded-[4px] shadow-md text-xs font-body">
                      <div className="font-heading font-semibold text-ink text-sm">
                        {hoveredDossier.name}
                      </div>
                      <div className="text-ink-soft text-[11px]">
                        {hoveredDossier.crafts[0]?.name}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Multi-line Wrapped State Selection Chips below Map */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-bone/15">
            {[
              'Rajasthan',
              'Uttar Pradesh',
              'Gujarat',
              'West Bengal',
              'Odisha',
              'Tamil Nadu',
              'Jammu & Kashmir',
              'Madhya Pradesh',
              'Karnataka',
              'Assam',
            ].map((stateName) => {
              const dossier = getDossierForState(stateName);
              const isSelected = selectedStateId === dossier.id;

              return (
                <button
                  key={dossier.id}
                  type="button"
                  onClick={() => setSelectedStateId(dossier.id)}
                  className={`min-h-[44px] inline-flex items-center justify-center text-xs font-body px-4 py-2 rounded-[6px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-madder text-bone font-semibold'
                      : 'bg-vat/60 text-bone/80 border border-clay/40 hover:bg-vat hover:text-bone'
                  }`}
                >
                  {dossier.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── RIGHT: Natural-Height Parchment Details Panel (5 cols) ─────── */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDossier.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="p-6 sm:p-8 bg-parchment text-ink border border-clay rounded-[4px] shadow-md space-y-6"
            >
              {/* Header with region tag & maker count */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-khadi rounded-[4px] text-ink-soft text-xs font-body">
                    <MapPin size={13} className="text-madder" />
                    <span>{selectedDossier.region} India</span>
                  </div>

                  {stateMakerCount > 0 ? (
                    <div className="text-xs font-body font-semibold text-neem bg-neem/10 border border-neem/30 px-2 py-1 rounded-[4px]">
                      {stateMakerCount} {stateMakerCount === 1 ? 'maker' : 'makers'} listed
                    </div>
                  ) : (
                    <div className="text-xs font-body text-ink-soft">
                      {selectedDossier.crafts.length} craft traditions
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl text-ink font-semibold leading-tight">
                  {selectedDossier.name}
                </h3>

                <p className="text-sm text-ink-soft font-body leading-relaxed mt-2 pb-4 border-b border-clay/40">
                  {selectedDossier.summary}
                </p>
              </div>

              {/* Craft Traditions List */}
              <div className="space-y-3">
                <div className="text-xs text-ink-soft uppercase tracking-wider font-semibold">
                  Artisanal traditions ({selectedDossier.crafts.length})
                </div>

                <div className="space-y-3">
                  {selectedDossier.crafts.map((craft, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-khadi/70 border border-clay/60 rounded-[4px] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-base font-heading text-ink font-semibold">
                            {craft.name}
                          </div>
                          <div className="text-xs font-body text-ink-soft">
                            {craft.category}
                          </div>
                        </div>

                        {craft.giTag && (
                          <span className="text-[11px] font-body px-2 py-0.5 rounded-[2px] bg-haldi/20 text-ink border border-haldi/40 whitespace-nowrap font-medium flex items-center gap-1">
                            <ShieldCheck size={11} className="text-neem" />
                            <span>GI protected</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-ink-soft font-body leading-relaxed">
                        {craft.significance}
                      </p>

                      <div className="pt-2 border-t border-clay/30 flex items-center justify-between text-xs font-body text-ink-soft">
                        <div>
                          <span className="font-medium text-ink">Cluster: </span>
                          <span>{craft.communities}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setPlayingAudioCraft(
                              playingAudioCraft === craft.name ? null : craft.name
                            );
                          }}
                          className="flex items-center gap-1 text-madder hover:text-madder-dark font-medium cursor-pointer"
                        >
                          <Volume2 size={13} />
                          <span>
                            {playingAudioCraft === craft.name ? 'Listening...' : 'Dialect'}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleExploreArtisans}
                  className="btn-primary w-full h-12 text-sm"
                >
                  Explore {selectedDossier.name} crafts
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
