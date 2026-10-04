import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { type CurrencyCode } from '../lib/currency';

interface NavbarProps {
  onOpenVoiceStudio: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeCurrency?: CurrencyCode;
  onChangeCurrency?: (c: CurrencyCode) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVoiceStudio,
  cartCount = 0,
  onOpenCart,
  activeCurrency = 'INR',
  onChangeCurrency,
  activeSection = 'hero-portal',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyContainerRef = useRef<HTMLDivElement>(null);

  const currencies: { code: CurrencyCode; symbol: string; label: string }[] = [
    { code: 'INR', symbol: '₹', label: 'Indian rupee' },
    { code: 'USD', symbol: '$', label: 'US dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British pound' },
    { code: 'JPY', symbol: '¥', label: 'Japanese yen' },
  ];

  useEffect(() => {
    if (!currencyDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        currencyContainerRef.current &&
        !currencyContainerRef.current.contains(e.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCurrencyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currencyDropdownOpen]);

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      <div className="h-[72px] bg-khadi/90 backdrop-blur-[10px] border-b border-clay flex items-center">
        <div className="site-container flex items-center justify-between gap-4">
          {/* Brand Wordmark: Rozha One + Devanagari मिलान + 8-point star */}
          <a
            href="#hero-portal"
            className="flex items-center gap-2 text-left group"
            aria-label="Milaan home"
          >
            {/* 8-point star craft mark */}
            <svg
              className="w-5 h-5 text-madder shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="12,2 14.5,8.5 21,7 16.5,12 21,17 14.5,15.5 12,22 9.5,15.5 3,17 7.5,12 3,7 9.5,8.5" />
            </svg>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-bold text-ink tracking-normal">
                Milaan
              </span>
              <span className="font-heading text-sm text-ink-soft">
                मिलान
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink"
            aria-label="Main navigation"
          >
            <a
              href="#hero-portal"
              aria-current={activeSection === 'hero-portal' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'hero-portal'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Home
            </a>
            <a
              href="#how-it-works"
              aria-current={activeSection === 'how-it-works' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'how-it-works'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              How it reaches you
            </a>
            <a
              href="#fair-price"
              aria-current={activeSection === 'fair-price' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'fair-price'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Fair pricing
            </a>
            <a
              href="#artisan-vault"
              aria-current={activeSection === 'artisan-vault' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'artisan-vault'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Crafts
            </a>
            <a
              href="#craft-map"
              aria-current={activeSection === 'craft-map' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'craft-map'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Map
            </a>
            <a
              href="#charter"
              aria-current={activeSection === 'charter' ? 'page' : undefined}
              className={`transition-colors py-1 relative ${
                activeSection === 'charter'
                  ? 'text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-madder'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              About
            </a>
          </nav>

          {/* Utility controls: currency dropdown, shopping bag, list button */}
          <div className="flex items-center gap-3">
            {/* Currency selector (40-44px hit area, 6px radius, ghost with clay border) */}
            <div className="relative" ref={currencyContainerRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="h-10 min-w-[44px] px-3 rounded-[6px] bg-parchment/60 border border-clay text-sm text-ink flex items-center gap-1.5 hover:bg-parchment transition-colors"
                aria-label={`Select currency, current is ${activeCurrency}`}
                aria-expanded={currencyDropdownOpen}
                aria-haspopup="listbox"
              >
                <span className="font-medium">{activeCurrency}</span>
                <ChevronDown size={14} className="text-ink-soft" aria-hidden="true" />
              </button>

              {currencyDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Available currencies"
                  className="absolute right-0 mt-2 w-40 rounded-[6px] bg-parchment border border-clay shadow-md py-1 z-50"
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={activeCurrency === c.code}
                      onClick={() => {
                        onChangeCurrency?.(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors ${
                        activeCurrency === c.code
                          ? 'bg-khadi font-semibold text-ink'
                          : 'text-ink hover:bg-khadi/60'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-ink-soft">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bag button (40px hit area, 6px radius, ghost with clay border) */}
            <button
              type="button"
              onClick={onOpenCart}
              className="h-10 w-10 flex items-center justify-center rounded-[6px] bg-parchment/60 border border-clay text-ink hover:bg-parchment transition-colors relative"
              title="View shopping bag"
              aria-label={`Shopping bag containing ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-madder text-bone text-xs font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* List a craft CTA (40-44px hit area, 6px radius, solid madder) */}
            <button
              type="button"
              onClick={onOpenVoiceStudio}
              aria-label="List a craft"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-[6px] bg-madder hover:bg-madder-dark text-bone font-medium text-sm transition-colors cursor-pointer"
            >
              List a craft
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-[6px] bg-parchment/60 border border-clay text-ink lg:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden bg-parchment border-b border-clay px-6 py-4 space-y-3"
          aria-label="Mobile navigation"
        >
          <a
            href="#hero-portal"
            aria-current={activeSection === 'hero-portal' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'hero-portal' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            Home
          </a>
          <a
            href="#how-it-works"
            aria-current={activeSection === 'how-it-works' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'how-it-works' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            How it reaches you
          </a>
          <a
            href="#fair-price"
            aria-current={activeSection === 'fair-price' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'fair-price' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            Fair pricing
          </a>
          <a
            href="#artisan-vault"
            aria-current={activeSection === 'artisan-vault' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'artisan-vault' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            Crafts
          </a>
          <a
            href="#craft-map"
            aria-current={activeSection === 'craft-map' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'craft-map' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            Map
          </a>
          <a
            href="#charter"
            aria-current={activeSection === 'charter' ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1.5 text-base transition-colors ${
              activeSection === 'charter' ? 'text-madder font-semibold' : 'text-ink hover:text-madder'
            }`}
          >
            About
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVoiceStudio();
            }}
            className="w-full mt-2 h-11 rounded-[6px] bg-madder hover:bg-madder-dark text-bone font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            List a craft
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
