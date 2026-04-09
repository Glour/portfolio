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
  link?: string;
}

const THEMES: Record<string, { bg: string; accent: string; accentMuted: string; pill: string }> = {
  ai:         { bg: 'from-[#070e1a] via-[#0a1525] to-[#070e1a]', accent: '#22d3ee', accentMuted: 'rgba(34,211,238,0.35)',  pill: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400' },
  blockchain: { bg: 'from-[#0d0718] via-[#120a22] to-[#0d0718]', accent: '#a78bfa', accentMuted: 'rgba(167,139,250,0.35)', pill: 'bg-violet-500/10 border-violet-400/20 text-violet-400' },
  trading:    { bg: 'from-[#061209] via-[#091a0d] to-[#061209]', accent: '#34d399', accentMuted: 'rgba(52,211,153,0.35)',  pill: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400' },
  telegram:   { bg: 'from-[#060d18] via-[#090f22] to-[#060d18]', accent: '#60a5fa', accentMuted: 'rgba(96,165,250,0.35)',  pill: 'bg-blue-500/10 border-blue-400/20 text-blue-400' },
  fullstack:  { bg: 'from-[#180a06] via-[#220e09] to-[#180a06]', accent: '#fb923c', accentMuted: 'rgba(251,146,60,0.35)',  pill: 'bg-orange-500/10 border-orange-400/20 text-orange-400' },
  automation: { bg: 'from-[#18060d] via-[#220912] to-[#18060d]', accent: '#f472b6', accentMuted: 'rgba(244,114,182,0.35)', pill: 'bg-pink-500/10 border-pink-400/20 text-pink-400' },
};
const DEFAULT_THEME = THEMES.ai;
const AUTO_MS = 5500;

const textVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -16 : 16, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } }),
};

const leftVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 14 : -14 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.06 } },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -10 : 10, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } }),
};

export default function ProjectsCarousel({
  featured,
  all,
}: {
  featured: Project[];
  all: Project[];
}) {
  // All projects list: featured first, then rest
  const allOrdered = [
    ...featured,
    ...all.filter(p => !featured.find(f => f.title === p.title)),
  ];
  const total = allOrdered.length;

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressPx, setProgressPx] = useState(0); // 0..1

  // RAF refs — never reset on re-render
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const pauseTimeRef = useRef<number>(0); // when we paused
  const accumulatedRef = useRef<number>(0); // ms already elapsed before pause

  // Keep pausedRef in sync
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  const project = allOrdered[idx];
  const theme = THEMES[project?.category ?? 'ai'] ?? DEFAULT_THEME;

  const goTo = useCallback((next: number, d: number) => {
    setDir(d);
    setIdx((next + total) % total);
    // reset progress tracking
    accumulatedRef.current = 0;
    startTimeRef.current = performance.now();
    setProgressPx(0);
  }, [total]);

  const next = useCallback(() => goTo(idx + 1, 1),  [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  // Single persistent RAF loop — never restarts on pause
  useEffect(() => {
    startTimeRef.current = performance.now();
    accumulatedRef.current = 0;

    const tick = (now: number) => {
      if (pausedRef.current) {
        // Pause: remember when we stopped
        if (pauseTimeRef.current === 0) pauseTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Resume: shift start time forward by paused duration
      if (pauseTimeRef.current > 0) {
        const pausedDuration = now - pauseTimeRef.current;
        startTimeRef.current += pausedDuration;
        pauseTimeRef.current = 0;
      }

      const elapsed = now - startTimeRef.current + accumulatedRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgressPx(p);

      if (p >= 1) {
        // Advance slide
        accumulatedRef.current = 0;
        startTimeRef.current = now;
        setProgressPx(0);
        setDir(1);
        setIdx(c => (c + 1) % total);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]); // only total — intentionally stable

  // When idx changes externally (user click), reset accumulated
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

  // Wheel / trackpad swipe
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Only horizontal swipe (trackpad two-finger swipe left/right)
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

  // Tab strip ref for scroll-into-view (horizontal only, no page scroll)
  const tabStripRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const strip = tabStripRef.current;
    const tab = activeTabRef.current;
    if (!strip || !tab) return;
    // Only scroll the strip container horizontally, never the page
    const stripRect = strip.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const offset = tabRect.left - stripRect.left - stripRect.width / 2 + tabRect.width / 2;
    strip.scrollBy({ left: offset, behavior: 'smooth' });
  }, [idx]);

  if (!project) return null;

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
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.bg}`}
        style={{ minHeight: 420 }}
      >
        {/* Ambient glow blobs — subtle, not bright */}
        <div
          className="pointer-events-none absolute -top-32 right-8 h-80 w-80 rounded-full blur-[90px] transition-colors duration-1000"
          style={{ background: theme.accentMuted, opacity: 0.4 }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full blur-[70px] transition-colors duration-1000"
          style={{ background: theme.accentMuted, opacity: 0.2 }}
        />

        {/* Subtle noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        <div
          className="relative grid h-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]"
          style={{ minHeight: 420 }}
        >
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-between border-r border-white/[0.06] p-7 md:p-8">
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
                <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${theme.pill}`}>
                  {project.category}
                </span>

                {project.period && (
                  <div>
                    <p className="mb-1 font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">Period</p>
                    <p className="text-sm font-medium text-white/65">{project.period}</p>
                  </div>
                )}

                {project.budget && (
                  <div>
                    <p className="mb-1 font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">Budget</p>
                    <p className="text-sm font-medium text-white/65">{project.budget}</p>
                  </div>
                )}

                <div>
                  <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map(t => (
                      <span key={t} className="rounded-full border border-white/[0.08] bg-black/25 px-2.5 py-0.5 text-[11px] text-white/45">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 font-mono text-[11px] tabular-nums text-white/20">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>

          {/* ── CENTER ── */}
          <div className="relative flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`main-${idx}`}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase">
                  {project.role}
                </p>
                <h3 className="text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-[1.85rem]">
                  {project.title}
                </h3>
                <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-white/60">
                  {project.description}
                </p>

                {project.features && project.features.length > 0 && (
                  <ul className="mt-1 space-y-2">
                    {project.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/45">
                        <span
                          className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: theme.accent, opacity: 0.7 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Arrows + link */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80"
              >
                <FaArrowLeft className="text-[10px]" />
              </button>
              <button
                onClick={next}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80"
              >
                <FaArrowRight className="text-[10px]" />
              </button>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white/80"
                  style={{ borderColor: `${theme.accent}33` }}
                >
                  <span style={{ color: theme.accent }}>↗</span>
                  {project.link.replace('https://', '')}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar — muted, smooth */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]">
          <div
            className="h-full"
            style={{
              width: `${progressPx * 100}%`,
              background: `linear-gradient(to right, ${theme.accentMuted}, ${theme.accent}88)`,
              transition: 'none',
            }}
          />
        </div>
      </div>

      {/* ── ALL PROJECTS TAB STRIP ── */}
      <div
        ref={tabStripRef}
        className="mt-4 flex gap-1 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {allOrdered.map((p, i) => {
          const t = THEMES[p.category] ?? DEFAULT_THEME;
          const active = i === idx;
          return (
            <button
              key={p.title}
              ref={active ? activeTabRef : undefined}
              onClick={() => goTo(i, i > idx ? 1 : -1)}
              className="group relative flex-shrink-0 rounded-xl px-3.5 py-2.5 text-left transition-all duration-200"
            >
              {active && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.05]"
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                />
              )}
              <div className="relative">
                <p
                  className="font-mono text-[8px] tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{ color: active ? t.accent : 'rgba(255,255,255,0.18)' }}
                >
                  {p.category}
                </p>
                <p
                  className={`mt-0.5 max-w-[120px] truncate text-[11px] font-medium transition-colors duration-200 ${
                    active ? 'text-white/90' : 'text-white/28'
                  }`}
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
