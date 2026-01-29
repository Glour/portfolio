import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Aleksandr Bogdanov | Backend Developer',
  description: 'Backend-разработчик: Python, FastAPI, AI/ML, Blockchain, Telegram Bots. 30+ проектов, Tech Lead опыт, микросервисная архитектура.',
  keywords: [
    'Backend Developer',
    'Python Developer',
    'FastAPI',
    'AI/ML Integration',
    'Telegram Bots',
    'Blockchain',
    'Tech Lead',
    'Microservices',
    'Portfolio',
    'Aleksandr Bogdanov',
  ],
  authors: [{ name: 'Aleksandr Bogdanov' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Aleksandr Bogdanov | Backend Developer',
    description: 'Backend Developer: Python, FastAPI, AI/ML, Blockchain, Telegram Bots',
    type: 'website',
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased">
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="Europe/Moscow"
        >
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
