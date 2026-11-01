import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Av, SecHead, Tabs } from './Shared.jsx'
import Icon from './Icon.jsx'
import BrainMap from './BrainMap.jsx'
import { GOALS, GOAL_TABS, TM, TEAM_ORDER } from '../data.js'

export default function Team() {
  const [goal, setGoal] = useState('meetings')
  const [tm, setTm] = useState('emmy')
  const g = GOALS[goal]
  const t = TM[tm]
  const idx = g.chain.indexOf(tm)
  const inChain = idx > -1

  return (
    <section className="section" id="team">
      <div className="wrap">
        <SecHead
          eyebrow="Your multiplayer AI team"
          title="Specialists that think together."
          lead="Pick a founder goal, then select a teammate to see how the room turns that one goal into coordinated action."
        />
        <div className="goals">
          <span className="eyebrow">Founder goal</span>
          <Tabs id="goal" label="Founder goal" items={GOAL_TABS} value={goal} onChange={setGoal} />
        </div>

        <div className="team-grid">
          <div className="map-card">
            <BrainMap goal={goal} selected={tm} onSelect={setTm} />
            <div className="tm-chips" role="group" aria-label="Teammates">
              {TEAM_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="chip"
                  aria-pressed={id === tm}
                  data-standby={!g.chain.includes(id)}
                  onClick={() => setTm(id)}
                >
                  <Av id={id} />{TM[id].n}
                </button>
              ))}
            </div>
          </div>

          <div className="tm-detail" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${goal}-${tm}`}
                className="tm-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="tm-head">
                  <Av id={tm} large />
                  <div>
                    <h3>{t.head}</h3>
                    <span className="eyebrow role-pill">{t.role}</span>
                  </div>
                </div>
                <p>{t.blurb}</p>
                <div className="contrib" data-standby={!inChain}>
                  <span className="eyebrow">
                    {inChain ? `Step ${idx + 1} of ${g.chain.length} for this goal` : 'Standing by for this goal'}
                  </span>
                  <p>{g.lines[tm]}</p>
                </div>
                <div>
                  <span className="eyebrow">Handoff order</span>
                  <div className="chain">
                    {g.chain.map((id, i) => (
                      <span className="chain-item" key={id}>
                        {i > 0 && <Icon name="arrow" size={14} className="arrow" />}
                        <button type="button" aria-current={id === tm ? 'true' : undefined} onClick={() => setTm(id)}>
                          <Av id={id} />{TM[id].n}
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="can">{t.can.map((c) => <li key={c}>{c}</li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
