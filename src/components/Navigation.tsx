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
      setIsScrolled(window.scrollY > 30);
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
    { id: 'journey', number: '06', label: 'JOURNEY' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#F4F2EC]/90 backdrop-blur-md border-b border-[#111111]/15 shadow-sm'
            : 'py-5 bg-[#F4F2EC]/80 backdrop-blur-sm border-b border-[#111111]/10'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="group flex items-center gap-2.5 text-[#111111] hover:text-[#FF4500] transition-colors focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
            aria-label="Uday Sahu Portfolio Home"
          >
            <span className="w-2.5 h-2.5 bg-[#FF4500] transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-wider text-base sm:text-lg uppercase">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="font-mono text-[9px] text-[#111111]/60 tracking-widest hidden sm:inline-block">
                RAIPUR // 21.25°N 81.63°E
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (All 6 sections) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 font-mono text-xs tracking-wider" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`group relative py-1 transition-colors ${
                    isActive ? 'text-[#FF4500] font-bold' : 'text-[#111111]/70 hover:text-[#111111]'
                  } focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none`}
                >
                  <span className={`text-[10px] mr-1.5 transition-colors ${isActive ? 'text-[#FF4500]' : 'text-[#A7A39A] group-hover:text-[#FF4500]'}`}>
                    [{link.number}]
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4500]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#F4F2EC] hover:bg-[#FF4500] hover:text-white border border-[#111111] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:text-[#FF4500] border border-[#111111]/20 bg-white/60 focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Clean Mobile Menu Slide-down Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#111111] text-[#F4F2EC] flex flex-col justify-between p-6 sm:p-8 pt-24 lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A7A39A]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>NAVIGATION DIRECTORY</span>
            </div>
            <span className="font-mono text-xs text-[#A7A39A]">RAIPUR // 2026</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-4 my-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left flex items-baseline justify-between border-b border-[#222222] pb-3 group focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#FF4500]">[{link.number}]</span>
                  <span className="font-display text-3xl sm:text-4xl font-black tracking-wide group-hover:text-[#FF4500] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A7A39A] group-hover:text-[#FF4500] transition-colors" />
              </button>
            ))}
          </div>

          {/* Bottom Info & Contact */}
          <div className="pt-4 border-t border-[#2b2b2b] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A7A39A]">
              <span>UDAY SAHU</span>
              <span className="text-[#FF4500]">STATUS: BUILDING</span>
            </div>
            <a
              href="mailto:udaysahu.in@gmail.com"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF4500] text-white font-mono text-xs tracking-widest font-bold uppercase hover:bg-[#e03d00] transition-colors"
            >
              <span>SEND EMAIL: udaysahu.in@gmail.com ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
