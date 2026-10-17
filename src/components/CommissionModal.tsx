import React, { useState, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import {
  ShoppingBag,
  X,
  ShieldCheck,
  CheckCircle2,
  Send,
  MapPin,
  LocateFixed,
  Crosshair,
  Loader2,
} from 'lucide-react';
import type { CraftItem } from '../types/craft';
import { formatPrice, type CurrencyCode } from '../lib/currency';
import { useModalA11y } from '../hooks/useModalA11y';
import { VAULT_ITEMS } from '../data/vaultItems';

interface GpsMetadata {
  coords: string;
  accuracy: number;
  latitude: number;
  longitude: number;
}

function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`;
}

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartIds?: string[];
  cartItems?: CraftItem[];
  publishedItems?: CraftItem[];
  onRemoveCartItem?: (id: string) => void;
  activeCurrency?: CurrencyCode;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  cartIds = [],
  cartItems = [],
  publishedItems = [],
  onRemoveCartItem,
  activeCurrency = 'INR',
}) => {
  const [selectedGuild, setSelectedGuild] = useState('Sambalpuri Handloom Silk (Odisha)');
  const [patronName, setPatronName] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [gpsMetadata, setGpsMetadata] = useState<GpsMetadata | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const handleDetectGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser or device.');
      return;
    }

    setIsLocatingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const coordsStr = formatCoordinates(latitude, longitude);

        // Attempt reverse geocoding for a human-readable locality & city
        let humanAddress = '';
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 4500);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            {
              headers: { 'Accept-Language': 'en' },
              signal: controller.signal,
            }
          );
          clearTimeout(timer);
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.road || '';
            const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || '';
            const state = addr.state || '';
            const postal = addr.postcode ? ` - ${addr.postcode}` : '';
            const parts = [locality, city, state].filter(Boolean);
            if (parts.length > 0) {
              humanAddress = `${parts.join(', ')}${postal}`;
            }
          }
        } catch {
          /* ignore network error on reverse-geocode */
        }

        const finalLocationText = humanAddress
          ? `${humanAddress} (${coordsStr})`
          : `GPS: ${coordsStr}`;

        setDestinationCity(finalLocationText);
        setGpsMetadata({
          coords: coordsStr,
          accuracy,
          latitude,
          longitude,
        });
        setIsLocatingGps(false);
      },
      (error) => {
        setIsLocatingGps(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('GPS access was denied. You can enter your delivery location manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('GPS position unavailable. Please type your location manually.');
            break;
          case error.TIMEOUT:
            setGpsError('GPS request timed out. Please try again or type manually.');
            break;
          default:
            setGpsError('Could not retrieve GPS location. Please type manually.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);
  const [customBrief, setCustomBrief] = useState('');
  const [targetBudgetINR, setTargetBudgetINR] = useState(15000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const panelRef = useModalA11y(isOpen, onClose);

  const guilds = [
    'Sambalpuri Handloom Silk (Odisha)',
    'Bastar Lost-Wax Dhokra (Chhattisgarh)',
    'Nizamabad Black Clay (UP)',
    'Kutch Desert Bandhani & Ajrakh (Gujarat)',
    'Channapatna Lacquer Woodcraft (Karnataka)',
    'Mithila Natural Pigment Canvas (Bihar)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const itemsToDisplay = React.useMemo(() => {
    if (cartItems.length > 0) return cartItems;
    if (!cartIds || cartIds.length === 0) return [];
    return cartIds.flatMap((id) => {
      const seeded = VAULT_ITEMS.find((x) => x.id === id);
      if (seeded) return [seeded];
      const pub = publishedItems.find((x) => x.id === id);
      if (pub) return [pub];
      return [];
    });
  }, [cartItems, cartIds, publishedItems]);

  if (!isOpen) return null;

  const totalCartValue = itemsToDisplay.reduce((acc, item) => acc + item.priceINR, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-vat/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag and custom commission"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl my-auto rounded-[4px] bg-parchment border border-clay p-6 sm:p-8 shadow-xl text-left focus:outline-none"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-[6px] bg-khadi border border-clay text-ink hover:text-madder flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-clay/40 pb-4 mb-6">
          <div className="w-12 h-12 rounded-[6px] bg-madder flex items-center justify-center text-bone shrink-0 shadow-xs">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h3 className="font-heading text-2xl text-ink font-semibold">
              Your bag & custom commission
            </h3>
            <p className="text-sm text-ink-soft mt-0.5">
              Acquire ready masterworks or commission custom pieces directly from rural artisan families.
            </p>
          </div>
        </div>

        {/* Items in Bag List */}
        {itemsToDisplay.length > 0 ? (
          <div className="mb-6 p-4 rounded-[4px] bg-khadi border border-clay space-y-3">
            <div className="text-xs text-ink-soft font-semibold">
              Selected crafts ({itemsToDisplay.length}):
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
              {itemsToDisplay.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm font-body py-1.5 border-b border-clay/40 last:border-0"
                >
                  <span className="text-ink font-medium truncate max-w-xs">{item.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-ink font-bold tabular-nums">
                      {formatPrice(item.priceINR, activeCurrency)}
                    </span>
                    {onRemoveCartItem && (
                      <button
                        type="button"
                        onClick={() => onRemoveCartItem(item.id)}
                        className="text-madder hover:text-madder-dark text-xs font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-clay/60 flex justify-between items-center text-sm font-heading font-semibold text-ink">
              <span>Total amount:</span>
              <span className="text-neem text-base font-bold tabular-nums">
                {formatPrice(totalCartValue, activeCurrency)}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-[4px] bg-khadi border border-clay/60 text-xs text-ink-soft leading-relaxed">
            Your bag is empty. You can browse the catalog above to add ready crafts, or describe a custom bespoke commission below.
          </div>
        )}

        {isSubmitted ? (
          <div className="p-8 rounded-[4px] bg-khadi border border-neem/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neem/15 text-neem mx-auto flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="font-heading text-2xl text-ink font-semibold">
              Commission request submitted
            </h4>
            <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
              Your brief has been forwarded to the{' '}
              <strong className="text-ink font-medium">{selectedGuild}</strong> collective. An artisan coordinator will connect within 24 hours.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-primary h-11 text-xs"
              >
                Return to catalog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-body">
            <div>
              <label className="block text-xs text-ink-soft font-medium mb-1">
                Craft tradition:
              </label>
              <select
                value={selectedGuild}
                onChange={(e) => setSelectedGuild(e.target.value)}
                className="w-full h-11 px-3 rounded-[6px] bg-khadi border border-clay text-ink text-sm focus:outline-none focus:border-madder"
              >
                {guilds.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ink-soft font-medium mb-1">
                  Your name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Sharma"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full h-11 px-3 rounded-[6px] bg-khadi border border-clay text-ink text-sm focus:outline-none focus:border-madder"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-ink-soft font-medium">
                    Delivery location:
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectGpsLocation}
                    disabled={isLocatingGps}
                    className="inline-flex items-center gap-1.5 text-xs text-madder hover:text-madder-dark font-medium cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    title="Detect precise GPS location from your device"
                  >
                    {isLocatingGps ? (
                      <>
                        <Loader2 size={12} className="animate-spin text-madder" />
                        <span>Locating device…</span>
                      </>
                    ) : (
                      <>
                        <LocateFixed size={13} className="text-madder" />
                        <span>Use device GPS</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft/60">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="City, Country or click 'Use device GPS'"
                    value={destinationCity}
                    onChange={(e) => {
                      setDestinationCity(e.target.value);
                      if (gpsMetadata) setGpsMetadata(null);
                      if (gpsError) setGpsError(null);
                    }}
                    className="w-full h-11 pl-9 pr-10 rounded-[6px] bg-khadi border border-clay text-ink text-sm focus:outline-none focus:border-madder transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleDetectGpsLocation}
                    disabled={isLocatingGps}
                    title="Get precise GPS coordinates"
                    aria-label="Get precise GPS coordinates"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-soft/70 hover:text-madder transition-colors cursor-pointer"
                  >
                    {isLocatingGps ? (
                      <Loader2 size={16} className="animate-spin text-madder" />
                    ) : (
                      <Crosshair size={16} className={gpsMetadata ? 'text-neem' : ''} />
                    )}
                  </button>
                </div>

                {gpsMetadata && (
                  <div className="flex items-center justify-between text-[11px] text-neem font-medium mt-1.5 px-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neem animate-pulse" />
                      Precise GPS locked ({gpsMetadata.coords})
                    </span>
                    <span className="text-ink-soft">
                      ±{Math.round(gpsMetadata.accuracy)}m accuracy
                    </span>
                  </div>
                )}

                {gpsError && (
                  <p role="alert" className="text-[11px] text-madder font-medium mt-1.5 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{gpsError}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-ink-soft font-medium mb-1">
                Target budget (₹):
              </label>
              <input
                type="number"
                required
                value={targetBudgetINR}
                onChange={(e) => setTargetBudgetINR(parseInt(e.target.value, 10) || 0)}
                className="w-full h-11 px-3 rounded-[6px] bg-khadi border border-clay text-ink text-sm tabular-nums focus:outline-none focus:border-madder"
              />
            </div>

            <div>
              <label className="block text-xs text-ink-soft font-medium mb-1">
                Custom requirements & notes:
              </label>
              <textarea
                rows={3}
                required
                placeholder="Specify dimensions, warp/weft preferences, regional motif variations..."
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                className="w-full p-3 rounded-[6px] bg-khadi border border-clay text-ink text-sm resize-none focus:outline-none focus:border-madder"
              />
            </div>

            <div className="p-4 rounded-[4px] bg-khadi border border-clay/70 flex items-start gap-3">
              <ShieldCheck size={18} className="text-neem shrink-0 mt-0.5" />
              <div className="text-xs text-ink-soft leading-relaxed">
                <strong className="text-neem font-semibold">Direct artisan payout:</strong> 100% of material and hourly labour compensation goes directly to the weaver or sculptor upon dispatch, with Milaan's transparent 8% platform fee.
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full h-12 text-sm"
            >
              {isSubmitting ? (
                <span>Submitting request…</span>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  <span>Send commission inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CommissionModal;
