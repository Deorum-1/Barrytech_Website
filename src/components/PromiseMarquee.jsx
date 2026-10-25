import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// The key areas run as a marquee: the card nearest the middle of the band grows,
// the ones moving away from the middle shrink, so the band reads as a carousel.
const COPIES = 4

export default function PromiseMarquee({ areas, id }) {
  const bandRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const band = bandRef.current
    const track = trackRef.current
    if (!band || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Card centres relative to the track — only change when the layout changes.
    let centres = []
    const measure = () => {
      const trackLeft = track.getBoundingClientRect().left
      centres = cardRefs.current.map((el) => {
        if (!el) return null
        const box = el.getBoundingClientRect()
        return box.left + box.width / 2 - trackLeft
      })
    }

    let frame
    const tick = () => {
      const bandBox = band.getBoundingClientRect()
      const bandCentre = bandBox.left + bandBox.width / 2
      const reach = bandBox.width * 0.3
      const trackLeft = track.getBoundingClientRect().left
      cardRefs.current.forEach((el, i) => {
        if (!el || centres[i] == null) return
        const distance = Math.abs(trackLeft + centres[i] - bandCentre)
        const near = Math.max(0, 1 - distance / reach)
        // The card at the middle is pushed forward: bigger, fully opaque and lifted
        el.style.transform = `scale(${(0.78 + near * 0.42).toFixed(3)})`
        el.style.opacity = (0.45 + near * 0.55).toFixed(3)
        el.style.zIndex = String(1 + Math.round(near * 20))
        el.classList.toggle('is-active', near > 0.85)
      })
      frame = requestAnimationFrame(tick)
    }

    // Only animate while the band is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measure()
          if (!frame) frame = requestAnimationFrame(tick)
        } else if (frame) {
          cancelAnimationFrame(frame)
          frame = undefined
        }
      },
      { rootMargin: '150px' },
    )
    observer.observe(band)

    const onResize = () => measure()
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={bandRef}
      className="group/band relative mt-14 overflow-hidden py-10"
      aria-label="Our promise: five key areas"
      id={id}
    >
      <div
        ref={trackRef}
        className="flex w-max animate-[marquee_110s_linear_infinite] items-stretch group-hover/band:[animation-play-state:paused] group-focus-within/band:[animation-play-state:paused]"
      >
        {[...Array(COPIES)].flatMap((_, copy) =>
          areas.map(([icon, title, description], n) => (
            <div
              key={`${copy}-${n}`}
              className="w-[19rem] shrink-0 px-3 sm:w-[22rem]"
              aria-hidden={copy > 0 || undefined}
            >
              <div
                ref={(el) => { cardRefs.current[copy * areas.length + n] = el }}
                className="promise-card relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8"
              >
                <span className="promise-card-icon grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand">
                  <Icon name={icon} size={26} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3">{description}</p>
              </div>
            </div>
          )),
        )}
      </div>

      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28" aria-hidden="true" />
    </div>
  )
}
