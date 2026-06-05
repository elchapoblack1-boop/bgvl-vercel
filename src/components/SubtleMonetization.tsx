'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// All monetisation components are SUBTLE — they live inside existing UI
// elements, appear at the right moment, or look like native site features.
// Users are never taken off the product/order flow.
// ─────────────────────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════════════════
// 1. SPONSORED PRODUCT CARD
//    Drops into the products grid as if it's a normal product card.
//    Suppliers pay ₦100,000–₦300,000/month for this slot.
//    The tiny "SPONSORED" label at top-right is the only differentiator.
// ══════════════════════════════════════════════════════════════════════════════

interface SponsoredCardProps {
  icon?: string
  name?: string
  company?: string
  desc?: string
  specs?: [string, string][]
  cta?: string
  tab: 'agri' | 'petro'
}

export function SponsoredProductCard({
  icon = '⭐',
  name = 'Your Product Here',
  company = 'Your Company',
  desc = 'Reach verified international buyers actively searching for Nigerian exports. Premium placement in our product catalogue.',
  specs = [['Min Order', 'Negotiable'], ['Certification', 'NEPC / CAC'], ['Availability', 'Year-round'], ['Packaging', 'Custom']],
  cta = 'Contact Supplier',
  tab,
}: SponsoredCardProps) {
  return (
    <div style={{
      background: 'var(--dark3)', padding: '32px 24px',
      border: '1px solid rgba(201,168,76,0.15)',
      transition: 'all 0.3s', position: 'relative',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
    >
      {/* Subtle sponsor label */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
        padding: '2px 6px', fontFamily: 'Cinzel,serif', fontSize: 7, letterSpacing: 2,
        color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase',
      }}>SPONSORED</div>

      <span style={{ fontSize: 34, marginBottom: 14, display: 'block' }}>{icon}</span>
      <div style={{ fontFamily: 'Cinzel,serif', fontSize: 15, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 10, fontFamily: 'Cinzel,serif', textTransform: 'uppercase' }}>{company}</div>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 16 }}>{desc}</p>
      <ul style={{ listStyle: 'none' }}>
        {specs.map(([k, v]) => (
          <li key={k} style={{ fontSize: 11, letterSpacing: 1, padding: '5px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            {k} <span style={{ color: 'var(--gold)' }}>{v}</span>
          </li>
        ))}
      </ul>
      <a href="mailto:ballonholdingsltd@gmail.com?subject=Sponsored%20Product%20Inquiry"
        style={{
          display: 'block', marginTop: 18, width: '100%', padding: 10, textAlign: 'center',
          background: 'transparent', border: '1px solid var(--border)', color: 'var(--gold)',
          fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 2, cursor: 'pointer',
          textDecoration: 'none', transition: 'all 0.3s', textTransform: 'uppercase',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--black)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
      >{cta}</a>

      {/* "Advertise here" placeholder when no sponsor is active */}
      <div style={{
        marginTop: 12, padding: '8px 0', borderTop: '1px dashed rgba(201,168,76,0.1)',
        textAlign: 'center',
      }}>
        <a href="mailto:ballonholdingsltd@gmail.com?subject=Sponsored%20Product%20Slot%20-%20Pricing"
          style={{ fontSize: 9, color: 'rgba(136,136,136,0.3)', fontFamily: 'Cinzel,serif', letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase' }}>
          Advertise in this slot →
        </a>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 2. EXIT-INTENT / SCROLL POPUP
//    Fires after user has scrolled 60% of the page — once per session.
//    Offers a free price list download in exchange for email.
//    Monetise: email list → sell newsletter sponsorships + product alerts.
// ══════════════════════════════════════════════════════════════════════════════

export function ScrollPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('bgvl_popup_seen')) return

    const onScroll = () => {
      if (triggered.current) return
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrolled > 0.55) {
        triggered.current = true
        setTimeout(() => setShow(true), 800)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem('bgvl_popup_seen', '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Price List Popup' }),
      })
    } catch {}
    setDone(true)
    setTimeout(dismiss, 2000)
  }

  if (!show || dismissed) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(3,3,3,0.8)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}
      onClick={e => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div style={{
        background: 'var(--dark2)', border: '1px solid var(--border-bright)',
        maxWidth: 520, width: '100%', padding: 'clamp(28px,5vw,48px)',
        boxShadow: '0 0 80px rgba(201,168,76,0.12)',
        animation: 'fadeInUp 0.3s ease',
        position: 'relative',
      }}>
        <button onClick={dismiss} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', color: 'var(--text-muted)',
          fontSize: 20, cursor: 'pointer', lineHeight: 1,
        }}>×</button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
            <p style={{ fontFamily: 'Cinzel,serif', fontSize: 14, color: 'var(--gold)', letterSpacing: 2 }}>CHECK YOUR INBOX</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Your free price list is on its way.</p>
          </div>
        ) : (
          <>
            <div style={{
              position: 'absolute', top: -12, left: 28,
              background: 'var(--gold)', color: 'var(--black)',
              padding: '3px 16px', fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 3, fontWeight: 700,
            }}>FREE DOWNLOAD</div>

            <div className="section-label" style={{ marginTop: 8 }}>For Buyers &amp; Traders</div>
            <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(18px,3vw,26px)', fontWeight: 700, marginBottom: 10 }}>
              Get Our <span style={{ color: 'var(--gold)' }}>Q2 2026 Price List</span>
            </h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 16, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 20 }}>
              Current FOB prices for all agricultural &amp; petroleum products — updated quarterly. Free, no commitment.
            </p>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              {['Sesame • Shea • Cashew prices', 'AGO • Diesel • Bitumen rates', 'Min order quantities', 'Packaging & certification details'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 7 }}>◆</span> {item}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: 0 }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{
                    flex: 1, background: 'var(--dark3)', border: '1px solid var(--border)',
                    borderRight: 'none', color: 'var(--white)', padding: '13px 16px',
                    fontFamily: 'Montserrat,sans-serif', fontSize: 13, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
                <button type="submit" style={{
                  background: 'var(--gold)', color: 'var(--black)', border: 'none',
                  padding: '0 20px', fontFamily: 'Cinzel,serif', fontSize: 9,
                  letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>Send Me</button>
              </div>
            </form>

            <button onClick={dismiss} style={{
              marginTop: 14, background: 'none', border: 'none', color: 'rgba(136,136,136,0.4)',
              fontSize: 10, cursor: 'pointer', fontFamily: 'Cinzel,serif', letterSpacing: 2,
              textDecoration: 'underline', display: 'block', width: '100%', textAlign: 'center',
            }}>
              No thanks, I don&apos;t need this
            </button>
          </>
        )}
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 3. STICKY BOTTOM BAR
//    Slim bar at the bottom — always visible, never obstructive.
//    Rotates between 3 CTAs every 6 seconds.
//    Earns via: lead captures, consultation bookings, supplier listings.
// ══════════════════════════════════════════════════════════════════════════════

const BOTTOM_MESSAGES = [
  {
    text: '📋 Want to list your business as a Verified Supplier?',
    cta: 'Apply Now',
    href: 'mailto:ballonholdingsltd@gmail.com?subject=Verified%20Supplier%20Application',
    color: 'var(--gold)',
  },
  {
    text: '📊 New: Q2 2026 commodity price report now available',
    cta: 'Get Report — ₦8,000',
    href: 'mailto:ballonholdingsltd@gmail.com?subject=Purchase%20Q2%202026%20Commodity%20Report',
    color: 'var(--cyan)',
  },
  {
    text: '💼 Need help navigating Nigeria exports? Book a consultation',
    cta: 'Book — ₦25,000',
    href: 'mailto:ballonholdingsltd@gmail.com?subject=Consultation%20Booking%20Request',
    color: 'var(--gold)',
  },
]

export function StickyBottomBar() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Show after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Rotate messages every 6 seconds
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % BOTTOM_MESSAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  if (!visible || dismissed) return null
  const msg = BOTTOM_MESSAGES[idx]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9990,
      background: 'var(--dark)', borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '10px 16px', gap: 16, flexWrap: 'wrap',
      animation: 'fadeInUp 0.4s ease',
      boxShadow: '0 -4px 30px rgba(0,0,0,0.4)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', flex: 1, minWidth: 200, textAlign: 'center' }}>
        {msg.text}
      </span>
      <a href={msg.href}
        style={{
          padding: '8px 20px', background: msg.color === 'var(--gold)' ? 'var(--gold)' : 'transparent',
          border: `1px solid ${msg.color}`,
          color: msg.color === 'var(--gold)' ? 'var(--black)' : msg.color,
          fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 2, textDecoration: 'none',
          textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
        }}>
        {msg.cta}
      </a>
      <button onClick={() => setDismissed(true)} style={{
        background: 'none', border: 'none', color: 'var(--text-muted)',
        fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1, flexShrink: 0,
      }}>×</button>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 4. FLOATING WHATSAPP BUTTON
//    Live across every page. Drives direct inquiries — the highest
//    conversion point for B2B leads. Replace with your real WA number.
// ══════════════════════════════════════════════════════════════════════════════

export function WhatsAppCTA() {
  const waNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '2347063509755'
  return (
    <a
      href={`https://wa.me/${waNumber}?text=Hello%20BGVL%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 80, right: 24, zIndex: 9998,
        background: '#25D366', borderRadius: '50%',
        width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.35)', textDecoration: 'none',
        fontSize: 22, transition: 'all 0.3s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.55)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.35)' }}
    >
      💬
    </a>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 5. FOOTER NEWSLETTER BAR (slim, inside footer)
//    Single row within the footer — earns via sponsored email sends.
// ══════════════════════════════════════════════════════════════════════════════

export function FooterNewsletterRow() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Footer Newsletter' }),
      })
    } catch {}
    setDone(true)
  }

  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '20px 0', marginBottom: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 20, flexWrap: 'wrap',
    }}>
      <div>
        <span style={{ fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase' }}>
          📊 Weekly Commodity Prices — Free
        </span>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          Sesame · Shea · Cashew · Petroleum prices every Monday
        </p>
      </div>
      {done ? (
        <span style={{ fontFamily: 'Cinzel,serif', fontSize: 10, color: 'var(--gold)', letterSpacing: 2 }}>✓ SUBSCRIBED</span>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0 }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            style={{
              background: 'var(--dark)', border: '1px solid var(--border)',
              borderRight: 'none', color: 'var(--white)', padding: '10px 14px',
              fontFamily: 'Montserrat,sans-serif', fontSize: 12, outline: 'none', width: 200,
            }}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
          />
          <button type="submit" style={{
            background: 'var(--gold)', color: 'var(--black)', border: 'none',
            padding: '10px 16px', fontFamily: 'Cinzel,serif', fontSize: 9,
            letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
          }}>Subscribe</button>
        </form>
      )}
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 6. SINGLE GOOGLE ADSENSE UNIT
//    One placement only — in the footer above the links.
//    Minimal, doesn't interrupt reading. Replace slot ID after AdSense approval.
// ══════════════════════════════════════════════════════════════════════════════

export function FooterAdUnit() {
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
    <div style={{ textAlign: 'center', marginBottom: 32, padding: '8px 0' }}>
      <p style={{ fontSize: 8, letterSpacing: 3, color: 'rgba(136,136,136,0.25)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', marginBottom: 6 }}>
        Advertisement
      </p>
      {/*
        REPLACE THIS BLOCK with your real AdSense <ins> after approval:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-YOUR_PUB_ID"
          data-ad-slot="YOUR_SLOT_ID"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <div style={{
        height: 60, background: 'rgba(201,168,76,0.02)', border: '1px dashed rgba(201,168,76,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        maxWidth: 728, margin: '0 auto',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(136,136,136,0.2)', fontFamily: 'Cinzel,serif', letterSpacing: 3 }}>
          ADSENSE — 728×60
        </span>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 7. VERIFIED SUPPLIER CTA — lives inside the About section's bullet list
//    One extra bullet that converts readers to paying suppliers.
// ══════════════════════════════════════════════════════════════════════════════

export function VerifiedSupplierInlineCTA() {
  return (
    <a
      href="mailto:ballonholdingsltd@gmail.com?subject=Verified%20Supplier%20Application"
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
        marginTop: 16, border: '1px solid rgba(201,168,76,0.2)',
        background: 'rgba(201,168,76,0.03)', textDecoration: 'none',
        transition: 'all 0.3s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.03)' }}
    >
      <span style={{ color: 'var(--gold)', fontSize: 8 }}>◆</span>
      <div>
        <span style={{ fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>
          Are you a supplier? Get listed as a Verified Partner →
        </span>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
          Reach international buyers through our network · From ₦50,000/mo
        </p>
      </div>
    </a>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 10. VERIFIED PARTNER LOGO STRIP
//     Companies pay ₦30,000–₦80,000/month to have their logo/name appear here.
//     Looks like a trust signal ("Our Partners") — not an ad at all.
//     Wire to a DB or CMS once you have paying clients.
// ══════════════════════════════════════════════════════════════════════════════

const PARTNER_LOGOS = [
  { name: 'Savannah Grains',     initial: 'SG', color: '#C9A84C' },
  { name: 'PetroNorth Energy',   initial: 'PE', color: '#00B4D8' },
  { name: 'Shea Valley Ltd',     initial: 'SV', color: '#C9A84C' },
  { name: 'Lagos Freight Co.',   initial: 'LF', color: '#888' },
  { name: 'Kano Commodities',    initial: 'KC', color: '#C9A84C' },
]

export function PartnerLogoStrip() {
  return (
    <div style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 3, color: 'rgba(136,136,136,0.4)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Trusted Partners
        </span>
        {PARTNER_LOGOS.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5, transition: 'opacity 0.3s', cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.5'}
          >
            <div style={{ width: 24, height: 24, background: `${p.color}22`, border: `1px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cinzel,serif', fontSize: 8, color: p.color, fontWeight: 700 }}>{p.initial}</div>
            <span style={{ fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{p.name}</span>
          </div>
        ))}
        {/* Paid placement CTA */}
        <a href="mailto:ballonholdingsltd@gmail.com?subject=Partner%20Logo%20Placement%20Enquiry"
          style={{ fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 2, color: 'rgba(201,168,76,0.35)', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px dashed rgba(201,168,76,0.2)', paddingBottom: 1, whiteSpace: 'nowrap' }}>
          + Your Brand
        </a>
      </div>
    </div>
  )
}
//    Small paid report card, feels like a content resource not an ad.
// ══════════════════════════════════════════════════════════════════════════════

export function ReportDownloadCard() {
  return (
    <div style={{
      border: '1px solid var(--border)', background: 'var(--dark3)',
      padding: '20px 20px', marginTop: 28,
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>📊</span>
        <div>
          <div style={{ fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 4 }}>
            New Report · Q2 2026
          </div>
          <h4 style={{ fontFamily: 'Cinzel,serif', fontSize: 13, fontWeight: 700, color: 'var(--white)', marginBottom: 6, lineHeight: 1.4 }}>
            Nigeria Commodity Export Price Index
          </h4>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
            18-page report covering sesame, shea, cashew &amp; petroleum prices, demand signals, and quarterly outlook.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Cinzel,serif', fontSize: 16, fontWeight: 900, color: 'var(--gold)' }}>₦8,000</span>
            <a href="mailto:ballonholdingsltd@gmail.com?subject=Purchase%20Q2%202026%20Price%20Report"
              style={{
                padding: '7px 16px', background: 'var(--gold)', color: 'var(--black)',
                fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 2, textDecoration: 'none',
                textTransform: 'uppercase', fontWeight: 700,
              }}>Buy Report</a>
          </div>
        </div>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// 9. PRIORITY ORDER UPSELL — sits inside the Order page / Order Form
//    After the main form, a subtle "Priority Processing" option.
//    Revenue: ₦15,000–₦30,000 per priority order.
// ══════════════════════════════════════════════════════════════════════════════

export function PriorityOrderUpsell() {
  const [selected, setSelected] = useState(false)

  return (
    <div style={{
      marginTop: 16, padding: '16px 18px',
      border: `1px solid ${selected ? 'rgba(201,168,76,0.5)' : 'var(--border)'}`,
      background: selected ? 'rgba(201,168,76,0.04)' : 'transparent',
      cursor: 'pointer', transition: 'all 0.2s',
    }}
      onClick={() => setSelected(s => !s)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 16, height: 16, border: `1px solid ${selected ? 'var(--gold)' : 'var(--border)'}`,
          background: selected ? 'var(--gold)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s',
        }}>
          {selected && <span style={{ color: 'var(--black)', fontSize: 10, fontWeight: 900 }}>✓</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>
              ⚡ Priority Processing — +₦15,000
            </span>
            <span style={{
              fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 2,
              color: selected ? 'var(--black)' : 'var(--text-muted)',
              background: selected ? 'var(--gold)' : 'transparent',
              border: `1px solid ${selected ? 'var(--gold)' : 'var(--border)'}`,
              padding: '2px 8px', textTransform: 'uppercase',
            }}>
              {selected ? 'ADDED' : 'OPTIONAL'}
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
            Your inquiry is reviewed within 4 hours (vs. standard 48h). Dedicated ops team, same-day quote.
          </p>
        </div>
      </div>
    </div>
  )
}
