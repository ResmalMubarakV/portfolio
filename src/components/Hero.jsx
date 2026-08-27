import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Server, ShieldCheck, Terminal, Copy, Check } from 'lucide-react';
import { FaDownload, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary, SiRedux } from 'react-icons/si';
import toast from 'react-hot-toast';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';

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
  const [copied, setCopied] = useState(false);
  const [activeCodeLine, setActiveCodeLine] = useState(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.05]);

  const codeSnippet = `const developer = {
  name: "Resmal Mubarak V",
  role: "Full Stack MERN Developer",
  location: "Palakkad, Kerala, India",
  stack: ["MongoDB", "Express", "React", "Node"],
  status: "Available for Hire"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 pb-10 bg-[#050508]"
    >
      {/* AMBIENT MINT EMERALD LIGHTING */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-emerald-500/10 rounded-full blur-[200px] pointer-events-none" />

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
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 font-mono text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-emerald-400" /> 03 Projects
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Server size={14} className="text-emerald-400" /> 25+ REST APIs
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" /> 100% Quality
          </span>
        </motion.div>

        {/* 6. EMBEDDED DEVELOPER.JS CODE IDE BOX */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-2xl lg:max-w-3xl mt-10 text-left"
        >
          <TiltCard maxRotate={4}>
            <div className="glass-card-lab rounded-2xl border border-white/15 overflow-hidden shadow-2xl bg-[#090d16]/90 backdrop-blur-xl">
              
              {/* MACOS WINDOW HEADER */}
              <div className="flex justify-between items-center px-4 sm:px-6 py-3 bg-[#050508] border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-300 flex items-center gap-2">
                    <Terminal size={14} className="text-emerald-400" /> developer.js
                  </span>
                </div>

                <button
                  onClick={copyCode}
                  aria-label="Copy code snippet"
                  className="px-3 py-1 text-slate-300 hover:text-white rounded-lg bg-[#111622] border border-white/10 hover:border-emerald-400/40 transition flex items-center gap-1.5 text-xs font-mono"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* CODE BODY WITH LINE HIGHLIGHTS */}
              <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-300 bg-[#050508] overflow-x-auto select-text">
                <div
                  onMouseEnter={() => setActiveCodeLine(1)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`transition-colors py-0.5 rounded px-2 ${activeCodeLine === 1 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">1</span>
                  <span className="text-emerald-400 font-bold">const</span>{' '}
                  <span className="text-white font-bold">developer</span>{' '}
                  <span className="text-slate-400">=</span> <span className="text-amber-300 font-bold">{"{"}</span>
                </div>

                <div
                  onMouseEnter={() => setActiveCodeLine(2)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`pl-4 sm:pl-6 transition-colors py-0.5 rounded px-2 ${activeCodeLine === 2 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">2</span>
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300 font-semibold">"Resmal Mubarak V"</span>,
                </div>

                <div
                  onMouseEnter={() => setActiveCodeLine(3)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`pl-4 sm:pl-6 transition-colors py-0.5 rounded px-2 ${activeCodeLine === 3 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">3</span>
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-emerald-300 font-semibold">"Full Stack MERN Developer"</span>,
                </div>

                <div
                  onMouseEnter={() => setActiveCodeLine(4)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`pl-4 sm:pl-6 transition-colors py-0.5 rounded px-2 ${activeCodeLine === 4 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">4</span>
                  <span className="text-slate-400">location:</span>{' '}
                  <span className="text-slate-200">"Palakkad, Kerala, India"</span>,
                </div>

                <div
                  onMouseEnter={() => setActiveCodeLine(5)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`pl-4 sm:pl-6 transition-colors py-0.5 rounded px-2 ${activeCodeLine === 5 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">5</span>
                  <span className="text-slate-400">stack:</span> <span className="text-amber-300">[</span>
                  <span className="text-emerald-400 font-semibold">"MongoDB"</span>, <span className="text-emerald-400 font-semibold">"Express"</span>,{' '}
                  <span className="text-emerald-400 font-semibold">"React"</span>, <span className="text-emerald-400 font-semibold">"Node"</span>
                  <span className="text-amber-300">]</span>,
                </div>

                <div
                  onMouseEnter={() => setActiveCodeLine(6)}
                  onMouseLeave={() => setActiveCodeLine(null)}
                  className={`pl-4 sm:pl-6 transition-colors py-0.5 rounded px-2 ${activeCodeLine === 6 ? 'bg-emerald-500/15 text-emerald-200' : ''}`}
                >
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">6</span>
                  <span className="text-slate-400">status:</span>{' '}
                  <span className="text-emerald-400 font-bold">"Available for Hire"</span>
                </div>

                <div className="py-0.5 px-2">
                  <span className="text-slate-600 select-none mr-3 sm:mr-4 inline-block w-4 text-right">7</span>
                  <span className="text-amber-300 font-bold">{"};"}</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-2 animate-pulse align-middle" />
                </div>
              </div>

            </div>
          </TiltCard>
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