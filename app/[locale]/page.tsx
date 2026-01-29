'use client';

import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { profile, techStack, keySkills } from '../data/profile';
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope, FaCheck } from 'react-icons/fa';

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

// Lazy load 3D component
const HeroScene = dynamic(() => import('../components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
    </div>
  ),
});

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  // Get featured projects from translations
  const featuredProjects = useMemo(() => {
    const projectsData = t.raw('projectsList') as unknown;
    const allProjects = Array.isArray(projectsData) ? projectsData as Project[] : [];
    return allProjects.filter(p => p.highlight);
  }, [t]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />

        {/* Content */}
        <div className="container mx-auto max-w-6xl z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-gray-400 mb-4">{t('hero.greeting')}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">{t('hero.title')}</p>
            <p className="text-lg md:text-xl text-primary-400 mb-8">{t('hero.subtitle')}</p>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-gray-400 text-lg">
                {t('hero.description')}
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex justify-center gap-6 mb-12">
              <a
                href={`mailto:${profile.email}`}
                className="p-4 glass rounded-full hover:bg-slate-800/50 transition-all"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
              <a
                href={profile.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-full hover:bg-slate-800/50 transition-all"
                aria-label="Telegram"
              >
                <FaTelegram className="w-6 h-6" />
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-full hover:bg-slate-800/50 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-full hover:bg-slate-800/50 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">30+</div>
                <div className="text-gray-400 text-sm">{t('stats.projects')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">30+</div>
                <div className="text-gray-400 text-sm">{t('stats.telegramBots')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">✓</div>
                <div className="text-gray-400 text-sm">{t('stats.techLead')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">2+ Dev</div>
                <div className="text-gray-400 text-sm">{t('stats.team')}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('techStack.title')}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TechStackCard title={t('techStack.languages')} items={techStack.languages} />
              <TechStackCard title={t('techStack.backend')} items={techStack.backend} />
              <TechStackCard title={t('techStack.ai')} items={techStack.ai} />
              <TechStackCard title={t('techStack.telegram')} items={techStack.telegram} />
              <TechStackCard title={t('techStack.databases')} items={techStack.databases} />
              <TechStackCard title={t('techStack.devops')} items={techStack.devops} />
              <TechStackCard title={t('techStack.cloud')} items={techStack.cloud} />
              <TechStackCard title={t('techStack.blockchain')} items={techStack.blockchain} />
              <TechStackCard title={t('techStack.monitoring')} items={[...techStack.monitoring, ...techStack.other]} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="gradient-text">{t('projects.title')}</span>
            </h2>
            <p className="text-center text-gray-400 mb-16">
              {t('projects.subtitle')}
            </p>

            <div className="space-y-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-8 rounded-lg hover:bg-slate-800/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <span className="px-3 py-1 bg-accent-500/20 text-accent-400 text-xs rounded-full font-medium">
                          ⭐ TOP
                        </span>
                      </div>
                      <p className="text-primary-400 mb-2">{project.role}</p>
                    </div>
                    {project.budget && (
                      <div className="text-accent-400 font-bold text-xl mt-2 md:mt-0">
                        {project.budget}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4">{project.description}</p>

                  {project.features && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('projects.features')}:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                            <FaCheck className="text-primary-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              >
                <span>{t('projects.allProjects')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('skills.title')}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keySkills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{t(`skills.categories.${skillGroup.category}`)}</h3>
                  <ul className="space-y-2">
                    {skillGroup.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                        <FaCheck className="text-primary-500 mt-1 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('achievements.title')}</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {Object.entries(t.raw('achievements.items')).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 glass p-6 rounded-lg"
                >
                  <div className="p-2 bg-primary-500/20 rounded-lg flex-shrink-0">
                    <FaCheck className="text-primary-400 w-5 h-5" />
                  </div>
                  <p className="text-gray-300">{value as string}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">{t('contact.title')}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href={`mailto:${profile.email}`}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              >
                {t('contact.email')}
              </a>
              <a
                href={profile.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass rounded-full text-white font-medium hover:bg-slate-800/50 transition-all duration-300"
              >
                {t('contact.telegram')}
              </a>
            </div>

            <div className="text-gray-500 text-sm">
              <p>{t('hero.location')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Tech Stack Card Component
interface TechStackCardProps {
  title: string;
  items: string[];
}

function TechStackCard({ title, items }: TechStackCardProps) {
  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
