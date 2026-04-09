'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
}

const THEMES: Record<string, { bg: string; accent: string; pill: string }> = {
  ai:         { bg: 'from-[#0a1628] via-[#0d1f3c] to-[#0a1628]', accent: '#22d3ee', pill: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  blockchain: { bg: 'from-[#130a28] via-[#1a0d3c] to-[#130a28]', accent: '#a78bfa', pill: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  trading:    { bg: 'from-[#0a1f0f] via-[#0d2a14] to-[#0a1f0f]', accent: '#34d399', pill: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' },
  telegram:   { bg: 'from-[#0a1428] via-[#0d1c3c] to-[#0a1428]', accent: '#60a5fa', pill: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  fullstack:  { bg: 'from-[#1f0f0a] via-[#2a140d] to-[#1f0f0a]', accent: '#fb923c', pill: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  automation: { bg: 'from-[#1f0a14] via-[#2a0d1c] to-[#1f0a14]', accent: '#f472b6', pill: 'bg-pink-500/15 border-pink-400/30 text-pink-300' },
};
const DEFAULT_THEME = THEMES.ai;

const AUTO_MS = 5000;

// Text slide variants — only content slides, container stays
const textVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 22 : -22 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.32, 0, 0.08, 1] as [number, number, number, number] } },
  exit:  (dir: number) => ({ opacity: 0, y: dir > 0 ? -18 : 18, transition: { duration: 0.38, ease: [0.32, 0, 0.08, 1] as [number, number, number, number] } }),
};

const leftVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 16 : -16 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0, 0.08, 1] as [number, number, number, number], delay: 0.07 } },
  exit:  (dir: number) => ({ opacity: 0, y: dir > 0 ? -12 : 12, transition: { duration: 0.32, ease: [0.32, 0, 0.08, 1] as [number, number, number, number] } }),
};

export default function ProjectsCarousel({
  featured,
  all,
}: {
  featured: Project[];
  all: Project[];
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number>(0);
  // Swipe/drag tracking
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);

  const total = featured.length;
  const project = featured[idx];
  const theme = THEMES[project.category] ?? DEFAULT_THEME;

  const goTo = useCallback((next: number, d: number) => {
    setDir(d);
    setIdx((next + total) % total);
    setProgress(0);
    startRef.current = Date.now();
  }, [total]);

  const next = useCallback(() => goTo(idx + 1, 1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  // RAF-based progress — buttery smooth
  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDir(1);
        setIdx(c => (c + 1) % total);
        setProgress(0);
        startRef.current = Date.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, total, idx]); // restart on idx change to reset timer

  // Touch/trackpad swipe handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null || dragStartY.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;
    dragStartX.current = null;
    dragStartY.current = null;
    // Only trigger if horizontal swipe is dominant and > 40px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
  }, [next, prev]);

  // Wheel (trackpad horizontal scroll)
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // vertical scroll — ignore
    e.preventDefault();
    wheelAccum.current += e.deltaX;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      if (Math.abs(wheelAccum.current) > 60) {
        if (wheelAccum.current > 0) next(); else prev();
      }
      wheelAccum.current = 0;
    }, 80);
  }, [next, prev]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* ── Main card ── */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.bg} transition-colors duration-700`}
           style={{ minHeight: 440 }}>

        {/* Accent glow — stays, just color transitions */}
        <div
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full blur-[100px] opacity-25 transition-colors duration-700"
          style={{ background: theme.accent }}
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full blur-[80px] opacity-10 transition-colors duration-700"
          style={{ background: theme.accent }}
        />

        {/* Noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

        <div className="relative grid h-full md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]" style={{ minHeight: 440 }}>

          {/* ── LEFT COLUMN — meta info ── */}
          <div className="flex flex-col justify-between border-r border-white/[0.07] p-7 md:p-8">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`left-${idx}`}
                custom={dir}
                variants={leftVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-5"
              >
                {/* Category pill */}
                <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${theme.pill}`}>
                  {project.category}
                </span>

                {/* Period */}
                {project.period && (
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mb-1">Period</p>
                    <p className="text-sm font-medium text-white/70">{project.period}</p>
                  </div>
                )}

                {/* Budget */}
                {project.budget && (
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mb-1">Budget</p>
                    <p className="text-sm font-medium text-white/70">{project.budget}</p>
                  </div>
                )}

                {/* Tech */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map(t => (
                      <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[11px] text-white/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <p className="mt-6 font-mono text-[11px] tabular-nums text-white/25">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>

          {/* ── CENTER — main content ── */}
          <div className="relative flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`main-${idx}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-5"
              >
                {/* Role */}
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
                  {project.role}
                </p>

                {/* Title */}
                <h3 className="text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-3xl lg:text-[2rem]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="max-w-2xl text-base leading-[1.8] text-white/65">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-2 mt-1">
                    {project.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/50">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full" style={{ background: theme.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div className="mt-8 flex items-center gap-3">
              <button onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:text-white">
                <FaArrowLeft className="text-xs" />
              </button>
              <button onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:text-white">
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar — RAF driven, perfectly smooth */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06]">
          <div
            className="h-full transition-none"
            style={{ width: `${progress * 100}%`, background: theme.accent }}
          />
        </div>
      </div>

      {/* ── TAB STRIP (featured only) ── */}
      <div className="mt-5 flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {featured.map((p, i) => {
          const t = THEMES[p.category] ?? DEFAULT_THEME;
          const active = i === idx;
          return (
            <button
              key={p.title}
              onClick={() => goTo(i, i > idx ? 1 : -1)}
              className="group relative flex-shrink-0 rounded-xl px-4 py-2.5 text-left transition-colors duration-200"
            >
              {active && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                />
              )}
              <div className="relative">
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase transition-colors duration-200"
                   style={{ color: active ? t.accent : 'rgba(255,255,255,0.2)' }}>
                  {p.category}
                </p>
                <p className={`mt-0.5 max-w-[130px] truncate text-xs font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-white/30'}`}>
                  {p.title.split(' — ')[0].split(' - ')[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── INFINITY MARQUEE — all projects ── */}
      <div className="mt-8">
        <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase">All projects</p>
        <InfinityMarquee projects={all} currentThemeAccent={theme.accent} />
      </div>
    </div>
  );
}

/* ── Infinity Marquee ──────────────────────────────────────── */
function InfinityMarquee({ projects, currentThemeAccent }: { projects: Project[]; currentThemeAccent: string }) {
  // Duplicate for seamless loop
  const items = [...projects, ...projects];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" />

      <div className="flex gap-3 animate-marquee" style={{ width: 'max-content' }}>
        {items.map((p, i) => {
          const t = THEMES[p.category] ?? THEMES.ai;
          return (
            <div
              key={`${p.title}-${i}`}
              className="flex-shrink-0 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 backdrop-blur-sm"
              style={{ minWidth: 160 }}
            >
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: t.accent }}>
                {p.category}
              </p>
              <p className="mt-0.5 max-w-[140px] truncate text-xs font-medium text-white/55">
                {p.title.split(' — ')[0].split(' - ')[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
