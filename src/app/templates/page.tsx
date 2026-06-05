'use client'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { WhatsAppCTA, StickyBottomBar } from '@/components/SubtleMonetization'

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT TEMPLATES STORE
// Sell downloadable PDF/Word export document templates.
// Revenue: ₦3,000–₦15,000 per template. Every new exporter needs these.
// Delivery: manual via email at first → automate with Flutterwave + email.
// ─────────────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    icon: '📋',
    title: 'Proforma Invoice Template',
    category: 'Trade Finance',
    format: 'Word (.docx) + PDF',
    desc: 'Professional proforma invoice accepted by Nigerian banks for Form M processing and LC establishment.',
    price: '₦3,000', usd: '$2',
    includes: ['Editable .docx and PDF', 'Correct HS code fields', 'Incoterm clauses', 'Bank-accepted format'],
    popular: false,
  },
  {
    icon: '🌿',
    title: 'Phytosanitary Certificate Guide',
    category: 'Agricultural Export',
    format: 'PDF Guide + Checklist',
    desc: 'Step-by-step guide to obtaining NAQS phytosanitary certificates for sesame, shea, cashew and hibiscus exports.',
    price: '₦5,000', usd: '$3',
    includes: ['Application checklist', 'NAQS contact list by state', 'Fumigation requirements', 'Sample filled certificate'],
    popular: true,
  },
  {
    icon: '📄',
    title: 'NXP (Export Proceeds) Template Pack',
    category: 'CBN Compliance',
    format: '3 Word templates',
    desc: 'Complete NXP form pack for CBN-compliant export proceeds declaration. Pre-filled with common commodity data.',
    price: '₦6,000', usd: '$4',
    includes: ['NXP Form template', 'Repatriation schedule', 'Bank cover letter template', 'CBN compliance notes'],
    popular: false,
  },
  {
    icon: '🏛️',
    title: 'NEPC Export Registration Guide',
    category: 'Registration',
    format: 'PDF Guide (22 pages)',
    desc: 'Full guide to registering as a Nigerian exporter with NEPC. Documents list, fees, timelines and portal walkthrough.',
    price: '₦8,000', usd: '$5',
    includes: ['NEPC portal walkthrough', 'Required documents list', '2026 fee schedule', 'Common rejection reasons'],
    popular: false,
  },
  {
    icon: '📦',
    title: 'Bill of Lading & Packing List Pack',
    category: 'Shipping Docs',
    format: '4 Word templates',
    desc: 'Standard and negotiable bill of lading templates, packing list, and weight certificate. Accepted by major shipping lines.',
    price: '₦7,000', usd: '$5',
    includes: ['B/L template (negotiable)', 'B/L template (straight)', 'Packing list template', 'Weight/quantity certificate'],
    popular: false,
  },
  {
    icon: '⭐',
    title: 'Complete Export Starter Pack',
    category: 'Bundle — Best Value',
    format: 'All formats included',
    desc: 'Every document you need to start exporting from Nigeria. All templates, guides and checklists in one ZIP download.',
    price: '₦15,000', usd: '$10',
    includes: ['All 5 packs above', 'Export process flowchart', 'Commodity buyer contacts guide', '1 email Q&A with BGVL team'],
    popular: false,
    bundle: true,
  },
]

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--black)' }}>

        {/* Header */}
        <section style={{ padding: 'clamp(40px,6vw,80px) 20px', background: 'var(--dark2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="section-label">Digital Products</div>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, marginBottom: 12 }}>
              Export <span style={{ color: 'var(--gold)' }}>Document Templates</span>
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: 680 }}>
              Professional Nigerian export document templates used by verified exporters. Instant delivery to your inbox.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
              {['✓ Instant email delivery', '✓ NEPC & CBN compliant', '✓ Editable Word + PDF', '✓ 2026 updated versions'].map(t => (
                <span key={t} style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'Cinzel,serif', letterSpacing: 1 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Templates grid */}
        <section style={{ padding: 'clamp(30px,5vw,60px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
            {TEMPLATES.map((t, i) => (
              <div key={i} style={{
                background: t.bundle ? 'var(--dark3)' : 'var(--dark2)',
                border: `1px solid ${t.bundle ? 'rgba(201,168,76,0.5)' : t.popular ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
                padding: '28px 22px', position: 'relative', transition: 'transform 0.3s',
                boxShadow: t.bundle ? '0 0 30px rgba(201,168,76,0.07)' : 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                {t.popular && !t.bundle && (
                  <div style={{ position: 'absolute', top: -10, right: 16, background: 'var(--gold)', color: 'var(--black)', padding: '2px 12px', fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 2, fontWeight: 700 }}>POPULAR</div>
                )}
                {t.bundle && (
                  <div style={{ position: 'absolute', top: -10, right: 16, background: 'var(--gold)', color: 'var(--black)', padding: '2px 12px', fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 2, fontWeight: 700 }}>BEST VALUE</div>
                )}

                <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{t.icon}</span>
                <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', fontFamily: 'Cinzel,serif', textTransform: 'uppercase', marginBottom: 6 }}>
                  {t.category} · {t.format}
                </div>
                <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 14, fontWeight: 700, color: t.bundle ? 'var(--gold)' : 'var(--white)', marginBottom: 10, lineHeight: 1.3 }}>{t.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>{t.desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                  {t.includes.map((item, j) => (
                    <li key={j} style={{ fontSize: 11, color: 'var(--text-muted)', padding: '5px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--gold)', fontSize: 7, flexShrink: 0 }}>◆</span> {item}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <span style={{ fontFamily: 'Cinzel,serif', fontSize: 20, fontWeight: 900, color: 'var(--gold)' }}>{t.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>≈ {t.usd}</span>
                  </div>
                  <a href={`mailto:ballonholdingsltd@gmail.com?subject=Purchase%20Template%3A%20${encodeURIComponent(t.title)}&body=I%20would%20like%20to%20purchase%20the%20%22${encodeURIComponent(t.title)}%22%20for%20${t.price}.%0A%0APlease%20send%20payment%20instructions.`}
                    style={{
                      padding: '10px 18px',
                      background: t.bundle ? 'var(--gold)' : 'transparent',
                      color: t.bundle ? 'var(--black)' : 'var(--gold)',
                      border: `1px solid ${t.bundle ? 'var(--gold)' : 'var(--border)'}`,
                      fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 2,
                      textDecoration: 'none', textTransform: 'uppercase', fontWeight: t.bundle ? 700 : 400,
                      flexShrink: 0,
                    }}>Buy Now →</a>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ maxWidth: 1100, margin: '40px auto 0', background: 'var(--dark2)', border: '1px solid var(--border)', padding: '24px 28px' }}>
            <div style={{ fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>How it works</div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                ['1', 'Click "Buy Now"', 'It opens an email to us with your selected template'],
                ['2', 'We send payment details', 'Bank transfer or mobile money — takes 10 minutes'],
                ['3', 'Receive your download', 'Files delivered to your inbox within 2 hours'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1, minWidth: 200 }}>
                  <span style={{ fontFamily: 'Cinzel,serif', fontSize: 20, color: 'var(--gold)', fontWeight: 900, flexShrink: 0 }}>{num}</span>
                  <div>
                    <div style={{ fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: 1, color: 'var(--white)', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
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
