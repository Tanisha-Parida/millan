import React, { Suspense, lazy } from 'react';
import JharokhaArches from './ornament/JharokhaArches';

const IndiaInteractiveMap = lazy(() => import('./IndiaInteractiveMap'));

export const GlobalGlobeSection: React.FC = () => {
  return (
    <section
      id="craft-map"
      className="relative w-full bg-vat text-bone select-none overflow-hidden"
      aria-label="Indian craft map and regional dossiers"
    >
      {/* Top Seam: Jharokha Arch Row from Khadi into Vat */}
      <JharokhaArches
        direction="down"
        fillColor="var(--color-khadi)"
        bgColor="var(--color-vat)"
        height={24}
        className="w-full"
      />

      <div className="site-container section-padding relative z-10">
        <div className="max-w-2xl mb-12 text-left">
          <h2 className="font-heading text-3xl sm:text-4xl text-bone font-normal leading-tight">
            Craft map
          </h2>
          <p className="text-base sm:text-lg text-bone/80 mt-2 font-body leading-relaxed">
            Tap a state to see the crafts it is known for and the makers we have listed.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="w-full h-96 flex items-center justify-center text-bone/60 font-body text-base">
              Loading craft map...
            </div>
          }
        >
          <IndiaInteractiveMap />
        </Suspense>
      </div>

      {/* Bottom Seam: Jharokha Arch Row from Vat into Khadi */}
      <JharokhaArches
        direction="up"
        fillColor="var(--color-khadi)"
        bgColor="var(--color-vat)"
        height={24}
        className="w-full"
      />
    </section>
  );
};

export default GlobalGlobeSection;
