import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '../assets/profile.webp';
import TiltCard from './TiltCard';

const highlights = [
  {
    title: "BACKEND SYSTEMS",
    description: "Modular Express.js controllers, REST APIs, and MongoDB schemas."
  },
  {
    title: "FRONTEND UI",
    description: "Responsive React interfaces, custom hooks, and Tailwind CSS."
  },
  {
    title: "PRODUCTION",
    description: "Security, query optimization, SEO, and cloud hosting deployments."
  }
];

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"]
  });

  const imageScale = useTransform(imageScrollProgress, [0, 1], [0.92, 1.04]);
  const imageOpacity = useTransform(imageScrollProgress, [0, 0.6], [0.3, 1]);

  return (
    <section id="about" ref={containerRef} className="relative py-24 lg:py-36 bg-[#050508] overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            ABOUT <span className="text-gradient-emerald">ME</span>
          </h2>
        </div>

        {/* PROFILE & STORY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: PROFILE IMAGE */}
          <div className="lg:col-span-5 relative">
            <motion.div
              ref={imageRef}
              style={{
                scale: imageScale,
                opacity: imageOpacity,
              }}
              data-cursor="VIEW"
            >
              <TiltCard maxRotate={5}>
                <div className="glass-card-lab p-3 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden group">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={profileImage}
                      alt="Resmal Mubarak V profile portrait"
                      decoding="async"
                      className="w-full h-[380px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#050508]/90 backdrop-blur-md border border-white/10 font-mono text-xs text-slate-300 flex justify-between items-center">
                      <span className="text-white font-bold">RESMAL MUBARAK V</span>
                      <span className="text-emerald-400 text-[10px]">PALAKKAD, INDIA</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* RIGHT: CONCISE BIO & 3 CLEAN CARDS */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
              I’m Resmal Mubarak V, a Full Stack Developer based in Palakkad, Kerala, India. I build clean, performant web applications from backend APIs to responsive frontends.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0B0E14] border border-white/10 hover:border-emerald-400/40 transition-all"
                >
                  <span className="text-emerald-400 font-bold block mb-1">
                    {item.title}
                  </span>
                  <span className="text-slate-400 font-sans text-sm block">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;