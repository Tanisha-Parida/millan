import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import ScrollDoorHero from './components/ScrollDoorHero';
import ArtisanVaultGrid, { type CraftItem } from './components/ArtisanVaultGrid';
import GlobalGlobeSection from './components/GlobalGlobeSection';
import Footer from './components/Footer';
import VoiceStudioModal from './components/VoiceStudioModal';
import CommissionModal from './components/CommissionModal';

export default function App() {
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CraftItem[]>([]);
  const [activeCurrency, setActiveCurrency] = useState('INR');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 220);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (item: CraftItem) => {
    setCartItems((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      return [...prev, item];
    });
    setIsCommissionModalOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  const handlePublishListing = (newItem: CraftItem) => {
    setCartItems((prev) => [newItem, ...prev]);
  };

  const scrollToVault = () => {
    const el = document.getElementById('artisan-vault');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0c0907] text-[#FAF7F2] font-sans antialiased overflow-x-clip selection:bg-[#D4AF37]/30 selection:text-[#FAF7F2]">
        
        {/* Floating Utility Navigation Bar (Reveals smoothly when scrolled past hero) */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
            isScrolledPastHero
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <Navbar
            onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCommissionModalOpen(true)}
            activeCurrency={activeCurrency}
            onChangeCurrency={(c) => setActiveCurrency(c)}
          />
        </div>

        {/* Master Single-Page Scroll Sequences */}
        <main className="w-full">
          
          {/* SECTION 1: The Royal Haveli 3D Scroll-Driven Darwaza Door Reveal */}
          <ScrollDoorHero
            onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
            onExploreVault={scrollToVault}
          />

          {/* SECTION 2: The Artisan Vault Discovery Module */}
          <ArtisanVaultGrid
            onAddToCart={handleAddToCart}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCommissionModalOpen(true)}
          />

          {/* SECTION 3: The Global Trade Corridor & India Living Craft Constellation */}
          <GlobalGlobeSection
            onOpenCommissionModal={() => setIsCommissionModalOpen(true)}
            onExploreVault={scrollToVault}
          />

        </main>

        {/* SECTION 4 / MODALS: Zero-Literacy Voice Studio Simulator */}
        <VoiceStudioModal
          isOpen={isVoiceStudioOpen}
          onClose={() => setIsVoiceStudioOpen(false)}
          onPublishListing={handlePublishListing}
        />

        {/* BESPOKE CRAFT COMMISSION & ESCROW MODAL */}
        <CommissionModal
          isOpen={isCommissionModalOpen}
          onClose={() => setIsCommissionModalOpen(false)}
          cartItems={cartItems}
          onRemoveCartItem={handleRemoveCartItem}
        />

        {/* Master Luxury Footer */}
        <Footer />

      </div>
    </SmoothScroll>
  );
}
