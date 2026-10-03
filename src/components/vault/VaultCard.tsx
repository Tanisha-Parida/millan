import React from 'react';
import { m } from 'framer-motion';
import {
  Heart,
  MapPin,
  ShoppingBag,
  Volume2,
  VolumeX,
  Sparkles,
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
    <div className="group relative bg-khadi border border-kiln/20 overflow-hidden flex flex-col justify-between">
      {/* High-Res Product Image OR Typographic Placeholder for duplicate images */}
      {showPhoto ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
          <img
            src={product.image}
            alt={`${product.title} handcrafted in ${product.region}, ${product.state}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo/50 via-transparent to-transparent" />

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            className={`absolute top-3 right-3 w-8 h-8 rounded flex items-center justify-center transition-colors ${
              isSaved ? 'bg-madder text-khadi' : 'bg-cream/80 text-indigo hover:text-madder'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Real Field Badge: Region & State */}
          <span className="absolute top-3 left-3 bg-cream/90 px-2 py-1 rounded text-[13px] text-indigo font-body border border-kiln/20 flex items-center gap-1.5">
            <MapPin size={12} />
            <span>{product.region}, {product.state}</span>
          </span>

          {/* Hours to craft tag */}
          <div className="absolute bottom-2.5 left-3 text-[13px] font-body text-khadi flex items-center gap-1">
            <Sparkles size={12} />
            <span>{product.hoursToCraft} hrs of handwork</span>
          </div>
        </div>
      ) : (
        /* Typographic Placeholder Card */
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream border-b border-kiln/20 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-body text-indigo">
              {product.category}
            </span>
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                isSaved ? 'bg-madder text-khadi' : 'bg-khadi text-indigo hover:text-madder'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="space-y-1">
            <div className="font-display text-xl font-bold text-indigo leading-snug line-clamp-2">
              {product.title}
            </div>
            <div className="text-[13px] text-kiln font-body italic">
              {product.subCategory}
            </div>
          </div>
          <div className="flex items-center justify-between text-[13px] font-body text-indigo">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-kiln" />
              <span>{product.region}, {product.state}</span>
            </div>
            <span className="text-neem">{product.hoursToCraft} hrs craft</span>
          </div>
        </div>
      )}

      {/* Product Card Details */}
      <div className="p-4 space-y-3.5 flex flex-col justify-between flex-1">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-body text-kiln">{product.subCategory}</span>
            <span className="text-[13px] text-neem">
              {product.hoursToCraft} hrs of handwork
            </span>
          </div>

          <h4 className="font-display text-lg text-indigo font-semibold leading-snug group-hover:text-madder transition-colors">
            {product.title}
          </h4>

          <div className="text-xs text-indigo space-y-0.5 font-body">
            <div className="font-medium">Artisan: {product.artisan}</div>
            <div className="text-[13px]">Lineage: {product.lineage}</div>
          </div>

          <p className="text-[13px] text-indigo line-clamp-2 pt-1 font-body">
            {product.materials}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-kiln/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-body text-kiln block">
                Artisan's price
              </span>
              <span className="text-base font-body font-semibold text-indigo">
                {formatPrice(product.priceINR, activeCurrency)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Audio Story Toggle */}
              <button
                type="button"
                onClick={() => onToggleAudio(product)}
                className={`p-2 rounded border transition-all ${
                  isAudioPlaying
                    ? 'bg-haldi text-indigo border-haldi'
                    : 'bg-cream text-indigo border-kiln/20 hover:bg-haldi/20'
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
                className="text-madder text-xs font-semibold flex items-center gap-1 transition-colors hover:underline font-body"
              >
                <span>Maker's story</span>
              </button>
            </div>
          </div>

          {/* Add to Cart Action */}
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="w-full py-2.5 rounded bg-madder text-khadi font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 font-body"
          >
            <ShoppingBag size={14} />
            <span>Add to bag</span>
          </button>

          {/* Audio Narration Bubble (if active) */}
          {isAudioPlaying && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded bg-cream border border-kiln/20 text-left text-xs space-y-1 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neem" />
                <span className="text-[13px] font-body text-indigo">
                  In the artisan's words ({product.audioNarrative.dialect}):
                </span>
              </div>
              <p className="italic font-display text-indigo">
                "{product.audioNarrative.vernacularQuote}"
              </p>
              <p className="text-[13px] text-kiln font-body">
                <strong className="text-indigo">En:</strong>{' '}
                {product.audioNarrative.englishTranslation}
              </p>
            </m.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
