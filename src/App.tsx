import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { CurrentBuild } from './components/CurrentBuild';
import { Learning } from './components/Learning';
import { FocusAndProcess } from './components/FocusAndProcess';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'work', 'pravah', 'learning', 'about', 'journey', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F2EC] text-[#111111] overflow-x-hidden selection:bg-[#FF4500] selection:text-white font-sans">
      {/* Sticky Navigation Header */}
      <Navigation activeSection={activeSection} />

      {/* Main Content Sections: PERSON → WORK → CURRENT BUILD → LEARNING → STORY → JOURNEY → CONTACT */}
      <main id="main-content">
        {/* [01] Hero Section (Light #F4F2EC) — The Person */}
        <Hero />

        {/* Typographic Ribbon 01 */}
        <Marquee
          variant="dark"
          items={[
            'UDAY SAHU',
            'DEVELOPER',
            'BUILDER',
            'PROBLEM SOLVER',
            'PRACTICAL SOFTWARE',
            'RAIPUR · INDIA',
            'C++ & TYPESCRIPT',
          ]}
          skew={false}
        />

        {/* [02] Selected Projects (Light #F4F2EC) — The Work */}
        <Projects />

        {/* Typographic Ribbon 02 */}
        <Marquee
          variant="orange"
          items={[
            'SYSTEMS ENGINEERING',
            'ROUTE INTELLIGENCE',
            'DSA WITH C++',
            'HACKATHONS',
            'OPEN SOURCE',
            'RAPID PROTOTYPING',
          ]}
          skew={false}
        />

        {/* [03] Current Build — PRAVAH (Dark #111111) */}
        <CurrentBuild />

        {/* [04] Technical Notebook — DSA with C++ (Light #F4F2EC) */}
        <Learning />

        {/* How I Build (Dark #111111) — The Method */}
        <FocusAndProcess />

        {/* [05] About & Long-Term Project (Light #F4F2EC) — The Story */}
        <About />

        {/* [06] Building Journey (Dark #111111) — The Trajectory */}
        <Journey />

        {/* Final CTA (Dark #111111) — Direct Dispatch */}
        <FinalCTA />
      </main>

      {/* Editorial Footer (Black #0A0A0A) */}
      <Footer />
    </div>
  );
}

export default App;
