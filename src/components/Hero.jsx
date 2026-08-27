import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers, Code2, Server, ShieldCheck } from 'lucide-react';
import { FaDownload, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary, SiRedux } from 'react-icons/si';
import MagneticButton from './MagneticButton';

const techStack = [
  { name: 'React 19', icon: FaReact, color: 'group-hover:text-[#61DAFB]' },
  { name: 'JavaScript', icon: SiJavascript, color: 'group-hover:text-[#F7DF1E]' },
  { name: 'Node.js', icon: FaNodeJs, color: 'group-hover:text-[#339933]' },
  { name: 'Express.js', icon: SiExpress, color: 'group-hover:text-white' },
  { name: 'MongoDB', icon: SiMongodb, color: 'group-hover:text-[#47A248]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'group-hover:text-[#06B6D4]' },
  { name: 'Redux', icon: SiRedux, color: 'group-hover:text-[#764ABC]' },
  { name: 'Git', icon: FaGitAlt, color: 'group-hover:text-[#F05032]' },
  { name: 'GitHub', icon: FaGithub, color: 'group-hover:text-white' },
  { name: 'Postman', icon: SiPostman, color: 'group-hover:text-[#FF6C37]' },
  { name: 'Vercel', icon: SiVercel, color: 'group-hover:text-white' },
  { name: 'Cloudinary', icon: SiCloudinary, color: 'group-hover:text-[#3448C5]' },
  { name: 'PayPal API', icon: FaPaypal, color: 'group-hover:text-[#00457C]' },
];

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.05]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-36 pb-10 bg-[#050508]"
    >
      {/* AMBIENT MINT EMERALD LIGHTING */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* MAIN HERO CONTENT */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto text-center flex flex-col items-center"
      >
        
        {/* 1. STATUS BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0E14] border border-white/10 text-slate-300 text-xs font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider">RESMAL MUBARAK V</span>
          <span className="text-slate-600">//</span>
          <span className="text-emerald-400">FULL STACK MERN DEVELOPER</span>
        </motion.div>

        {/* 2. MINIMAL HIGH-IMPACT HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight"
        >
          I BUILD <span className="text-gradient-emerald">DIGITAL PRODUCTS.</span>
        </motion.h1>

        {/* 3. CONCISE ONE-LINE BIO */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 mt-6 max-w-xl leading-relaxed font-sans"
        >
          Full Stack Developer crafting web applications with React, Node.js, Express & MongoDB.
        </motion.p>

        {/* 4. CLEAN CTAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto"
        >
          <MagneticButton
            href="#projects"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:opacity-90 transition group"
          >
            <span>EXPLORE WORK</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href="/Resmal_MERN_FullStack_Developer.pdf"
            download
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0B0E14] border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#111622] transition group"
          >
            <FaDownload size={12} className="text-emerald-400" />
            <span>GET RESUME</span>
          </MagneticButton>
        </motion.div>

        {/* 5. MINIMAL METRICS BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-6 mt-12 font-mono text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-emerald-400" /> 03 Projects
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Server size={14} className="text-emerald-400" /> 25+ REST APIs
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" /> 100% Quality
          </span>
        </motion.div>

      </motion.div>

      {/* CONTINUOUS TECH MARQUEE STRIP */}
      <div className="relative z-10 w-full mt-10 overflow-hidden py-3 border-y border-white/10 bg-[#080B10]">
        <div className="flex w-max items-center gap-10 sm:gap-14 animate-marquee">
          {[...techStack, ...techStack].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="group flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-500 grayscale transition-all duration-300 group-hover:grayscale-0 ${tech.color}`}
                />
                <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;