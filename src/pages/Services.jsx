import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <>
      <PageHeader crumb="Services" title="IT, security, and AI services under one roof." text="Eight service areas, each designed to be reliable, secure, and cost-effective." />
      <section className="container-x grid gap-6 py-24 md:grid-cols-2">
        {services.map((s, n) => (
          <Reveal key={s.slug} delay={(n % 2) * 0.1}>
            <Link to={`/services/${s.slug}`} className="group flex h-full flex-col rounded-3xl border border-slate-200 p-8 transition duration-300 hover:-translate-y-1 hover:border-hot hover:shadow-xl">
              <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white transition group-hover:bg-hot"><Icon name={s.icon} size={26} /></span><h2 className="text-xl font-bold">{s.title}</h2></div>
              <p className="mt-5 flex-1">{s.intro}</p>
              <ul className="mt-5 flex flex-wrap gap-2">{s.offerings.slice(0, 4).map(([t]) => <li key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand">{t}</li>)}</ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-hot">Explore <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}
