'use client';

import { motion } from 'framer-motion';
import { Project } from '@/app/data/projects';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary-900/50 to-accent-900/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {project.category === 'trading' && '📊'}
            {project.category === 'backend' && '🚀'}
            {project.category === 'fullstack' && '💻'}
            {project.category === 'ml' && '🤖'}
            {project.category === 'infrastructure' && '⚙️'}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
            {project.year}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-800/50 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-slate-800/50 rounded text-xs text-gray-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-slate-800">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-primary-400 font-bold text-sm">{metric.value}</div>
                <div className="text-gray-500 text-xs">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-center text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-lg hover:shadow-primary-500/50 rounded-lg text-center text-sm font-medium transition-all"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
