import React from 'react';
import { Download, X, Printer, Mail, Phone, MapPin, ExternalLink, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0b0f14] border border-[#e0231c]/40 rounded-xl shadow-2xl shadow-black/80 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070a0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e0231c]/20 border border-[#e0231c]/50 flex items-center justify-center text-[#e0231c] font-bold text-xs font-cinzel">
              AD
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white tracking-wide">
                {t.modal.title}
              </h2>
              <p className="text-xs text-neutral-400">
                {t.modal.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Abhishek_Dubey_Resume.pdf"
              download="Abhishek_Dubey_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#e0231c] hover:bg-[#c41b15] text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-[#e0231c]/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.modal.downloadBtn}</span>
            </a>
            <button
              onClick={() => window.print()}
              title="Print Resume"
              className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Document Preview */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#070a0e]/60 text-neutral-200 text-sm">
          
          {/* Header Card */}
          <div className="p-6 rounded-lg bg-white/[0.03] border border-white/10 relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  ABHISHEK DUBEY
                </h1>
                <p className="text-[#e0231c] font-medium text-base mt-1">
                  Aspiring Web Developer | Software Developer
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e0231c]" />
                    Delhi, Uttar Pradesh
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#e0231c]" />
                    +91 8707377658
                  </span>
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-white" onClick={handleCopyEmail}>
                    <Mail className="w-3.5 h-3.5 text-[#e0231c]" />
                    dubeyabhi9794@gmail.com
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="/Abhishek_Dubey_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Raw PDF
                </a>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <section className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1 flex items-center gap-2">
              <span>CAREER OBJECTIVE</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-sm bg-white/[0.02] p-4 rounded-lg border border-white/5">
              {PORTFOLIO_DATA.profile.bio}
            </p>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1">
              EDUCATION
            </h3>
            <div className="grid gap-3">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <div className="font-semibold text-white">{edu.degree}</div>
                    <div className="text-xs text-neutral-400">{edu.institution}</div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-neutral-400 font-mono">{edu.period}</span>
                    {edu.score && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-[#e0231c]/15 text-[#e0231c] font-medium border border-[#e0231c]/30">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1">
              TECHNICAL SKILLS
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-neutral-200 block mb-1">Languages:</span>
                <span className="text-neutral-300">Java, Python, C++, JavaScript</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-neutral-200 block mb-1">Web Technologies:</span>
                <span className="text-neutral-300">HTML, CSS, JavaScript, React (basics)</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-neutral-200 block mb-1">Databases:</span>
                <span className="text-neutral-300">MySQL</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-neutral-200 block mb-1">Tools & Platforms:</span>
                <span className="text-neutral-300">Git, GitHub, VS Code, Postman</span>
              </div>
              <div className="sm:col-span-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-neutral-200 block mb-1">Core Concepts:</span>
                <span className="text-neutral-300">Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), DBMS, Operating Systems</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1">
              PROJECTS
            </h3>
            <div className="space-y-3">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-white text-sm">{proj.title}</span>
                    <span className="text-xs text-[#e0231c] font-mono">{proj.subtitle}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Soft Skills */}
          <section className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1">
                CERTIFICATIONS
              </h3>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {PORTFOLIO_DATA.certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#e0231c]">•</span>
                    <span><strong>{c.name}</strong> — {c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-[#e0231c] font-bold border-b border-white/10 pb-1">
                SOFT SKILLS
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PORTFOLIO_DATA.skills.softSkills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-white/5 text-xs text-neutral-300 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#070a0e] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 font-mono">
            © 2026 Abhishek Dubey. All Rights Reserved by Abhishek Dubey.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <a
              href="/Abhishek_Dubey_Resume.pdf"
              download="Abhishek_Dubey_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#e0231c] hover:bg-[#c41b15] text-white text-xs font-semibold rounded-lg transition-colors shadow-lg shadow-[#e0231c]/25"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
