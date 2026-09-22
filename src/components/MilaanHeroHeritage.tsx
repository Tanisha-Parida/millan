"use client";

import { motion } from "framer-motion";
import { Search, Mic, ArrowRight, Sparkles, Compass } from "lucide-react";

export interface MilaanHeroProps {
  onOpenVoiceStudio?: () => void;
  onExploreVault?: () => void;
}

export default function MilaanHeroHeritage({
  onOpenVoiceStudio,
  onExploreVault,
}: MilaanHeroProps = {}) {
  const handleScrollToVault = () => {
    if (onExploreVault) {
      onExploreVault();
    } else {
      const el = document.getElementById("artisan-vault");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (link: string) => {
    if (link === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link === "Artisans" || link === "Collections") {
      handleScrollToVault();
    } else if (link === "Stories" || link === "Experiences" || link === "About") {
      handleScrollToVault();
    }
  };

  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#0c0907] flex items-center justify-center select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. BACKGROUND CANVAS                                          */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <img
          src="/milan-hero-bg.png"
          alt="MILAAN Craft Heritage Sanctuary"
          className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.02]"
        />
        {/* Subtle warm ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0907]/60 via-transparent to-[#0c0907]/40 pointer-events-none" />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE OVERLAY ELEMENTS (Layered over background)     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full max-w-[1920px] aspect-[16/9] max-h-screen h-full mx-auto flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12 z-10 pointer-events-auto">
        
        {/* TOP NAVIGATION BAR */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="w-full flex items-center justify-between z-30 pt-1"
        >
          {/* Left: Clickable Brand Logo */}
          <a
            href="/"
            className="group flex flex-col text-left cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <span className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-[0.25em] text-[#FAF7F2] drop-shadow-md">
              M I L A A N
            </span>
            <span className="text-[8px] sm:text-[9.5px] uppercase font-telemetry tracking-[0.35em] text-[#FAF7F2]/80 mt-0.5">
              PEOPLE • CRAFTS • INDIA
            </span>
          </a>

          {/* Center: Navigation Links with Smooth Hover States */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-[0.2em] uppercase text-[#FAF7F2]/85 font-sans font-medium">
            {["Home", "Artisans", "Collections", "Stories", "Experiences", "About"].map((link) => (
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

          {/* Right: Search Button & "🎙️ Speak to Milaan" Pill Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToVault}
              aria-label="Search"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#dfb775] hover:bg-white/5 transition-all cursor-pointer"
              title="Search Vault"
            >
              <Search size={16} />
            </button>

            <button
              onClick={onOpenVoiceStudio}
              className="px-4 sm:px-5 py-2 rounded-full border border-[#dfb775]/50 bg-[#16100b]/80 hover:bg-[#dfb775]/20 text-[#FAF7F2] text-xs font-sans font-medium tracking-wide flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/60 transition-all hover:scale-[1.03] cursor-pointer"
            >
              <Mic size={14} className="text-[#dfb775] animate-pulse" />
              <span>Speak to Milaan</span>
            </button>
          </div>
        </motion.header>

        {/* MAIN HERO CONTENT ROW (Left Column | Center Altar | Right Column) */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto z-20">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN AREA: "We are heritage"                       */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="md:col-span-4 flex flex-col justify-center text-left space-y-4 lg:space-y-6"
          >
            {/* Display Headline */}
            <div className="space-y-1">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.02] tracking-tight text-[#FAF7F2]">
                We are <br />
                <span className="italic font-cormorant text-[#dfb775] font-light">
                  heritage
                </span>
              </h1>
            </div>

            {/* Vertical Accent Line & Mission Subhead */}
            <div className="flex items-start gap-3.5 pt-1">
              <div className="w-[1.5px] h-11 bg-[#dfb775]/50 mt-1 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs sm:text-[13px] font-sans font-medium text-[#FAF7F2]/90 leading-snug">
                  Rooted in tradition. <br />
                  Crafted for tomorrow.
                </p>
              </div>
            </div>

            {/* Descriptive Paragraph */}
            <p className="text-[11px] sm:text-xs text-[#FAF7F2]/75 font-sans leading-relaxed max-w-xs">
              MILAAN is a celebration of India&apos;s living heritage — the people, the places
              and the crafts that keep our culture alive.
            </p>

            {/* Clickable "Learn More →" Link */}
            <div className="pt-1">
              <button
                onClick={handleScrollToVault}
                className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-wider text-[#FAF7F2] hover:text-[#dfb775] transition-all group cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-[#dfb775]/40 group-hover:decoration-[#dfb775]">
                  Learn More
                </span>
                <ArrowRight
                  size={14}
                  className="text-[#dfb775] transform group-hover:translate-x-1.5 transition-transform"
                />
              </button>
            </div>

            {/* Accent Label: "HANDMADE • MINDFUL • TIMELESS" */}
            <div className="flex items-center gap-3 pt-3">
              <div className="w-8 h-8 rounded-full border border-[#dfb775]/40 bg-[#16100b]/70 flex items-center justify-center text-[#dfb775] shadow-md">
                <Sparkles size={14} />
              </div>
              <div className="flex flex-col text-[8.5px] sm:text-[9.5px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/70 leading-tight">
                <span>HANDMADE</span>
                <span>MINDFUL</span>
                <span>TIMELESS</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CENTER JHAROKHA ALTAR: Centered over stone arch window     */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="md:col-span-4 flex flex-col items-center justify-center relative pointer-events-auto"
          >
            {/* Jharokha Altar Branding in Window */}
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.3em] text-[#FAF7F2] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                M I L A A N
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-telemetry tracking-[0.35em] text-[#dfb775] mt-1 drop-shadow-md">
                PEOPLE • CRAFTS • INDIA
              </span>
            </div>

            {/* Centered Active CTA Button at the Base of the Stone Sill */}
            <div className="pt-2 sm:pt-6">
              <button
                onClick={handleScrollToVault}
                className="px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-[#ECE5D8] hover:bg-white text-[#18130f] font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-2xl shadow-black/90 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#FAF7F2]/40"
              >
                <span>Explore the Crafts</span>
                <ArrowRight size={14} className="text-[#18130f]" />
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN AREA: "We are eternity"                      */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
            className="md:col-span-4 flex flex-col justify-center text-left md:text-right space-y-4 lg:space-y-6 md:items-end"
          >
            {/* Upper Right Vertical Indicator: "CRAFTS • PEOPLE • PLACES • A STRONGER TOMORROW" */}
            <div className="hidden md:flex flex-col items-end gap-2 text-right mb-2">
              <div className="flex flex-col text-[8.5px] uppercase font-telemetry tracking-[0.3em] text-[#FAF7F2]/65 leading-relaxed text-right">
                <span>CRAFTS</span>
                <span>PEOPLE</span>
                <span>PLACES</span>
                <span>A STRONGER</span>
                <span>TOMORROW</span>
              </div>
              <div className="w-[1px] h-8 bg-[#dfb775]/40 my-1" />
              <div className="w-6 h-6 rounded-full border border-[#dfb775]/40 flex items-center justify-center bg-[#16100b]/60">
                <Compass size={13} className="text-[#dfb775] animate-spin-slow" />
              </div>
            </div>

            {/* Display Headline */}
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.02] tracking-tight text-[#FAF7F2]">
                We are <br />
                <span className="italic font-cormorant text-[#dfb775] font-light">
                  eternity
                </span>
              </h2>
            </div>

            {/* Supporting Text: "SAME HANDS. BRIGHTER TOMORROWS." */}
            <div className="space-y-1 flex flex-col md:items-end pt-1">
              <div className="w-10 h-[1.5px] bg-[#dfb775]/50 mb-1" />
              <p className="text-[10px] sm:text-[11px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/80">
                SAME HANDS.
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase font-telemetry tracking-[0.25em] text-[#FAF7F2]/80">
                BRIGHTER TOMORROWS.
              </p>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM SPACER / ACCENT BAR */}
        <div className="w-full flex items-center justify-between text-[10px] font-telemetry text-[#FAF7F2]/40 pt-2 border-t border-[#dfb775]/10">
          <span className="tracking-widest uppercase hidden sm:inline">
            Direct Autonomous Trade • Sovereign Kaarigar Protocol
          </span>
          <button
            onClick={handleScrollToVault}
            className="tracking-widest uppercase hover:text-[#dfb775] transition-colors cursor-pointer ml-auto flex items-center gap-1.5"
          >
            <span>Scroll Down to Discover Vault</span>
            <ArrowRight size={11} className="rotate-90 text-[#dfb775]" />
          </button>
        </div>

      </div>
    </section>
  );
}
