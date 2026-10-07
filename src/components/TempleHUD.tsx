import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  User, 
  X, 
  Volume2, 
  VolumeX, 
  Bell,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { templeAudio } from '../utils/templeAudio';
import { AmbientControl } from './AmbientControl';

interface TempleHUDProps {
  onSwitchToPortfolio: () => void;
  onOpenResumeModal: () => void;
}

export const TempleHUD: React.FC<TempleHUDProps> = ({
  onSwitchToPortfolio,
  onOpenResumeModal,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(templeAudio.getIsPlaying());

  useEffect(() => {
    // Subscribe to soundscape playback state changes
    const unsubscribe = templeAudio.subscribe((state) => {
      setSoundPlaying(state.isPlaying);
    });

    // Auto-trigger soundscape when entering 3D world
    templeAudio.start().then((started) => {
      if (started) setSoundPlaying(true);
    });

    // Also trigger on first gesture if browser audio was locked
    const unlockAudio = () => {
      if (!templeAudio.getIsPlaying()) {
        templeAudio.start().then((started) => {
          if (started) setSoundPlaying(true);
        });
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const handleToggleSound = () => {
    const isNowPlaying = templeAudio.toggle();
    setSoundPlaying(isNowPlaying);
  };

  return (
    <>
      {/* Floating Top Bar: Brand & Persistent Ambient Soundscape Controls */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2.5 pointer-events-auto">
        
        {/* Brand Chip */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070a]/85 backdrop-blur-md border border-white/10 text-white text-xs shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#e0231c] animate-pulse" />
          <span className="font-cinzel font-bold tracking-wider">ABHISHEK DUBEY 3D</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300 font-medium">Software & Web Developer</span>
        </div>

        {/* Persistent Ambient Soundscape Control (Volume, Loop, Tracks) */}
        <AmbientControl />
      </div>

      {/* Floating Bottom Control Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-[#070a0e]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80">
        
        {/* Switch to Portfolio Document */}
        <button
          onClick={onSwitchToPortfolio}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-all cursor-pointer border border-white/5"
        >
          <FileText className="w-3.5 h-3.5 text-[#e0231c]" />
          <span>Portfolio Archive</span>
        </button>

        {/* Quick Profile Drawer */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            drawerOpen 
              ? 'bg-[#e0231c] text-white' 
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick Bio</span>
        </button>

        {/* Soundscape Quick Dock Icon */}
        <button
          onClick={handleToggleSound}
          title={soundPlaying ? "Mute Temple Soundscape" : "Start Temple Soundscape"}
          className={`p-2 rounded-xl transition-all cursor-pointer border ${
            soundPlaying
              ? 'bg-[#e0231c]/20 border-[#e0231c]/40 text-[#e0231c]'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          {soundPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Download Resume PDF */}
        <a
          href={PORTFOLIO_DATA.profile.resumePdfUrl}
          download="Abhishek_Dubey_Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e0231c] hover:bg-[#c41b15] text-white text-xs font-semibold transition-all shadow-lg shadow-[#e0231c]/30 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Resume (PDF)</span>
        </a>
      </div>

      {/* Quick Bio Drawer / Slide-Over */}
      {drawerOpen && (
        <div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-lg p-5 rounded-2xl bg-[#090d13]/95 backdrop-blur-xl border border-[#e0231c]/40 shadow-2xl shadow-black/90 pointer-events-auto text-xs text-neutral-300 space-y-4 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base font-bold text-white">
                  ABHISHEK DUBEY
                </span>
                <span className="font-mono text-[10px] text-[#e0231c] px-1.5 py-0.5 rounded bg-[#e0231c]/10 border border-[#e0231c]/30">
                  MCA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Aspiring Web & Software Developer • Delhi / UP
              </p>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-neutral-300 leading-relaxed font-light text-[11px] bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
            {PORTFOLIO_DATA.profile.bio}
          </p>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#e0231c] uppercase tracking-wider block">
              Core Skills
            </span>
            <div className="flex flex-wrap gap-1">
              {['Java', 'Python', 'C++', 'JavaScript', 'React', 'MySQL', 'DSA', 'OOP'].map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300 border border-white/10">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setDrawerOpen(false);
                onOpenResumeModal();
              }}
              className="text-[#e0231c] hover:underline text-[11px] font-medium cursor-pointer"
            >
              Preview Full CV & Projects →
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                onSwitchToPortfolio();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium cursor-pointer"
            >
              Open Full Portfolio
            </button>
          </div>
        </div>
      )}
    </>
  );
};
