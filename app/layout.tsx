import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL('https://tragossalta.com'), // Cambia por tu dominio
  title: {
    default: "Tragos Salta - Precios de Boliches en Salta Capital",
    template: "%s | Tragos Salta"
  },
  description: "Compará precios de tragos en todos los boliches de Salta Capital. Encontrá las mejores ofertas, eventos y horarios actualizados.",
  keywords: "boliches salta, precios tragos salta, joda salta, noche salteña, fernet salta, cerveza salta, balcarce salta",
  authors: [{ name: "Tragos Salta" }],
  creator: "Tragos Salta",
  publisher: "Tragos Salta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://tragossalta.com',
    siteName: 'Tragos Salta',
    title: 'Tragos Salta - Precios de Boliches',
    description: 'Compará precios de tragos en Salta Capital',
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
  verification: {
    google: 'tu-codigo-google-search-console', // Agregar cuando tengas
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
