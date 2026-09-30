import React, { useState } from 'react';
import { ArrowUpRight, Terminal, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { LearningTopic } from '../data/portfolioData';
import activityData from '../data/dsaActivity.json';

export const Learning: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('arrays');

  const learningData = PORTFOLIO_DATA.learning;
  const topics = learningData.topics;
  const profiles = learningData.profiles;

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <section
      id="learning"
      className="relative py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>[04] {learningData.label}</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
              {learningData.title}.
            </h2>
            <div className="font-heading text-xl sm:text-2xl text-[#111111] font-black uppercase">
              PRIMARY FOCUS: <span className="text-[#FF4500]">{learningData.primary}</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#111111]/85 max-w-xl leading-relaxed">
              {learningData.supportingText}
            </p>
          </div>
          <div className="max-w-md font-mono text-xs text-[#111111]/70 leading-relaxed border-l-2 border-[#FF4500] pl-4 py-1">
            These topics represent CURRENT PRACTICE — not a finished curriculum or arbitrary mastery percentages. Click any topic to inspect working notes.
          </div>
        </div>

        {/* 2-Column Notebook: Left Current Practice Topics (5 cols) + Right Technical Notes (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-12 items-start">
          
          {/* LEFT: Current Practice Topics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#111111]/10">
              <span className="font-mono text-xs text-[#111111] font-bold uppercase tracking-wider">
                CURRENT PRACTICE TOPICS
              </span>
              <span className="font-mono text-[10px] text-[#A7A39A]">
                ACTIVE DRILLS
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {topics.map((t: LearningTopic) => {
                const isSelected = selectedTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTopicId(t.id)}
                    className={`group text-left p-3.5 border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#111111] text-[#F4F2EC] border-[#111111] shadow-md translate-x-1'
                        : 'bg-white/80 text-[#111111] border-[#111111]/15 hover:border-[#111111] hover:bg-white'
                    } focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? 'text-[#FF4500]' : 'text-[#A7A39A]'
                        }`}
                      >
                        [{t.step}]
                      </span>
                      <span className="font-heading font-black text-base sm:text-lg tracking-wide uppercase">
                        {t.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      {isSelected ? (
                        <span className="text-[#FF4500] font-bold">ACTIVE NOTE ↳</span>
                      ) : (
                        <span className="text-[#A7A39A] group-hover:text-[#111111]">INSPECT</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Topic Working Notes & Code Inspection */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-[#FF4500]" />
                  <span className="font-heading font-black text-2xl uppercase tracking-wide text-white">
                    [{activeTopic.step}] {activeTopic.title}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 font-mono text-[10px] bg-[#1a1a1a] text-[#A7A39A] border border-[#333333]">
                  C++20 PRACTICE
                </span>
              </div>

              {/* Concept Summary */}
              <div className="space-y-2">
                <div className="font-mono text-[11px] text-[#FF4500] uppercase tracking-wider font-semibold">
                  STUDY CONTEXT & OBJECTIVE
                </div>
                <p className="font-sans text-sm sm:text-base text-[#F4F2EC]/90 leading-relaxed">
                  {activeTopic.summary}
                </p>
              </div>

              {/* Code Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#A7A39A]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF4500]" />
                    <span>C++ IMPLEMENTATION PATTERN</span>
                  </span>
                  <span className="text-[#A7A39A] text-[10px]">{activeTopic.complexity}</span>
                </div>
                <div className="p-4 bg-[#0a0a0a] border border-[#262626] font-mono text-xs text-[#F4F2EC] overflow-x-auto leading-relaxed">
                  <pre className="whitespace-pre font-mono">{activeTopic.codeSnippet}</pre>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="p-4 bg-[#181818] border-l-2 border-[#FF4500] space-y-1">
                <div className="font-mono text-[10px] text-[#FF4500] font-bold uppercase tracking-wider">
                  CORE INVARIANT
                </div>
                <p className="font-sans text-xs sm:text-sm text-white italic">
                  "{activeTopic.keyTakeaway}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PLATFORM PROFILES: LeetCode · Codeforces · GeeksforGeeks  */}
        {/* ========================================================= */}
        <div className="pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#111111]/20">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                // PLATFORM PROFILES
              </div>
              <h3 className="font-display font-black text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                WHERE I PRACTICE.
              </h3>
            </div>
            <div className="font-mono text-xs text-[#A7A39A]">
              Verified public problem-solving profiles and handles.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {profiles.map((prof, idx) => (
              <a
                key={prof.platform}
                href={prof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-6 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                    <span className="text-[#FF4500] font-bold">[0{idx + 1}]</span>
                    <span className="px-2 py-0.5 bg-[#1f1f1f] text-[#A7A39A] text-[10px] uppercase font-semibold border border-[#333333]">
                      VERIFIED PROFILE
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-black text-2xl text-white uppercase tracking-wide group-hover:text-[#FF4500] transition-colors">
                      {prof.platform}
                    </h4>
                    <div className="font-mono text-sm text-[#FF4500] font-bold">
                      {prof.username}
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#A7A39A] leading-relaxed pt-1">
                    {prof.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between font-mono text-xs">
                  <span className="text-white group-hover:text-[#FF4500] transition-colors font-bold">
                    VIEW PROFILE ↗
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RESILIENT ACTIVITY TELEMETRY & SYNC STATUS                */}
        {/* ========================================================= */}
        <div className="pt-14">
          <div className="p-6 sm:p-8 bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#FF4500]" />
                <span className="font-heading font-black text-xl text-white uppercase tracking-wider">
                  ACTIVITY DATA
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[#A7A39A]">
                <Clock className="w-3.5 h-3.5 text-[#FF4500]" />
                <span>Last synchronized: {activityData.lastSync}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="font-mono text-xs text-[#FF4500] uppercase font-bold tracking-wider">
                  EXTERNAL TELEMETRY ARCHITECTURE
                </div>
                <p className="font-sans text-sm text-[#A7A39A] leading-relaxed">
                  Coding platform statistics are archived from verified profile sources and cached. Direct client-side web scraping is strictly avoided to preserve page load speed, prevent rate-limiting failures, and ensure the portfolio renders reliably under all network conditions.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2 font-mono text-xs">
                <a
                  href="https://leetcode.com/u/udaysahu_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#181818] hover:bg-[#222222] text-[#F4F2EC] hover:text-[#FF4500] border border-[#2b2b2b] flex items-center justify-between transition-colors"
                >
                  <span>VIEW LEETCODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://codeforces.com/profile/udaysahu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#181818] hover:bg-[#222222] text-[#F4F2EC] hover:text-[#FF4500] border border-[#2b2b2b] flex items-center justify-between transition-colors"
                >
                  <span>VIEW CODEFORCES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.geeksforgeeks.org/profile/udaysahuuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#181818] hover:bg-[#222222] text-[#F4F2EC] hover:text-[#FF4500] border border-[#2b2b2b] flex items-center justify-between transition-colors"
                >
                  <span>VIEW GFG</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
