import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.refontiq.com'),
  title: 'Dukoua Nguessan Samuel Junior | Développeur Full Stack & SaaS Builder',
  description: 'Développeur Full Stack, SaaS Builder et fondateur de REFONTIQ en Côte d’Ivoire. Je conçois et développe des produits numériques, des besoins métier aux parcours opérationnels.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dukoua Nguessan Samuel Junior | Développeur Full Stack',
    description: 'Développeur Full Stack, SaaS Builder et fondateur de REFONTIQ. Des besoins métier aux produits numériques.',
    url: 'https://portfolio.refontiq.com',
    siteName: 'Dukoua Nguessan Samuel Junior',
    locale: 'fr_CI',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dukoua Nguessan Samuel Junior | Développeur Full Stack',
    description: 'Développeur Full Stack, SaaS Builder et fondateur de REFONTIQ en Côte d’Ivoire.',
  },
  creator: 'Dukoua Nguessan Samuel Junior',
  publisher: 'REFONTIQ',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dukoua Nguessan Samuel Junior',
    jobTitle: ['Full-Stack Developer', 'SaaS Builder', 'Product Engineer'],
    email: 'dukouas@gmail.com',
    image: 'https://portfolio.refontiq.com/samuel-dukoua-transparent.png',
    url: 'https://portfolio.refontiq.com',
    address: { '@type': 'PostalAddress', addressCountry: 'CI' },
    worksFor: { '@type': 'Organization', name: 'REFONTIQ' },
    sameAs: [
      'https://github.com/refontiq-dotcom',
      'https://www.linkedin.com/in/samuel-dukoua-maintenant',
    ],
  };

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
