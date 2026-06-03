'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FaArrowLeft, FaArrowRight, FaCheck, FaImages } from 'react-icons/fa';

interface Project {
  slug: string;
  title: string;
  role: string;
  description: string;
  features?: string[];
  tech: string[];
  category: 'trading' | 'ai' | 'telegram' | 'blockchain' | 'fullstack' | 'automation';
  budget?: string;
  period?: string;
  highlight?: boolean;
  link?: string;
  screenshots?: string[];
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
    return Array.isArray(projectsData) ? (projectsData as Project[]) : [];
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
    : allProjects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen px-6 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
          <Link
            href={`/${locale}#projects`}
            className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-primary-400"
          >
            <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t('backToHome')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
            {t('allProjectsTitle')}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            {t('allProjectsSubtitle')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const count = cat.id === 'all' ? allProjects.length : allProjects.filter((project) => project.category === cat.id).length;
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 font-mono text-[11px] tracking-widest text-white/30 uppercase"
        >
          {t('foundProjects')}{' '}
          <span className="text-white/60">{filteredProjects.length}</span>
        </motion.p>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} locale={locale} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-sm md:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.06) 0%, transparent 60%)' }}
          />
          <h2 className="relative text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t('ctaTitle')}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-[1.75] text-white/55">
            {t('ctaDescription')}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-primary-400 px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: string }) {
  const t = useTranslations('projects');
  const cover = project.screenshots?.[0];
  const screenshotsCount = project.screenshots?.length ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.035, ease: 'easeOut' }}
      className="group h-full"
    >
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/25 hover:bg-white/[0.07] hover:shadow-[0_10px_44px_rgba(34,211,238,0.08)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.055) 0%, transparent 58%)' }}
        />

        <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/35">
          {cover ? (
            <div className="aspect-[16/10]">
              <img
                src={cover}
                alt={project.title}
                className="h-full w-full object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
                draggable={false}
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.13),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
                Backend case
              </div>
            </div>
          )}
          {screenshotsCount > 0 && (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[10px] text-white/60 backdrop-blur-md">
              <FaImages className="text-[9px]" />
              {screenshotsCount}
            </span>
          )}
        </div>

        <div className="relative mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-0.5 font-mono text-[10px] tracking-wider text-primary-300 uppercase">
            {t(`categories.${project.category}`)}
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

        <div className="relative flex flex-1 flex-col">
          <h3 className="text-base font-semibold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-primary-300">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-white/45">{project.role}</p>

          <p className="mt-3 line-clamp-4 text-sm leading-[1.75] text-white/62">
            {project.description}
          </p>

          {project.features && project.features.length > 0 && (
            <ul className="mt-4 space-y-2">
              {project.features.slice(0, 2).map((feature, i) => (
                <li key={`${feature}-${i}`} className="flex items-start gap-2.5 text-xs leading-[1.65] text-white/52">
                  <FaCheck className="mt-[5px] flex-shrink-0 text-[9px] text-primary-400/70" />
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/55 transition-colors duration-200 group-hover:border-primary-400/12 group-hover:text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-primary-300">
            {t('openProject')}
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
