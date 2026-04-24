import React from 'react';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ChatBot } from '../components/ui/ChatBot';
import { StructuredData } from '../components/seo/SEOHead';
import { AuthProvider } from '../contexts/AuthContext';
import { siteConfig } from '../config/content';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Servicos digitais premium`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'fronex',
    'servicos digitais angola',
    'next.js',
    'software de gestao',
    'marketplace de servicos',
    'hospedagem premium',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Servicos digitais premium`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Open Graph`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Servicos digitais premium`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${inter.variable} bg-[#050816] font-sans text-slate-50 antialiased`}>
        <StructuredData />
        <AuthProvider>
          <div className="site-shell min-h-screen">
            <div className="pointer-events-none fixed inset-0 -z-50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(118,228,255,0.12),transparent_28%),linear-gradient(180deg,#040713_0%,#07101d_48%,#06111f_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(46,103,255,0.12),transparent_24%)]" />
            </div>

            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatBot />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
