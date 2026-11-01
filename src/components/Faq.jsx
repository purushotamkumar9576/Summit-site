import { SecHead } from './Shared.jsx'
import Icon from './Icon.jsx'
import { FAQ } from '../data.js'

export default function Faq() {
  return (
    <section className="section section-tint" id="faq">
      <div className="wrap faq-grid">
        <SecHead eyebrow="Questions" title="Answers before you ask." lead="Still unsure? Create a room and start with one small mission." />
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <Icon name="plus" size={18} className="plus" />
                <Icon name="minus" size={18} className="minus" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
