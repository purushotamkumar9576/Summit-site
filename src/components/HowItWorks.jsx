import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Av, SecHead } from './Shared.jsx'
import Icon from './Icon.jsx'
import { STEPS, TM } from '../data.js'

export default function HowItWorks() {
  const [i, setI] = useState(0)
  const s = STEPS[i]
  const t = TM[s.who]
  return (
    <section className="section section-tint" id="how">
      <div className="wrap">
        <SecHead
          eyebrow="How it works"
          title="From one goal to work that is done, in four steps."
          lead="Choose a step to see what happens in the room."
        />
        <div className="how-grid">
          <ol className="steps" aria-label="Steps">
            {STEPS.map((st, n) => (
              <li key={st.t}>
                <button type="button" className="step" aria-current={n === i ? 'step' : undefined} onClick={() => setI(n)}>
                  <span className="step-n">{n + 1}</span>
                  <span className="step-body">
                    <b>{st.t}</b>
                    <span>{st.d}</span>
                  </span>
                  <Icon name={st.ic} size={20} className="step-ic" />
                </button>
              </li>
            ))}
          </ol>
          <div className="how-demo" aria-live="polite">
            <div className="how-bar"><span className="dots" aria-hidden="true"><i /><i /><i /></span><span>GTM Room · Step {i + 1} of {STEPS.length}</span></div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                className="how-body"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bubble-row">
                  <Av id={s.who} large />
                  <div className="bubble">
                    <div className="msg-who">{t.n} · {t.role}</div>
                    <p>{s.say}</p>
                  </div>
                </div>
                <span className="status"><i /> {s.tag}</span>
              </motion.div>
            </AnimatePresence>
            <div className="how-nav">
              <button className="btn btn-sm" type="button" disabled={i === 0} onClick={() => setI(i - 1)}>Back</button>
              <button className="btn btn-sm btn-primary" type="button" onClick={() => (i === STEPS.length - 1 ? setI(0) : setI(i + 1))}>
                {i === STEPS.length - 1 ? 'Start over' : 'Next step'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
