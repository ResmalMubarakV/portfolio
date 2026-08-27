import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Server, Database, Lock, Zap, Layers, ChevronRight } from 'lucide-react';
import Modal from './Modal';
import MagneticButton from './MagneticButton';

const concepts = [
  {
    id: "01",
    key: "ARCHITECTURE",
    title: "ARCHITECTURE",
    description: "Modular Express.js controllers and clean route handlers.",
    icon: Layers,
    details: ["Express.js modular route controllers", "Clean request/response separation", "Custom error handling middleware", "Fast API execution"],
    modalContent: "Backend code is organized into clear routes, controllers, and services for readability and maintenance."
  },
  {
    id: "02",
    key: "APIS",
    title: "REST APIS",
    description: "Structured JSON endpoints with validation and payment integrations.",
    icon: Server,
    details: ["Structured RESTful endpoint schemas", "JWT bearer token authorization", "PayPal REST API integration", "Debounced query handlers"],
    modalContent: "25+ REST API endpoints built with input validation and consistent error handling."
  },
  {
    id: "03",
    key: "DATABASE",
    title: "DATABASE",
    description: "MongoDB collections and Mongoose document validation schemas.",
    icon: Database,
    details: ["MongoDB collection schemas", "Mongoose ODM validation", "Cloudinary media pipeline", "Indexed query lookup"],
    modalContent: "Document schemas designed for fast reads and cloud media linking."
  },
  {
    id: "04",
    key: "AUTHENTICATION",
    title: "AUTHENTICATION",
    description: "JWT session tokens, bcrypt password hashing, and role access.",
    icon: Lock,
    details: ["JWT authorization headers", "Bcrypt password hashing", "Role-based access control (RBAC)", "Password confirmation modals"],
    modalContent: "User data protected with salted password hashing and role permissions."
  },
  {
    id: "05",
    key: "PERFORMANCE",
    title: "PERFORMANCE",
    description: "Vite build code splitting, image compression, and SEO metadata.",
    icon: Zap,
    details: ["Vite code splitting & lazy loading", "Open Graph SEO metadata", "Responsive UI layouts", "WhatsApp lead capture routing"],
    modalContent: "Page performance optimized for fast loading across desktop and mobile devices."
  }
];

const EngineeringConceptItem = ({ concept, onOpenModal }) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
  const Icon = concept.icon;

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, scale }}
      className="glass-card-lab p-6 sm:p-8 rounded-3xl border border-white/15 hover:border-emerald-400/40 transition-all duration-500 group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-2xl font-black text-emerald-400">
          {concept.id}
        </span>

        <div className="w-10 h-10 rounded-2xl bg-[#050508] border border-white/10 text-emerald-400 flex items-center justify-center">
          <Icon size={20} />
        </div>
      </div>

      <h3 className="font-display text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors mb-2">
        {concept.title}
      </h3>

      <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans">
        {concept.description}
      </p>

      <div>
        <MagneticButton
          onClick={() => onOpenModal(concept)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:opacity-90 transition"
        >
          <span>EXPLORE DETAILS</span>
          <ChevronRight size={14} />
        </MagneticButton>
      </div>
    </motion.div>
  );
};

const EngineeringLab = () => {
  const containerRef = useRef(null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const node1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0.2, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0.2, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0.2, 1]);
  const node4Opacity = useTransform(scrollYProgress, [0.65, 0.85], [0.2, 1]);

  return (
    <section id="engineering" ref={containerRef} className="relative py-24 lg:py-36 bg-[#050508] overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            HOW I <span className="text-gradient-emerald">BUILD</span>
          </h2>
        </div>

        {/* STICKY CONCEPT FLOW & PROGRESSIVE DIAGRAM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT STICKY SECTION: PROGRESSIVE DIAGRAM */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ARCHITECTURE <span className="text-gradient-emerald">FLOW</span>
            </h3>

            <div className="p-5 rounded-2xl bg-[#0B0E14] border border-white/10 space-y-3 font-mono text-xs shadow-2xl">
              
              <motion.div style={{ opacity: node1Opacity }} className="p-3 rounded-xl bg-[#050508] border border-emerald-500/40 text-white flex items-center justify-between">
                <span className="text-emerald-400 font-bold">01. React UI</span>
                <span className="text-[10px] text-slate-400">Client</span>
              </motion.div>

              <motion.div style={{ opacity: node2Opacity }} className="p-3 rounded-xl bg-[#050508] border border-emerald-500/40 text-white flex items-center justify-between">
                <span className="text-emerald-400 font-bold">02. Express API</span>
                <span className="text-[10px] text-slate-400">Routes</span>
              </motion.div>

              <motion.div style={{ opacity: node3Opacity }} className="p-3 rounded-xl bg-[#050508] border border-emerald-500/40 text-white flex items-center justify-between">
                <span className="text-emerald-400 font-bold">03. MongoDB</span>
                <span className="text-[10px] text-slate-400">Database</span>
              </motion.div>

              <motion.div style={{ opacity: node4Opacity }} className="p-3 rounded-xl bg-[#050508] border border-emerald-500/40 text-white flex items-center justify-between">
                <span className="text-emerald-400 font-bold">04. Cloud Storage</span>
                <span className="text-[10px] text-slate-400">Cloudinary</span>
              </motion.div>

            </div>
          </div>

          {/* RIGHT CONCEPT CARDS */}
          <div className="lg:col-span-7 space-y-6">
            {concepts.map((concept) => (
              <EngineeringConceptItem
                key={concept.id}
                concept={concept}
                onOpenModal={(c) => setSelectedConcept(c)}
              />
            ))}
          </div>

        </div>

      </div>

      {/* FULLSCREEN CONCEPT DETAILS MODAL */}
      <Modal
        isOpen={!!selectedConcept}
        onClose={() => setSelectedConcept(null)}
        title={selectedConcept ? `${selectedConcept.title} DETAILS` : ''}
      >
        {selectedConcept && (
          <div className="space-y-5 font-mono text-xs">
            <p className="text-slate-200 text-sm font-sans leading-relaxed">
              {selectedConcept.modalContent}
            </p>

            <div>
              <h4 className="text-emerald-400 font-bold uppercase tracking-wider mb-2">Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
                {selectedConcept.details.map((detail, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#050508] border border-white/10 text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

    </section>
  );
};

export default EngineeringLab;
