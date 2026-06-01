import type { MetadataRoute } from 'next';
import { siteConfig, rooms } from '@/lib/data';
import { getAllPosts, getAllTags } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = siteConfig.url;

  // Static public routes — priority + change frequency tuned per type.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rooms`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/dining`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/royalton`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/spa`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/experiences`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/weddings`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/events`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/celebrations`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/gallery`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/careers`, lastModified, changeFrequency: 'monthly', priority: 0.65 },
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

  // Blog posts + tag pages — pulled from MDX content directory.
  const posts = getAllPosts();
  const blogPostRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.frontmatter.date ? new Date(p.frontmatter.date) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const blogTagRoutes: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `${base}/blog/tag/${encodeURIComponent(t.toLowerCase())}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...roomRoutes, ...blogPostRoutes, ...blogTagRoutes];
}
