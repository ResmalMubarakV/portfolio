import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary, SiRedux, SiTypescript, SiRender, SiVite } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
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
    category: 'Core Logic',
    icon: SiJavascript,
    color: '#F7DF1E',
    whatItIs: 'The core programming language of the modern web stack.',
    usage: 'Asynchronous fetch pipelines, array processing, debounced search synchronization, and client/server logic.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'Type Safety',
    icon: SiTypescript,
    color: '#3178C6',
    whatItIs: 'A strongly typed superset of JavaScript that compiles to plain JS.',
    usage: 'Strict typing for property objects, interface definitions, and production client component props.',
    projects: ['Dreamlands Properties']
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    icon: FaNodeJs,
    color: '#339933',
    whatItIs: 'An asynchronous event-driven JavaScript backend runtime environment.',
    usage: 'Driving REST API services, environment variable management, and middleware execution.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'REST Framework',
    icon: SiExpress,
    color: '#FFFFFF',
    whatItIs: 'A fast, unopinionated backend web framework for Node.js.',
    usage: 'Modular route controllers, custom JWT authorization middleware, error handlers, and file upload endpoints.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    category: 'Database',
    icon: SiMongodb,
    color: '#47A248',
    whatItIs: 'A scalable document-oriented NoSQL database system.',
    usage: 'Schema design, indexing strategies, Mongoose ODM validation hooks, and CRUD query operations.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'UI Architecture',
    icon: SiTailwindcss,
    color: '#06B6D4',
    whatItIs: 'A utility-first CSS framework for rapid UI styling.',
    usage: 'Utility-first responsive layouts, glassmorphism design systems, custom color tokens, and 4K desktop to mobile precision.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'redux',
    name: 'Redux',
    category: 'State Management',
    icon: SiRedux,
    color: '#764ABC',
    whatItIs: 'A predictable state container for JavaScript applications.',
    usage: 'Centralized global state management for shopping carts, user authentication tokens, and UI drawers.',
    projects: ['Zaaish']
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'Cloud Media',
    icon: SiCloudinary,
    color: '#3448C5',
    whatItIs: 'An end-to-end cloud media management platform for images and videos.',
    usage: 'Cloud image asset pipeline for asynchronous photo uploads, real-time image compression, and gallery hosting.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'paypal',
    name: 'PayPal API',
    category: 'Payments',
    icon: FaPaypal,
    color: '#00457C',
    whatItIs: 'A global digital payment processing REST API SDK.',
    usage: 'Secure checkout processing, payment order verification, and automated PDF invoice generation.',
    projects: ['Zaaish']
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'API Testing',
    icon: SiPostman,
    color: '#FF6C37',
    whatItIs: 'An API platform for building and testing API endpoints.',
    usage: 'API endpoint testing, environment variable management, JWT bearer token verification, and payload validation.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Workflow',
    icon: FaGitAlt,
    color: '#F05032',
    whatItIs: 'Distributed version control and cloud code repository platform.',
    usage: 'Version control discipline, feature branching, pull requests, and automated deployment pipelines.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deployment',
    icon: SiVercel,
    color: '#FFFFFF',
    whatItIs: 'A frontend cloud platform for static and serverless web deployments.',
    usage: 'Production frontend deployment, SSL configuration, automated builds, and serverless hosting.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'render',
    name: 'Render',
    category: 'Cloud Backend',
    icon: SiRender,
    color: '#46E3B7',
    whatItIs: 'A cloud application platform for hosting web services, APIs, and background workers.',
    usage: 'Production backend deployment for Express Node.js web services, SSL security, and environment configuration.',
    projects: ['Avora', 'Zaaish']
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Build System',
    icon: SiVite,
    color: '#646CFF',
    whatItIs: 'A next-generation frontend build tool providing lightning-fast HMR and optimized production bundles.',
    usage: 'Production frontend bundling, module hot-reloading, tree-shaking, and asset pipeline optimization.',
    projects: ['Avora', 'Zaaish', 'Dreamlands Properties']
  }
];

const SkillUniverse = () => {
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills" className="relative py-28 lg:py-40 bg-[#000000] overflow-hidden">
      
      {/* AMBIENT LIGHTING */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#2997FF]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-blue">Ecosystem</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
            Click any technology icon to inspect implementation details.
          </p>
        </div>

        {/* APPLE APP ICON DYNAMIC GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {skillsList.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkillId === skill.id;
            const isMuted = hoveredSkillId !== null && !isHovered;

            return (
              <motion.div
                key={skill.id}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                onClick={() => setSelectedSkill(skill)}
                whileHover={{ scale: 1.06, y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`p-6 rounded-[24px] bg-[#121217] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between min-h-[155px] group ${
                  isHovered
                    ? 'border-[#2997FF] shadow-[0_0_30px_rgba(41,151,255,0.3)] z-20'
                    : isMuted
                    ? 'border-white/5 opacity-40 grayscale'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-13 h-13 rounded-2xl bg-[#000000] border border-white/10 flex items-center justify-center p-3 mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={26} style={{ color: skill.color }} />
                </div>

                <span className="font-display text-sm font-bold text-white group-hover:text-[#2997FF] transition-colors">
                  {skill.name}
                </span>

                <span className="text-[10px] font-mono text-slate-500 mt-1">
                  {skill.category}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* COMPACT SKILL DETAILS MODAL */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill ? selectedSkill.name : ''}
        maxWidth="max-w-md"
      >
        {selectedSkill && (
          <div className="space-y-5 font-sans text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#2997FF]/15 text-[#2997FF] border border-[#2997FF]/30 font-bold font-mono">
                {selectedSkill.category}
              </span>
            </div>

            <div>
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-1">What It Is</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedSkill.whatItIs}
              </p>
            </div>

            <div>
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-1">How Resmal Uses It</h4>
              <p className="text-slate-200 text-sm leading-relaxed">
                {selectedSkill.usage}
              </p>
            </div>

            <div>
              <h4 className="text-slate-400 font-mono text-[11px] uppercase tracking-wider mb-2">Implemented In</h4>
              <div className="flex flex-wrap gap-2 font-mono">
                {selectedSkill.projects.map((proj, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#000000] border border-white/10 text-white font-bold">
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="#projects"
                onClick={() => setSelectedSkill(null)}
                className="w-full py-3 rounded-full bg-[#2997FF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(41,151,255,0.3)] hover:bg-[#1a85ea] transition"
              >
                <span>View Projects</span>
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
