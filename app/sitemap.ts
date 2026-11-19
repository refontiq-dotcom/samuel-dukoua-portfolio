import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://portfolio.refontiq.com/',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
