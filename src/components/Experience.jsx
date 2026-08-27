import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Server, ShieldCheck, Activity, Globe } from 'lucide-react';
import TiltCard from './TiltCard';

const cardThemes = {
  0: {
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]",
    iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-500/20",
    spotlight: "rgba(59, 130, 246, 0.2)",
    titleHover: "group-hover:text-blue-300",
    subColor: "text-blue-400",
    tagHover: "group-hover:text-blue-300",
  },
  1: {
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_25px_60px_rgba(99,102,241,0.25)]",
    iconBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-500/20",
    spotlight: "rgba(99, 102, 241, 0.2)",
    titleHover: "group-hover:text-indigo-300",
    subColor: "text-indigo-400",
    tagHover: "group-hover:text-indigo-300",
  },
  2: {
    borderHover: "hover:border-violet-500/50 hover:shadow-[0_25px_60px_rgba(139,92,246,0.25)]",
    iconBg: "bg-violet-500/10 border-violet-500/30 text-violet-400 group-hover:bg-violet-500/20",
    spotlight: "rgba(139, 92, 246, 0.2)",
    titleHover: "group-hover:text-violet-300",
    subColor: "text-violet-400",
    tagHover: "group-hover:text-violet-300",
  }
};

const EliteStatCard = ({ stat, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stat.icon;
  const theme = cardThemes[idx % 3];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: idx * 0.12, type: 'spring', damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <TiltCard maxRotate={6}>
        <div className={`glass-card-cosmic p-8 sm:p-10 rounded-3xl border border-white/15 ${theme.borderHover} transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[300px]`}>
          
          {/* MOUSE SPOTLIGHT RADIAL OVERLAY */}
          {isHovered && (
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.spotlight}, transparent 80%)`,
              }}
            />
          )}

          {/* TOP HEADER: ICON & INDEX TAG */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className={`w-12 h-12 rounded-2xl border ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-inner`}>
              <Icon size={24} />
            </div>

            <span className="font-mono text-[11px] text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest bg-[#080811] px-3 py-1 rounded-full border border-white/10">
              {stat.index}
            </span>
          </div>

          {/* TITLE & DESCRIPTION */}
          <div className="relative z-10 my-auto">
            <h3 className={`font-display text-2xl sm:text-3xl font-extrabold text-white ${theme.titleHover} transition-colors tracking-tight leading-snug`}>
              {stat.title}
            </h3>

            <p className={`font-mono text-xs font-bold ${theme.subColor} tracking-wider uppercase mt-3`}>
              {stat.subtitle}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
              {stat.detail}
            </p>
          </div>

          {/* HOVER GLOW BASELINE BAR */}
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
            <span className={`flex items-center gap-1.5 ${theme.tagHover} transition-colors`}>
              <Activity size={12} className="text-cyan-400 animate-pulse" /> {stat.highlight}
            </span>
            <span className="group-hover:text-white transition-colors">{stat.badge}</span>
          </div>

        </div>
      </TiltCard>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const stats = [
    {
      title: "Full-Stack Architecture",
      subtitle: "MERN Stack Mastery",
      detail: "End-to-end MERN application development featuring Express.js modular routes, MongoDB indexing, and responsive React frontend systems.",
      icon: Code2,
      index: "01 // ARCHITECTURE",
      highlight: "Clean Code Standard",
      badge: "Full-Stack MERN"
    },
    {
      title: "Real Client Production",
      subtitle: "Live Business Deployment",
      detail: "Delivered production real estate portal live with custom domain, automated SEO metadata, AI architectural visuals, and direct WhatsApp lead routing.",
      icon: Globe,
      index: "02 // CLIENT PRODUCTION",
      highlight: "Deployed Live",
      badge: "Real-World Impact"
    },
    {
      title: "Security & Payment APIs",
      subtitle: "Enterprise Reliability",
      detail: "Implemented JSON Web Tokens (JWT), role-based access control (RBAC), PayPal REST payment processing, PDF receipt generation, & Cloudinary uploads.",
      icon: ShieldCheck,
      index: "03 // SECURITY & APIS",
      highlight: "Bank-Grade Auth",
      badge: "Enterprise Security"
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="relative py-28 lg:py-40 bg-[#080811] overflow-hidden">
      
      {/* BACKGROUND ACCENT LIGHTING */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* CLEAN SECTION HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <span>05</span>
            <span className="text-slate-600">//</span>
            <span>PRODUCTION DELIVERABLES & ENGINEERING IMPACT</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            ENGINEERING <span className="text-gradient-cosmic">IMPACT</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed font-sans">
            Key engineering capabilities and production deliverables for enterprise applications and real-world clients.
          </p>
        </motion.div>

        {/* ELITE STATS DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <EliteStatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
