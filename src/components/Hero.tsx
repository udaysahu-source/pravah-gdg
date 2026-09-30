import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CornerDownRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [activeStatusId, setActiveStatusId] = useState<string>('building');
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Subtly clamp parallax between 4px and 8px max
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = normX * 6; // Max 6px horizontal
      targetY = normY * 6; // Max 6px vertical

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (portraitRef.current) {
            portraitRef.current.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const activeStatus =
    PORTFOLIO_DATA.heroStatus.find((s) => s.id === activeStatusId) ||
    PORTFOLIO_DATA.heroStatus[0];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      {/* Top Identity Tape */}
      <div className="absolute top-20 right-6 sm:right-8 lg:right-12 hidden md:flex items-center gap-3 font-mono text-[10px] text-[#A7A39A] tracking-widest border border-[#111111]/10 bg-[#F4F2EC]/90 px-3 py-1 z-20">
        <span>LOC: RAIPUR_INDIA [21.2514°N 81.6296°E]</span>
        <span className="text-[#FF4500]">●</span>
        <span>BUILD 001 // 2026</span>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT: Core Positioning, Headline, Status & Actions        */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7 z-20">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#111111]/90">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span className="font-bold">[ CSE STUDENT · DEVELOPER · BUILDER · PROBLEM SOLVER ]</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.88] tracking-tight text-[#111111] uppercase select-none">
                <span className="block">I BUILD</span>
                <span className="block text-[#111111]">THINGS THAT</span>
                <span className="block text-[#FF4500]">SHOULD EXIST.</span>
              </h1>
            </div>

            {/* Mobile-Only Portrait (70-85vw, natural aspect ratio, no face crop) */}
            <div className="block lg:hidden my-2 relative w-[75vw] max-w-[320px] mx-auto">
              <div className="relative aspect-[4/5] w-full">
                <div className="absolute inset-0 bg-radial from-[#FF4500]/10 to-transparent rounded-full filter blur-xl pointer-events-none" />
                <img
                  src="/assets/uday_portrait_transparent.png"
                  alt="Uday Sahu — Portrait"
                  className="w-full h-full object-contain filter contrast-[1.03] drop-shadow-[0_16px_24px_rgba(0,0,0,0.12)]"
                  loading="eager"
                  width={640}
                  height={800}
                />
                <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-[#111111] text-[#F4F2EC] font-mono text-[9px] border border-[#2b2b2b]">
                  FIG. 01 — UDAY SAHU · RAIPUR
                </div>
              </div>
            </div>

            {/* Supporting Text */}
            <div className="max-w-xl space-y-2">
              <p className="font-sans text-base sm:text-lg text-[#111111] font-medium leading-relaxed">
                {PORTFOLIO_DATA.personal.supportingTagline}
              </p>
            </div>

            {/* Status Section */}
            <div className="pt-2">
              <div className="font-mono text-[10px] text-[#A7A39A] mb-2 tracking-widest uppercase">
                CURRENT STATUS:
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                {PORTFOLIO_DATA.heroStatus.map((status) => {
                  const isSelected = activeStatusId === status.id;
                  return (
                    <button
                      key={status.id}
                      type="button"
                      onClick={() => setActiveStatusId(status.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 font-mono text-xs border text-left transition-all ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                          : 'bg-white/80 text-[#111111]/80 border-[#111111]/20 hover:border-[#111111] hover:bg-white'
                      } focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none`}
                    >
                      <span className={`font-mono text-xs ${isSelected ? 'text-[#FF4500]' : 'text-[#A7A39A]'}`}>
                        {status.symbol}
                      </span>
                      <span className="font-bold">{status.label}</span>
                      <span className={`${isSelected ? 'text-[#FF4500]' : 'text-[#111111]/60'} font-semibold text-[11px]`}>
                        {status.target}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Status context description */}
              <div className="mt-2.5 p-2.5 bg-white/75 border border-[#111111]/10 text-xs font-mono flex items-center justify-between text-[#111111]/80 max-w-lg">
                <span className="text-[#FF4500] font-bold mr-2">↳</span>
                <span className="flex-1">{activeStatus.detail}</span>
                <span className="text-[10px] text-[#A7A39A] ml-2">2026 SPRINT</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#111111] text-[#F4F2EC] hover:bg-[#FF4500] hover:text-white border border-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
              >
                <span>VIEW MY WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F4F2EC] border border-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
              >
                <span>LET'S TALK</span>
                <CornerDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Bottom Subtle Identity Tape */}
            <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-[11px] text-[#A7A39A] border-t border-[#111111]/10">
              <div>RAIPUR, INDIA</div>
              <div>SSIPMT RAIPUR</div>
              <div>C++ / TYPESCRIPT</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Real Portrait Visual Anchor (Desktop)              */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 hidden lg:block relative select-none">
            {/* Subtle Warm Amber/Orange Ambient Glow Behind Silhouette */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[440px] bg-gradient-to-tr from-[#FF4500]/10 via-[#FF4500]/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

            {/* Portrait Container with subtle clamped parallax and 1.02 hover */}
            <div
              ref={portraitRef}
              className="relative transition-transform duration-300 ease-out will-change-transform"
            >
              {/* Subtle Identity Metadata Badge 01 (Never covers face) */}
              <div className="absolute -top-4 -left-4 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] px-3 py-1.5 shadow-md flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF4500]" />
                  <span className="font-bold text-white">FIG. 01 — UDAY SAHU</span>
                </div>
                <span className="text-[#A7A39A] text-[9px]">CSE / DEVELOPER / BUILDER</span>
              </div>

              {/* Subtle Identity Metadata Badge 02 (Top right) */}
              <div className="absolute top-24 -right-4 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-2 shadow-md">
                <div className="text-[#FF4500] font-bold">RAIPUR / INDIA</div>
                <div className="text-[#A7A39A] text-[9px]">21.2514° N, 81.6296° E</div>
              </div>

              {/* Subtle Identity Metadata Badge 03 (Bottom left) */}
              <div className="absolute -bottom-4 -left-2 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] px-3 py-1.5 shadow-md flex items-center gap-2.5">
                <span className="text-white font-semibold">BUILD 001</span>
                <span className="text-[#A7A39A]">/</span>
                <span className="text-[#FF4500]">2026</span>
              </div>

              {/* The Actual Transparent Silhouette Portrait */}
              <div className="relative z-10 overflow-visible transition-transform duration-500 ease-out hover:scale-[1.02]">
                <img
                  src="/assets/uday_portrait_transparent.png"
                  alt="Uday Sahu — Developer & Builder"
                  className="w-full h-auto max-h-[620px] object-contain filter contrast-[1.03] drop-shadow-[0_20px_32px_rgba(0,0,0,0.16)]"
                  loading="eager"
                  width={640}
                  height={800}
                />
              </div>

              {/* Quiet Technical Baseline Tag */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#A7A39A]">
                <span>[ID: UDAY SAHU]</span>
                <span>SSIPMT RAIPUR</span>
                <span>CENTRAL INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
