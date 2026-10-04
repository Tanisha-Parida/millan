import React, { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Search, X } from 'lucide-react';
import type { CraftCategory, IndianState, SignatureHub, CraftItem } from '../../types/craft';

interface CategoryGridProps {
  categories?: CraftCategory[];
  items?: CraftItem[];
  onSelectCategory: (categoryId: string) => void;
}

// Meta mapping computed from catalog
const REAL_META_BY_CAT: Record<string, string> = {
  'Textiles & Handloom': '6 makers, 5 states',
  'Textiles': '4 makers, 4 states',
  'Handloom Weaving': '2 makers, 2 states',
  'Pottery & Terracotta': '3 makers, 3 states',
  'Dhokra Metalcraft': '2 makers, 2 states',
  'Woodwork & Inlay': '2 makers, 2 states',
  'Leathercraft & Mojaris': '2 makers, 2 states',
  'Stone & Marble Carving': '2 makers, 2 states',
  'Folk & Tribal Art': '3 makers, 3 states',
};

// Mosaic grid configuration for 7 categories:
// Row 1: 7 cols + 5 cols (both 3:2)
// Row 2: 4 cols + 4 cols + 4 cols (all 4:5)
// Row 3: 4 cols + 8 cols (4:5 and 3:2 feature)
const MOSAIC_LAYOUT = [
  { span: 'col-span-12 lg:col-span-7', aspect: 'aspect-[3/2]' },
  { span: 'col-span-12 lg:col-span-5', aspect: 'aspect-[3/2]' },
  { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[4/5]' },
  { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[4/5]' },
  { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[4/5]' },
  { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[4/5]' },
  { span: 'col-span-12 lg:col-span-8', aspect: 'aspect-[3/2]' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories = [],
  onSelectCategory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* 12-column Editorial Mosaic Grid */}
      <div className="grid grid-cols-12 gap-6">
        {categories.map((cat, idx) => {
          const layout = MOSAIC_LAYOUT[idx] || {
            span: 'col-span-12 sm:col-span-6 lg:col-span-4',
            aspect: 'aspect-[4/5]',
          };
          const metaLine = REAL_META_BY_CAT[cat.id];
          const isFolkArt = cat.id === 'Folk & Tribal Art';

          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              aria-label={`Explore ${cat.title}`}
              className={`group ${layout.span} flex flex-col text-left cursor-pointer border border-clay/60 hover:border-ink/40 rounded-[4px] overflow-hidden bg-khadi transition-all duration-300 focus-visible:outline-2 focus-visible:outline-madder focus-visible:outline-offset-2`}
            >
              {/* Image Container on Top — NO dark scrim */}
              <div className={`relative w-full ${layout.aspect} overflow-hidden bg-parchment`}>
                {isFolkArt ? (
                  // Typographic placeholder on clay as requested in spec
                  <div className="w-full h-full bg-clay/35 border-b border-clay/50 flex flex-col items-center justify-center p-8 text-center relative select-none">
                    <div
                      className="absolute inset-2 border border-clay/60 border-dashed rounded-[2px] pointer-events-none"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-ink-soft uppercase tracking-wider font-semibold mb-2">
                      Living canvas tradition
                    </span>
                    <h4 className="font-heading text-2xl sm:text-3xl text-ink font-semibold leading-snug">
                      Folk & Tribal Art
                    </h4>
                    <span className="text-xs text-ink-soft mt-3 font-body">
                      Madhubani · Pattachitra · Warli
                    </span>
                  </div>
                ) : (
                  <img
                    src={cat.image}
                    alt={`${cat.title} craft tradition`}
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    style={{
                      filter: 'saturate(0.92) contrast(1.03) sepia(0.06)',
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-600 ease-out"
                  />
                )}
              </div>

              {/* Text Block below on Khadi with Fixed-Height for Baseline Alignment */}
              <div className="p-4 flex-1 flex flex-col justify-between min-h-[148px]">
                <div>
                  <h3 className="font-heading text-2xl text-ink font-semibold leading-snug group-hover:underline group-hover:underline-offset-4 decoration-madder transition-all">
                    {cat.title}
                  </h3>
                  <p className="text-[15px] text-ink-soft mt-1.5 leading-relaxed line-clamp-2 font-body">
                    {cat.description}
                  </p>
                </div>

                {metaLine && (
                  <div className="text-xs text-ink-soft/80 pt-3 mt-3 border-t border-clay/30 font-body">
                    {metaLine}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

interface StateSelectorProps {
  selectedCategory: string;
  onSelectState: (stateName: string) => void;
  onBackToCategories: () => void;
  signatureHubsByCategory?: Record<string, SignatureHub[]>;
  allStates?: IndianState[];
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  selectedCategory,
  onSelectState,
  onBackToCategories,
  signatureHubsByCategory = {},
  allStates = [],
}) => {
  const [stateTab, setStateTab] = useState<'all' | 'famous'>('famous');
  const [stateSearchQuery, setStateSearchQuery] = useState<string>('');

  const signatureHubs = useMemo(() => {
    return (
      signatureHubsByCategory[selectedCategory] ||
      signatureHubsByCategory['Textiles & Handloom'] ||
      []
    );
  }, [selectedCategory, signatureHubsByCategory]);

  const signatureStateNames = useMemo(() => {
    return new Set(signatureHubs.map((h) => h.state.toLowerCase()));
  }, [signatureHubs]);

  const filteredStates = useMemo(() => {
    let list = allStates;
    if (stateTab === 'famous') {
      list = list.filter((s) => signatureStateNames.has(s.name.toLowerCase()));
    }
    if (stateSearchQuery.trim()) {
      const q = stateSearchQuery.toLowerCase().trim();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    return list;
  }, [stateTab, signatureStateNames, stateSearchQuery, allStates]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-parchment border border-clay/70 rounded-[4px] p-6 sm:p-8 space-y-6 text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-clay/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-body text-ink-soft">
            <button
              onClick={onBackToCategories}
              className="hover:text-madder transition-colors cursor-pointer"
            >
              Crafts
            </button>
            <ChevronRight size={12} className="text-ink-soft" />
            <span className="text-ink font-semibold">{selectedCategory}</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl text-ink font-semibold">
            Select a state
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft font-body">
            Choose a state known for its{' '}
            <span className="text-ink font-medium">{selectedCategory}</span> tradition.
          </p>
        </div>

        <button
          onClick={onBackToCategories}
          className="inline-flex items-center gap-2 px-4 py-2 bg-khadi border border-clay rounded-[6px] text-xs font-body text-ink hover:bg-clay/20 transition-colors self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to categories</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-khadi border border-clay rounded-[6px] w-fit">
          <button
            onClick={() => setStateTab('famous')}
            className={`px-4 py-1.5 rounded-[4px] text-xs font-body transition-colors cursor-pointer ${
              stateTab === 'famous'
                ? 'bg-madder text-bone font-semibold'
                : 'text-ink hover:text-madder'
            }`}
          >
            Famous for this craft ({signatureHubs.length} hubs)
          </button>
          <button
            onClick={() => setStateTab('all')}
            className={`px-4 py-1.5 rounded-[4px] text-xs font-body transition-colors cursor-pointer ${
              stateTab === 'all'
                ? 'bg-madder text-bone font-semibold'
                : 'text-ink hover:text-madder'
            }`}
          >
            All states & UTs (36)
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search state..."
            value={stateSearchQuery}
            onChange={(e) => setStateSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-khadi border border-clay rounded-[6px] text-xs text-ink placeholder-ink-soft/70 focus:outline-none focus:border-madder"
          />
          {stateSearchQuery && (
            <button
              onClick={() => setStateSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto pr-1">
        {filteredStates.map((st) => {
          const isSigHub = signatureStateNames.has(st.name.toLowerCase());
          const hubInfo = signatureHubs.find(
            (h) => h.state.toLowerCase() === st.name.toLowerCase()
          );

          return (
            <button
              key={st.name}
              onClick={() => onSelectState(st.name)}
              className={`group relative text-left p-4 rounded-[4px] border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isSigHub
                  ? 'bg-khadi border-clay hover:border-madder'
                  : 'bg-khadi/70 border-clay/50 hover:border-clay hover:bg-khadi'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-body text-ink-soft">
                    {st.type}
                  </span>
                  <h4 className="font-heading text-base font-semibold text-ink group-hover:text-madder transition-colors">
                    {st.name}
                  </h4>
                </div>

                {isSigHub && (
                  <span className="px-2 py-0.5 rounded-[2px] bg-haldi/20 border border-haldi/40 text-[11px] font-body text-ink whitespace-nowrap font-medium">
                    Signature hub
                  </span>
                )}
              </div>

              {hubInfo ? (
                <div className="mt-3 pt-2 border-t border-clay/30 text-xs space-y-0.5 font-body">
                  <div className="text-madder font-medium">{hubInfo.cluster}</div>
                  <div className="text-ink-soft line-clamp-1">{hubInfo.description}</div>
                </div>
              ) : (
                <div className="mt-3 pt-2 border-t border-clay/20 text-xs text-ink-soft flex items-center justify-between font-body">
                  <span>Explore artisans</span>
                  <ChevronRight size={12} className="text-ink-soft" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="py-12 text-center space-y-2">
          <p className="text-sm text-ink-soft font-body">No states found matching "{stateSearchQuery}".</p>
          <button
            onClick={() => setStateSearchQuery('')}
            className="text-xs text-madder font-body hover:underline cursor-pointer"
          >
            Clear search filter
          </button>
        </div>
      )}
    </motion.div>
  );
};
