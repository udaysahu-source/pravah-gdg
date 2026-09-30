import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>[09] CLARIFICATIONS</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl text-[#111111] uppercase tracking-tight">
              FREQUENT INQUIRIES.
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed">
            Straight answers about my engineering focus, ongoing builds, and technical trajectory.
          </div>
        </div>

        {/* Editorial Accordion */}
        <div className="pt-10 max-w-4xl mx-auto space-y-4">
          {PORTFOLIO_DATA.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-[#111111]/15 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 transition-colors hover:bg-[#F4F2EC]/40"
                  aria-expanded={isOpen}
                  data-cursor="EXPAND"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#FF4500] font-bold">
                      [0{idx + 1}]
                    </span>
                    <span className="font-heading font-black text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                      {faq.question}
                    </span>
                  </div>

                  <div className="p-1 border border-[#111111]/20 text-[#111111]">
                    {isOpen ? <Minus className="w-4 h-4 text-[#FF4500]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 font-sans text-sm sm:text-base text-[#111111]/80 leading-relaxed border-t border-[#111111]/10 animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#FF4500] font-bold mt-1">↳</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
