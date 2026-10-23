import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({ src, poster, className = '' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setActive(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        io.disconnect()
      }
    }, { rootMargin: '400px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!active || !el) return
    el.load()
    el.play().catch(() => {})
  }, [active])

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      poster={poster}
      className={className}
      autoPlay={active}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
