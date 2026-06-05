'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { WhatsAppCTA, StickyBottomBar } from '@/components/SubtleMonetization'

// ─────────────────────────────────────────────────────────────────────────────
// REFERRAL PROGRAM PAGE
// Users refer buyers/suppliers to BGVL. When a deal closes, they earn a %.
// You earn on every closed deal; referred buyers earn better rates.
// This creates a viral growth loop at zero marketing cost.
// ─────────────────────────────────────────────────────────────────────────────

export default function ReferralPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', referralType: 'buyer', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const [submitting, setSubmitting] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {}
    setSubmitted(true)
    setSubmitting(false)
  }

  const inp = {
    background: 'var(--dark3)', border: '1px solid rgba(201,168,76,0.2)',
    color: 'var(--white)', padding: '12px 14px', fontFamily: 'Montserrat,sans-serif',
    fontSize: 13, width: '100%', outline: 'none',
  } as React.CSSProperties

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--black)' }}>

        {/* Header */}
        <section style={{ padding: 'clamp(40px,6vw,80px) 20px', background: 'var(--dark2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Earn With BGVL</div>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, marginBottom: 12 }}>
              Refer &amp; <span style={{ color: 'var(--gold)' }}>Earn</span>
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: 600, margin: '0 auto 32px' }}>
              Know an importer, exporter, or trader? Refer them to BGVL and earn a commission on every closed deal.
            </p>
            {/* Commission tiers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, maxWidth: 700, margin: '0 auto' }}>
              {[
                { type: 'Buyer Referral',    commission: '1.5%', desc: 'of total order value when deal closes', icon: '🤝' },
                { type: 'Supplier Referral', commission: '₦30,000', desc: 'flat fee when supplier gets listed', icon: '📦' },
                { type: 'Agent Referral',    commission: '2.0%', desc: 'recurring on all orders for 6 months', icon: '⭐' },
              ].map((tier, i) => (
                <div key={i} style={{ background: 'var(--dark3)', border: i === 2 ? '1px solid rgba(201,168,76,0.4)' : '1px solid var(--border)', padding: '22px 18px' }}>
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 10 }}>{tier.icon}</span>
                  <div style={{ fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>{tier.type}</div>
                  <div style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 900, color: 'var(--gold)', marginBottom: 6 }}>{tier.commission}</div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works + Form */}
        <section style={{ padding: 'clamp(30px,5vw,60px) 20px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>

            {/* How it works */}
            <div>
              <h2 style={{ fontFamily: 'Cinzel,serif', fontSize: 14, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>How It Works</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['01', 'Submit Referral', 'Fill in the form with your contact and the buyer/supplier you\'re referring.'],
                  ['02', 'We Follow Up', 'Our team contacts your referral within 48 hours and starts the relationship.'],
                  ['03', 'Deal Closes', 'When the buyer places their first order or supplier gets listed, you qualify for your commission.'],
                  ['04', 'You Get Paid', 'Commission paid via bank transfer within 5 business days of order confirmation.'],
                ].map(([num, title, desc], i, arr) => (
                  <div key={num} style={{ display: 'flex', gap: 18, paddingBottom: i < arr.length - 1 ? 28 : 0, position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 36, height: 36, border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cinzel,serif', fontSize: 11, color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>{num}</div>
                      {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 8 }} />}
                    </div>
                    <div style={{ paddingBottom: 8 }}>
                      <div style={{ fontFamily: 'Cinzel,serif', fontSize: 13, fontWeight: 700, color: 'var(--white)', marginBottom: 6 }}>{title}</div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: '18px' }}>
                <div style={{ fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>Example Earnings</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  You refer a buyer who orders 50MT of sesame seeds at $1,420/MT = $71,000 order.<br />
                  Your 1.5% commission = <span style={{ color: 'var(--gold)', fontWeight: 700 }}>$1,065 (≈ ₦1.6M)</span>
                </p>
              </div>
            </div>

            {/* Referral Form */}
            <div>
              <h2 style={{ fontFamily: 'Cinzel,serif', fontSize: 14, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Submit a Referral</h2>
              {submitted ? (
                <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.3)', padding: '40px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: 'Cinzel,serif', fontSize: 14, color: 'var(--gold)', letterSpacing: 2, marginBottom: 8 }}>REFERRAL RECEIVED</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>We&apos;ll follow up with your referral within 48 hours and confirm your commission eligibility.</p>
                </div>
              ) : (
                <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { label: 'Your Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                    { label: 'Your Email', key: 'email', type: 'email', placeholder: 'you@email.com' },
                    { label: 'Your Phone / WhatsApp', key: 'phone', type: 'tel', placeholder: '+234 800 000 0000' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required style={inp}
                        value={(form as Record<string, string>)[f.key]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Type of Referral</label>
                    <select value={form.referralType} onChange={e => setForm(prev => ({ ...prev, referralType: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                      <option value="buyer">Buyer (importing from Nigeria)</option>
                      <option value="supplier">Supplier (wants to export via BGVL)</option>
                      <option value="agent">Trade Agent / Broker</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Tell Us About Them</label>
                    <textarea rows={4} placeholder="Name, company, what they're looking for, how you know them..." required style={{ ...inp, resize: 'vertical' }}
                      value={form.notes}
                      onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                    />
                  </div>
                  <button type="submit" disabled={submitting} style={{
                    background: 'var(--gold)', color: 'var(--black)', border: 'none',
                    padding: '14px 0', fontFamily: 'Cinzel,serif', fontSize: 11,
                    letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}>{submitting ? 'Sending...' : 'Submit Referral →'}</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppCTA />
      <StickyBottomBar />
    </>
  )
}
