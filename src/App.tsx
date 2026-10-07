import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scene } from './components/Scene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { TempleHUD } from './components/TempleHUD';
import { WeatherCanvas, WeatherType } from './components/WeatherCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { JapaneseDivider } from './components/JapaneseDivider';
import { SlidingDoorTransition } from './components/SlidingDoorTransition';
import { templeAudio } from './utils/templeAudio';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'temple'>('temple');
  const [targetView, setTargetView] = useState<'portfolio' | 'temple'>('temple');
  const [isDoorOpen, setIsDoorOpen] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherType>('sakura');

  // Smooth sliding door split wipe transition between 3D world and portfolio
  const handleSwitchView = (newView: 'portfolio' | 'temple') => {
    if (newView === activeView) return;
    setTargetView(newView);
    setIsDoorOpen(false); // Close sliding doors
    setTimeout(() => {
      setActiveView(newView);
      if (newView === 'portfolio') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      setTimeout(() => {
        setIsDoorOpen(true); // Open sliding doors to reveal new view
      }, 120);
    }, 450);
  };

  // Trigger ambient temple soundscape when entering temple view
  React.useEffect(() => {
    if (activeView === 'temple') {
      templeAudio.start();
    }
  }, [activeView]);

  // Common section scroll animation configuration
  const sectionAnimation = {
    initial: { opacity: 0, y: 45 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#05070a] text-[#edf2ee] selection:bg-[#e0231c]/30 selection:text-white relative">
        {/* Temple Sliding Door Wipe Transition */}
        <SlidingDoorTransition isOpen={isDoorOpen} targetViewName={targetView} />

        {/* Scroll Progress Bar */}
        {activeView === 'portfolio' && <ScrollProgress />}

        {/* Dynamic Weather Particle Overlay (Sakura, Light Rain, Snow, Mist, Clear) */}
        {activeView === 'portfolio' && (
          <WeatherCanvas weather={weather} />
        )}

        {/* Resume Document Modal */}
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />

        {activeView === 'temple' ? (
          /* Full 3D Interactive World — Abhishek Dubey */
          <main className="relative w-screen h-screen overflow-hidden">
            <Scene />
            <TempleHUD
              onSwitchToPortfolio={() => handleSwitchView('portfolio')}
              onOpenResumeModal={() => setResumeModalOpen(true)}
            />
          </main>
        ) : (
          /* Portfolio Sanctuary — Abhishek Dubey */
          <div className="flex flex-col min-h-screen">
            <Navbar
              activeView={activeView}
              setActiveView={handleSwitchView}
              onOpenResumeModal={() => setResumeModalOpen(true)}
              weather={weather}
              onSelectWeather={setWeather}
              petalsEnabled={weather !== 'clear'}
              onTogglePetals={() => setWeather((prev) => (prev === 'clear' ? 'sakura' : 'clear'))}
            />

            <main className="flex-1">
              {/* Hero Section */}
              <motion.section
                initial={sectionAnimation.initial}
                whileInView={sectionAnimation.whileInView}
                viewport={sectionAnimation.viewport}
                transition={sectionAnimation.transition}
              >
                <HeroSection
                  onOpenResumeModal={() => setResumeModalOpen(true)}
                  onEnterTemple={() => handleSwitchView('temple')}
                />
              </motion.section>

              {/* Shoji Screen Motif Divider */}
              <JapaneseDivider variant="shoji" kanji="技" subtitle="Technical Matrix" />

              {/* Skills Section */}
              <motion.section
                initial={sectionAnimation.initial}
                whileInView={sectionAnimation.whileInView}
                viewport={sectionAnimation.viewport}
                transition={sectionAnimation.transition}
              >
                <SkillsSection />
              </motion.section>

              {/* Sacred Shimenawa Braided Rope Divider */}
              <JapaneseDivider variant="rope" kanji="実" subtitle="Works & Implementations" />

              {/* Projects Section */}
              <motion.section
                initial={sectionAnimation.initial}
                whileInView={sectionAnimation.whileInView}
                viewport={sectionAnimation.viewport}
                transition={sectionAnimation.transition}
              >
                <ProjectsSection />
              </motion.section>

              {/* Asanoha Geometric Lattice Divider */}
              <JapaneseDivider variant="asanoha" kanji="学" subtitle="Academic Heritage" />

              {/* Education & Certifications Section */}
              <motion.section
                initial={sectionAnimation.initial}
                whileInView={sectionAnimation.whileInView}
                viewport={sectionAnimation.viewport}
                transition={sectionAnimation.transition}
              >
                <EducationSection />
              </motion.section>

              {/* Sacred Shimenawa Braided Rope Divider */}
              <JapaneseDivider variant="rope" kanji="結" subtitle="Transmission & Connect" />

              {/* Contact Section */}
              <motion.section
                initial={sectionAnimation.initial}
                whileInView={sectionAnimation.whileInView}
                viewport={sectionAnimation.viewport}
                transition={sectionAnimation.transition}
              >
                <ContactSection
                  onOpenResumeModal={() => setResumeModalOpen(true)}
                />
              </motion.section>

              {/* Dedicated Footer with Muted Japanese Aesthetic */}
              <Footer onOpenResumeModal={() => setResumeModalOpen(true)} />
            </main>

            {/* Floating Scroll To Top Button */}
            <ScrollToTop />
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
