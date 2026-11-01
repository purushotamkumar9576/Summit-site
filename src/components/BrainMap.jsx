import { useReducedMotion } from 'framer-motion'
import { GOALS, TM, TEAM_ORDER } from '../data.js'

// Hexagon of teammates around the Startup Brain. Order is chosen so the "meetings" chain is adjacent.
const C = [260, 220]
const POS = {
  emmy: [260, 62], maya: [394, 141], cora: [394, 299],
  hunter: [260, 378], cast: [126, 299], kai: [126, 141],
}

const curve = (a, b) => {
  const [ax, ay] = POS[a]
  const [bx, by] = POS[b]
  const mx = (ax + bx) / 2
  const my = (ay + by) / 2
  const cx = mx + (C[0] - mx) * 0.5
  const cy = my + (C[1] - my) * 0.5
  return `M${ax} ${ay} Q${cx} ${cy} ${bx} ${by}`
}

export default function BrainMap({ goal, selected, onSelect }) {
  const reduce = useReducedMotion()
  const chain = GOALS[goal].chain
  const edges = chain.slice(1).map((id, i) => [chain[i], id])

  return (
    <svg className="brain" viewBox="0 0 520 440" role="group" aria-label="Startup Brain and how teammates hand work to each other">
      {TEAM_ORDER.map((id) => (
        <line key={id} className="bm-spoke" x1={C[0]} y1={C[1]} x2={POS[id][0]} y2={POS[id][1]} />
      ))}

      {edges.map(([a, b]) => (
        <path key={`${goal}-${a}-${b}`} className="bm-edge" d={curve(a, b)} fill="none" />
      ))}
      {!reduce && edges.map(([a, b]) => (
        <circle key={`dot-${goal}-${a}-${b}`} className="bm-dot" r="4.5">
          <animateMotion dur="2.6s" repeatCount="indefinite" path={curve(a, b)} />
        </circle>
      ))}

      <g className="bm-core">
        <rect x={C[0] - 66} y={C[1] - 28} width="132" height="56" rx="12" />
        <text x={C[0]} y={C[1] - 3} textAnchor="middle" className="bm-core-t">Startup Brain</text>
        <text x={C[0]} y={C[1] + 15} textAnchor="middle" className="bm-core-s">shared story + goals</text>
      </g>

      {TEAM_ORDER.map((id) => {
        const [x, y] = POS[id]
        const idx = chain.indexOf(id)
        const on = idx > -1
        return (
          <g
            key={id}
            className="bm-node"
            style={{ '--h': TM[id].h }}
            data-on={on}
            data-sel={id === selected}
            role="button"
            tabIndex={0}
            aria-pressed={id === selected}
            aria-label={`${TM[id].n}, ${TM[id].role}${on ? `, step ${idx + 1}` : ', standing by'}`}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id) } }}
          >
            <rect x={x - 66} y={y - 25} width="132" height="50" rx="12" />
            <text x={x} y={y - 2} textAnchor="middle" className="bm-name">{TM[id].n}</text>
            <text x={x} y={y + 14} textAnchor="middle" className="bm-role">{TM[id].role}</text>
            {on && (
              <g>
                <circle cx={x + 66} cy={y - 25} r="11" className="bm-badge" />
                <text x={x + 66} y={y - 21} textAnchor="middle" className="bm-badge-t">{idx + 1}</text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}
