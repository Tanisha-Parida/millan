import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Sparkles, Volume2, Mic, ChevronDown } from 'lucide-react';

interface GateHeroSectionProps {
  onOpenVoiceStudio: () => void;
  onExploreVault: () => void;
}

export const GateHeroSection: React.FC<GateHeroSectionProps> = ({
  onOpenVoiceStudio,
  onExploreVault,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentProgressVal, setCurrentProgressVal] = useState(0);
  const [manualProgress, setManualProgress] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Scroll tracking across the 300vh sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Bind the video's playback time to scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isManualOverride) {
      setCurrentProgressVal(latest);
    }
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  // Derived animation values based on scroll:
  // Gate parting from 0% to 45% scroll progress
  const gateRotateYLeft = useTransform(scrollYProgress, [0, 0.45], [0, -88]);
  const gateRotateYRight = useTransform(scrollYProgress, [0, 0.45], [0, 88]);
  const gateScale = useTransform(scrollYProgress, [0, 0.48], [1.0, 1.55]);
  const gateOpacity = useTransform(scrollYProgress, [0.35, 0.52], [1.0, 0]);

  // Sanctum content reveal from 42% to 75%
  const sanctumOpacity = useTransform(scrollYProgress, [0.42, 0.65], [0, 1]);
  const sanctumScale = useTransform(scrollYProgress, [0.42, 0.7], [0.92, 1.0]);
  const sanctumTranslateY = useTransform(scrollYProgress, [0.42, 0.7], [40, 0]);

  const activeProgress = isManualOverride ? manualProgress : currentProgressVal;

  const handleManualScrub = (val: number) => {
    setIsManualOverride(true);
    setManualProgress(val);
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration - 0.05,
        Math.max(0, val * videoRef.current.duration)
      );
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-gate"
      className="relative w-full h-[300vh] bg-[#060709] select-none"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Atmosphere: Palace Sanctum Glow & Noise */}
        <div className="absolute inset-0 bg-[#060709] pointer-events-none">
          {/* Radial warm golden sunburst behind sanctum */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full opacity-35 blur-[130px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.55) 0%, rgba(200, 90, 50, 0.3) 45%, transparent 75%)',
            }}
          />
          {/* Top subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060709]/80 via-transparent to-[#060709] pointer-events-none" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 1: THE INNER SANCTUM REVEAL (Visible as gates part open) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{
            opacity: isManualOverride 
              ? Math.min(1, Math.max(0, (manualProgress - 0.38) / 0.3)) 
              : sanctumOpacity,
            scale: isManualOverride 
              ? 0.92 + Math.min(0.08, manualProgress * 0.1) 
              : sanctumScale,
            y: isManualOverride 
              ? Math.max(0, (1 - manualProgress) * 40) 
              : sanctumTranslateY,
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 z-10 pointer-events-auto"
        >
          {/* Sub-header ticker bar */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest text-[#FAF7F2]/60 border-b border-[#D4AF37]/15 pb-4 pt-10">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
              <span className="font-telemetry uppercase text-[11px] text-[#FAF7F2]/80">
                100% Sovereign Provenance • Zero Middlemen • Direct Handloom
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 font-telemetry text-[11px]">
              <span className="text-[#D4AF37]">LAT 21.4678° N, 83.9812° E</span>
              <span>SAMBALPUR CLUSTER #07</span>
            </div>
          </div>

          {/* Master 3-Column Luxury Hero Composition matching Image 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto">
            
            {/* Left Column: "We Are Heritage" */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-telemetry">
                <Sparkles size={13} className="text-[#D4AF37]" />
                <span>AUTONOMOUS CRAFT ENGINE</span>
              </div>

              <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-[#FAF7F2]">
                We are <br />
                <span className="italic font-cormorant gold-gradient-text">heritage</span>
              </h1>

              <p className="text-sm md:text-base text-[#FAF7F2]/75 font-sans leading-relaxed max-w-md">
                A haven where ancient Indian artisanship meets sovereign technology. 
                Preserving 4,000-year-old living genealogies through decentralized verification 
                and direct-to-global export corridors.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreVault}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D4AF37] text-[#060709] font-medium text-sm flex items-center gap-2 shadow-lg shadow-[#C85A32]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] transition-all"
                >
                  <span>Explore Vault</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={onOpenVoiceStudio}
                  className="px-6 py-3 rounded-full border border-[#D4AF37]/40 bg-[#060709]/60 hover:bg-[#D4AF37]/10 text-[#FAF7F2] font-medium text-sm flex items-center gap-2 backdrop-blur-md transition-all"
                >
                  <Mic size={15} className="text-[#D4AF37]" />
                  <span>Voice Studio</span>
                </button>
              </div>
            </div>

            {/* Center Column: The Ornate Jharokha Arch Sanctum */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] overflow-hidden gold-foil-border p-2 bg-[#0a0c11]/80 shadow-2xl shadow-[#060709]">
                
                {/* Jharokha Carved Arch Cutout */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden group">
                  <img
                    src="/images/sanctum-jharokha-hero.png"
                    alt="MILAAN Heritage Sanctum Artisan Wheel"
                    className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Volumetric god-rays simulation layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/15 via-transparent to-[#C85A32]/10 mix-blend-screen pointer-events-none" />

                  {/* Center Emblem overlay */}
                  <div className="absolute bottom-6 inset-x-0 flex flex-col items-center text-center px-4">
                    <span className="font-cinzel tracking-[0.25em] text-lg text-[#FAF7F2] font-bold">
                      MILAAN
                    </span>
                    <span className="text-[10px] tracking-[0.3em] font-telemetry text-[#D4AF37] mt-0.5">
                      PEOPLE • CRAFTS • CULTURE
                    </span>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2]/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2]/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: "We Are Eternity" */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left lg:text-right space-y-6">
              <div className="flex items-center lg:justify-end gap-2 text-[#D4AF37]">
                <Sparkles size={18} className="animate-spin-slow" />
                <span className="font-telemetry text-xs tracking-wider">LIVING TRADITIONS</span>
              </div>

              <h2 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-[#FAF7F2]">
                <span className="text-xl md:text-2xl font-sans block opacity-60 font-light mb-1">
                  anant
                </span>
                We are <br />
                <span className="italic font-cormorant gold-gradient-text">eternity</span>
              </h2>

              <div className="space-y-1">
                <div className="font-telemetry text-2xl text-[#FAF7F2] font-semibold tracking-wider">
                  8,747+
                </div>
                <div className="text-xs tracking-widest text-[#FAF7F2]/60 font-sans uppercase">
                  Authenticated Masterpieces Exported Worldwide
                </div>
              </div>

              {/* Artisan quote pill */}
              <div className="p-4 rounded-2xl bg-[#12141c]/90 border border-[#D4AF37]/20 text-left backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#C85A32]/30 flex items-center justify-center text-[#D4AF37]">
                    <Volume2 size={14} />
                  </div>
                  <span className="text-xs font-telemetry text-[#D4AF37]">Nizamabad Master Kaarigar</span>
                </div>
                <p className="text-xs text-[#FAF7F2]/80 italic font-serif-luxury">
                  "Each urn takes 14 hours of hand-carving before rice-husk kiln firing. 
                  MILAAN brings our village honor to Tokyo and London without middlemen."
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="w-full flex items-center justify-between border-t border-[#D4AF37]/15 pt-4">
            <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
              <span className="text-[11px] font-telemetry text-[#FAF7F2]/50 whitespace-nowrap mr-2">
                VERIFIED GI DISCIPLINES:
              </span>
              {['Sambalpuri Bandha', 'Bastar Dhokra', 'Nizamabad Clay', 'Channapatna Lacquer', 'Kutch Rogan'].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-[11px] bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 text-[#FAF7F2]/80 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-telemetry text-[#D4AF37]">
              <span>SCROLL TO DIVE DEEPER</span>
              <ChevronDown size={14} className="animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 2: SCROLL-SCRUBBED VIDEO & 3D ROYAL HERITAGE GATE PANELS */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{
            scale: isManualOverride 
              ? 1.0 + manualProgress * 0.55 
              : gateScale,
            opacity: isManualOverride 
              ? Math.max(0, 1 - (manualProgress - 0.2) / 0.35) 
              : gateOpacity,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none perspective-1500"
        >
          {/* Outer Archway */}
          <div className="relative w-full h-full max-w-5xl max-h-[92vh] flex items-center justify-center">

            {/* Scroll-Scrubbed Native Video Element (Playback time bound to scroll) */}
            <video
              ref={videoRef}
              src="/darwaza-gate.mp4"
              preload="auto"
              muted
              playsInline
              onLoadedMetadata={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none z-10 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Dual 3D Carved Wood Door Panels (Split Left & Right) */}
            <div className={`relative w-full h-full max-w-4xl max-h-[85vh] flex items-center justify-center preserve-3d shadow-2xl transition-opacity duration-500 ${
              videoLoaded ? 'opacity-0' : 'opacity-100'
            }`}>
              
              {/* LEFT GATE PANEL */}
              <motion.div
                style={{
                  rotateY: isManualOverride 
                    ? -Math.min(88, manualProgress * 180) 
                    : gateRotateYLeft,
                  transformOrigin: 'left center',
                }}
                className="w-1/2 h-full relative overflow-hidden preserve-3d shadow-2xl rounded-l-3xl border-l border-y border-[#D4AF37]/30"
              >
                <div className="absolute inset-0 w-[200%] h-full">
                  <img
                    src="/images/royal-darwaza-gate.png"
                    alt="Royal Heritage Carved Palace Gate - Left"
                    className="w-full h-full object-cover object-left"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60 pointer-events-none" />
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#D4AF37]/80 bg-[#422212]/80 flex items-center justify-center shadow-lg pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                </div>
              </motion.div>

              {/* RIGHT GATE PANEL */}
              <motion.div
                style={{
                  rotateY: isManualOverride 
                    ? Math.min(88, manualProgress * 180) 
                    : gateRotateYRight,
                  transformOrigin: 'right center',
                }}
                className="w-1/2 h-full relative overflow-hidden preserve-3d shadow-2xl rounded-r-3xl border-r border-y border-[#D4AF37]/30"
              >
                <div className="absolute inset-0 -left-full w-[200%] h-full">
                  <img
                    src="/images/royal-darwaza-gate.png"
                    alt="Royal Heritage Carved Palace Gate - Right"
                    className="w-full h-full object-cover object-left"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/60 pointer-events-none" />
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#D4AF37]/80 bg-[#422212]/80 flex items-center justify-center shadow-lg pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                </div>
              </motion.div>

              {/* Central Gate Gap Light Ray Burst */}
              <div 
                className="absolute inset-y-0 w-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent blur-md pointer-events-none"
                style={{
                  opacity: Math.min(1, activeProgress * 2.5),
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE CONTROLS OVERLAY: Gate Progress Scrubber */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
          {activeProgress < 0.35 && (
            <div className="px-5 py-2 rounded-full obsidian-glass flex items-center gap-3 text-xs text-[#FAF7F2]/90 border border-[#D4AF37]/30 shadow-xl backdrop-blur-lg">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-sans font-medium tracking-wide">
                Scroll downwards to unlatch the Royal Heritage Gate
              </span>
            </div>
          )}

          {/* Interactive Gate Reveal Slider */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#060709]/80 border border-[#D4AF37]/25 backdrop-blur-md text-[11px] font-telemetry">
            <span className="text-[#D4AF37]">GATE PORTAL:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={activeProgress}
              onChange={(e) => handleManualScrub(parseFloat(e.target.value))}
              className="w-28 sm:w-40 h-1 bg-[#231a10] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <span className="text-[#FAF7F2]/70 w-10 text-right">
              {Math.round(activeProgress * 100)}%
            </span>
            {isManualOverride && (
              <button
                onClick={() => setIsManualOverride(false)}
                className="text-[10px] text-[#D4AF37] underline hover:text-[#FAF7F2]"
              >
                Sync Scroll
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GateHeroSection;
