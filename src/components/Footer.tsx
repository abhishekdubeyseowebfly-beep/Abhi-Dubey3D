import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download, 
  FileText, 
  ArrowUp,
  ExternalLink 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenResumeModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#05070a]/95 text-neutral-400 overflow-hidden select-none">
      {/* Subtle Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e0231c]/40 to-transparent pointer-events-none" />

      {/* Decorative Traditional Japanese Kumiko Subtle Background Lattice */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#dfe7e0_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Identity Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Traditional Red Inkan Artist Stamp Seal */}
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#e0231c] to-[#8c120e] p-[1px] shadow-lg shadow-[#e0231c]/20">
                <div className="w-full h-full bg-[#070a0e] rounded-[7px] flex items-center justify-center text-white font-bold text-xs font-cinzel tracking-wider">
                  AD
                </div>
              </div>
              <div>
                <span className="font-cinzel font-bold text-lg text-white tracking-wider block">
                  {language === 'ja' ? 'アビシェック・ドゥベイ' : 'ABHISHEK DUBEY'}
                </span>
                <span className="text-[11px] font-mono text-[#e0231c] tracking-wider block -mt-0.5">
                  Aspiring Web Developer | Software Developer
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md font-light">
              MCA student with a strong foundation in Java, Python, Data Structures & Algorithms, and modern Web Technologies. Committed to engineering clean, reliable, and user-centric digital experiences.
            </p>

            {/* Academic Credential Badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0231c]" />
              <span className="text-[11px] font-mono text-neutral-300">
                MCA Candidate • IMS Engineering College (IMSEC), Ghaziabad
              </span>
            </div>
          </div>

          {/* Quick Navigation Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e0231c] font-semibold flex items-center gap-2">
              <span>{language === 'ja' ? '案内' : 'Navigation'}</span>
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { name: language === 'ja' ? '自己紹介' : 'About & Bio', href: '#about' },
                { name: language === 'ja' ? '技術領域' : 'Technical Skills', href: '#skills' },
                { name: language === 'ja' ? '制作実績' : 'Key Projects', href: '#projects' },
                { name: language === 'ja' ? '学歴・資格' : 'Education & Certs', href: '#education' },
                { name: language === 'ja' ? '連絡先' : 'Contact & Inquire', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Direct Channels Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e0231c] font-semibold flex items-center gap-2">
              <span>{language === 'ja' ? '通信' : 'Direct Channels'}</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PORTFOLIO_DATA.profile.phone}`}
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                <span>{PORTFOLIO_DATA.profile.location}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Resume & Documents (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e0231c] font-semibold">
              <span>{language === 'ja' ? '資料' : 'Credentials'}</span>
            </div>
            <div className="space-y-2">
              <a
                href={PORTFOLIO_DATA.profile.resumePdfUrl}
                download="Abhishek_Dubey_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#e0231c] hover:bg-[#c41b15] rounded-lg transition-all shadow-md shadow-[#e0231c]/25 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              {onOpenResumeModal && (
                <button
                  onClick={onOpenResumeModal}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#e0231c]" />
                  <span>Preview CV</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Muted Japanese Aesthetic Copyright & Return To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Exact Copyright Text Requested */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-mono text-neutral-300 font-medium tracking-wide">
              © Abhishek Dubey. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-[11px] text-neutral-500 font-mono">
              MCA 2025–2027 • IMSEC Ghaziabad
            </span>
          </div>

          {/* Minimalist Return to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-neutral-400 hover:text-white transition-all text-[11px] font-mono cursor-pointer"
            title="Scroll to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-[#e0231c]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
