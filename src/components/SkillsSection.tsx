import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Globe, 
  Database, 
  Terminal, 
  Cpu, 
  Users, 
  CheckCircle2, 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Calligraphy } from './Calligraphy';
import { useLanguage } from '../context/LanguageContext';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'web' | 'core' | 'tools'>('all');
  const { t } = useLanguage();

  // Framer Motion whileHover interaction with glowing red border using --primary-kage variable
  const cardHoverAnimation = {
    y: -8,
    scale: 1.02,
    borderColor: "var(--primary-kage, #e0231c)",
    boxShadow: "0 0 25px -2px rgba(224, 35, 28, 0.48), 0 22px 40px -12px rgba(0, 0, 0, 0.9)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Japanese Calligraphy Section Heading */}
        <Calligraphy
          kanji="技"
          eyebrow={t.skills.eyebrow}
          englishTitle={t.skills.title}
          subtitle={t.skills.subtitle}
          badge={t.skills.badge}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl w-fit ml-auto">
          {[
            { id: 'all', label: t.skills.tabs.all },
            { id: 'languages', label: t.skills.tabs.languages },
            { id: 'web', label: t.skills.tabs.web },
            { id: 'core', label: t.skills.tabs.core },
            { id: 'tools', label: t.skills.tabs.tools },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#e0231c] text-white shadow-md shadow-[#e0231c]/25'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid with Staggered Scroll Animation */}
        <motion.div 
          layout
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
          {/* Card 1: Programming Languages */}
            {(activeTab === 'all' || activeTab === 'languages') && (
              <motion.div
                key="languages"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Languages</h3>
                      <span className="text-[11px] text-neutral-400">Core Computing</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">語</span>
                </div>

                <div className="space-y-3 pt-2">
                  {PORTFOLIO_DATA.skills.languages.map((lang, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{lang.name}</span>
                        <span className="text-[#e0231c] font-mono text-[11px]">{lang.level}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">{lang.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 2: Web Technologies */}
            {(activeTab === 'all' || activeTab === 'web') && (
              <motion.div
                key="web"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Web Technologies</h3>
                      <span className="text-[11px] text-neutral-400">Front-End & Client</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">網</span>
                </div>

                <div className="space-y-3 pt-2">
                  {PORTFOLIO_DATA.skills.webTechnologies.map((tech, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{tech.name}</span>
                        <span className="text-[#e0231c] font-mono text-[11px]">{tech.level}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 3: Core Computer Science Concepts */}
            {(activeTab === 'all' || activeTab === 'core') && (
              <motion.div
                key="core"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Core CS Concepts</h3>
                      <span className="text-[11px] text-neutral-400">Engineering Disciplines</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">基</span>
                </div>

                <div className="space-y-3 pt-2">
                  {PORTFOLIO_DATA.skills.coreConcepts.map((concept, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-xs font-semibold text-white">{concept.name}</div>
                      <p className="text-[11px] text-neutral-400 mt-1">{concept.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 4: Databases & Querying */}
            {(activeTab === 'all' || activeTab === 'tools') && (
              <motion.div
                key="databases"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Databases</h3>
                      <span className="text-[11px] text-neutral-400">Persistent Storage</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">庫</span>
                </div>

                <div className="space-y-3 pt-2">
                  {PORTFOLIO_DATA.skills.databases.map((db, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{db.name}</span>
                        <span className="text-[#e0231c] font-mono text-[11px]">{db.level}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">{db.desc}</p>
                    </div>
                  ))}

                  <div className="p-3.5 rounded-lg bg-[#e0231c]/[0.05] border border-[#e0231c]/20 text-xs text-neutral-300">
                    <span className="font-semibold text-white block mb-1">RDBMS Practice:</span>
                    Relational schemas, foreign keys, normalization, CRUD queries used extensively across BCA Final Year project (Swasthik).
                  </div>
                </div>
              </motion.div>
            )}

            {/* Card 5: Tools & Platforms */}
            {(activeTab === 'all' || activeTab === 'tools') && (
              <motion.div
                key="tools"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Tools & Workflow</h3>
                      <span className="text-[11px] text-neutral-400">Dev Environment</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">器</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {PORTFOLIO_DATA.skills.toolsAndPlatforms.map((tool, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-xs font-semibold text-white">{tool.name}</div>
                      <p className="text-[10px] text-neutral-400 mt-1">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 6: Professional Soft Skills */}
            {activeTab === 'all' && (
              <motion.div
                key="soft-skills"
                layout
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={cardHoverAnimation}
                whileTap={{ scale: 0.99 }}
                className="relative p-6 rounded-xl bg-[#090d13]/80 border border-white/[0.08] transition-colors group space-y-4 shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-kage,#e0231c)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30 group-hover:shadow-[0_0_12px_rgba(224,35,28,0.35)] transition-shadow">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Soft Skills</h3>
                      <span className="text-[11px] text-neutral-400">Collaboration & Mindset</span>
                    </div>
                  </div>
                  <span className="font-kanji text-xl text-neutral-600 group-hover:text-[#e0231c] transition-colors">心</span>
                </div>

                <p className="text-xs text-neutral-300">
                  Key professional competencies developed through team-based academic synopses, capstone project defenses, and analytical reporting:
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {PORTFOLIO_DATA.skills.softSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e0231c]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
        </motion.div>

      </div>
    </section>
  );
};
