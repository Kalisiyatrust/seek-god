import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/client-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Seek God - Discover Your Life Purpose',
  description:
    'A transformative platform helping successful individuals discover their true life purpose, find meaning beyond material success, and channel their achievements into changing lives.',
  openGraph: {
    title: 'Seek God - Discover Your Life Purpose',
    description:
      'Find meaning beyond success. Join a community of purpose-driven individuals making a real impact in the world.',
    url: 'https://seek-god.com',
    siteName: 'Seek God',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seek God - Discover Your Life Purpose',
    description:
      'Find meaning beyond success. Join a community of purpose-driven individuals making a real impact in the world.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
