import type { MetadataRoute } from 'next';
import { siteConfig, rooms } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = siteConfig.url;

  // Static public routes — priority + change frequency tuned per type.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rooms`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/dining`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/spa`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/experiences`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/weddings`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/gallery`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/house`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/suites`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cancellation`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic room-detail routes, one per suite.
  const roomRoutes: MetadataRoute.Sitemap = rooms.map((r) => ({
    url: `${base}/rooms/${r.id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...roomRoutes];
}
