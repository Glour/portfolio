'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { FaCheck, FaArrowLeft, FaFilter } from 'react-icons/fa';

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

const categoryColors: Record<string, string> = {
  trading: 'from-green-600 to-emerald-600',
  ai: 'from-purple-600 to-pink-600',
  telegram: 'from-blue-600 to-cyan-600',
  blockchain: 'from-orange-600 to-yellow-600',
  fullstack: 'from-indigo-600 to-blue-600',
  automation: 'from-red-600 to-rose-600',
};

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get projects from translations
  const allProjects = useMemo(() => {
    const projectsData = t.raw('projectsList') as unknown;
    return Array.isArray(projectsData) ? projectsData as Project[] : [];
  }, [t]);

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
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors"
          >
            <FaArrowLeft /> {t('backToHome')}
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">{t('allProjectsTitle')}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {t('allProjectsSubtitle')}
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="text-primary-400" />
            <span className="text-gray-300 font-medium">{t('filterBy')}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/50'
                    : 'glass text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                {category.name}
                {category.id !== 'all' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({allProjects.filter(p => p.category === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-6 text-gray-400">
            {t('foundProjects')} <span className="text-white font-bold">{filteredProjects.length}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center glass p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">{t('ctaTitle')}</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('projects');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden hover:bg-slate-800/50 transition-all group"
    >
      {/* Category Badge */}
      <div className={`h-2 bg-gradient-to-r ${categoryColors[project.category]}`} />

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors flex-1">
              {project.title}
            </h3>
            {project.highlight && (
              <span className="ml-2 px-2 py-1 bg-accent-500/20 text-accent-400 text-xs rounded-full font-medium flex-shrink-0">
                ⭐ TOP
              </span>
            )}
          </div>
          <p className="text-sm text-primary-400 mb-2">{project.role}</p>
          {(project.budget || project.period) && (
            <div className="flex gap-3 text-xs text-gray-500">
              {project.budget && <span>💰 {project.budget}</span>}
              {project.period && <span>⏱️ {project.period}</span>}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Features (expandable) */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary-400 hover:text-primary-300 mb-2 transition-colors"
            >
              {isExpanded ? `▼ ${t('hideDetails')}` : `▶ ${t('showDetails')}`}
            </button>

            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-400 text-xs">
                    <FaCheck className="text-primary-500 mt-0.5 flex-shrink-0 text-[10px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-primary-500/10 border border-primary-500/30 rounded text-primary-400 text-[10px]"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-gray-500 text-[10px]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
