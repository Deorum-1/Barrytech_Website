import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/services.js'

export default function Services() {
  usePageMeta(
    'Services',
    'Explore BarryTech services: IT infrastructure, cybersecurity, physical security, managed IT, project management, web development, and AI solutions.',
  )

  return (
    <>
      <PageHeader
        crumb="Services"
        title="IT, security, and AI services under one roof."
        text="Seven service areas, each designed to be reliable, secure, and cost-effective."
      />
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, n) => (
            <Reveal key={s.slug} delay={(n % 2) * 0.08} className="h-full">
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-hot hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.images[0][0]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand shadow-lg transition group-hover:bg-hot group-hover:text-white">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="absolute inset-x-5 bottom-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                    {s.short}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="text-xl font-bold">{s.title}</h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed">{s.intro}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.offerings.slice(0, 3).map(([t]) => (
                      <li key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand">{t}</li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-hot-600">
                    Explore {s.short} <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={0.08} className="h-full">
            <Link
              to="/contact"
              className="group flex h-full flex-col justify-center gap-6 rounded-3xl bg-gradient-to-br from-ink via-brand-900 to-brand-800 p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-hot-400"><MessageCircle size={22} /></span>
                <h2 className="mt-5 text-xl font-bold text-white">Not sure which service fits?</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Tell us what you need to protect, build, or run. We will point you to the right team and next step.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-hot-400">
                Talk to our team <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
