import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Globe } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null);

  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setActiveTab('primary');
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#111111] text-[#F4F2EC] border border-[#333333] shadow-2xl overflow-y-auto font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Browser Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#161616] border-b border-[#292929]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF4500]">[{project.number}]</span>
            <span className="font-heading font-black text-xl uppercase text-white tracking-wide">
              {project.title}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A7A39A] hover:text-white border border-transparent hover:border-[#333333] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Authentic Deployed Browser Window Frame */}
          <div className="border border-[#2e2e2e] bg-[#0c0c0c] shadow-2xl overflow-hidden">
            {/* Browser Window Chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-2 px-3 py-1 bg-[#0f0f0f] border border-[#2b2b2b] text-[11px] font-mono text-[#A7A39A] max-w-sm sm:max-w-md w-full truncate justify-center">
                <Globe className="w-3 h-3 text-[#22c55e]" />
                <span className="text-white select-all">{project.domain}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#22c55e] hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span>AUTHENTIC CAPTURE</span>
              </div>
            </div>

            {/* Actual Deployed Screenshot */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#000000]">
              <img
                src={activeTab === 'primary' ? project.image : project.secondaryImage || project.image}
                alt={`Real screenshot of ${project.title}`}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Multi-screen Tab switcher if secondary view exists */}
            {project.secondaryImage && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] border-t border-[#262626] font-mono text-xs">
                <span className="text-[#A7A39A] text-[11px]">CAPTURED SCREENS:</span>
                <button
                  onClick={() => setActiveTab('primary')}
                  className={`px-2.5 py-1 text-[11px] border ${
                    activeTab === 'primary'
                      ? 'bg-[#FF4500] text-white border-[#FF4500]'
                      : 'bg-[#1c1c1c] text-[#A7A39A] border-[#333333]'
                  }`}
                >
                  VIEW 01: SIGN-IN SCREEN
                </button>
                <button
                  onClick={() => setActiveTab('secondary')}
                  className={`px-2.5 py-1 text-[11px] border ${
                    activeTab === 'secondary'
                      ? 'bg-[#FF4500] text-white border-[#FF4500]'
                      : 'bg-[#1c1c1c] text-[#A7A39A] border-[#333333]'
                  }`}
                >
                  VIEW 02: ACADEMIC PROFILE SETUP
                </button>
              </div>
            )}
          </div>

          {/* Description & Technical Narrative */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#FF4500] uppercase tracking-wider font-bold">
              {project.oneLiner}
            </div>
            <p className="text-base sm:text-lg text-[#F4F2EC]/90 leading-relaxed font-normal">
              {project.description}
            </p>
            {project.notes && (
              <p className="font-mono text-xs text-[#A7A39A] italic border-l-2 border-[#FF4500] pl-3 py-1">
                Note: {project.notes}
              </p>
            )}
          </div>

          {/* Technical Specs & Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 bg-[#191919] border border-[#2b2b2b]">
              <div className="text-[#A7A39A] text-[10px]">TIMELINE</div>
              <div className="text-white font-bold mt-1">{project.year}</div>
            </div>
            <div className="p-3.5 bg-[#191919] border border-[#2b2b2b]">
              <div className="text-[#A7A39A] text-[10px]">VERIFICATION</div>
              <div className="text-emerald-400 font-bold mt-1">100% REAL DEPLOYED</div>
            </div>
            <div className="p-3.5 bg-[#191919] border border-[#2b2b2b]">
              <div className="text-[#A7A39A] text-[10px]">REPOSITORY</div>
              <div className="text-white font-bold mt-1">
                {project.githubUrl ? 'VERIFIED UPSTREAM' : 'PRIVATE BUILD'}
              </div>
            </div>
            <div className="p-3.5 bg-[#191919] border border-[#2b2b2b]">
              <div className="text-[#A7A39A] text-[10px]">OPERATIONAL STATE</div>
              <div className="text-[#FF4500] font-bold mt-1 truncate">{project.status}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] text-[#A7A39A] uppercase tracking-wider">
              PRODUCTION STACK & ARCHITECTURE:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#1a1a1a] text-[#F4F2EC] font-mono text-xs border border-[#333333]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#292929]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A7A39A]">
              <span>DOMAIN: {project.domain}</span>
              <span>//</span>
              <span>BUILDER: UDAY SAHU</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF4500] hover:bg-[#e03d00] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
              >
                <span>LIVE PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#222222] hover:bg-[#2c2c2c] text-white font-mono text-xs tracking-wider transition-colors border border-[#333333]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW CODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-transparent text-[#A7A39A] hover:text-white border border-[#333333] font-mono text-xs uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
