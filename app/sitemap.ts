import type { MetadataRoute } from 'next'
import { courses } from '@/lib/courses'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alokranjanparamedicalinstitute.in'

  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/admission',
    '/academics',
    '/faculty',
    '/facilities',
    '/gallery',
    '/scholarship',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...courseRoutes]
}
