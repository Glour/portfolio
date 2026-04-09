'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Category → color theme
const CATEGORY_THEMES: Record<string, { bg: string; accent: string; badge: string; label: string }> = {
  blockchain: {
    bg: 'from-violet-950/80 via-violet-900/60 to-violet-800/40',
    accent: '#a78bfa',
    badge: 'bg-violet-500/20 border-violet-400/30 text-violet-300',
    label: 'Blockchain',
  },
  ai: {
    bg: 'from-cyan-950/80 via-cyan-900/60 to-cyan-800/40',
    accent: '#22d3ee',
    badge: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300',
    label: 'AI',
  },
  trading: {
    bg: 'from-emerald-950/80 via-emerald-900/60 to-emerald-800/40',
    accent: '#34d399',
    badge: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
    label: 'Trading',
  },
  telegram: {
    bg: 'from-blue-950/80 via-blue-900/60 to-blue-800/40',
    accent: '#60a5fa',
    badge: 'bg-blue-500/20 border-blue-400/30 text-blue-300',
    label: 'Telegram',
  },
  fullstack: {
    bg: 'from-orange-950/80 via-orange-900/60 to-orange-800/40',
    accent: '#fb923c',
    badge: 'bg-orange-500/20 border-orange-400/30 text-orange-300',
    label: 'Full-stack',
  },
  automation: {
    bg: 'from-pink-950/80 via-pink-900/60 to-pink-800/40',
    accent: '#f472b6',
    badge: 'bg-pink-500/20 border-pink-400/30 text-pink-300',
    label: 'Automation',
  },
};

const DEFAULT_THEME = CATEGORY_THEMES.ai;

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: '0%',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.4, ease: 'easeIn' as const },
  }),
};

const AUTO_INTERVAL = 4500;

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = projects.length;

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
    setProgress(0);
  }, [total]);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-advance + progress bar
  useEffect(() => {
    if (paused) return;

    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + (100 / (AUTO_INTERVAL / 50));
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % total);
      setProgress(0);
    }, AUTO_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, total, current]);

  const project = projects[current];
  const theme = CATEGORY_THEMES[project.category] ?? DEFAULT_THEME;

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 420 }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute inset-0 bg-gradient-to-br ${theme.bg} backdrop-blur-md`}
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '256px 256px',
              }}
            />

            {/* Accent glow blob */}
            <div
              className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
              style={{ background: theme.accent }}
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-10 blur-3xl"
              style={{ background: theme.accent }}
            />

            {/* Card content */}
            <div className="relative flex h-full flex-col justify-between p-8 md:p-12" style={{ minHeight: 420 }}>
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${theme.badge}`}>
                    {theme.label}
                  </span>
                  {project.period && (
                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                      {project.period}
                    </span>
                  )}
                  {project.budget && (
                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                      {project.budget}
                    </span>
                  )}
                </div>

                {/* Counter */}
                <span className="font-mono text-[11px] tabular-nums text-white/30">
                  {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>

              {/* Main content */}
              <div className="mt-8 md:mt-0 md:max-w-[65%]">
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-white/40 uppercase">
                  {project.role}
                </p>
                <p className="mt-5 text-sm leading-[1.85] text-white/70 md:text-base">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {project.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                        <span
                          className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: theme.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom: tech tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.slice(0, 7).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/55 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 7 && (
                  <span className="px-2 py-1 font-mono text-[10px] text-white/25">
                    +{project.tech.length - 7}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 p-3 text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-black/50 hover:text-white"
          aria-label="Previous project"
        >
          <FaArrowLeft className="text-xs" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 p-3 text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-black/50 hover:text-white"
          aria-label="Next project"
        >
          <FaArrowRight className="text-xs" />
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/10">
          <motion.div
            className="h-full"
            style={{ background: theme.accent, width: `${paused ? progress : progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            className="group relative flex h-6 items-center px-1"
            aria-label={`Go to project ${i + 1}`}
          >
            <div
              className="h-px transition-all duration-300"
              style={{
                width: i === current ? 32 : 16,
                background: i === current ? theme.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Title strip below — project names as clickable tabs (like Stripe logos) */}
      <div className="mt-6 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {projects.map((p, i) => {
          const t = CATEGORY_THEMES[p.category] ?? DEFAULT_THEME;
          return (
            <button
              key={p.title}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="group relative flex-shrink-0 rounded-xl px-4 py-2.5 text-left transition-all duration-200"
            >
              {/* Active bg */}
              {i === current && (
                <motion.div
                  layoutId="carousel-tab-bg"
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              )}
              <div className="relative">
                <p
                  className="font-mono text-[9px] tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ color: i === current ? t.accent : 'rgba(255,255,255,0.2)' }}
                >
                  {t.label}
                </p>
                <p
                  className={`mt-0.5 max-w-[140px] truncate text-xs font-medium transition-all duration-200 ${
                    i === current ? 'text-white' : 'text-white/35'
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
