import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Agio Agent',
  description: 'Agente de automação de marketing da Agio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 56px)' }}>{children}</main>
      </body>
    </html>
  );
}
