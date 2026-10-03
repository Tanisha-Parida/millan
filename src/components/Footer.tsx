import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="charter"
      className="relative w-full bg-indigo border-t border-khadi/20 pt-16 pb-12 px-6 sm:px-12 select-none overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-khadi">
                Milaan
              </span>
            </div>
            <div className="font-body italic text-base text-khadi/90">
              Where timeless Indian craft meets the modern marketplace.
            </div>
            <p className="text-base text-khadi/80 font-body leading-relaxed max-w-md">
              Milaan connects India's master craftspeople directly with buyers around the world.
              Fair prices set by the artisans themselves, payments held in escrow until your piece
              ships, and no marketplace markups in between.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-body text-sm text-khadi font-semibold">
              Links
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-khadi/80 font-body">
              <a href="#hero-portal" className="hover:text-khadi transition-colors">Home</a>
              <a href="#artisan-vault" className="hover:text-khadi transition-colors">Crafts</a>
              <a href="#global-trade" className="hover:text-khadi transition-colors">Map</a>
              <a href="#" className="hover:text-khadi transition-colors">Voice studio</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-body text-sm text-khadi font-semibold">
              Contact
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-khadi/80 font-body">
              <p>Team Milaan</p>
              <p>hello@milaan.example.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-khadi/15 text-sm font-body text-khadi/80">
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
