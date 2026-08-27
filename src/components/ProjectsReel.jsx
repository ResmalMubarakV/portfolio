import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, CheckCircle2, ChevronRight, Lock, Maximize2, ArrowUpRight } from 'lucide-react';
import avoraImg from '../assets/avora.webp';
import demo1 from '../assets/demo1.webp';
import dreamlandsImg from '../assets/dreamlands.webp';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
import Modal from './Modal';

const projectsList = [
  {
    id: 1,
    num: "01",
    title: "AVORA",
    subtitle: "Travel Diary & Journal App",
    category: "Full Stack MERN",
    oneLineSummary: "A full-stack travel journal application featuring Cloudinary media uploads, JWT authentication, and private entry vaults.",
    overview: "Avora is a full-stack MERN application built for organizing travel entries, media files, and trip notes.",
    problem: "Travelers struggle to organize trip photos, journal notes, and location logs in one place.",
    solution: "A unified MERN web app featuring Cloudinary uploads, JWT auth, and private entry storage.",
    features: [
      "Digital journal entries with photo media galleries",
      "Private travel entry vault with public/private toggle",
      "Role-based access control and admin control panel",
      "Cloudinary asynchronous cloud media storage",
      "Fast REST API endpoints built on Express.js"
    ],
    tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    github: "https://github.com/ResmalMubarakV/avora",
    live: "https://avorawayfarer.vercel.app",
    image: avoraImg,
    badge: "Full Stack MERN"
  },
  {
    id: 2,
    num: "02",
    title: "ZAAISH",
    subtitle: "Fashion E-Commerce Store",
    category: "Full Stack MERN",
    oneLineSummary: "A luxury fashion e-commerce platform with cart persistence, PayPal REST payment checkout, and PDF invoices.",
    overview: "Zaaish is an e-commerce web platform built with full product CRUD, shopping cart persistence, and PayPal checkout.",
    problem: "Fashion stores need seamless shopping cart persistence and automated invoice fulfillment.",
    solution: "Built persistent cart state, PayPal REST API order processing, and automated PDF invoice generation.",
    features: [
      "Product search filtering by category, size, and price",
      "Persistent cart drawer with user state synchronization",
      "PayPal REST API checkout with automated PDF receipt invoices",
      "Admin inventory dashboard for product management",
      "Responsive design optimized across mobile and desktop"
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "PayPal API"],
    github: "https://github.com/ResmalMubarakV/zaaish_ecommerce",
    live: "https://zaaish-ecommerce.vercel.app",
    image: demo1,
    badge: "Full Stack MERN"
  },
  {
    id: 3,
    num: "03",
    title: "DREAMLANDS PROPERTIES",
    subtitle: "Real Estate Web Platform",
    category: "Client Production",
    oneLineSummary: "A production real estate website showcasing luxury villas and residential plots in Palakkad, Kerala.",
    overview: "Dreamlands Properties is a real-world client deployment built for presenting property listings and capturing WhatsApp inquiries.",
    problem: "Real estate clients need a clean visual presentation and direct WhatsApp lead routing.",
    solution: "Delivered a production web application with property galleries, SEO metadata, custom domain, and WhatsApp integration.",
    features: [
      "Property gallery showcase for luxury villas and residential plots",
      "Direct WhatsApp lead capture connecting prospective buyers",
      "Production SEO metadata, Open Graph tags, and custom domain",
      "Ultra-responsive layout for desktop, tablet, and mobile"
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "WhatsApp API", "SEO Ready"],
    github: "https://github.com/ResmalMubarakV/dreamlands-properties",
    live: "https://www.dreamlandsproperties.com",
    image: dreamlandsImg,
    badge: "Live Client Deployment"
  }
];

const ProjectCardCinematic = ({ project, idx, onSelect }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageScaleRaw = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.94, 1.04, 1, 0.96]);
  const imageScale = useSpring(imageScaleRaw, { damping: 25, stiffness: 120 });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.4]);

  const isImageRight = idx % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="w-full col-span-12 mb-16 sm:mb-24"
    >
      <div
        data-cursor="OPEN"
        onClick={() => onSelect(project)}
        className="glass-card-lab group rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500 relative overflow-hidden cursor-pointer"
      >
        
        {/* NUMBER & BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 relative z-10 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-emerald-400">
              {project.num}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              // {project.category}
            </span>
          </div>

          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {project.badge}
          </span>
        </div>

        {/* DUAL COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* IMAGE PREVIEW */}
          <div className={`lg:col-span-7 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
            <TiltCard maxRotate={5}>
              <div className="relative rounded-2xl bg-slate-950 border border-white/20 overflow-hidden shadow-2xl group/browser">
                
                {/* BROWSER TOP BAR */}
                <div className="px-4 py-3 bg-[#050508] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#111622] border border-white/10 font-mono text-xs text-slate-300 max-w-[260px] sm:max-w-[320px] truncate">
                    <Lock size={12} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{project.live ? project.live.replace('https://', '') : project.github}</span>
                  </div>

                  <div className="text-slate-400 p-1">
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative p-3 sm:p-4 bg-slate-950 flex items-center justify-center min-h-[240px] sm:min-h-[320px] overflow-hidden">
                  <motion.img
                    style={{ scale: imageScale }}
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[440px] object-contain rounded-xl shadow-2xl transition-transform duration-500"
                  />

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-emerald-400 text-slate-950 shadow-xl hover:bg-emerald-300 transition duration-300 font-mono"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

              </div>
            </TiltCard>
          </div>

          {/* CONTENT */}
          <div className={`lg:col-span-5 flex flex-col justify-between ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
            <div>
              <h3 className="font-display text-3xl font-black text-white group-hover:text-emerald-300 transition-colors leading-tight mb-2">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-emerald-400 font-bold mb-4">
                {project.subtitle}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {project.oneLineSummary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1 rounded-xl bg-[#050508] border border-white/10 text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 group-hover:text-white transition-colors">
                Click for case study
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1 transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:opacity-90"
              >
                <span>EXPLORE</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const ProjectsReel = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 lg:py-36 bg-[#050508] overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            FEATURED <span className="text-gradient-emerald">WORK</span>
          </h2>
        </motion.div>

        {/* CASE STUDIES */}
        <div className="grid grid-cols-12 gap-y-6">
          {projectsList.map((project, idx) => (
            <ProjectCardCinematic
              key={project.id}
              project={project}
              idx={idx}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

      </div>

      {/* FULLSCREEN CASE STUDY MODAL */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        maxWidth="max-w-4xl"
      >
        {selectedProject && (
          <div className="space-y-6 font-sans">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {selectedProject.badge}
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-black text-white">
              {selectedProject.title}
            </h3>
            <p className="font-mono text-xs text-emerald-400 font-bold">
              {selectedProject.subtitle}
            </p>

            {/* SCREENSHOT */}
            <div className="my-4 rounded-2xl border border-white/15 bg-slate-950 p-3 overflow-hidden shadow-2xl">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} screenshot`}
                className="w-full h-auto object-contain rounded-xl max-h-[450px]"
              />
            </div>

            {/* PROBLEM & SOLUTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-[#050508] border border-white/10">
                <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase mb-1">Problem</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.problem}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#050508] border border-white/10">
                <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase mb-1">Solution</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase mb-2">Key Features</h4>
              <div className="space-y-2">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-white/10 font-mono">
              <MagneticButton
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-xs font-bold flex items-center gap-2 hover:border-emerald-400/40 transition"
              >
                <FaGithub size={16} /> Source Code
              </MagneticButton>

              {selectedProject.live && (
                <MagneticButton
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <ExternalLink size={16} /> Visit Live Site
                </MagneticButton>
              )}
            </div>
          </div>
        )}
      </Modal>

    </section>
  );
};

export default ProjectsReel;
