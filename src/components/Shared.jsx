import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TM, photoUrl } from '../data.js'

/** Small round avatar. Shows the Cloudinary photo, or the initial if there is none. */
export function Av({ id, large }) {
  const t = TM[id]
  const [bad, setBad] = useState(false)
  const src = photoUrl(id, large ? 104 : 64)
  return (
    <span className={`av${large ? ' av-lg' : ''}`} style={{ '--h': t.h }} aria-hidden="true">
      {src && !bad ? <img src={src} alt="" width="52" height="52" onError={() => setBad(true)} /> : t.i}
    </span>
  )
}

/** Photo card: picture on top, name and role underneath. */
export function Portrait({ id }) {
  const t = TM[id]
  const [bad, setBad] = useState(false)
  const src = photoUrl(id, 360, 450)
  return (
    <figure className="portrait" style={{ '--h': t.h }}>
      <div className="portrait-img">
        {src && !bad
          ? <img src={src} alt={`Photo of ${t.n}`} width="360" height="450" loading="lazy" onError={() => setBad(true)} />
          : <span className="portrait-ph" aria-hidden="true">{t.i}</span>}
      </div>
      <figcaption><b>{t.n}</b><span>{t.role}</span></figcaption>
    </figure>
  )
}

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SecHead({ eyebrow, title, lead }) {
  return (
    <Reveal className="sec-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

/** Accessible tab list with a sliding highlight. `items` is [{key,label}]. */
export function Tabs({ items, value, onChange, label, id }) {
  const refs = useRef([])
  const onKey = (e, i) => {
    let n = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % items.length
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + items.length) % items.length
    if (n !== null) {
      e.preventDefault()
      onChange(items[n].key)
      refs.current[n]?.focus()
    }
  }
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((it, i) => {
        const on = it.key === value
        return (
          <button
            key={it.key}
            ref={(el) => { refs.current[i] = el }}
            id={`${id}-${it.key}`}
            role="tab"
            type="button"
            className="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(it.key)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {on && (
              <motion.span
                layoutId={`${id}-pill`}
                className="tab-pill"
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
              />
            )}
            <span className="tab-label">{it.label}</span>
          </button>
        )
      })}
    </div>
  )
}
