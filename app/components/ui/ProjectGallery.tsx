'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExpand, FaTimes } from 'react-icons/fa';

interface GalleryLabels {
  previousShot: string;
  nextShot: string;
  closeGallery: string;
  openFullSize: string;
}

interface ProjectGalleryProps {
  screenshots: string[];
  title: string;
  labels: GalleryLabels;
}

export default function ProjectGallery({ screenshots, title, labels }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = screenshots.length;
  const current = screenshots[active];

  const goTo = (next: number, nextDirection: number) => {
    if (total <= 1) return;
    setDirection(nextDirection);
    setActive((next + total) % total);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') goTo(active - 1, -1);
      if (event.key === 'ArrowRight') goTo(active + 1, 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, lightboxOpen]);

  if (!current) return null;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/45 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-400/10 blur-[90px]" />
        <div className="relative aspect-video bg-black/40">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={current}
              src={current}
              alt={`${title} screenshot ${active + 1}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 36 : -36, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -28 : 28, scale: 0.99 }}
              transition={{ duration: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full w-full object-contain object-top"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 p-1.5 backdrop-blur-md">
            <button
              type="button"
              aria-label={labels.previousShot}
              onClick={() => goTo(active - 1, -1)}
              disabled={total <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label={labels.nextShot}
              onClick={() => goTo(active + 1, 1)}
              disabled={total <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="rounded-full border border-white/10 bg-black/55 px-3 py-2 font-mono text-[11px] tabular-nums text-white/55 backdrop-blur-md">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 text-xs font-medium text-white/70 backdrop-blur-md transition hover:border-primary-400/35 hover:text-white"
          >
            <FaExpand className="text-[10px]" />
            {labels.openFullSize}
          </button>
        </div>
      </div>

      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          {screenshots.map((shot, index) => {
            const selected = index === active;
            return (
              <button
                key={shot}
                type="button"
                onClick={() => {
                  setDirection(index > active ? 1 : -1);
                  setActive(index);
                }}
                className={`relative h-20 w-36 flex-shrink-0 overflow-hidden rounded-xl border bg-black/50 transition ${
                  selected
                    ? 'border-primary-400/55 shadow-[0_0_28px_rgba(34,211,238,0.16)]'
                    : 'border-white/10 opacity-55 hover:opacity-90'
                }`}
              >
                <img
                  src={shot}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label={labels.closeGallery}
              onClick={() => setLightboxOpen(false)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/70 transition hover:text-white"
            >
              <FaTimes className="text-sm" />
            </button>
            <motion.img
              src={current}
              alt={`${title} screenshot ${active + 1}`}
              className="max-h-[92vh] max-w-[96vw] rounded-2xl border border-white/10 object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
