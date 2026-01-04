'use client';

import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import ContactForm from '../../components/ui/ContactForm';

export default function ContactPage() {
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
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-400">
            Have a project in mind or want to discuss opportunities? Let's talk!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Let's Build Something <span className="gradient-text">Amazing</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, I'll try my best
                  to get back to you!
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-4 glass rounded-xl p-4"
                >
                  <div className="p-3 bg-primary-600/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-4 glass rounded-xl p-4"
                >
                  <div className="p-3 bg-accent-600/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-accent-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Location</h3>
                    <p className="text-gray-400">{profile.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-4 glass rounded-xl p-4"
                >
                  <div className="p-3 bg-pink-600/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-pink-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Social</h3>
                    <div className="flex gap-3">
                      {profile.social.github && (
                        <a
                          href={profile.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-400 transition-colors"
                          aria-label="GitHub"
                        >
                          GitHub
                        </a>
                      )}
                      {profile.social.linkedin && (
                        <a
                          href={profile.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-400 transition-colors"
                          aria-label="LinkedIn"
                        >
                          LinkedIn
                        </a>
                      )}
                      {profile.social.telegram && (
                        <a
                          href={profile.social.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-400 transition-colors"
                          aria-label="Telegram"
                        >
                          Telegram
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="font-semibold text-white">Available for Opportunities</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  I'm currently open to freelance projects and full-time positions.
                  Feel free to reach out if you think I'd be a good fit!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-20 text-center glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            Prefer a Different Method?
          </h2>
          <p className="text-gray-400 mb-6">
            You can also find me on various platforms. I'm most active on GitHub and LinkedIn,
            but feel free to reach out wherever you're most comfortable.
          </p>
          <div className="flex justify-center gap-4">
            {profile.social.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 glass rounded-lg hover:bg-slate-800/50 transition-all"
              >
                GitHub
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 glass rounded-lg hover:bg-slate-800/50 transition-all"
              >
                LinkedIn
              </a>
            )}
            {profile.social.telegram && (
              <a
                href={profile.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 glass rounded-lg hover:bg-slate-800/50 transition-all"
              >
                Telegram
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
