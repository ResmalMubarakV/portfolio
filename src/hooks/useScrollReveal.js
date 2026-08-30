import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * ───────────────
 * Observes an element with IntersectionObserver and adds/removes
 * CSS data-attributes so pure-CSS transitions can drive the animation.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal-fade">...</div>
 *
 * @param {object} opts
 * @param {string}  opts.threshold  – 0-1, default 0.12
 * @param {boolean} opts.once       – only trigger once (default true)
 */
export function useScrollReveal({ threshold = 0.12, once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.removeAttribute('data-visible');
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}
