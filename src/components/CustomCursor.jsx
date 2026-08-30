import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Custom Cursor
 * ─────────────────────
 * • Dot: Locks to the mouse pixel-perfectly via rAF (zero delay)
 * • Ring: Follows with a spring-like CSS transition (depth & elegance)
 * • On hover: Ring expands + tints; on link hover: "VIEW" text appears
 * • Custom SVG diamond/crosshair replaces the OS arrow cursor
 */
const CustomCursor = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);

  const [state, setState] = useState({
    hovered: false,
    label: null,
    clicking: false,
  });

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const onMqChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onMqChange);
    if (!mq.matches) return () => mq.removeEventListener('change', onMqChange);

    // ── Position tracking ──────────────────────────────────────────────
    let raf = null;
    let tx = -200, ty = -200; // off-screen until first move

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${tx}px,${ty}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      raf = null;
    };

    // ── State detection ────────────────────────────────────────────────
    const detect = (e) => {
      const el = e.target;
      const label = el.getAttribute('data-cursor') ??
                    el.closest('[data-cursor]')?.getAttribute('data-cursor') ?? null;

      const interactive =
        label ||
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.getAttribute('role') === 'button';

      setState(prev => ({
        ...prev,
        hovered: !!interactive,
        label: label ?? null,
      }));
    };

    const onDown = () => setState(p => ({ ...p, clicking: true }));
    const onUp   = () => setState(p => ({ ...p, clicking: false }));

    window.addEventListener('mousemove',  move,   { passive: true });
    window.addEventListener('mouseover',  detect, { passive: true });
    window.addEventListener('mousedown',  onDown, { passive: true });
    window.addEventListener('mouseup',    onUp,   { passive: true });

    return () => {
      mq.removeEventListener('change', onMqChange);
      window.removeEventListener('mousemove',  move);
      window.removeEventListener('mouseover',  detect);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!isDesktop) return null;

  const { hovered, label, clicking } = state;

  /* ── ring size & colour ─────────────────────────────────────────── */
  const ringSize  = clicking ? 28 : hovered ? 52 : 36;
  const ringColor = hovered
    ? 'rgba(139,92,246,0.85)'   // violet on hover
    : 'rgba(99,102,241,0.55)';  // indigo idle

  const dotSize   = clicking ? 4 : hovered ? 6 : 5;
  const dotColor  = hovered ? '#a78bfa' : '#818cf8';

  return (
    <>
      {/* ── Dot (zero-lag) ───────────────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          background: dotColor,
          boxShadow: `0 0 ${hovered ? 14 : 8}px ${dotColor}`,
          transform: 'translate3d(-200px,-200px,0)',
          translate: '-50% -50%',
          pointerEvents: 'none',
          zIndex: 9999999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease',
        }}
      />

      {/* ── Ring (spring-follow) ─────────────────────────────────── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: '50%',
          border: `1.5px solid ${ringColor}`,
          background: hovered ? 'rgba(139,92,246,0.07)' : 'transparent',
          boxShadow: hovered
            ? `0 0 22px rgba(139,92,246,0.35), inset 0 0 10px rgba(139,92,246,0.1)`
            : `0 0 10px rgba(99,102,241,0.2)`,
          transform: 'translate3d(-200px,-200px,0)',
          translate: '-50% -50%',
          pointerEvents: 'none',
          zIndex: 9999998,
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* spring-like follow */
          transition: [
            'width 0.22s cubic-bezier(0.34,1.56,0.64,1)',
            'height 0.22s cubic-bezier(0.34,1.56,0.64,1)',
            'border-color 0.18s ease',
            'background 0.18s ease',
            'box-shadow 0.18s ease',
          ].join(', '),
        }}
      >
        {/* Label text inside ring */}
        {label && (
          <span style={{
            color: '#e0d9ff',
            fontSize: '9px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            {label}
          </span>
        )}
      </div>

      {/* ── Custom SVG cursor icon (replaces OS arrow) ───────────── */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
    </>
  );
};

export default CustomCursor;
