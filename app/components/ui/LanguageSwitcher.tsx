'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === 'ru' ? 'en' : 'ru';
    startTransition(() => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '';
      router.replace(`/${next}${pathWithoutLocale}`);
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/60 transition-all duration-200 hover:border-primary-400/30 hover:text-white/90 disabled:opacity-40"
      aria-label="Switch language"
    >
      <span className="font-mono tracking-wider">{locale === 'ru' ? 'RU' : 'EN'}</span>
      <span className="text-white/25">·</span>
      <span className="font-mono tracking-wider text-white/35">{locale === 'ru' ? 'EN' : 'RU'}</span>
    </button>
  );
}
