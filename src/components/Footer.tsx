import React from 'react';
import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-[#F4F2EC] pt-20 pb-8 border-t border-[#222222] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Upper Navigation & Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#222222] items-start">
          {/* Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
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
              Engineering practical software, investigating algorithmic mechanics, and building systems designed for tangible ground-level utility.
            </p>
            <div className="font-mono text-[11px] text-[#A7A39A] flex items-center gap-2 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
              <span>{PORTFOLIO_DATA.personal.location} [{PORTFOLIO_DATA.personal.coordinates}]</span>
            </div>
          </div>

          {/* Quick Index Links (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[10px] text-[#FF4500] uppercase tracking-widest font-bold">
              // INDEX ARCHIVE
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#A7A39A]">
              <a href="#hero" className="hover:text-white transition-colors">[01] HOME</a>
              <a href="#work" className="hover:text-white transition-colors">[02] SELECTED WORK</a>
              <a href="#pravah" className="hover:text-white transition-colors">[03] PRAVAH</a>
              <a href="#learning" className="hover:text-white transition-colors">[04] DSA C++</a>
              <a href="#wildlife" className="hover:text-white transition-colors">[05] CAMERA TRAP</a>
              <a href="#about" className="hover:text-white transition-colors">[06] ABOUT</a>
            </div>
          </div>

          {/* Connect & Top Action (3 cols) */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs">
            <div className="text-[10px] text-[#FF4500] uppercase tracking-widest font-bold">
              // COMM DISPATCH
            </div>
            <div className="space-y-2 text-[#A7A39A]">
              <div>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#FF4500]" />
                </a>
              </div>
              <div>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#FF4500]" />
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="hover:text-white flex items-center justify-between transition-colors group"
                >
                  <span>EMAIL DISPATCH</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#FF4500]" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#161616] hover:bg-[#202020] text-[#A7A39A] hover:text-white border border-[#262626] transition-colors"
                data-cursor="TOP"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#FF4500]" />
              </button>
            </div>
          </div>
        </div>

        {/* Lower Legal & Meta Strip */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#A7A39A]/60">
          <div>© {PORTFOLIO_DATA.personal.year} {PORTFOLIO_DATA.personal.name}. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-3">
            <span>EDITORIAL BRUTALISM</span>
            <span>•</span>
            <span className="text-[#FF4500]">ORIGINAL SYSTEM IDENTITY</span>
          </div>
        </div>

        {/* Massive Cropped Editorial Wordmark Masthead */}
        <div className="pt-8 overflow-hidden select-none border-t border-[#1a1a1a]">
          <div className="font-display font-black text-[18vw] sm:text-[19vw] leading-[0.78] tracking-tighter text-[#1f1f1f] hover:text-[#262626] transition-colors text-center whitespace-nowrap uppercase translate-y-3">
            UDAY SAHU
          </div>
        </div>
      </div>
    </footer>
  );
};
