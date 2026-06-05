import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/contexts/LangContext'
import { Toaster } from 'react-hot-toast'
import { dbAll } from '@/lib/db'
import Preloader from '@/components/Preloader'
import Script from 'next/script'
import { WhatsAppCTA, ScrollPopup, StickyBottomBar } from '@/components/SubtleMonetization'

export const metadata: Metadata = {
  title: 'Ballon Global Ventures Limited — Global Agricultural & Petroleum Export',
  description: 'Nigeria\'s premier export company. Exporting premium agricultural products (sesame seeds, shea nuts, cashew nuts, shea butter, hibiscus flower) and petroleum products (gas, fuel, kerosene, diesel, bitumen) globally.',
  keywords: 'Nigeria export, sesame seeds, shea nuts, cashew nuts, shea butter, hibiscus, petroleum, diesel, bitumen, agriculture export',
  openGraph: {
    title: 'Ballon Global Ventures Limited',
    description: 'Global Agricultural & Petroleum Export Company — Nigeria',
    type: 'website',
  }
}

async function getServerTranslations() {
  try {
    const rows = await dbAll('SELECT lang, key, value FROM translations')
    const result: Record<string, Record<string, string>> = {}
    for (const row of rows) {
      if (!result[row.lang]) result[row.lang] = {}
      result[row.lang][row.key] = row.value
    }
    return result
  } catch { return {} }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const serverTranslations = await getServerTranslations()
  return (
    <html lang="en">
      {/*
        ── Google AdSense ──────────────────────────────────────────────────────
        Steps to activate:
        1. Go to https://adsense.google.com and create an account
        2. Add your website URL and get approved (takes 1–14 days)
        3. Replace YOUR_PUB_ID below with your ca-pub-XXXXXXXXX publisher ID
        4. Replace the placeholder div in SubtleMonetization.tsx with real <ins> tags
        ──────────────────────────────────────────────────────────────────────
      */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUB_ID"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body>
        <LangProvider serverTranslations={serverTranslations}>
          <Preloader />
          {children}
          {/* ── Subtle monetisation — none of these interrupt the main flow ── */}
          <WhatsAppCTA />        {/* Floating WA button — live leads */}
          <ScrollPopup />        {/* Fires once at 55% scroll — email capture */}
          <StickyBottomBar />    {/* Rotates 3 CTAs — supplier / report / consult */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#C9A84C',
                color: '#030303',
                fontFamily: 'Cinzel, serif',
                fontSize: '11px',
                letterSpacing: '1px',
                padding: '14px 20px',
                border: 'none',
                borderRadius: '0',
              },
              duration: 5000,
            }}
          />
        </LangProvider>
      </body>
    </html>
  )
}
