import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/newsletter
// Saves subscriber email to Brevo contact list (List ID 2 by default)
// Also pings Telegram so you know someone subscribed
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const brevoKey = process.env.BREVO_API_KEY
    if (!brevoKey) {
      console.error('[NEWSLETTER] BREVO_API_KEY not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // ── Add contact to Brevo ──────────────────────────────────────────
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': brevoKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [2],          // Brevo list ID 2 — your default list
        updateEnabled: true,   // update if contact already exists
        attributes: {
          SOURCE: source || 'BGVL Website',
          SIGNUP_DATE: new Date().toISOString().split('T')[0],
        },
      }),
    })

    const brevoJson = await brevoRes.json()

    if (!brevoRes.ok && brevoRes.status !== 204) {
      // 400 with "Contact already exist" is fine — treat as success
      if (brevoJson?.message?.toLowerCase().includes('already exist')) {
        console.log('[NEWSLETTER] Contact already exists:', email)
      } else {
        console.error('[NEWSLETTER] Brevo error:', JSON.stringify(brevoJson))
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
      }
    } else {
      console.log('[NEWSLETTER] ✅ Subscribed:', email)
    }

    // ── Telegram notification ─────────────────────────────────────────
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `📧 *NEW SUBSCRIBER — BGVL*\n\nEmail: ${email}\nSource: ${source || 'Website'}\n\nAdd to your newsletter list! 🎉`,
          parse_mode: 'Markdown',
        }),
      }).catch(() => {}) // don't fail if Telegram fails
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('[NEWSLETTER] Error:', err.message)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
