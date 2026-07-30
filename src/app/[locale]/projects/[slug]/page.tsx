import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LeoCodeOS } from '@/components/os/leo-code-os'
import { getProject } from '@/content/portfolio'
import {
  isLocale,
  isProjectSlug,
  locales,
  projectSlugs,
} from '@/types/portfolio'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale) || !isProjectSlug(slug)) return {}
  const project = getProject(locale, slug)
  if (!project) return {}

  return {
    title: `${project.title} · Case study`,
    description: project.outcome,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        'pt-BR': `/pt/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} · LeoCode OS`,
      description: project.outcome,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound()
  const project = getProject(locale, slug)
  if (!project) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.outcome,
            codeRepository: project.repository,
            programmingLanguage: project.stack,
            author: {
              '@type': 'Person',
              name: 'Leonardo Schunck Rainha',
            },
          }),
        }}
      />
      <LeoCodeOS
        locale={locale}
        initialApp="architecture"
        initialProject={slug}
      />
    </>
  )
}
