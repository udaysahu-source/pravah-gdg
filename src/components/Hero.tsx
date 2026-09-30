import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CornerDownRight, Crosshair } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [activeStatusId, setActiveStatusId] = useState<'building' | 'learning' | 'contributing'>('building');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Extremely subtle 4-8px mouse parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activeStatus = PORTFOLIO_DATA.heroStatus.find((s) => s.id === activeStatusId) || PORTFOLIO_DATA.heroStatus[0];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      {/* Decorative Top Coordinates Tape */}
      <div className="absolute top-20 right-8 lg:right-16 hidden md:flex items-center gap-4 font-mono text-[10px] text-[#A7A39A] tracking-widest border border-[#111111]/10 bg-[#F4F2EC]/80 px-3 py-1 z-20">
        <span>LOC: RAIPUR_CG [21.2514°N 81.6296°E]</span>
        <span className="text-[#FF4500]">●</span>
        <span>SYS_LOG: 2026.09</span>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Asymmetric 12-Column Grid (Desktop: Left ~55%, Right ~45%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Positioning (~55%)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7 z-20">
            {/* Identity Metadata Badge */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#111111]/80">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span className="font-bold">[ CSE STUDENT · DEVELOPER · BUILDER ]</span>
            </div>

            {/* Massive Display Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.88] tracking-tight text-[#111111] uppercase select-none">
                <span className="block">I BUILD</span>
                <span className="block text-[#111111]">THINGS THAT</span>
                <span className="block text-[#FF4500]">SHOULD EXIST.</span>
              </h1>
            </div>

            {/* Mobile Portrait Injection (renders under headline on mobile only) */}
            <div className="block lg:hidden my-2 relative w-[80vw] max-w-[340px] mx-auto">
              <div className="relative aspect-[4/5] w-full">
                <div className="absolute inset-0 bg-radial from-[#FF4500]/15 to-transparent rounded-full filter blur-xl pointer-events-none" />
                <img
                  src="/assets/uday_portrait_transparent.png"
                  alt="Uday Sahu — Developer & Builder"
                  className="w-full h-full object-contain filter contrast-[1.03] drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)]"
                  loading="eager"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#111111] text-[#F4F2EC] font-mono text-[9px] border border-[#2b2b2b]">
                  [01] UDAY SAHU · RAIPUR
                </div>
              </div>
            </div>

            {/* Position Statement */}
            <div className="space-y-2.5 max-w-xl">
              <p className="font-sans text-base sm:text-lg text-[#111111] font-medium leading-relaxed">
                {PORTFOLIO_DATA.personal.supportingTagline}
              </p>
              <p className="font-mono text-xs text-[#111111]/70 tracking-wide border-l-2 border-[#FF4500] pl-3 py-0.5">
                {PORTFOLIO_DATA.personal.subText}
              </p>
            </div>

            {/* Status Interactive Strip */}
            <div className="pt-1">
              <div className="font-mono text-[11px] text-[#A7A39A] mb-2 tracking-wider">
                CURRENT OPERATIONAL STATE:
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.heroStatus.map((status) => {
                  const isCurrent = activeStatusId === status.id;
                  return (
                    <button
                      key={status.id}
                      onClick={() => setActiveStatusId(status.id as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs border transition-all ${
                        isCurrent
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                          : 'bg-white/80 text-[#111111]/70 border-[#111111]/20 hover:border-[#111111]'
                      }`}
                      data-cursor="TOGGLE"
                    >
                      <span
                        className={`w-2 h-2 ${
                          isCurrent ? 'bg-[#FF4500] animate-pulse' : 'bg-transparent border border-[#A7A39A]'
                        }`}
                      />
                      <span className="font-bold">{status.label}</span>
                      <span className="text-[#A7A39A] text-[10px]">[{status.value}]</span>
                    </button>
                  );
                })}
              </div>

              {/* Status explanation card */}
              <div className="mt-2.5 p-2.5 bg-white/75 border border-[#111111]/10 text-xs font-mono flex items-center justify-between text-[#111111]/80 max-w-lg">
                <span className="text-[#FF4500] font-bold mr-2">↳</span>
                <span className="flex-1">{activeStatus.detail}</span>
                <span className="text-[10px] text-[#A7A39A] ml-2">2026 SPRINT</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#111111] text-[#F4F2EC] hover:bg-[#FF4500] hover:text-white border border-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 shadow-sm"
                data-cursor="WORK"
              >
                <span>VIEW MY WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F4F2EC] border border-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200"
                data-cursor="CONTACT"
              >
                <span>LET'S TALK</span>
                <CornerDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Technical Annotation Footnote */}
            <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-[11px] text-[#A7A39A] border-t border-[#111111]/10">
              <div>BUILD 001 // SSIPMT RAIPUR</div>
              <div>OPEN SOURCE // EXPLORING</div>
              <div>DSA // ACTIVE REPO</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Real Portrait Visual Anchor (~45%)          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 hidden lg:block relative select-none">
            {/* Ambient Subtle Warm Glow Behind Portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[480px] bg-gradient-to-tr from-[#FF4500]/10 via-[#FF4500]/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

            {/* Main Portrait Container with Subtle Mouse Parallax */}
            <div
              className="relative transition-transform duration-300 ease-out group"
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              }}
              data-cursor="UDAY"
            >
              {/* Technical Geometric Overlay Marks (Layered around, never covering face) */}
              <div
                className="absolute -top-6 -left-6 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] px-3 py-1 flex items-center gap-2 shadow-md transition-transform duration-500 group-hover:-translate-x-1"
                style={{ transform: `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)` }}
              >
                <Crosshair className="w-3 h-3 text-[#FF4500]" />
                <span>[01] UDAY SAHU</span>
                <span className="text-[#A7A39A]">· CSE / BUILDER</span>
              </div>

              <div
                className="absolute top-1/3 -right-6 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-2 shadow-md transition-transform duration-500 group-hover:translate-x-1"
                style={{ transform: `translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px, 0)` }}
              >
                <div className="text-[#FF4500] font-bold">RAIPUR // INDIA</div>
                <div className="text-[#A7A39A] text-[9px]">21.2514° N, 81.6296° E</div>
              </div>

              <div
                className="absolute -bottom-6 -left-4 z-20 font-mono text-[10px] bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] px-3 py-1.5 shadow-md flex items-center gap-2.5"
                style={{ transform: `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0)` }}
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span>STATUS: BUILDING</span>
                <span className="text-[#A7A39A]">/ 2026 SPRINT</span>
              </div>

              <div
                className="absolute bottom-10 -right-4 z-20 font-mono text-[10px] border border-[#FF4500] bg-[#111111] text-[#FF4500] px-2.5 py-0.5 font-bold shadow-sm"
              >
                BUILD 001
              </div>

              {/* The Actual Transparent Silhouette Portrait */}
              <div className="relative z-10 overflow-visible transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <img
                  src="/assets/uday_portrait_transparent.png"
                  alt="Uday Sahu — Portrait Photograph"
                  className="w-full h-auto max-h-[640px] object-contain filter contrast-[1.04] drop-shadow-[0_24px_36px_rgba(0,0,0,0.18)]"
                  loading="eager"
                />
              </div>

              {/* Ambient Technical Coordinate Footnotes */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#A7A39A]">
                <span>[IDENTITY: UDAY SAHU]</span>
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
