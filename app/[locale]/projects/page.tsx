'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';

interface Project {
  title: string;
  role: string;
  description: string;
  features?: string[];
  tech: string[];
  category: 'trading' | 'ai' | 'telegram' | 'blockchain' | 'fullstack' | 'automation';
  budget?: string;
  period?: string;
  highlight?: boolean;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const;

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const tRoot = useTranslations();
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allProjects = useMemo(() => {
    const projectsData = tRoot.raw('projectsList') as unknown;
    return Array.isArray(projectsData) ? projectsData as Project[] : [];
  }, [tRoot]);

  const categories = [
    { id: 'all', name: t('categories.all') },
    { id: 'trading', name: t('categories.trading') },
    { id: 'ai', name: t('categories.ai') },
    { id: 'telegram', name: t('categories.telegram') },
    { id: 'blockchain', name: t('categories.blockchain') },
    { id: 'fullstack', name: t('categories.fullstack') },
    { id: 'automation', name: t('categories.automation') },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen px-6 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl">

        {/* Back link */}
        <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
          <Link
            href={`/${locale}#projects`}
            className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-primary-400"
          >
            <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t('backToHome')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
            {t('allProjectsTitle')}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            {t('allProjectsSubtitle')}
          </h1>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const count = cat.id === 'all' ? allProjects.length : allProjects.filter(p => p.category === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'border-primary-400/40 bg-primary-400/10 text-primary-300'
                    : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {cat.name}
                <span className={`font-mono text-[10px] ${active ? 'text-primary-400/70' : 'text-white/25'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 font-mono text-[11px] tracking-widest text-white/30 uppercase"
        >
          {t('foundProjects')}{' '}
          <span className="text-white/60">{filteredProjects.length}</span>
        </motion.p>

        {/* Grid */}
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-sm md:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.06) 0%, transparent 60%)' }}
          />
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-[1.75] text-white/55">
            {t('ctaDescription')}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-400 px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/20 hover:bg-white/[0.07] hover:shadow-[0_6px_30px_rgba(34,211,238,0.06)]"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative">
        {/* Meta row */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-0.5 font-mono text-[10px] tracking-wider text-primary-300 uppercase">
            {project.category}
          </span>
          {project.period && (
            <span className="font-mono text-[10px] tracking-wider text-white/35 uppercase">
              {project.period}
            </span>
          )}
          {project.highlight && (
            <span className="ml-auto rounded-full border border-primary-400/25 bg-primary-400/8 px-2.5 py-0.5 font-mono text-[9px] tracking-widest text-primary-300 uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-primary-300">
          {project.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-white/45">{project.role}</p>

        {project.budget && (
          <p className="mt-1 font-mono text-[10px] text-white/35">{project.budget}</p>
        )}

        {/* Description */}
        <p className="mt-3 text-sm leading-[1.75] text-white/65">
          {project.description}
        </p>

        {/* Features expandable */}
        {project.features && project.features.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors duration-200 hover:text-primary-400"
            >
              <span className="text-[10px]">{isExpanded ? '▼' : '▶'}</span>
              {isExpanded ? t('hideDetails') : t('showDetails')}
            </button>

            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-2"
              >
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <FaCheck className="mt-[5px] flex-shrink-0 text-[9px] text-primary-400/70" />
                    {feature}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/55 transition-colors duration-200 group-hover:border-primary-400/12 group-hover:text-white/70"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-2 py-0.5 font-mono text-[10px] text-white/25">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
