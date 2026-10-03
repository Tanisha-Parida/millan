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
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
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
      <div className="bg-indigo border-b border-khadi/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a
            href="#hero-portal"
            className="flex flex-col group text-left"
            aria-label="Milaan"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl font-bold text-khadi group-hover:text-khadi/80 transition-colors">
                Milaan
              </span>
            </div>
            <span className="text-[13px] font-body text-khadi/80 -mt-0.5">
              Maker's story
            </span>
          </a>

          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-khadi/80"
            aria-label="Main navigation"
          >
            <a
              href="#hero-portal"
              aria-current={activeSection === 'hero-portal' ? 'page' : undefined}
              className={`transition-colors py-1 ${
                activeSection === 'hero-portal'
                  ? 'text-khadi font-semibold border-b-2 border-madder'
                  : 'hover:text-khadi'
              }`}
            >
              Home
            </a>
            <a
              href="#artisan-vault"
              aria-current={activeSection === 'artisan-vault' ? 'page' : undefined}
              className={`transition-colors py-1 ${
                activeSection === 'artisan-vault'
                  ? 'text-khadi font-semibold border-b-2 border-madder'
                  : 'hover:text-khadi'
              }`}
            >
              Crafts
            </a>
            <a
              href="#craft-map"
              aria-current={activeSection === 'craft-map' ? 'page' : undefined}
              className={`transition-colors py-1 ${
                activeSection === 'craft-map'
                  ? 'text-khadi font-semibold border-b-2 border-madder'
                  : 'hover:text-khadi'
              }`}
            >
              Map
            </a>
            <a
              href="#footer"
              aria-current={activeSection === 'footer' ? 'page' : undefined}
              className={`transition-colors py-1 ${
                activeSection === 'footer'
                  ? 'text-khadi font-semibold border-b-2 border-madder'
                  : 'hover:text-khadi'
              }`}
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative" ref={currencyContainerRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1.5 rounded bg-indigo border border-khadi/25 text-[13px] font-body text-khadi flex items-center gap-1 hover:bg-khadi/10 transition-colors"
                aria-label={`Select currency, current is ${activeCurrency}`}
                aria-expanded={currencyDropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{activeCurrency}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              {currencyDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Available currencies"
                  className="absolute right-0 mt-2 w-36 rounded bg-indigo border border-khadi/30 shadow-md py-1 z-50"
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
                          ? 'bg-khadi/20 text-khadi font-semibold'
                          : 'text-khadi/80 hover:bg-khadi/10 hover:text-khadi'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-khadi font-body">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="p-2 rounded bg-indigo border border-khadi/25 text-khadi/80 hover:text-khadi hover:border-khadi/50 transition-colors relative"
              title="Add to bag"
              aria-label={`Shopping bag containing ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-madder text-khadi text-[13px] font-body flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenVoiceStudio}
              aria-label="List a craft"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded bg-madder text-khadi font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <span className="font-semibold">List a craft</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-indigo border border-khadi/25 text-khadi/80 lg:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            className="lg:hidden pt-4 pb-2 border-t border-khadi/15 mt-3 space-y-2"
            aria-label="Mobile navigation"
          >
            <a
              href="#hero-portal"
              aria-current={activeSection === 'hero-portal' ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base transition-colors ${
                activeSection === 'hero-portal'
                  ? 'text-khadi font-semibold'
                  : 'text-khadi/80 hover:text-khadi'
              }`}
            >
              Home
            </a>
            <a
              href="#artisan-vault"
              aria-current={activeSection === 'artisan-vault' ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base transition-colors ${
                activeSection === 'artisan-vault'
                  ? 'text-khadi font-semibold'
                  : 'text-khadi/80 hover:text-khadi'
              }`}
            >
              Crafts
            </a>
            <a
              href="#craft-map"
              aria-current={activeSection === 'craft-map' ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base transition-colors ${
                activeSection === 'craft-map'
                  ? 'text-khadi font-semibold'
                  : 'text-khadi/80 hover:text-khadi'
              }`}
            >
              Map
            </a>
            <a
              href="#footer"
              aria-current={activeSection === 'footer' ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base transition-colors ${
                activeSection === 'footer'
                  ? 'text-khadi font-semibold'
                  : 'text-khadi/80 hover:text-khadi'
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
              className="w-full mt-3 py-2.5 rounded bg-madder text-khadi font-semibold text-sm flex items-center justify-center gap-2"
            >
              <span>List a craft</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
