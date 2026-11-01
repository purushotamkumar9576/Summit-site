import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Portrait, SecHead, Tabs } from './Shared.jsx'
import Icon from './Icon.jsx'
import { ROOMS, ROOM_TABS, TM } from '../data.js'

export default function Rooms() {
  const reduce = useReducedMotion()
  const [key, setKey] = useState('gtm')
  const [ui, setUi] = useState(0)
  const [step, setStep] = useState(-1)
  const timers = useRef([])
  const r = ROOMS[key]
  const u = r.utils[ui]

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clear, [])

  const pickRoom = (k) => { clear(); setKey(k); setUi(0); setStep(-1) }
  const pickUtil = (i) => { clear(); setUi(i); setStep(-1) }
  const run = () => {
    clear()
    setStep(-1)
    for (let i = 0; i < 4; i++) {
      timers.current.push(setTimeout(() => setStep(i), reduce ? 0 : (i + 1) * 650))
    }
  }

  const flow = [
    ['Startup Brain', 'Story, customers and goals stay in one place'],
    ['AI teammates', r.lead],
    ['Approval', 'You review and approve before anything runs'],
    ['Utility action', `${u[1]} ${u[2]}`],
  ]

  return (
    <section className="section" id="rooms">
      <div className="wrap">
        <SecHead
          eyebrow="The multiplayer Startup OS"
          title="Open the right room for every stage of growth."
          lead="Rooms organize people, AI teammates, missions, artifacts, and utilities around a shared business outcome. Context travels with the company, not between disconnected tools."
        />
        <Tabs id="room" label="Rooms" items={ROOM_TABS} value={key} onChange={pickRoom} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            className="rooms-grid"
            role="tabpanel"
            aria-labelledby={`room-${key}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="room-main">
              <p className="eyebrow">{r.kick}</p>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <ul className="crew crew-photos">
                {r.crew.map((id) => (
                  <li key={id}><Portrait id={id} /></li>
                ))}
              </ul>
              <div className="mission-chip">
                <span className="eyebrow">Suggested mission</span>
                <b>{r.mission}</b>
              </div>
            </div>

            <div className="dock">
              <div>
                <p className="eyebrow">Shared action layer</p>
                <h4>Utility Dock</h4>
                <p>Teammates decide what needs to happen. Approved utilities execute it. Choose a utility to see it in the flow.</p>
              </div>
              <div className="utils">
                {r.utils.map((x, i) => (
                  <button key={x[1]} type="button" className="util" aria-pressed={i === ui} onClick={() => pickUtil(i)}>
                    <Icon name={x[0]} size={18} />{x[1]}
                  </button>
                ))}
              </div>
              <ol className="flow">
                {flow.map(([t, d], i) => (
                  <li key={t} className={`${step >= i ? 'on' : ''}${step === i ? ' now' : ''}`}>
                    <b>{t}</b>{d}
                  </li>
                ))}
              </ol>
              <div className="flow-foot">
                <span className="note">Selected: {u[1]}</span>
                <button className="btn btn-sm btn-primary" type="button" onClick={run}>Run the flow</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
