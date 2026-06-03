import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';
import { locales, type Locale } from '@/i18n/request';

export type ProjectCategory = 'trading' | 'ai' | 'telegram' | 'blockchain' | 'fullstack' | 'automation';

export interface PortfolioProject {
  slug: string;
  title: string;
  role: string;
  description: string;
  features?: string[];
  tech: string[];
  category: ProjectCategory;
  budget?: string;
  period?: string;
  highlight?: boolean;
  link?: string;
  screenshots?: string[];
}

const messagesByLocale = {
  en: enMessages,
  ru: ruMessages,
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getProjects(locale: string): PortfolioProject[] {
  const safeLocale: Locale = isLocale(locale) ? locale : 'ru';
  const data = messagesByLocale[safeLocale].projectsList as PortfolioProject[];
  return data;
}

export function getProjectBySlug(locale: string, slug: string): PortfolioProject | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  const slugs = new Set<string>();
  for (const locale of locales) {
    for (const project of getProjects(locale)) {
      slugs.add(project.slug);
    }
  }
  return Array.from(slugs);
}
