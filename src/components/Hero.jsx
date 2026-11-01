import { useRef } from 'react'
import { motion } from 'framer-motion'
import LiveRoom from './LiveRoom.jsx'
import Icon from './Icon.jsx'
import { Av } from './Shared.jsx'

const rise = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section className="hero" ref={ref} onPointerMove={onMove}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.a className="badge" href="#how" {...rise(0)}>
            <Icon name="sparkle" size={14} /> The AI operating system for startups <Icon name="arrow" size={14} />
          </motion.a>
          <motion.h1 {...rise(1)}>
            One workspace.<br /><span className="grad">A complete AI team.</span>
          </motion.h1>
          <motion.p className="hero-lead" {...rise(2)}>
            Grow your brand, pipeline, commerce and company operations with specialist AI teammates that work from one shared brain. You approve everything before it goes out.
          </motion.p>
          <motion.div className="hero-actions" {...rise(3)}>
            <a className="btn btn-primary btn-lg" href="#start">Create your GTM Room <Icon name="arrow" size={18} /></a>
            <a className="btn btn-ghost btn-lg" href="#room">Try the live room</a>
          </motion.div>
          <motion.div className="hero-proof" {...rise(4)}>
            <span className="stack" aria-hidden="true">
              {['emmy', 'maya', 'cora', 'hunter', 'cast'].map((i) => <Av key={i} id={i} />)}
            </span>
            <span>Six specialist teammates. One focused 30-day mission to start.</span>
          </motion.div>
        </div>
        <motion.div className="hero-room" {...rise(2)}>
          <LiveRoom />
        </motion.div>
      </div>
    </section>
  )
}
