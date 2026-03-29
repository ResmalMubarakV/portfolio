import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsDesktop(false);
      return;
    }

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', move);

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    />
  );
};

export default CustomCursor;