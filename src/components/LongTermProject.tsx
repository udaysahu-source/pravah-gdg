import React from 'react';
import { Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const LongTermProject: React.FC = () => {
  const wildlife = PORTFOLIO_DATA.wildlife;

  return (
    <section
      id="wildlife"
      className="relative py-24 lg:py-32 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF4500]" />
            <span className="text-[#FF4500] font-bold">[{wildlife.label}]</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#A7A39A]">
            <span>{wildlife.contextTag}</span>
            <span className="text-[#FF4500]">●</span>
            <span>ACADEMIC SEMESTER CYCLE</span>
          </div>
        </div>

        {/* Headline & Narrative */}
        <div className="pt-10 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-tight">
              {wildlife.title}
            </h2>
            <p className="font-heading text-lg sm:text-xl text-[#FF4500] uppercase tracking-wide">
              {wildlife.subheading}
            </p>
          </div>
          <div className="lg:col-span-4 font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
            {wildlife.narrative}
          </div>
        </div>

        {/* Central Display: Real Infrared Camera Trap Computer Vision Frame */}
        <div className="my-8 border border-[#333333] bg-[#0c0c0c] shadow-2xl relative overflow-hidden" data-cursor="INSPECT">
          <div className="relative aspect-[16/9] w-full">
            <img
              src={wildlife.image}
              alt="Nocturnal Infrared Camera Trap Frame with Leopard Detection Box"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Visual HUD Corner Markers */}
            <div className="absolute top-4 left-4 p-2.5 bg-[#111111]/90 backdrop-blur-xs border border-[#333333] font-mono text-[10px] space-y-0.5">
              <div className="text-[#FF4500] font-bold">STATION: CAM-TRAP-04</div>
              <div className="text-[#A7A39A]">BARNAWAPARA SANCTUARY, CHHATTISGARH</div>
              <div className="text-[#A7A39A]">PIR TRIGGER: 03:14:22 IST | BATT: 84%</div>
            </div>

            <div className="absolute bottom-4 right-4 p-2 bg-[#111111]/90 border border-[#333333] font-mono text-[10px] hidden sm:block">
              <span className="text-[#22c55e]">CLASS: Panthera pardus [0.974]</span>
            </div>
          </div>
        </div>

        {/* Computer Vision Pipeline Steps (4-stage flow) */}
        <div className="pt-10">
          <div className="font-mono text-xs text-[#FF4500] uppercase tracking-widest mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>DETECTION PIPELINE ARCHITECTURE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wildlife.pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#171717] border border-[#2b2b2b] hover:border-[#FF4500]/50 transition-colors space-y-2.5"
              >
                <div className="font-mono text-xs text-[#FF4500] font-bold">
                  {step.phase}
                </div>
                <p className="text-xs text-[#A7A39A] leading-relaxed font-sans">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Grounding Note */}
        <div className="mt-10 p-4 bg-[#181818] border border-[#292929] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#A7A39A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF4500]" />
            <span>PROJECT ETHOS: TRUTHFUL ACADEMIC EXPLORATION. NO FABRICATED BENCHMARKS.</span>
          </div>
          <span className="text-[11px] text-[#F4F2EC]">SSIPMT RAIPUR · B.TECH CSE</span>
        </div>
      </div>
    </section>
  );
};
