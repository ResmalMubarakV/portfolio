import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Server, Database, Lock, Zap, Layers, ChevronRight, CheckCircle2,
  Cloud, Cpu, Activity, Terminal, Shield, Globe, Sparkles
} from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiCloudinary } from 'react-icons/si';
import Modal from './Modal';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';

// ─── Data ────────────────────────────────────────────────────────────────────

const architectureFlowNodes = [
  { id: '01', title: 'React 19 UI',     subtitle: 'Client Layer',       icon: FaReact,      color: '#61DAFB' },
  { id: '02', title: 'Express API',     subtitle: 'Route Controllers',  icon: SiExpress,    color: '#FFFFFF' },
  { id: '03', title: 'MongoDB',         subtitle: 'Database & ODM',     icon: SiMongodb,    color: '#47A248' },
  { id: '04', title: 'Cloud Storage',   subtitle: 'Cloudinary API',     icon: SiCloudinary, color: '#3448C5' },
  { id: '05', title: 'Security & Auth', subtitle: 'JWT & RBAC Guards',  icon: Lock,         color: '#10B981' },
];

const concepts = [
  {
    id: '01', key: 'ARCHITECTURE', title: 'ARCHITECTURE',
    subtitle: 'Modular Controller & Route Pipeline',
    description: 'Modular Express.js controllers and clean route handlers designed for scalability, separation of concerns, and robust error handling.',
    icon: Layers,
    details: [
      'Express.js modular route controllers',
      'Clean request/response separation',
      'Custom error handling middleware',
      'High-throughput async execution',
    ],
    modalContent: 'Backend code is organized into clear routes, controllers, and services for readability, maintainability, and enterprise scalability.',
    codeSnippet: `// Modular Express Route Controller
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err); // Centralized error handling
  }
};`,
  },
  {
    id: '02', key: 'APIS', title: 'REST APIS',
    subtitle: 'Structured Endpoints & Third-Party Integration',
    description: 'Structured JSON endpoints with payload validation, debounced search query synchronization, and PayPal REST API checkout processing.',
    icon: Server,
    details: [
      '25+ structured RESTful endpoint schemas',
      'JWT bearer token authorization middleware',
      'PayPal REST API SDK integration',
      'Debounced query & search synchronization',
    ],
    modalContent: '25+ REST API endpoints built with strict input validation, consistent error schemas, and seamless digital payment SDK integrations.',
    codeSnippet: `// PayPal REST Payment Verification Route
router.post('/checkout/verify', protect, async (req, res) => {
  const { orderID } = req.body;
  const capture = await paypalClient.execute(new OrdersCaptureRequest(orderID));
  res.json({ status: 'COMPLETED', invoiceId: capture.result.id });
});`,
  },
  {
    id: '03', key: 'DATABASE', title: 'DATABASE',
    subtitle: 'Document Schemas & Query Indexing',
    description: 'MongoDB document collections and Mongoose ODM validation schemas optimized for fast read performance and relational asset linkage.',
    icon: Database,
    details: [
      'MongoDB collection schemas & indexes',
      'Mongoose ODM validation hooks',
      'Cloudinary media reference mapping',
      'Indexed query lookup for fast retrieval',
    ],
    modalContent: 'Document schemas designed for fast read operations, atomic cart state updates, and cloud media asset persistence.',
    codeSnippet: `// Mongoose Schema Definition & Indexing
const ProductSchema = new mongoose.Schema({
  name:     { type: String, required: true, index: true },
  price:    { type: Number, required: true },
  category: { type: String, enum: ['Men', 'Women', 'Accessories'] },
  images:   [{ url: String, public_id: String }]
}, { timestamps: true });`,
  },
  {
    id: '04', key: 'AUTHENTICATION', title: 'AUTHENTICATION',
    subtitle: 'Global JWT Session Invalidation & RBAC Guards',
    description: 'Global JWT session invalidation tracking passwordChangedAt timestamps, Express Rate Limit brute-force protection, salted bcrypt hashing, and multi-tier RBAC moderation.',
    icon: Lock,
    details: [
      'passwordChangedAt global session invalidation',
      '24-hr Express Rate Limit brute-force guards',
      'Multi-tier RBAC (pending/approved/suspended)',
      'Salted Bcrypt password encryption & JWT',
    ],
    modalContent: 'Enterprise security architecture featuring automatic global session revocation across all active devices upon password reset, strict rate limiting on auth routes, and role-based moderation workflows.',
    codeSnippet: `// Global JWT Session Revocation via passwordChangedAt
const changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp; // Invalidate session token
  }
  return false;
};`,
  },
  {
    id: '05', key: 'PERFORMANCE', title: 'PERFORMANCE',
    subtitle: 'Vite Bundle Splitting & SEO Pipeline',
    description: 'Vite build code splitting, WebP image compression, Open Graph SEO metadata, and responsive viewport optimization across desktop and mobile.',
    icon: Zap,
    details: [
      'Vite code splitting & lazy loading',
      'Open Graph & Twitter SEO metadata',
      'WebP image compression pipeline',
      'WhatsApp lead capture integration',
    ],
    modalContent: 'Page load speeds optimized with Vite bundling, lazy-loaded visual components, responsive image formats, and production SEO tags.',
    codeSnippet: `// Vite Production Optimization Config
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom', 'framer-motion'] } } }
  }
});`,
  },
];

// ─── Card component ───────────────────────────────────────────────────────────

const EngineeringConceptItem = ({ concept, index, onOpenModal, isActive, cardRef }) => {
  const Icon = concept.icon;

  return (
    <motion.div
      ref={cardRef}
      data-concept-index={index}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard maxRotate={4}>
        <div
          className={`glass-card-lab p-6 sm:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${
            isActive
              ? 'border-emerald-400/60 shadow-[0_0_38px_rgba(16,185,129,0.22)] bg-[#090d16]/90'
              : 'border-white/15 hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
          }`}
        >
          {/* BG ACCENT */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

          {/* ACTIVE INDICATOR PILL */}
          {isActive && (
            <span className="absolute top-4 right-4 text-[9px] font-mono font-black text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              ACTIVE
            </span>
          )}

          {/* HEADER */}
          <div className="flex items-center justify-between mb-5 relative z-10 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-emerald-400 tracking-wider">{concept.id}</span>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 border border-white/10 px-2.5 py-1 rounded-full bg-[#050508]">
                // {concept.key}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#050508] border border-white/15 text-emerald-400 flex items-center justify-center shadow-inner group-hover:border-emerald-400/50 group-hover:scale-110 transition-all duration-300">
              <Icon size={22} />
            </div>
          </div>

          {/* TITLE */}
          <div className="mb-4 relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors mb-1">
              {concept.title}
            </h3>
            <p className="font-mono text-xs font-bold text-emerald-400/90">{concept.subtitle}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans relative z-10">
            {concept.description}
          </p>

          {/* BULLET GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 relative z-10 font-sans text-xs">
            {concept.details.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 bg-[#050508]/60 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* FOOTER CTA */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
              Click for architecture specs
            </span>
            <MagneticButton
              onClick={() => onOpenModal(concept)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:opacity-95 transition hover:scale-105"
            >
              <span>EXPLORE DETAILS</span>
              <ChevronRight size={15} />
            </MagneticButton>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Sticky Architecture Flow Panel ──────────────────────────────────────────

const ArchitectureFlowPanel = ({ activeIndex, onNodeClick }) => (
  <div className="p-6 rounded-3xl bg-[#0d0e24]/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
    {/* HEADER */}
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
      <div className="flex items-center gap-2.5 font-mono">
        <Cpu size={18} className="text-blue-400 animate-pulse" />
        <h3 className="font-display text-xl font-extrabold text-white tracking-tight">
          ARCHITECTURE <span className="text-gradient-violet">FLOW</span>
        </h3>
      </div>
      <span className="text-[10px] font-mono font-black text-blue-300 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
        PIPELINE
      </span>
    </div>

    {/* FLOW TRACK */}
    <div className="relative space-y-2.5 font-mono text-xs">
      {/* VERTICAL LASER LINE — spans full track height */}
      <div className="absolute left-[27px] top-5 bottom-5 w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />

      {/* ACTIVE PROGRESS FILL — grows as user scrolls */}
      <div
        className="absolute left-[27px] top-5 w-[2px] rounded-full bg-gradient-to-b from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)] transition-all duration-500"
        style={{
          height: activeIndex < 0 ? '0%' :
            `calc(${((activeIndex) / (architectureFlowNodes.length - 1)) * 100}% )`,
        }}
      />

      {architectureFlowNodes.map((node, i) => {
        const NodeIcon = node.icon;
        const isActive  = activeIndex === i;
        const isPast    = i < activeIndex;

        return (
          <button
            key={node.id}
            onClick={() => onNodeClick(i)}
            className={`relative z-10 w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between group/node ${
              isActive
                ? 'bg-[#080811] border-blue-400 shadow-[0_0_22px_rgba(59,130,246,0.35)] scale-[1.02]'
                : isPast
                ? 'bg-[#0a0b1c]/60 border-emerald-500/30 hover:border-emerald-500/50'
                : 'bg-[#0a0b1c]/80 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Icon bubble */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_0_14px_#3b82f6]'
                    : isPast
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#14162e] text-slate-300 border border-white/10'
                }`}
              >
                <NodeIcon size={16} />
              </div>

              <div>
                <div className="font-bold text-white flex items-center gap-2 text-xs">
                  <span className={isActive ? 'text-blue-400' : isPast ? 'text-emerald-400' : 'text-slate-500'}>
                    {node.id}.
                  </span>
                  <span className={isActive ? 'text-white' : isPast ? 'text-slate-200' : 'text-slate-400'}>
                    {node.title}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 group-hover/node:text-slate-400 transition-colors">
                  {node.subtitle}
                </div>
              </div>
            </div>

            {/* Status badge */}
            <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold whitespace-nowrap ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : isPast
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-slate-600 border border-white/5'
            }`}>
              {isActive ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  ACTIVE
                </span>
              ) : isPast ? '✓ DONE' : 'NODE'}
            </span>
          </button>
        );
      })}
    </div>

    {/* FOOTER */}
    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span className="flex items-center gap-1.5">
        <Terminal size={13} className="text-violet-400" /> Decoupled Services
      </span>
      <span className="text-cyan-400 font-bold">100% Async</span>
    </div>
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const EngineeringLab = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeIndex, setActiveIndex]         = useState(0);

  // One ref per card — so we can observe them AND scroll-to them
  const cardRefs = useRef(concepts.map(() => React.createRef()));

  // ── IntersectionObserver: which card is most visible? ──────────────────────
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((ref, i) => {
      if (!ref.current) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          // Centre-band threshold: card must cross the middle 40% of the viewport
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0,
        }
      );

      obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // ── Clicking a pipeline node scrolls the corresponding card into view ──────
  const handleNodeClick = useCallback((i) => {
    cardRefs.current[i]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  return (
    <section id="engineering" className="relative py-28 lg:py-40 bg-[#080811]">

      {/* AMBIENT GLOWS — own overflow-hidden wrapper so sticky is never broken */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Activity size={14} className="animate-pulse text-blue-400" />
            <span>04 // SYSTEM ARCHITECTURE &amp; ENGINEERING WORKFLOW</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            HOW I <span className="text-gradient-cosmic">BUILD</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
            A battle-tested full-stack architecture combining client-side motion, RESTful Express endpoints,
            structured MongoDB schema validation, and cloud infrastructure.
          </p>
        </motion.div>

        {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT — STICKY PIPELINE PANEL */}
          {/*
            sticky top-28 keeps it glued to the viewport while the right-side
            cards scroll past.  The panel's own height is short enough that it
            never overflows the viewport — it just stays visible the whole time.
          */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
            <ArchitectureFlowPanel activeIndex={activeIndex} onNodeClick={handleNodeClick} />
          </div>

          {/* MOBILE PIPELINE (non-sticky, collapsible strip) */}
          <div className="lg:hidden col-span-1 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {architectureFlowNodes.map((node, i) => {
                const NodeIcon = node.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-mono text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#080811] border-blue-400 text-white shadow-[0_0_14px_rgba(59,130,246,0.3)]'
                        : 'bg-[#0a0b1c]/80 border-white/10 text-slate-400'
                    }`}
                  >
                    <NodeIcon size={14} />
                    <span>{node.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — SCROLLABLE CONCEPT CARDS */}
          <div className="lg:col-span-7 space-y-6">
            {concepts.map((concept, index) => (
              <EngineeringConceptItem
                key={concept.id}
                concept={concept}
                index={index}
                isActive={activeIndex === index}
                cardRef={cardRefs.current[index]}
                onOpenModal={setSelectedConcept}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────────────── */}
      <Modal
        isOpen={!!selectedConcept}
        onClose={() => setSelectedConcept(null)}
        title={selectedConcept ? `${selectedConcept.title} SPECIFICATIONS` : ''}
        maxWidth="max-w-3xl"
      >
        {selectedConcept && (
          <div className="space-y-6 font-sans">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs font-bold text-emerald-400 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                {selectedConcept.id} // {selectedConcept.key}
              </span>
              <span className="text-xs text-slate-400">Architecture Spec</span>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {selectedConcept.title}
              </h3>
              <p className="font-mono text-xs text-emerald-400 font-bold mb-3">{selectedConcept.subtitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedConcept.modalContent}</p>
            </div>

            {selectedConcept.codeSnippet && (
              <div className="rounded-2xl bg-[#050508] border border-white/15 overflow-hidden shadow-2xl">
                <div className="px-4 py-2.5 bg-[#0b0e14] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-300">{selectedConcept.key.toLowerCase()}.js</span>
                  </div>
                  <span className="text-emerald-400">JavaScript / ES6</span>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-300 bg-[#050508] overflow-x-auto leading-relaxed">
                  <code>{selectedConcept.codeSnippet}</code>
                </pre>
              </div>
            )}

            <div>
              <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                Core Architectural Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedConcept.details.map((detail, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#050508] border border-white/12 text-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
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
