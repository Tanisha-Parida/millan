import React, { Suspense, lazy } from 'react';
import { m } from 'framer-motion';

const IndiaInteractiveMap = lazy(() => import('./IndiaInteractiveMap'));

export const GlobalGlobeSection: React.FC = () => {
  return (
    <section
      id="craft-map"
      className="relative w-full py-20 px-4 sm:px-8 bg-khadi overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-10 space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl text-indigo font-semibold">
            Craft map
          </h2>
          <p className="text-lg text-kiln font-body leading-relaxed">
            Direct, decentralized commerce seamlessly connecting India's rural master ateliers with curated corridors across the world.
          </p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center text-kiln font-body text-lg">
                Loading map...
              </div>
            }
          >
            <IndiaInteractiveMap />
          </Suspense>
        </m.div>
      </div>
    </section>
  );
};

export default GlobalGlobeSection;
