import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Journey: React.FC = () => {
  const milestones = PORTFOLIO_DATA.journey;

  return (
    <section
      id="journey"
      className="py-24 lg:py-32 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262626]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>[06] BUILDING JOURNEY</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
              KEY MILESTONES.
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
            Meaningful milestones and active commitments across hackathons, core builds, open source, and algorithmic problem solving.
          </div>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#161616] border border-[#2b2b2b] hover:border-[#FF4500]/60 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                  <span className="font-display font-black text-3xl text-[#FF4500]">
                    {item.period}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#202020] text-[#A7A39A] text-[10px] uppercase font-bold border border-[#333333]">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                    {item.tag}
                  </h3>
                  <div className="font-mono text-xs text-[#FF4500]">
                    {item.subtitle}
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] font-mono text-[10px] text-[#A7A39A] flex items-center justify-between">
                <span>MILESTONE 0{idx + 1}</span>
                <span className="text-[#FF4500] font-bold">↳ ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
