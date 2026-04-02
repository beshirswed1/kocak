import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/store/StoreProvider'
import { CartDrawer } from '@/components/CartDrawer'
import { FirebaseSyncProvider } from '@/components/FirebaseSyncProvider'
import { defaultInfo, defaultSeo } from '@/constants/restaurant-data'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif',
  display: 'swap'
})

// SEO metadata from config defaults (server component, can't use Redux)
export const metadata: Metadata = {
  metadataBase: new URL(defaultSeo.websiteUrl),
  title: {
    default: defaultSeo.titleDefault,
    template: defaultSeo.titleTemplate,
  },
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  authors: [{ name: defaultInfo.name }],
  creator: defaultInfo.name,
  publisher: defaultInfo.name,

  openGraph: {
    type: 'website',
    locale: defaultSeo.locale,
    url: defaultSeo.websiteUrl,
    siteName: defaultInfo.name,
    title: defaultSeo.titleDefault,
    description: defaultSeo.description,
    images: [
      {
        url: defaultSeo.ogImage,
        width: 1200,
        height: 630,
        alt: `${defaultInfo.name} - ${defaultInfo.slogan}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: defaultSeo.titleDefault,
    description: defaultSeo.description,
    images: [defaultSeo.ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#8C2C16' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  // JSON-LD structured data from config
  const jsonLd = {
    ...defaultSeo.jsonLd,
    name: defaultInfo.name,
    telephone: `+${defaultInfo.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      "addressLocality": defaultInfo.city,
      "addressRegion": defaultInfo.city,
      "addressCountry": "TR"
    },
    slogan: defaultInfo.slogan,
    description: defaultSeo.description,
  };

  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground flex flex-col min-h-screen">
        <StoreProvider>
          <FirebaseSyncProvider />
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  )
}