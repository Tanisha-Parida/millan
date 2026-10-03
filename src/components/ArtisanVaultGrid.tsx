import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { CraftItem, CraftCategory, IndianState, SignatureHub } from '../types/craft';
import { formatPrice, type CurrencyCode } from '../lib/currency';
import { CategoryGrid, StateSelector } from './vault/VaultFilters';
import { VaultResults } from './vault/VaultResults';
import { CraftDetailModal } from './vault/CraftDetailModal';

export type { CraftItem } from '../types/craft';

interface ArtisanVaultGridProps {
  onAddToCart?: (item: CraftItem) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeCurrency?: CurrencyCode;
}

export const ArtisanVaultGrid: React.FC<ArtisanVaultGridProps> = ({
  onAddToCart,
  activeCurrency = 'INR',
}) => {
  // Catalog data loaded only when section is near the viewport
  const [catalog, setCatalog] = useState<{
    categories: CraftCategory[];
    signatureHubs: Record<string, SignatureHub[]>;
    states: IndianState[];
    items: CraftItem[];
  } | null>(null);

  useEffect(() => {
    const section = document.getElementById('artisan-vault');
    if (!section) return;

    const loadData = () => {
      Promise.all([
        import('../data/vaultCatalog'),
        import('../data/vaultItems'),
      ]).then(([cat, itm]) => {
        setCatalog({
          categories: cat.CRAFT_CATEGORIES,
          signatureHubs: cat.SIGNATURE_HUBS_BY_CATEGORY,
          states: cat.ALL_INDIAN_STATES,
          items: itm.VAULT_ITEMS,
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadData();
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Navigation & Filtering State Machine
  const [activeView, setActiveView] = useState<'categories' | 'states' | 'results'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Modals & Player
  const [activeLivingLabel, setActiveLivingLabel] = useState<CraftItem | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setSavedWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Audio Playback Handler
  const handleToggleAudio = (item: CraftItem) => {
    if (playingAudioId === item.id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(item.id);
    }
  };

  // Category Selection Trigger
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedState(null);
    setActiveView('states');
  };

  // State Selection Trigger
  const handleSelectState = (stateName: string) => {
    setSelectedState(stateName);
    setActiveView('results');
  };

  // Reset Everything to Level 1
  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedState(null);
    setSearchQuery('');
    setActiveView('categories');
  };

  // Back to Level 2 (State Selector)
  const handleBackToStates = () => {
    setSelectedState(null);
    setActiveView('states');
  };

  // Back to Level 1 (Categories)
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedState(null);
    setActiveView('categories');
  };

  // Curated Signature Hubs for Current Category
  const signatureHubs = useMemo(() => {
    if (!selectedCategory || !catalog) return [];
    return catalog.signatureHubs[selectedCategory] || [];
  }, [selectedCategory, catalog]);

  // Filtered Results for Level 3
  const filteredArtisans = useMemo(() => {
    if (!selectedCategory || !selectedState || !catalog) return [];

    let items = catalog.items.filter((item) => {
      const catMatch =
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase());
      const stateMatch =
        item.state.toLowerCase() === selectedState.toLowerCase() ||
        item.state.toLowerCase().includes(selectedState.toLowerCase()) ||
        selectedState.toLowerCase().includes(item.state.toLowerCase());
      return catMatch && stateMatch;
    });

    // Also match general search query if typed in toolbar
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.region.toLowerCase().includes(q) ||
          i.materials.toLowerCase().includes(q) ||
          i.artisan.toLowerCase().includes(q)
      );
    }

    // If zero pre-seeded items exist for this exact State + Category combination,
    // generate an authentic regional artisan collective preview card
    if (items.length === 0) {
      const sigHub = signatureHubs.find(
        (h) => h.state.toLowerCase() === selectedState.toLowerCase()
      );
      const clusterTitle = sigHub ? sigHub.cluster : `${selectedState} Artisan Collective`;
      const clusterDesc = sigHub ? sigHub.description : `${selectedCategory} heritage cluster`;

      const fallbackItem: CraftItem = {
        id: `VLT-GEN-${selectedState.slice(0, 3).toUpperCase()}-${selectedCategory.slice(0, 3).toUpperCase()}`,
        title: `${clusterTitle} ${selectedCategory}`,
        category: selectedCategory,
        subCategory: clusterDesc,
        region: sigHub ? sigHub.cluster.split('&')[0].trim() : 'Craft District',
        state: selectedState,
        image:
          catalog.categories.find((c) => c.id === selectedCategory)?.image ||
          '/images/potter-jharokha.webp',
        priceINR: 7800,
        artisan: `${selectedState} Artisan Cooperative`,
        lineage: 'Family workshop collective',
        hoursToCraft: 24,
        materials: `Traditional ${selectedCategory} materials sourced in ${selectedState}`,
        audioNarrative: {
          dialect: `${selectedState} Regional Dialect`,
          vernacularQuote: `Our workshop in ${selectedState} keeps traditional techniques alive, passed down across generations.`,
          englishTranslation: `Families in ${selectedState} are paid directly and fairly — no middlemen, no marketplace cut.`,
        },
      };

      return [fallbackItem];
    }

    return items;
  }, [selectedCategory, selectedState, searchQuery, signatureHubs, catalog]);

  // Global search across all categories if user searches from root view
  const globalSearchMatches = useMemo(() => {
    if (!searchQuery.trim() || !catalog) return [];
    const q = searchQuery.toLowerCase().trim();
    return catalog.items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.materials.toLowerCase().includes(q)
    );
  }, [searchQuery, catalog]);

  // Search image deduplication tracker
  const seenSearchImages = new Set<string>();

  return (
    <section
      id="artisan-vault"
      className="relative w-full py-20 px-4 sm:px-8 bg-khadi border-t border-kiln/20 select-none text-left"
    >
      {/* 1. Header & Global Search Bar */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-kiln/15 pb-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-indigo font-normal tracking-tight">
              Crafts
            </h2>
            <p className="text-base text-indigo/85 max-w-xl mt-1.5 font-body leading-relaxed">
              Browse India's craft traditions by category and state. Every piece comes straight from
              the artisan's workshop, with fair pay built in.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kiln"
            />
            <input
              id="vault-search-input"
              type="text"
              placeholder="Search crafts, regions, or materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-cream border border-kiln/30 text-sm text-indigo placeholder-kiln/80 focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-kiln hover:text-indigo"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKFLOW: LEVEL 1, LEVEL 2, OR LEVEL 3 */}
      <div className="max-w-6xl mx-auto">
        {!catalog ? (
          <div className="py-24 text-center font-body text-sm text-indigo flex items-center justify-center gap-3">
            <span>Loading artisan craft catalog...</span>
          </div>
        ) : searchQuery.trim() && activeView === 'categories' && globalSearchMatches.length > 0 ? (
          /* Global Search Matches View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-indigo">
                Found {globalSearchMatches.length}{' '}
                {globalSearchMatches.length === 1 ? 'piece' : 'pieces'} matching "{searchQuery}"
              </h3>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-body text-madder hover:underline"
              >
                Clear search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {globalSearchMatches.map((item) => {
                const isUniquePhoto = !seenSearchImages.has(item.image);
                if (isUniquePhoto) seenSearchImages.add(item.image);

                return (
                  <div
                    key={item.id}
                    className="bg-cream border border-kiln/25 overflow-hidden p-4 space-y-3"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative border border-kiln/20">
                      {isUniquePhoto ? (
                        <img
                          src={item.image}
                          alt={`${item.title} handcrafted in ${item.state}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-khadi flex flex-col items-center justify-center p-4 text-center">
                          <span className="font-display text-lg text-indigo font-bold">
                            {item.title}
                          </span>
                          <span className="text-[13px] text-kiln mt-1 font-body">{item.subCategory}</span>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-cream/90 px-2.5 py-0.5 text-[13px] font-body text-indigo border border-kiln/20">
                        {item.state}
                      </span>
                    </div>
                    <div>
                      <span className="text-[13px] font-body text-kiln">
                        {item.category}
                      </span>
                      <h4 className="font-display text-lg text-indigo font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-xs text-indigo/80 line-clamp-2 mt-1 font-body">{item.materials}</p>
                    </div>
                    <div className="pt-2 border-t border-kiln/15 flex items-center justify-between">
                      <span className="font-body font-bold text-indigo text-sm">
                        {formatPrice(item.priceINR, activeCurrency)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveLivingLabel(item)}
                        className="text-xs px-3 py-1 bg-khadi border border-kiln/20 text-indigo font-semibold hover:bg-kiln/10 font-body transition-colors"
                      >
                        Maker's story
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeView === 'categories' && (
              <CategoryGrid
                key="level-1-categories"
                categories={catalog.categories}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {activeView === 'states' && selectedCategory && (
              <StateSelector
                key={`level-2-states-${selectedCategory}`}
                selectedCategory={selectedCategory}
                onSelectState={handleSelectState}
                onBackToCategories={handleBackToCategories}
                signatureHubsByCategory={catalog.signatureHubs}
                allStates={catalog.states}
              />
            )}

            {activeView === 'results' && selectedCategory && selectedState && (
              <VaultResults
                key={`level-3-results-${selectedCategory}-${selectedState}`}
                activeCurrency={activeCurrency}
                selectedCategory={selectedCategory}
                selectedState={selectedState}
                artisans={filteredArtisans}
                playingAudioId={playingAudioId}
                savedWishlist={savedWishlist}
                onToggleWishlist={toggleWishlist}
                onToggleAudio={handleToggleAudio}
                onViewLabel={(item) => setActiveLivingLabel(item)}
                onAddToCart={onAddToCart}
                onBackToStates={handleBackToStates}
                onBackToCategories={handleBackToCategories}
                onResetFilter={handleResetFilter}
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Maker's Story Modal Triggered from Cards */}
      <CraftDetailModal
        item={activeLivingLabel}
        onClose={() => setActiveLivingLabel(null)}
        onAddToCart={onAddToCart}
        activeCurrency={activeCurrency}
      />
    </section>
  );
};

export default ArtisanVaultGrid;
