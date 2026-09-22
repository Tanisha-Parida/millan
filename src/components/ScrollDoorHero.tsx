import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Mic, Search, Compass } from '../lib/lucide-react';
import { useLenis } from '../hooks/useLenis';

export interface ScrollDoorHeroProps {
  onOpenVoiceStudio?: () => void;
  onExploreVault?: () => void;
}

// Ornate Indian Block Print Floral Motif SVG
const BlockPrintIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#dfb775] shrink-0"
  >
    <path
      d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5L16 2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    <path
      d="M6 6L11 11M26 6L21 11M6 26L11 21M26 26L21 21"
      stroke="currentColor"
      strokeWidth="0.9"
    />
  </svg>
);

export const ScrollDoorHero: React.FC<ScrollDoorHeroProps> = ({
  onOpenVoiceStudio,
  onExploreVault,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [manualVal, setManualVal] = useState(0);
  const [isOpeningAnimationRunning, setIsOpeningAnimationRunning] = useState(false);

  const { scrollInfo, lenis } = useLenis();

  // Scroll tracking through the 320vh track
  useEffect(() => {
    if (isManualOverride) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollInfo, isManualOverride]);

  const activeProgress = isManualOverride ? manualVal : scrollProgress;

  // Exact GSAP power1.inOut easing function
  const power1InOut = (t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // =========================================================
  // TWO-STAGE SCROLL TIMELINE (0% to 50%, then 45% to 85%)
  // =========================================================

  // --- PHASE 1 (0% to 50% scroll): Door Swing & Light Bloom ---
  const doorPhase = Math.min(1, Math.max(0, activeProgress / 0.50));
  const easedDoor = power1InOut(doorPhase);

  // Exact 3D swing rotation in degrees (rotating strictly on outer hinges inward)
  const leftDoorAngle = -105 * easedDoor;
  const rightDoorAngle = 105 * easedDoor;

  // Subtle dark shading during the swing (brightness scales smoothly from 1.0 down to 0.65)
  const doorBrightness = 1.0 - 0.35 * easedDoor;

  // Dynamic shadow overlay simulating light falling away
  const doorShadow = Math.min(0.70, easedDoor * 0.85);

  // Controlled subtle zoom on portal stage (scale: 1.0 -> 1.08 max)
  const portalScale = 1.0 + 0.08 * easedDoor;

  // Bottom hint fades out immediately (0% to 10% scroll)
  const hintOpacity = Math.max(0, 1.0 - activeProgress / 0.10);

  // Central golden light burst emerging as crack unlatches
  const lightRayProgress = Math.min(1, doorPhase / 0.5);
  const lightRayOpacity = Math.sin(lightRayProgress * Math.PI) * 0.9;
  const lightRayScale = 1.0 + doorPhase * 1.5;

  // --- PHASE 2 (45% to 85% scroll): Typography & Explore CTA ---
  // Strictly 0 opacity when activeProgress <= 0.45; smoothly transitions 0 -> 1 between 45% and 85%
  let typographyOpacity = 0;
  let typographyTranslateY = 15;
  if (activeProgress > 0.45) {
    const textProgress = Math.min(1, (activeProgress - 0.45) / (0.85 - 0.45));
    // power2.out: 1 - (1 - t)^2
    const easedText = 1 - Math.pow(1 - textProgress, 2);
    typographyOpacity = easedText;
    typographyTranslateY = 15 * (1 - easedText);
  }

  // Navigation click handler
  const handleNavClick = (link: string) => {
    if (link === 'Home') {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleScrollToVault();
    }
  };

  // Scroll to crafts vault
  const handleScrollToVault = () => {
    if (onExploreVault) {
      onExploreVault();
    } else {
      const el =
        document.getElementById('artisan-vault') ||
        document.getElementById('crafts-section') ||
        document.getElementById('collections');
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -40 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Interactive "Explore the Crafts →" button click handler:
  // If doors are still closed/partially open, animate doors open smoothly before scrolling down
  const handleExploreClick = () => {
    if (activeProgress >= 0.70) {
      handleScrollToVault();
      return;
    }

    if (isOpeningAnimationRunning) return;
    setIsOpeningAnimationRunning(true);
    setIsManualOverride(true);

    const startVal = activeProgress;
    const targetVal = 1.0;
    const duration = 750; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetVal - startVal) * eased;
      setManualVal(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsOpeningAnimationRunning(false);
        setIsManualOverride(false);
        handleScrollToVault();
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section ref={containerRef} id="hero-portal" className="scroll-container select-none">
      <div className="sticky-viewport">

        {/* ========================================================= */}
        {/* 1. VIEWPORT & ASPECT RATIO CONSTRAINED PORTAL STAGE      */}
        {/* max-width: 100vw; max-height: 100vh; width: min(100vw, 177.78vh) */}
        {/* ========================================================= */}
        <div
          className="portal-stage"
          style={{
            transform: `scale(${portalScale})`,
            transformOrigin: 'center center',
            transition: isManualOverride ? 'none' : 'transform 0.1s linear',
          }}
        >
          {/* Master Potter Jharokha Sanctuary Artwork */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/potter-jharokha.jpg"
              alt="MILAAN Master Kaarigar Sanctum"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            />
            {/* Subtle Ambient Lighting & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/90 via-[#080604]/20 to-[#080604]/70" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, rgba(223, 183, 117, 0.14) 0%, rgba(200, 90, 50, 0.07) 45%, rgba(8, 6, 4, 0.45) 85%)',
              }}
            />
          </div>

          {/* Centered Arch Window Watermark */}
          <div
            className="absolute left-1/2 top-[24%] sm:top-[26%] -translate-x-1/2 z-10 flex flex-col items-center text-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: typographyOpacity }}
          >
            <span className="font-cinzel text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.32em] text-[#FAF7F2] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              M I L A A N
            </span>
            <span className="text-[7.5px] sm:text-[9.5px] uppercase font-telemetry tracking-[0.38em] text-[#dfb775] mt-1 drop-shadow-md">
              PEOPLE · CRAFTS · INDIA
            </span>
          </div>

          {/* THE DOOR ASSEMBLY: Layer 2 (Doors) and Layer 3 (Stone Arch Foreground) */}
          <div className="door-frame">
            {/* Radiant Central Sunlight Flare emerging through crack */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[75%] pointer-events-none z-4 blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255, 230, 160, 0.95) 0%, rgba(223, 183, 117, 0.5) 45%, transparent 75%)',
                opacity: lightRayOpacity,
                transform: `scaleX(${lightRayScale})`,
              }}
            />

            {/* Layer 2 (Middle): Dual 3D Doors Stage (Hinges anchor behind stone pillars) */}
            <div className="doors-stage doors-wrapper">
              {/* LEFT DOOR: Hinge locked to outer left edge */}
              <div
                className="door door-left"
                style={{
                  transform: `rotateY(${leftDoorAngle}deg)`,
                  transformOrigin: 'left center',
                }}
              >
                <img
                  src="/door-left.png"
                  alt="Left Door"
                  style={{
                    filter: `brightness(${doorBrightness})`,
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 pointer-events-none"
                  style={{ opacity: doorShadow }}
                />
              </div>

              {/* RIGHT DOOR: Hinge locked to outer right edge */}
              <div
                className="door door-right"
                style={{
                  transform: `rotateY(${rightDoorAngle}deg)`,
                  transformOrigin: 'right center',
                }}
              >
                <img
                  src="/door-right.png"
                  alt="Right Door"
                  style={{
                    filter: `brightness(${doorBrightness})`,
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/20 pointer-events-none"
                  style={{ opacity: doorShadow }}
                />
              </div>
            </div>

            {/* Layer 3 (Front): Outer Carved Stone Arch Frame & Columns (Clips door hinges cleanly) */}
            <img
              src="/outer-frame.png"
              className="frame-layer outer-frame"
              alt="Arch Frame"
            />
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL TEXT POSITIONING & SAFE BOUNDS (2D HUD LAYER)*/}
        {/* Fixed/absolute layer outside 3D transforms, preventing clipping */}
        {/* ========================================================= */}
        <div
          className="hero-overlay-ui"
          style={{
            opacity: typographyOpacity,
            transform: `translateY(${typographyTranslateY}px)`,
            pointerEvents: typographyOpacity > 0.3 ? 'auto' : 'none',
            transition: isManualOverride ? 'none' : 'opacity 0.15s ease-out, transform 0.15s ease-out',
          }}
        >
          {/* LEFT COLUMN: "We are heritage" */}
          <div className="hero-left-block hero-editorial-text flex flex-col justify-center text-left space-y-3 sm:space-y-4">
            <h1 className="font-serif-luxury hero-heading-clamp font-normal tracking-tight text-[#FAF7F2]">
              We are <br />
              <span className="italic font-cormorant text-[#dfb775] font-light">
                heritage
              </span>
            </h1>

            <div className="flex items-start gap-3 pt-0.5">
              <div className="w-[1.5px] h-9 sm:h-10 bg-[#dfb775]/50 mt-1 shrink-0" />
              <p className="hero-text-clamp font-sans font-medium text-[#FAF7F2]/90 leading-snug">
                Rooted in tradition. <br />
                Crafted for tomorrow.
              </p>
            </div>

            <p className="hero-text-clamp text-[#FAF7F2]/75 font-sans leading-relaxed">
              MILAAN is a celebration of India&apos;s living heritage — the people, the places
              and the crafts that keep our culture alive.
            </p>

            <div className="pt-0.5">
              <button
                onClick={handleScrollToVault}
                className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-wider text-[#FAF7F2] hover:text-[#dfb775] transition-all group cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-[#dfb775]/40 group-hover:decoration-[#dfb775]">
                  Learn More
                </span>
                <ArrowRight
                  size={13}
                  className="text-[#dfb775] transform group-hover:translate-x-1.5 transition-transform"
                />
              </button>
            </div>

            {/* Bottom-left Indian Block Print Motif */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-8 rounded-full border border-[#dfb775]/40 bg-[#16100b]/80 flex items-center justify-center shadow-md">
                <BlockPrintIcon />
              </div>
              <div className="flex flex-col text-[8px] sm:text-[9px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/75 leading-tight">
                <span>HANDMADE</span>
                <span>MINDFUL</span>
                <span>TIMELESS</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: "We are eternity" */}
          <div className="hero-right-block hero-editorial-text flex flex-col justify-center text-right space-y-3 sm:space-y-4 items-end">
            {/* Top-Right Stacked Craft Metadata */}
            <div className="hidden sm:flex flex-col items-end gap-1.5 text-right mb-1">
              <div className="flex flex-col text-[8px] sm:text-[8.5px] uppercase font-telemetry tracking-[0.3em] text-[#FAF7F2]/70 leading-relaxed text-right">
                <span>CRAFTS</span>
                <span>PEOPLE</span>
                <span>PLACES</span>
                <span>A STRONGER</span>
                <span>TOMORROW</span>
              </div>
              <div className="w-[1px] h-6 bg-[#dfb775]/40 my-0.5" />
              <div className="w-6 h-6 rounded-full border border-[#dfb775]/40 flex items-center justify-center bg-[#16100b]/60">
                <Compass size={12} className="text-[#dfb775] animate-spin-slow" />
              </div>
            </div>

            <h2 className="font-serif-luxury hero-heading-clamp font-normal tracking-tight text-[#FAF7F2]">
              We are <br />
              <span className="italic font-cormorant text-[#dfb775] font-light">
                eternity
              </span>
            </h2>

            <div className="space-y-1 flex flex-col items-end pt-0.5">
              <div className="w-9 h-[1.5px] bg-[#dfb775]/50 mb-1" />
              <p className="text-[9.5px] sm:text-[10.5px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/80">
                SAME HANDS.
              </p>
              <p className="text-[9.5px] sm:text-[10.5px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/80">
                BRIGHTER TOMORROWS.
              </p>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 3. FIXED BOTTOM BUTTON & ACCENT STRIP                   */}
          {/* ======================================================= */}
          <div className="hero-explore-btn-wrap">
            <button
              onClick={handleExploreClick}
              disabled={isOpeningAnimationRunning}
              className="explore-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-[#F5EFEB] hover:bg-white text-[#18130f] font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-2xl shadow-black/90 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#FAF7F2]/40"
            >
              <span>Explore the Crafts</span>
              <ArrowRight size={14} className="text-[#18130f]" />
            </button>
          </div>

          {/* Bottom Accent Bar */}
          <div className="w-full flex items-center justify-between text-[10px] font-telemetry text-[#FAF7F2]/40 pb-2 border-t border-[#dfb775]/15 mt-auto">
            <span className="tracking-widest uppercase hidden md:inline">
              Direct Autonomous Trade • Sovereign Kaarigar Protocol
            </span>
            <button
              onClick={handleScrollToVault}
              className="tracking-widest uppercase hover:text-[#dfb775] transition-colors cursor-pointer ml-auto flex items-center gap-1.5 text-[#dfb775]/80"
            >
              <span>Scroll Down to Discover Vault</span>
              <ArrowRight size={11} className="rotate-90 text-[#dfb775]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TOP NAVIGATION BAR: Fixed at top of viewport              */}
        {/* ========================================================= */}
        <header
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 py-4 transition-all duration-500 pointer-events-auto"
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            background:
              'linear-gradient(to bottom, rgba(8, 6, 4, 0.85) 0%, rgba(8, 6, 4, 0.4) 75%, transparent 100%)',
          }}
        >
          {/* Left: Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home');
            }}
            className="group flex flex-col text-left cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <span className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-[0.28em] text-[#FAF7F2] drop-shadow-md">
              M I L A A N
            </span>
            <span className="text-[7.5px] sm:text-[9px] uppercase font-telemetry tracking-[0.35em] text-[#FAF7F2]/75 mt-0.5">
              PEOPLE · CRAFTS · INDIA
            </span>
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-[0.22em] uppercase text-[#FAF7F2]/85 font-sans font-medium">
            {['Home', 'Artisans', 'Collections', 'Stories', 'Experiences', 'About'].map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="relative py-1 cursor-pointer transition-colors hover:text-[#dfb775] group"
              >
                <span>{link}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#dfb775] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right: Search & Speak to Milaan */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToVault}
              aria-label="Search Vault"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#dfb775] hover:bg-white/5 transition-all cursor-pointer"
              title="Search Vault"
            >
              <Search size={16} />
            </button>

            <button
              onClick={onOpenVoiceStudio}
              className="px-4 sm:px-5 py-2 rounded-full border border-[#dfb775]/50 bg-[#16100b]/85 hover:bg-[#dfb775]/20 text-[#FAF7F2] text-xs font-sans font-medium tracking-wide flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/60 transition-all hover:scale-[1.03] cursor-pointer"
            >
              <Mic size={14} className="text-[#dfb775] animate-pulse" />
              <span>Speak to Milaan</span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* CENTERED SCROLL PROMPT: "SCROLL DOWN TO OPEN THE DARWAZA" */}
        {/* Fades out immediately (0% to 10% scroll progress)        */}
        {/* ========================================================= */}
        {hintOpacity > 0.01 && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-25 pointer-events-none flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#080604]/85 border border-[#dfb775]/40 text-[#FAF7F2] text-xs font-telemetry tracking-[0.24em] uppercase backdrop-blur-md shadow-2xl shadow-black/80 transition-opacity duration-200"
            style={{ opacity: hintOpacity }}
          >
            <span className="w-2 h-2 rounded-full bg-[#dfb775] shadow-[0_0_10px_#dfb775] animate-ping" />
            <span>SCROLL DOWN TO OPEN THE DARWAZA</span>
          </div>
        )}

      </div>
    </section>
  );
};

export default ScrollDoorHero;
