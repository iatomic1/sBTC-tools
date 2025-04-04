import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import '@repo/ui/globals.css';
import { Layout } from './_components/common/layout';
import { SiteFooter } from './_components/common/site-footer';
import { ThemeProvider } from './_components/common/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'sBTC Analytics',
    template: '%s | sBTC Analytics',
  },
  description:
    'Comprehensive analytics for sBTC transactions, holders, and DeFi integrations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
