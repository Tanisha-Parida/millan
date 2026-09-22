import React, { useState } from 'react';
import {
  ShoppingBag,
  Mic,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenVoiceStudio: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeCurrency?: string;
  onChangeCurrency?: (c: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVoiceStudio,
  cartCount = 0,
  onOpenCart,
  activeCurrency = 'INR',
  onChangeCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = [
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Top Heritage Micro-Ticker (Conforming to Image 2 header) */}
      <div className="w-full bg-[#0d0a08] border-b border-[#D4AF37]/15 py-1 px-4 text-center text-[10px] tracking-widest text-[#FAF7F2]/65 font-telemetry flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#58D68D]" />
          <span>ONDC BECKN v2 LIVE</span>
        </div>
        <div className="mx-auto">
          We are heritage for 100% OF | GREEN FREE Handloom & Privacy Policy
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#D4AF37]">
          <span>DIRECT ARTISAN DBT: 91.4%</span>
        </div>
      </div>

      {/* Main Luxury Glass Navigation Bar */}
      <div className="obsidian-glass-heavy border-b border-[#D4AF37]/20 px-4 sm:px-8 py-3.5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Motto (Matching Image 2) */}
          <a href="#hero-gate" className="flex flex-col group text-left">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors">
                MILAAN
              </span>
              <Sparkles size={14} className="text-[#D4AF37] group-hover:rotate-45 transition-transform" />
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-telemetry text-[#D4AF37] -mt-0.5">
              PEOPLE • CRAFTS • CULTURE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider text-[#FAF7F2]/80">
            <a href="#hero-gate" className="hover:text-[#D4AF37] transition-colors">
              Home
            </a>
            <a href="#artisan-vault" className="hover:text-[#D4AF37] transition-colors">
              Artisan
            </a>
            <a href="#global-trade" className="hover:text-[#D4AF37] transition-colors">
              Global Trade
            </a>
            <a href="#artisan-vault" className="hover:text-[#D4AF37] transition-colors">
              Collections
            </a>
            <a href="#charter" className="hover:text-[#D4AF37] transition-colors">
              About
            </a>
          </nav>

          {/* Right Action Icons & "Speak to Native" CTA Button */}
          <div className="flex items-center gap-3">
            
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl bg-[#1d1710] border border-[#D4AF37]/25 text-[11px] font-telemetry text-[#D4AF37] flex items-center gap-1 hover:bg-[#D4AF37]/15"
              >
                <span>{activeCurrency}</span>
                <ChevronDown size={12} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[#140f0a] border border-[#D4AF37]/30 shadow-2xl py-1 z-50">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onChangeCurrency?.(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#FAF7F2]/80 hover:bg-[#D4AF37]/20 hover:text-white flex items-center justify-between"
                    >
                      <span>{c.code}</span>
                      <span className="text-[#D4AF37] font-telemetry">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-xl bg-[#1d1710] border border-[#D4AF37]/25 text-[#FAF7F2]/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors relative"
              title="Cart / Commission Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C85A32] text-white text-[10px] font-telemetry flex items-center justify-center font-bold shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* "Speak to Native" Golden Pill CTA (Matching Image 2) */}
            <button
              onClick={onOpenVoiceStudio}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] font-medium text-xs shadow-md shadow-[#D4AF37]/20 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <Mic size={14} className="text-[#060709]" />
              <span className="font-semibold">Speak to Native</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#1d1710] border border-[#D4AF37]/25 text-[#FAF7F2]/80 lg:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-[#D4AF37]/15 mt-3 space-y-2">
            <a
              href="#hero-gate"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#FAF7F2]/80 hover:text-[#D4AF37]"
            >
              Home
            </a>
            <a
              href="#artisan-vault"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#FAF7F2]/80 hover:text-[#D4AF37]"
            >
              Artisan Vault
            </a>
            <a
              href="#global-trade"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#FAF7F2]/80 hover:text-[#D4AF37]"
            >
              Global Trade Corridor
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoiceStudio();
              }}
              className="w-full mt-3 py-2.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Mic size={15} />
              <span>Launch Voice Studio</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
