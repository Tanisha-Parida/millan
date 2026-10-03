import React from 'react';
import { m } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';
import type { CraftItem } from '../../types/craft';
import { type CurrencyCode } from '../../lib/currency';
import { VaultCard } from './VaultCard';

interface VaultResultsProps {
  activeCurrency?: CurrencyCode;
  selectedCategory: string;
  selectedState: string;
  artisans: CraftItem[];
  playingAudioId: string | null;
  savedWishlist: string[];
  onToggleWishlist: (id: string) => void;
  onToggleAudio: (item: CraftItem) => void;
  onViewLabel: (item: CraftItem) => void;
  onAddToCart?: (item: CraftItem) => void;
  onBackToStates: () => void;
  onBackToCategories: () => void;
  onResetFilter: () => void;
}

export const VaultResults: React.FC<VaultResultsProps> = ({
  activeCurrency = 'INR',
  selectedCategory,
  selectedState,
  artisans,
  playingAudioId,
  savedWishlist,
  onToggleWishlist,
  onToggleAudio,
  onViewLabel,
  onAddToCart,
  onBackToStates,
  onBackToCategories,
  onResetFilter,
}) => {
  // Deduplicate images on the current visible page: show each photo at most once
  const seenImages = new Set<string>();

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Result Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-cream border border-kiln/20">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-body text-kiln">
            <button
              type="button"
              onClick={onBackToCategories}
              className="hover:text-madder transition-colors"
            >
              Crafts
            </button>
            <ChevronRight size={12} className="text-indigo" />
            <button
              type="button"
              onClick={onBackToStates}
              className="hover:text-madder transition-colors"
            >
              {selectedCategory}
            </button>
            <ChevronRight size={12} className="text-indigo" />
            <span className="text-madder font-semibold">{selectedState}</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl text-indigo font-semibold">
            {selectedCategory} from artisan clusters in{' '}
            <span className="text-madder">{selectedState}</span>
          </h3>
          <p className="text-xs text-kiln font-body">
            {artisans.length} {artisans.length === 1 ? 'listing' : 'listings'} — every piece comes
            straight from the maker's workshop.
          </p>
        </div>

        {/* Action Buttons: Choose Another State & Reset Filter */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <button
            type="button"
            onClick={onBackToStates}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-kiln text-xs font-body text-indigo hover:text-madder transition-all"
          >
            <ChevronLeft size={14} />
            <span>Choose another state</span>
          </button>

          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-madder text-khadi font-semibold text-xs font-body hover:bg-madder/90 transition-all rounded"
          >
            <span>Reset filter</span>
          </button>
        </div>
      </div>

      {/* Sample Artisan Cards Grid with image deduplication */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map((product) => {
          const isUniquePhoto = !seenImages.has(product.image);
          if (isUniquePhoto) {
            seenImages.add(product.image);
          }
          return (
            <VaultCard
              key={product.id}
              product={product}
              activeCurrency={activeCurrency}
              isAudioPlaying={playingAudioId === product.id}
              isSaved={savedWishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleAudio={onToggleAudio}
              onViewLabel={onViewLabel}
              onAddToCart={onAddToCart}
              showPhoto={isUniquePhoto}
            />
          );
        })}
      </div>

      {/* Footer Assurance Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-cream border border-kiln/20 gap-3 text-xs">
        <div className="flex items-center gap-2 text-neem font-body">
          <ShieldCheck size={16} />
          <span>Payments go direct to artisan families in {selectedState}</span>
        </div>
        <button
          type="button"
          onClick={() => onViewLabel(artisans[0])}
          className="text-indigo hover:underline flex items-center gap-1 font-body"
        >
          <span>See how payments work</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </m.div>
  );
};

export default VaultResults;
