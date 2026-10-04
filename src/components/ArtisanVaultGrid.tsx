import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { CraftItem, CraftCategory, IndianState, SignatureHub } from '../types/craft';
import { formatPrice, type CurrencyCode } from '../lib/currency';
import { CategoryGrid, StateSelector } from './vault/VaultFilters';
import { VaultResults } from './vault/VaultResults';
import { CraftDetailModal } from './vault/CraftDetailModal';
import KanthaStitch from './ornament/KanthaStitch';

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
    return (
      catalog.signatureHubs[selectedCategory] ||
      catalog.signatureHubs['Textiles & Handloom'] ||
      []
    );
  }, [selectedCategory, catalog]);

  // Filtered Results for Level 3
  const filteredArtisans = useMemo(() => {
    if (!selectedCategory || !selectedState || !catalog) return [];

    let items = catalog.items.filter((item) => {
      const catMatch =
        selectedCategory === 'Textiles & Handloom'
          ? item.category === 'Textiles' ||
            item.category === 'Handloom Weaving' ||
            item.category.includes('Textile')
          : item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
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

    // Fallback card if zero items match
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

  return (
    <section
      id="artisan-vault"
      className="relative w-full bg-khadi select-none text-left"
    >
      {/* 120px gradient seam from khadi-deep to khadi with Kantha stitch */}
      <div className="w-full h-[120px] bg-gradient-to-b from-khadi-deep to-khadi flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
        <KanthaStitch color="var(--color-clay)" strokeWidth={1.5} dashArray="8 6" className="w-full opacity-60" />
      </div>

      <div className="site-container pb-20 sm:pb-28">
        {/* 1. Header & Global Search Bar aligned to heading baseline */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-clay/40 pb-6">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-ink font-normal leading-tight">
                Crafts
              </h2>
              <p className="text-base text-ink-soft max-w-xl mt-2 font-body leading-relaxed max-w-[62ch]">
                Browse India's living craft traditions. Every piece comes directly from the maker's workshop, with fair pay accounted for.
              </p>
            </div>

            {/* Search Input: 44px high, parchment bg, aligned to baseline */}
            <div className="relative w-full md:w-80 h-11 shrink-0">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
              />
              <input
                id="vault-search-input"
                type="text"
                placeholder="Search crafts, regions, or materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-8 bg-parchment border border-clay rounded-[6px] text-sm text-ink placeholder-ink-soft/70 focus:outline-none focus:border-madder transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Main Workflow: Search Results, Empty State, or Level 1/2/3 */}
        <div>
          {!catalog ? (
            <div className="py-24 text-center font-body text-sm text-ink flex items-center justify-center gap-3">
              <span>Loading artisan craft catalog...</span>
            </div>
          ) : searchQuery.trim() && activeView === 'categories' ? (
            globalSearchMatches.length > 0 ? (
              /* Global Search Matches View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-ink font-semibold">
                    Found {globalSearchMatches.length}{' '}
                    {globalSearchMatches.length === 1 ? 'piece' : 'pieces'} matching "{searchQuery}"
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-body text-madder hover:underline cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {globalSearchMatches.map((item) => (
                    <div
                      key={item.id}
                      className="bg-khadi border border-clay rounded-[4px] overflow-hidden p-4 space-y-3"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative rounded-[2px] bg-parchment">
                        <img
                          src={item.image}
                          alt={`${item.title} handcrafted in ${item.state}`}
                          width={400}
                          height={300}
                          loading="lazy"
                          style={{
                            filter: 'saturate(0.92) contrast(1.03) sepia(0.06)',
                          }}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-parchment/95 px-2 py-0.5 rounded-[4px] text-xs font-body text-ink border border-clay/60">
                          {item.state}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-body text-ink-soft">
                          {item.category}
                        </span>
                        <h4 className="font-heading text-lg text-ink font-semibold mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-xs text-ink-soft line-clamp-2 mt-1 font-body">
                          {item.materials}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-clay/30 flex items-center justify-between">
                        <span className="font-body font-bold text-ink text-sm tabular-nums">
                          {formatPrice(item.priceINR, activeCurrency)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveLivingLabel(item)}
                          className="text-xs px-3 py-1.5 rounded-[6px] bg-parchment border border-clay text-ink font-medium hover:bg-clay/20 font-body transition-colors cursor-pointer"
                        >
                          Story
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Search Empty State: guides user on what to try next */
              <div className="py-16 px-6 text-center bg-parchment border border-clay rounded-[4px] space-y-4 max-w-xl mx-auto">
                <h3 className="font-heading text-2xl text-ink font-semibold">
                  No crafts found matching "{searchQuery}"
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed max-w-md mx-auto">
                  Try searching for craft traditions like <strong className="text-ink font-semibold">"Ikat"</strong>, <strong className="text-ink font-semibold">"Pattachitra"</strong>, <strong className="text-ink font-semibold">"Dhokra"</strong>, or browse by craft category below.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="btn-primary h-11 text-xs"
                  >
                    Clear search & browse categories
                  </button>
                </div>
              </div>
            )
          ) : (
            <AnimatePresence mode="wait">
              {activeView === 'categories' && (
                <CategoryGrid
                  key="level-1-categories"
                  categories={catalog.categories}
                  items={catalog.items}
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
      </div>
    </section>
  );
};

export default ArtisanVaultGrid;
