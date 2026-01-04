'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/app/data/skills';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  const categoryColors = {
    languages: 'from-primary-500 to-primary-600',
    frameworks: 'from-accent-500 to-accent-600',
    databases: 'from-pink-500 to-pink-600',
    tools: 'from-green-500 to-green-600',
    devops: 'from-amber-500 to-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
        <div className="flex items-center gap-2">
          {skill.years && (
            <span className="text-xs text-gray-500">{skill.years}y</span>
          )}
          <span className="text-sm font-bold text-primary-400">{skill.level}%</span>
        </div>
      </div>
      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${categoryColors[skill.category]} rounded-full`}
        />
      </div>
    </motion.div>
  );
}
