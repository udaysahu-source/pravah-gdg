import React, { useState } from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = PORTFOLIO_DATA.projects;
  const bunkd = projects[0];
  const sanket = projects[1];
  const labelsure = projects[2];
  const broOrFraud = projects[3];

  const renderProjectCard = (project: Project, isLarge: boolean) => {
    return (
      <div
        onClick={() => setSelectedProject(project)}
        className="group relative bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-5 sm:p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4500]/60 shadow-xl flex flex-col justify-between"
        data-cursor="VIEW PROJECT"
      >
        <div>
          {/* Card Top Meta Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#262626] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#FF4500] font-bold">[{project.number}]</span>
              <span className="text-white font-heading font-black tracking-wider text-base uppercase">
                {project.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#22c55e] font-mono hidden sm:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                LIVE
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </div>

          {/* One-Liner Description */}
          <div className="py-3">
            <p className="text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
              {project.oneLiner}
            </p>
          </div>

          {/* Browser-Window Frame Presentation (Authentic Real UI Inside) */}
          <div className="border border-[#2a2a2a] bg-[#0c0c0c] overflow-hidden my-3 shadow-md">
            {/* Browser Window Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#181818] border-b border-[#242424]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0f0f0f] border border-[#2b2b2b] text-[10px] font-mono text-[#A7A39A] max-w-[200px] sm:max-w-xs truncate">
                <Globe className="w-2.5 h-2.5 text-[#22c55e]" />
                <span className="truncate">{project.domain}</span>
              </div>
              <span className="text-[9px] font-mono text-[#A7A39A] hidden sm:inline">2026</span>
            </div>

            {/* Actual Screenshot with Scale on Hover */}
            <div className={`relative ${isLarge ? 'aspect-[16/10]' : 'aspect-[16/10]'} w-full overflow-hidden bg-black`}>
              <img
                src={project.image}
                alt={`Authentic screenshot of ${project.title}`}
                className="w-full h-full object-contain bg-black transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions & Tags */}
        <div className="pt-3 border-t border-[#262626] space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#1b1b1b] text-[#A7A39A] font-mono text-[10px] border border-[#2e2e2e]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-[11px] font-bold tracking-wider uppercase transition-colors"
                data-cursor="OPEN ↗"
              >
                <span>LIVE PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1e1e1e] hover:bg-[#2c2c2c] text-[#F4F2EC] border border-[#333333] text-[11px] font-semibold tracking-wider uppercase transition-colors"
                  data-cursor="CODE"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>VIEW CODE</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>

            <span className="text-[10px] text-[#A7A39A]">CLICK TO INSPECT</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="work"
      className="relative py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>[02] REAL DEPLOYED SYSTEMS</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
              LIVE PROJECTS.
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed">
            Authentic, production-deployed web applications. Every screenshot is captured directly from the live URLs—zero AI mockups, zero fictional UI.
          </div>
        </div>

        {/* Staggered Editorial Grid: Row 1 (BUNKD 7-col + SANKET 5-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-12 items-start">
          <div className="lg:col-span-7">
            {renderProjectCard(bunkd, true)}
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            {renderProjectCard(sanket, false)}
          </div>
        </div>

        {/* Staggered Editorial Grid: Row 2 (LABELSURE 7-col + BRO OR FRAUD 5-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 items-start">
          <div className="lg:col-span-7">
            {renderProjectCard(labelsure, true)}
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            {renderProjectCard(broOrFraud, false)}
          </div>
        </div>

        {/* Real Authenticity Stamp */}
        <div className="mt-12 p-4 bg-white/70 border border-[#111111]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#111111]/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span>AUTHENTICITY GUARANTEE: 100% REAL DEPLOYED APPLICATIONS CAPTURED HEADLESS.</span>
          </div>
          <span className="text-[11px] text-[#A7A39A]">VERIFIED LIVE IN 2026</span>
        </div>
      </div>

      {/* Deep-Dive Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
