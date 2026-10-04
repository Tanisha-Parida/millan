import React from 'react';
import { TEAM_EMAIL, HACKATHON_NAME } from '../config';

export const Footer: React.FC = () => {
  return (
    <footer
      id="charter"
      className="relative w-full bg-vat text-bone select-none overflow-hidden text-left"
    >

      {/* Faint Jaali Perforated Lattice Pattern (4% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23FFF7E8' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='4' fill='none' stroke='%23FFF7E8' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="site-container pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-bone/15">
          {/* Left Column: Wordmark + Dual Language Tagline + Mission */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-bone">
                Milaan
              </span>
              <span className="font-heading text-lg text-bone/80">
                मिलान
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-lg text-bone font-medium">
                हर हाथ का हुनर, हर बाज़ार तक
              </div>
              <div className="font-body text-sm text-bone/80">
                Every hand's skill, to every market
              </div>
            </div>

            <p className="text-sm text-bone/75 font-body leading-relaxed max-w-md pt-2">
              Milaan is a prototype that helps artisans list, price and sell their work by speaking in their own language.
            </p>
          </div>

          {/* Center Column: Verified Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-base text-bone font-semibold">
              Explore
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-bone/80 font-body">
              <a href="#hero-portal" className="hover:text-bone transition-colors">Home</a>
              <a href="#how-it-works" className="hover:text-bone transition-colors">How one craft reaches you</a>
              <a href="#who-keeps-the-money" className="hover:text-bone transition-colors">Who keeps the money</a>
              <a href="#fair-price" className="hover:text-bone transition-colors">Fair price calculator</a>
              <a href="#artisan-vault" className="hover:text-bone transition-colors">Crafts</a>
              <a href="#craft-map" className="hover:text-bone transition-colors">Craft map</a>
            </div>
          </div>

          {/* Right Column: Contact & Project Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-base text-bone font-semibold">
              About the project
            </h4>
            <div className="space-y-2 text-sm text-bone/80 font-body">
              <p>Milaan Artisan Initiative</p>
              {HACKATHON_NAME && (
                <p className="text-bone/70">
                  Built by Team Milaan for {HACKATHON_NAME}
                </p>
              )}
              {TEAM_EMAIL && (
                <p>
                  <a
                    href={`mailto:${TEAM_EMAIL}`}
                    className="text-bone hover:underline"
                  >
                    {TEAM_EMAIL}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-body text-bone/60">
          <div>
            This is a prototype. Prices, people and payments shown are examples.
          </div>
          <div>
            &copy; {new Date().getFullYear()} Milaan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
