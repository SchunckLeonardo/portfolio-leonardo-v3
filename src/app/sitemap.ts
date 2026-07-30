import type { MetadataRoute } from 'next'

import { locales, projectSlugs } from '@/types/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const now = new Date()
  return [
    ...locales.map((locale) => ({
      url: `${origin}/${locale}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: locale === 'pt' ? 1 : 0.9,
    })),
    ...locales.flatMap((locale) =>
      projectSlugs.map((slug) => ({
        url: `${origin}/${locale}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ),
  ]
}
