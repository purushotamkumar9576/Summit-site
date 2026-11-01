import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MISSION, TM } from '../data.js'
async function joinWaitlist({ email, goal }) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, goal }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Could not save your request')
  return data
}
import { Reveal } from './Shared.jsx'
import Icon from './Icon.jsx'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Cta() {
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState('meetings')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [saved, setSaved] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL.test(value)) {
      setError('Enter a work email like you@startup.com.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      const res = await joinWaitlist({ email: value, goal })
      setSaved(res.saved)
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('We could not save your request. Check your connection and try again.')
    }
  }

  const [mission, crew] = MISSION[goal]

  return (
    <section className="cta" id="start">
      <div className="wrap cta-grid">
        <Reveal>
          <p className="eyebrow light">Get started</p>
          <h2>Bring your brand, growth, commerce, and founder story into one room.</h2>
          <p>Start with a focused 30-day GTM mission.</p>
          <ul className="cta-points">
            <li><Icon name="check" size={16} /> You approve everything before it goes out</li>
            <li><Icon name="check" size={16} /> One goal, one team, one shared brain</li>
            <li><Icon name="check" size={16} /> Works for U.S., India and global audiences</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait" initial={false}>
            {status !== 'done' ? (
              <motion.form
                key="form"
                className="cta-form"
                onSubmit={submit}
                noValidate
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <div className="field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby="emailErr"
                  />
                </div>
                <div className="field">
                  <label htmlFor="goalSel">30-day goal</label>
                  <select id="goalSel" value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="meetings">Book qualified meetings</option>
                    <option value="podcast">Win podcast appearances</option>
                    <option value="repeat">Lift repeat purchases</option>
                  </select>
                </div>
                <p className="err" id="emailErr" role="alert">{error}</p>
                <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Creating your room…' : <>Create your GTM Room <Icon name="arrow" size={18} /></>}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="out"
                className="out-card"
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="eyebrow">Starter mission ready</span>
                <b>{mission}</b>
                <p>Your starting team: {crew.map((i) => TM[i].n).join(', ')}.</p>
                <p className="note">
                  {saved
                    ? `Thanks. We saved ${email.trim()} and will be in touch.`
                    : 'Your request is ready. We will be in touch shortly.'}
                </p>
                <button className="btn btn-sm ghost" type="button" onClick={() => setStatus('idle')}>Change goal</button>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
