import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { FaDownload, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary } from 'react-icons/si';

const techStack = [
  { icon: FaReact, color: 'group-hover:text-[#61DAFB]' },
  { icon: SiJavascript, color: 'group-hover:text-[#F7DF1E]' },
  { icon: SiTailwindcss, color: 'group-hover:text-[#06B6D4]' },
  { icon: FaNodeJs, color: 'group-hover:text-[#339933]' },
  { icon: SiExpress, color: 'group-hover:text-white' },
  { icon: SiMongodb, color: 'group-hover:text-[#47A248]' },
  { icon: FaGitAlt, color: 'group-hover:text-[#F05032]' },
  { icon: FaGithub, color: 'group-hover:text-white' },
  { icon: SiPostman, color: 'group-hover:text-[#FF6C37]' },
  { icon: SiVercel, color: 'group-hover:text-white' },
  { icon: SiCloudinary, color: 'group-hover:text-[#3448C5]' },
  { icon: FaPaypal, color: 'group-hover:text-[#00457C]' },
];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const floatX = useSpring(mouseX, { damping: 16, stiffness: 70 });
  const floatY = useSpring(mouseY, { damping: 16, stiffness: 70 });
  const glowFloatX = useSpring(useTransform(mouseX, v => -v * 1.5));
  const glowFloatY = useSpring(useTransform(mouseY, v => -v * 1.5));

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth <= 768) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background Glow */}
      <motion.div style={{ y: bgScrollY }} className="absolute top-1/4 left-1/3 w-[500px] h-[500px]">
        <motion.div style={{ x: glowFloatX, y: glowFloatY }} className="w-full h-full bg-blue-600/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 w-full relative z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">

          {/* LEFT */}
          <div className="max-w-xl flex flex-col items-center lg:items-start">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Hi, I'm <span className="text-gradient">Resmal.</span>
            </h1>

            {/* Full Name */}
            <p className="text-sm text-gray-500 mt-2 tracking-wide">
              Resmal Mubarak V
            </p>

            <h2 className="text-lg md:text-2xl text-gray-300 mt-3">
              Full Stack Developer
            </h2>

            <p className="text-sm md:text-lg text-gray-400 mt-4 max-w-md">
              I build scalable web applications with clean architecture, real-world integrations, and performance-focused design.
            </p>

            {/* CTA */}
            <div className="flex gap-4 mt-6 flex-col sm:flex-row w-full sm:w-auto">

              <a
                href="/Resmal_MERN_FullStack_Developer.pdf"
                download
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white flex items-center justify-center gap-2 hover:scale-105 transition"
              >
                <FaDownload /> Resume
              </a>

              <a
                href="#projects"
                className="px-6 py-3 border border-white/10 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-white/5 transition"
              >
                Projects <ArrowRight />
              </a>

            </div>
          </div>

          {/* RIGHT CODE UI */}
          <motion.div style={{ x: floatX, y: floatY }} className="w-full max-w-md">

            <div className="glass-card p-6 border border-white/10 bg-[#0a0a0a]/80 shadow-xl">

              {/* Top bar */}
              <div className="flex justify-between items-center mb-5 opacity-60">
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <Terminal size={14} className="text-gray-400" />
              </div>

              {/* Code */}
              <div className="font-mono text-sm space-y-1 text-left">
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-yellow-300">developer</span>{' '}
                  <span className="text-cyan-400">=</span>{' '}
                  {"{"}
                </div>

                <div className="pl-6 text-red-400">name: <span className="text-green-400">"Resmal"</span>,</div>
                <div className="pl-6 text-red-400">stack: <span className="text-green-400">"MERN"</span>,</div>
                <div className="pl-6 text-red-400">
                  focus: <span className="text-green-400">"Curiosity → Code → Impact"</span>
                </div>

                <div>{"};"}</div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* CLEAN TECH STRIP */}
      <div className="hidden md:flex justify-center w-full mt-16 relative">

        <div className="
          animate-marquee 
          flex w-max items-center 
          gap-12 sm:gap-14 pr-12
          opacity-80 hover:opacity-100 
          transition-all duration-300
        ">
          
          {[...techStack, ...techStack].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div 
                key={i} 
                className="group flex justify-center items-center cursor-pointer"
              >
                <Icon
                  className={`
        w-8 h-8 lg:w-10 lg:h-10 
        text-gray-500 
        grayscale
        transition-all duration-200 
        group-hover:scale-[1.08] 
        group-hover:opacity-100 
        group-hover:grayscale-0
        ${tech.color}
      `}
                />
              </div>
            );
          })}

        </div>

      </div>

      </div>
    </section>
  );
};

export default Hero;