import { createContext, useContext } from 'react';
import type Lenis from '@studio-freight/lenis';
import type { LenisScrollEvent } from '@studio-freight/lenis';

export interface LenisContextType {
  lenis: Lenis | null;
  scrollInfo: LenisScrollEvent;
}

export const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollInfo: { scroll: 0, limit: 0, velocity: 0, direction: 1, progress: 0 },
});

export const useLenis = () => useContext(LenisContext);
export default useLenis;
