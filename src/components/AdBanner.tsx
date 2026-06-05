'use client'
import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// AdBanner — Google AdSense display unit
// Replace YOUR_PUB_ID with your real publisher ID from adsense.google.com
// Replace data-ad-slot values with real slot IDs from your AdSense dashboard
// ─────────────────────────────────────────────────────────────────────────────

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  label?: string
}

export default function AdBanner({ slot, format = 'auto', style, label }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div style={{ textAlign: 'center', ...style }}>
      {label && (
        <p style={{
          fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 3,
          color: 'rgba(136,136,136,0.5)', textTransform: 'uppercase',
          marginBottom: 4
        }}>
          {label}
        </p>
      )}
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-YOUR_PUB_ID"   // ← Replace with your Publisher ID
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
