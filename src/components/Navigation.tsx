import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'hero', number: '01', label: 'HOME' },
    { id: 'work', number: '02', label: 'WORK' },
    { id: 'pravah', number: '03', label: 'PRAVAH' },
    { id: 'learning', number: '04', label: 'LEARNING' },
    { id: 'about', number: '05', label: 'ABOUT' },
    { id: 'contact', number: '06', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#F4F2EC]/90 backdrop-blur-md border-b border-[#111111]/15 shadow-sm'
            : 'py-6 bg-[#F4F2EC]/75 backdrop-blur-sm border-b border-[#111111]/10'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="group flex items-center gap-3 text-[#111111] hover:text-[#FF4500] transition-colors"
            data-cursor="UDAY"
          >
            <span className="w-2.5 h-2.5 rounded-none bg-[#FF4500] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-wider text-base sm:text-lg uppercase">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="font-mono text-[10px] text-[#111111]/60 tracking-widest hidden sm:inline-block">
                RAIPUR // 21.25°N 81.63°E
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs tracking-wider" aria-label="Main Navigation">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`group relative py-1 transition-colors ${
                    isActive ? 'text-[#FF4500] font-semibold' : 'text-[#111111]/70 hover:text-[#111111]'
                  }`}
                  data-cursor="GO"
                >
                  <span className="text-[10px] text-[#A7A39A] group-hover:text-[#FF4500] mr-1.5 transition-colors">
                    [{link.number}]
                  </span>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4500]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Contact CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#F4F2EC] hover:bg-[#FF4500] hover:text-white border border-[#111111] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
              data-cursor="TALK"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] hover:text-[#FF4500] border border-[#111111]/20 bg-white/40"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Editorial Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#111111] text-[#F4F2EC] flex flex-col justify-between p-8 pt-28 animate-fadeIn md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top metadata badge */}
          <div className="flex items-center justify-between border-b border-[#333333] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A7A39A]">
              <span className="w-2 h-2 bg-[#FF4500] animate-pulse" />
              <span>NAVIGATION DIRECTORY</span>
            </div>
            <span className="font-mono text-xs text-[#A7A39A]">[2026 // RAIPUR]</span>
          </div>

          {/* Links list with dramatic typography */}
          <div className="flex flex-col gap-5 my-8">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="group text-left flex items-baseline justify-between border-b border-[#222222] pb-3"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#FF4500]">[{link.number}]</span>
                  <span className="font-display text-4xl font-black tracking-wide group-hover:text-[#FF4500] group-hover:translate-x-2 transition-all">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A7A39A] group-hover:text-[#FF4500] transition-colors" />
              </button>
            ))}
          </div>

          {/* Bottom metadata info */}
          <div className="pt-6 border-t border-[#333333] space-y-4">
            <div className="font-mono text-xs text-[#A7A39A] flex items-center justify-between">
              <span>UDAY SAHU · SSIPMT RAIPUR</span>
              <span className="text-[#FF4500]">STATUS: BUILDING</span>
            </div>
            <a
              href="mailto:udaysahu.in@gmail.com"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF4500] text-white font-mono text-sm tracking-widest font-bold uppercase hover:bg-[#e03d00]"
            >
              <span>SEND DISPATCH ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
