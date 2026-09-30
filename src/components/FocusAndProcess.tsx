import React, { useState } from 'react';
import { Eye, Compass, Hammer, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const FocusAndProcess: React.FC = () => {
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const processIcons = [Eye, Compass, Hammer, RefreshCw];

  return (
    <div id="focus-process">
      {/* 21: CURRENT FOCUS (Light background #F4F2EC) */}
      <section className="py-20 lg:py-28 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/20">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                <span className="w-2 h-2 bg-[#FF4500]" />
                <span>[05] CURRENT HORIZONS</span>
              </div>
              <h2 className="font-display font-black text-5xl sm:text-6xl text-[#111111] uppercase tracking-tight">
                CURRENTLY FOCUSED ON.
              </h2>
            </div>
            <div className="max-w-md font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed">
              Targeted areas of technical growth and practical execution throughout 2026.
            </div>
          </div>

          {/* 4 Focus Cards in Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {PORTFOLIO_DATA.focusAreas.map((item) => {
              return (
                <div
                  key={item.number}
                  className="group bg-white border border-[#111111]/15 p-6 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between"
                  data-cursor="FOCUS"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#111111]/10">
                      <span className="text-[#FF4500] font-bold">[{item.number}]</span>
                      <span className="px-2 py-0.5 bg-[#F4F2EC] text-[#111111]/70 text-[10px] uppercase font-semibold">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-2xl text-[#111111] group-hover:text-[#FF4500] transition-colors uppercase">
                      {item.title}
                    </h3>

                    <p className="font-sans text-sm text-[#111111]/85 font-medium leading-normal">
                      {item.description}
                    </p>

                    <p className="font-sans text-xs text-[#111111]/60 leading-relaxed pt-2 border-t border-[#111111]/10">
                      {item.details}
                    </p>
                  </div>

                  <div className="pt-6 font-mono text-[10px] text-[#A7A39A] flex items-center justify-between">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-[#FF4500]">↳ 2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 23: PROCESS — HOW I BUILD (Dark background #111111) */}
      <section className="py-24 lg:py-32 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262626]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                <span className="w-2 h-2 bg-[#FF4500]" />
                <span>[06] ENGINEERING PHILOSOPHY</span>
              </div>
              <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
                HOW I BUILD.
              </h2>
            </div>
            <div className="max-w-md font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
              No corporate agency theatre. A grounded, repeatable sequence from problem observation to hardened prototypes.
            </div>
          </div>

          {/* Interactive Process Pipeline: 4 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12">
            {PORTFOLIO_DATA.process.map((step, idx) => {
              const isSelected = activeProcessStep === idx;
              const Icon = processIcons[idx];

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`text-left p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181818] border-[#FF4500] shadow-xl translate-y-[-4px]'
                      : 'bg-[#141414] border-[#292929] hover:border-[#444444]'
                  }`}
                  data-cursor="STEP"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                      <span className={`font-bold ${isSelected ? 'text-[#FF4500]' : 'text-[#A7A39A]'}`}>
                        [{step.number}]
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF4500]' : 'text-[#A7A39A]'}`} />
                    </div>

                    <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wide">
                      {step.title}
                    </h3>

                    <div className="font-mono text-xs text-[#FF4500]">
                      {step.description}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
                      {step.details}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#262626] font-sans text-xs italic text-[#A7A39A]">
                    "{step.quote}"
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
