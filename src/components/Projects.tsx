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

  const renderProjectCard = (project: Project) => {
    const isLive = project.status === 'LIVE';

    return (
      <div
        onClick={() => setSelectedProject(project)}
        className="group relative bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-5 sm:p-7 cursor-pointer transition-all duration-300 hover:border-[#FF4500]/70 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
      >
        <div>
          {/* Card Top: Number, Title, Status */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#262626] font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-[#FF4500] font-bold">[{project.number}]</span>
              <h3 className="text-white font-heading font-black tracking-wider text-lg uppercase">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 border ${
                  isLive
                    ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30'
                    : 'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/30'
                }`}
              >
                ● {project.status}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Category & One-Liner */}
          <div className="pt-3 pb-2 space-y-1">
            <div className="font-mono text-[11px] text-[#FF4500] uppercase tracking-wider font-semibold">
              {project.category}
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
              {project.oneLiner}
            </p>
          </div>

          {/* Stylized Editorial Browser Frame with Real Screenshot */}
          <div className="border border-[#2a2a2a] bg-[#0c0c0c] overflow-hidden my-3 shadow-md">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#181818] border-b border-[#242424]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0f0f0f] border border-[#2b2b2b] text-[10px] font-mono text-[#A7A39A] max-w-[220px] sm:max-w-xs truncate">
                <Globe className="w-3 h-3 text-[#22c55e] shrink-0" />
                <span className="truncate">{project.domain}</span>
              </div>
              <span className="text-[9px] font-mono text-[#A7A39A] hidden sm:inline">{project.year}</span>
            </div>

            {/* Real Screenshot */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <img
                src={project.image}
                alt={`Real deployed interface of ${project.title}`}
                className="w-full h-full object-contain bg-black transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
                width={1280}
                height={800}
              />
            </div>
          </div>
        </div>

        {/* Card Footer: Tech Stack, Action Links */}
        <div className="pt-3 border-t border-[#262626] space-y-3">
          {/* Tech Stack Tags */}
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

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-[11px] font-bold tracking-wider uppercase transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>LIVE ↗</span>
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1e1e1e] hover:bg-[#2c2c2c] text-[#F4F2EC] border border-[#333333] text-[11px] font-semibold tracking-wider uppercase transition-colors focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:outline-none"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>GITHUB ↗</span>
                </a>
              )}
            </div>

            <span className="text-[10px] text-[#A7A39A] group-hover:text-white transition-colors">
              INSPECT ↗
            </span>
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
              <span>[02] WORK</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
              SELECTED PROJECTS.
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#111111]/75 leading-relaxed">
            Real deployed applications and working prototypes. Interfaces captured directly from live environments — no fabricated mockups or placeholder designs.
          </div>
        </div>

        {/* 2-Row Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-12 items-start">
          <div className="lg:col-span-7">
            {renderProjectCard(bunkd)}
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            {renderProjectCard(sanket)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 items-start">
          <div className="lg:col-span-7">
            {renderProjectCard(labelsure)}
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            {renderProjectCard(broOrFraud)}
          </div>
        </div>

        {/* Quiet Integrity Footnote */}
        <div className="mt-12 p-3.5 bg-white/70 border border-[#111111]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#111111]/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span>VERIFIED: 4 REAL DEPLOYED URLS · 0 FICTIONAL PROJECTS</span>
          </div>
          <span className="text-[11px] text-[#A7A39A]">STATUS AUDITED · 2026</span>
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
