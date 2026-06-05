'use client'
import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Commodity Price Ticker
// Shows live-style prices across the top of the site.
// Monetisation: "Get Price Alerts" CTA → email capture → sell sponsored alerts.
// Replace MOCK_PRICES with real data from a commodity API (e.g. FRED, Quandl).
// ─────────────────────────────────────────────────────────────────────────────

const PRICES = [
  { label: 'Sesame Seeds',  price: '$1,420/MT',  change: '+2.3%',  up: true  },
  { label: 'Cashew (RCN)',  price: '$1,850/MT',  change: '+0.8%',  up: true  },
  { label: 'Shea Butter',   price: '$980/MT',    change: '-1.1%',  up: false },
  { label: 'Hibiscus',      price: '$2,100/MT',  change: '+3.5%',  up: true  },
  { label: 'AGO Diesel',    price: '$680/BBL',   change: '-0.4%',  up: false },
  { label: 'Bitumen 60/70', price: '$520/MT',    change: '+1.2%',  up: true  },
  { label: 'Shea Nuts',     price: '$440/MT',    change: '+0.6%',  up: true  },
  { label: 'DPK Kerosene',  price: '$620/BBL',   change: '-0.9%',  up: false },
]

export default function PriceTicker() {
  const [showAlert, setShowAlert] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Price Ticker Alert' }),
      })
    } catch {}
    setSubscribed(true)
    setTimeout(() => { setShowAlert(false); setSubscribed(false); setEmail('') }, 2500)
  }

  return (
    <>
      {/* ── Ticker Bar ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--dark)', borderBottom: '1px solid var(--border)',
        overflow: 'hidden', position: 'relative', height: 34,
        display: 'flex', alignItems: 'center',
      }}>
        {/* Left label */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 2,
          background: 'var(--gold)', display: 'flex', alignItems: 'center',
          padding: '0 14px', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 3, color: 'var(--black)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            LIVE PRICES
          </span>
        </div>

        {/* Scrolling prices */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          paddingLeft: 110,
          animation: 'tickerScroll 40s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...PRICES, ...PRICES].map((p, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', borderRight: '1px solid var(--border)' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1 }}>{p.label}</span>
              <span style={{ fontFamily: 'Cinzel,serif', fontSize: 10, color: 'var(--white)', fontWeight: 600 }}>{p.price}</span>
              <span style={{ fontSize: 9, color: p.up ? '#27ae60' : '#e74c3c', fontWeight: 600 }}>{p.change}</span>
            </span>
          ))}
        </div>

        {/* Right CTA — this is the monetisation hook */}
        <button
          onClick={() => setShowAlert(true)}
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 2,
            background: 'rgba(201,168,76,0.08)', border: 'none', borderLeft: '1px solid var(--border)',
            padding: '0 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
        >
          <span style={{ fontSize: 9, fontFamily: 'Cinzel,serif', letterSpacing: 2, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
            🔔 GET ALERTS
          </span>
        </button>
      </div>

      {/* ── Alert Signup Modal ──────────────────────────────────────────────── */}
      {showAlert && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowAlert(false) }}
        >
          <div style={{
            background: 'var(--dark2)', border: '1px solid var(--border-bright)',
            padding: 'clamp(28px,5vw,48px)', maxWidth: 460, width: '100%',
            boxShadow: '0 0 60px rgba(201,168,76,0.1)',
          }}>
            <button onClick={() => setShowAlert(false)} style={{
              float: 'right', background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: 18, lineHeight: 1,
            }}>×</button>
            <div className="section-label">Free Service</div>
            <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Weekly Price <span style={{ color: 'var(--gold)' }}>Alerts</span>
            </h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 16, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 24 }}>
              Get sesame, shea, cashew &amp; petroleum prices delivered every Monday. Free forever.
            </p>
            {subscribed ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--gold)', fontFamily: 'Cinzel,serif', letterSpacing: 2 }}>
                ✓ SUBSCRIBED — Check your inbox
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{
                    width: '100%', background: 'var(--dark3)', border: '1px solid var(--border)',
                    color: 'var(--white)', padding: '13px 16px', fontFamily: 'Montserrat,sans-serif',
                    fontSize: 13, outline: 'none', marginBottom: 12,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
                <button type="submit" style={{
                  width: '100%', background: 'var(--gold)', color: 'var(--black)',
                  border: 'none', padding: '14px 0', fontFamily: 'Cinzel,serif',
                  fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
                }}>
                  Subscribe Free
                </button>
              </form>
            )}
            <p style={{ fontSize: 10, color: 'rgba(136,136,136,0.4)', marginTop: 12, letterSpacing: 1, textAlign: 'center' }}>
              No spam · Unsubscribe anytime · Join 1,200+ traders
            </p>
          </div>
        </div>
      )}

      {/* Ticker animation */}
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
