import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/referral
// Sends referral details to admin via Brevo email + Telegram notification
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, referralType, notes } = await req.json()

    if (!name || !email || !notes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const brevoKey = process.env.BREVO_API_KEY
    const notifyEmail = process.env.NOTIFY_EMAIL || 'ballonholdingsltd@gmail.com'

    const typeLabel = referralType === 'buyer' ? 'Buyer' :
                      referralType === 'supplier' ? 'Supplier' : 'Trade Agent/Broker'

    // ── Send email via Brevo ──────────────────────────────────────────
    if (brevoKey) {
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#030303;color:#fff;padding:32px">
          <div style="border-bottom:2px solid #C9A84C;padding-bottom:16px;margin-bottom:24px">
            <h2 style="color:#C9A84C;margin:0;font-family:serif;letter-spacing:2px">NEW REFERRAL — BGVL</h2>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;width:40%">Referred by</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888">Their Email</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#C9A84C">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888">Phone/WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff">${phone || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888">Referral Type</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#C9A84C">${typeLabel}</td></tr>
            <tr><td style="padding:10px 0;color:#888;vertical-align:top">About the Referral</td><td style="padding:10px 0;color:#fff;line-height:1.6">${notes}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#111;border:1px solid #C9A84C22">
            <p style="color:#888;font-size:12px;margin:0">Follow up with this referral within 48 hours to qualify for commission payment.</p>
          </div>
        </div>
      `

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': brevoKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'BGVL Referral System', email: 'ballonholdingsltd@gmail.com' },
          to: [{ email: notifyEmail }],
          subject: `🤝 New Referral: ${typeLabel} from ${name}`,
          htmlContent: html,
        }),
      }).catch(e => console.error('[REFERRAL] Brevo error:', e.message))
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
          text: [
            `🤝 *NEW REFERRAL — BGVL*`,
            ``,
            `👤 *Referred by:* ${name}`,
            `📧 *Email:* ${email}`,
            `📱 *Phone:* ${phone || '—'}`,
            `🏷️ *Type:* ${typeLabel}`,
            ``,
            `📝 *Details:*`,
            notes,
            ``,
            `⚡ Follow up within 48 hours!`,
          ].join('\n'),
          parse_mode: 'Markdown',
        }),
      }).catch(() => {})
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('[REFERRAL] Error:', err.message)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
