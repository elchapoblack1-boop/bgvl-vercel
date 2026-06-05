// ══════════════════════════════════════════════════════
// BGVL NOTIFICATIONS
// 1. Telegram Bot — free forever, auto-sends on every order/contact
// 2. UltraMsg WhatsApp — direct WhatsApp message to your number
// 3. WhatsApp Link — pre-filled wa.me link returned to frontend button
// ══════════════════════════════════════════════════════

// ── TELEGRAM ─────────────────────────────────────────

async function sendTelegram(message: string): Promise<void> {
  const token   = process.env.TELEGRAM_BOT_TOKEN
  const chat_id = process.env.TELEGRAM_CHAT_ID

  if (!token || !chat_id) {
    console.log('[TELEGRAM] ⛔ Skipping — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.')
    return
  }

  console.log('[TELEGRAM] Sending notification...')

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: message, parse_mode: 'Markdown' }),
    })
    const json = await res.json()
    if (json.ok) {
      console.log('[TELEGRAM] ✅ Sent successfully | message_id:', json.result?.message_id)
    } else {
      console.error('[TELEGRAM] ❌ Failed:', JSON.stringify(json))
      if (json.error_code === 401) console.error('[TELEGRAM]   Fix: TELEGRAM_BOT_TOKEN is wrong — get it from @BotFather')
      if (json.error_code === 400) console.error('[TELEGRAM]   Fix: TELEGRAM_CHAT_ID is wrong — visit https://api.telegram.org/bot<TOKEN>/getUpdates to find it')
    }
  } catch (err: any) {
    console.error('[TELEGRAM] ❌ Request error:', err.message)
  }
}

// ── ORDER NOTIFICATION ────────────────────────────────

export async function sendWhatsAppNotification(order: Record<string, string>) {
  const message = [
    `🔔 *NEW ORDER — Ballon Global Ventures*`,
    ``,
    `📦 *Product:* ${order.product_name || '—'}`,
    `🔖 *Type:* ${order.type === 'agricultural' ? 'Agricultural 🌾' : 'Petroleum 🛢️'}`,
    ``,
    `👤 *Buyer:* ${order.buyer_name || '—'}`,
    `🏢 *Company:* ${order.company || '—'}`,
    `📱 *WhatsApp:* ${order.whatsapp || '—'}`,
    `📧 *Email:* ${order.email || '—'}`,
    `📍 *Location:* ${[order.buyer_city, order.buyer_country].filter(Boolean).join(', ') || '—'}`,
    ``,
    `📦 *Quantity:* ${order.quantity || '—'}`,
    `🌍 *Destination:* ${order.destination || '—'}`,
    `💰 *Price Target:* ${order.price || '—'}`,
    `💳 *Payment:* ${order.payment_term || '—'}`,
    `🚢 *Incoterm:* ${order.incoterms || '—'}`,
    ``,
    `🆔 *Order ID:* ${order.id || '—'}`,
    ``,
    `⚡ Login to your admin panel to view and reply.`,
  ].join('\n')

  await Promise.allSettled([
    sendTelegram(message),
    sendUltraMsg(message),
  ])
}

// ── ULTRAMSG WHATSAPP ──────────────────────────────────────────────────────
// Sends a real WhatsApp message directly to your phone via UltraMsg API.
// Env vars: ULTRAMSG_INSTANCE, ULTRAMSG_TOKEN, ULTRAMSG_TO
// Sign up free at ultramsg.com — connect your WhatsApp number.

async function sendUltraMsg(message: string): Promise<void> {
  const instance = process.env.ULTRAMSG_INSTANCE
  const token    = process.env.ULTRAMSG_TOKEN
  const to       = process.env.ULTRAMSG_TO

  if (!instance || !token || !to) {
    console.log('[ULTRAMSG] ⛔ Skipping — set ULTRAMSG_INSTANCE, ULTRAMSG_TOKEN, ULTRAMSG_TO.')
    return
  }

  try {
    const res = await fetch(`https://api.ultramsg.com/${instance}/messages/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token, to, body: message }),
    })
    const json = await res.json()
    if (json.sent === 'true' || json.sent === true) {
      console.log('[ULTRAMSG] ✅ WhatsApp sent')
    } else {
      console.error('[ULTRAMSG] ❌ Failed:', JSON.stringify(json))
    }
  } catch (err: any) {
    console.error('[ULTRAMSG] ❌ Request error:', err.message)
  }
}

// ── CONTACT NOTIFICATION ──────────────────────────────

export async function sendWhatsAppContactNotification(msg: Record<string, string>) {
  const message = [
    `📨 *NEW CONTACT MESSAGE — BGVL*`,
    ``,
    `👤 *From:* ${msg.name || '—'}`,
    `📧 *Email:* ${msg.email || '—'}`,
    `📋 *Subject:* ${msg.subject || 'No subject'}`,
    ``,
    `💬 *Message:*`,
    `${msg.message || '—'}`,
    ``,
    `⚡ Login to your admin panel to reply.`,
  ].join('\n')

  // Send via both Telegram AND WhatsApp simultaneously
  await Promise.allSettled([
    sendTelegram(message),
    sendUltraMsg(message),
  ])
}
