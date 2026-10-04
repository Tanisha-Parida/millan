import React, { useRef, useState } from 'react';
import {
  m as motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';
import JharokhaArches from './ornament/JharokhaArches';

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

  // --- PHASE 2: typography fade starts at 35% and completes by 60% when doors finish opening ---
  const typographyOpacity = useTransform(scrollYProgress, [0.35, 0.60], [0, 1], {
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
      className="scroll-container select-none relative"
      aria-label="Milaan introduction: open the darwaza to the artisan world"
    >
      <div className="sticky-viewport">
        {/* Top-left Wordmark: aligned to the container grid margin, 24px from top */}
        <div
          className="fixed top-6 left-[clamp(20px,5vw,64px)] z-[45] pointer-events-none flex items-baseline gap-1.5"
          aria-hidden="true"
        >
          <span className="font-display text-2xl font-bold text-bone drop-shadow-md">
            Milaan
          </span>
          <span className="font-heading text-sm text-bone/80 drop-shadow-sm">
            मिलान
          </span>
        </div>

        {/* Viewport & aspect-ratio constrained portal stage */}
        <motion.div className="portal-stage" style={{ scale: reduced ? 1 : portalScale }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/images/potter-jharokha.webp"
              alt="Master artisan potter shaping clay on a traditional wheel inside a heritage sanctum"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />

            {/* Light grain overlay to conceal scaling softness on wide screens */}
            <div
              className="absolute inset-0 pointer-events-none z-[1] opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hg)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Seamless feathered atmospheric overlays — softly curved, no hard box edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-vat/90 via-vat/35 to-vat/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-vat/70 via-transparent to-vat/70 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(217, 162, 27, 0.12) 0%, rgba(168, 64, 47, 0.08) 50%, rgba(20, 26, 59, 0.5) 85%)',
              }}
            />
          </div>

          <div className="door-frame">
            {/* Radiant Central Sunlight Flare emerging through crack */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[75%] pointer-events-none z-[4] blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255, 247, 232, 0.95) 0%, rgba(217, 162, 27, 0.5) 45%, transparent 75%)',
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
                  width={512}
                  height={1024}
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
                  width={512}
                  height={1024}
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
              width={1024}
              height={1024}
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
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mt-16 relative px-6 py-8">
            {/* Soft radial scrim behind the text for contrast without looking like a box */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse closest-side at center, rgba(20, 26, 59, 0.72) 0%, rgba(20, 26, 59, 0.4) 60%, transparent 100%)',
                filter: 'blur(20px)',
              }}
            />

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone leading-[1.08] drop-shadow-lg max-w-xl">
              The hands that made it should be paid for it.
            </h1>
            <p className="font-body text-lg sm:text-xl text-bone/90 max-w-lg leading-relaxed drop-shadow-sm">
              Milaan connects India's artisans directly with you.
            </p>
            <button
              onClick={handleExploreClick}
              className="mt-2 h-12 px-8 rounded-[6px] bg-madder hover:bg-madder-dark text-bone font-medium text-base transition-colors cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-2 flex items-center justify-center"
            >
              See the crafts
            </button>
          </div>
        </motion.div>

        {/* Scroll prompt: 14px, bone colour, full opacity, small chevron */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-25 pointer-events-none flex items-center justify-center"
          style={{ opacity: reduced ? 0 : hintOpacity }}
          aria-hidden="true"
        >
          <span className="font-body text-bone text-[14px] leading-none drop-shadow-md flex items-center gap-1.5 font-normal">
            Scroll
            <ChevronDown size={14} className="text-bone inline" />
          </span>
        </motion.div>

        {/* Bottom of hero: scallops in the khadi colour rising into the image */}
        <JharokhaArches
          direction="up"
          fillColor="var(--color-khadi)"
          bgColor="transparent"
          height={32}
          className="absolute bottom-0 left-0 right-0 z-30"
        />
      </div>
    </section>
  );
};

export default ScrollDoorHero;
