'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: t('home'), path: '#' },
    { name: t('techStack'), path: '#tech-stack' },
    { name: t('projects'), path: '#projects' },
    { name: t('skills'), path: '#skills' },
    { name: t('contact'), path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);

    // Если мы на главной странице
    if (pathname === '/') {
      if (path === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Если мы на другой странице - переходим на главную с якорем
      if (path === '#') {
        router.push('/');
      } else {
        router.push('/' + path);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('#')}
            className="text-2xl font-bold gradient-text"
          >
            AB
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-primary-400"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => handleNavigation('#contact')}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
            >
              {t('contactBtn')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <ul className="flex flex-col space-y-4 pb-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="block w-full text-left text-sm font-medium text-gray-300 transition-colors hover:text-primary-400"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
                <li className="flex justify-center pt-2">
                  <LanguageSwitcher />
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('#contact')}
                    className="block w-full text-center px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-medium"
                  >
                    {t('contactBtn')}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
