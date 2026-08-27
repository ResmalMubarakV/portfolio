import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollControls = () => {
  const { scrollYProgress } = useScroll();
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [106, 0]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setIsVisible(v > 0.08);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[99990] flex items-center gap-3 pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group relative w-12 h-12 rounded-full bg-[#0B0E14]/90 border border-white/15 backdrop-blur-xl flex items-center justify-center text-[#10b981] hover:text-slate-950 hover:bg-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 transition-all duration-300"
          >
            {/* CIRCULAR PROGRESS SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none">
              <circle
                cx="20"
                cy="20"
                r="17"
                className="stroke-slate-800"
                strokeWidth="2.5"
                fill="none"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="17"
                className="stroke-[#10b981]"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="106"
                style={{ strokeDashoffset }}
                strokeLinecap="round"
              />
            </svg>

            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollControls;
