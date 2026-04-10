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

/* ── Screenshot panel (top-right inset) ───────────────────────── */
function ScreenshotGallery({
  screenshots,
  accent,
}: {
  screenshots: string[];
  accent: string;
  accentRgb: string;
}) {
  const [active, setActive] = useState(0);
  const total = screenshots.length;

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: '0 16px 0 16px' }}>
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={screenshots[active]}
          src={screenshots[active]}
          alt={`Screenshot ${active + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 0.88, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
        />
      </AnimatePresence>

      {/* Bottom-left dots — only if multiple */}
      {total > 1 && (
        <div className="absolute bottom-3 left-3 flex gap-1 z-10">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setActive(i); }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === active ? 14 : 4,
                height: 4,
                background: i === active ? accent : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle border */}
      <div className="pointer-events-none absolute inset-0" style={{ borderRadius: '0 16px 0 16px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }} />
    </div>
  );
}

/* ── Animation variants ────────────────────────────────────────── */
const contentVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20, filter: 'blur(3px)', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] } }),
};

const visualVariants = {
  enter: (dir: number) => ({ opacity: 0, scale: 0.96, x: dir > 0 ? 30 : -30 }),
  center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.05 } },
  exit:   (dir: number) => ({ opacity: 0, scale: 0.97, x: dir > 0 ? -20 : 20, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] } }),
};

/* ── Main carousel ─────────────────────────────────────────────── */
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

  const project  = allOrdered[idx];
  const theme    = THEMES[project?.category ?? 'ai'] ?? DEFAULT_THEME;
  const hasShots = Boolean(project?.screenshots?.length);

  const goTo = useCallback((next: number, d: number) => {
    setDir(d);
    setIdx((next + total) % total);
    accumulatedRef.current  = 0;
    startTimeRef.current    = performance.now();
    setProgressPx(0);
  }, [total]);

  const next = useCallback(() => goTo(idx + 1,  1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  // RAF loop
  useEffect(() => {
    startTimeRef.current  = performance.now();
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
      prevIdxRef.current      = idx;
      accumulatedRef.current  = 0;
      startTimeRef.current    = performance.now();
      pauseTimeRef.current    = 0;
      setProgressPx(0);
    }
  }, [idx]);

  // Wheel / trackpad
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 0.7) return;
    e.preventDefault();
    wheelAccum.current += e.deltaX;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      if (Math.abs(wheelAccum.current) > 50) wheelAccum.current > 0 ? next() : prev();
      wheelAccum.current = 0;
    }, 60);
  }, [next, prev]);

  // Pointer drag
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
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onWheel={handleWheel}
    >
      {/* ── MAIN CARD ── */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.bg}`}
        style={{ height: 540 }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-1000" style={{ background: theme.accentMuted, opacity: 0.5 }} />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full blur-[80px] transition-colors duration-1000" style={{ background: theme.accentMuted, opacity: 0.25 }} />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />

        {/* Screenshot — absolute, top-right quarter */}
        {hasShots && (
          <div className="pointer-events-none absolute right-0 top-0 hidden lg:block" style={{ width: '36%', height: '58%', zIndex: 2 }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`gallery-${idx}`}
                custom={dir}
                variants={visualVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="pointer-events-auto h-full w-full"
              >
                <ScreenshotGallery
                  screenshots={project.screenshots!}
                  accent={theme.accent}
                  accentRgb={theme.accentRgb}
                />
              </motion.div>
            </AnimatePresence>
            {/* Fades to blend with card */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)' }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />
          </div>
        )}

        {/* Layout: full-width text always */}
        <div className="relative h-full">

          {/* ── PROJECT INFO ── */}
          <div className={`flex h-full flex-col justify-between overflow-hidden p-8 md:p-10 lg:p-12 ${hasShots ? 'lg:pr-[42%]' : ''}`}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`content-${idx}`}
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4 overflow-hidden"
              >
                {/* Category + period */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${theme.pillBg} ${theme.pill}`}>
                    {project.category}
                  </span>
                  {project.period && (
                    <span className="font-mono text-[11px] text-white/40">{project.period}</span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <p className="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">{project.role}</p>
                  <h3 className={`font-semibold leading-[1.2] tracking-[-0.02em] text-white ${hasShots ? 'text-2xl md:text-[1.8rem]' : 'text-2xl md:text-[2rem] lg:text-[2.2rem]'}`}>
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className={`leading-[1.85] text-white/70 ${hasShots ? 'max-w-xl text-[0.9rem]' : 'max-w-2xl text-[0.95rem]'}`}>
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-2">
                    {project.features.slice(0, hasShots ? 3 : 5).map(f => (
                      <li key={f} className="flex items-start gap-3 text-[0.875rem] leading-[1.7] text-white/58">
                        <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full" style={{ background: theme.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.slice(0, hasShots ? 7 : 12).map(t => (
                    <span key={t} className="rounded-full border border-white/[0.10] bg-black/30 px-3 py-1 text-[11px] font-medium text-white/58">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-3">
              <button onClick={prev} aria-label="Prev" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all hover:border-white/25 hover:text-white">
                <FaArrowLeft className="text-[11px]" />
              </button>
              <button onClick={next} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all hover:border-white/25 hover:text-white">
                <FaArrowRight className="text-[11px]" />
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
              className="group relative flex-shrink-0 rounded-xl px-4 py-3 text-left transition-all duration-200"
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
