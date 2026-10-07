import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Eye, 
  Menu, 
  X, 
  Compass, 
  FileText, 
  Volume2, 
  VolumeX, 
  Languages,
  ChevronDown,
  CloudRain,
  Snowflake,
  Wind,
  Sun
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { templeAudio } from '../utils/templeAudio';
import { useLanguage } from '../context/LanguageContext';
import { WeatherType } from './WeatherCanvas';

interface WeatherOption {
  id: WeatherType;
  icon: string;
  enLabel: string;
  jaLabel: string;
  kanji: string;
  sub: string;
}

const WEATHER_OPTIONS: WeatherOption[] = [
  { id: 'sakura', icon: '🌸', enLabel: 'Sakura Petals', jaLabel: '桜吹雪', kanji: '桜', sub: 'Cherry Blossom' },
  { id: 'rain', icon: '🌧️', enLabel: 'Temple Rain', jaLabel: '時雨 (雨)', kanji: '雨', sub: 'Light Drizzle' },
  { id: 'snow', icon: '❄️', enLabel: 'Falling Snow', jaLabel: '深雪 (雪)', kanji: '雪', sub: 'Temple Snow' },
  { id: 'mist', icon: '🌫️', enLabel: 'Sacred Mist', jaLabel: '朝霧 (霧)', kanji: '霧', sub: 'Mountain Fog' },
  { id: 'clear', icon: '☀️', enLabel: 'Clear Sky', jaLabel: '快晴 (オフ)', kanji: '晴', sub: 'No Particles' },
];

interface NavbarProps {
  activeView: 'portfolio' | 'temple';
  setActiveView: (view: 'portfolio' | 'temple') => void;
  onOpenResumeModal: () => void;
  petalsEnabled?: boolean;
  onTogglePetals?: () => void;
  weather?: WeatherType;
  onSelectWeather?: (weather: WeatherType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenResumeModal,
  petalsEnabled = true,
  onTogglePetals,
  weather = 'sakura',
  onSelectWeather,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [soundPlaying, setSoundPlaying] = useState(templeAudio.getIsPlaying());
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);
  const weatherDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    return templeAudio.subscribe((state) => {
      setSoundPlaying(state.isPlaying);
    });
  }, []);

  // Close weather dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        weatherDropdownRef.current &&
        !weatherDropdownRef.current.contains(e.target as Node)
      ) {
        setWeatherMenuOpen(false);
      }
    };

    if (weatherMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [weatherMenuOpen]);

  const handleToggleSound = () => {
    const isNowPlaying = templeAudio.toggle();
    setSoundPlaying(isNowPlaying);
  };

  const activeWeatherOpt = WEATHER_OPTIONS.find((opt) => opt.id === weather) || WEATHER_OPTIONS[0];

  const handleSelectWeather = (w: WeatherType) => {
    if (onSelectWeather) {
      onSelectWeather(w);
    } else if (onTogglePetals) {
      onTogglePetals();
    }
    setWeatherMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#05070a]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('portfolio')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#e0231c] to-[#8c120e] p-[1px] shadow-lg shadow-[#e0231c]/25">
              <div className="w-full h-full bg-[#070a0e] rounded-[7px] flex items-center justify-center text-white font-bold text-xs font-cinzel tracking-wider group-hover:text-[#e0231c] transition-colors">
                AD
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-neutral-200 transition-colors">
                  {language === 'ja' ? 'アビシェック・ドゥベイ' : 'ABHISHEK DUBEY'}
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-[#e0231c]/30 text-[#e0231c] bg-[#e0231c]/10">
                  MCA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-light -mt-0.5">
                {language === 'ja' ? 'Web・ソフトウェア開発者' : 'Software & Web Developer'}
              </p>
            </div>
          </button>
        </div>

        {/* View Switcher: Portfolio vs 3D Temple */}
        <div className="hidden md:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setActiveView('portfolio')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeView === 'portfolio'
                ? 'bg-[#e0231c] text-white shadow-md shadow-[#e0231c]/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav.portfolioView}</span>
          </button>
          <button
            onClick={() => setActiveView('temple')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeView === 'temple'
                ? 'bg-[#e0231c] text-white shadow-md shadow-[#e0231c]/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.nav.templeView}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>

        {/* Desktop Links & Actions */}
        <div className="hidden lg:flex items-center gap-5">
          {activeView === 'portfolio' && (
            <nav className="flex items-center gap-4 text-xs text-neutral-300">
              <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
              <a href="#skills" className="hover:text-white transition-colors">{t.nav.skills}</a>
              <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
              <a href="#education" className="hover:text-white transition-colors">{t.nav.education}</a>
              <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            </nav>
          )}

          <div className="flex items-center gap-2">
            {/* Language Toggle Control */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? "日本語に切り替え (Switch to Japanese)" : "Switch to English"}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5 text-[#e0231c]" />
              <span className="font-semibold text-[11px]">{language === 'en' ? 'JA' : 'EN'}</span>
              <span className="text-[10px] text-neutral-400 hidden xl:inline">
                {language === 'en' ? '日本語' : 'English'}
              </span>
            </button>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundPlaying ? "Mute Ambient Soundscape" : "Play Ambient Soundscape (Wind & Bells)"}
              className={`p-1.5 px-2 rounded-lg border text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                soundPlaying
                  ? 'border-[#e0231c]/50 bg-[#e0231c]/15 text-white shadow-sm shadow-[#e0231c]/30'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {soundPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-[#e0231c]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="text-[10px] font-mono hidden xl:inline">
                {soundPlaying ? t.nav.soundOn : t.nav.soundOff}
              </span>
            </button>

            {/* Weather Overlay Toggle Dropdown */}
            {activeView === 'portfolio' && (
              <div className="relative" ref={weatherDropdownRef}>
                <button
                  onClick={() => setWeatherMenuOpen((prev) => !prev)}
                  title={`Current Weather: ${language === 'ja' ? activeWeatherOpt.jaLabel : activeWeatherOpt.enLabel}. Click to switch effects.`}
                  className={`p-1.5 px-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    weather !== 'clear'
                      ? 'border-[#e0231c]/50 bg-[#e0231c]/15 text-white shadow-sm shadow-[#e0231c]/25'
                      : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm leading-none">{activeWeatherOpt.icon}</span>
                  <span className="text-[11px] font-medium hidden xl:inline">
                    {language === 'ja' ? activeWeatherOpt.jaLabel : activeWeatherOpt.enLabel}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${weatherMenuOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {/* Weather Dropdown Menu */}
                {weatherMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#090d13]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/90 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1.5 text-[10px] font-mono text-neutral-400 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span className="uppercase tracking-wider">{t.nav.weather.label}</span>
                      <span className="text-[#e0231c] font-kanji font-bold">天候</span>
                    </div>

                    <div className="space-y-1">
                      {WEATHER_OPTIONS.map((opt) => {
                        const isSelected = weather === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectWeather(opt.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#e0231c]/20 text-white border border-[#e0231c]/40 shadow-sm'
                                : 'text-neutral-300 hover:bg-white/[0.07] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base leading-none">{opt.icon}</span>
                              <div>
                                <div className="font-medium text-xs leading-tight">
                                  {language === 'ja' ? opt.jaLabel : opt.enLabel}
                                </div>
                                <div className="text-[10px] text-neutral-400">
                                  {opt.sub}
                                </div>
                              </div>
                            </div>
                            <span className="font-kanji text-xs px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[#e0231c]">
                              {opt.kanji}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Preview Resume Modal */}
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
              title="Preview Verified Resume"
            >
              <Eye className="w-3.5 h-3.5 text-[#e0231c]" />
              <span>{t.nav.preview}</span>
            </button>

            {/* Download Official Resume PDF */}
            <a
              href={PORTFOLIO_DATA.profile.resumePdfUrl}
              download="Abhishek_Dubey_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#e0231c] hover:bg-[#c41b15] rounded-lg transition-all shadow-md shadow-[#e0231c]/25 hover:shadow-lg hover:shadow-[#e0231c]/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.downloadResume}</span>
            </a>
          </div>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="p-1.5 px-2 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-neutral-200 flex items-center gap-1"
          >
            <Languages className="w-3 h-3 text-[#e0231c]" />
            <span>{language.toUpperCase()}</span>
          </button>
          <a
            href={PORTFOLIO_DATA.profile.resumePdfUrl}
            download="Abhishek_Dubey_Resume.pdf"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#e0231c] rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 border-b border-white/10 bg-[#070a0e]/95 backdrop-blur-xl space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => {
                setActiveView('portfolio');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium ${
                activeView === 'portfolio' ? 'bg-[#e0231c] text-white' : 'text-neutral-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.portfolioView}</span>
            </button>
            <button
              onClick={() => {
                setActiveView('temple');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium ${
                activeView === 'temple' ? 'bg-[#e0231c] text-white' : 'text-neutral-400'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.nav.templeView}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-neutral-300 font-medium">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 px-2 rounded hover:bg-white/5"
            >
              {t.nav.about}
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 px-2 rounded hover:bg-white/5"
            >
              {t.nav.skills}
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 px-2 rounded hover:bg-white/5"
            >
              {t.nav.projects}
            </a>
            <a 
              href="#education" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 px-2 rounded hover:bg-white/5"
            >
              {t.nav.education}
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 px-2 rounded hover:bg-white/5"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Weather and Soundscape Controls */}
          {activeView === 'portfolio' && (
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="uppercase tracking-wider">{t.nav.weather.label}</span>
                <span className="text-[#e0231c] font-medium">
                  {activeWeatherOpt.icon} {language === 'ja' ? activeWeatherOpt.jaLabel : activeWeatherOpt.enLabel}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {WEATHER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectWeather(opt.id)}
                    className={`flex flex-col items-center py-2 px-1 rounded-lg border text-xs transition-all cursor-pointer ${
                      weather === opt.id
                        ? 'border-[#e0231c] bg-[#e0231c]/25 text-white font-bold shadow-md shadow-[#e0231c]/30'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="text-[10px] font-kanji mt-0.5">{opt.kanji}</span>
                  </button>
                ))}
              </div>

              {/* Soundscape button in mobile */}
              <button
                onClick={handleToggleSound}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                  soundPlaying
                    ? 'border-[#e0231c]/50 bg-[#e0231c]/20 text-white shadow-sm'
                    : 'border-white/10 bg-white/5 text-neutral-300'
                }`}
              >
                {soundPlaying ? (
                  <Volume2 className="w-4 h-4 text-[#e0231c]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-neutral-400" />
                )}
                <span className="font-mono text-[11px]">
                  {soundPlaying ? t.nav.soundOn : t.nav.soundOff}
                </span>
              </button>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenResumeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-200"
            >
              <Eye className="w-4 h-4 text-[#e0231c]" />
              <span>{t.modal.title}</span>
            </button>
            <a
              href={PORTFOLIO_DATA.profile.resumePdfUrl}
              download="Abhishek_Dubey_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#e0231c] text-xs font-semibold text-white shadow-lg shadow-[#e0231c]/30"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.downloadResume}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
