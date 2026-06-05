'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { WhatsAppCTA, StickyBottomBar } from '@/components/SubtleMonetization'

// ─────────────────────────────────────────────────────────────────────────────
// TRADE CALCULATOR PAGE — free tool, earns via affiliate lead CTAs at bottom
// Users get real value; affiliates pay you per qualified referral sent.
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { label: 'Sesame Seeds',  basePrice: 1420, unit: 'MT' },
  { label: 'Shea Nuts',     basePrice: 440,  unit: 'MT' },
  { label: 'Cashew (RCN)',  basePrice: 1850, unit: 'MT' },
  { label: 'Shea Butter',   basePrice: 980,  unit: 'MT' },
  { label: 'Hibiscus',      basePrice: 2100, unit: 'MT' },
  { label: 'AGO (Diesel)',  basePrice: 680,  unit: 'MT' },
  { label: 'Bitumen 60/70', basePrice: 520,  unit: 'MT' },
]

const DESTINATIONS = [
  { label: 'Europe (FOB Lagos)',     freightRate: 95,  duty: 0 },
  { label: 'USA (CIF)',              freightRate: 140, duty: 0 },
  { label: 'India (CFR)',            freightRate: 75,  duty: 30 },
  { label: 'China (CFR)',            freightRate: 85,  duty: 15 },
  { label: 'Middle East (FOB)',      freightRate: 65,  duty: 5  },
  { label: 'UK (CIF)',               freightRate: 110, duty: 0  },
  { label: 'West Africa (Trucking)', freightRate: 40,  duty: 10 },
]

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default function TradeCalculatorPage() {
  const [product, setProduct] = useState(0)
  const [qty, setQty] = useState(25)
  const [dest, setDest] = useState(0)
  const [incoterm, setIncoterm] = useState<'FOB'|'CIF'|'CFR'>('CIF')
  const [insurance, setInsurance] = useState(true)
  const [inspection, setInspection] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const p = PRODUCTS[product]
  const d = DESTINATIONS[dest]

  const productValue = p.basePrice * qty
  const freightCost  = d.freightRate * qty
  const insuranceCost = insurance ? productValue * 0.006 : 0
  const inspectionCost = inspection ? 850 : 0
  const documentCost = 450 // NEPC, phyto, C of O
  const dutyEstimate = incoterm === 'CIF' ? (productValue + freightCost) * (d.duty / 100) : 0
  const total = productValue + freightCost + insuranceCost + inspectionCost + documentCost + dutyEstimate

  const inp = {
    background: 'var(--dark3)', border: '1px solid rgba(201,168,76,0.2)',
    color: 'var(--white)', padding: '11px 14px', fontFamily: 'Montserrat,sans-serif',
    fontSize: 13, width: '100%', outline: 'none',
  } as React.CSSProperties

  const sel = { ...inp, cursor: 'pointer' } as React.CSSProperties

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--black)' }}>
        {/* Header */}
        <section style={{ padding: 'clamp(40px,6vw,80px) 20px', background: 'var(--dark2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="section-label">Free Tool</div>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, marginBottom: 12 }}>
              Export <span style={{ color: 'var(--gold)' }}>Cost Calculator</span>
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Estimate your total landed cost — product value, freight, insurance, documentation &amp; duties — in one step.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section style={{ padding: 'clamp(30px,5vw,60px) 20px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 32 }}>

            {/* Inputs */}
            <div>
              <h2 style={{ fontFamily: 'Cinzel,serif', fontSize: 14, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Your Shipment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div>
                  <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Product</label>
                  <select value={product} onChange={e => { setProduct(+e.target.value); setCalculated(false) }} style={sel}>
                    {PRODUCTS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Quantity (Metric Tonnes)</label>
                  <input type="number" min={1} max={10000} value={qty} onChange={e => { setQty(+e.target.value); setCalculated(false) }} style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Destination</label>
                  <select value={dest} onChange={e => { setDest(+e.target.value); setCalculated(false) }} style={sel}>
                    {DESTINATIONS.map((d, i) => <option key={i} value={i}>{d.label}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Incoterm</label>
                  <div style={{ display: 'flex', gap: 0 }}>
                    {(['FOB', 'CIF', 'CFR'] as const).map(t => (
                      <button key={t} onClick={() => { setIncoterm(t); setCalculated(false) }} style={{
                        flex: 1, padding: '11px 0', border: '1px solid rgba(201,168,76,0.2)',
                        borderRight: t !== 'CFR' ? 'none' : '1px solid rgba(201,168,76,0.2)',
                        background: incoterm === t ? 'var(--gold)' : 'var(--dark3)',
                        color: incoterm === t ? 'var(--black)' : 'var(--text-muted)',
                        fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: 2, cursor: 'pointer',
                      }}>{t}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Include Marine Cargo Insurance', key: 'insurance', val: insurance, set: setInsurance },
                    { label: 'Include Pre-shipment Inspection', key: 'inspection', val: inspection, set: setInspection },
                  ].map(({ label, key, val, set }) => (
                    <div key={key} onClick={() => { set(!val); setCalculated(false) }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '10px 12px', border: '1px solid var(--border)', background: val ? 'rgba(201,168,76,0.04)' : 'transparent' }}>
                      <div style={{ width: 14, height: 14, border: `1px solid ${val ? 'var(--gold)' : 'var(--border)'}`, background: val ? 'var(--gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {val && <span style={{ color: 'var(--black)', fontSize: 9, fontWeight: 900 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setCalculated(true)} style={{
                  background: 'var(--gold)', color: 'var(--black)', border: 'none',
                  padding: '14px 0', fontFamily: 'Cinzel,serif', fontSize: 11,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
                }}>Calculate Cost →</button>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 style={{ fontFamily: 'Cinzel,serif', fontSize: 14, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Cost Breakdown</h2>
              <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '24px' }}>
                {!calculated ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontFamily: 'Cormorant Garamond,serif', fontSize: 17, fontStyle: 'italic' }}>
                    Fill in your shipment details and click Calculate
                  </div>
                ) : (
                  <div>
                    {[
                      ['Product Value', `$${fmt(productValue)}`, false],
                      ['Freight Estimate', `$${fmt(freightCost)}`, false],
                      ...(insurance ? [['Marine Insurance (0.6%)', `$${fmt(insuranceCost)}`, false] as [string, string, boolean]] : []),
                      ...(inspection ? [['Pre-shipment Inspection', `$${fmt(inspectionCost)}`, false] as [string, string, boolean]] : []),
                      ['Export Documentation', `$${fmt(documentCost)}`, false],
                      ...(dutyEstimate > 0 ? [['Import Duty (destination)', `$${fmt(dutyEstimate)}`, false] as [string, string, boolean]] : []),
                    ].map(([label, value, highlight]) => (
                      <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                        <span style={{ color: 'var(--white)', fontFamily: 'Cinzel,serif' }}>{value}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0 0', fontSize: 15, marginTop: 4 }}>
                      <span style={{ fontFamily: 'Cinzel,serif', letterSpacing: 2, color: 'var(--gold)' }}>TOTAL LANDED COST</span>
                      <span style={{ fontFamily: 'Cinzel,serif', fontSize: 20, fontWeight: 900, color: 'var(--gold)' }}>${fmt(total)}</span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Per MT: ${fmt(total / qty)} · Incoterm: {incoterm}
                    </div>
                    <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
                        These are estimates. Get an exact quote from BGVL:
                      </p>
                      <a href={`mailto:ballonholdingsltd@gmail.com?subject=Quote%20Request%3A%20${qty}MT%20${PRODUCTS[product].label}%20to%20${DESTINATIONS[dest].label}&body=Quantity%3A%20${qty}MT%0AProduct%3A%20${PRODUCTS[product].label}%0ADestination%3A%20${DESTINATIONS[dest].label}%0AIncoterm%3A%20${incoterm}`}
                        style={{
                          display: 'block', textAlign: 'center', padding: '12px 0',
                          background: 'var(--gold)', color: 'var(--black)',
                          fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 2,
                          textDecoration: 'none', textTransform: 'uppercase', fontWeight: 700,
                        }}>Request Exact Quote →</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: 10, color: 'rgba(136,136,136,0.4)', marginTop: 12, lineHeight: 1.6 }}>
                * Estimates only. Freight rates fluctuate. Duties depend on HS code and destination regulations. Inspection costs vary by certifying body.
              </p>
            </div>
          </div>
        </section>

        {/* Affiliate service CTAs — this earns referral commissions */}
        <section style={{ padding: 'clamp(30px,5vw,60px) 20px', background: 'var(--dark2)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 3, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20, textAlign: 'center' }}>
              — Recommended Services —
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
              {[
                { icon: '🚢', label: 'Freight Forwarding',    desc: 'Get quotes from licensed NFF-approved freight forwarders', cta: 'Get Freight Quotes', href: 'mailto:ballonholdingsltd@gmail.com?subject=Freight%20Referral' },
                { icon: '🛡️', label: 'Cargo Insurance',       desc: 'Marine all-risk coverage from NIA-certified underwriters', cta: 'Get Insurance Quote', href: 'mailto:ballonholdingsltd@gmail.com?subject=Insurance%20Referral' },
                { icon: '📄', label: 'Export Documentation',   desc: 'Full NXP, Form M, phytosanitary & NEPC support', cta: 'Get Docs Help', href: 'mailto:ballonholdingsltd@gmail.com?subject=Documentation%20Referral' },
                { icon: '🏦', label: 'Trade Finance / LC',     desc: 'Letter of Credit and payment guarantee facilitation', cta: 'Explore Finance', href: 'mailto:ballonholdingsltd@gmail.com?subject=Trade%20Finance%20Referral' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--dark3)', border: '1px solid var(--border)', padding: '20px 16px', transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                >
                  <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{s.icon}</span>
                  <div style={{ fontFamily: 'Cinzel,serif', fontSize: 11, color: 'var(--gold)', letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>{s.desc}</p>
                  <a href={s.href} style={{ fontSize: 10, color: 'var(--gold)', textDecoration: 'none', fontFamily: 'Cinzel,serif', letterSpacing: 1 }}>{s.cta} →</a>
                </div>
              ))}
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
