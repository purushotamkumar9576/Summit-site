import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Av } from './Shared.jsx'
import { TM, FEED, DONE_MSG, APPROVAL_ITEMS } from '../data.js'
import { useCountUp } from '../hooks.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function Msg({ m }) {
  const t = TM[m.who]
  return (
    <motion.div
      layout
      className="msg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Av id={m.who} />
      <div>
        <div className="msg-who">{t.n} · {t.role}</div>
        <div className="msg-text">{m.text}</div>
      </div>
    </motion.div>
  )
}

export default function LiveRoom() {
  const reduce = useReducedMotion()
  const [feed, setFeed] = useState(FEED)
  const [typing, setTyping] = useState(false)
  const [approved, setApproved] = useState({ pod: false, out: false })
  const [open, setOpen] = useState(false)
  const run = useRef(0)
  const matched = useCountUp(126)
  const ready = useCountUp(40)

  const n = Object.values(approved).filter(Boolean).length
  const done = n === APPROVAL_ITEMS.length
  const left = APPROVAL_ITEMS.length - n
  const msgs = done ? [...feed, DONE_MSG] : feed

  async function replay() {
    const id = ++run.current
    setApproved({ pod: false, out: false })
    setOpen(false)
    setFeed([])
    for (const m of FEED) {
      setTyping(true)
      await wait(reduce ? 0 : 900)
      if (id !== run.current) return
      setTyping(false)
      setFeed((f) => [...f, m])
      await wait(reduce ? 0 : 250)
      if (id !== run.current) return
    }
  }

  return (
    <div className="room" id="room" aria-label="Sample room: TechCrunch Launch Room">
      <div className="room-bar">
        <span className="room-title">TechCrunch Launch Room</span>
        <span className="presence" aria-hidden="true">
          {['emmy', 'maya', 'cora', 'hunter'].map((i) => <Av key={i} id={i} />)}
        </span>
        <span className="live">6 teammates live</span>
      </div>

      <div className="mission">
        <p className="eyebrow">Active mission · Day 8 of 14</p>
        <h2>Launch the founder story and book 20 qualified meetings</h2>
        <div className="days">
          <span>Day 8</span>
          <span className="bar"><motion.i initial={{ width: 0 }} animate={{ width: '57%' }} transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }} /></span>
          <span>Day 14</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><b>{matched}</b><span>startups matched</span></div>
        <div className="stat"><b>{ready}</b><span>{done ? 'messages queued' : 'messages ready'}</span></div>
        <div className="stat"><b>{left}</b><span>items to approve</span></div>
      </div>

      <div className="feed" aria-live="polite">
        <AnimatePresence initial={false}>
          {msgs.map((m) => <Msg key={m.id} m={m} />)}
        </AnimatePresence>
        {typing && <div className="typing" aria-hidden="true"><i /><i /><i /></div>}
      </div>

      <div className="approval" data-state={done ? 'done' : 'waiting'}>
        <div className="approval-top">
          <div>
            <strong>{done ? 'Approved by founder' : 'Founder approval needed'}</strong>
            <span>{done ? 'Email automation is queuing the sequence' : 'Podcast teaser + outbound sequence'}</span>
          </div>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            aria-expanded={open}
            aria-controls="review"
            onClick={() => setOpen((o) => !o)}
          >
            {done ? 'Reopen' : `Review ${left} item${left === 1 ? '' : 's'}`}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="review"
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="review">
                {APPROVAL_ITEMS.map((it) => (
                  <div className="review-item" key={it.k}>
                    <div><b>{it.t}</b><span>{it.d}</span></div>
                    <button
                      className="toggle"
                      type="button"
                      aria-pressed={approved[it.k]}
                      aria-label={`Approve ${it.t}`}
                      onClick={() => setApproved((a) => ({ ...a, [it.k]: !a[it.k] }))}
                    >
                      {approved[it.k] ? 'Approved' : 'Approve'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="room-foot">
        <span>Sample room, nothing is sent</span>
        <button className="link-btn" type="button" onClick={replay}>Replay</button>
      </div>
    </div>
  )
}
