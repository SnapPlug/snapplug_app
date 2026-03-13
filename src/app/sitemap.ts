import { MetadataRoute } from 'next';
import { scenarios } from '@/data/scenarios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snapplug.app';

  const caseStudyUrls: MetadataRoute.Sitemap = scenarios.map((s) => ({
    url: `${baseUrl}/case-studies/${s.id}`,
    lastModified: new Date('2026-03-13'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
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
    ...caseStudyUrls,
  ];
}
