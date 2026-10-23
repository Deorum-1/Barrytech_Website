import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { getService, services } from '../data/services.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  const [open, setOpen] = useState(0)
  if (!s) return <Navigate to="/services" replace />
  const others = services.filter((x) => x.slug !== s.slug)
  return (
    <>
      <PageHeader crumb={<><Link to="/services" className="hover:text-white">Services</Link> / {s.short}</>} title={s.title} text={s.tagline} />
      <section className="container-x py-20">
        <Reveal><p className="max-w-3xl text-xl leading-relaxed text-ink">{s.intro}</p></Reveal>
        <div className={`mt-12 grid gap-5 ${s.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {s.images.map(([src, cap]) => (
            <figure key={cap} className="overflow-hidden rounded-3xl"><img src={src} alt={cap} className="h-72 w-full object-cover transition duration-700 hover:scale-105 sm:h-96" /><figcaption className="bg-brand-50 px-5 py-3 text-sm text-slate-600">{cap}</figcaption></figure>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-20">
        <div className="container-x">
          <h2 className="text-3xl font-bold sm:text-4xl">What we offer</h2>
          <div className="mt-10 space-y-3">
            {s.offerings.map(([t, d, bullets], n) => {
              const isOpen = open === n
              return (
                <div key={t} className={`overflow-hidden rounded-2xl bg-white transition ${isOpen ? 'shadow-lg ring-2 ring-hot/40' : 'shadow-sm'}`}>
                  <button className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : n)}>
                    <span className="font-display text-lg font-bold text-ink">{t}</span>
                    <ChevronDown className={`shrink-0 text-hot transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-7">
                      <p className="max-w-3xl">{d}</p>
                      <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">{bullets.map((b) => <li key={b} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0 text-brand" />{b}</li>)}</ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {s.delivery && (
        <section className="container-x py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">Delivery models</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">{s.delivery.map(([t, d]) => <Reveal key={t}><div className="h-full rounded-2xl border border-slate-200 p-7"><h3 className="text-lg font-bold">{t}</h3><p className="mt-2">{d}</p></div></Reveal>)}</div>
        </section>
      )}

      {s.why && (
        <section className="container-x grid gap-14 py-20 lg:grid-cols-2">
          <div><h2 className="text-3xl font-bold">Why choose BarryTech?</h2><ul className="mt-8 space-y-5">{s.why.map(([t, d]) => <li key={t}><strong className="text-ink">{t}.</strong> {d}</li>)}</ul></div>
          <div><h2 className="text-3xl font-bold">Our approach</h2><ol className="mt-8 space-y-6 border-l-2 border-brand-100 pl-8">{s.approach.map(([t, d]) => <li key={t} className="relative"><span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-hot ring-2 ring-hot/30" /><strong className="text-ink">{t}.</strong> {d}</li>)}</ol></div>
        </section>
      )}

      <section className="swoosh-bg py-20 text-center text-white">
        <div className="container-x"><h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">{s.closing}</h2><Link to="/contact" className="btn btn-red mt-8">Talk to our team</Link></div>
      </section>

      <section className="container-x py-16">
        <h3 className="text-xl font-bold">More services</h3>
        <div className="mt-6 flex flex-wrap gap-3">{others.map((o) => <Link key={o.slug} to={`/services/${o.slug}`} className="btn btn-outline">{o.short}</Link>)}</div>
      </section>
    </>
  )
}
