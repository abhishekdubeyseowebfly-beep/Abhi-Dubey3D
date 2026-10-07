import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Calligraphy } from './Calligraphy';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Japanese Calligraphy Section Heading */}
        <Calligraphy
          kanji="学"
          eyebrow={t.education.eyebrow}
          englishTitle={t.education.title}
          subtitle={t.education.subtitle}
          badge={t.education.badge}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Education Timeline with Scroll Stagger (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg font-semibold text-white flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-[#e0231c]" />
              <span>Academic Progression</span>
            </motion.h3>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#e0231c] before:via-neutral-700 before:to-transparent"
            >
              {PORTFOLIO_DATA.education.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, x: -25 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#05070a] border-2 border-[#e0231c] group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-xl bg-[#090d13]/70 border border-white/[0.08] group-hover:border-[#e0231c]/40 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-base font-bold text-white">
                        {item.degree}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#e0231c]" />
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 font-medium">
                      {item.institution}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#e0231c]" />
                        {item.location}
                      </span>
                      {item.score && (
                        <span className="px-2 py-0.5 rounded bg-[#e0231c]/15 text-[#e0231c] font-mono text-[11px] font-semibold border border-[#e0231c]/30">
                          {item.score}
                        </span>
                      )}
                      {item.status && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/30">
                          {item.status}
                        </span>
                      )}
                    </div>

                    {item.details && (
                      <p className="text-xs text-neutral-400 pt-1 leading-relaxed border-t border-white/5">
                        {item.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Verified Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg font-semibold text-white flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-[#e0231c]" />
              <span>Verified Certifications</span>
            </motion.h3>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="space-y-4"
            >
              {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-5 rounded-xl bg-[#090d13]/70 border border-white/[0.08] hover:border-[#e0231c]/40 transition-colors space-y-3 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-[#e0231c] font-medium mt-0.5">
                        Issued by: {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">
                      VERIFIED
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-neutral-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Academic Highlights Summary */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="p-5 rounded-xl bg-gradient-to-br from-[#0c121b] to-[#070a0e] border border-white/10 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <BookOpen className="w-4 h-4 text-[#e0231c]" />
                  <span>Scholastic Highlights</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#e0231c] shrink-0 mt-0.5" />
                    <span>Scored <strong>Grade A</strong> in BCA Final Year Capstone Project (Swasthik Hospital System).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#e0231c] shrink-0 mt-0.5" />
                    <span>Authored 12-page IEEE Std 830-1998 compliant SRS specification for Network Intrusion Detection System.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#e0231c] shrink-0 mt-0.5" />
                    <span>Consistently maintaining coursework excellence at IMS Engineering College, Ghaziabad.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
