import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/space-grotesk'
import type { Metadata, Viewport } from 'next'

import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Leonardo Schunck Rainha · Backend & Software Engineer',
    template: '%s · LeoCode OS',
  },
  description:
    'Portfólio de Leonardo Schunck Rainha: backend, sistemas distribuídos, cloud, IA aplicada e experiências interativas.',
  applicationName: 'LeoCode OS',
  authors: [{ name: 'Leonardo Schunck Rainha' }],
  creator: 'Leonardo Schunck Rainha',
  openGraph: {
    type: 'website',
    siteName: 'LeoCode OS',
    title: 'Leonardo Schunck Rainha · Backend & Software Engineer',
    description:
      'Sistemas robustos. Experiências memoráveis. Explore projetos, arquitetura e trajetória.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeoCode OS · Leonardo Schunck Rainha',
    description: 'Backend engineering, architecture and interactive systems.',
    images: ['/og.png'],
  },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070a12',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
