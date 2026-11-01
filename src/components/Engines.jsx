import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SecHead } from './Shared.jsx'
import Icon from './Icon.jsx'
import { ENGINES } from '../data.js'

function Engine({ e, i }) {
  const [open, setOpen] = useState(false)
  const id = `sample-${i}`
  return (
    <Reveal delay={i * 0.08}>
      <motion.article className="engine" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
        <span className="icon-tile"><Icon name={e.ic} size={22} /></span>
        <h3>{e.t}</h3>
        <p>{e.d}</p>
        <div className="tags">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <button className="sample-btn" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          See a sample
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="sample">
                <b>{e.s}</b>
                <ul>{e.rows.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}</ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </Reveal>
  )
}

export default function Engines() {
  return (
    <section className="section section-tint" id="tools">
      <div className="wrap">
        <SecHead
          eyebrow="Three growth engines. One room."
          title="Everything your startup needs to be seen, and chosen."
          lead="Each tool is powered by a specialist teammate, but every teammate works from the same approved story, customer context, and business goals."
        />
        <div className="engines">
          {ENGINES.map((e, i) => <Engine key={e.t} e={e} i={i} />)}
        </div>
      </div>
    </section>
  )
}
