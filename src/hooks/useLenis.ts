import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

/**
 * Holds the active Lenis instance (null when the user prefers reduced motion
 * and native scrolling is used instead). Consumers must treat it as nullable.
 */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
