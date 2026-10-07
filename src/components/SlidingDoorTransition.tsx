import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface SlidingDoorTransitionProps {
  isOpen: boolean; // true = doors are open (hidden at edges), false = doors closed in center
  targetViewName?: 'portfolio' | 'temple';
}

export const SlidingDoorTransition: React.FC<SlidingDoorTransitionProps> = ({
  isOpen,
  targetViewName,
}) => {
  const { language } = useLanguage();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize authentic wooden sliding door glide and latch sound
  const playSlidingDoorSound = (closing: boolean) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // 1. Wooden friction slide whoosh (filtered noise)
      const bufferSize = ctx.sampleRate * 0.45;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.04 * white) / 1.04;
        output[i] = lastOut * 1.8;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(closing ? 380 : 450, now);
      filter.frequency.exponentialRampToValueAtTime(closing ? 650 : 250, now + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noiseSource.start(now);

      // 2. Wooden latch click when doors meet in the center
      if (closing) {
        const clickTime = now + 0.42;
        const osc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, clickTime);
        osc.frequency.exponentialRampToValueAtTime(80, clickTime + 0.06);

        clickGain.gain.setValueAtTime(0.001, clickTime);
        clickGain.gain.linearRampToValueAtTime(0.15, clickTime + 0.005);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.08);

        osc.connect(clickGain);
        clickGain.connect(ctx.destination);
        osc.start(clickTime);
        osc.stop(clickTime + 0.1);
      }
    } catch {}
  };

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    playSlidingDoorSound(!isOpen);
  }, [isOpen]);

  const transitionConfig = {
    duration: 0.45,
    ease: [0.25, 1, 0.5, 1] as const,
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] overflow-hidden pointer-events-none select-none transition-opacity duration-300 ${
        isOpen ? 'opacity-0 delay-500' : 'opacity-100'
      }`}
    >
      {/* LEFT TEMPLE SLIDING DOOR (襖 - Fusuma) */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? '-100%' : '0%' }}
        transition={transitionConfig}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#070a0e] border-r-2 border-[#161c24] shadow-[15px_0_35px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden"
      >
        {/* Washi Paper Subtle Texture & Radial Backlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#090d14] to-[#0f141d] opacity-95" />
        
        {/* Traditional Kumiko Lattice Transom Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="shoji-lattice-left" width="48" height="64" patternUnits="userSpaceOnUse">
              <rect width="48" height="64" fill="none" stroke="#dfe7e0" strokeWidth="0.8" strokeOpacity="0.3" />
              <line x1="24" y1="0" x2="24" y2="64" stroke="#dfe7e0" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="0" y1="32" x2="48" y2="32" stroke="#dfe7e0" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shoji-lattice-left)" />
        </svg>

        {/* Decorative Vertical Wooden Struts */}
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-white/[0.06]" />
        <div className="absolute top-0 bottom-0 right-36 w-[1px] bg-white/[0.04]" />
        
        {/* Left Half of Traditional Bronze Door Pull (引手 - Hikite) */}
        <div className="relative mr-[-1px] w-12 h-24 rounded-l-full border-y border-l border-[#c5a059]/40 bg-gradient-to-r from-[#0d121a] to-[#05070a] shadow-inner flex items-center justify-center z-10">
          <div className="w-8 h-16 rounded-l-full border border-[#c5a059]/30 bg-black/50 flex items-center justify-end pr-1">
            <span className="font-cinzel text-xs font-bold text-[#e0231c]">A</span>
          </div>
        </div>

        {/* Left Seam Red Hairline Accent */}
        <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#e0231c] to-transparent opacity-80" />
      </motion.div>

      {/* RIGHT TEMPLE SLIDING DOOR (襖 - Fusuma) */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={transitionConfig}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#070a0e] border-l-2 border-[#161c24] shadow-[-15px_0_35px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden"
      >
        {/* Washi Paper Subtle Texture & Radial Backlight */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#05070a] via-[#090d14] to-[#0f141d] opacity-95" />

        {/* Traditional Kumiko Lattice Transom Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="shoji-lattice-right" width="48" height="64" patternUnits="userSpaceOnUse">
              <rect width="48" height="64" fill="none" stroke="#dfe7e0" strokeWidth="0.8" strokeOpacity="0.3" />
              <line x1="24" y1="0" x2="24" y2="64" stroke="#dfe7e0" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="0" y1="32" x2="48" y2="32" stroke="#dfe7e0" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shoji-lattice-right)" />
        </svg>

        {/* Decorative Vertical Wooden Struts */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/[0.06]" />
        <div className="absolute top-0 bottom-0 left-36 w-[1px] bg-white/[0.04]" />

        {/* Right Half of Traditional Bronze Door Pull (引手 - Hikite) */}
        <div className="relative ml-[-1px] w-12 h-24 rounded-r-full border-y border-r border-[#c5a059]/40 bg-gradient-to-l from-[#0d121a] to-[#05070a] shadow-inner flex items-center justify-center z-10">
          <div className="w-8 h-16 rounded-r-full border border-[#c5a059]/30 bg-black/50 flex items-center justify-start pl-1">
            <span className="font-cinzel text-xs font-bold text-[#e0231c]">D</span>
          </div>
        </div>

        {/* Right Seam Red Hairline Accent */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#e0231c] to-transparent opacity-80" />
      </motion.div>

      {/* CENTRAL EMBLEM CREST (Appears at Center Lock Moment) */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.8 : 1,
        }}
        transition={{ duration: 0.25, delay: isOpen ? 0 : 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        {/* Circular Torii Seal & Monogram Lock */}
        <div className="relative w-24 h-24 rounded-full bg-[#05070a]/95 border-2 border-[#e0231c]/60 shadow-[0_0_40px_rgba(224,35,28,0.35)] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-white/10 flex flex-col items-center justify-center">
            <span className="font-cinzel text-lg font-bold text-white tracking-widest">
              AD
            </span>
            <span className="font-kanji text-[10px] text-[#e0231c]">
              {targetViewName === 'temple' ? '三次元' : '記録'}
            </span>
          </div>
        </div>

        {/* Transition Subtitle */}
        <div className="px-4 py-1.5 rounded-full bg-[#070a0e]/95 border border-white/15 backdrop-blur-md shadow-xl text-center">
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase block">
            {targetViewName === 'temple' 
              ? (language === 'ja' ? '3D空間へ移行中...' : 'Entering 3D World...') 
              : (language === 'ja' ? 'ポートフォリオへ移行中...' : 'Opening Portfolio Sanctuary...')}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
