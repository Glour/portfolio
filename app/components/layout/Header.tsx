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
    { name: t('home'),      path: '#' },
    { name: t('techStack'), path: '#tech-stack' },
    { name: t('projects'),  path: '#projects' },
    { name: t('contact'),   path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path === '#') {
      if (isHomeRoute) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      router.push(basePath);
      return;
    }
    if (isHomeRoute) {
      const el = document.querySelector(path);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    router.push(`${basePath}${path}`);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'border-b border-white/5 bg-black/80 backdrop-blur-2xl' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto max-w-5xl px-6 py-5">
        <div className="flex items-center justify-between gap-6">

          {/* Logo / name */}
          <button
            onClick={() => handleNavigation('#')}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[11px] font-bold text-white/70 transition-all duration-300 group-hover:border-primary-400/30 group-hover:text-primary-400">
              AB
            </span>
            <span className="hidden text-sm font-medium text-white/50 transition-colors duration-200 group-hover:text-white/80 md:block">
              Aleksandr Bogdanov
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="rounded-lg px-4 py-2 text-sm text-white/40 transition-colors duration-200 hover:text-white/80"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <button
              onClick={() => handleNavigation('#contact')}
              className="rounded-full bg-primary-400 px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-primary-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              {t('contactBtn')}
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/50 transition-colors duration-200 hover:text-white/80 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4 lg:hidden"
            >
              <div className="rounded-2xl border border-white/8 bg-black/90 p-4 backdrop-blur-2xl">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full rounded-xl px-4 py-3 text-left text-sm text-white/50 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/6 pt-4">
                  <LanguageSwitcher />
                  <button
                    onClick={() => handleNavigation('#contact')}
                    className="flex-1 rounded-full bg-primary-400 py-2.5 text-sm font-medium text-black"
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
