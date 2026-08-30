import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EngineeringLab from './components/EngineeringLab';
import Projects from './components/Projects';
import SkillUniverse from './components/SkillUniverse';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * SectionReveal — Wraps a section and adds the `in-view` class when
 * it enters the viewport, triggering a smooth fade+slide entrance.
 * Uses IntersectionObserver (no Framer Motion overhead).
 */
function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay lets the browser paint before animating
          setTimeout(() => el.classList.add('in-view'), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.07 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="section-reveal">
      {children}
    </div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-[#080811] text-slate-100 font-sans selection:bg-violet-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* GLOBAL TOASTER NOTIFICATIONS */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d0e24',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
          },
        }}
      />

      {/* AMBIENT BACKGROUND WITH POINTER RADIAL LIGHTING */}
      <AmbientBackground />

      {/* PREMIUM CUSTOM CURSOR */}
      <CustomCursor />

      {/* SMOOTH TOP SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 z-[999999] origin-left shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        style={{ scaleX }}
      />

      {/* FIXED GLASSMORPHISM NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT SECTIONS — each wrapped in SectionReveal */}
      <main id="main-content" className="relative z-10">
        {/* Hero is above-the-fold — no reveal wrapper */}
        <Hero />

        <SectionReveal delay={0}>
          <About />
        </SectionReveal>

        <SectionReveal delay={0}>
          <Projects />
        </SectionReveal>

        <SectionReveal delay={0}>
          <SkillUniverse />
        </SectionReveal>

        <SectionReveal delay={0}>
          <EngineeringLab />
        </SectionReveal>

        <SectionReveal delay={0}>
          <Experience />
        </SectionReveal>

        <SectionReveal delay={0}>
          <Contact />
        </SectionReveal>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
