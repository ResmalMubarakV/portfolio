import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, CheckCircle2, ChevronRight, X, Lock, Maximize2, ArrowUpRight } from 'lucide-react';
import avoraImg from '../assets/avora.webp';
import demo1 from '../assets/demo1.webp';
import dreamlandsImg from '../assets/dreamlands.webp';
import emiVaultImg from '../assets/emivault.webp';
import kulukkicheetImg from '../assets/kulukkicheet.webp';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

const projectsList = [
  {
    id: 1,
    num: "01",
    title: "Avora — AI-Powered Travel Diary & Memory Platform",
    category: "Full Stack",
    description: "Architected and deployed a production-grade MERN stack travel platform featuring AI-driven narrative generation from raw user notes, location data, and timestamps into atmospheric journal entries.",
    features: [
      "AI Travel Memory Summarizer: Integrates LLM APIs to transform unstructured travel notes into rich narrative journals",
      "Global JWT Session Invalidation: Implemented passwordChangedAt timestamp tracking revoking active sessions across devices",
      "Brute-Force Protection: Built 24-hour rate limiters on sensitive endpoints using Express Rate Limit",
      "Multi-Tier RBAC Control: Multi-tier moderation workflows (pending, approved, suspended) for user & content governance",
      "Cloud Media & Email Infrastructure: Optimized media uploads via Multer & Cloudinary; Resend HTTP API for transactional emails",
      "Asynchronous Processing: Decoupled frontend input -> Express auth & rate-limit -> External AI API generation -> MongoDB Atlas"
    ],
    tags: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas", "Cloudinary", "Multer", "JWT Auth", "Resend API", "AI Storytelling"],
    github: "https://github.com/ResmalMubarakV/Avora",
    live: "https://avorawayfarer.vercel.app/",
    image: avoraImg,
    badge: "AI MERN Flagship"
  },
  {
    id: 2,
    num: "02",
    title: "Zaaish — Luxury Fashion E-Commerce Platform",
    category: "Full Stack",
    description: "A premium full-stack e-commerce web application designed for a luxury fashion boutique with an elegant stone minimalist aesthetic. Features secure JWT user authentication, persistent guest-to-user cart synchronization, PayPal REST API checkout with automated PDF invoice generation, a role-based admin inventory & order fulfillment dashboard, and adaptive dark/light themes.",
    features: [
      "Dynamic Multi-Facet Filtering: Filter by category, gender, color, size, material & brand with debounced search",
      "Persistent Cart & Guest Sync: Slide-over cart drawer with real-time inventory & guest-session migration",
      "PayPal REST Checkout & Invoices: Secure PayPal processing with automated PDF receipt generation & print invoices",
      "Role-Based Admin Dashboard: Product CRUD, Cloudinary gallery uploads & fulfillment status tracking (processing/shipping/delivery)",
      "Adaptive UI Architecture: Built with Tailwind CSS supporting adaptive dark/light themes and 95%+ responsive viewport accuracy"
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary", "PayPal REST API"],
    github: "https://github.com/ResmalMubarakV/zaaish_ecommerce",
    live: "https://zaaish-ecommerce.vercel.app",
    image: demo1,
    badge: "Full Stack MERN"
  },
  {
    id: 3,
    num: "03",
    title: "Dreamlands Properties — Real Estate Web Platform",
    category: "Client Work",
    description: "A premium real-estate web experience designed & built from the ground up for showcasing luxury villas, residential plots, and modern living spaces in Palakkad, Kerala. Features cinematic AI-assisted architectural imagery, interactive motion design, high-conversion WhatsApp lead routing, performance optimization, and production SEO deployment.",
    features: [
      "Architectural Property Showcase: Large visual layouts presenting luxury villas, plots & modern living spaces",
      "Cinematic Visuals & AI Media Pipeline: AI-assisted architectural imagery & concept video integration",
      "Interactive Motion & Scroll Reveals: Scroll-based animations, image reveals & smooth micro-interactions",
      "Direct Lead Routing: Integrated WhatsApp API lead capture & instant client inquiry channels",
      "Production SEO & Custom Domain: Open Graph metadata, canonical URLs & automated GitHub Pages deployment"
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Scroll Motion", "SEO Ready", "Production"],
    github: "https://github.com/ResmalMubarakV/dreamlands-properties",
    live: "https://www.dreamlandsproperties.com",
    image: dreamlandsImg,
    badge: "Real Client Production"
  },
  {
    id: 4,
    num: "04",
    title: "EMI Vault — Personal Loan & Installment Tracker",
    category: "Mobile Development",
    isCompact: true,
    description: "A privacy-focused Flutter mobile app for managing personal loans and EMI schedules, with multi-loan tracking, payment status, reminders, monthly routines, and a responsive mobile-first interface.",
    features: [
      "Multi-loan EMI and installment tracking",
      "Automatic EMI schedule and due-date handling",
      "Mark individual EMIs Paid/Unpaid",
      "Customizable EMI notifications and reminders",
      "Local-first personal data persistence",
      "Responsive Android UI"
    ],
    tags: ["Flutter", "Dart", "Android", "Local Storage", "Notifications", "Responsive UI", "Mobile UX", "Date & Time Logic"],
    github: "https://github.com/ResmalMubarakV/emi-vault",
    image: emiVaultImg,
    badge: "Flutter / Personal Utility"
  },
  {
    id: 5,
    num: "05",
    title: "Kulukkicheet — Monthly Chit-Fund Collection Checklist",
    category: "Mobile Development",
    isCompact: true,
    description: "A minimalist monthly chit-fund collection checklist designed to make tracking contributions simple, with one-tap collection status and Cash/GPay method tracking.",
    features: [
      "Simple one-page monthly collection checklist",
      "One-tap Paid/Unpaid tracking",
      "Cash/GPay collection-method tracking",
      "Automatic monthly checklist reset",
      "Monthly collection history",
      "Simple add/edit/delete people management"
    ],
    tags: ["Flutter", "Dart", "Android", "Local Storage", "Responsive UI", "CRUD", "Mobile UX", "Date & Time Logic"],
    github: "https://github.com/ResmalMubarakV/kulukkiCheet",
    image: kulukkicheetImg,
    badge: "Flutter / Personal Utility"
  }
];

const categories = ["All", "Full Stack", "Client Work", "Mobile Development"];

const projectThemeStyles = {
  1: {
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_30px_70px_rgba(59,130,246,0.25)]",
    numColor: "text-blue-400",
    titleHover: "group-hover:text-blue-300",
    checkColor: "text-blue-400",
    tagColor: "text-blue-300 border-blue-500/20 bg-[#0d1326]",
    btnBg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    browserBorder: "border-blue-500/30",
  },
  2: {
    badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_30px_70px_rgba(99,102,241,0.25)]",
    numColor: "text-indigo-400",
    titleHover: "group-hover:text-indigo-300",
    checkColor: "text-indigo-400",
    tagColor: "text-indigo-300 border-indigo-500/20 bg-[#12112e]",
    btnBg: "bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 shadow-[0_0_20px_rgba(99,102,241,0.4)]",
    browserBorder: "border-indigo-500/30",
  },
  3: {
    badgeBg: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    borderHover: "hover:border-violet-500/50 hover:shadow-[0_30px_70px_rgba(139,92,246,0.25)]",
    numColor: "text-violet-400",
    titleHover: "group-hover:text-violet-300",
    checkColor: "text-violet-400",
    tagColor: "text-violet-300 border-violet-500/20 bg-[#170e2b]",
    btnBg: "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]",
    browserBorder: "border-violet-500/30",
  },
  4: {
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_30px_70px_rgba(16,185,129,0.25)]",
    numColor: "text-emerald-400",
    titleHover: "group-hover:text-emerald-300",
    checkColor: "text-emerald-400",
    tagColor: "text-emerald-300 border-emerald-500/20 bg-[#0a1a17]",
    btnBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    browserBorder: "border-emerald-500/30",
  },
  5: {
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_30px_70px_rgba(245,158,11,0.25)]",
    numColor: "text-amber-400",
    titleHover: "group-hover:text-amber-300",
    checkColor: "text-amber-400",
    tagColor: "text-amber-300 border-amber-500/20 bg-[#1a140a]",
    btnBg: "bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    browserBorder: "border-amber-500/30",
  }
};

// COMPACT UTILITY PROJECT CARD (SIDE-BY-SIDE GRID)
const ProjectCardCompact = ({ project, onSelect }) => {
  const cardRef = useRef(null);
  const theme = projectThemeStyles[project.id] || projectThemeStyles[1];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ duration: 0.4 }}
      className={`glass-card-cosmic group rounded-3xl p-5 sm:p-7 border border-white/15 ${theme.borderHover} transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full`}
    >
      <div>
        {/* NUMBER & CATEGORY HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10 relative z-10 font-mono">
          <div className="flex items-center gap-2.5">
            <span className={`text-xl sm:text-2xl font-black ${theme.numColor}`}>
              {project.num}
            </span>
            <span className="text-[11px] text-slate-400 uppercase tracking-widest">
              // {project.category}
            </span>
          </div>

          <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${theme.badgeBg}`}>
            {project.badge}
          </span>
        </div>

        {/* COMPACT INNER GRID: PHONE MOCKUP PREVIEW + SPECS */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mb-5">
          {/* PHONE MOCKUP FRAME (5 COLS) */}
          <div className="sm:col-span-5 flex justify-center">
            <TiltCard maxRotate={6}>
              <div
                onClick={() => onSelect(project)}
                className={`relative rounded-2xl bg-[#080811] border ${theme.browserBorder} p-2 overflow-hidden shadow-xl group/phone cursor-pointer max-w-[160px] sm:max-w-[180px] w-full`}
              >
                {/* PHONE STATUS HEADER */}
                <div className="flex items-center justify-between gap-1 mb-1.5 px-2 py-0.5 rounded-full bg-[#0d0e1e] border border-white/10 text-[9px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>App</span>
                  </span>
                  <Lock size={10} className="text-violet-400" />
                </div>

                <div className="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-1">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[220px] object-contain transition-transform duration-500 group-hover/phone:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 text-white text-[10px] font-mono flex items-center gap-1 shadow-lg">
                      <Maximize2 size={11} /> View Specs
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* DETAILS & FEATURES (7 COLS) */}
          <div className="sm:col-span-7 flex flex-col justify-between">
            <div>
              <h3
                onClick={() => onSelect(project)}
                className={`font-display text-lg sm:text-xl font-extrabold text-white ${theme.titleHover} transition-colors leading-tight mb-2.5 cursor-pointer`}
              >
                {project.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
                {project.description}
              </p>

              {/* KEY FEATURES */}
              <div className="space-y-1.5 mb-3.5">
                {project.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className={`${theme.checkColor} shrink-0 mt-0.5`} />
                    <span className="leading-tight line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* COMPACT TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border ${theme.tagColor}`}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg border border-white/10 text-slate-400 bg-white/5">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION CTAS */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d0e1e] border border-white/10 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition"
        >
          <FaGithub size={14} />
          <span>Source Code</span>
        </a>

        <button
          onClick={() => onSelect(project)}
          className="px-3.5 py-2 rounded-xl bg-[#0d0e1e] border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center gap-1 transition ml-auto"
        >
          <span>Full Specs</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </motion.div>
  );
};

// CINEMATIC CASE STUDY CARD COMPONENT
const ProjectCardCinematic = ({ project, idx, onSelect }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageScaleRaw = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.94, 1.02, 1, 0.96]);
  const imageScale = useSpring(imageScaleRaw, { damping: 25, stiffness: 120 });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.3, 1, 1, 0.3]);

  const isImageRight = idx % 2 !== 0;
  const theme = projectThemeStyles[project.id] || projectThemeStyles[1];

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="w-full col-span-12 mb-16 sm:mb-24"
    >
      <div className={`glass-card-cosmic group rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 ${theme.borderHover} transition-all duration-500 relative overflow-hidden`}>
        
        {/* NUMBER & CATEGORY HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 relative z-10 font-mono">
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-black ${theme.numColor}`}>
              {project.num}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              // {project.category}
            </span>
          </div>

          <span className={`px-3.5 py-1 rounded-full text-xs font-semibold border ${theme.badgeBg}`}>
            {project.badge}
          </span>
        </div>

        {/* FULL-WIDTH DUAL COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* SCREENSHOT BROWSER MOCKUP FRAME (7 COLS) */}
          <div className={`lg:col-span-7 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
            <TiltCard maxRotate={5}>
              <div className={`relative rounded-2xl bg-[#080811] border ${theme.browserBorder} overflow-hidden shadow-2xl group/browser`}>
                
                {/* BROWSER TOP BAR */}
                <div className="px-4 py-3 bg-[#0d0e1e] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_#f43f5e]" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#080811] border border-white/10 font-mono text-xs text-slate-300 max-w-[280px] sm:max-w-[340px] truncate shadow-inner">
                    <Lock size={12} className="text-violet-400 shrink-0" />
                    <span className="truncate">{(project.live || project.github)?.replace(/^https?:\/\//, '')}</span>
                  </div>

                  <button
                    onClick={() => onSelect(project)}
                    className="text-slate-400 hover:text-cyan-400 p-1 rounded-lg hover:bg-white/10 transition flex items-center gap-1 text-xs font-mono"
                    title="Expand View"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* IMAGE PREVIEW WITH SMOOTH SCALE TRANSFORM */}
                <div className="relative p-3 sm:p-5 bg-[#080811] flex items-center justify-center min-h-[260px] sm:min-h-[340px] lg:min-h-[380px] overflow-hidden">
                  <motion.img
                    style={{ scale: imageScale }}
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[480px] object-contain rounded-xl shadow-2xl transition-transform duration-500"
                  />

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute bottom-5 right-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${theme.btnBg} text-white shadow-xl backdrop-blur-md hover:scale-105 transition duration-300`}
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>

              </div>
            </TiltCard>
          </div>

          {/* SPECS & CONTENT (5 COLS) */}
          <div className={`lg:col-span-5 flex flex-col justify-between ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
            <div>
              <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white ${theme.titleHover} transition-colors leading-tight mb-4`}>
                {project.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* FEATURES LIST */}
              <div className="space-y-2.5 mb-6">
                {project.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className={`${theme.checkColor} shrink-0 mt-0.5`} />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${theme.tagColor} shadow-sm`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION CTAS */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
              <div className="flex flex-wrap items-center gap-3">
                {project.live && (
                  <MagneticButton
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2.5 rounded-xl ${theme.btnBg} text-white text-xs font-bold flex items-center gap-2 hover:scale-105 transition`}
                  >
                    <ExternalLink size={14} /> Visit Live Site
                  </MagneticButton>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d0e1e] border border-white/10 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                >
                  <FaGithub size={15} />
                  <span>Source Code</span>
                </a>
              </div>

              <button
                onClick={() => onSelect(project)}
                className="px-4 py-2.5 rounded-xl bg-[#0d0e1e] border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition ml-auto"
              >
                <span>Full Specs</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const filteredProjects = projectsList.filter(
    (p) => filter === "All" || p.category === filter
  );

  const selectedTheme = selectedProject
    ? projectThemeStyles[selectedProject.id] || projectThemeStyles[1]
    : projectThemeStyles[1];

  return (
    <section id="projects" ref={containerRef} className="relative py-28 lg:py-40 bg-[#080811] overflow-hidden">
      
      {/* AMBIENT SUNSET ORB LIGHT */}
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* CLEAN SECTION HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span>02</span>
            <span className="text-slate-600">//</span>
            <span>SELECTED WORK & PRODUCTION SHOWCASE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            SELECTED <span className="text-gradient-cosmic">PROJECTS</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Cinematic case studies of enterprise MERN applications, production mobile utilities, and real-world client deployments.
          </p>
        </motion.div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
                  : 'bg-[#0d0e1e]/80 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CINEMATIC FULL-WIDTH CASE STUDIES & COMPACT UTILITY CARDS */}
        <div className="grid grid-cols-12 gap-y-8">
          <AnimatePresence>
            {filteredProjects.filter(p => !p.isCompact).map((project, idx) => (
              <ProjectCardCinematic
                key={project.id}
                project={project}
                idx={idx}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>

          {/* COMPACT UTILITY APPS (SIDE-BY-SIDE 2-COLUMN GRID) */}
          <AnimatePresence>
            {filteredProjects.some(p => p.isCompact) && (
              <div className="col-span-12 mb-16 sm:mb-24">
                {filter === "All" && (
                  <div className="flex items-center gap-4 my-8">
                    <div className="h-[1px] bg-gradient-to-r from-emerald-500/40 via-amber-500/40 to-transparent flex-1" />
                    <span className="font-mono text-xs text-slate-400 tracking-wider uppercase px-4 py-1.5 rounded-full bg-[#0d0e1e] border border-white/10 shadow-inner">
                      // Mobile Utilities & Personal Apps
                    </span>
                    <div className="h-[1px] bg-gradient-to-l from-emerald-500/40 via-amber-500/40 to-transparent flex-1" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                  {filteredProjects.filter(p => p.isCompact).map((project) => (
                    <ProjectCardCompact
                      key={project.id}
                      project={project}
                      onSelect={(proj) => setSelectedProject(proj)}
                    />
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* FULL PROJECT SPECS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-slate-950 border ${selectedTheme.browserBorder} rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2.5 rounded-xl bg-slate-900 border border-white/10 transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-2 font-mono">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedTheme.badgeBg}`}>
                  {selectedProject.badge}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedProject.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-1">
                {selectedProject.title}
              </h3>

              {/* HIGH RES MODAL SCREENSHOT */}
              <div className="my-6 rounded-2xl border border-white/15 bg-slate-950 p-2 sm:p-4 overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} screenshot`}
                  className="w-full h-auto object-contain rounded-xl max-h-[500px]"
                />
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-6">
                <h4 className="font-semibold text-white text-base mb-3">Key Highlights</h4>
                <div className="space-y-2.5">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className={`${selectedTheme.checkColor} shrink-0 mt-0.5`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-white text-base mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className={`text-xs font-mono px-3.5 py-1.5 rounded-lg border ${selectedTheme.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
                <MagneticButton
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 transition"
                >
                  <FaGithub size={16} /> Source Code
                </MagneticButton>

                {selectedProject.live && (
                  <MagneticButton
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-xl ${selectedTheme.btnBg} text-white text-sm font-semibold flex items-center gap-2 hover:scale-105 transition`}
                  >
                    <ExternalLink size={16} /> Visit Live Site
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;