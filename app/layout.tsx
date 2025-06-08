import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

// Force dynamic rendering for all pages to prevent build-time errors
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AfterDark - Smart Adult Content Platform',
  description: 'Discover curated adult content with intelligent shuffling. Safe mode and premium features available.',
  keywords: 'adult content, shuffle, premium, safe mode, curated',
  robots: 'noindex, nofollow', // Important for adult content
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-dark-gradient">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #475569',
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
} 