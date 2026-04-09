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
    <html lang={locale} className={`${inter.variable} bg-slate-950`}>
      <body className="min-h-screen overflow-x-hidden bg-slate-950 font-sans antialiased text-white">
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
      </body>
    </html>
  );
}
