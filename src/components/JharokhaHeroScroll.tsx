"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface JharokhaHeroScrollProps {
  onOpenVoiceStudio?: () => void;
  onExploreVault?: () => void;
}

export default function JharokhaHeroScroll({
  onOpenVoiceStudio,
  onExploreVault,
}: JharokhaHeroScrollProps = {}) {
  // Silence unused React variable under strict noUnusedLocals
  void React;
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through 300vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics so scrolling feels weighted and premium
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Door Swing 3D Rotations
  // Left door rotates outwards to the left (-115deg)
  const leftDoorRotate = useTransform(smoothProgress, [0, 0.55], [0, -115]);
  // Right door rotates outwards to the right (+115deg)
  const rightDoorRotate = useTransform(smoothProgress, [0, 0.55], [0, 115]);

  // Doors slide away and fade as the user enters the sanctuary
  const doorsOpacity = useTransform(smoothProgress, [0.45, 0.65], [1, 0]);
  const doorsScale = useTransform(smoothProgress, [0.5, 0.8], [1, 1.25]);

  // Dynamic shadow that darkens the shutter as it swings
  const doorDarken = useTransform(smoothProgress, [0, 0.4], [0, 0.75]);

  // Inner Website Content Reveals
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.5], [0, 1]);
  const contentScale = useTransform(smoothProgress, [0.15, 0.6], [0.88, 1]);
  const contentY = useTransform(smoothProgress, [0.15, 0.6], [40, 0]);

  // Scroll hint badge fades out immediately on first scroll
  const hintOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  const handleExplore = () => {
    if (onExploreVault) {
      onExploreVault();
    } else {
      const el = document.getElementById("artisan-vault");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0c0806] text-white">
      {/* Pinned 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ========================================================= */}
        {/* LAYER 1: INNER SANCTUM (THE REVEALED WEBSITE CONTENT)    */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
          }}
          className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 pointer-events-auto bg-radial from-[#241710] via-[#120a06] to-[#080503]"
        >
          {/* Top Navigation */}
          <header className="flex justify-between items-center w-full border-b border-amber-900/30 pb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/80 font-mono">
              MILAAN • Living Heritage • India
            </span>
            <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-neutral-300">
              <span onClick={handleExplore} className="text-amber-300 hover:text-amber-200 cursor-pointer">Artisans</span>
              <span onClick={handleExplore} className="hover:text-amber-200 cursor-pointer">Collections</span>
              <span onClick={handleExplore} className="hover:text-amber-200 cursor-pointer">Living Labels</span>
              <span onClick={handleExplore} className="hover:text-amber-200 cursor-pointer">ONDC Rails</span>
            </nav>
            <button
              onClick={onOpenVoiceStudio}
              className="px-4 py-1.5 rounded-full border border-amber-400/40 text-xs uppercase tracking-widest text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              Speak to Milaan 🎙️
            </button>
          </header>

          {/* Center Showcase Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 my-auto text-center md:text-left">
            {/* Left Typography */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-amber-100 leading-tight">
                We are <br /><span className="italic font-light text-amber-300">heritage</span>
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Rooted in tradition, crafted for tomorrow. MILAAN connects master craftsmen straight to conscious global homes.
              </p>
            </div>

            {/* Center Altar / Visual */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-56 h-72 rounded-t-full border border-amber-500/40 p-2 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-amber-950/20 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-amber-500/10" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-amber-300/80 mb-2">Platform Core</span>
                <h3 className="text-3xl font-serif tracking-widest text-amber-100">MILAAN</h3>
                <p className="text-[11px] text-neutral-300 mt-2 text-center px-4">
                  Autonomous Multi-Modal DPI for 200M Artisans
                </p>
                <button
                  onClick={handleExplore}
                  className="mt-6 px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
                >
                  Explore Crafts ↓
                </button>
              </div>
            </div>

            {/* Right Typography */}
            <div className="space-y-4 md:text-right flex flex-col md:items-end">
              <h2 className="text-4xl md:text-5xl font-serif text-amber-100 leading-tight">
                We are <br /><span className="italic font-light text-amber-300">eternity</span>
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs md:text-right">
                Same hands. Brighter tomorrows. Every purchase directly credits the artisan via smart sovereign escrow.
              </p>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <footer className="text-center text-[10px] tracking-widest uppercase text-amber-200/40 border-t border-amber-900/20 pt-4">
            Scroll down to enter the artisan state vaults
          </footer>
        </motion.div>


        {/* ========================================================= */}
        {/* LAYER 2: 3D JHAROKHA WINDOW RIG (PERSPECTIVE SYSTEM)      */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          {/* Main Door Stage (Matches the center window dimensions) */}
          <motion.div
            style={{
              opacity: doorsOpacity,
              scale: doorsScale,
            }}
            className="relative w-full h-full max-w-[1920px] max-h-[1080px] flex items-center justify-center"
          >
            {/* ---------------- LEFT DOOR HALF ---------------- */}
            <motion.div
              style={{
                rotateY: leftDoorRotate,
                transformOrigin: "32% center", // Hinges on the inner pillar border
                clipPath: "polygon(32% 10%, 50% 10%, 50% 88%, 32% 88%)",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/jharokha-gate.png"
                alt="Left Shutter"
                className="w-full h-full object-cover"
              />
              {/* Dynamic shadow that darkens the shutter as it swings */}
              <motion.div
                style={{
                  opacity: doorDarken,
                }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
            </motion.div>

            {/* ---------------- RIGHT DOOR HALF ---------------- */}
            <motion.div
              style={{
                rotateY: rightDoorRotate,
                transformOrigin: "68% center", // Hinges on the right inner pillar border
                clipPath: "polygon(50% 10%, 68% 10%, 68% 88%, 50% 88%)",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/jharokha-gate.png"
                alt="Right Shutter"
                className="w-full h-full object-cover"
              />
              {/* Dynamic shadow that darkens the shutter as it swings */}
              <motion.div
                style={{
                  opacity: doorDarken,
                }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
            </motion.div>

            {/* ---------------- STATIC FOREGROUND FRAME ---------------- */}
            {/* The outer arch and pillars stay intact to frame the opening */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 32% 10%, 32% 88%, 68% 88%, 68% 10%, 32% 10%)",
              }}
            >
              <img
                src="/jharokha-gate.png"
                alt="Palace Frame Arch"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>


        {/* ========================================================= */}
        {/* LAYER 3: SCROLL INSTRUCTION PROMPT                        */}
        {/* ========================================================= */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-200/90 font-mono bg-black/60 px-4 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md">
            Scroll down to open the Darwaza ↓
          </span>
        </motion.div>

      </div>
    </div>
  );
}
