import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Aleksandr Bogdanov | Backend Engineer / Tech Lead',
  description: 'Backend engineer building FastAPI, AI automation, Telegram products, and real-time systems. 30+ shipped projects, Tech Lead experience.',
  keywords: [
    'Backend Engineer',
    'Tech Lead',
    'Python Developer',
    'FastAPI',
    'AI Automation',
    'Telegram Bots',
    'Blockchain',
    'Microservices',
    'Portfolio',
    'Aleksandr Bogdanov',
  ],
  authors: [{ name: 'Aleksandr Bogdanov' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Aleksandr Bogdanov | Backend Engineer / Tech Lead',
    description: 'FastAPI, AI automation, Telegram products, blockchain, and real-time backend systems.',
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
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="Europe/Moscow"
    >
      <Header />
      <main className="relative min-h-screen pt-24">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
