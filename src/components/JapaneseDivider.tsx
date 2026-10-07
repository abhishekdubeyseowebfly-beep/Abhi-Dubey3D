import React from 'react';
import { motion } from 'motion/react';

interface JapaneseDividerProps {
  variant?: 'shoji' | 'rope' | 'asanoha' | 'wave';
  kanji?: string;
  subtitle?: string;
  className?: string;
}

export const JapaneseDivider: React.FC<JapaneseDividerProps> = ({
  variant = 'shoji',
  kanji,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`relative w-full py-8 overflow-hidden select-none pointer-events-none ${className}`}>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0.85 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center relative"
      >
        {/* Motif Selector */}
        {variant === 'shoji' && (
          /* Shoji Kumiko Lattice Screen Divider */
          <div className="w-full flex items-center justify-center relative h-10">
            {/* Left Lattice Grid */}
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#dfe7e0]/20 to-[#e0231c]/50 relative">
              <svg className="w-full h-8 absolute -top-4 opacity-30" preserveAspectRatio="none" viewBox="0 0 400 32">
                <pattern id="shoji-pat-left" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 24 24 M 24 0 L 0 24 M 12 0 L 12 24 M 0 12 L 24 12" stroke="#dfe7e0" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#shoji-pat-left)" />
              </svg>
            </div>

            {/* Central Embellished Crest */}
            <div className="mx-4 flex items-center gap-3 relative z-10 shrink-0">
              <div className="w-2.5 h-2.5 rotate-45 border border-[#e0231c] bg-[#05070a]" />
              <div className="px-3.5 py-1 rounded-full bg-[#090d13] border border-[#e0231c]/40 flex items-center gap-2 shadow-lg shadow-black">
                {kanji && (
                  <span className="font-kanji font-bold text-sm text-[#e0231c]">
                    {kanji}
                  </span>
                )}
                {subtitle && (
                  <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                    {subtitle}
                  </span>
                )}
              </div>
              <div className="w-2.5 h-2.5 rotate-45 border border-[#e0231c] bg-[#05070a]" />
            </div>

            {/* Right Lattice Grid */}
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#dfe7e0]/20 to-[#e0231c]/50 relative">
              <svg className="w-full h-8 absolute -top-4 opacity-30" preserveAspectRatio="none" viewBox="0 0 400 32">
                <pattern id="shoji-pat-right" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 24 24 M 24 0 L 0 24 M 12 0 L 12 24 M 0 12 L 24 12" stroke="#dfe7e0" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#shoji-pat-right)" />
              </svg>
            </div>
          </div>
        )}

        {variant === 'rope' && (
          /* Shimenawa Sacred Braided Rope Motif (注連縄) */
          <div className="w-full flex items-center justify-center relative h-10">
            {/* Left Braided Rope Track */}
            <div className="flex-1 h-[3px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-[#e0231c]/60 relative">
              <svg className="w-full h-6 absolute -top-3 opacity-40" preserveAspectRatio="none" viewBox="0 0 500 24">
                <pattern id="rope-pat-left" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 8 Q4 0, 8 8 T16 8" stroke="#c5a059" strokeWidth="1.2" fill="none" strokeOpacity="0.8" />
                  <path d="M0 12 Q4 20, 8 12 T16 12" stroke="#e0231c" strokeWidth="1" fill="none" strokeOpacity="0.7" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#rope-pat-left)" />
              </svg>
            </div>

            {/* Central Sacred Shide Streamer Knot */}
            <div className="mx-4 flex items-center gap-3 relative z-10 shrink-0">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="text-[#dfe7e0]/80">
                <path d="M2 1h14l-4 6h4l-5 8h4l-7 7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="miter" />
              </svg>

              <div className="px-3.5 py-1 rounded-full bg-[#090d13] border border-[#c5a059]/50 flex items-center gap-2 shadow-lg shadow-black">
                {kanji && (
                  <span className="font-kanji font-bold text-sm text-[#c5a059]">
                    {kanji}
                  </span>
                )}
                {subtitle && (
                  <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-300 uppercase">
                    {subtitle}
                  </span>
                )}
              </div>

              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="text-[#dfe7e0]/80 scale-x-[-1]">
                <path d="M2 1h14l-4 6h4l-5 8h4l-7 7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="miter" />
              </svg>
            </div>

            {/* Right Braided Rope Track */}
            <div className="flex-1 h-[3px] bg-gradient-to-l from-transparent via-[#c5a059]/40 to-[#e0231c]/60 relative">
              <svg className="w-full h-6 absolute -top-3 opacity-40" preserveAspectRatio="none" viewBox="0 0 500 24">
                <pattern id="rope-pat-right" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 8 Q4 0, 8 8 T16 8" stroke="#c5a059" strokeWidth="1.2" fill="none" strokeOpacity="0.8" />
                  <path d="M0 12 Q4 20, 8 12 T16 12" stroke="#e0231c" strokeWidth="1" fill="none" strokeOpacity="0.7" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#rope-pat-right)" />
              </svg>
            </div>
          </div>
        )}

        {variant === 'asanoha' && (
          /* Asanoha Sacred Hemp Leaf Geometric Pattern (麻の葉) */
          <div className="w-full flex items-center justify-center relative h-10">
            {/* Left Asanoha Track */}
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#dfe7e0]/25 to-[#e0231c]/50 relative">
              <svg className="w-full h-8 absolute -top-4 opacity-25" preserveAspectRatio="none" viewBox="0 0 400 32">
                <pattern id="asanoha-left" width="30" height="26" patternUnits="userSpaceOnUse">
                  <path d="M15 0 L30 13 L15 26 L0 13 Z M15 0 L15 26 M0 13 L30 13 M0 0 L30 26 M0 26 L30 0" stroke="#dfe7e0" strokeWidth="0.5" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#asanoha-left)" />
              </svg>
            </div>

            {/* Central Hexagonal Mon Crest */}
            <div className="mx-4 flex items-center gap-3 relative z-10 shrink-0">
              <div className="w-3 h-3 border border-[#e0231c]/70 rotate-45 bg-[#090d13]" />
              <div className="px-3.5 py-1 rounded-full bg-[#090d13] border border-[#e0231c]/40 flex items-center gap-2 shadow-lg shadow-black">
                {kanji && (
                  <span className="font-kanji font-bold text-sm text-[#e0231c]">
                    {kanji}
                  </span>
                )}
                {subtitle && (
                  <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                    {subtitle}
                  </span>
                )}
              </div>
              <div className="w-3 h-3 border border-[#e0231c]/70 rotate-45 bg-[#090d13]" />
            </div>

            {/* Right Asanoha Track */}
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#dfe7e0]/25 to-[#e0231c]/50 relative">
              <svg className="w-full h-8 absolute -top-4 opacity-25" preserveAspectRatio="none" viewBox="0 0 400 32">
                <pattern id="asanoha-right" width="30" height="26" patternUnits="userSpaceOnUse">
                  <path d="M15 0 L30 13 L15 26 L0 13 Z M15 0 L15 26 M0 13 L30 13 M0 0 L30 26 M0 26 L30 0" stroke="#dfe7e0" strokeWidth="0.5" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#asanoha-right)" />
              </svg>
            </div>
          </div>
        )}

        {variant === 'wave' && (
          /* Seigaiha Blue Waves Pattern (青海波) */
          <div className="w-full flex items-center justify-center relative h-10">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#dfe7e0]/20 to-[#e0231c]/40" />
            <div className="mx-4 flex items-center gap-2 relative z-10 shrink-0">
              <span className="text-xs font-kanji text-[#e0231c]">波</span>
              <div className="px-3 py-0.5 rounded-full bg-[#090d13] border border-white/10 text-[10px] font-mono text-neutral-400">
                {subtitle || "SEIGAIHA RIPPLE"}
              </div>
              <span className="text-xs font-kanji text-[#e0231c]">波</span>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#dfe7e0]/20 to-[#e0231c]/40" />
          </div>
        )}
      </motion.div>
    </div>
  );
};
