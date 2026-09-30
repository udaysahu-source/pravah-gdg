import React from 'react';
import { Code, Database, Cpu, Wrench, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsAndJourney: React.FC = () => {
  const categoryIcons: Record<string, any> = {
    LANGUAGES: Code,
    FRONTEND: Sparkles,
    'BACKEND & DATA': Database,
    TOOLS: Wrench,
    'AI & DOMAIN': Cpu,
  };

  return (
    <div id="about">
      {/* 22 & 25: WHO IS UDAY & TRUTHFUL METRICS (Light background #F4F2EC) */}
      <section className="py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Top Metadata */}
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500] mb-3">
            <span className="w-2 h-2 bg-[#FF4500]" />
            <span>[07] PERSONAL POSITIONING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-[#111111]/15">
            {/* Left: Concise Punchy Bio (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
                WHO IS UDAY?
              </h2>

              <div className="space-y-4 font-sans text-base sm:text-lg text-[#111111] leading-relaxed">
                <p className="font-semibold text-xl text-[#FF4500]">
                  CSE student. Developer. Builder. Problem solver.
                </p>
                <p className="text-[#111111]/85">
                  Based in <strong className="text-[#111111]">Raipur, Chhattisgarh</strong>. I am interested in building practical software products that turn real-world friction into working technology.
                </p>
                <p className="text-[#111111]/75 text-base">
                  Rather than collecting certificates or building cosmetic tutorial clones, I focus on software systems with authentic utility—offline transit verification, geospatial flood routing, attendance modeling, and heuristic security.
                </p>
              </div>

              {/* Core Interests Tag Pills */}
              <div className="pt-2">
                <div className="font-mono text-xs text-[#A7A39A] uppercase tracking-wider mb-2.5">
                  CORE INTEREST DOMAINS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Practical Software',
                    'AI & Computer Vision',
                    'Problem Solving',
                    'Open Source Systems',
                    'Product Engineering',
                    'Real-World Infrastructure',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-[#111111]/20 font-mono text-xs text-[#111111] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Truthful Personal Metrics (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs text-[#A7A39A] uppercase tracking-wider pb-1">
                TRUTHFUL PERSONAL METRICS (NO FABRICATION):
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PORTFOLIO_DATA.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-[#111111]/15 hover:border-[#FF4500] transition-colors"
                  >
                    <div className="font-display font-black text-4xl sm:text-5xl text-[#111111]">
                      {metric.number}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#FF4500] uppercase mt-1">
                      {metric.label}
                    </div>
                    <div className="font-sans text-[11px] text-[#A7A39A] mt-0.5">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/70 border border-[#111111]/10 font-mono text-[11px] text-[#111111]/70 leading-normal">
                <span className="text-[#FF4500] font-bold">● NOTE: </span>
                Every metric displayed reflects verified active builds and academic timelines. Zero inflated corporate claims.
              </div>
            </div>
          </div>

          {/* 24: SKILLS / TECHNICAL STACK (Light continued) */}
          <div className="pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                  // PRODUCTION CAPABILITIES
                </div>
                <h3 className="font-display font-black text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                  TECHNICAL STACK.
                </h3>
              </div>
              <div className="font-mono text-xs text-[#A7A39A] max-w-sm">
                Categorized by practical application. No arbitrary percentage bars (e.g. "95% Python").
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PORTFOLIO_DATA.skills.map((cat) => {
                const Icon = categoryIcons[cat.category] || Code;
                return (
                  <div
                    key={cat.category}
                    className="p-5 bg-white border border-[#111111]/15 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10 font-mono text-xs">
                        <span className="text-[#A7A39A] text-[10px]">{cat.tag}</span>
                        <Icon className="w-3.5 h-3.5 text-[#FF4500]" />
                      </div>

                      <h4 className="font-heading font-black text-sm text-[#111111] pt-3 pb-3 uppercase tracking-wider">
                        {cat.category}
                      </h4>

                      <div className="space-y-2">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-baseline justify-between text-xs py-1 border-b border-[#111111]/5"
                          >
                            <span className="font-medium text-[#111111]">{skill.name}</span>
                            <span className="font-mono text-[10px] text-[#A7A39A]">{skill.levelNote}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-2 font-mono text-[9px] text-[#A7A39A]">
                      PRACTICAL PROFICIENCY
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 26: BUILDING JOURNEY (Dark background #111111) */}
      <section className="py-24 lg:py-32 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#292929]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262626]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                <span className="w-2 h-2 bg-[#FF4500]" />
                <span>[08] TRAJECTORY</span>
              </div>
              <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
                BUILDING JOURNEY.
              </h2>
            </div>
            <div className="max-w-md font-sans text-sm text-[#A7A39A] leading-relaxed">
              Transparent timeline of academic training, hackathon prototyping, and community open-source preparation.
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {PORTFOLIO_DATA.journey.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#171717] border border-[#2b2b2b] hover:border-[#FF4500]/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                    <span className="font-display font-black text-2xl text-[#FF4500]">
                      {item.year}
                    </span>
                    <span className="px-2 py-0.5 bg-[#222222] text-[#A7A39A] text-[10px] uppercase font-bold border border-[#333333]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                    {item.title}
                  </h3>

                  <div className="font-mono text-xs text-[#FF4500]">
                    {item.institution}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 font-mono text-[10px] text-[#A7A39A] flex items-center justify-between border-t border-[#262626] mt-4">
                  <span>ACTIVE CYCLE</span>
                  <span className="text-[#FF4500]">↳ 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
