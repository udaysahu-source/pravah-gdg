import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const FinalCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-start space-y-8 max-w-4xl">
          {/* Metadata label */}
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
            <span className="w-2 h-2 bg-[#FF4500]" />
            <span>// DIRECT DISPATCH</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-white uppercase leading-[0.88] tracking-tight">
            <span className="block">LET'S BUILD</span>
            <span className="block text-[#FF4500]">SOMETHING</span>
            <span className="block">USEFUL.</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-lg sm:text-xl text-[#A7A39A] max-w-2xl leading-relaxed">
            Interested in building practical software, participating in hackathons, contributing to open source, or discussing technical problems.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4 w-full">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF4500] hover:bg-[#e03d00] text-white font-mono text-sm uppercase tracking-widest font-bold transition-all shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <Mail className="w-4 h-4" />
              <span>LET'S TALK ↗</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-[#F4F2EC] border border-[#333333] font-mono text-sm uppercase tracking-widest font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
            >
              <span>VIEW MY WORK ↗</span>
            </a>
          </div>

          {/* Explicit Contact Details Bar (Never Hidden) */}
          <div className="pt-6 w-full space-y-4 border-t border-[#262626]">
            <div className="font-mono text-xs text-[#A7A39A] uppercase tracking-wider">
              CONTACT & PROFILES:
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
              {/* Email + Copy button */}
              <div className="flex items-center gap-2 bg-[#181818] border border-[#2e2e2e] px-3.5 py-2">
                <Mail className="w-3.5 h-3.5 text-[#FF4500]" />
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-white hover:text-[#FF4500] transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-2 pl-2 border-l border-[#333333] text-[#A7A39A] hover:text-white transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#181818] border border-[#2e2e2e] px-3.5 py-2 text-white hover:text-[#FF4500] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB ↗</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#181818] border border-[#2e2e2e] px-3.5 py-2 text-white hover:text-[#FF4500] transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LINKEDIN ↗</span>
              </a>

              <span className="text-[#A7A39A] text-[11px] hidden md:inline">
                LOC: RAIPUR, INDIA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
