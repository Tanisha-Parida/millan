import React, { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '../hooks/useLenis';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Real Lenis inertia scrolling driven by its built-in autoRaf.
 * No per-frame React state.
 */
export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true });
    // Publishing the externally-created Lenis instance to context is the point of this component.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // Smooth-jump internal anchors through Lenis
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        instance.scrollTo(el as HTMLElement, { offset: -72 });
      }
    };
    document.addEventListener('click', onAnchor);

    // Initial hash navigation
    if (window.location.hash) {
      setTimeout(() => {
        const initialEl = document.querySelector(window.location.hash);
        if (initialEl) {
          instance.scrollTo(initialEl as HTMLElement, { offset: -72, immediate: true });
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('click', onAnchor);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export default SmoothScroll;
