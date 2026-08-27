import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, CheckCircle2, ChevronRight, X, Lock, Maximize2, ArrowUpRight } from 'lucide-react';
import avoraImg from '../assets/avora.webp';
import demo1 from '../assets/demo1.webp';
import dreamlandsImg from '../assets/dreamlands.webp';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

const projectsList = [
  {
    id: 1,
    num: "01",
    title: "Avora — Enterprise Travel Diary & Memory Vault",
    category: "Full Stack",
    description: "An enterprise digital travel diary & memory vault platform built to transform scattered travel notes and media into cinematic journal entries. Includes AI-powered storytelling, bank-grade privacy controls, Cloudinary asset optimization, and a full admin control suite with real-time analytics and content moderation.",
    features: [
      "AI-Powered Storytelling: Transforms travel notes & media into cinematic journal entries",
      "Enterprise Admin Suite: Live analytics dashboard, user approval queue & content moderation",
      "Granular Privacy Vault: Public/Private story publishing with interactive galleries",
      "Bank-Grade Security: JWT authentication, RBAC, bcrypt, & password-gated admin modals",
      "Optimized Media Engine: Cloudinary API cloud storage with async upload state banners",
      "Ultra-Responsive UX: Modern glassmorphism system optimized for 4K desktop to mobile"
    ],
    tags: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Cloudinary API", "JWT Auth", "AI Storytelling"],
    github: "https://github.com/ResmalMubarakV/avora",
    live: "https://avorawayfarer.vercel.app",
    image: avoraImg,
    badge: "Flagship Enterprise MERN"
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
    live: null,
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
  }
];

const categories = ["All", "Full Stack", "Client Work"];

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

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="w-full col-span-12 mb-16 sm:mb-24"
    >
      <div className="glass-card-spotlight group rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 hover:border-red-500/50 hover:shadow-[0_30px_70px_rgba(239,68,68,0.22)] transition-all duration-500 relative overflow-hidden">
        
        {/* NUMBER & CATEGORY HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 relative z-10 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-red-500">
              {project.num}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              // {project.category}
            </span>
          </div>

          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            {project.badge}
          </span>
        </div>

        {/* FULL-WIDTH DUAL COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* SCREENSHOT BROWSER MOCKUP FRAME (7 COLS) */}
          <div className={`lg:col-span-7 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
            <TiltCard maxRotate={5}>
              <div className="relative rounded-2xl bg-slate-950 border border-red-500/30 overflow-hidden shadow-2xl group/browser">
                
                {/* BROWSER TOP BAR */}
                <div className="px-4 py-3 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-[0_0_8px_#ef4444]" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-white/10 font-mono text-xs text-slate-300 max-w-[280px] sm:max-w-[340px] truncate shadow-inner">
                    <Lock size={12} className="text-red-400 shrink-0" />
                    <span className="truncate">{project.live ? project.live.replace('https://', '') : project.github}</span>
                  </div>

                  <button
                    onClick={() => onSelect(project)}
                    className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-white/10 transition flex items-center gap-1 text-xs font-mono"
                    title="Expand View"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* IMAGE PREVIEW WITH SMOOTH SCALE TRANSFORM */}
                <div className="relative p-3 sm:p-5 bg-slate-950 flex items-center justify-center min-h-[260px] sm:min-h-[340px] lg:min-h-[380px] overflow-hidden">
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
                      className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl backdrop-blur-md hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
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
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-red-400 transition-colors leading-tight mb-4">
                {project.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* FEATURES LIST */}
              <div className="space-y-2.5 mb-6">
                {project.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-red-300 shadow-sm"
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 transition"
                  >
                    <ExternalLink size={14} /> Visit Live Site
                  </MagneticButton>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 hover:text-red-400 hover:border-red-500/40 transition"
                >
                  <FaGithub size={15} />
                  <span>Source Code</span>
                </a>
              </div>

              <button
                onClick={() => onSelect(project)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-red-500/40 text-xs font-semibold text-slate-300 hover:text-red-400 flex items-center gap-1.5 transition ml-auto"
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

  return (
    <section id="projects" ref={containerRef} className="relative py-24 lg:py-36 bg-[#050508] overflow-hidden">
      
      {/* AMBIENT SOFT RED LIGHT */}
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* CLEAN SECTION HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            PROJECTS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Cinematic case studies of enterprise MERN applications, eCommerce platforms, and real-world client deployments.
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
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105'
                  : 'bg-slate-950/60 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CINEMATIC FULL-WIDTH CASE STUDIES */}
        <div className="grid grid-cols-12 gap-y-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <ProjectCardCinematic
                key={project.id}
                project={project}
                idx={idx}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
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
              className="bg-slate-950 border border-red-500/30 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2.5 rounded-xl bg-slate-900 border border-white/10 transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-2 font-mono">
                <span className="text-xs font-bold text-red-400 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
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
              <div className="my-6 rounded-2xl border border-white/15 bg-slate-950 p-2 sm:p-4 overflow-hidden shadow-2xl">
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
                      <CheckCircle2 size={16} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-white text-base mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-red-300">
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
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-sm font-semibold flex items-center gap-2 hover:scale-105 transition"
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