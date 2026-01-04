'use client';

import { motion } from 'framer-motion';
import { profile, experience, education, certifications } from '../../data/profile';
import { expertise } from '../../data/skills';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-gray-400">
            Passionate developer building the future of trading systems
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            {profile.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-300 text-lg leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Expertise */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Areas of <span className="gradient-text">Expertise</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-primary-400">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-primary-400 font-medium mb-2">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-gray-400 text-sm md:text-right">
                    <div>{job.period}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        job.type === 'remote' ? 'bg-green-500' :
                        job.type === 'hybrid' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      {job.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {job.description.map((item, i) => (
                    <li key={i} className="text-gray-400 flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="gradient-text">Education</span>
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-primary-400 font-medium mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 text-sm mb-3">{edu.period}</p>
                  <p className="text-gray-400 text-sm">{edu.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="gradient-text">Certifications</span>
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-primary-400 font-medium text-sm mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm">{cert.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
