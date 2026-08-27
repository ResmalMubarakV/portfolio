import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EngineeringLab from './components/EngineeringLab';
import SkillUniverse from './components/SkillUniverse';
import CodePanel from './components/CodePanel';
import StatsSection from './components/StatsSection';
import ProjectsReel from './components/ProjectsReel';
import HorizontalScroll from './components/HorizontalScroll';
import ContactScene from './components/ContactScene';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollControls from './components/ScrollControls';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050508] text-[#F5F5F0] relative overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND CANVAS */}
      <AmbientBackground />

      {/* TOAST NOTIFICATION CONTAINER */}
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: "30px",
          right: "30px",
          zIndex: 999999,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0B0E14",
            color: "#34d399",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: "16px",
            padding: "14px 20px",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "JetBrains Mono, monospace",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
          },
        }}
      />

      {/* TOP SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 origin-left z-[100000] shadow-[0_0_15px_#10b981]"
        style={{ scaleX }}
      />

      {/* NAVIGATION BAR & CURSOR & FLOATING SCROLL CONTROLS */}
      <Navbar />
      <CustomCursor />
      <ScrollControls />

      {/* MAIN INTERACTIVE ENGINEERING LAB FLOW */}
      <main className="relative z-10">
        <Hero />
        <About />
        <EngineeringLab />
        <SkillUniverse />
        <CodePanel />
        <StatsSection />
        <ProjectsReel />
        <HorizontalScroll />
        <ContactScene />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;