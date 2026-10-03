import React, { useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
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

      const matchesRegion = activeRegionFilter === 'All' || dossier.region === activeRegionFilter;

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
      const el = document.getElementById('crafts');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-[920px] flex flex-col justify-between text-indigo">
      {/* TOP CONTROLS & BREADCRUMB */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-kiln/20 z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar text-base font-body">
          {['All', 'Northern', 'Western', 'Central', 'Eastern', 'Southern', 'Northeastern'].map(
            (region) => (
              <button
                key={region}
                onClick={() => setActiveRegionFilter(region)}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  activeRegionFilter === region
                    ? 'bg-madder text-khadi'
                    : 'bg-cream text-indigo border border-kiln/20 hover:border-kiln/50'
                }`}
              >
                {region}
              </button>
            )
          )}
        </div>
      </div>

      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
          <div className="w-full max-w-md mb-4 relative z-20">
            <div className="relative flex items-center">
              <Search
                size={16}
                className="absolute left-3.5 text-kiln pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, craft (e.g. Pichwai)..."
                className="w-full pl-10 pr-9 py-2.5 rounded bg-cream border border-kiln/30 focus:border-kiln text-base font-body text-indigo placeholder-kiln/60 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-kiln hover:text-indigo"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="relative w-full max-w-[620px] aspect-[1024/1007] p-1 flex items-center justify-center">
            <img
              src="/images/india-constellation-map.webp"
              alt="Map of Indian states"
              className="w-full h-full object-contain select-none pointer-events-none"
            />

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
                    <div className="relative w-7 h-7 flex items-center justify-center group">
                      <div
                        className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'w-3.5 h-3.5 bg-madder scale-125 ring-2 ring-khadi'
                            : isHovered
                              ? 'w-3 h-3 bg-indigo scale-125 ring-2 ring-khadi'
                              : isHighlightedByFilter
                                ? 'w-2.5 h-2.5 bg-madder opacity-90 group-hover:scale-125'
                                : 'w-2 h-2 bg-indigo/50'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              <AnimatePresence>
                {hoveredHotspot && hoveredDossier && (
                  <m.div
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
                    <div className="bg-cream border border-kiln/20 px-3.5 py-2 rounded text-left shadow-md">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-display text-indigo">
                          {hoveredDossier.name}
                        </span>
                        <span className="text-sm font-body text-kiln px-1 rounded bg-khadi">
                          {hoveredDossier.region}
                        </span>
                      </div>
                      <div className="text-sm text-kiln font-body mt-0.5">
                        {hoveredDossier.crafts[0]?.name}
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar max-w-full">
            {[
              'Rajasthan',
              'Uttar Pradesh',
              'Gujarat',
              'West Bengal',
              'Odisha',
              'Tamil Nadu',
              'Jammu & Kashmir',
              'Madhya Pradesh',
            ].map((stateName) => {
              const dossier = getDossierForState(stateName);
              const isSelected = selectedStateId === dossier.id;

              return (
                <button
                  key={dossier.id}
                  onClick={() => setSelectedStateId(dossier.id)}
                  className={`text-base font-body px-3 py-1 rounded whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-madder text-khadi'
                      : 'bg-cream text-indigo border border-kiln/20 hover:border-kiln/50'
                  }`}
                >
                  {dossier.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            <m.div
              key={selectedDossier.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative p-6 sm:p-7 bg-cream border border-kiln/20 flex flex-col justify-between max-h-[820px] overflow-y-auto no-scrollbar"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-khadi text-kiln text-sm font-body">
                    <MapPin size={16} />
                    <span>
                      {selectedDossier.region} India • {selectedDossier.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-body text-neem bg-khadi px-2.5 py-1">
                    <ShieldCheck size={16} />
                    <span>{selectedDossier.giClusters} GI clusters</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-indigo mb-1">
                  {selectedDossier.name}
                </h3>
                <h4 className="font-display text-xl text-kiln mb-2">
                  Living craft heritage
                </h4>

                <p className="text-sm font-body text-kiln mt-1.5 italic">
                  "{selectedDossier.tagline}"
                </p>

                <p className="text-lg text-indigo font-body leading-relaxed mt-2 pb-4 border-b border-kiln/15">
                  {selectedDossier.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-khadi border border-kiln/10">
                    <div className="text-sm font-body text-kiln">
                      Active master guilds
                    </div>
                    <div className="text-lg font-display text-indigo mt-0.5">
                      {selectedDossier.activeArtisans}
                    </div>
                  </div>
                  <div className="p-3 bg-khadi border border-kiln/10">
                    <div className="text-sm font-body text-kiln">
                      Administrative capital
                    </div>
                    <div className="text-lg font-display text-indigo mt-0.5">
                      {selectedDossier.capital}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm font-body text-kiln">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={16} className="text-madder" />
                      Renowned artisanal traditions ({selectedDossier.crafts.length})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedDossier.crafts.map((craft, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-khadi border border-kiln/10 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-lg font-display text-indigo">
                              {craft.name}
                            </div>
                            <div className="text-base font-body text-kiln mt-0.5">
                              {craft.category}
                            </div>
                          </div>

                          <span className="text-sm font-body px-2 py-0.5 bg-cream text-madder whitespace-nowrap">
                            {craft.giTag}
                          </span>
                        </div>

                        <p className="text-base text-indigo font-body leading-relaxed">
                          {craft.significance}
                        </p>

                        <div className="pt-2 border-t border-kiln/10 flex flex-wrap items-center justify-between gap-2 text-base font-body text-kiln">
                          <div>
                            <span className="text-indigo">Guild: </span>
                            <span>{craft.communities}</span>
                          </div>

                          <button
                            onClick={() => {
                              setPlayingAudioCraft(
                                playingAudioCraft === craft.name ? null : craft.name
                              );
                            }}
                            className="flex items-center gap-1 text-base text-kiln hover:text-indigo transition-colors"
                          >
                            <Volume2 size={16} />
                            <span>
                              {playingAudioCraft === craft.name ? 'Listening...' : 'Hear dialect'}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-kiln/20">
                <button
                  onClick={handleExploreArtisans}
                  className="w-full py-3.5 px-6 rounded bg-madder text-khadi font-body text-lg flex items-center justify-center gap-2 transition-colors hover:bg-madder/90"
                >
                  <span>See crafts</span>
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IndiaInteractiveMap;
