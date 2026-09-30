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
      className="relative py-28 lg:py-40 bg-[#111111] text-[#F4F2EC] bg-grid-dark border-b border-[#262626] overflow-hidden"
    >
      {/* Background Graphic Accent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF4500]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-start space-y-8 max-w-4xl">
          {/* Metadata pill */}
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
            <span className="w-2 h-2 bg-[#FF4500] animate-pulse" />
            <span>[10] DIRECT DISPATCH</span>
          </div>

          {/* Dramatic Headline */}
          <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[104px] text-white uppercase leading-[0.88] tracking-tight">
            <span className="block">LET'S BUILD</span>
            <span className="block text-[#FF4500]">SOMETHING</span>
            <span className="block">USEFUL.</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-lg sm:text-xl text-[#A7A39A] max-w-2xl leading-relaxed">
            Open to interesting projects, engineering collaborations, hackathons, and meaningful open-source opportunities.
          </p>

          {/* CTAs & Direct Contact */}
          <div className="pt-4 flex flex-wrap items-center gap-4 w-full">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF4500] hover:bg-[#e03d00] text-white font-mono text-sm uppercase tracking-widest font-bold transition-all duration-200 shadow-xl"
              data-cursor="TALK"
            >
              <Mail className="w-4 h-4" />
              <span>LET'S TALK ↗</span>
            </a>

            <button
              onClick={copyEmail}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-[#F4F2EC] border border-[#333333] font-mono text-xs uppercase tracking-wider font-semibold transition-all"
              data-cursor="COPY"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#A7A39A]" />}
              <span>{copied ? 'EMAIL COPIED' : PORTFOLIO_DATA.personal.email}</span>
            </button>
          </div>

          {/* Social Quick Bar */}
          <div className="pt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-[#A7A39A]">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB: {PORTFOLIO_DATA.personal.githubUser}</span>
            </a>

            <span className="text-[#333333]">•</span>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] flex items-center gap-2 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN: {PORTFOLIO_DATA.personal.linkedinUser}</span>
            </a>

            <span className="text-[#333333]">•</span>

            <span className="text-[#FF4500]">LOCATION: RAIPUR, INDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
