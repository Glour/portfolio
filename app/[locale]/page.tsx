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
  loading: () => <div className="h-full w-full bg-slate-950" />,
});

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

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
    {
      title: t('techStack.languages'),
      items: techStack.languages,
      accent: 'from-primary-500/25 to-primary-500/5',
    },
    {
      title: t('techStack.backend'),
      items: techStack.backend,
      accent: 'from-accent-500/25 to-accent-500/5',
    },
    {
      title: t('techStack.ai'),
      items: techStack.ai,
      accent: 'from-fuchsia-500/20 to-transparent',
    },
    {
      title: t('techStack.telegram'),
      items: techStack.telegram,
      accent: 'from-cyan-500/20 to-transparent',
    },
    {
      title: t('techStack.databases'),
      items: techStack.databases,
      accent: 'from-emerald-500/20 to-transparent',
    },
    {
      title: t('techStack.devops'),
      items: techStack.devops,
      accent: 'from-amber-500/20 to-transparent',
    },
  ];

  const heroStats = [
    { value: '30+', label: t('stats.projects') },
    { value: '30+', label: t('stats.telegramBots') },
    { value: '2+', label: t('stats.team') },
    { value: 'Tech Lead', label: t('stats.techLead') },
  ];

  const focusPills = isRu
    ? ['FastAPI', 'AI workflows', 'Telegram products', 'Real-time systems', 'Payments', 'Infra']
    : ['FastAPI', 'AI workflows', 'Telegram products', 'Real-time systems', 'Payments', 'Infra'];

  const trustPills = isRu
    ? ['Backend', 'AI integration', 'Telegram ecosystem', 'Trading systems', 'DevOps']
    : ['Backend', 'AI integration', 'Telegram ecosystem', 'Trading systems', 'DevOps'];

  return (
    <div className="relative overflow-hidden">
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center px-6 py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="h-full w-full bg-slate-950" />}>
            <HeroScene />
          </Suspense>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_32%),linear-gradient(to_bottom,rgba(2,6,23,0.12),rgba(2,6,23,0.72)_55%,rgba(2,6,23,1))]" />

        <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div {...sectionFade}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
              {isRu ? 'Открыт к точечным проектам' : 'Available for selective projects'}
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold tracking-tight text-white md:text-7xl">
              <span className="block">
                {t('hero.greeting')} <span className="gradient-text">{profile.name}</span>
              </span>
              <span className="mt-4 block leading-[1.02]">
                {t('hero.title')}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              {t('hero.subtitle')}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              {t('hero.description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${basePath}#projects`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-medium text-white shadow-[0_18px_60px_rgba(14,165,233,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(168,85,247,0.3)]"
              >
                {t('hero.viewProjects')}
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href={`${basePath}#contact`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                {t('nav.contact')}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-[24px] p-4 text-left shadow-[0_18px_60px_rgba(2,6,23,0.35)]"
                >
                  <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_90px_rgba(2,6,23,0.55)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                    {isRu ? 'Ключевой фокус' : 'Core focus'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {isRu ? 'Собираю backend как продукт' : 'I build backend like a product'}
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Remote
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <InfoCard title={isRu ? 'Надёжность' : 'Reliability'} text={isRu ? 'Системы без хрупких мест, рассчитанные на реальную нагрузку.' : 'Systems without fragile spots, designed for real load.'} />
                <InfoCard title={isRu ? 'Скорость' : 'Speed'} text={isRu ? 'Быстро собираю MVP, но без дешёвой спешки.' : 'Fast MVP delivery without cheap shortcuts.'} />
                <InfoCard title={isRu ? 'AI' : 'AI'} text={isRu ? 'LLM, автоматизация, агенты, сценарии вокруг продукта.' : 'LLMs, automation, agents, product workflows.'} />
                <InfoCard title={isRu ? 'Telegram' : 'Telegram'} text={isRu ? 'Боты, Mini Apps и сложные пользовательские сценарии.' : 'Bots, Mini Apps, and complex user flows.'} />
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-300">
                    {isRu ? 'Стек, который я люблю' : 'Stack I prefer'}
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    {isRu ? 'практично' : 'practical'}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {focusPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-400">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
                  <div className="text-lg font-semibold text-white">30+</div>
                  <div className="mt-1">{isRu ? 'ботов' : 'bots'}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
                  <div className="text-lg font-semibold text-white">2+</div>
                  <div className="mt-1">{isRu ? 'разработчика в команде' : 'devs led'}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
                  <div className="text-lg font-semibold text-white">1d</div>
                  <div className="mt-1">{isRu ? 'backend за день' : 'backend in a day'}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="container mx-auto max-w-6xl">
          <div className="glass rounded-[28px] px-6 py-5 shadow-[0_18px_70px_rgba(2,6,23,0.3)] md:px-8">
            <div className="flex flex-wrap items-center gap-3">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        id="projects"
        eyebrow={isRu ? 'Избранные работы' : 'Featured work'}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`${basePath}/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            {t('projects.allProjects')}
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={isRu ? 'Что я умею' : 'What I build'}
        title={isRu ? 'Глубина по ключевым направлениям' : 'Depth in the areas that matter'}
        subtitle={isRu ? 'Показываю не список технологий, а зоны, где могу брать ответственность.' : 'Not just tools, but the areas where I can take responsibility.'}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {keySkills.map((skillGroup, index) => (
            <motion.article
              key={skillGroup.category}
              {...sectionFade}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="glass group rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">
                  {t(`skills.categories.${skillGroup.category}`)}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {skillGroup.skills.length}
                </span>
              </div>

              <ul className="space-y-3">
                {skillGroup.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm text-slate-300">
                    <FaCheck className="mt-1 flex-shrink-0 text-primary-400" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={isRu ? 'Технический стек' : 'Technical stack'}
        title={t('techStack.title')}
        subtitle={t('techStack.subtitle')}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <StackCard key={group.title} title={group.title} items={group.items} accent={group.accent} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={isRu ? 'Факты' : 'Proof'}
        title={t('achievements.title')}
        subtitle={isRu ? 'Коротко о том, что уже было доведено до результата.' : 'Short proof of shipped work and responsibility.'}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((item) => (
            <div
              key={item}
              className="glass rounded-[24px] border-white/10 p-5 text-slate-300 shadow-[0_18px_60px_rgba(2,6,23,0.28)]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full border border-primary-500/20 bg-primary-500/10 p-2 text-primary-300">
                  <FaCheck className="text-xs" />
                </div>
                <p className="leading-7">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <section id="contact" className="px-6 pb-24 pt-8 md:pb-28">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-slate-900/80 p-8 shadow-[0_30px_100px_rgba(2,6,23,0.55)] md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_28%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                  {isRu ? 'Контакт' : 'Contact'}
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  <span className="gradient-text">{t('contact.title')}</span>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                  {t('contact.subtitle')}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FaEnvelope />
                    {t('contact.email')}
                  </a>
                  <a
                    href={profile.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <FaTelegram />
                    {t('contact.telegram')}
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                <ContactLink icon={<FaEnvelope />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <ContactLink icon={<FaTelegram />} label="Telegram" value={profile.telegram} href={profile.social.telegram} />
                <ContactLink icon={<FaGithub />} label="GitHub" value="Glour" href={profile.social.github} />
                <ContactLink icon={<FaLinkedin />} label="LinkedIn" value="Profile" href={profile.social.linkedin} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionShell({
  eyebrow,
  title,
  subtitle,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-slate-500">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects');
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary-300">
                {project.category}
              </span>
              {project.period && (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {project.period}
                </span>
              )}
              {project.budget && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  {project.budget}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-primary-300">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{project.role}</p>
          </div>
          {project.highlight && (
            <span className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-medium text-accent-300">
              TOP
            </span>
          )}
        </div>

        <p className="text-sm leading-7 text-slate-300 md:text-base">
          {project.description}
        </p>

        {project.features && project.features.length > 0 && (
          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{t('features')}</p>
            <ul className="mt-3 space-y-3">
              {project.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                  <FaCheck className="mt-1 flex-shrink-0 text-primary-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function StackCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="glass group relative overflow-hidden rounded-[28px] p-6 shadow-[0_18px_70px_rgba(2,6,23,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent}`} />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            {items.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
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
      className="flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/10 bg-slate-900/70 p-3 text-slate-300">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-sm font-medium text-white">{value}</p>
        </div>
      </div>
      <FaArrowRight className="text-xs text-slate-500" />
    </a>
  );
}
