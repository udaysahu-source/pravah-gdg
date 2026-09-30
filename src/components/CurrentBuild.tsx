import React from 'react';
import { ArrowUpRight, Cpu, ShieldCheck, Layers } from 'lucide-react';
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
        {/* Top Editorial Metadata Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF4500] animate-pulse" />
            <span className="text-[#FF4500] font-bold">[{pravah.number}] {pravah.label}</span>
            <span className="text-[#A7A39A] hidden sm:inline">// REPOSITORY ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#A7A39A]">
            <span>LOC: {pravah.coordinates}</span>
            <span className="text-[#FF4500]">●</span>
            <span>{pravah.status}</span>
          </div>
        </div>

        {/* Section Heading & Subheading */}
        <div className="pt-10 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-9xl text-white uppercase tracking-tight leading-none">
              {pravah.title}
            </h2>
            <p className="font-heading text-xl sm:text-2xl text-[#FF4500] tracking-wide uppercase">
              {pravah.subheading}
            </p>
          </div>
          <div className="lg:col-span-4 font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
            {pravah.description}
          </div>
        </div>

        {/* Centerpiece: Full-Width Interactive PRAVAH System Console */}
        <div className="my-8">
          <div className="relative border border-[#333333] shadow-2xl">
            <PravahSimulation compact={false} />
          </div>
        </div>

        {/* Deep Dive Architecture & System Mechanics */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Core Engineering Pillars (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF4500] tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>CORE SYSTEM ARCHITECTURE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pravah.coreFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#171717] border border-[#2b2b2b] hover:border-[#FF4500]/50 transition-colors space-y-2"
                >
                  <div className="font-mono text-xs text-[#FF4500] font-bold">
                    [0{idx + 1}]
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase text-white tracking-wide">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#A7A39A] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Log & Tech Specs (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A7A39A] tracking-widest uppercase">
              <Cpu className="w-4 h-4 text-[#FF4500]" />
              <span>ENGINEERING SPECIFICATION</span>
            </div>

            <div className="p-6 bg-[#161616] border border-[#2b2b2b] space-y-5 font-mono text-xs">
              <div className="space-y-2 pb-4 border-b border-[#262626]">
                <div className="text-[10px] text-[#A7A39A]">PROBLEM CONTEXT</div>
                <p className="text-[#F4F2EC] leading-normal font-sans text-xs">
                  During urban monsoon inundations in Raipur, conventional GPS tools fail because they assume roadways remain traversable regardless of localized river basin surges.
                </p>
              </div>

              <div className="space-y-2 pb-4 border-b border-[#262626]">
                <div className="text-[10px] text-[#A7A39A]">TECHNOLOGY STACK</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pravah.technicalStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#202020] text-[#FF4500] border border-[#333333] text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <div className="text-[10px] text-[#A7A39A]">TARGET OUTCOME</div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                  <span>Deterministic safe passage routing during peak disaster windows</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/udaysahu-source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#FF4500] hover:bg-[#e03d00] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
                  data-cursor="GITHUB"
                >
                  <span>INSPECT PRAVAH ON GITHUB</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
