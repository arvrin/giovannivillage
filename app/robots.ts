import type { MetadataRoute } from 'next';
import { siteConfig, INDEXABLE } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  // Pre-launch (preview domains): block all crawling until cutover.
  if (!INDEXABLE) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
