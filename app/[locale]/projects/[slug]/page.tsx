import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaExternalLinkAlt,
  FaImages,
  FaLayerGroup,
  FaUserCog,
} from 'react-icons/fa';
import ProjectGallery from '@/app/components/ui/ProjectGallery';
import { getProjectBySlug, getProjectSlugs, getProjects, isLocale } from '@/app/lib/projects';
import { locales } from '@/i18n/request';

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    return {
      title: 'Project | Aleksandr Bogdanov',
    };
  }

  return {
    title: `${project.title} | Aleksandr Bogdanov`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.screenshots?.[0] ? [{ url: project.screenshots[0] }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProjectBySlug(locale, slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getProjects(locale);
  const related = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  const screenshots = project.screenshots ?? [];
  const categoryLabel = t(`categories.${project.category}`);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-primary-400/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-80 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]"
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <Link
          href={`/${locale}/projects`}
          className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors duration-200 hover:text-primary-400"
        >
          <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5" />
          {t('backToProjects')}
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-primary-300 uppercase">
                {categoryLabel}
              </span>
              {project.period && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                  <FaCalendarAlt className="text-[9px]" />
                  {project.period}
                </span>
              )}
              {screenshots.length > 0 && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                  <FaImages className="text-[9px]" />
                  {screenshots.length} {t('screenshots')}
                </span>
              )}
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,5vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/68 md:text-lg">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-primary-400 px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.22)]"
                >
                  {t('externalProject')}
                  <FaExternalLinkAlt className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              )}
              <Link
                href={`/${locale}#contact`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/25 hover:text-white"
              >
                {t('ctaButton')}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm">
            <p className="font-mono text-[11px] tracking-[0.28em] text-primary-400/60 uppercase">
              {t('projectMeta')}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <MetaItem icon={<FaUserCog />} label={t('role')} value={project.role} />
              <MetaItem icon={<FaLayerGroup />} label={t('technologies')} value={project.tech.slice(0, 5).join(' / ')} />
              {project.budget && <MetaItem icon={<FaCheck />} label="Scope" value={project.budget} />}
            </div>
          </aside>
        </section>

        {project.caseFlow?.length ? (
          <section className="mt-14 rounded-[2rem] border border-primary-400/15 bg-primary-400/[0.055] p-6 backdrop-blur-sm md:p-8">
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/65 uppercase">
              {project.caseFlowTitle ?? 'Product flow'}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.caseFlow.map((step, index) => (
                <div key={step} className="relative rounded-2xl border border-white/10 bg-black/20 p-5">
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-primary-400/25 bg-primary-400/10 font-mono text-xs text-primary-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-[1.75] text-white/74">{step}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 md:mt-20">
          {screenshots.length > 0 ? (
            <>
              <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
                    {t('gallery')}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                    {t('gallerySubtitle')}
                  </h2>
                </div>
              </div>
              <ProjectGallery
                screenshots={screenshots}
                title={project.title}
                labels={{
                  previousShot: t('previousShot'),
                  nextShot: t('nextShot'),
                  closeGallery: t('closeGallery'),
                  openFullSize: t('openFullSize'),
                }}
              />
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/[0.035] p-8 text-white/55 md:p-10">
              <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
                {t('gallery')}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-[1.8]">
                {t('noScreenshots')}
              </p>
            </div>
          )}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm md:p-8">
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
              {t('whatBuilt')}
            </p>
            <ul className="mt-6 space-y-4">
              {(project.features ?? []).map((feature, index) => (
                <li key={`${feature}-${index}`} className="flex items-start gap-3 text-sm leading-[1.75] text-white/75">
                  <span className="mt-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary-400/25 bg-primary-400/10 text-primary-300">
                    <FaCheck className="text-[9px]" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm md:p-8">
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary-400/60 uppercase">
              {t('stack')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-medium text-white/68 transition-colors hover:border-primary-400/20 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                {t('relatedProjects')}
              </h2>
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-primary-400"
              >
                {t('allProjects')}
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/projects/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/25 hover:bg-white/[0.07]"
                >
                  {item.screenshots?.[0] && (
                    <div className="mb-4 aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/30">
                      <img src={item.screenshots[0]} alt={item.title} className="h-full w-full object-cover object-top opacity-90 transition duration-300 group-hover:scale-[1.03]" />
                    </div>
                  )}
                  <p className="font-mono text-[10px] tracking-[0.18em] text-primary-400/55 uppercase">
                    {t(`categories.${item.category}`)}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-primary-300">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="flex items-center gap-2 text-primary-400/70">
        <span className="text-xs">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">{label}</span>
      </div>
      <p className="mt-3 text-sm leading-[1.65] text-white/78">{value}</p>
    </div>
  );
}
