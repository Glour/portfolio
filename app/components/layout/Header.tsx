'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const basePath = `/${locale}`;
  const isHomeRoute = pathname === basePath || pathname === `${basePath}/`;

  const navItems = [
    { name: t('home'), path: '#' },
    { name: t('techStack'), path: '#tech-stack' },
    { name: t('projects'), path: '#projects' },
    { name: t('contact'), path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);

    if (path === '#') {
      if (isHomeRoute) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      router.push(basePath);
      return;
    }

    if (isHomeRoute) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    router.push(`${basePath}${path}`);
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/8 bg-slate-950/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/5 bg-slate-950/30 px-4 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl md:px-5">
          <button
            onClick={() => handleNavigation('#')}
            className="inline-flex items-center gap-3 rounded-full px-2 py-1 text-left transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Back to top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-bold text-white">
              AB
            </span>
            <span className="hidden md:block">
              <span className="block text-sm font-semibold text-white">Aleksandr Bogdanov</span>
              <span className="block text-xs uppercase tracking-[0.22em] text-slate-500">Backend • AI • Infra</span>
            </span>
          </button>

          <ul className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="rounded-full px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <button
              onClick={() => handleNavigation('#contact')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_16px_50px_rgba(14,165,233,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(168,85,247,0.28)]"
            >
              {t('contactBtn')}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:bg-white/[0.08] lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden"
            >
              <div className="mt-3 rounded-[28px] border border-white/10 bg-slate-950/90 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.5)] backdrop-blur-xl">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-300 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <LanguageSwitcher />
                  <button
                    onClick={() => handleNavigation('#contact')}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-5 py-3 text-sm font-medium text-white"
                  >
                    {t('contactBtn')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
