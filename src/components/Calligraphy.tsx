import React from 'react';
import { motion } from 'motion/react';

interface CalligraphyProps {
  kanji: '技' | '実' | '作' | '道' | '学' | '結';
  englishTitle: string;
  eyebrow?: string;
  subtitle?: string;
  className?: string;
  badge?: string;
}

// Authentic stroke definitions for each Kanji
const KANJI_STROKES: Record<string, string[]> = {
  // 技 (Waza - Skill / Technology)
  技: [
    'M 16 34 Q 30 33 44 31', // Tehen horizontal
    'M 32 14 L 32 78 Q 32 86 22 76', // Tehen vertical hook
    'M 12 68 Q 28 58 45 48', // Tehen upward flick
    'M 52 28 Q 70 28 88 28', // Right top horizontal
    'M 70 30 Q 60 42 50 54', // Slanted stroke
    'M 46 52 L 86 52 Q 88 52 82 66', // Cross horizontal
    'M 74 54 Q 60 72 44 88', // Left downward flourish
    'M 54 58 Q 74 74 94 88', // Right downward flourish
  ],
  // 実 (Jitsu - Work / Reality / Achievement)
  実: [
    'M 50 12 L 50 24', // Top crown dot
    'M 26 28 Q 32 34 34 40', // Left roof dot
    'M 26 28 L 74 28 Q 76 28 72 40', // Roof cross
    'M 32 44 L 68 44', // Mid bar 1
    'M 22 58 L 78 58', // Mid bar 2 (wide)
    'M 50 28 L 50 78 Q 50 86 40 78', // Center vertical hook
    'M 42 64 Q 34 74 24 84', // Left sweeping leg
    'M 58 64 Q 68 76 78 84', // Right sweeping leg
  ],
  // 作 (Saku - Creation / Project)
  作: [
    'M 34 18 Q 24 38 16 54', // Ninben slant
    'M 26 40 L 26 86', // Ninben vertical
    'M 48 24 L 42 38', // Right top slant
    'M 44 38 L 86 38', // Horizontal 1
    'M 72 16 L 72 88', // Right tall vertical
    'M 46 58 L 72 58', // Horizontal 2
    'M 40 78 L 88 78', // Horizontal 3 base
  ],
  // 道 (Michi - Path / Philosophy)
  道: [
    'M 48 14 L 60 24', // Top right dot
    'M 74 14 L 62 24', // Top left dot
    'M 44 32 L 78 32', // Kubi top bar
    'M 44 32 L 44 68', // Kubi left
    'M 78 32 L 78 68', // Kubi right
    'M 44 50 L 78 50', // Kubi mid bar
    'M 44 68 L 78 68', // Kubi base
    'M 20 22 Q 28 26 26 36', // Shinnyo dot
    'M 18 42 L 32 50 Q 20 62 28 66', // Shinnyo bend
    'M 16 70 Q 32 78 88 88', // Shinnyo grand base sweep
  ],
  // 学 (Gaku - Study / Education)
  学: [
    'M 32 14 L 38 24', // Top left dot
    'M 50 12 L 50 24', // Top center dot
    'M 68 14 L 62 24', // Top right dot
    'M 24 30 L 76 30 Q 78 30 72 40', // Crown roof
    'M 44 48 L 56 48', // Child head
    'M 50 48 L 50 82 Q 50 88 42 80', // Child body hook
    'M 30 62 L 70 62', // Child arms wide bar
  ],
  // 結 (Musubi - Connection / Contact)
  結: [
    'M 30 18 L 22 34', // Ito top slant
    'M 22 34 L 38 42', // Ito bend
    'M 34 38 L 18 56', // Ito lower slant
    'M 28 58 L 28 86', // Ito vertical
    'M 56 22 L 78 22', // Right top bar
    'M 68 14 L 68 36', // Right center stem
    'M 48 36 L 86 36', // Right long bar
    'M 52 50 L 52 80 L 82 80 L 82 50 Z', // Mouth box (kuchi)
  ],
};

export const Calligraphy: React.FC<CalligraphyProps> = ({
  kanji,
  englishTitle,
  eyebrow,
  subtitle,
  badge,
  className = '',
}) => {
  const strokes = KANJI_STROKES[kanji] || KANJI_STROKES['技'];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 ${className}`}
    >
      {/* Left Text Block with Under-Brush Animation */}
      <div className="space-y-2 max-w-2xl relative z-10">
        {/* Eyebrow Label */}
        {eyebrow && (
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -15 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="flex items-center gap-2 text-xs font-mono text-[#e0231c] uppercase tracking-widest"
          >
            <span>{eyebrow}</span>
            <span>•</span>
            <span className="font-kanji text-sm text-neutral-400">{kanji}</span>
          </motion.div>
        )}

        {/* English Title with Dynamic Brush Stroke Underline */}
        <div className="relative inline-block">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-cinzel tracking-tight"
          >
            {englishTitle}
          </motion.h2>

          {/* Sweeping Calligraphic Ink Underline */}
          <svg
            className="w-full h-3 -mt-1 overflow-visible pointer-events-none"
            viewBox="0 0 300 12"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 2 6 Q 75 11 150 5 T 298 6"
              stroke="#e0231c"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.85,
                  transition: { duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            />
            {/* Subtle secondary water bleed line */}
            <motion.path
              d="M 12 8 Q 110 3 220 8"
              stroke="#dfe7e0"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.5,
                  transition: { duration: 0.8, delay: 0.55 },
                },
              }}
            />
          </svg>
        </div>

        {/* Subtitle Description */}
        {subtitle && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } },
            }}
            className="text-sm text-neutral-400 mt-2 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Right Kanji Ink Brush Showcase (Shodo) */}
      <div className="flex items-center gap-4 shrink-0">
        {badge && (
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
            }}
            className="text-xs font-mono text-neutral-400 hidden sm:inline-block"
          >
            {badge}
          </motion.span>
        )}

        {/* Animated Brush Stroke Kanji Box */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center p-1 rounded-2xl bg-[#090d13]/90 border border-white/[0.08] shadow-2xl shadow-black/80 group">
          {/* Subtle Ambient Radial Red Flare */}
          <div className="absolute inset-0 rounded-2xl bg-[#e0231c]/10 blur-md pointer-events-none" />

          {/* Dynamic Brush-Stroke Kanji SVG */}
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 overflow-visible"
            viewBox="0 0 100 100"
            fill="none"
          >
            {strokes.map((d, index) => (
              <motion.path
                key={index}
                d={d}
                stroke="#e0231c"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.55,
                      delay: 0.2 + index * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              />
            ))}
          </svg>

          {/* Traditional Red Calligrapher Seal Stamp (落款印 - Inkan) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 2.2, rotate: -15 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: -4,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                  delay: 0.2 + strokes.length * 0.09 + 0.15,
                },
              },
            }}
            className="absolute bottom-1 right-1 w-5 h-5 rounded-[3px] border border-[#e0231c] bg-[#e0231c]/20 flex items-center justify-center text-[9px] font-kanji font-bold text-[#e0231c] shadow-sm select-none"
            title="Artist Seal"
          >
            阿
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
