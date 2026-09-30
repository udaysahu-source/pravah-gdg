import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-[#F4F2EC] pt-16 pb-8 border-t border-[#222222] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Upper Navigation & Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#222222] items-start">
          {/* Identity (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#FF4500]" />
              <span className="font-heading font-black text-2xl uppercase tracking-wider text-white">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p className="font-mono text-xs text-[#A7A39A] tracking-wider">
              {PORTFOLIO_DATA.personal.role}
            </p>
            <p className="font-sans text-xs text-[#A7A39A]/80 max-w-sm leading-relaxed">
              Building practical software products, exploring open source, and turning real-world problems into working prototypes.
            </p>
            <div className="font-mono text-[11px] text-[#A7A39A]">
              RAIPUR, CHHATTISGARH, INDIA [21.2514° N, 81.6296° E]
            </div>
          </div>

          {/* Connect & Links (6 cols) */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF4500] flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB ↗</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF4500] flex items-center gap-1.5 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LINKEDIN ↗</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hover:text-[#FF4500] flex items-center gap-1.5 transition-colors"
              >
                <span>EMAIL ↗</span>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#161616] hover:bg-[#202020] text-[#A7A39A] hover:text-white border border-[#262626] transition-colors focus-visible:ring-2 focus-visible:ring-[#FF4500]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF4500]" />
            </button>
          </div>
        </div>

        {/* Lower Legal & Meta Strip */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#A7A39A]">
          <div>
            © 2026 UDAY SAHU · RAIPUR, INDIA
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] transition-colors"
            >
              GITHUB ↗
            </a>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] transition-colors"
            >
              LINKEDIN ↗
            </a>
            <span>•</span>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-[#FF4500] transition-colors"
            >
              EMAIL ↗
            </a>
          </div>
        </div>

        {/* Massive Editorial Wordmark Masthead */}
        <div className="pt-6 overflow-hidden select-none border-t border-[#1a1a1a]">
          <div className="font-display font-black text-[18vw] leading-[0.78] tracking-tighter text-[#1b1b1b] hover:text-[#222222] transition-colors text-center whitespace-nowrap uppercase translate-y-2">
            UDAY SAHU
          </div>
        </div>
      </div>
    </footer>
  );
};
