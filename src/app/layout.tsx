import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--dancing',
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
      <body className={`${inter.className} ${dancing.variable}`}>
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
