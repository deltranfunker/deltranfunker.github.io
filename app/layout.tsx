import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deltran Funker — VJ & Visual Artist',
  description: 'Live audiovisual worlds from Deltran Funker: 2D and 3D art, custom shaders, videogame-inspired visuals, and VJ performances from 34° S / 56° W.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker_v3_1920-TzEiHE8AmHeiSHA4lubceXAoxM9St7.png',
        type: 'image/png',
      },
    ],
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker_v3_1920-TzEiHE8AmHeiSHA4lubceXAoxM9St7.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && !process.env.GITHUB_ACTIONS && <Analytics />}
      </body>
    </html>
  )
}
