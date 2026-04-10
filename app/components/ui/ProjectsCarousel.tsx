'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  role: string;
  description: string;
  features?: string[];
  tech: string[];
  category: string;
  budget?: string;
  period?: string;
  highlight?: boolean;
  link?: string;
  screenshots?: string[];
}

const THEMES: Record<string, {
  bg: string; accent: string; accentRgb: string; accentMuted: string; pill: string; pillBg: string;
}> = {
  ai:         { bg: 'from-[#050d1a] via-[#081525] to-[#050d1a]', accent: '#38bdf8', accentRgb: '56,189,248',   accentMuted: 'rgba(56,189,248,0.18)',   pill: 'text-sky-300',    pillBg: 'bg-sky-500/10 border-sky-400/25' },
  blockchain: { bg: 'from-[#0c0618] via-[#110820] to-[#0c0618]', accent: '#c084fc', accentRgb: '192,132,252',  accentMuted: 'rgba(192,132,252,0.18)',  pill: 'text-purple-300', pillBg: 'bg-purple-500/10 border-purple-400/25' },
  trading:    { bg: 'from-[#041208] via-[#071a0c] to-[#041208]', accent: '#4ade80', accentRgb: '74,222,128',   accentMuted: 'rgba(74,222,128,0.18)',   pill: 'text-green-300',  pillBg: 'bg-green-500/10 border-green-400/25' },
  telegram:   { bg: 'from-[#050c18] via-[#070e22] to-[#050c18]', accent: '#60a5fa', accentRgb: '96,165,250',   accentMuted: 'rgba(96,165,250,0.18)',   pill: 'text-blue-300',   pillBg: 'bg-blue-500/10 border-blue-400/25' },
  fullstack:  { bg: 'from-[#150805] via-[#1e0c07] to-[#150805]', accent: '#fb923c', accentRgb: '251,146,60',   accentMuted: 'rgba(251,146,60,0.18)',   pill: 'text-orange-300', pillBg: 'bg-orange-500/10 border-orange-400/25' },
  automation: { bg: 'from-[#15050c] via-[#1e0710] to-[#15050c]', accent: '#f472b6', accentRgb: '244,114,182',  accentMuted: 'rgba(244,114,182,0.18)',  pill: 'text-pink-300',   pillBg: 'bg-pink-500/10 border-pink-400/25' },
};
const DEFAULT_THEME = THEMES.ai;
const AUTO_MS = 6000;

const contentVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20, filter: 'blur(3px)', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] } }),
};

const shotsVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 30 : -30, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.06 } },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] } }),
};

export default function ProjectsCarousel({ featured, all }: { featured: Project[]; all: Project[] }) {
  const allOrdered = [
    ...featured,
    ...all.filter(p => !featured.find(f => f.title === p.title)),
  ];
  const total = allOrdered.length;

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressPx, setProgressPx] = useState(0);

  const rafRef        = useRef<number>(0);
  const startTimeRef  = useRef<number>(0);
  const pausedRef     = useRef(false);
  const pauseTimeRef  = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  const project = allOrdered[idx];
  const theme   = THEMES[project?.category ?? 'ai'] ?? DEFAULT_THEME;
  const shots   = project?.screenshots ?? [];
  const hasShots = shots.length > 0;

  const goTo = useCallback((next: number, d: number) => {
    setDir(d);
    setIdx((next + total) % total);
    accumulatedRef.current = 0;
    startTimeRef.current   = performance.now();
    setProgressPx(0);
  }, [total]);

  const next = useCallback(() => goTo(idx + 1,  1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  // RAF loop
  useEffect(() => {
    startTimeRef.current   = performance.now();
    accumulatedRef.current = 0;
    const tick = (now: number) => {
      if (pausedRef.current) {
        if (pauseTimeRef.current === 0) pauseTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (pauseTimeRef.current > 0) {
        startTimeRef.current += now - pauseTimeRef.current;
        pauseTimeRef.current = 0;
      }
      const elapsed = now - startTimeRef.current + accumulatedRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgressPx(p);
      if (p >= 1) {
        accumulatedRef.current = 0;
        startTimeRef.current   = now;
        setProgressPx(0);
        setDir(1);
        setIdx(c => (c + 1) % total);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const prevIdxRef = useRef(idx);
  useEffect(() => {
    if (prevIdxRef.current !== idx) {
      prevIdxRef.current     = idx;
      accumulatedRef.current = 0;
      startTimeRef.current   = performance.now();
      pauseTimeRef.current   = 0;
      setProgressPx(0);
    }
  }, [idx]);

  // Wheel — must use native addEventListener with passive:false to call preventDefault
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 0.7) return;
      e.preventDefault();
      wheelAccum.current += e.deltaX;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        if (Math.abs(wheelAccum.current) > 50) wheelAccum.current > 0 ? next() : prev();
        wheelAccum.current = 0;
      }, 60);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [next, prev]);

  // Drag
  const dragX = useRef<number | null>(null);
  const dragY = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX; dragY.current = e.clientY; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    const dy = e.clientY - (dragY.current ?? e.clientY);
    dragX.current = dragY.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  // Tab strip scroll
  const tabStripRef  = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const strip = tabStripRef.current;
    const tab   = activeTabRef.current;
    if (!strip || !tab) return;
    const sr = strip.getBoundingClientRect();
    const tr = tab.getBoundingClientRect();
    strip.scrollBy({ left: tr.left - sr.left - sr.width / 2 + tr.width / 2, behavior: 'smooth' });
  }, [idx]);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* ── MAIN CARD ── */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.bg} h-auto min-h-[460px] md:h-[520px]`}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-1000" style={{ background: theme.accentMuted, opacity: 0.5 }} />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full blur-[80px] transition-colors duration-1000" style={{ background: theme.accentMuted, opacity: 0.25 }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Grid layout: left text + right screenshots (only when exist) */}
        <div className={`relative h-full ${hasShots ? 'grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]' : 'flex'}`}>

          {/* ── LEFT: INFO ── */}
          <div className="flex h-full flex-col overflow-hidden p-5 sm:p-8 lg:p-10">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`content-${idx}`}
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-3"
              >
                {/* Badge row */}
                <div className="flex flex-shrink-0 items-center gap-3">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${theme.pillBg} ${theme.pill}`}>
                    {project.category}
                  </span>
                  {project.period && (
                    <span className="font-mono text-[11px] text-white/40">{project.period}</span>
                  )}
                </div>

                {/* Title */}
                <div className="flex-shrink-0">
                  <p className="mb-1 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">{project.role}</p>
                  <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-2xl">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="flex-shrink-0 text-[0.85rem] leading-[1.75] text-white/65 max-w-lg">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="flex-shrink-0 space-y-1">
                    {project.features.slice(0, hasShots ? 3 : 4).map(f => (
                      <li key={f} className="flex items-start gap-3 text-[0.82rem] leading-[1.6] text-white/55">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full" style={{ background: theme.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Spacer — pushes tech to bottom of content area */}
                <div className="flex-1" />

                {/* Tech */}
                <div className="flex-shrink-0 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, hasShots ? 6 : 8).map(t => (
                    <span key={t} className="rounded-full border border-white/[0.10] bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > (hasShots ? 6 : 8) && (
                    <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-0.5 text-[11px] text-white/35">
                      +{project.tech.length - (hasShots ? 6 : 8)}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls — always at bottom */}
            <div className="mt-4 flex flex-shrink-0 items-center gap-3">
              <button onClick={prev} aria-label="Prev" className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all hover:border-white/25 hover:text-white">
                <FaArrowLeft className="text-[11px]" />
              </button>
              <button onClick={next} aria-label="Next" className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all hover:border-white/25 hover:text-white">
                <FaArrowRight className="text-[11px]" />
              </button>
              {project.link && (
                <a
                  href={project.link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="ml-1 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-all hover:opacity-90"
                  style={{ borderColor: `rgba(${theme.accentRgb},0.4)`, background: `rgba(${theme.accentRgb},0.1)`, color: theme.accent }}
                >
                  <FaExternalLinkAlt className="text-[9px]" />
                  {project.link.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span className="ml-auto font-mono text-[11px] tabular-nums text-white/25">
                {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ── RIGHT: TWO SCREENSHOTS STACKED ── */}
          {hasShots && (
            <div className="hidden lg:flex h-full border-l border-white/[0.06] p-4 flex-col gap-3">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={`shots-${idx}`}
                  custom={dir}
                  variants={shotsVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-3 h-full"
                >
                  {/* Screenshot 1 */}
                  <div className="relative flex-1 overflow-hidden rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                    <img
                      src={shots[0]}
                      alt="Screenshot 1"
                      className="absolute inset-0 w-full h-full object-contain object-top"
                      style={{ opacity: 0.92 }}
                      draggable={false}
                    />
                  </div>

                  {/* Screenshot 2 — only if exists */}
                  {shots[1] && (
                    <div className="relative flex-1 overflow-hidden rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                      <img
                        src={shots[1]}
                        alt="Screenshot 2"
                        className="absolute inset-0 w-full h-full object-contain object-top"
                        style={{ opacity: 0.92 }}
                        draggable={false}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full" style={{ width: `${progressPx * 100}%`, background: `linear-gradient(to right,rgba(${theme.accentRgb},0.4),${theme.accent})`, transition: 'none' }} />
        </div>
      </div>

      {/* ── TAB STRIP ── */}
      <div
        ref={tabStripRef}
        className="mt-3 flex gap-1 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {allOrdered.map((p, i) => {
          const th = THEMES[p.category] ?? DEFAULT_THEME;
          const active = i === idx;
          return (
            <button
              key={p.title}
              ref={active ? activeTabRef : undefined}
              onClick={() => goTo(i, i > idx ? 1 : -1)}
              className="group relative flex-shrink-0 rounded-xl px-4 py-3 min-h-[44px] text-left transition-all duration-200"
            >
              {active && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl border border-white/[0.12] bg-white/[0.08]"
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
              )}
              <div className="relative">
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200" style={{ color: active ? th.accent : 'rgba(255,255,255,0.28)' }}>
                  {p.category}
                </p>
                <p className="mt-0.5 max-w-[160px] truncate text-[13px] font-medium transition-colors duration-200" style={{ color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.42)' }}>
                  {p.title.split(' — ')[0].split(' - ')[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
