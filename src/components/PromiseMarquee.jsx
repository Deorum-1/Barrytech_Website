import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

export default function PromiseMarquee({ areas, id }) {
  const [active, setActive] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion || areas.length < 2) return undefined
    const timer = window.setInterval(() => setActive((current) => (current + 1) % areas.length), 4500)
    return () => window.clearInterval(timer)
  }, [active, areas.length, reduceMotion])

  const midpoint = Math.floor(areas.length / 2)

  return (
    <div className="mt-12" id={id}>
      <div className="container-x grid gap-3 md:hidden">
        {areas.map(([icon, title, description]) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                <Icon name={icon} size={22} />
              </span>
              <h3 className="text-base font-bold text-ink">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
          </article>
        ))}
      </div>

      <div
        className="relative mx-auto hidden h-[480px] max-w-7xl overflow-hidden md:block"
        role="region"
        aria-label="Our promise: five key areas"
        aria-roledescription="carousel"
      >
        {areas.map(([icon, title, description], index) => {
          const offset = ((index - active + areas.length + midpoint) % areas.length) - midpoint
          const distance = Math.abs(offset)
          const y = 74 - distance * 34
          const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.66
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.62 : 0.32
          const x = offset === 0 ? '+ 0px' : `${offset > 0 ? '+' : '-'} min(${distance * 38}vw, ${distance * 17}rem)`

          return (
            <article
              key={title}
              aria-hidden={distance > 1}
              aria-label={`${index + 1} of ${areas.length}: ${title}`}
              className="absolute left-1/2 top-7 flex h-[390px] w-[min(82vw,24rem)] flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-ink/10 transition-[transform,opacity,box-shadow,border-color] duration-700 ease-in-out sm:h-[360px] sm:p-8"
              style={{
                transform: `translateX(calc(-50% ${x})) translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex: 10 - distance,
                borderColor: distance === 0 ? 'rgba(10, 90, 150, .35)' : undefined,
                boxShadow: distance === 0 ? '0 24px 60px -24px rgba(7, 27, 48, .35)' : undefined,
              }}
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-500 ${distance === 0 ? 'bg-brand text-white' : 'bg-brand-50 text-brand'}`}>
                <Icon name={icon} size={26} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
            </article>
          )
        })}
      </div>

    </div>
  )
}
