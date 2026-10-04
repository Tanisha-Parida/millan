import React from 'react';
import { m as motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  ShoppingBag,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { CraftItem } from '../../types/craft';
import { formatPrice, type CurrencyCode } from '../../lib/currency';

interface VaultCardProps {
  product: CraftItem;
  activeCurrency?: CurrencyCode;
  isAudioPlaying: boolean;
  isSaved: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleAudio: (item: CraftItem) => void;
  onViewLabel: (item: CraftItem) => void;
  onAddToCart?: (item: CraftItem) => void;
  showPhoto?: boolean;
}

export const VaultCard: React.FC<VaultCardProps> = ({
  product,
  activeCurrency = 'INR',
  isAudioPlaying,
  isSaved,
  onToggleWishlist,
  onToggleAudio,
  onViewLabel,
  onAddToCart,
  showPhoto = true,
}) => {
  return (
    <div className="group relative bg-khadi border border-clay rounded-[4px] overflow-hidden flex flex-col justify-between transition-colors focus-within:ring-2 focus-within:ring-madder">
      {/* Product Image without dark scrim */}
      {showPhoto ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-parchment rounded-t-[2px]">
          <img
            src={product.image}
            alt={`${product.title} handcrafted in ${product.region}, ${product.state}`}
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            style={{
              filter: 'saturate(0.92) contrast(1.03) sepia(0.06)',
            }}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-600 ease-out"
          />

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            className={`absolute top-2 right-2 w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer ${
              isSaved
                ? 'bg-madder text-bone'
                : 'bg-parchment/90 text-ink hover:text-madder border border-clay/60'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Region & State pill */}
          <span className="absolute bottom-2 left-2 bg-parchment/95 px-2 py-0.5 rounded-[4px] text-xs text-ink font-body border border-clay/60 flex items-center gap-1 shadow-xs">
            <MapPin size={11} className="text-madder" />
            <span>{product.region}, {product.state}</span>
          </span>
        </div>
      ) : (
        /* Typographic Placeholder Card */
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-clay/30 border-b border-clay/50 p-4 flex flex-col justify-between rounded-t-[2px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-body text-ink-soft">
              {product.category}
            </span>
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer ${
                isSaved ? 'bg-madder text-bone' : 'bg-parchment text-ink hover:text-madder border border-clay'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="space-y-1">
            <div className="font-heading text-xl font-bold text-ink leading-snug line-clamp-2">
              {product.title}
            </div>
            <div className="text-xs text-ink-soft font-body">
              {product.subCategory}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-body text-ink">
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-madder" />
              <span>{product.region}, {product.state}</span>
            </div>
            <span className="text-neem font-medium">{product.hoursToCraft} hrs</span>
          </div>
        </div>
      )}

      {/* Product Card Details */}
      <div className="p-4 space-y-3 flex flex-col justify-between flex-1">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-body">{product.subCategory}</span>
            <span className="text-neem font-medium">
              {product.hoursToCraft} hrs craft
            </span>
          </div>

          <h4 className="font-heading text-lg text-ink font-semibold leading-snug group-hover:underline decoration-madder underline-offset-2 transition-colors">
            {product.title}
          </h4>

          <div className="text-xs text-ink space-y-0.5 font-body">
            <div className="font-medium text-ink">Artisan: {product.artisan}</div>
            <div className="text-ink-soft text-[12px]">{product.lineage}</div>
          </div>

          <p className="text-xs text-ink-soft line-clamp-2 pt-1 font-body">
            {product.materials}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-clay/30 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-body text-ink-soft block">
                Artisan's price
              </span>
              <span className="text-base font-body font-bold text-ink tabular-nums">
                {formatPrice(product.priceINR, activeCurrency)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Audio Story Toggle */}
              <button
                type="button"
                onClick={() => onToggleAudio(product)}
                className={`p-2 rounded-[6px] border transition-colors cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-haldi text-ink border-haldi'
                    : 'bg-parchment text-ink border-clay hover:bg-clay/20'
                }`}
                title="Hear the artisan's story"
                aria-label="Hear the artisan's story"
              >
                {isAudioPlaying ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Living Label Modal Trigger */}
              <button
                type="button"
                onClick={() => onViewLabel(product)}
                className="text-madder text-xs font-semibold hover:underline font-body cursor-pointer"
              >
                Story
              </button>
            </div>
          </div>

          {/* Add to Bag Action */}
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="w-full h-11 rounded-[6px] bg-madder hover:bg-madder-dark text-bone font-medium text-xs transition-colors flex items-center justify-center gap-2 font-body cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>Add to bag</span>
          </button>

          {/* Audio Narration Bubble (if active) */}
          {isAudioPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-[4px] bg-parchment border border-clay/60 text-left text-xs space-y-1 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neem shrink-0" />
                <span className="text-xs font-body font-medium text-ink">
                  In the artisan's words ({product.audioNarrative.dialect}):
                </span>
              </div>
              <p className="italic font-heading text-ink text-sm">
                “{product.audioNarrative.vernacularQuote}”
              </p>
              <p className="text-xs text-ink-soft font-body">
                <strong className="text-ink font-semibold">En:</strong>{' '}
                {product.audioNarrative.englishTranslation}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
