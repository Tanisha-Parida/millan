import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis, { type LenisScrollEvent } from '@studio-freight/lenis';
import { LenisContext } from '../hooks/useLenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollInfo, setScrollInfo] = useState<LenisScrollEvent>({
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: 1,
    progress: 0,
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll with luxury inertia physics
    const instance = new Lenis({
      lerp: 0.08, // Buttery smooth response
      smoothWheel: true,
      duration: 1.2,
    });

    lenisRef.current = instance;
    setLenis(instance);

    const unsubscribe = instance.on('scroll', (e: LenisScrollEvent) => {
      setScrollInfo(e);
    });

    // Intercept internal hash links for smooth jumping
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const hash = anchor.getAttribute('href');
        if (hash && hash !== '#') {
          e.preventDefault();
          instance.scrollTo(hash, { offset: -60 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      unsubscribe();
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollInfo }}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
