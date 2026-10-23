import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ClipboardCheck, Headphones, MousePointer2, PenTool, Rocket } from 'lucide-react'
import logo from '../assets/logo.png'

const CX = 260
const CY = 260
const R_OUTER = 250
const R_MID = 158
const R_CENTER = 56
const SEGMENT = 120
const GAP = 0.4
const LABEL_RADIUS = 182

const fills = [
  ['#2f86c4', '#0a5a96'],
  ['#0a5a96', '#084a7d'],
  ['#0d609c', '#073b64'],
]

const journey = [
  [ClipboardCheck, 'Assess'],
  [PenTool, 'Design'],
  [Rocket, 'Deploy'],
  [Headphones, 'Support'],
]

function polar(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

function wedgePath(i) {
  const start = i * SEGMENT + GAP
  const end = (i + 1) * SEGMENT - GAP
  const a = polar(R_OUTER, start)
  const b = polar(R_OUTER, end)
  const c = polar(R_MID, end)
  const d = polar(R_MID, start)
  return [
    `M ${a.x} ${a.y}`,
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${b.x} ${b.y}`,
    `L ${c.x} ${c.y}`,
    `A ${R_MID} ${R_MID} 0 0 0 ${d.x} ${d.y}`,
    'Z',
  ].join(' ')
}

function rimPath(i) {
  const start = i * SEGMENT + GAP + 2.5
  const end = (i + 1) * SEGMENT - GAP - 2.5
  const a = polar(R_OUTER - 7, start)
  const b = polar(R_OUTER - 7, end)
  return `M ${a.x} ${a.y} A ${R_OUTER - 7} ${R_OUTER - 7} 0 0 1 ${b.x} ${b.y}`
}

const labelPoint = (i) => polar(LABEL_RADIUS, i * SEGMENT + SEGMENT / 2)
const pct = (v) => `${(v / 520) * 100}%`

export default function GoalWheel({ goals }) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(null)
  const reduce = useReducedMotion()
  const goal = goals[active]

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <div className="mx-auto w-full max-w-[540px] lg:order-2">
        <div className="relative aspect-square w-full">
          <div
            aria-hidden="true"
            className="absolute -inset-6 animate-halo rounded-full bg-[radial-gradient(circle,rgba(47,134,196,0.32),rgba(47,134,196,0)_66%)] opacity-50 blur-2xl"
          />

          <svg
            viewBox="0 0 520 520"
            className="absolute inset-0 h-full w-full drop-shadow-[0_28px_50px_rgba(7,27,48,0.25)]"
            aria-hidden="true"
          >
            <defs>
              {fills.map(([from, to], i) => (
                <linearGradient key={from} id={`goal-fill-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={from} />
                  <stop offset="100%" stopColor={to} />
                </linearGradient>
              ))}
              <radialGradient id="goal-inner" cx="50%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#0f558c" />
                <stop offset="65%" stopColor="#08436e" />
                <stop offset="100%" stopColor="#052d4c" />
              </radialGradient>
              <radialGradient id="goal-gloss" cx="28%" cy="18%" r="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={R_OUTER} fill="#04182a" />

            {goals.map((g, i) => (
              <g
                key={g.tab}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
                style={{
                  transformBox: 'view-box',
                  transformOrigin: '260px 260px',
                  transform: hovered === i && active !== i ? 'scale(1.016)' : 'scale(1)',
                  transition: reduce ? 'none' : 'transform 0.35s ease',
                }}
              >
                <path
                  d={wedgePath(i)}
                  fill={`url(#goal-fill-${i})`}
                  style={{
                    filter:
                      active === i ? 'brightness(1.08)' : hovered === i ? 'brightness(0.9)' : 'brightness(0.6)',
                    transition: reduce ? 'none' : 'filter 0.35s ease',
                  }}
                />
                <motion.path
                  d={rimPath(i)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="pointer-events-none"
                  initial={false}
                  animate={{
                    pathLength: active === i || hovered === i ? 1 : 0,
                    opacity: active === i ? 0.6 : hovered === i ? 0.32 : 0,
                  }}
                  transition={{ duration: reduce ? 0 : 0.55, ease: 'easeOut' }}
                />
              </g>
            ))}

            <circle cx={CX} cy={CY} r={R_OUTER} fill="url(#goal-gloss)" className="pointer-events-none" />
            <circle cx={CX} cy={CY} r={R_MID} fill="url(#goal-inner)" stroke="#000000" strokeOpacity="0.18" />
            <circle cx={CX} cy={CY} r={R_CENTER} fill="#071b30" />
          </svg>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg viewBox="0 0 520 520" className="h-full w-full animate-orbit">
              <circle
                cx={CX}
                cy={CY}
                r={253}
                fill="none"
                stroke="#2f86c4"
                strokeOpacity="0.7"
                strokeWidth="1.8"
                strokeDasharray="2 12"
                strokeLinecap="round"
              />
              <circle cx={CX} cy="7" r="7" fill="#ff1414" opacity="0.2" />
              <circle cx={CX} cy="7" r="3" fill="#ff1414" />
            </svg>
          </div>

          {goals.map((g, i) => {
            const p = labelPoint(i)
            return (
              <button
                key={g.tab}
                type="button"
                id={`goal-tab-${i}`}
                aria-pressed={active === i}
                aria-controls="goal-solutions"
                aria-describedby="goal-wheel-hint"
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="absolute w-[34%] max-w-[10rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl px-2 py-2 text-center font-display text-[clamp(0.8rem,1.6vw,1.05rem)] font-bold leading-snug text-white [text-shadow:0_1px_12px_rgba(0,20,40,0.45)] transition hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:hover:scale-100"
                style={{ left: pct(p.x), top: pct(p.y) }}
              >
                {g.tab}
                <span
                  aria-hidden="true"
                  style={active === i ? undefined : { animationDelay: `${i * 0.4}s` }}
                  className={`mx-auto mt-2 block h-0.5 rounded-full bg-white transition-all duration-300 ${
                    active === i ? 'w-8 opacity-80' : 'w-4 animate-underline opacity-20'
                  }`}
                />
              </button>
            )
          })}

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 aspect-square w-[60.8%] -translate-x-1/2 -translate-y-1/2">
              {journey.map(([I, label], i) => {
                const positions = [
                  'left-1/2 top-[14%] w-[34%] -translate-x-1/2 -translate-y-1/2',
                  'right-[3%] top-1/2 w-[26%] -translate-y-1/2',
                  'left-1/2 bottom-[14%] w-[34%] -translate-x-1/2 translate-y-1/2',
                  'left-[3%] top-1/2 w-[26%] -translate-y-1/2',
                ]
                return (
                  <div key={label} className={`absolute flex flex-col items-center gap-1.5 text-center ${positions[i]}`}>
                    <I className="h-3 w-3 text-white/70 sm:h-3.5 sm:w-3.5" strokeWidth={1.6} />
                    <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[9px]">
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="absolute left-1/2 top-1/2 flex h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <img src={logo} alt="" className="w-[80%]" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <p
            id="goal-wheel-hint"
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-4 py-2 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur"
          >
            <MousePointer2
              size={15}
              aria-hidden="true"
              className="animate-tap text-hot motion-reduce:animate-none"
            />
            <span>Click or tap a slice to explore</span>
          </p>
        </div>
      </div>

      <div className="relative lg:order-1">
        <p className="sr-only" aria-live="polite">
          Showing solutions for {goal.tab}.
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={goal.tab}
            id="goal-solutions"
            role="region"
            aria-label={`${goal.tab} solutions`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white bg-white p-6 shadow-[0_30px_70px_-40px_rgba(7,27,48,0.45)] sm:p-8"
          >
            <p className="eyebrow">Your goal</p>
            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{goal.tab}</h3>
            <p className="mt-2 text-sm text-slate-500">Three ways we can help you get there.</p>

            <ul className="mt-6 divide-y divide-slate-100">
              {goal.items.map(([title, desc, slug], n) => (
                <li key={title}>
                  <Link
                    to={`/services/${slug}`}
                    className="group -mx-2 flex items-start gap-4 rounded-2xl px-2 py-4 transition hover:bg-brand-50"
                  >
                    <span className="mt-0.5 font-display text-xs font-bold text-hot/70">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3 font-semibold text-ink">
                        {title}
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-hot"
                        />
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">{desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link to="/contact" className="btn btn-red">
                Talk to our team <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="text-sm font-semibold text-brand transition hover:text-hot">
                Browse all services
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
