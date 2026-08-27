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

      {/* 3. HIGH-CONTRAST LAYERED TEXT CONTENT (Z-20 ABOVE DARK OVERLAY IMAGE - NO SEPARATE INNER CARD) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center my-auto pt-28 pb-20"
      >
        {/* PRE-HEADER (MONOSPACE) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#090A0F]/90 border border-blue-500/40 text-blue-400 text-xs sm:text-sm font-mono tracking-wider mb-6 shadow-[0_0_20px_rgba(59,130,246,0.35)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
          <span className="font-semibold uppercase">// RESMAL MUBARAK V. | FULL STACK DEVELOPER | PALAKKAD, KERALA</span>
        </motion.div>

        {/* COMMANDING MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] text-white tracking-tight leading-[1.05] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
        >
          I BUILD DIGITAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400">
            PRODUCTS THAT SCALE.
          </span>
        </motion.h1>

        {/* REFINED BIO / SUB-HEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans font-light text-base sm:text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed mt-6 mb-8 drop-shadow-md"
        >
          Crafting high-performance, production-ready web applications. From resilient backend API architecture to lightning-fast, reactive frontends.
        </motion.p>

        {/* INTERACTIVE CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* PRIMARY BUTTON: EXPLORE WORK */}
          <MagneticButton
            href="#projects"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 group"
          >
            <span>Explore Work</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          {/* SECONDARY BUTTON: GET RESUME */}
          <MagneticButton
            href="/Resmal_MERN_FullStack_Developer.pdf"
            download
            className="px-8 py-4 rounded-xl bg-[#090A0F]/80 backdrop-blur-md border border-slate-600 hover:border-blue-400 text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2.5 hover:bg-blue-500/15 transition-all duration-300 group"
          >
            <FileText size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span>Get Resume</span>
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