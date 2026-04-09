'use client';

import { Suspense, useMemo } from 'react';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTelegram,
} from 'react-icons/fa';
import { profile, techStack, keySkills } from '../data/profile';

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

const HeroScene = dynamic(() => import('../components/3d/HeroScene'), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: 'easeOut' },
} as const;

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRu = locale === 'ru';
  const basePath = `/${locale}`;

  const featuredProjects = useMemo(() => {
    const projectsData = t.raw('projectsList') as unknown;
    const allProjects = Array.isArray(projectsData) ? (projectsData as Project[]) : [];
    return allProjects.filter((project) => project.highlight).slice(0, 4);
  }, [t]);

  const achievements = useMemo(() => {
    const items = t.raw('achievements.items') as Record<string, string> | undefined;
    return items ? Object.values(items).slice(0, 6) : [];
  }, [t]);

  const skillGroups = [
    { title: t('techStack.languages'), items: techStack.languages },
    { title: t('techStack.backend'),   items: techStack.backend },
    { title: t('techStack.ai'),        items: techStack.ai },
    { title: t('techStack.telegram'),  items: techStack.telegram },
    { title: t('techStack.databases'), items: techStack.databases },
    { title: t('techStack.devops'),    items: techStack.devops },
  ];

  const heroStats = [
    { value: '30+',       label: t('stats.projects') },
    { value: '30+',       label: t('stats.telegramBots') },
    { value: '2+',        label: t('stats.team') },
    { value: 'Tech Lead', label: t('stats.techLead') },
  ];

  return (
    <div className="relative">
      {/* Ambient background — cursor glow + static blobs */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center px-6 py-20 md:py-32">
        <div className="container relative z-10 mx-auto max-w-5xl">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/8 bg-white/4 px-4 py-2 text-xs tracking-widest text-white/50 uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            {isRu ? 'Открыт к проектам' : 'Available for projects'}
          </motion.div>

          {/* Name label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="mt-10 font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase"
          >
            {profile.name}
          </motion.p>

          {/* Main headline — two lines, controlled size */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
            className="mt-5 font-sans font-semibold tracking-[-0.03em]"
          >
            {/* Line 1 — primary role, large */}
            <span className="block text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] text-white">
              {t('hero.titleLine1')}
            </span>
            {/* Line 2 — secondary roles, slightly smaller + cyan accent on last word */}
            <span className="mt-1 block text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.1] text-white/55">
              {isRu ? (
                <>Tech Lead{' '}<span className="text-primary-400">/ AI Engineer</span></>
              ) : (
                <>Tech Lead{' '}<span className="text-primary-400">/ AI Engineer</span></>
              )}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-base leading-[1.75] text-white/55"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={`${basePath}#projects`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary-400 px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            >
              {t('hero.viewProjects')}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`${basePath}#contact`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              {t('nav.contact')}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-20 flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-white/6 pt-8"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="h-px bg-white/6" />
        </div>
      </div>

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <SectionShell
        id="projects"
        eyebrow={isRu ? 'Избранные работы' : 'Featured work'}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-start">
          <Link
            href={`${basePath}/projects`}
            className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-primary-400"
          >
            {t('projects.allProjects')}
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionShell>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <SectionShell
        eyebrow={isRu ? 'Что я умею' : 'What I build'}
        title={isRu ? 'Глубина по ключевым направлениям' : 'Depth in the areas that matter'}
        subtitle={isRu ? 'Зоны, где могу брать ответственность.' : 'Areas where I own the outcome.'}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {keySkills.map((skillGroup, index) => (
            <motion.article
              key={skillGroup.category}
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/20 hover:bg-white/[0.07] hover:shadow-[0_4px_24px_rgba(34,211,238,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  {t(`skills.categories.${skillGroup.category}`)}
                </h3>
                <span className="font-mono text-[10px] tracking-widest text-white/35">
                  {String(skillGroup.skills.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="space-y-2.5">
                {skillGroup.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400/70" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      {/* ── TECH STACK ────────────────────────────────────── */}
      <SectionShell
        id="tech-stack"
        eyebrow={isRu ? 'Технический стек' : 'Technical stack'}
        title={t('techStack.title')}
        subtitle={t('techStack.subtitle')}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/20 hover:bg-white/[0.07] hover:shadow-[0_4px_24px_rgba(34,211,238,0.05)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                <span className="font-mono text-[10px] tracking-widest text-white/35">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-white/70 transition-colors duration-200 group-hover:border-primary-400/15 group-hover:text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* ── ACHIEVEMENTS ──────────────────────────────────── */}
      <SectionShell
        eyebrow={isRu ? 'Факты' : 'Proof'}
        title={t('achievements.title')}
        subtitle={isRu ? 'Коротко — что было доведено до результата.' : 'Short proof of shipped work.'}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary-400/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-start gap-3">
                <FaCheck className="mt-1 flex-shrink-0 text-xs text-primary-400" />
                <p className="text-sm leading-[1.75] text-white/75">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="px-6 pb-32 pt-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-sm md:p-14"
          >
            {/* Subtle cyan glow inside card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)' }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase">
                  {isRu ? 'Контакт' : 'Contact'}
                </p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  {t('contact.title')}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-[1.75] text-white/45">
                  {t('contact.subtitle')}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary-400 px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300"
                  >
                    <FaEnvelope className="text-xs" />
                    {t('contact.email')}
                  </a>
                  <a
                    href={profile.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white"
                  >
                    <FaTelegram className="text-xs" />
                    {t('contact.telegram')}
                  </a>
                </div>
              </div>

              <div className="grid gap-2.5">
                <ContactLink icon={<FaEnvelope />} label="Email"    value={profile.email}    href={`mailto:${profile.email}`} />
                <ContactLink icon={<FaTelegram />} label="Telegram" value={profile.telegram} href={profile.social.telegram} />
                <ContactLink icon={<FaGithub />}   label="GitHub"   value="Glour"             href={profile.social.github} />
                <ContactLink icon={<FaLinkedin />} label="LinkedIn" value="Profile"           href={profile.social.linkedin} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Section wrapper ──────────────────────────────────────── */
function SectionShell({
  eyebrow, title, subtitle, id, children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-20 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-[1.75] text-white/55">
            {subtitle}
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ── Project card ─────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects');
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/20 hover:bg-white/[0.07] hover:shadow-[0_8px_40px_rgba(34,211,238,0.06)]"
    >
      {/* Subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.05) 0%, transparent 60%)' }} />

      {/* Category + meta row */}
      <div className="relative mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1 font-mono text-[10px] tracking-wider text-primary-300 uppercase">
          {project.category}
        </span>
        {project.period && (
          <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
            {project.period}
          </span>
        )}
        {project.budget && (
          <span className="ml-auto font-mono text-[10px] tracking-wider text-white/50 uppercase">
            {project.budget}
          </span>
        )}
        {project.highlight && (
          <span className="ml-auto rounded-full border border-primary-400/30 bg-primary-400/10 px-2.5 py-0.5 font-mono text-[9px] tracking-widest text-primary-300 uppercase">
            Featured
          </span>
        )}
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-primary-300">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-white/50">{project.role}</p>

        <p className="mt-4 text-sm leading-[1.8] text-white/70">
          {project.description}
        </p>

        {project.features && project.features.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-white/65">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-primary-400" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-white/60 transition-colors duration-200 group-hover:border-primary-400/15 group-hover:text-white/75"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Contact link row ─────────────────────────────────────── */
function ContactLink({
  icon, label, value, href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm transition-all duration-250 hover:border-primary-400/25 hover:bg-white/[0.07] hover:shadow-[0_4px_20px_rgba(34,211,238,0.06)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-2.5 text-white/50 transition-all duration-200 group-hover:border-primary-400/20 group-hover:text-primary-400">
          {icon}
        </div>
        <div>
          <p className="text-[11px] text-white/40">{label}</p>
          <p className="text-sm font-medium text-white/80">{value}</p>
        </div>
      </div>
      <FaArrowRight className="text-xs text-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary-400" />
    </a>
  );
}
