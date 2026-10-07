import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Download, Check, Copy, Linkedin, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Calligraphy } from './Calligraphy';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  const [formSent, setFormSent] = useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (type: 'email' | 'phone', text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
      formData.subject || 'Opportunity Inquiry — ' + formData.name
    )}&body=${encodeURIComponent(
      `Hello Abhishek,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Japanese Calligraphy Section Heading */}
        <Calligraphy
          kanji="結"
          eyebrow={t.contact.eyebrow}
          englishTitle={t.contact.title}
          subtitle={t.contact.subtitle}
          badge={t.contact.badge}
        />

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info Panel (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Quick Contact Chips */}
            <div className="p-6 rounded-xl bg-[#090d13]/70 border border-white/[0.08] space-y-5">
              <h3 className="text-base font-bold text-white">Direct Channels</h3>
              
              <div className="space-y-4 text-xs">
                {/* Email */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Email Address</span>
                      <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="font-semibold text-white hover:text-[#e0231c] transition-colors">
                        {PORTFOLIO_DATA.profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('email', PORTFOLIO_DATA.profile.email)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white bg-white/5 cursor-pointer"
                    title="Copy Email"
                  >
                    {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Phone / WhatsApp</span>
                      <a href={`tel:${PORTFOLIO_DATA.profile.phone}`} className="font-semibold text-white hover:text-[#e0231c] transition-colors">
                        {PORTFOLIO_DATA.profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('phone', PORTFOLIO_DATA.profile.phone)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white bg-white/5 cursor-pointer"
                    title="Copy Phone"
                  >
                    {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Current Location</span>
                    <span className="font-semibold text-white">{PORTFOLIO_DATA.profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[11px] text-neutral-400 block mb-2.5">Profiles & Repositories</span>
                <div className="flex gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#e0231c]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#e0231c]" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Callout Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#121922] to-[#070a0e] border border-[#e0231c]/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-kanji text-xl text-[#e0231c]">影</span>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Official Resume Document
                </h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Grab Abhishek Dubey's updated verified resume with complete academic records, project defense grades, and technical stack details.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={PORTFOLIO_DATA.profile.resumePdfUrl}
                  download="Abhishek_Dubey_Resume.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e0231c] hover:bg-[#c41b15] text-white text-xs font-semibold rounded-lg transition-colors shadow-lg shadow-[#e0231c]/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={onOpenResumeModal}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Preview First
                </button>
              </div>
            </div>

          </motion.div>

          {/* Right Message Box (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-[#090d13]/70 border border-white/[0.08] space-y-5">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>Send a Direct Message</span>
                <span className="text-xs font-mono text-neutral-500">FAST RESPONSE</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-300 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Recruiter / Collaborator Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#e0231c] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-300 font-medium">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#e0231c] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-neutral-300 font-medium">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Job Opportunity / Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#e0231c] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-neutral-300 font-medium">Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details about the role, technical requirements, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#e0231c] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#e0231c] hover:bg-[#c41b15] text-white text-xs font-semibold rounded-lg transition-colors shadow-lg shadow-[#e0231c]/25 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Abhishek</span>
              </button>

              {formSent && (
                <p className="text-xs text-emerald-400 text-center animate-in fade-in">
                  Opening your email client to dispatch the message directly to dubeyabhi9794@gmail.com!
                </p>
              )}
            </form>
          </motion.div>

        </div>

        {/* Section Reflection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-10 border-t border-white/[0.06] text-center space-y-2.5"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-neutral-800" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#e0231c] font-semibold">Abhishek Dubey</span>
            <span className="h-[1px] w-12 bg-neutral-800" />
          </div>
          <p className="text-xs text-neutral-300 font-light max-w-xl mx-auto italic">
            {t.contact.quoteText}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
