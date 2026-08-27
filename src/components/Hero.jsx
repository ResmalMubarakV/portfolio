import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // SCROLL-LINKED PARALLAX ANIMATIONS
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#090A0F] text-slate-100"
    >
      {/* 1. FULL BLEED MAX-WIDTH & MAX-HEIGHT BACKGROUND IMAGE LAYER */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
      >
        <motion.img
          src={profileImage}
          alt="Resmal Mubarak V"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.1]"
        />
      </motion.div>

      {/* 2. CRITICAL DARK OVERLAY MASK OVER ENTIRE BACKGROUND IMAGE */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/55 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,10,15,0.45)_0%,#090A0F_85%)] z-10 pointer-events-none" />

      {/* AMBIENT GLOW ACCENT */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/15 rounded-full blur-[250px] pointer-events-none z-10" />

      {/* CURSOR INTERACTION RADIAL EMERALD GLOW */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
        }}
      />

      {/* 3. HIGH-CONTRAST LAYERED TEXT CONTENT (Z-20 ABOVE DARK OVERLAY IMAGE) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center my-auto pt-24 pb-16 sm:pt-28 sm:pb-20"
      >
        {/* PRE-HEADER (MONOSPACE - COMPACT ON MOBILE, FULL ON DESKTOP) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full bg-[#090A0F]/90 border border-blue-500/40 text-blue-400 text-[11px] sm:text-sm font-mono tracking-wider mb-4 sm:mb-6 shadow-[0_0_20px_rgba(59,130,246,0.35)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
          <span className="font-semibold uppercase sm:hidden">// RESMAL MUBARAK V.</span>
          <span className="font-semibold uppercase hidden sm:inline">// RESMAL MUBARAK V. | FULL STACK DEVELOPER | PALAKKAD, KERALA</span>
        </motion.div>

        {/* COMMANDING MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-black text-3xl sm:text-6xl lg:text-[76px] text-white tracking-tight leading-[1.1] sm:leading-[1.05] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
        >
          I BUILD DIGITAL <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400">
            PRODUCTS THAT SCALE.
          </span>
        </motion.h1>

        {/* REFINED BIO / SUB-HEADLINE (HIDDEN ON MOBILE TO KEEP MINIMAL, SHOWN ON DESKTOP) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:block font-sans font-light text-base sm:text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed mt-6 mb-8 drop-shadow-md"
        >
          Crafting high-performance, production-ready web applications. From resilient backend API architecture to lightning-fast, reactive frontends.
        </motion.p>

        {/* INTERACTIVE CTA BUTTONS (COMPACT ON MOBILE, STANDARD ON DESKTOP) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-row items-center justify-center gap-3 mt-6 sm:mt-0 w-full sm:w-auto"
        >
          {/* PRIMARY BUTTON: EXPLORE WORK */}
          <MagneticButton
            href="#projects"
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 group"
          >
            <span>Explore Work</span>
            <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          {/* SECONDARY BUTTON: GET RESUME */}
          <MagneticButton
            href="/ResmalMubarakV-resume.pdf"
            download
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#090A0F]/80 backdrop-blur-md border border-slate-600 hover:border-blue-400 text-white font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-blue-500/15 transition-all duration-300 group"
          >
            <FileText size={14} className="sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span>Resume</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* FLOATING BOTTOM BEACON STRIP */}
      <div className="absolute bottom-5 left-6 right-6 z-20 hidden sm:flex items-center justify-between text-xs font-mono text-slate-400 max-w-6xl mx-auto w-full px-4 sm:px-6">
        <span className="flex items-center gap-2 text-blue-400">
          <Sparkles size={13} className="animate-spin-slow" /> MERN STACK ARCHITECTURE
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" /> AVAILABLE FOR HIRE
        </span>
      </div>
    </section>
  );
};

export default Hero;