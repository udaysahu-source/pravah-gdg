import React from 'react';
import { Eye, Search, Hammer, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const FocusAndProcess: React.FC = () => {
  const processSteps = PORTFOLIO_DATA.process;
  const icons = [Eye, Search, Hammer, RefreshCw];

  return (
    <section
      id="how-i-build"
      className="py-24 lg:py-32 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262626]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>// ENGINEERING METHODOLOGY</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
              HOW I BUILD.
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
            A grounded, repeatable approach to turning ground-level friction into functional software.
          </div>
        </div>

        {/* 4 Process Steps: OBSERVE, EXPLORE, BUILD, ITERATE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {processSteps.map((step, idx) => {
            const Icon = icons[idx];

            return (
              <div
                key={step.number}
                className="p-6 bg-[#161616] border border-[#292929] hover:border-[#FF4500]/60 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                    <span className="text-[#FF4500] font-bold">[{step.number}]</span>
                    <Icon className="w-4 h-4 text-[#A7A39A]" />
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wide">
                    {step.title}
                  </h3>

                  <div className="font-mono text-xs text-[#FF4500] leading-snug">
                    {step.tagline}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#A7A39A] leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262626] font-mono text-[10px] text-[#A7A39A]/70 uppercase">
                  DISCIPLINE {step.number} / 04
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
