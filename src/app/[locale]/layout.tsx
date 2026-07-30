import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { isLocale, locales } from '@/types/portfolio'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const isPortuguese = locale === 'pt'
  return {
    title: isPortuguese ? 'Portfólio de engenharia' : 'Engineering portfolio',
    description: isPortuguese
      ? 'Explore a trajetória, os projetos e as decisões de arquitetura de Leonardo Schunck Rainha.'
      : 'Explore Leonardo Schunck Rainha’s career, projects and architecture decisions.',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt', en: '/en' },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return children
}
