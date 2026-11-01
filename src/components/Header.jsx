import { useEffect, useState } from 'react'
import { useTheme } from '../hooks.js'
import Icon from './Icon.jsx'

const LINKS = [
  ['how', 'How it works'],
  ['rooms', 'Rooms'],
  ['team', 'AI team'],
  ['podcasts', 'Podcasts'],
  ['faq', 'FAQ'],
]

export default function Header() {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header className={`site-head${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap head-row">
        <a className="brand" href="#top" aria-label="Superhumanly, back to top">
          <span className="brand-mark">S</span>
          <span className="brand-name">Superhumanly</span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Sections">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? 'true' : undefined} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="btn btn-primary nav-cta" href="#start" onClick={() => setOpen(false)}>
            Create your GTM Room <Icon name="arrow" size={16} />
          </a>
        </nav>
        <a className="btn btn-primary btn-sm head-cta" href="#start">Create your GTM Room</a>
        <button className="icon-btn" type="button" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
          <Icon name={dark ? 'sun' : 'moon'} size={18} />
        </button>
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="navLinks"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  )
}
