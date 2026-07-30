import { notFound } from 'next/navigation'

import { LeoCodeOS } from '@/components/os/leo-code-os'
import { isLocale } from '@/types/portfolio'

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Leonardo Schunck Rainha',
    jobTitle: 'Backend & Software Engineer',
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    }/${locale}`,
    sameAs: [
      'https://github.com/SchunckLeonardo',
      'https://www.linkedin.com/in/leonardoschunck',
      'https://medium.com/@leonardoschunck',
    ],
    knowsAbout: [
      'Go',
      'Kotlin',
      'Java',
      'Spring Boot',
      'Distributed systems',
      'Cloud architecture',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LeoCodeOS locale={locale} />
    </>
  )
}
