// app/layout.tsx
import './globals.css';
import Header from './components/Header';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StoryBit — Streaming Dashboard',
  description: 'A simplified streaming dashboard clone built with Next.js 14',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
