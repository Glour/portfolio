'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useTransition } from 'react';

const languages = [
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'ru', name: 'RU', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      // Remove current locale from pathname
      const pathWithoutLocale = pathname.replace(`/${locale}`, '');
      // Navigate to new locale
      router.replace(`/${newLocale}${pathWithoutLocale}`);
      setIsOpen(false);
    });
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[1];
  const otherLanguages = languages.filter(lang => lang.code !== locale);

  return (
    <div className="relative">
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        aria-label="Change language"
        disabled={isPending}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-300">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-32 rounded-lg glass border border-white/10 shadow-xl z-50 overflow-hidden"
          >
            {otherLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                disabled={isPending}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
