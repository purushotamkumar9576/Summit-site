import { motion } from 'framer-motion'
import { Reveal, SecHead } from './Shared.jsx'
import Icon from './Icon.jsx'
import { OUTCOMES } from '../data.js'

export default function Outcomes() {
  return (
    <section className="section" id="outcomes">
      <div className="wrap">
        <SecHead
          eyebrow="What you get"
          title="Start with the result you want. The team works backwards."
          lead="Pick one outcome. Emmy turns it into a mission and puts the right teammates on it."
        />
        <div className="cards3">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.t} delay={i * 0.08}>
              <motion.article className="card outcome" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
                <span className="icon-tile"><Icon name={o.ic} size={22} /></span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
                <span className="chip-note">{o.chip}</span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
