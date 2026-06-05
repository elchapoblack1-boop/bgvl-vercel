/**
 * PostgreSQL Database Layer
 * Uses DATABASE_URL environment variable (set in Koyeb dashboard)
 */

let _pgPool: any = null
let _pgReady = false

async function getPG() {
  if (_pgPool && _pgReady) return _pgPool
  const { Pool } = require('pg')
  _pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('sslmode=require') ||
         process.env.DATABASE_URL?.includes('koyeb') ||
         process.env.DATABASE_URL?.includes('neon.tech') ||
         process.env.DATABASE_URL?.includes('supabase')
      ? { rejectUnauthorized: false }
      : false,
    max: 5,
  })
  await setupPostgres(_pgPool)
  _pgReady = true
  console.log('[DB] PostgreSQL ready')
  return _pgPool
}

async function setupPostgres(pool: any) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, type TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'New',
      buyer_name TEXT, whatsapp TEXT, email TEXT, company TEXT, product_name TEXT,
      quantity TEXT, contract_quantity TEXT, destination TEXT, payment_term TEXT,
      shipment_term TEXT, incoterms TEXT, price TEXT, purity TEXT, moisture TEXT,
      odor_taste TEXT, appearance TEXT, oil_content TEXT, packaging_size TEXT,
      delivery_schedule TEXT, notes TEXT, buyer_city TEXT, buyer_country TEXT,
      buyer_ip TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL,
      subject TEXT, message TEXT NOT NULL, is_read INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS translations (
      lang TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY (lang, key)
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    INSERT INTO settings (key, value) VALUES
      ('notify_email','ballonholdingsltd@gmail.com'),
      ('default_lang','en'),
      ('site_name','Ballon Global Ventures Limited')
    ON CONFLICT (key) DO NOTHING;
  `)
}

// ─────────────────────────────────────────────
// QUERY HELPERS
// ─────────────────────────────────────────────

/** Convert SQLite ? placeholders → Postgres $1 $2 ... */
function toPg(sql: string): string {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

function toPgWrite(sql: string): string {
  let converted = toPg(sql)

  // INSERT OR IGNORE → ON CONFLICT DO NOTHING
  if (/INSERT OR IGNORE INTO/i.test(sql)) {
    converted = converted.replace(/INSERT OR IGNORE INTO (\w+)/gi, 'INSERT INTO $1')
    converted += ' ON CONFLICT DO NOTHING'
  }

  // INSERT OR REPLACE INTO translations
  if (/INSERT OR REPLACE INTO translations/i.test(sql)) {
    let i = 0
    converted = sql.replace(/\?/g, () => `$${++i}`)
    converted = converted.replace(
      /INSERT OR REPLACE INTO translations \(lang, key, value, updated_at\) VALUES \(\$1,\$2,\$3,CURRENT_TIMESTAMP\)/i,
      `INSERT INTO translations (lang, key, value, updated_at) VALUES ($1,$2,$3,NOW()) ON CONFLICT (lang,key) DO UPDATE SET value=$3, updated_at=NOW()`
    )
  }

  // INSERT OR REPLACE INTO settings
  if (/INSERT OR REPLACE INTO settings/i.test(sql)) {
    let i = 0
    converted = sql.replace(/\?/g, () => `$${++i}`)
    converted = converted.replace(
      /INSERT OR REPLACE INTO settings \(key, value, updated_at\) VALUES \(\$1,\$2,CURRENT_TIMESTAMP\)/i,
      `INSERT INTO settings (key, value, updated_at) VALUES ($1,$2,NOW()) ON CONFLICT (key) DO UPDATE SET value=$2, updated_at=NOW()`
    )
  }

  converted = converted.replace(/CURRENT_TIMESTAMP/g, 'NOW()')
  return converted
}

/** SELECT — returns array of rows */
export async function dbAll(sql: string, params: any[] = []): Promise<any[]> {
  const pg = await getPG()
  const res = await pg.query(toPg(sql), params)
  return res.rows
}

/** SELECT — returns first row or null */
export async function dbGet(sql: string, params: any[] = []): Promise<any | null> {
  const rows = await dbAll(sql, params)
  return rows[0] ?? null
}

/** INSERT / UPDATE / DELETE */
export async function dbRun(sql: string, params: any[] = []): Promise<void> {
  const pg = await getPG()
  await pg.query(toPgWrite(sql), params)
}

/** Multiple writes in a transaction */
export async function dbTransaction(ops: { sql: string; params: any[] }[]): Promise<void> {
  const pg = await getPG()
  const client = await pg.connect()
  try {
    await client.query('BEGIN')
    for (const op of ops) await client.query(toPgWrite(op.sql), op.params)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

// Legacy compat
export const IS_POSTGRES = true
export function getDB() { return null }
