'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { WhatsAppCTA, StickyBottomBar } from '@/components/SubtleMonetization'

// ─────────────────────────────────────────────────────────────────────────────
// TRADE JOB BOARD
// Companies post trade/logistics/export jobs. Charge ₦15,000–₦50,000/posting.
// The page attracts a relevant audience (traders, shippers, logistics pros)
// which increases ad revenue and newsletter sign-up rates too.
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_JOBS = [
  {
    title: 'Export Documentation Officer',
    company: 'Agro Allied Nigeria Ltd',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦180,000–₦250,000/mo',
    tags: ['Export Docs', 'NXP', 'NEPC'],
    posted: '2 days ago',
    featured: true,
    desc: 'Seeking an experienced export documentation officer to handle NXP forms, phytosanitary certs, and NEPC compliance for agricultural commodity exports.',
  },
  {
    title: 'Commodity Trader — Agricultural',
    company: 'Green Valley Exports',
    location: 'Abuja, Nigeria',
    type: 'Full-time',
    salary: '₦300,000–₦500,000/mo',
    tags: ['Trading', 'Sesame', 'Commodities'],
    posted: '4 days ago',
    featured: false,
    desc: 'We are looking for an experienced agricultural commodity trader to manage sesame seed, cashew and shea nut procurement and international sales.',
  },
  {
    title: 'Freight & Logistics Coordinator',
    company: 'Savannah Logistics',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    salary: '₦200,000–₦320,000/mo',
    tags: ['Freight', 'Shipping', 'Logistics'],
    posted: '1 week ago',
    featured: false,
    desc: 'Coordinate port operations, shipping lines, and customs clearance for petroleum product exports from Bonny Terminal.',
  },
  {
    title: 'Trade Finance Analyst',
    company: 'PetroNorth Energy',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦400,000–₦600,000/mo',
    tags: ['Trade Finance', 'LC', 'Banking'],
    posted: '1 week ago',
    featured: false,
    desc: 'Manage Letters of Credit, bank guarantees, and trade finance instruments for petroleum exports. 3+ years trade finance experience required.',
  },
  {
    title: 'Agricultural Produce Sourcing Agent',
    company: 'Kano Commodities Ltd',
    location: 'Kano, Nigeria',
    type: 'Contract',
    salary: 'Commission-based',
    tags: ['Sourcing', 'Procurement', 'Agri'],
    posted: '2 weeks ago',
    featured: false,
    desc: 'Source bulk shea nuts, sesame seeds and hibiscus from farmers in Kano, Zamfara and Kebbi states. Must have existing supplier network.',
  },
]

export default function JobsPage() {
  const [showPostModal, setShowPostModal] = useState(false)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--black)' }}>

        {/* Header */}
        <section style={{ padding: 'clamp(40px,6vw,80px) 20px', background: 'var(--dark2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div className="section-label">Trade Careers</div>
              <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 700, marginBottom: 12 }}>
                Nigeria <span style={{ color: 'var(--gold)' }}>Trade Job Board</span>
              </h1>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 17, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Roles in export, logistics, freight, trade finance &amp; commodities
              </p>
            </div>
            {/* Post a job CTA — the main revenue driver */}
            <button onClick={() => setShowPostModal(true)} style={{
              background: 'var(--gold)', color: 'var(--black)', border: 'none',
              padding: '14px 28px', fontFamily: 'Cinzel,serif', fontSize: 11,
              letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>+ Post a Job — ₦15,000</button>
          </div>
        </section>

        {/* Job Listings */}
        <section style={{ padding: 'clamp(30px,5vw,60px) 20px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{SAMPLE_JOBS.length} open positions</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['All', 'Full-time', 'Contract', 'Remote'].map(f => (
                  <button key={f} style={{
                    padding: '6px 14px', background: f === 'All' ? 'var(--gold)' : 'transparent',
                    color: f === 'All' ? 'var(--black)' : 'var(--text-muted)',
                    border: '1px solid var(--border)', fontFamily: 'Cinzel,serif', fontSize: 9,
                    letterSpacing: 2, cursor: 'pointer', textTransform: 'uppercase',
                  }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SAMPLE_JOBS.map((job, i) => (
                <div key={i} style={{
                  background: job.featured ? 'var(--dark3)' : 'var(--dark2)',
                  border: `1px solid ${job.featured ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`,
                  padding: '22px 24px', transition: 'all 0.3s',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: 20, flexWrap: 'wrap',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = job.featured ? 'rgba(201,168,76,0.4)' : 'var(--border)'}
                >
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      {job.featured && (
                        <span style={{ background: 'var(--gold)', color: 'var(--black)', padding: '2px 8px', fontFamily: 'Cinzel,serif', fontSize: 7, letterSpacing: 2, fontWeight: 700 }}>FEATURED</span>
                      )}
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1 }}>{job.posted}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: 'var(--gold)' }}>{job.company}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {job.location}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>🕐 {job.type}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{job.desc}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {job.tags.map(tag => (
                        <span key={tag} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '3px 10px', fontFamily: 'Cinzel,serif', fontSize: 8, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'Cinzel,serif', fontSize: 13, color: 'var(--gold)', marginBottom: 12 }}>{job.salary}</div>
                    <a href={`mailto:ballonholdingsltd@gmail.com?subject=Job%20Application%3A%20${encodeURIComponent(job.title)}%20at%20${encodeURIComponent(job.company)}`}
                      style={{
                        display: 'inline-block', padding: '9px 18px',
                        background: 'transparent', border: '1px solid var(--border)',
                        color: 'var(--gold)', fontFamily: 'Cinzel,serif', fontSize: 9,
                        letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--black)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                    >Apply →</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Post a job CTA at bottom */}
            <div style={{ marginTop: 32, background: 'var(--dark2)', border: '1px solid var(--border)', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'Cinzel,serif', fontSize: 12, letterSpacing: 2, color: 'var(--gold)', marginBottom: 4 }}>HIRING IN TRADE OR LOGISTICS?</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Reach Nigeria&apos;s top commodity traders, exporters and freight professionals.</p>
                <div style={{ display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
                  {[['Standard Post', '₦15,000', '30 days'],['Featured Post', '₦30,000', '30 days + top placement'],['Bundle (3 jobs)', '₦35,000', 'Best value']].map(([tier, price, note]) => (
                    <div key={tier} style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--white)' }}>{tier}:</span> <span style={{ color: 'var(--gold)' }}>{price}</span> — {note}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowPostModal(true)} style={{
                background: 'var(--gold)', color: 'var(--black)', border: 'none',
                padding: '12px 24px', fontFamily: 'Cinzel,serif', fontSize: 10,
                letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>Post a Job</button>
            </div>
          </div>
        </section>
      </main>

      {/* Post Job Modal */}
      {showPostModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setShowPostModal(false) }}>
          <div style={{ background: 'var(--dark2)', border: '1px solid var(--border-bright)', padding: '36px', maxWidth: 500, width: '100%', position: 'relative' }}>
            <button onClick={() => setShowPostModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            <div className="section-label">Post a Job</div>
            <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>List a <span style={{ color: 'var(--gold)' }}>Trade Job</span></h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
              Send us your job details and we&apos;ll have your listing live within 24 hours. Choose your plan below:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[['Standard', '₦15,000', '30-day listing'], ['Featured', '₦30,000', 'Top placement + highlighted for 30 days'], ['Bundle', '₦35,000', '3 job listings, any roles']].map(([tier, price, desc]) => (
                <div key={tier} style={{ padding: '14px 16px', border: '1px solid var(--border)', background: 'var(--dark3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <span style={{ fontFamily: 'Cinzel,serif', fontSize: 12, color: 'var(--gold)' }}>{tier}</span>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</p>
                  </div>
                  <a href={`mailto:ballonholdingsltd@gmail.com?subject=Job%20Board%20Posting%3A%20${tier}%20Plan%20-%20${price}`}
                    style={{ padding: '8px 16px', background: 'var(--gold)', color: 'var(--black)', fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {price}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppCTA />
      <StickyBottomBar />
    </>
  )
}
