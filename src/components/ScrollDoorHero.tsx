import React, { useRef, useState } from 'react';
import {
  m as motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { useLenis } from '../hooks/useLenis';

export interface ScrollDoorHeroProps {
  onOpenVoiceStudio?: () => void;
  onExploreVault?: () => void;
}

// GSAP power1.inOut equivalent
const power1InOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
// GSAP power2.out equivalent
const power2Out = (t: number) => 1 - Math.pow(1 - t, 2);

export const ScrollDoorHero: React.FC<ScrollDoorHeroProps> = ({ onExploreVault }) => {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  // Scroll progress of the 320vh track, read as a MotionValue — DOM styles
  // update directly on every frame with zero React re-renders.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --- PHASE 1 (0% → 50%): door swing & light bloom ---
  const easedDoor = useTransform(scrollYProgress, [0, 0.5], [0, 1], {
    ease: power1InOut,
  });
  const leftDoorAngle = useTransform(easedDoor, (v) => -105 * v);
  const rightDoorAngle = useTransform(easedDoor, (v) => 105 * v);
  const doorBrightness = useTransform(easedDoor, (v) => 1 - 0.35 * v);
  const doorShadow = useTransform(easedDoor, (v) => Math.min(0.7, v * 0.85));
  const portalScale = useTransform(easedDoor, (v) => 1 + 0.08 * v);
  const lightRayOpacity = useTransform(
    easedDoor,
    (v) => Math.sin(Math.min(1, v * 2) * Math.PI) * 0.9
  );
  const lightRayScaleX = useTransform(easedDoor, (v) => 1 + v * 1.5);
  const doorFilter = useTransform(doorBrightness, (b) => `brightness(${b})`);

  // Scroll hint disappears in the first 10% of the track
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // --- PHASE 2 (45% → 85%): typography & explore CTA ---
  const typographyOpacity = useTransform(scrollYProgress, [0.45, 0.85], [0, 1], {
    ease: power2Out,
  });
  const typographyTranslateY = useTransform(typographyOpacity, (v) => 15 * (1 - v));

  // Pointer events on the overlay flip only when the threshold is crossed
  const [uiLive, setUiLive] = useState(false);
  useMotionValueEvent(typographyOpacity, 'change', (v) => setUiLive(v > 0.3));

  const handleExploreClick = () => {
    if (onExploreVault) {
      onExploreVault();
      return;
    }
    const el =
      document.getElementById('artisan-vault') || document.getElementById('crafts-section');
    if (lenis && el) {
      lenis.scrollTo(el as HTMLElement, {
        offset: -48,
        duration: 1.9,
        easing: power2Out,
      });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-portal"
      className="scroll-container select-none"
      aria-label="Milaan introduction: open the darwaza to the artisan world"
    >
      <div className="sticky-viewport">
        {/* Always-visible wordmark */}
        <div
          className="fixed top-3 left-4 z-[45] pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-display text-lg text-khadi drop-shadow-md">
            Milaan
          </span>
        </div>

        {/* Viewport & aspect-ratio constrained portal stage */}
        <motion.div className="portal-stage" style={{ scale: reduced ? 1 : portalScale }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/images/potter-jharokha.webp"
              alt="Master artisan potter shaping clay on a traditional wheel inside a heritage sanctum"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/90 via-hero-dark/45 to-hero-dark/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-hero-dark/75 via-transparent to-hero-dark/75" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, rgba(227, 167, 31, 0.14) 0%, rgba(178, 58, 46, 0.07) 45%, rgba(12, 9, 7, 0.45) 85%)',
              }}
            />
          </div>

          <div className="door-frame">
            {/* Radiant Central Sunlight Flare emerging through crack */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[75%] pointer-events-none z-[4] blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(245, 240, 230, 0.95) 0%, rgba(227, 167, 31, 0.5) 45%, transparent 75%)',
                opacity: reduced ? 0 : lightRayOpacity,
                scaleX: reduced ? 1 : lightRayScaleX,
              }}
            />

            {/* Dual 3D Doors */}
            <div className="doors-stage doors-wrapper">
              <motion.div
                className="door door-left"
                style={{ rotateY: leftDoorAngle, transformOrigin: 'left center' }}
              >
                <motion.img
                  src="/images/door-left.webp"
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  style={{ filter: doorFilter }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 pointer-events-none"
                  style={{ opacity: doorShadow }}
                />
              </motion.div>

              <motion.div
                className="door door-right"
                style={{ rotateY: rightDoorAngle, transformOrigin: 'right center' }}
              >
                <motion.img
                  src="/images/door-right.webp"
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  style={{ filter: doorFilter }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/20 pointer-events-none"
                  style={{ opacity: doorShadow }}
                />
              </motion.div>
            </div>

            <img
              src="/images/outer-frame.webp"
              className="frame-layer outer-frame"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* 2D HUD layer above the 3D stage */}
        <motion.div
          className="hero-overlay-ui flex flex-col items-center justify-center text-center px-4"
          style={{
            opacity: reduced ? 1 : typographyOpacity,
            y: reduced ? 0 : typographyTranslateY,
            pointerEvents: reduced ? 'auto' : uiLive ? 'auto' : 'none',
          }}
        >
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mt-24">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream leading-tight drop-shadow-xl">
              The hands that made it should be paid for it.
            </h1>
            <p className="font-body text-lg sm:text-xl text-cream/80 max-w-lg leading-relaxed drop-shadow-md">
              Milaan connects India's artisans directly with you.
            </p>
            <button
              onClick={handleExploreClick}
              className="mt-4 px-8 py-3 rounded-md bg-madder text-khadi font-body font-medium transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              See the crafts
            </button>
          </div>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-25 pointer-events-none flex items-center justify-center"
          style={{ opacity: reduced ? 0 : hintOpacity }}
          aria-hidden="true"
        >
          <span className="font-body text-cream/80 text-sm drop-shadow-md">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollDoorHero;
