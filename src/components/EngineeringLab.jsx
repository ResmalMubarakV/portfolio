import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Server, Database, Lock, Zap, Layers, ChevronRight, CheckCircle2, Cloud, Cpu, Activity, Terminal, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiCloudinary } from 'react-icons/si';
import Modal from './Modal';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';

const architectureFlowNodes = [
  { id: "01", title: "React 19 UI", subtitle: "Client Layer", icon: FaReact, color: "#61DAFB" },
  { id: "02", title: "Express API", subtitle: "Route Controllers", icon: SiExpress, color: "#FFFFFF" },
  { id: "03", title: "MongoDB", subtitle: "Database & ODM", icon: SiMongodb, color: "#47A248" },
  { id: "04", title: "Cloud Storage", subtitle: "Cloudinary API", icon: SiCloudinary, color: "#3448C5" },
  { id: "05", title: "Security & Auth", subtitle: "JWT & RBAC Guards", icon: Lock, color: "#10B981" },
];

const concepts = [
  {
    id: "01",
    key: "ARCHITECTURE",
    title: "ARCHITECTURE",
    subtitle: "Modular Controller & Route Pipeline",
    description: "Modular Express.js controllers and clean route handlers designed for scalability, separation of concerns, and robust error handling.",
    icon: Layers,
    details: [
      "Express.js modular route controllers",
      "Clean request/response separation",
      "Custom error handling middleware",
      "High-throughput async execution"
    ],
    modalContent: "Backend code is organized into clear routes, controllers, and services for readability, maintainability, and enterprise scalability.",
    codeSnippet: `// Modular Express Route Controller
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err); // Centralized error handling
  }
};`
  },
  {
    id: "02",
    key: "APIS",
    title: "REST APIS",
    subtitle: "Structured Endpoints & Third-Party Integration",
    description: "Structured JSON endpoints with payload validation, debounced search query synchronization, and PayPal REST API checkout processing.",
    icon: Server,
    details: [
      "25+ structured RESTful endpoint schemas",
      "JWT bearer token authorization middleware",
      "PayPal REST API SDK integration",
      "Debounced query & search synchronization"
    ],
    modalContent: "25+ REST API endpoints built with strict input validation, consistent error schemas, and seamless digital payment SDK integrations.",
    codeSnippet: `// PayPal REST Payment Verification Route
router.post('/checkout/verify', protect, async (req, res) => {
  const { orderID } = req.body;
  const capture = await paypalClient.execute(new OrdersCaptureRequest(orderID));
  res.json({ status: 'COMPLETED', invoiceId: capture.result.id });
});`
  },
  {
    id: "03",
    key: "DATABASE",
    title: "DATABASE",
    subtitle: "Document Schemas & Query Indexing",
    description: "MongoDB document collections and Mongoose ODM validation schemas optimized for fast read performance and relational asset linkage.",
    icon: Database,
    details: [
      "MongoDB collection schemas & indexes",
      "Mongoose ODM validation hooks",
      "Cloudinary media reference mapping",
      "Indexed query lookup for fast retrieval"
    ],
    modalContent: "Document schemas designed for fast read operations, atomic cart state updates, and cloud media asset persistence.",
    codeSnippet: `// Mongoose Schema Definition & Indexing
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Men', 'Women', 'Accessories'] },
  images: [{ url: String, public_id: String }]
}, { timestamps: true });`
  },
  {
    id: "04",
    key: "AUTHENTICATION",
    title: "AUTHENTICATION",
    subtitle: "Global JWT Session Invalidation & RBAC Guards",
    description: "Global JWT session invalidation tracking passwordChangedAt timestamps, Express Rate Limit brute-force protection, salted bcrypt hashing, and multi-tier RBAC moderation.",
    icon: Lock,
    details: [
      "passwordChangedAt global session invalidation",
      "24-hr Express Rate Limit brute-force guards",
      "Multi-tier RBAC (pending/approved/suspended)",
      "Salted Bcrypt password encryption & JWT"
    ],
    modalContent: "Enterprise security architecture featuring automatic global session revocation across all active devices upon password reset, strict rate limiting on auth routes, and role-based moderation workflows.",
    codeSnippet: `// Global JWT Session Revocation via passwordChangedAt
const changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp; // Invalidate session token
  }
  return false;
};`
  },
  {
    id: "05",
    key: "PERFORMANCE",
    title: "PERFORMANCE",
    subtitle: "Vite Bundle Splitting & SEO Pipeline",
    description: "Vite build code splitting, WebP image compression, Open Graph SEO metadata, and responsive viewport optimization across desktop and mobile.",
    icon: Zap,
    details: [
      "Vite code splitting & lazy loading",
      "Open Graph & Twitter SEO metadata",
      "WebP image compression pipeline",
      "WhatsApp lead capture integration"
    ],
    modalContent: "Page load speeds optimized with Vite bundling, lazy-loaded visual components, responsive image formats, and production SEO tags.",
    codeSnippet: `// Vite Production Optimization Config
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom', 'framer-motion'] } } }
  }
});`
  }
];

const engineeringImpactData = [
  {
    id: "01",
    category: "01 // ARCHITECTURE",
    title: "Full-Stack Architecture",
    subtitle: "MERN Stack Mastery",
    description: "End-to-end MERN application development featuring Express.js modular routes, MongoDB indexing, and responsive React frontend systems.",
    icon: Cpu,
    badges: ["Clean Code Standard", "Full-Stack MERN"]
  },
  {
    id: "02",
    category: "02 // CLIENT PRODUCTION",
    title: "Real Client Production",
    subtitle: "Live Business Deployment",
    description: "Delivered production real estate portal live with custom domain, automated SEO metadata, AI architectural visuals, and direct WhatsApp lead routing.",
    icon: Globe,
    badges: ["Deployed Live", "Real-World Impact"]
  },
  {
    id: "03",
    category: "03 // SECURITY & APIS",
    title: "Security & Payment APIs",
    subtitle: "Enterprise Reliability",
    description: "Implemented JSON Web Tokens (JWT), role-based access control (RBAC), PayPal REST payment processing, PDF receipt generation, & Cloudinary uploads.",
    icon: Shield,
    badges: ["Bank-Grade Auth", "Enterprise Security"]
  }
];

const EngineeringConceptItem = ({ concept, index, onOpenModal, isActive, onHover }) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.94, 1, 1]);
  const Icon = concept.icon;

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(index)}
      className="w-full"
    >
      <TiltCard maxRotate={4}>
        <div
          className={`glass-card-lab p-6 sm:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${
            isActive
              ? 'border-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.22)] bg-[#090d16]/90'
              : 'border-white/15 hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
          }`}
        >
          {/* BACKGROUND NEON ACCENT */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

          {/* NUMBER & ICON HEADER */}
          <div className="flex items-center justify-between mb-5 relative z-10 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-emerald-400 tracking-wider">
                {concept.id}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 border border-white/10 px-2.5 py-1 rounded-full bg-[#050508]">
                // {concept.key}
              </span>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-[#050508] border border-white/15 text-emerald-400 flex items-center justify-center shadow-inner group-hover:border-emerald-400/50 group-hover:scale-110 transition-all duration-300">
              <Icon size={22} />
            </div>
          </div>

          {/* TITLE & SUBTITLE */}
          <div className="mb-4 relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors mb-1">
              {concept.title}
            </h3>
            <p className="font-mono text-xs font-bold text-emerald-400/90">
              {concept.subtitle}
            </p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans relative z-10">
            {concept.description}
          </p>

          {/* HIGHLIGHTS BULLETS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 relative z-10 font-sans text-xs">
            {concept.details.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 bg-[#050508]/60 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* EXPLORE DETAILS BUTTON */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
              Click for architecture specs
            </span>

            <MagneticButton
              onClick={() => onOpenModal(concept)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:opacity-95 transition hover:scale-105"
            >
              <span>EXPLORE DETAILS</span>
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const EngineeringLab = () => {
  const containerRef = useRef(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const node1Opacity = useTransform(scrollYProgress, [0.05, 0.22], [0.3, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.22, 0.42], [0.3, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.42, 0.62], [0.3, 1]);
  const node4Opacity = useTransform(scrollYProgress, [0.62, 0.82], [0.3, 1]);
  const node5Opacity = useTransform(scrollYProgress, [0.82, 0.98], [0.3, 1]);

  const nodeOpacities = [node1Opacity, node2Opacity, node3Opacity, node4Opacity, node5Opacity];

  return (
    <section id="engineering" ref={containerRef} className="relative py-28 lg:py-40 bg-[#080811] overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

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
            <span>04 // SYSTEM ARCHITECTURE & ENGINEERING WORKFLOW</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            HOW I <span className="text-gradient-cosmic">BUILD</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
            A battle-tested full-stack architecture combining client-side motion, RESTful Express endpoints, structured MongoDB schema validation, and cloud infrastructure.
          </p>
        </motion.div>

        {/* STICKY CONCEPT FLOW & PROGRESSIVE DIAGRAM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT STICKY SECTION: INTERACTIVE ARCHITECTURE PIPELINE */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0d0e24]/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5 font-mono">
                  <Cpu size={18} className="text-blue-400 animate-pulse" />
                  <h3 className="font-display text-xl font-extrabold text-white tracking-tight">
                    ARCHITECTURE <span className="text-gradient-violet">FLOW</span>
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-300 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                  PIPELINE
                </span>
              </div>

              {/* CONNECTED VERTICAL FLOW TRACK */}
              <div className="relative space-y-3 font-mono text-xs">
                {/* VERTICAL LASER LINE */}
                <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 z-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />

                {architectureFlowNodes.map((node, i) => {
                  const NodeIcon = node.icon;
                  const isCurrentActive = activeConceptIndex === i;

                  return (
                    <motion.div
                      key={node.id}
                      style={{ opacity: nodeOpacities[i] }}
                      onClick={() => setActiveConceptIndex(i)}
                      className={`relative z-10 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isCurrentActive
                          ? 'bg-[#080811] border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-[1.02]'
                          : 'bg-[#0a0b1c]/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                            isCurrentActive
                              ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_0_12px_#3b82f6]'
                              : 'bg-[#14162e] text-slate-300 border border-white/10'
                          }`}
                        >
                          <NodeIcon size={16} />
                        </div>

                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span className="text-blue-400">{node.id}.</span>
                            <span>{node.title}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">{node.subtitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCurrentActive && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            isCurrentActive
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-white/5 text-slate-500'
                          }`}
                        >
                          {isCurrentActive ? 'ACTIVE' : 'NODE'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* PIPELINE FOOTER STATS */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal size={13} className="text-violet-400" /> Decoupled Services
                </span>
                <span className="text-cyan-400 font-bold">100% Async</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONCEPT CARDS */}
          <div className="lg:col-span-7 space-y-6">
            {concepts.map((concept, index) => (
              <EngineeringConceptItem
                key={concept.id}
                concept={concept}
                index={index}
                isActive={activeConceptIndex === index}
                onHover={(idx) => setActiveConceptIndex(idx)}
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
              <p className="font-mono text-xs text-emerald-400 font-bold mb-3">
                {selectedConcept.subtitle}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedConcept.modalContent}
              </p>
            </div>

            {/* CODE SNIPPET PREVIEW */}
            {selectedConcept.codeSnippet && (
              <div className="rounded-2xl bg-[#050508] border border-white/15 overflow-hidden shadow-2xl">
                <div className="px-4 py-2.5 bg-[#0b0e14] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-300">{selectedConcept.key.toLowerCase()}.js</span>
                  </div>
                  <span className="text-emerald-400">JavaScript / ES6</span>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-300 bg-[#050508] overflow-x-auto leading-relaxed">
                  <code>{selectedConcept.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* ARCHITECTURE HIGHLIGHTS */}
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
