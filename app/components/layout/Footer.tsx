'use client';

import { profile } from '@/app/data/profile';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('contact');
  const tf = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-slate-950/95 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text">{profile.name}</h3>
            <p className="mt-4 max-w-xl text-slate-400">{profile.bio[0]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {profile.social.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.07]">GitHub</a>
              )}
              {profile.social.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.07]">LinkedIn</a>
              )}
              {profile.social.telegram && (
                <a href={profile.social.telegram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.07]">Telegram</a>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <h4 className="text-lg font-semibold text-white">{t('title')}</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li className="break-all">{profile.email}</li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-8 text-center text-sm text-slate-500">
          <p>© {currentYear} {profile.name}. {tf('rights')}</p>
          <p className="mt-2">{tf('builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
