import { MARQUEE } from '../data.js'
import Icon from './Icon.jsx'

export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {MARQUEE.map(([ic, n]) => <li key={n}><Icon name={ic} size={16} />{n}</li>)}
    </ul>
  )
  return (
    <div className="marquee" role="region" aria-label="Utilities your teammates can use">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  )
}
