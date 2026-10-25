import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Icon from './Icon.jsx'
import { services } from '../data/services.js'

const accents = [
  { chip: 'bg-hot-100 text-hot-700', dot: 'bg-hot', tile: 'bg-hot-100 text-hot-700' },
  { chip: 'bg-brand-50 text-brand-700', dot: 'bg-brand', tile: 'bg-brand-50 text-brand' },
  { chip: 'bg-slate-100 text-slate-700', dot: 'bg-ink', tile: 'bg-slate-100 text-ink' },
]

const serviceBySlug = new Map(services.map((service) => [service.slug, service]))

function GoalCard({ card, clone = false, fluid = false }) {
  const { tab, title, desc, slug, accent } = card

  return (
    <Link
      to={`/services/${slug}`}
      tabIndex={clone ? -1 : undefined}
      className={`group/card flex h-full w-full gap-4 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-[0_20px_45px_-35px_rgba(7,27,48,0.45)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_28px_55px_-30px_rgba(7,27,48,0.35)] focus-visible:outline-offset-4 md:flex-col md:gap-0 md:p-0 ${
        fluid ? '' : 'md:w-[21rem] md:shrink-0'
      }`}
    >
      <div className="relative aspect-square w-20 shrink-0 self-start overflow-hidden rounded-2xl sm:w-24 md:aspect-[16/9] md:w-full md:self-auto md:rounded-none">
        <img
          src={card.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        />
        <span
          className="absolute inset-0 hidden bg-gradient-to-t from-ink/55 via-ink/5 to-transparent md:block"
          aria-hidden="true"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col md:p-7">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] md:gap-1.5 md:px-2.5 md:py-1 md:text-[10px] md:tracking-[0.12em] ${accent.chip}`}
          >
            <span className={`h-1 w-1 rounded-full md:h-1.5 md:w-1.5 ${accent.dot}`} aria-hidden="true" />
            {tab}
          </span>
          <span className={`hidden h-10 w-10 shrink-0 place-items-center rounded-2xl md:grid ${accent.tile}`}>
            <Icon name={card.icon} size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        <h3 className="mt-2.5 line-clamp-2 text-base font-bold leading-snug text-ink md:mt-5 md:line-clamp-none md:text-xl">
          {title}
        </h3>
        <p className="mb-4 mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 md:mb-6 md:mt-2.5 md:line-clamp-none md:text-sm">
          {desc}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3 md:pt-4">
          <span className="truncate text-[10px] font-bold uppercase tracking-[0.06em] text-slate-500 md:text-[11px] md:tracking-[0.12em]">
            {card.service.short}
          </span>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand transition duration-300 group-hover/card:bg-hot group-hover/card:text-white md:h-8 md:w-8">
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function CardSet({ cards, clone = false }) {
  return (
    <div
      aria-hidden={clone || undefined}
      className={`${clone ? 'hidden md:flex' : 'flex'} flex-col gap-4 md:flex-row md:shrink-0 md:gap-5 md:pr-5`}
    >
      {cards.map((card) => (
        <GoalCard key={`${card.goalIndex}-${card.itemIndex}`} card={card} clone={clone} />
      ))}
    </div>
  )
}

export default function GoalMarquee({ goals }) {
  const reduce = useReducedMotion()

  const cards = goals.flatMap((goal, goalIndex) =>
    goal.items.map(([title, desc, slug, image], itemIndex) => {
      const service = serviceBySlug.get(slug)
      return {
        tab: goal.tab,
        title,
        desc,
        slug,
        goalIndex,
        itemIndex,
        accent: accents[goalIndex % accents.length],
        icon: service?.icon ?? 'ShieldCheck',
        service: service ?? { short: 'Explore service' },
        image: image ?? service?.images[0]?.[0],
      }
    })
  )

  return (
    <>
      <div className="container-x mt-8 hidden items-center justify-between gap-4 sm:mt-10 md:flex">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Use cases">
          {goals.map((goal, i) => (
            <li key={goal.tab} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${accents[i % accents.length].dot}`} aria-hidden="true" />
              {goal.tab}
            </li>
          ))}
        </ul>
      </div>

      {reduce ? (
        <div className="container-x mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <GoalCard key={`${card.goalIndex}-${card.itemIndex}`} card={card} fluid />
          ))}
        </div>
      ) : (
        <div className="relative mt-8 px-5 sm:px-8 md:mt-6 md:overflow-hidden md:px-0 md:py-3">
          <div className="goal-track flex flex-col gap-4 md:ml-8 md:w-max md:animate-marquee-cards md:flex-row md:gap-0">
            <CardSet cards={cards} />
            {/* three repeats keep the loop seamless even with a short card list */}
            {[1, 2, 3].map((n) => <CardSet key={n} cards={cards} clone />)}
          </div>
          <span
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-brand-50 via-brand-50/80 to-transparent md:block"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-brand-50 via-brand-50/80 to-transparent md:block"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="container-x mt-8 flex justify-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-hot-600"
        >
          Not sure where to start? Talk to our team
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}
