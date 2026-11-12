import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dukoua Nguessan Samuel Junior — Développeur Web Full-Stack',
  description: 'Portfolio de Dukoua Nguessan Samuel Junior, développeur Web Full-Stack. Du concept au produit : je développe les solutions de demain.',
  metadataBase: new URL('https://example.com'),
  openGraph: { title: 'Dukoua Nguessan Samuel Junior', description: 'Développeur Web Full-Stack', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
