import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { COMPANY } from '@/lib/constants'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s — ${COMPANY.name}`,
  },
  description:
    "ERIMAS SARL accompagne les organisations publiques, parapubliques, privées et internationales au Tchad sur l'ensemble du cycle de gestion des ressources humaines : conseil & stratégie RH, recrutement, formation, externalisation de personnel, digitalisation & IA, services supports.",
  keywords: [
    'ERIMAS',
    'ressources humaines Tchad',
    'cabinet RH Tchad',
    "N'Djamena",
    'recrutement Tchad',
    'conseil RH',
    'externalisation personnel',
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description:
      'Conseil & stratégie RH, recrutement, formation, externalisation de personnel, digitalisation & IA, services supports — au Tchad.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    description: 'Cabinet conseil en ressources humaines au Tchad.',
    url: siteUrl,
    email: COMPANY.email,
    telephone: COMPANY.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: COMPANY.addressCity,
      addressCountry: 'TD',
    },
    areaServed: 'TD',
    foundingDate: String(COMPANY.foundingYear),
  }

  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
