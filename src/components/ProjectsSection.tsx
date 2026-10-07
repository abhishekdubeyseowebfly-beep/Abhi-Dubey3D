import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { Calligraphy } from './Calligraphy';
import { useLanguage } from '../context/LanguageContext';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  // Framer Motion tactile 'paper scroll' whileHover animation
  // Mimics an unrolled Japanese parchment (makimono) lifting with authentic physical drop shadow
  const paperScrollHover = {
    scale: 1.03,
    y: -10,
    boxShadow:
      "0 32px 64px -16px rgba(0, 0, 0, 0.96), 0 16px 32px -8px rgba(0, 0, 0, 0.85), 0 0 36px 3px rgba(224, 35, 28, 0.26)",
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 22,
    },
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Japanese Calligraphy Section Heading */}
        <Calligraphy
          kanji="実"
          eyebrow={t.projects.eyebrow}
          englishTitle={t.projects.title}
          subtitle={t.projects.subtitle}
          badge={t.projects.badge}
        />

        {/* Projects Grid with Staggered Scroll Sequences */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={paperScrollHover}
              whileTap={{ scale: 0.985, y: -4 }}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0c1017]/90 via-[#080c12]/85 to-[#06080d]/90 border border-white/[0.09] hover:border-[#e0231c]/60 transition-colors shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Paper Scroll Top Lacquered Roller Rod Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#e0231c] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

              {/* Paper Scroll Bottom Weighted Rod Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent opacity-30 group-hover:opacity-80 transition-opacity" />

              {/* Faint Background Kanji Watermark for Scroll Texture */}
              <div 
                aria-hidden="true" 
                className="absolute -right-4 -bottom-6 font-kanji text-8xl font-black text-white/[0.025] group-hover:text-[#e0231c]/[0.05] transition-colors select-none pointer-events-none"
              >
                {project.kanji}
              </div>

              <div className="space-y-4 relative z-10">
                {/* Kanji Badge & Category */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center font-kanji text-sm font-bold text-[#e0231c] group-hover:bg-[#e0231c]/10 group-hover:border-[#e0231c]/30 transition-all">
                      {project.kanji}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {project.roleBadge && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#e0231c]/15 text-[#e0231c] border border-[#e0231c]/30">
                      <Award className="w-3 h-3" />
                      {project.roleBadge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#edf2ee] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#e0231c] font-medium mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 pt-1 text-xs text-neutral-400">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#e0231c] text-sm leading-none">•</span>
                      <span className="line-clamp-2">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags & Action Footer */}
              <div className="pt-6 space-y-4 border-t border-white/[0.06] mt-4 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-neutral-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  {project.metrics ? (
                    <span className="text-[11px] text-neutral-400 truncate max-w-[200px]" title={project.metrics}>
                      {project.metrics}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white group-hover:text-[#e0231c] transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-[#090d13] border border-[#e0231c]/40 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-kanji text-xl text-[#e0231c]">{selectedProject.kanji}</span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    {selectedProject.roleBadge && (
                      <span className="px-2 py-0.5 rounded bg-[#e0231c]/15 text-[#e0231c] text-[10px] font-mono border border-[#e0231c]/30">
                        {selectedProject.roleBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#e0231c] font-medium">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-neutral-400 hover:text-white bg-white/5 rounded-lg text-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400">Overview</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Complete Highlights from Resume */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#e0231c] font-semibold">
                  Technical Highlights & Defense Records
                </h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2 rounded bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#e0231c] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags and metrics */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-white/5 text-[11px] font-mono text-neutral-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-[#e0231c] hover:bg-[#c41b15] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close Project
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
    </section>
  );
};
