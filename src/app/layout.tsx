import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leocodelab Portfolio',
  description: 'Leonardo Schunck Rainha Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="h-screen bg-blue-950 bg-cover bg-center bg-no-repeat"
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
