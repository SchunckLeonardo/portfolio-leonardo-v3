import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--ibm',
})

export const metadata: Metadata = {
  title: 'Leocodelab',
  description: 'Leonardo Schunck Rainha Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibm.variable}`}>
        <main
          className="h-screen bg-blue-950 bg-cover bg-center bg-no-repeat antialiased"
          style={{
            backgroundImage: "url('/images/windows-11-screen.jpg')",
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center text-center backdrop-blur-background">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
