import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [cursorState, setCursorState] = useState({
    hovered: false,
    label: null,
  });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsDesktop(false);
      return;
    }

    let reqId = null;
    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!reqId) {
        reqId = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      reqId = null;
    };

    const onMouseOver = (e) => {
      const target = e.target;

      const cursorLabel = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorLabel) {
        setCursorState({ hovered: true, label: cursorLabel });
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorState({ hovered: true, label: null });
      } else {
        setCursorState({ hovered: false, label: null });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
        className="pointer-events-none"
      >
        <div
          style={{
            transform: `translate(-50%, -50%) scale(${cursorState.hovered ? (cursorState.label ? 2.2 : 1.5) : 1})`,
            transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.15s ease',
          }}
          className={`flex items-center justify-center rounded-full border-2 border-[#10b981] bg-[#10b981]/20 shadow-[0_0_25px_#10b981] ${
            cursorState.label ? 'w-12 h-12 bg-[#10b981] text-slate-950 font-mono text-[9px] font-black tracking-widest' : 'w-5 h-5'
          }`}
        >
          {cursorState.label ? (
            <span>{cursorState.label}</span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;