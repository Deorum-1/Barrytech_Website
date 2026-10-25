import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// The key areas sit on a cylinder that turns on its own: only the front half
// faces the viewer, the card at the front is the largest, and the cards curving
// away to either side shrink and fade out.
const TURN_MS = 46000 // one full revolution
const WIDE_QUERY = '(min-width: 768px)'

export default function PromiseMarquee({ areas, id }) {
  const bandRef = useRef(null)
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  // Wide screens carry two passes of the five areas so the arc reads as a curve;
  // narrow screens keep one pass so a single card can hold the middle.
  const [copies, setCopies] = useState(1)
  const count = areas.length * copies
  const step = 360 / count

  useEffect(() => {
    const query = window.matchMedia(WIDE_QUERY)
    const apply = () => setCopies(query.matches ? 2 : 1)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const band = bandRef.current
    const stage = stageRef.current
    const cards = cardRefs.current.slice(0, count).filter(Boolean)
    if (!band || !stage || !cards.length) return

    let angle = 0
    let radius = 400

    const place = () => {
      cards.forEach((el, i) => {
        const phi = i * step + angle
        const front = Math.max(0, Math.cos((phi * Math.PI) / 180)) // 1 at the front of the cylinder
        // The front card is solid and full size; the further a card turns away,
        // the smaller and fainter it gets until it drops out of sight at the back.
        const shown = front <= 0.1 ? 0 : Math.pow((front - 0.1) / 0.9, 1.2)
        el.style.transform =
          `translate(-50%, -50%) rotateY(${phi.toFixed(2)}deg) ` +
          `translateZ(${radius.toFixed(1)}px) scale(${(0.58 + front * front * 0.72).toFixed(3)})`
        el.style.opacity = shown.toFixed(3)
        el.style.zIndex = String(1 + Math.round(front * 40))
        el.style.pointerEvents = front > 0 ? 'auto' : 'none'
        el.classList.toggle('is-active', front > 0.93)
      })
    }

    // The radius follows the card width so the gaps stay even all the way round,
    // and pushing the stage back puts the front card on the perspective plane so
    // it renders at its natural size.
    const layout = () => {
      const width = band.getBoundingClientRect().width
      const cardWidth = cards[0].offsetWidth || 300
      const ring = cardWidth / (2 * Math.tan(Math.PI / count))
      radius = Math.min(ring, (width / 2 - cardWidth / 4) / 0.588)
      stage.style.transform = `translateZ(${-radius.toFixed(1)}px)`
      place()
    }
    layout()

    let resizeFrame
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(layout)
    }
    window.addEventListener('resize', onResize)

    // Reduced motion: hold the cylinder still with the first card at the front.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        cancelAnimationFrame(resizeFrame)
        window.removeEventListener('resize', onResize)
      }
    }

    let last = performance.now()
    let held = false
    let frame
    const tick = (now) => {
      const delta = Math.min(64, now - last) // ignore long gaps from a backgrounded tab
      last = now
      if (!held) {
        angle = (angle - (delta / TURN_MS) * 360) % 360
        place()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // Hold the cylinder while the pointer or the keyboard focus is inside it.
    const hold = () => { held = true }
    const release = () => { held = false }
    band.addEventListener('pointerenter', hold)
    band.addEventListener('pointerleave', release)
    band.addEventListener('focusin', hold)
    band.addEventListener('focusout', release)

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      band.removeEventListener('pointerenter', hold)
      band.removeEventListener('pointerleave', release)
      band.removeEventListener('focusin', hold)
      band.removeEventListener('focusout', release)
      window.removeEventListener('resize', onResize)
    }
  }, [count, step])

  return (
    <div
      ref={bandRef}
      className="relative mt-14 overflow-hidden py-10 [perspective:1500px]"
      aria-label="Our promise: five key areas"
      id={id}
    >
      <div ref={stageRef} className="relative mx-auto h-[24rem] w-full [transform-style:preserve-3d]">
        {[...Array(copies)].flatMap((_, copy) =>
          areas.map(([icon, title, description], n) => (
            <div
              key={`${copy}-${n}`}
              ref={(el) => { cardRefs.current[copy * areas.length + n] = el }}
              className="absolute left-1/2 top-1/2 h-full w-[17rem] will-change-transform sm:w-[19rem]"
              aria-hidden={copy > 0 || undefined}
            >
              <div className="promise-card relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <span className="promise-card-icon grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand sm:h-14 sm:w-14">
                  <Icon name={icon} size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">{title}</h3>
                <p className="mt-3">{description}</p>
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  )
}
