import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import ErrorBoundary from './components/ErrorBoundary';
import { type CurrencyCode } from './lib/currency';
import Navbar from './components/Navbar';
import ScrollDoorHero from './components/ScrollDoorHero';
import OneMakerSection from './components/OneMakerSection';
import ProblemSection from './components/ProblemSection';
import ArtisanVaultGrid, { type CraftItem } from './components/ArtisanVaultGrid';
import GlobalGlobeSection from './components/GlobalGlobeSection';
import FairPriceCalculator from './components/FairPriceCalculator';
import Footer from './components/Footer';

// Lazy-load heavier modals so their code and dependencies are split
const VoiceStudioModal = lazy(() => import('./components/VoiceStudioModal'));
const CommissionModal = lazy(() => import('./components/CommissionModal'));

// ─── localStorage helpers ────────────────────────────────────────────────────

function loadCartIds(): string[] {
  try {
    const raw = localStorage.getItem('milaan-cart-ids');
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')) {
      return parsed as string[];
    }
    // Migrate from old format (full objects)
    const oldRaw = localStorage.getItem('milaan-cart');
    if (oldRaw) {
      const old: unknown = JSON.parse(oldRaw);
      if (Array.isArray(old)) {
        const ids = (old as { id?: unknown }[]).flatMap((x) =>
          typeof x?.id === 'string' ? [x.id] : []
        );
        localStorage.removeItem('milaan-cart');
        return ids;
      }
    }
  } catch {
    /* ignore */
  }
  return [];
}

// ─── toast state ─────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  title: string;
}

let toastIdSeq = 0;

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>('INR');

  // Voice-published items only exist in session; they are also catalogued by id.
  const [publishedItems, setPublishedItems] = useState<CraftItem[]>([]);

  // Cart stores only ids; hydrated on render inside the modal.
  const [cartIds, setCartIds] = useState<string[]>(loadCartIds);

  // Persist cart ids whenever they change.
  useEffect(() => {
    localStorage.setItem('milaan-cart-ids', JSON.stringify(cartIds));
  }, [cartIds]);

  // ── active-section & hero-visibility via IntersectionObserver ────────────────
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-portal');
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    const hero = document.getElementById('hero-portal');
    if (!hero) return;
    heroRef.current = hero;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolledPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80% 0px' }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Track active section for navbar aria-current
  useEffect(() => {
    const sectionIds = ['hero-portal', 'artisan-vault', 'craft-map', 'footer'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── toast queue ─────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string) => {
      const id = ++toastIdSeq;
      setToasts((prev) => [...prev, { id, title }]);
      setTimeout(() => dismissToast(id), 4000);
    },
    [dismissToast]
  );

  // Escape closes any active toast
  useEffect(() => {
    if (toasts.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setToasts([]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toasts.length]);

  // ── cart handlers ────────────────────────────────────────────────────────────
  const handleAddToCart = useCallback(
    (item: CraftItem) => {
      setCartIds((prev) => {
        if (prev.includes(item.id)) return prev;
        showToast(item.title);
        return [...prev, item.id];
      });
      // Modal does NOT open here — user opens it via the bag icon.
    },
    [showToast]
  );

  const handleRemoveCartItem = useCallback((id: string) => {
    setCartIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const handlePublishListing = useCallback((newItem: CraftItem) => {
    setPublishedItems((prev) => [newItem, ...prev]);
    setCartIds((prev) => (prev.includes(newItem.id) ? prev : [newItem.id, ...prev]));
  }, []);

  const scrollToVault = useCallback(() => {
    const el = document.getElementById('artisan-vault');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ErrorBoundary>
      <LazyMotion features={domAnimation}>
        <SmoothScroll>
          <a
            href="#artisan-vault"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-madder focus:text-khadi focus:font-bold focus:rounded focus:shadow-md focus:outline-none"
          >
            Skip to content
          </a>

          <div className="relative min-h-screen font-body antialiased overflow-x-clip paper-grain">
            <div
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
                isScrolledPastHero
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`}
            >
              <Navbar
                onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
                cartCount={cartIds.length}
                onOpenCart={() => setIsCommissionModalOpen(true)}
                activeCurrency={activeCurrency}
                onChangeCurrency={(c) => setActiveCurrency(c)}
                activeSection={activeSection}
              />
            </div>

            <main className="w-full">
              <ScrollDoorHero
                onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
                onExploreVault={scrollToVault}
              />

              <OneMakerSection />
              <ProblemSection />

              <ArtisanVaultGrid
                onAddToCart={handleAddToCart}
                cartCount={cartIds.length}
                onOpenCart={() => setIsCommissionModalOpen(true)}
                activeCurrency={activeCurrency}
              />
              <GlobalGlobeSection />

              <FairPriceCalculator />
            </main>

            <Suspense fallback={null}>
              <VoiceStudioModal
                isOpen={isVoiceStudioOpen}
                onClose={() => setIsVoiceStudioOpen(false)}
                onPublishListing={handlePublishListing}
              />
            </Suspense>

            <Suspense fallback={null}>
              <CommissionModal
                isOpen={isCommissionModalOpen}
                onClose={() => setIsCommissionModalOpen(false)}
                cartIds={cartIds}
                publishedItems={publishedItems}
                onRemoveCartItem={handleRemoveCartItem}
                activeCurrency={activeCurrency}
              />
            </Suspense>

            <Footer />

            <div
              className="fixed bottom-6 right-4 z-[60] flex flex-col gap-2 items-end pointer-events-none"
              aria-live="polite"
              aria-label="Notifications"
            >
              {toasts.map((toast) => (
                <div
                  key={toast.id}
                  className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded bg-indigo border border-kiln/30 shadow-md text-sm text-khadi max-w-xs animate-slide-in-right"
                >
                  <span className="w-2 h-2 rounded-full bg-neem shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-khadi text-xs leading-snug truncate">
                      Added to your bag
                    </p>
                    <p className="text-[13px] text-khadi/80 truncate">{toast.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCommissionModalOpen(true)}
                    className="shrink-0 text-[13px] font-body font-bold text-khadi hover:text-khadi/80 transition-colors whitespace-nowrap"
                  >
                    View bag
                  </button>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    className="shrink-0 text-khadi/60 hover:text-khadi transition-colors text-xs leading-none"
                    aria-label="Dismiss notification"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SmoothScroll>
      </LazyMotion>
    </ErrorBoundary>
  );
}
