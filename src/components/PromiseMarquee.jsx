import Icon from './Icon.jsx'

// The key areas run as a marquee on pure CSS. The band is padded by half a card,
// which cancels the band width out of the maths: card "k" is then centred at
// t = 11k − 55s. Every card shares one "grow at the middle" keyframe, delayed by
// its own slot, so the prominent card stays locked to the middle of the band
// without any JS timing.
const COPIES = 4
const DURATION = 110 // seconds — must match the marquee duration below
const TRACK_DELAY = -DURATION / 2

export default function PromiseMarquee({ areas, id }) {
  const slot = DURATION / (2 * areas.length)

  return (
    <div
      className="promise-band relative mt-14 overflow-hidden py-10 pl-[calc(50%_-_9.5rem)] sm:pl-[calc(50%_-_11rem)]"
      aria-label="Our promise: five key areas"
      id={id}
    >
      <div
        className="flex w-max animate-[marquee_110s_linear_infinite] items-stretch"
        style={{ animationDelay: `${TRACK_DELAY}s` }}
      >
        {[...Array(COPIES)].flatMap((_, copy) =>
          areas.map(([icon, title, description], n) => {
            const slotIndex = copy * areas.length + n
            return (
              <div
                key={`${copy}-${n}`}
                className="w-[19rem] shrink-0 px-3 sm:w-[22rem]"
                aria-hidden={copy > 0 || undefined}
              >
                <div
                  className="promise-card relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8"
                  style={{ '--promise-delay': `${((slot * slotIndex) % DURATION) - DURATION}s` }}
                >
                  <span className="promise-card-icon grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand">
                    <Icon name={icon} size={26} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-3">{description}</p>
                </div>
              </div>
            )
          }),
        )}
      </div>

      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28" aria-hidden="true" />
    </div>
  )
}
