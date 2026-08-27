import React from 'react';

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      
      {/* HIGH-TECH 3D LAB GRID PATTERN */}
      <div className="absolute inset-0 lab-grid-pattern opacity-35 pointer-events-none" />

      {/* DYNAMIC AMBIENT MINT EMERALD RADIAL LIGHTING */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.14) 0%, rgba(3, 3, 5, 0) 75%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[900px] h-[650px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.08) 0%, rgba(3, 3, 5, 0) 75%)',
        }}
      />
    </div>
  );
};

export default AmbientBackground;
