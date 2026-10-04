import React from 'react';
import { m as motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-left"
    >
      {/* Result Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-parchment border border-clay rounded-[4px]">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-body text-ink-soft">
            <button
              type="button"
              onClick={onBackToCategories}
              className="hover:text-madder transition-colors cursor-pointer"
            >
              Crafts
            </button>
            <ChevronRight size={12} className="text-ink-soft" />
            <button
              type="button"
              onClick={onBackToStates}
              className="hover:text-madder transition-colors cursor-pointer"
            >
              {selectedCategory}
            </button>
            <ChevronRight size={12} className="text-ink-soft" />
            <span className="text-madder font-semibold">{selectedState}</span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl text-ink font-semibold">
            {selectedCategory} from artisan clusters in{' '}
            <span className="text-madder">{selectedState}</span>
          </h3>
          <p className="text-xs text-ink-soft font-body">
            {artisans.length} {artisans.length === 1 ? 'listing' : 'listings'} — directly from the maker's workshop with fair wages accounted for.
          </p>
        </div>

        {/* Action Buttons: Choose Another State & Reset Filter (44px min height, 6px radius) */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            type="button"
            onClick={onBackToStates}
            className="btn-secondary h-11 text-xs"
          >
            <ChevronLeft size={14} className="mr-1.5" />
            <span>Choose another state</span>
          </button>

          <button
            type="button"
            onClick={onResetFilter}
            className="btn-primary h-11 text-xs"
          >
            <span>Reset filter</span>
          </button>
        </div>
      </div>

      {/* Empty State when no artisans match */}
      {artisans.length === 0 ? (
        <div className="p-12 text-center bg-parchment border border-clay rounded-[4px] space-y-4">
          <h4 className="font-heading text-xl text-ink font-semibold">
            No artisan listings found for {selectedCategory} in {selectedState}
          </h4>
          <p className="text-sm text-ink-soft max-w-md mx-auto">
            Try choosing a neighboring artisan state known for this craft, or reset filters to browse the entire collection.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onBackToStates}
              className="btn-secondary h-11 text-xs"
            >
              Choose another state
            </button>
            <button
              type="button"
              onClick={onResetFilter}
              className="btn-primary h-11 text-xs"
            >
              View all crafts
            </button>
          </div>
        </div>
      ) : (
        /* Sample Artisan Cards Grid with image deduplication */
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
      )}

      {/* Footer Assurance Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-parchment border border-clay rounded-[4px] gap-3 text-xs">
        <div className="flex items-center gap-2 text-neem font-body font-semibold">
          <ShieldCheck size={16} />
          <span>Payments transfer directly to artisan families in {selectedState}</span>
        </div>
        {artisans.length > 0 && (
          <button
            type="button"
            onClick={() => onViewLabel(artisans[0])}
            className="text-madder hover:underline flex items-center gap-1 font-body font-medium cursor-pointer"
          >
            <span>See how pricing breakdown works</span>
            <ExternalLink size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default VaultResults;
