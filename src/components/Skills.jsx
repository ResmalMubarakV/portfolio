import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Code2, Server, Database, Wrench, CheckCircle } from 'lucide-react';
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaPaypal } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVercel, SiCloudinary, SiRedux, SiRender } from 'react-icons/si';

const categories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React.js", level: "Advanced", icon: FaReact, color: "#61DAFB" },
      { name: "JavaScript (ES6+)", level: "Advanced", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", level: "Advanced", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Redux / Toolkit", level: "Intermediate", icon: SiRedux, color: "#764ABC" },
      { name: "HTML5", level: "Advanced", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", level: "Advanced", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Framer Motion", level: "Intermediate", icon: Code2, color: "#0055FF" },
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: "Advanced", icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", level: "Advanced", icon: SiExpress, color: "#FFFFFF" },
      { name: "RESTful APIs", level: "Advanced", icon: Server, color: "#ef4444" },
      { name: "JWT Auth & RBAC", level: "Advanced", icon: Server, color: "#8B5CF6" },
      { name: "Session Auth", level: "Intermediate", icon: Server, color: "#3B82F6" },
      { name: "PayPal Integration", level: "Intermediate", icon: FaPaypal, color: "#00457C" },
    ]
  },
  {
    id: "database",
    title: "Database & Storage",
    icon: Database,
    skills: [
      { name: "MongoDB", level: "Advanced", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose ODM", level: "Advanced", icon: Database, color: "#ef4444" },
      { name: "NoSQL Modeling", level: "Advanced", icon: Database, color: "#f43f5e" },
      { name: "Cloudinary API", level: "Intermediate", icon: SiCloudinary, color: "#3448C5" },
    ]
  },
  {
    id: "tools",
    title: "Dev Tools & Workflow",
    icon: Wrench,
    skills: [
      { name: "Git", level: "Advanced", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", level: "Advanced", icon: FaGithub, color: "#FFFFFF" },
      { name: "Vite", level: "Advanced", icon: Wrench, color: "#646CFF" },
      { name: "Postman", level: "Advanced", icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", level: "Advanced", icon: SiVercel, color: "#FFFFFF" },
      { name: "Render", level: "Advanced", icon: SiRender, color: "#46E3B7" },
      { name: "Performance Optimization", level: "Advanced", icon: Wrench, color: "#10B981" },
    ]
  }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section id="skills" ref={containerRef} className="relative py-24 lg:py-36 overflow-hidden bg-[#050508]">
      
      {/* SOFT AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* CLEAN HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            SKILLS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Technologies and frameworks I build production applications with.
          </p>
        </motion.div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-white/10 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={16} className={isActive ? 'text-white' : 'text-red-400'} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-10 max-w-4xl mx-auto border border-white/15 rounded-3xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory.skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="group p-4 rounded-2xl bg-slate-950/90 border border-white/10 hover:border-red-500/40 hover:bg-slate-900/90 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={20} style={{ color: skill.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white group-hover:text-red-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                          <CheckCircle size={10} className="text-red-400" />
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;