import { useEffect, useState } from 'react'

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    let saved = null
    try { saved = localStorage.getItem('sh-theme') } catch { /* storage blocked */ }
    if (saved) document.documentElement.setAttribute('data-theme', saved)
    setDark((saved || (systemDark() ? 'dark' : 'light')) === 'dark')
  }, [])
  const toggle = () => {
    const cur = document.documentElement.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light')
    const next = cur === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    setDark(next === 'dark')
    try { localStorage.setItem('sh-theme', next) } catch { /* storage blocked */ }
  }
  return { dark, toggle }
}

export function useCountUp(target, ms = 1300) {
  const [v, setV] = useState(target)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf
    let start
    setV(0)
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / ms, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}
