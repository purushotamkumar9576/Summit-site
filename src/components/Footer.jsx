import Icon from './Icon.jsx'

const COLS = [
  ['Product', [['#how', 'How it works'], ['#rooms', 'Rooms'], ['#tools', 'Growth engines'], ['#team', 'AI team']]],
  ['Explore', [['#podcasts', 'Podcast network'], ['#trust', 'Approval controls'], ['#faq', 'FAQ'], ['#start', 'Create your GTM Room']]],
]

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a className="brand" href="#top" aria-label="Superhumanly, back to top">
            <span className="brand-mark">S</span><span className="brand-name">Superhumanly</span>
          </a>
          <p>The multiplayer AI growth team for startups.</p>
        </div>
        {COLS.map(([h, links]) => (
          <nav key={h} aria-label={h}>
            <h4>{h}</h4>
            <ul>{links.map(([href, l]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="wrap foot-base">
        <span>© 2026 GenerativeProducts Inc. · Superhumanly AI</span>
        <a className="to-top" href="#top">Back to top <Icon name="up" size={14} /></a>
      </div>
    </footer>
  )
}
