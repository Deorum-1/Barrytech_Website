import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// The key areas sit on a ring that turns slowly like a carousel: the card facing
// the front of the ring is the one in view, so it carries the weight of the section.
const TURN_MS = 46000 // one full turn
const LIFT = 34 // how far the cards at the back ride up, so the ring reads as a circle

export default function PromiseMarquee({ areas }) {
  const bandRef = useRef(null)
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const count = areas.length
  const step = 360 / count

  useEffect(() => {
    const band = bandRef.current
    const stage = stageRef.current
    const cards = cardRefs.current.slice(0, count).filter(Boolean)
    if (!band || !stage || !cards.length) return

    let angle = 0
    let radius = 300

    const place = () => {
      cards.forEach((el, i) => {
        const phi = i * step + angle
        const rad = (phi * Math.PI) / 180
        const facing = Math.cos(rad) // 1 when the card is at the front of the ring
        const near = Math.pow((facing + 1) / 2, 1.6) // curved falloff towards the back
        const lift = (1 - Math.cos(rad)) * LIFT
        el.style.transform =
          `translate(-50%, -50%) translateY(${(-lift).toFixed(1)}px) ` +
          `rotateY(${phi.toFixed(2)}deg) translateZ(${radius}px) ` +
          `scale(${(0.82 + near * 0.3).toFixed(3)})`
        const card = el.firstElementChild
        card.style.opacity = (0.06 + near * 0.94).toFixed(3)
        card.classList.toggle('is-active', facing > 0.9)
      })
    }

    // The radius follows the card width so the ring stays a circle on any screen.
    // Pushing the stage back puts the front card on the perspective plane, so it
    // renders at its natural size while the cards behind it recede.
    const layout = () => {
      const width = band.getBoundingClientRect().width
      radius = Math.round(Math.min(cards[0].offsetWidth * 0.86, width / 2 - 8))
      stage.style.transform = `translateZ(${-radius}px)`
      place()
    }

    layout()

    let resizeFrame
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(layout)
    }
    window.addEventListener('resize', onResize)

    // Reduced motion: hold the ring still with the first card facing the viewer.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        cancelAnimationFrame(resizeFrame)
        window.removeEventListener('resize', onResize)
      }
    }

    let last = performance.now()
    let paused = false
    let frame

    const tick = (now) => {
      const dt = Math.min(64, now - last) // ignore long gaps, e.g. a backgrounded tab
      last = now
      if (!paused) {
        angle = (angle + (dt / TURN_MS) * 360) % 360
        place()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const hold = () => { paused = true }
    const release = () => { paused = false }
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
      className="cinema-band relative mt-14 overflow-hidden py-24 [perspective:1400px]"
      aria-label="Our promise: five key areas"
    >
      <div ref={stageRef} className="relative mx-auto h-[26rem] w-full [transform-style:preserve-3d] sm:h-[24rem]">
        {areas.map(([icon, title, description], i) => (
          <div
            key={title}
            ref={(el) => { cardRefs.current[i] = el }}
            className="absolute left-1/2 top-1/2 h-full w-72 will-change-transform sm:w-80"
          >
            <div className="promise-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-800/70 via-ink to-ink p-6 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.95)] sm:p-8">
              {/* a beam of light along the top edge, like projector spill */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-hot/70 to-transparent" />
              <span className="promise-card-icon grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-hot-400 backdrop-blur transition-colors duration-500 sm:h-14 sm:w-14">
                <Icon name={icon} size={26} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white sm:mt-6 sm:text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
              <span className="mt-auto pt-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/35">
                {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* cinema framing: the ring fades into darkness inside the vignette */}
      <span aria-hidden="true" className="cinema-vignette pointer-events-none absolute inset-0 z-10" />
      <span aria-hidden="true" className="cinema-grain pointer-events-none absolute inset-0 z-10" />
    </div>
  )
}
