import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Server, Code2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import TiltCard from './TiltCard';

const pillars = [
  {
    title: "Backend Systems",
    icon: Server,
    badge: "Express.js & MongoDB",
    description: "Architecting resilient RESTful API endpoints, custom authorization middleware pipelines, atomic database transactions, and Mongoose ODM validation schemas."
  },
  {
    title: "Frontend UI",
    icon: Code2,
    badge: "React 19 & Tailwind CSS",
    description: "Crafting reactive client interfaces, custom hook state management, Framer Motion scroll animations, and glassmorphic design systems optimized for 4K to mobile."
  },
  {
    title: "Production Engineering",
    icon: ShieldCheck,
    badge: "Security & Cloud SEO",
    description: "Implementing bank-grade JWT authentication, Bcrypt password encryption, Cloudinary media optimization pipelines, Open Graph SEO metadata, and Vercel/Render deployments."
  }
];

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"]
  });

  const imageScale = useTransform(imageScrollProgress, [0, 1], [0.94, 1.02]);
  const imageOpacity = useTransform(imageScrollProgress, [0, 0.6], [0.3, 1]);

  return (
    <section id="about" ref={containerRef} className="relative py-28 lg:py-40 bg-[#080811] overflow-hidden">

      {/* AMBIENT LIGHTING */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-violet-400 mb-3">
            <span>01</span>
            <span className="text-slate-600">//</span>
            <span>ABOUT ME</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            ENGINEERING <span className="text-gradient-cosmic">IDENTITY</span>
          </h2>
        </motion.div>

        {/* BENTO-GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* BENTO CARD 1: PERSONAL PROFILE PORTRAIT & LOCATION (5 COLS) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <TiltCard maxRotate={5} className="h-full">
              <div className="glass-card-cosmic p-4 rounded-3xl border border-violet-500/30 hover:border-cyan-400/50 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex-1 min-h-[340px]">
                  <img
                    src={profileImage}
                    alt="Resmal Mubarak V profile portrait"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080811]/90 backdrop-blur-md border border-white/20 font-mono text-xs text-slate-200 shadow-lg">
                    <MapPin size={13} className="text-cyan-400 shrink-0" />
                    <span>Palakkad, Kerala, India</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-[#0a0b1c] border border-white/10 font-mono text-xs flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-sm block">RESMAL MUBARAK V</span>
                    <span className="text-violet-300 text-[11px]">Full Stack MERN Developer</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* BENTO CARD 2 & 3: PERSONAL BIO & CORE PILLARS (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

            {/* BIO CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card-cosmic p-6 sm:p-8 rounded-3xl border border-white/15 hover:border-violet-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 mb-3">
                <Cpu size={16} />
                <span>CORE ENGINEERING APPROACH</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
                I’m Resmal Mubarak V, a Full Stack Developer based in Palakkad, Kerala, India. I specialize in turning complex requirements into clean, production-ready web applications — combining structured Express backend route controllers with responsive, reactive React frontends.
              </p>
            </motion.div>

            {/* CORE PILLARS GRID */}
            <div className="grid grid-cols-1 gap-4 font-mono">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                    className="p-5 rounded-2xl bg-[#0d0e24]/90 border border-white/12 hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#080811] border border-white/10 text-violet-400 flex items-center justify-center group-hover:scale-110 group-hover:text-cyan-400 transition-all">
                          <Icon size={16} />
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed pl-11">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;