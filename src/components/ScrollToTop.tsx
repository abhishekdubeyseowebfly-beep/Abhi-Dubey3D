import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once scrolled past the hero section (~450px)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-7 right-7 z-40">
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.7,
          y: isVisible ? 0 : 20,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        whileHover={isVisible ? { scale: 1.08, y: -2 } : {}}
        whileTap={isVisible ? { scale: 0.95 } : {}}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex items-center justify-center p-3.5 rounded-full bg-[#090d13]/90 backdrop-blur-xl border border-white/10 hover:border-[#e0231c]/60 shadow-2xl shadow-black/90 text-neutral-300 hover:text-white transition-all cursor-pointer"
        aria-label="Scroll to top of page"
        title="Return to Top · Abhishek Dubey"
        tabIndex={isVisible ? 0 : -1}
      >
        {/* Subtle Vermilion Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#e0231c]/10 blur-md group-hover:bg-[#e0231c]/25 transition-colors pointer-events-none" />

        {/* Bell Icon with Upward Motion Hint */}
        <div className="relative flex flex-col items-center justify-center">
          <Bell className="w-5 h-5 text-[#e0231c] group-hover:rotate-12 transition-transform duration-300" />
          <ChevronUp className="w-3 h-3 text-neutral-400 group-hover:text-white -mt-1 group-hover:-translate-y-0.5 transition-all" />
        </div>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-[#05070a]/95 border border-white/10 text-[11px] font-mono text-neutral-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Return to Top · Abhishek Dubey
        </span>
      </motion.button>
    </div>
  );
};
