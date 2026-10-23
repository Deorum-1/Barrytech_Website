import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now(), dur = 1400
    let raf
    const tick = (t) => { const p = Math.min((t - start) / dur, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}
