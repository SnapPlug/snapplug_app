import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snapplug.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-diagnosis`,
      lastModified: new Date('2026-03-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date('2026-03-11'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
