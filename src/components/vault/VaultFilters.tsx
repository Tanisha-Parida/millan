import React, { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowLeft, ChevronRight, Search, X } from 'lucide-react';
import type { CraftCategory, IndianState, SignatureHub } from '../../types/craft';

interface CategoryGridProps {
  categories?: CraftCategory[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories = [],
  onSelectCategory,
}) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            aria-label={`Explore ${cat.title} — ${cat.subtitle}`}
            className="group relative h-80 overflow-hidden cursor-pointer border border-kiln/20 hover:border-kiln/60 transition-all duration-400 text-left"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={`${cat.title} craft tradition`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/90 via-hero-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-hero-dark/20 group-hover:bg-transparent transition-colors duration-300" />

            {/* Card Labels Positioned Bottom-Left */}
            <div className="absolute bottom-5 left-5 right-5 space-y-1.5 pointer-events-none">
              <span className="text-xs font-body text-khadi block">
                {cat.subtitle}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-khadi group-hover:text-cream transition-colors leading-tight">
                {cat.title}
              </h3>
              <p className="text-[13px] text-khadi/80 line-clamp-2 leading-relaxed font-body">
                {cat.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </m.div>
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
    return signatureHubsByCategory[selectedCategory] || [];
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
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-cream border border-kiln/20 p-5 sm:p-8 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kiln/20 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-body text-kiln">
            <button onClick={onBackToCategories} className="hover:text-madder transition-colors">
              Crafts
            </button>
            <ChevronRight size={12} className="text-indigo" />
            <span className="text-indigo font-semibold">{selectedCategory}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-indigo font-semibold">
            Select a state
          </h3>
          <p className="text-xs sm:text-sm text-kiln font-body">
            Choose a state known for its <span className="text-indigo">{selectedCategory}</span>{' '}
            tradition.
          </p>
        </div>

        <button
          onClick={onBackToCategories}
          className="inline-flex items-center gap-2 px-4 py-2 bg-khadi border border-kiln/20 text-xs font-body text-indigo hover:bg-kiln/10 transition-all self-start sm:self-center"
        >
          <ArrowLeft size={14} />
          <span>Back to categories</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-khadi border border-kiln/20 w-fit">
          <button
            onClick={() => setStateTab('famous')}
            className={`px-4 py-2 text-xs font-body transition-all ${
              stateTab === 'famous'
                ? 'bg-madder text-khadi font-bold'
                : 'text-indigo hover:text-madder'
            }`}
          >
            Famous for this craft ({signatureHubs.length} hubs)
          </button>
          <button
            onClick={() => setStateTab('all')}
            className={`px-4 py-2 text-xs font-body transition-all ${
              stateTab === 'all'
                ? 'bg-madder text-khadi font-bold'
                : 'text-indigo hover:text-madder'
            }`}
          >
            All states & UTs (36)
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kiln" />
          <input
            type="text"
            placeholder="Search state..."
            value={stateSearchQuery}
            onChange={(e) => setStateSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-khadi border border-kiln/20 text-xs text-indigo placeholder-kiln/60 focus:outline-none focus:border-indigo"
          />
          {stateSearchQuery && (
            <button
              onClick={() => setStateSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-kiln hover:text-indigo"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredStates.map((st) => {
          const isSigHub = signatureStateNames.has(st.name.toLowerCase());
          const hubInfo = signatureHubs.find(
            (h) => h.state.toLowerCase() === st.name.toLowerCase()
          );

          return (
            <button
              key={st.name}
              onClick={() => onSelectState(st.name)}
              className={`group relative text-left p-4 border transition-all duration-200 flex flex-col justify-between ${
                isSigHub
                  ? 'bg-khadi border-kiln/40 hover:border-kiln/80'
                  : 'bg-khadi border-kiln/20 hover:border-kiln/40 hover:bg-cream'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[13px] font-body text-kiln">
                    {st.type}
                  </span>
                  <h4 className="font-display text-base font-semibold text-indigo group-hover:text-madder transition-colors">
                    {st.name}
                  </h4>
                </div>

                {isSigHub && (
                  <span className="px-2 py-0.5 rounded bg-haldi/20 border border-haldi/40 text-[13px] font-body text-kiln whitespace-nowrap">
                    Signature hub
                  </span>
                )}
              </div>

              {hubInfo ? (
                <div className="mt-2 pt-2 border-t border-kiln/15 text-[13px] space-y-0.5 font-body">
                  <div className="text-madder font-medium">{hubInfo.cluster}</div>
                  <div className="text-kiln line-clamp-1">{hubInfo.description}</div>
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-kiln/10 text-[13px] text-kiln flex items-center justify-between font-body">
                  <span>Explore artisans</span>
                  <ChevronRight size={12} className="text-indigo" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="py-12 text-center space-y-2">
          <p className="text-sm text-kiln font-body">No states found matching "{stateSearchQuery}".</p>
          <button
            onClick={() => setStateSearchQuery('')}
            className="text-xs text-indigo font-body hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}
    </m.div>
  );
};
