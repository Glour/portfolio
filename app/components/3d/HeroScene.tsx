'use client';

import { useEffect, useRef } from 'react';

/**
 * Minimal ambient background — no Three.js, no rotating spheres.
 * Pure CSS radial glows + a cursor-following light that lazily tracks mouse.
 */
export default function HeroScene() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = window.innerWidth * 0.25;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.05);
      currentY = lerp(currentY, targetY, 0.05);
      el.style.left = `${currentX}px`;
      el.style.top  = `${currentY}px`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Cursor-following ambient orb */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.13) 0%, rgba(34,211,238,0.05) 45%, transparent 70%)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          willChange: 'left, top',
          top: '30%',
          left: '25%',
        }}
      />

      {/* Static ambient blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.03) 50%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '45vw',
          height: '45vw',
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
        }} />
      </div>
    </>
  );
}
