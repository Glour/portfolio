'use client';

import { profile } from '@/app/data/profile';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t  = useTranslations('contact');
  const tf = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-white/25 uppercase">
              {profile.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-[1.75] text-white/35">
              {profile.bio[0]}
            </p>
            <div className="mt-5 flex gap-3">
              {profile.social.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-white/30 transition-colors duration-200 hover:text-primary-400">
                  GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-white/30 transition-colors duration-200 hover:text-primary-400">
                  LinkedIn
                </a>
              )}
              {profile.social.telegram && (
                <a href={profile.social.telegram} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-white/30 transition-colors duration-200 hover:text-primary-400">
                  Telegram
                </a>
              )}
            </div>
          </div>

          {/* Contact quick */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-white/25 uppercase">{t('title')}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/35">
              <li className="break-all">{profile.email}</li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="font-mono text-[11px] tracking-wider text-white/20">
            © {currentYear} {profile.name} — {tf('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
