import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const about = PORTFOLIO_DATA.about;
  const wildlife = about.longTermProject;

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500] mb-4">
          <span className="w-2 h-2 bg-[#FF4500]" />
          <span>{about.label}</span>
        </div>

        {/* Top Grid: Bio & Current Direction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#111111]/15">
          {/* Left Column: Personal Positioning (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
              {about.heading}
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-[#111111] leading-relaxed">
              <p className="font-heading font-black text-xl sm:text-2xl text-[#FF4500] uppercase">
                {about.lead}
              </p>
              {about.bio.map((para, idx) => (
                <p key={idx} className="text-[#111111]/85">
                  {para}
                </p>
              ))}
            </div>

            {/* Current Direction Checklist */}
            <div className="pt-4">
              <div className="font-mono text-xs text-[#A7A39A] uppercase tracking-wider mb-3">
                CURRENT DIRECTION:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {about.currentDirection.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-3 bg-white/80 border border-[#111111]/15 text-[#111111]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FF4500]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Profile Card & Context (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-[#111111]/15 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10 font-mono text-xs">
                <span className="text-[#FF4500] font-bold">IDENTITY SNAPSHOT</span>
                <span className="text-[#A7A39A]">RAIPUR // 2026</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-[#A7A39A]">NAME</div>
                  <div className="text-[#111111] font-bold text-sm">UDAY SAHU</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#A7A39A]">EDUCATION</div>
                  <div className="text-[#111111] font-medium">B.Tech Computer Science & Engineering</div>
                  <div className="text-[#A7A39A] text-[11px]">SSIPMT Raipur, Chhattisgarh</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#A7A39A]">PRIMARY TOOLS</div>
                  <div className="text-[#111111] font-medium">C++ · TypeScript · React · Next.js · Python</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#A7A39A]">CURRENT WORK</div>
                  <div className="text-[#FF4500] font-bold">PRAVAH (Flood Route Intelligence)</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#111111]/10 font-mono text-[11px] text-[#111111]/70 leading-relaxed">
                Ambitious, honest, and focused on building real things that solve tangible problems.
              </div>
            </div>
          </div>
        </div>

        {/* Long-Term Project: Wildlife Animal Detection Using Camera Trap Images */}
        <div className="pt-16">
          <div className="p-6 sm:p-8 bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#262626]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-[#FF4500]" />
                <span className="font-mono text-xs text-[#FF4500] uppercase font-bold tracking-wider">
                  LONG-TERM PROJECT
                </span>
              </div>
              <span className="font-mono text-xs text-[#A7A39A]">
                {wildlife.type}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                  {wildlife.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#A7A39A] leading-relaxed">
                  {wildlife.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">DOMAIN</div>
                    <div className="text-white font-bold mt-0.5">Computer Vision</div>
                  </div>
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">CHALLENGE</div>
                    <div className="text-[#FF4500] font-bold mt-0.5">Nocturnal Infrared Feeds</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-[#333333] overflow-hidden bg-black shadow-lg relative aspect-[16/10]">
                  <img
                    src={wildlife.image}
                    alt="Camera trap frame with animal detection box"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={500}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#111111]/90 font-mono text-[9px] text-[#A7A39A] border border-[#333333]">
                    CAM-TRAP // INFRARED NOCTURNAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
