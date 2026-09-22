'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import GateHeroSection from '@/components/GateHeroSection';
import ArtisanVaultGrid, { type CraftItem } from '@/components/ArtisanVaultGrid';
import GlobalGlobeSection from '@/components/GlobalGlobeSection';
import ScrubCanvasSequence from '@/components/ScrubCanvasSequence';
import Footer from '@/components/Footer';
import VoiceStudioModal from '@/components/VoiceStudioModal';
import CommissionModal from '@/components/CommissionModal';

export default function Page() {
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CraftItem[]>([]);
  const [activeCurrency, setActiveCurrency] = useState('INR');

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
      <div className="relative min-h-screen bg-[#060709] text-[#FAF7F2] font-sans antialiased overflow-x-clip selection:bg-[#D4AF37]/30 selection:text-[#FAF7F2]">
        
        {/* Top Luxury Navigation Bar */}
        <Navbar
          onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCommissionModalOpen(true)}
          activeCurrency={activeCurrency}
          onChangeCurrency={(c) => setActiveCurrency(c)}
        />

        {/* Master Single-Page Scroll Sequences */}
        <main className="w-full">
          
          {/* SECTION 1: The Royal Heritage Gate Reveal (200vh sticky scroll) */}
          <GateHeroSection
            onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
            onExploreVault={scrollToVault}
          />

          {/* SECTION 2: The Artisan Vault (iPad Device Mockup & Living Label) */}
          <ArtisanVaultGrid
            onAddToCart={handleAddToCart}
          />

          {/* SECTION 3: The Global Export HUD & 360 Spinning Globe (Jesko-Jets parallax) */}
          <GlobalGlobeSection
            onOpenCommissionModal={() => setIsCommissionModalOpen(true)}
          />

          {/* HARDWARE ACCELERATED FRAME SEQUENCER STUDIO */}
          <section id="canvas-studio" className="relative w-full py-16 px-4 bg-[#08090c] border-y border-[#D4AF37]/15">
            <div className="max-w-6xl mx-auto text-center space-y-3 mb-8">
              <span className="text-xs font-telemetry uppercase text-[#D4AF37] tracking-widest">
                PRECISION FRAME SEQUENCE SCRUBBER
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F2]">
                Micro-Inspection & Kinetic Portal Studio
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/65 max-w-xl mx-auto font-sans">
                Drag the timeline scrubber to examine 120-frame cinematic physical transformations: 
                Temple Jharokha parting doors, clay to 24k gold urn metamorphosis, and warp/weft handloom tension.
              </p>
            </div>

            <ScrubCanvasSequence initialSequence="door" />
          </section>

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
