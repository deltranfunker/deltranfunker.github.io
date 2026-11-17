import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://deltranfunker.github.io'
const SITE_TITLE = 'Deltran Funker — Visualist'
const SITE_DESCRIPTION = 'Live audiovisual worlds from Deltran Funker: 2D and 3D art, shaders, videogame-inspired visuals, and VJ performances from 34° S / 56° W.'
const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker_v3_1920-TzEiHE8AmHeiSHA4lubceXAoxM9St7.png'
// Miniatura cuadrada de 512×512: guardala en public/og.png
const SHARE_IMAGE = '/og.png'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Deltran Funker',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: SHARE_IMAGE, width: 512, height: 512, alt: 'Deltran Funker official yellow and cyan key emblem' }],
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  icons: {
    icon: [
      {
        url: LOGO_URL,
        type: 'image/png',
      },
    ],
    apple: LOGO_URL,
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
