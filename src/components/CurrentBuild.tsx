import React from 'react';
import { ArrowUpRight, AlertTriangle, Lightbulb, GitBranch, Layers, Activity, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PravahSimulation } from './PravahSimulation';

export const CurrentBuild: React.FC = () => {
  const pravah = PORTFOLIO_DATA.pravah;

  return (
    <section
      id="pravah"
      className="relative py-24 lg:py-36 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Header Banner: Section Number & Truthful Build Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF4500] animate-pulse" />
            <span className="text-[#FF4500] font-bold">[{pravah.number}] {pravah.label}</span>
            <span className="text-[#A7A39A] hidden sm:inline">// CURRENT BUILD</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="px-2.5 py-0.5 bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/30 font-bold">
              {pravah.status}
            </span>
            <span className="text-[#A7A39A]">RAIPUR, INDIA</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="pt-10 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-9xl text-white uppercase tracking-tight leading-none">
              {pravah.title}
            </h2>
            <p className="font-heading text-xl sm:text-2xl text-[#FF4500] tracking-wide uppercase">
              {pravah.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
            {pravah.tagline}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6-Part Narrative Flow                                      */}
        {/* ========================================================= */}
        <div className="space-y-12">
          
          {/* 01 & 02: THE PROBLEM & THE IDEA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 01 / THE PROBLEM */}
            <div className="p-6 sm:p-8 bg-[#161616] border border-[#2b2b2b] space-y-4">
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                <span className="text-[#FF4500] font-bold">[01]</span>
                <span className="text-[#A7A39A] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF4500]" />
                  THE PROBLEM
                </span>
              </div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                Static Navigation Fails During Monsoon Floods
              </h3>
              <p className="font-sans text-sm text-[#A7A39A] leading-relaxed">
                {pravah.problem}
              </p>
            </div>

            {/* 02 / THE IDEA */}
            <div className="p-6 sm:p-8 bg-[#161616] border border-[#2b2b2b] space-y-4">
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                <span className="text-[#FF4500] font-bold">[02]</span>
                <span className="text-[#A7A39A] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#22c55e]" />
                  THE IDEA
                </span>
              </div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                Dynamic Elevation-Aware Routing Weights
              </h3>
              <p className="font-sans text-sm text-[#A7A39A] leading-relaxed">
                {pravah.idea}
              </p>
            </div>
          </div>

          {/* 03: ROUTE INTELLIGENCE */}
          <div className="p-6 sm:p-8 bg-[#161616] border border-[#2b2b2b] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
              <span className="text-[#FF4500] font-bold">[03]</span>
              <span className="text-[#A7A39A] flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[#38bdf8]" />
                ROUTE INTELLIGENCE
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                  Depth-Weighted Graph Traversal
                </h3>
                <p className="font-sans text-sm text-[#A7A39A] leading-relaxed">
                  {pravah.routeIntelligence}
                </p>
              </div>
              <div className="lg:col-span-4 p-4 bg-[#0e0e0e] border border-[#262626] font-mono text-xs space-y-2">
                <div className="text-[10px] text-[#FF4500] font-bold uppercase">ALGORITHM DIRECTIVE</div>
                <div className="text-[#F4F2EC] text-[11px] leading-relaxed">
                  Edge Cost = Base_Distance × (1 + Inundation_Penalty)
                </div>
                <div className="text-[#A7A39A] text-[10px]">
                  Submerged segments (depth &gt; safety limit) have edge weights set to infinity, forcing safe corridor bypasses.
                </div>
              </div>
            </div>
          </div>

          {/* 04: TECHNICAL ARCHITECTURE */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF4500] uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>[04] TECHNICAL ARCHITECTURE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pravah.architecture.map((item) => (
                <div
                  key={item.step}
                  className="p-5 bg-[#171717] border border-[#2b2b2b] hover:border-[#FF4500]/50 transition-colors space-y-2"
                >
                  <div className="font-mono text-xs text-[#FF4500] font-bold">
                    [{item.step}]
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase text-white tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#A7A39A] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 05: CURRENT PROTOTYPE (Interactive GIS Console) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF4500] uppercase tracking-widest">
                <Activity className="w-4 h-4" />
                <span>[05] CURRENT PROTOTYPE · INTERACTIVE CONSOLE</span>
              </div>
              <span className="font-mono text-[11px] text-[#A7A39A]">
                SIMULATE ROUTE ADAPTATION IN RAIPUR SECTOR
              </span>
            </div>

            <div className="relative border border-[#333333] shadow-2xl">
              <PravahSimulation compact={false} />
            </div>
          </div>

          {/* 06: WHAT COMES NEXT */}
          <div className="p-6 sm:p-8 bg-[#161616] border border-[#2b2b2b] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="font-mono text-xs text-[#FF4500] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>[06] WHAT COMES NEXT</span>
              </div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                Ground Validation & Low-Bandwidth Packets
              </h3>
              <p className="font-sans text-sm text-[#A7A39A] leading-relaxed">
                {pravah.nextSteps}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <a
                href="https://github.com/udaysahu-source"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#FF4500] hover:bg-[#e03d00] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-md"
              >
                <span>VIEW BUILD ON GITHUB</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
