import { useRef, useEffect } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const state = { x: -100, y: -100, rx: -100, ry: -100, hover: false };
    let raf: number;

    function loop() {
      state.rx += (state.x - state.rx) * 0.18;
      state.ry += (state.y - state.ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.x - 4}px, ${state.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        const size = state.hover ? 56 : 28;
        ringRef.current.style.transform = `translate3d(${state.rx - size / 2}px, ${state.ry - size / 2}px, 0)`;
        ringRef.current.style.width = size + 'px';
        ringRef.current.style.height = size + 'px';
        ringRef.current.style.opacity = state.hover ? '1' : '0.6';
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onMove(e: PointerEvent) {
      state.x = e.clientX;
      state.y = e.clientY;
      const el = e.target as Element | null;
      state.hover = !!el?.closest('a, button, [data-cursor="hover"], input, textarea, [role="button"]');
    }

    window.addEventListener('pointermove', onMove);
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.style.cursor = '';
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--primary-500)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid var(--primary-500)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 200ms ease, height 200ms ease, opacity 200ms ease',
        }}
      />
    </>
  );
}
