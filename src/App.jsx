import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-blue-200 relative">

      {/* 🔥 TOAST (now feels attached to UI) */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "120px",
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#020617",
            color: "#38bdf8",
            border: "1px solid rgba(56,189,248,0.3)",
            borderRadius: "12px",
            padding: "12px 18px",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      <CustomCursor />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;