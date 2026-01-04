'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { skills, skillCategories } from '../../data/skills';
import SkillBar from '../../components/ui/SkillBar';

const SkillsScene = dynamic(() => import('../../components/3d/SkillsScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
    </div>
  ),
});

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category.value] = skills.filter((skill) => skill.category === category.value);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-xl text-gray-400">
            Technologies and tools I use to build high-performance systems
          </p>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass rounded-2xl overflow-hidden h-[400px]">
            <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
              <SkillsScene />
            </Suspense>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/30'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/30'
                  : 'glass text-gray-300 hover:text-white'
              }`}
              style={{
                borderColor: selectedCategory === category.value ? category.color : undefined,
              }}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills by Category (When no filter selected) */}
        {!selectedCategory ? (
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-8 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <h2 className="text-2xl md:text-3xl font-bold">{category.label}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedSkills[category.value].map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Filtered Skills */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Continuous <span className="gradient-text">Learning</span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              I'm always exploring new technologies and improving my skills. Currently focusing on:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Rust', 'Kubernetes Advanced', 'Machine Learning', 'System Design', 'GraphQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-primary-900/30 to-accent-900/30 border border-primary-500/30 rounded-full text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
