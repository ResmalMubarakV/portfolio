import React, { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const AmbientBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 26, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 26, mass: 0.8 });
  
  // MULTI-COLOR RADIAL MOUSE LIGHTING (Sapphire Blue + Royal Violet Dual Aura)
  const pointerGlow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1) 50%, transparent 80%)`;

  const canvasRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;

    const updatePointer = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, [pointerX, pointerY, shouldReduceMotion]);

  // FLOATING COSMIC PARTICLES ANIMATION
  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      color: ['rgba(59, 130, 246, ', 'rgba(139, 92, 246, ', 'rgba(99, 102, 241, '][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080811]">
      
      {/* 3D LAB GRID PATTERN OVERLAY */}
      <div className="absolute inset-0 lab-grid-pattern opacity-30 pointer-events-none" />

      {/* FLOATING CANVAS PARTICLES */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      {/* TOP LEFT VIOLET COSMIC GLOW */}
      <div 
        className="absolute -top-32 left-1/4 -translate-x-1/2 w-[950px] h-[650px] pointer-events-none opacity-45 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.18) 0%, rgba(8, 8, 17, 0) 75%)',
        }}
      />

      {/* TOP RIGHT CYAN NEON GLOW */}
      <div 
        className="absolute top-1/3 -right-32 w-[850px] h-[650px] pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle at 70% 40%, rgba(6, 182, 212, 0.16) 0%, rgba(8, 8, 17, 0) 75%)',
        }}
      />

      {/* MID BOTTOM PINK MAGENTA AURA */}
      <div 
        className="absolute bottom-1/4 -left-32 w-[900px] h-[700px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 60%, rgba(236, 72, 153, 0.14) 0%, rgba(8, 8, 17, 0) 75%)',
        }}
      />

      {/* BOTTOM RIGHT AMBER SUNSET LIGHT */}
      <div 
        className="absolute -bottom-32 right-1/3 w-[800px] h-[600px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 60% 80%, rgba(245, 158, 11, 0.12) 0%, rgba(8, 8, 17, 0) 75%)',
        }}
      />

      {/* DYNAMIC MOUSE RADIAL SPOTLIGHT */}
      {!shouldReduceMotion && <motion.div className="absolute inset-0" style={{ background: pointerGlow }} />}
    </div>
  );
};

export default AmbientBackground;
