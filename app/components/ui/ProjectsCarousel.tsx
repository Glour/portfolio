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
  screenshots?: string[]; // optional array of image paths
}

// Category colors
const THEMES: Record<string, {
  bg: string;
  accent: string;
  accentRgb: string;
  accentMuted: string;
  pill: string;
  pillBg: string;
  gradientFrom: string;
}> = {
  ai:         { bg: 'from-[#050d1a] via-[#081525] to-[#050d1a]', accent: '#38bdf8', accentRgb: '56,189,248',  accentMuted: 'rgba(56,189,248,0.18)',  pill: 'text-sky-300',    pillBg: 'bg-sky-500/10 border-sky-400/25',    gradientFrom: '#38bdf820' },
  blockchain: { bg: 'from-[#0c0618] via-[#110820] to-[#0c0618]', accent: '#c084fc', accentRgb: '192,132,252', accentMuted: 'rgba(192,132,252,0.18)', pill: 'text-purple-300', pillBg: 'bg-purple-500/10 border-purple-400/25', gradientFrom: '#c084fc20' },
  trading:    { bg: 'from-[#041208] via-[#071a0c] to-[#041208]', accent: '#4ade80', accentRgb: '74,222,128',  accentMuted: 'rgba(74,222,128,0.18)',  pill: 'text-green-300',  pillBg: 'bg-green-500/10 border-green-400/25',  gradientFrom: '#4ade8020' },
  telegram:   { bg: 'from-[#050c18] via-[#070e22] to-[#050c18]', accent: '#60a5fa', accentRgb: '96,165,250',  accentMuted: 'rgba(96,165,250,0.18)',  pill: 'text-blue-300',   pillBg: 'bg-blue-500/10 border-blue-400/25',   gradientFrom: '#60a5fa20' },
  fullstack:  { bg: 'from-[#150805] via-[#1e0c07] to-[#150805]', accent: '#fb923c', accentRgb: '251,146,60',  accentMuted: 'rgba(251,146,60,0.18)',  pill: 'text-orange-300', pillBg: 'bg-orange-500/10 border-orange-400/25', gradientFrom: '#fb923c20' },
  automation: { bg: 'from-[#15050c] via-[#1e0710] to-[#15050c]', accent: '#f472b6', accentRgb: '244,114,182', accentMuted: 'rgba(244,114,182,0.18)', pill: 'text-pink-300',   pillBg: 'bg-pink-500/10 border-pink-400/25',   gradientFrom: '#f472b620' },
};
const DEFAULT_THEME = THEMES.ai;
const AUTO_MS = 6000;

// Mock screen placeholder for projects without screenshots
function MockScreen({ category, tech, accent, accentRgb }: { category: string; tech: string[]; accent: string; accentRgb: string }) {
  const lines = [
    { w: '65%', indent: 0 },
    { w: '80%', indent: 16 },
    { w: '55%', indent: 16 },
    { w: '70%', indent: 32 },
    { w: '45%', indent: 32 },
    { w: '80%', indent: 16 },
    { w: '60%', indent: 0 },
    { w: '75%', indent: 16 },
    { w: '50%', indent: 32 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl" style={{ background: '#0a0f1a' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[10px] text-white/20">{category}.service</span>
      </div>

      {/* Code-like content */}
      <div className="p-4 space-y-2">
        {/* Accent import line */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px]" style={{ color: `rgba(${accentRgb}, 0.7)` }}>import</span>
          <span className="h-2 w-24 rounded-sm bg-white/10" />
          <span className="font-mono text-[11px] text-white/30">from</span>
          <span className="h-2 w-16 rounded-sm" style={{ background: `rgba(${accentRgb}, 0.15)` }} />
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 py-2">
          {tech.slice(0, 4).map(t => (
            <span key={t} className="rounded px-2 py-0.5 font-mono text-[9px]" style={{ background: `rgba(${accentRgb}, 0.12)`, color: `rgba(${accentRgb}, 0.8)` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Fake code lines */}
        {lines.map((line, i) => (
          <div key={i} className="flex items-center" style={{ paddingLeft: line.indent }}>
            <div
              className="h-[7px] rounded-sm animate-pulse"
              style={{
                width: line.w,
                background: i % 3 === 0
                  ? `rgba(${accentRgb}, 0.18)`
                  : 'rgba(255,255,255,0.06)',
                animationDelay: `${i * 0.15}s`,
                animationDuration: '2.5s',
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/[0.05] px-4 py-2"
        style={{ background: `rgba(${accentRgb}, 0.05)` }}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[9px] text-white/30">running</span>
        </div>
        <span className="font-mono text-[9px] text-white/20">{category}</span>
      </div>

      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ boxShadow: `inset 0 0 60px rgba(${accentRgb}, 0.06)` }}
      />
    </div>
  );
}

const contentVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 24 : -24,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -20 : 20,
    filter: 'blur(3px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  }),
};

const visualVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 0.96,
    x: dir > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.05 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.97,
    x: dir > 0 ? -20 : 20,
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  }),
};

export default function ProjectsCarousel({
  featured,
  all,
}: {
  featured: Project[];
  all: Project[];
}) {
  const allOrdered = [
    ...featured,
    ...all.filter(p => !featured.find(f => f.title === p.title)),
  ];
  const total = allOrdered.length;

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressPx, setProgressPx] = useState(0);
  const [ssIdx, setSsIdx] = useState(0); // screenshot index within project

  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const pauseTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  const project = allOrdered[idx];
  const theme = THEMES[project?.category ?? 'ai'] ?? DEFAULT_THEME;

  const goTo = useCallback((next: number, d: number) => {
    setDir(d);
    setIdx((next + total) % total);
    setSsIdx(0);
    accumulatedRef.current = 0;
    startTimeRef.current = performance.now();
    setProgressPx(0);
  }, [total]);

  const next = useCallback(() => goTo(idx + 1, 1),  [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  // Single persistent RAF loop
  useEffect(() => {
    startTimeRef.current = performance.now();
    accumulatedRef.current = 0;

    const tick = (now: number) => {
      if (pausedRef.current) {
        if (pauseTimeRef.current === 0) pauseTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (pauseTimeRef.current > 0) {
        const pausedDuration = now - pauseTimeRef.current;
        startTimeRef.current += pausedDuration;
        pauseTimeRef.current = 0;
      }
      const elapsed = now - startTimeRef.current + accumulatedRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgressPx(p);
      if (p >= 1) {
        accumulatedRef.current = 0;
        startTimeRef.current = now;
        setProgressPx(0);
        setDir(1);
        setIdx(c => (c + 1) % total);
        setSsIdx(0);
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
      prevIdxRef.current = idx;
      accumulatedRef.current = 0;
      startTimeRef.current = performance.now();
      pauseTimeRef.current = 0;
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
      if (Math.abs(wheelAccum.current) > 50) {
        if (wheelAccum.current > 0) next(); else prev();
      }
      wheelAccum.current = 0;
    }, 60);
  }, [next, prev]);

  // Touch / pointer drag
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - (dragStartY.current ?? e.clientY);
    dragStartX.current = null;
    dragStartY.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
  };

  // Tab strip scroll
  const tabStripRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const strip = tabStripRef.current;
    const tab = activeTabRef.current;
    if (!strip || !tab) return;
    const stripRect = strip.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const offset = tabRect.left - stripRect.left - stripRect.width / 2 + tabRect.width / 2;
    strip.scrollBy({ left: offset, behavior: 'smooth' });
  }, [idx]);

  if (!project) return null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const screenshots = project.screenshots ?? [];

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* ── MAIN CARD ── */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.bg}`}
        style={{ minHeight: 520 }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-1000"
          style={{ background: theme.accentMuted, opacity: 0.5 }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full blur-[80px] transition-colors duration-1000"
          style={{ background: theme.accentMuted, opacity: 0.25 }}
        />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative grid h-full lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]" style={{ minHeight: 520 }}>

          {/* ── LEFT: PROJECT INFO ── */}
          <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`content-${idx}`}
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-5"
              >
                {/* Category + period row */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${theme.pillBg} ${theme.pill}`}>
                    {project.category}
                  </span>
                  {project.period && (
                    <span className="font-mono text-[11px] text-white/35">{project.period}</span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
                    {project.role}
                  </p>
                  <h3 className="text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-[1.9rem] lg:text-[2.1rem]">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="max-w-xl text-[0.95rem] leading-[1.9] text-white/70">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-2.5">
                    {project.features.slice(0, 4).map(f => (
                      <li key={f} className="flex items-start gap-3 text-[0.875rem] text-white/55 leading-[1.7]">
                        <span
                          className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: theme.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 8).map(t => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.10] bg-black/30 px-3 py-1 text-[11px] font-medium text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom controls */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
              >
                <FaArrowLeft className="text-[11px]" />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/50 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
              >
                <FaArrowRight className="text-[11px]" />
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    borderColor: `rgba(${theme.accentRgb}, 0.4)`,
                    background: `rgba(${theme.accentRgb}, 0.1)`,
                    color: theme.accent,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <FaExternalLinkAlt className="text-[9px]" />
                  {project.link.replace(/^https?:\/\//, '')}
                </a>
              )}

              {/* Counter */}
              <span className="ml-auto font-mono text-[11px] tabular-nums text-white/25">
                {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ── RIGHT: VISUAL PANEL ── */}
          <div className="hidden lg:flex flex-col gap-3 border-l border-white/[0.06] p-6">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`visual-${idx}`}
                custom={dir}
                variants={visualVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-3 h-full"
              >
                {/* Main screenshot / mock screen */}
                <div className="relative flex-1 overflow-hidden rounded-xl" style={{ minHeight: 280 }}>
                  {hasScreenshots ? (
                    <>
                      <img
                        src={screenshots[ssIdx]}
                        alt={`${project.title} screenshot ${ssIdx + 1}`}
                        className="h-full w-full object-cover object-top"
                      />
                      {/* Screenshot navigation dots */}
                      {screenshots.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {screenshots.map((_, si) => (
                            <button
                              key={si}
                              onClick={e => { e.stopPropagation(); setSsIdx(si); }}
                              className="h-1.5 rounded-full transition-all duration-200"
                              style={{
                                width: si === ssIdx ? 20 : 6,
                                background: si === ssIdx ? theme.accent : 'rgba(255,255,255,0.3)',
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <MockScreen
                      category={project.category}
                      tech={project.tech}
                      accent={theme.accent}
                      accentRgb={theme.accentRgb}
                    />
                  )}

                  {/* Subtle inner shadow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.07)` }}
                  />
                </div>

                {/* Budget / extra meta */}
                {project.budget && (
                  <div
                    className="rounded-xl border border-white/[0.07] px-4 py-3"
                    style={{ background: `rgba(${theme.accentRgb}, 0.06)` }}
                  >
                    <p className="mb-0.5 font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Budget</p>
                    <p className="text-sm font-semibold" style={{ color: theme.accent }}>{project.budget}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="h-full"
            style={{
              width: `${progressPx * 100}%`,
              background: `linear-gradient(to right, rgba(${theme.accentRgb},0.4), ${theme.accent})`,
              transition: 'none',
            }}
          />
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
                <p
                  className="font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200"
                  style={{ color: active ? th.accent : 'rgba(255,255,255,0.28)' }}
                >
                  {p.category}
                </p>
                <p
                  className="mt-0.5 max-w-[160px] truncate text-[13px] font-medium transition-colors duration-200"
                  style={{ color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.42)' }}
                >
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
