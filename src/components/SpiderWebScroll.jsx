import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SpiderWebScroll = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const webRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const webScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      
      {/* 1. LEFT SPINE SPIDER WEB THREAD LINE */}
      <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-8">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 32 1000">
          {/* BACKGROUND GUIDE LINE */}
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="1000"
            stroke="rgba(239, 68, 68, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* DYNAMIC SCROLL-DRAWN SPIDER WEB THREAD */}
          <motion.line
            x1="16"
            y1="0"
            x2="16"
            y2="1000"
            stroke="#ef4444"
            strokeWidth="2.5"
            style={{ pathLength }}
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_8px_#ef4444]"
          />
        </svg>

        {/* GLOWING WEB NODES AT REGULAR SPACING */}
        {[15, 35, 55, 75, 92].map((topPercent, i) => (
          <motion.div
            key={i}
            style={{ top: `${topPercent}%` }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
            <span className="absolute inset-0 rounded-full border border-red-400 animate-ping opacity-75" />
          </motion.div>
        ))}
      </div>

      {/* 2. TOP RIGHT CORNER PARALLAX SPIDER WEB ACCENT */}
      <motion.div
        style={{ rotate: webRotate, scale: webScale }}
        className="hidden md:block absolute -top-16 -right-16 w-80 h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-red-500 fill-none" strokeWidth="0.8">
          <circle cx="100" cy="100" r="20" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="45" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="95" strokeDasharray="5 5" />
          
          <line x1="100" y1="5" x2="100" y2="195" />
          <line x1="5" y1="100" x2="195" y2="100" />
          <line x1="33" y1="33" x2="167" y2="167" />
          <line x1="33" y1="167" x2="167" y2="33" />
        </svg>
      </motion.div>

      {/* 3. BOTTOM LEFT CORNER PARALLAX SPIDER WEB ACCENT */}
      <motion.div
        style={{ rotate: webRotate, scale: webScale }}
        className="hidden md:block absolute -bottom-16 -left-16 w-80 h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-red-500 fill-none" strokeWidth="0.8">
          <circle cx="100" cy="100" r="25" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="55" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="85" strokeDasharray="4 4" />
          
          <line x1="100" y1="5" x2="100" y2="195" />
          <line x1="5" y1="100" x2="195" y2="100" />
          <line x1="33" y1="33" x2="167" y2="167" />
          <line x1="33" y1="167" x2="167" y2="33" />
        </svg>
      </motion.div>

    </div>
  );
};

export default SpiderWebScroll;
