import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Volume1, 
  Repeat, 
  Play, 
  Pause, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Music, 
  Sliders,
  Bell
} from 'lucide-react';
import { 
  templeAudio, 
  AMBIENT_TRACKS, 
  AmbientTrackId, 
  SoundscapeState 
} from '../utils/templeAudio';
import { useLanguage } from '../context/LanguageContext';

interface AmbientControlProps {
  className?: string;
  defaultExpanded?: boolean;
}

export const AmbientControl: React.FC<AmbientControlProps> = ({
  className = '',
  defaultExpanded = false,
}) => {
  const [audioState, setAudioState] = useState<SoundscapeState>(templeAudio.getState());
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [strikeSpark, setStrikeSpark] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    return templeAudio.subscribe((state) => {
      setAudioState(state);
    });
  }, []);

  const handleTogglePlay = () => {
    templeAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    templeAudio.setVolume(val);
  };

  const handleToggleLoop = () => {
    templeAudio.setLoop(!audioState.loop);
  };

  const handleSelectTrack = (trackId: AmbientTrackId) => {
    templeAudio.setTrack(trackId);
    if (!audioState.isPlaying) {
      templeAudio.start();
    }
  };

  const handleStrikeAccent = () => {
    templeAudio.triggerCurrentTrackAccent();
    setStrikeSpark(true);
    setTimeout(() => setStrikeSpark(false), 600);
  };

  const currentTrackInfo = AMBIENT_TRACKS.find((t) => t.id === audioState.track) || AMBIENT_TRACKS[0];

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* Collapsed Persistent Capsule Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#070a0e]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/85">
        
        {/* Play / Pause Toggle Button */}
        <button
          onClick={handleTogglePlay}
          title={audioState.isPlaying ? "Pause Temple Soundscape" : "Play Temple Soundscape"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            audioState.isPlaying
              ? 'bg-[#e0231c] text-white shadow-md shadow-[#e0231c]/30'
              : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white'
          }`}
        >
          {audioState.isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono text-[11px] hidden sm:inline">Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#e0231c] shrink-0 fill-current" />
              <span className="font-mono text-[11px] hidden sm:inline">Soundscape</span>
            </>
          )}
        </button>

        {/* Current Track Label Badge */}
        <div 
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-neutral-300 transition-colors cursor-pointer"
          title="Click to change track & audio controls"
        >
          <span className="text-sm leading-none">{currentTrackInfo.icon}</span>
          <span className="text-[11px] font-medium hidden md:inline truncate max-w-[130px]">
            {currentTrackInfo.name}
          </span>
          <span className="text-[10px] font-kanji text-[#e0231c] px-1 py-0.2 rounded bg-black/40 border border-[#e0231c]/30">
            {currentTrackInfo.kanji}
          </span>
        </div>

        {/* Quick Instant Strike Bell Accent */}
        <button
          onClick={handleStrikeAccent}
          title="Strike Temple Bell / Accent Note"
          className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
            strikeSpark
              ? 'bg-[#e0231c] text-white border-[#e0231c] scale-110 shadow-lg shadow-[#e0231c]/50'
              : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-neutral-300 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
        </button>

        {/* Loop Toggle Pill */}
        <button
          onClick={handleToggleLoop}
          title={audioState.loop ? "Soundscape Loop: Active" : "Soundscape Loop: Disabled"}
          className={`p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
            audioState.loop
              ? 'bg-[#e0231c]/20 border-[#e0231c]/50 text-[#e0231c]'
              : 'bg-white/[0.04] border-white/10 text-neutral-500 hover:text-white'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
        </button>

        {/* Expand / Collapse Controls Drawer Toggle */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          title={isExpanded ? "Collapse Soundscape Controls" : "Open Detailed Soundscape Controls (Volume, Tracks)"}
          className={`p-1.5 px-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
            isExpanded
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronUp className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Expanded Control Drawer Panel */}
      {isExpanded && (
        <div className="absolute bottom-full mb-3 right-0 sm:right-auto sm:left-0 w-[310px] sm:w-[340px] p-4 rounded-2xl bg-[#090d13]/98 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/95 text-xs text-neutral-300 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-150 z-40">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e0231c] animate-pulse" />
              <span className="font-cinzel font-bold text-white tracking-wider text-xs">
                TEMPLE SOUNDSCAPE
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              Web Audio Synthesizer
            </span>
          </div>

          {/* Volume Slider Section */}
          <div className="space-y-1.5 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-400 flex items-center gap-1.5">
                {audioState.volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                ) : audioState.volume < 0.4 ? (
                  <Volume1 className="w-3.5 h-3.5 text-[#e0231c]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#e0231c]" />
                )}
                <span>Volume</span>
              </span>
              <span className="font-mono text-white text-[11px]">
                {Math.round(audioState.volume * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioState.volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e0231c]"
              />
            </div>
          </div>

          {/* Track Selection Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="uppercase tracking-wider">Acoustic Soundtracks</span>
              <span className="text-[#e0231c]">4 Tracks</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {AMBIENT_TRACKS.map((track) => {
                const isActive = audioState.track === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#e0231c]/15 border-[#e0231c]/50 text-white shadow-sm shadow-[#e0231c]/20'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/5 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{track.icon}</span>
                      <div>
                        <div className="font-medium text-xs leading-tight">
                          {track.name}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {track.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-kanji text-xs px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[#e0231c]">
                        {track.kanji}
                      </span>
                      {isActive && audioState.isPlaying && (
                        <span className="flex items-end gap-[2px] h-3 ml-0.5">
                          <span className="w-[2px] h-2 bg-[#e0231c] animate-pulse" />
                          <span className="w-[2px] h-3 bg-[#e0231c] animate-pulse delay-75" />
                          <span className="w-[2px] h-1.5 bg-[#e0231c] animate-pulse delay-150" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loop & Strike Footer Row */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            {/* Loop Toggle */}
            <button
              onClick={handleToggleLoop}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                audioState.loop
                  ? 'bg-[#e0231c]/15 border-[#e0231c]/40 text-[#e0231c]'
                  : 'bg-white/5 border-white/10 text-neutral-400'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">
                {audioState.loop ? 'Loop: ON' : 'Loop: OFF'}
              </span>
            </button>

            {/* Strike Bell Button */}
            <button
              onClick={handleStrikeAccent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-[11px] transition-all cursor-pointer hover:border-[#e0231c]/40"
            >
              <Bell className="w-3.5 h-3.5 text-[#e0231c]" />
              <span>Strike Bell</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
