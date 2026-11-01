import 'dotenv/config'
import express from 'express'
import pg from 'pg'
import { Resend } from 'resend'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const { Pool } = pg
const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const allowedGoals = new Set(['meetings', 'podcast', 'repeat'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.use(express.json({ limit: '10kb' }))

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch {
    res.status(503).json({ ok: false })
  }
})

app.post('/api/leads', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  const goal = String(req.body?.goal || '')

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Enter a valid work email.' })
  }
  if (!allowedGoals.has(goal)) {
    return res.status(400).json({ error: 'Choose a valid 30-day goal.' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO leads (email, goal, source)
       VALUES ($1, $2, 'summit-site')
       ON CONFLICT (lower(email))
       DO UPDATE SET goal = EXCLUDED.goal, updated_at = NOW()
       RETURNING id, email, goal`,
      [email, goal],
    )

    if (resend) {
      const notificationEmail = process.env.NOTIFICATION_EMAIL
      const fromEmail = process.env.FROM_EMAIL
      if (notificationEmail && fromEmail) {
        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
          subject: `New Summit lead: ${email}`,
          text: `A new lead submitted the Summit form.\n\nEmail: ${email}\nGoal: ${goal}`,
        })
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'Your Summit GTM Room request',
          text: 'Thanks for reaching out. We received your request and will be in touch shortly.',
        })
      }
    }

    return res.status(201).json({ saved: true, lead: result.rows[0] })
  } catch (error) {
    console.error('Lead submission failed:', error)
    return res.status(500).json({ error: 'We could not save your request.' })
  }
})

const distPath = path.resolve(__dirname, '../dist')
app.use(express.static(distPath))
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    return res.sendFile(path.join(distPath, 'index.html'))
  }
  return next()
})

app.listen(port, () => console.log(`Summit server listening on port ${port}`))
