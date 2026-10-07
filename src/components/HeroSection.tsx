import React from 'react';
import { motion } from 'motion/react';
import { Download, Eye, Compass, ShieldCheck, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onEnterTemple: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResumeModal,
  onEnterTemple,
}) => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="relative min-h-[88vh] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Abhishek Dubey Monogram Watermark */}
      <motion.div 
        aria-hidden="true" 
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[18rem] sm:text-[28rem] font-cinzel font-bold text-white/[0.02] leading-none z-0 tracking-widest"
      >
        AD
      </motion.div>

      {/* Atmospheric Radial Gradients */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#e0231c]/10 blur-[130px] rounded-full pointer-events-none" 
      />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-red-950/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#e0231c]/30 text-xs text-neutral-300 shadow-lg shadow-black/40"
        >
          <span className="w-2 h-2 rounded-full bg-[#e0231c] animate-ping" />
          <span className="font-mono text-[#e0231c] font-semibold">{t.hero.statusTag}</span>
          <span>{t.hero.statusText}</span>
        </motion.div>

        {/* Name and Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e0231c]" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#e0231c] font-semibold">
              {t.hero.eyebrow}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e0231c]" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-cinzel">
            {t.hero.name}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-light text-neutral-300 max-w-2xl mx-auto">
            {t.hero.titlePrefix && `${t.hero.titlePrefix} `}
            <span className="text-white font-normal underline decoration-[#e0231c] decoration-2 underline-offset-4">
              {t.hero.titleWeb}
            </span>
            {` ${t.hero.titleAnd} `}
            <span className="text-white font-normal underline decoration-[#e0231c] decoration-2 underline-offset-4">
              {t.hero.titleSoftware}
            </span>
          </p>
        </motion.div>

        {/* Quick Contact & Verification Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400"
        >
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#e0231c]" />
            <span>{t.hero.location}</span>
          </span>
          <a href={`tel:${PORTFOLIO_DATA.profile.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#e0231c]" />
            <span>{PORTFOLIO_DATA.profile.phone}</span>
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#e0231c]" />
            <span>{PORTFOLIO_DATA.profile.email}</span>
          </a>
          <div className="flex items-center gap-3">
            <a 
              href={PORTFOLIO_DATA.profile.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a 
              href={PORTFOLIO_DATA.profile.github} 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Career Objective Inscription Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto p-6 sm:p-7 rounded-xl bg-[#090d13]/80 border border-white/[0.08] backdrop-blur-md shadow-2xl shadow-black relative text-left"
        >
          <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-0.5 rounded bg-[#e0231c] text-[10px] font-bold text-white uppercase tracking-widest">
            {t.hero.careerObjectiveTitle}
          </div>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            {t.hero.careerObjectiveBody}
          </p>

          <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e0231c]" />
              <span>{t.hero.verifiedText}</span>
            </div>
            <span className="font-mono text-[#e0231c]">{t.hero.mcaTag}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
        >
          <a
            href={PORTFOLIO_DATA.profile.resumePdfUrl}
            download="Abhishek_Dubey_Resume.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#e0231c] hover:bg-[#c41b15] text-white font-medium text-sm rounded-xl shadow-xl shadow-[#e0231c]/30 hover:shadow-2xl hover:shadow-[#e0231c]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4 h-4" />
            <span>{t.hero.downloadPdf}</span>
          </a>

          <button
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white font-medium text-sm rounded-xl transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#e0231c]" />
            <span>{t.hero.previewCv}</span>
          </button>

          <button
            onClick={onEnterTemple}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#121922] hover:bg-[#1a232f] border border-[#e0231c]/30 text-white font-medium text-sm rounded-xl transition-all cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-[#e0231c] group-hover:rotate-45 transition-transform" />
            <span>{t.hero.explore3d}</span>
          </button>
        </motion.div>

        {/* Pillar Highlights */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left"
        >
          {[
            { tag: t.hero.pillars.eduTag, title: t.hero.pillars.eduTitle, desc: t.hero.pillars.eduDesc },
            { tag: t.hero.pillars.undergradTag, title: t.hero.pillars.undergradTitle, desc: t.hero.pillars.undergradDesc },
            { tag: t.hero.pillars.langsTag, title: t.hero.pillars.langsTitle, desc: t.hero.pillars.langsDesc },
            { tag: t.hero.pillars.certTag, title: t.hero.pillars.certTitle, desc: t.hero.pillars.certDesc },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1 hover:border-[#e0231c]/30 transition-colors"
            >
              <span className="text-[11px] font-mono text-[#e0231c] uppercase tracking-wider block">{item.tag}</span>
              <div className="font-semibold text-white text-xs">{item.title}</div>
              <div className="text-[11px] text-neutral-400">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
