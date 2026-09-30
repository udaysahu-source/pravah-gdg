import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { CurrentBuild } from './components/CurrentBuild';
import { Learning } from './components/Learning';
import { LongTermProject } from './components/LongTermProject';
import { FocusAndProcess } from './components/FocusAndProcess';
import { SkillsAndJourney } from './components/SkillsAndJourney';
import { Faq } from './components/Faq';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'work', 'pravah', 'learning', 'wildlife', 'focus-process', 'about', 'faq', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F2EC] text-[#111111] overflow-x-hidden selection:bg-[#FF4500] selection:text-white font-sans">
      {/* Interactive Custom Cursor for desktop */}
      <CustomCursor />

      {/* Sticky Navigation Header */}
      <Navigation activeSection={activeSection} />

      {/* Main Content Sections with alternating visual rhythm */}
      <main id="main-content">
        {/* 01: Hero Section (Light #F4F2EC) */}
        <Hero />

        {/* Marquee 01 (Dark Ribbon) */}
        <Marquee variant="dark" skew={false} />

        {/* 02: Selected Work (Light #F4F2EC) */}
        <Projects />

        {/* Marquee 02 (Orange Accent Ribbon - Visual Bridge) */}
        <Marquee
          variant="orange"
          items={[
            'SYSTEMS ENGINEERING',
            'PRAVAH // BUILD 001',
            'OFFLINE-FIRST',
            'DYNAMIC ROUTE INTELLIGENCE',
            'RAIPUR TOPOLOGY',
            'A* GRAPH ROUTING',
            'GEOSPATIAL RASTER',
          ]}
          skew={false}
        />

        {/* 03: Currently Building — PRAVAH (Dark #111111) */}
        <CurrentBuild />

        {/* 04: What I'm Learning — DSA with C++ (Light #F4F2EC) */}
        <Learning />

        {/* 05: Long-Term Project — Wildlife Camera Trap Detection (Dark #111111) */}
        <LongTermProject />

        {/* 06: Focus & How I Build (Light #F4F2EC -> Dark #111111) */}
        <FocusAndProcess />

        {/* 07: About, Skills, Metrics & Building Journey (Light -> Dark) */}
        <SkillsAndJourney />

        {/* 08: FAQ Clarifications (Light #F4F2EC) */}
        <Faq />

        {/* 09: Final Dramatic Call to Action (Dark #111111 with #FF4500) */}
        <FinalCTA />
      </main>

      {/* 10: Editorial Magazine Footer (Black #0A0A0A) */}
      <Footer />
    </div>
  );
}

export default App;
