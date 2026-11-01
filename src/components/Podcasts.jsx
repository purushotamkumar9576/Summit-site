import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SecHead, Tabs } from './Shared.jsx'
import Icon from './Icon.jsx'
import { ANGLE, CATEGORIES, REGION_TABS, SHOWS, STAGES } from '../data.js'

export default function Podcasts() {
  const [region, setRegion] = useState('us')
  const [cat, setCat] = useState('ai')
  const [stage, setStage] = useState('seed')

  const shows = useMemo(() => {
    const list = SHOWS[region].map((s) => ({ ...s, strong: s.c.includes(cat) }))
    return list.sort((a, b) => Number(b.strong) - Number(a.strong)).slice(0, 3)
  }, [region, cat])

  return (
    <section className="section section-tint" id="podcasts">
      <div className="wrap">
        <SecHead
          eyebrow="Global podcast intelligence"
          title="Your story, matched to the right audiences."
          lead="Cast recommends podcast appearances based on your category, stage, audience, language, geography, and business objective. It prepares the pitch, briefing, talking points, and follow-up campaign."
        />
        <div className="pod-grid">
          <Reveal>
            <div className="story">
              <p className="eyebrow">Superhumanly founder stories</p>
              <h3>From a bold idea to a category.</h3>
              <p>One conversation. A complete story engine.</p>
              <div className="out">
                {['Episode', 'Clips', 'Posts', 'Investor narrative', 'Outbound proof'].map((x) => <span key={x}>{x}</span>)}
              </div>
              <div className="chan">
                <span><Icon name="play" size={18} />YouTube</span><span><Icon name="users" size={18} />LinkedIn</span><span><Icon name="mic" size={18} />Spotify</span><span><Icon name="globe" size={18} />Startup media</span>
              </div>
            </div>
          </Reveal>

          <div className="matcher">
            <Tabs id="region" label="Region" items={REGION_TABS} value={region} onChange={setRegion} />
            <div className="filters">
              <div className="field">
                <label htmlFor="catSel">Your category</label>
                <select id="catSel" value={cat} onChange={(e) => setCat(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="stageSel">Stage</label>
                <select id="stageSel" value={stage} onChange={(e) => setStage(e.target.value)}>
                  {STAGES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <p className="angle">Pitch angle: {ANGLE[stage]}</p>
            <div className="shows" role="tabpanel" aria-labelledby={`region-${region}`} aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {shows.map((s) => (
                  <motion.div
                    key={`${region}-${s.f}`}
                    layout
                    className="show"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  >
                    <div>
                      <b>{s.f}</b>
                      <span>{s.a}</span>
                      <span>Language: {s.l}</span>
                    </div>
                    <span className={`fit${s.strong ? ' strong' : ''}`}>{s.strong ? 'Strong fit' : 'Possible fit'}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <p className="note">Illustrative matches built from format and audience, not live show listings.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
