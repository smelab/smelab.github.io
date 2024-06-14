import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Footer from '../components/footer';
import { Navbar } from '../components/nav';
import './global.css';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dr. Duc-Hanh Dang',
    template: '%s | Dr. Duc-Hanh Dang',
  },
  description: "Professor Hanh's portfolio.",
  openGraph: {
    title: "Professor Hanh's portfolio.",
    description: "Professor Hanh's portfolio.",
    url: baseUrl,
    siteName: "Professor Hanh's portfolio.",
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icons/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const preferedColorScheme: string =
    cookieStore.get('scheme')?.value ?? 'light';

  return (
    <html
      lang="en"
      className={cx(
        preferedColorScheme,
        GeistSans.variable,
        GeistMono.variable,
        'w-screen',
        'overflow-x-hidden',
      )}
    >
      <body className="text-black bg-[#f6f3eb] dark:text-white dark:bg-neutral-900 antialiased max-w-xl mt-8 mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar preferedScheme={preferedColorScheme as 'light' | 'dark'} />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
