import { Reveal, SecHead } from './Shared.jsx'
import Icon from './Icon.jsx'
import { TRUST } from '../data.js'

export default function Trust() {
  return (
    <section className="section" id="trust">
      <div className="wrap">
        <SecHead
          eyebrow="You stay in control"
          title="A fast team, with you making the calls."
          lead="Automation should save you time without taking decisions away from you."
        />
        <div className="cards3">
          {TRUST.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.08}>
              <article className="card plain">
                <span className="icon-tile alt"><Icon name={x.ic} size={22} /></span>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
