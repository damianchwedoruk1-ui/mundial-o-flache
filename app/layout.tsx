import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liga Mundialowa',
  description: 'Prywatna liga typowania Mundialu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
