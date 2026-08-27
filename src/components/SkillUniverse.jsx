import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary, SiRedux, SiTypescript, SiRender, SiVite } from 'react-icons/si';
import { ExternalLink, Layers, Wrench, Server } from 'lucide-react';
import Modal from './Modal';

const skillsList = [
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend',
    icon: FaReact,
    color: '#61DAFB',
    whatItIs: 'A component-based JavaScript UI library for building interactive web interfaces.',
    usage: 'Building modular client components, custom hooks, Framer Motion scroll animations, and interactive state management.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Frontend',
    icon: SiJavascript,
    color: '#F7DF1E',
    whatItIs: 'The core programming language of the modern web stack.',
    usage: 'Asynchronous fetch pipelines, array processing, debounced search synchronization, and client/server logic.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'Frontend',
    icon: SiTypescript,
    color: '#3178C6',
    whatItIs: 'A strongly typed superset of JavaScript that compiles to plain JS.',
    usage: 'Strict typing for property objects, interface definitions, and production client component props.',
    projects: ['Dreamlands Properties']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: SiTailwindcss,
    color: '#06B6D4',
    whatItIs: 'A utility-first CSS framework for rapid UI styling.',
    usage: 'Utility-first responsive layouts, glassmorphism design systems, custom color tokens, and 4K desktop to mobile precision.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'redux',
    name: 'Redux',
    category: 'Frontend',
    icon: SiRedux,
    color: '#764ABC',
    whatItIs: 'A predictable state container for JavaScript applications.',
    usage: 'Centralized global state management for shopping carts, user authentication tokens, and UI drawers.',
    projects: ['Zaaish']
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Frontend',
    icon: SiVite,
    color: '#646CFF',
    whatItIs: 'A next-generation frontend build tool providing lightning-fast HMR and optimized production bundles.',
    usage: 'Production frontend bundling, module hot-reloading, tree-shaking, and asset pipeline optimization.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend & DB',
    icon: FaNodeJs,
    color: '#339933',
    whatItIs: 'An asynchronous event-driven JavaScript backend runtime environment.',
    usage: 'Driving REST API services, environment variable management, and middleware execution.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend & DB',
    icon: SiExpress,
    color: '#FFFFFF',
    whatItIs: 'A fast, unopinionated backend web framework for Node.js.',
    usage: 'Modular route controllers, custom JWT authorization middleware, error handlers, and file upload endpoints.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    category: 'Backend & DB',
    icon: SiMongodb,
    color: '#47A248',
    whatItIs: 'A scalable document-oriented NoSQL database system.',
    usage: 'Schema design, indexing strategies, Mongoose ODM validation hooks, and CRUD query operations.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'render',
    name: 'Render',
    category: 'Backend & DB',
    icon: SiRender,
    color: '#46E3B7',
    whatItIs: 'A cloud application platform for hosting web services, APIs, and background workers.',
    usage: 'Production backend deployment for Express Node.js web services, SSL security, and environment configuration.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Backend & DB',
    icon: SiVercel,
    color: '#FFFFFF',
    whatItIs: 'A frontend cloud platform for static and serverless web deployments.',
    usage: 'Production frontend deployment, SSL configuration, automated builds, and serverless hosting.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'Tools & APIs',
    icon: SiCloudinary,
    color: '#3448C5',
    whatItIs: 'An end-to-end cloud media management platform for images and videos.',
    usage: 'Cloud image asset pipeline for asynchronous photo uploads, real-time image compression, and gallery hosting.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'paypal',
    name: 'PayPal API',
    category: 'Tools & APIs',
    icon: FaPaypal,
    color: '#00457C',
    whatItIs: 'A global digital payment processing REST API SDK.',
    usage: 'Secure checkout processing, payment order verification, and automated PDF invoice generation.',
    projects: ['Zaaish']
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'Tools & APIs',
    icon: SiPostman,
    color: '#FF6C37',
    whatItIs: 'An API platform for building and testing API endpoints.',
    usage: 'API endpoint testing, environment variable management, JWT bearer token verification, and payload validation.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Tools & APIs',
    icon: FaGitAlt,
    color: '#F05032',
    whatItIs: 'Distributed version control and cloud code repository platform.',
    usage: 'Version control discipline, feature branching, pull requests, and automated deployment pipelines.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  }
];

const categories = ["All", "Frontend", "Backend & DB", "Tools & APIs"];

const SkillUniverse = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = activeCategory === "All"
    ? skillsList
    : skillsList.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 lg:py-40 bg-[#080811] overflow-hidden">
      
      {/* AMBIENT LIGHTING */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <span>03</span>
            <span className="text-slate-600">//</span>
            <span>TECHNICAL SKILLS & ECOSYSTEM</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            TECHNICAL <span className="text-gradient-cosmic">ECOSYSTEM</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
            Categorized production tools & engineering capabilities. Click any badge to view specs.
          </p>
        </motion.div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 font-mono text-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-bold ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] scale-105'
                    : 'bg-[#0d0e24] border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE TOOL BADGES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkillId === skill.id;
            const isMuted = hoveredSkillId !== null && !isHovered;

            return (
              <motion.div
                key={skill.id}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                onClick={() => setSelectedSkill(skill)}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`p-5 sm:p-6 rounded-3xl bg-[#0d0e24]/90 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between min-h-[155px] group backdrop-blur-md ${
                  isHovered
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] z-20 scale-[1.03]'
                    : isMuted
                    ? 'border-white/5 opacity-40 grayscale'
                    : 'border-white/12 hover:border-cyan-400/40'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#080811] border border-white/12 flex items-center justify-center p-3 mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon size={24} style={{ color: skill.color }} />
                </div>

                <span className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>

                <span className="text-[10px] font-mono text-slate-400 mt-1 font-semibold">
                  {skill.category}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN SKILL SPECIFICATIONS MODAL */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill ? `${selectedSkill.name.toUpperCase()} SPECIFICATION` : ''}
      >
        {selectedSkill && (
          <div className="space-y-5 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#050508] border border-white/15 flex items-center justify-center p-3 shadow-inner">
                <selectedSkill.icon size={26} style={{ color: selectedSkill.color }} />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedSkill.name}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedSkill.category} Stack
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050508] border border-white/10 text-xs sm:text-sm">
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-1">What It Is</h4>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedSkill.whatItIs}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#050508] border border-white/10 text-xs sm:text-sm">
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-1">How Resmal Uses It</h4>
              <p className="text-slate-200 leading-relaxed font-sans">
                {selectedSkill.usage}
              </p>
            </div>

            <div>
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-2">Implemented In Projects</h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {selectedSkill.projects.map((proj, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#050508] border border-emerald-500/30 text-emerald-400 font-bold">
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href="#projects"
                onClick={() => setSelectedSkill(null)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:opacity-90 transition"
              >
                <span>View Featured Projects</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </Modal>

    </section>
  );
};

export default SkillUniverse;
