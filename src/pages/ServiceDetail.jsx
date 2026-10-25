import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { getService, services } from '../data/services.js'
import { company } from '../data/company.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)

  usePageMeta(s ? s.title : 'Service not found', s ? s.tagline : undefined)

  if (!s) return <Navigate to="/services" replace />
  const others = services.filter((x) => x.slug !== s.slug)

  return (
    <>
      <PageHeader
        crumb={<><Link to="/services" className="transition hover:text-white">Services</Link><span className="mx-2 text-brand-300">/</span>{s.short}</>}
        title={s.title}
        text={s.tagline}
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <Reveal><p className="text-lg leading-relaxed text-ink sm:text-xl">{s.intro}</p></Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-slate-200 bg-brand-50 p-6">
              <p className="font-display text-lg font-bold text-ink">Need this for your business?</p>
              <p className="mt-2 text-sm">Talk to a BarryTech specialist and get a practical recommendation.</p>
              <div className="mt-5 flex flex-col gap-2">
                <Link to="/contact" className="btn btn-red justify-center">Talk to our team <ArrowRight size={16} /></Link>
                <a href={`tel:${company.contact.phoneHref}`} className="btn justify-center border border-brand-200 bg-white text-brand hover:bg-white/70">
                  <Phone size={15} /> {company.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5">
          {s.images.map(([src, cap, desktopSrc]) => (
            <figure key={cap} className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl">
              <picture className="block">
                {desktopSrc && <source media="(min-width: 1024px)" srcSet={desktopSrc} />}
                <img
                  src={src}
                  alt={cap}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover transition duration-700 hover:scale-105"
                />
              </picture>
              <figcaption className="bg-brand-50 px-5 py-3 text-sm text-slate-600">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="what-we-offer" aria-labelledby="what-we-offer-title" className="bg-brand-50 py-16 sm:py-20">
        <div className="container-x">
          <header className="max-w-3xl">
            <p className="eyebrow">Service capabilities</p>
            <h2 id="what-we-offer-title" className="mt-3 text-3xl font-bold sm:text-4xl">What we offer</h2>
            <p className="mt-4 leading-relaxed text-slate-600">Explore the specific services, tools, and support available in this area.</p>
          </header>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {s.offerings.map(([t, d, bullets], index) => (
              <article key={t} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hot-400 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 group-hover:bg-hot/10 group-hover:text-hot-600 motion-reduce:transform-none motion-reduce:transition-none">
                    <Icon name={s.offerIcons[index]} size={21} strokeWidth={1.8} />
                  </span>
                  <h3 className="pt-1 text-lg font-bold leading-snug text-ink sm:text-xl">{t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Included</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700">
                    {bullets.map((b) => <li key={b} className="flex gap-2"><Check size={17} className="mt-0.5 shrink-0 text-brand" />{b}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {s.delivery && (
        <section className="container-x py-16 sm:py-20">
          <p className="eyebrow">Flexible engagement</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Delivery models</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {s.delivery.map(([t, d]) => (
              <Reveal key={t} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 p-7 transition hover:border-brand-200 hover:shadow-lg">
                  <h3 className="text-lg font-bold">{t}</h3>
                  <p className="mt-2">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {(s.why || s.approach) && (
        <section className={`container-x grid gap-14 py-16 sm:py-20 ${s.why && s.approach ? 'lg:grid-cols-2' : ''}`}>
          {s.why && (
            <div>
              <h2 className="text-3xl font-bold">Why choose BarryTech?</h2>
              <ul className="mt-8 space-y-5">{s.why.map(([t, d]) => <li key={t}><strong className="text-ink">{t}.</strong> {d}</li>)}</ul>
            </div>
          )}
          {s.approach && (
            <div>
              <h2 className="text-3xl font-bold">Our approach</h2>
              <ol className="mt-8 space-y-6 border-l-2 border-brand-100 pl-8">
                {s.approach.map(([t, d]) => (
                  <li key={t} className="relative">
                    <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-hot ring-2 ring-hot/30" />
                    <strong className="text-ink">{t}.</strong> {d}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}

      <section className="swoosh-bg py-16 text-center text-white sm:py-20">
        <div className="container-x">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">{s.closing}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn-red">Talk to our team <ArrowRight size={16} /></Link>
            <a href={`tel:${company.contact.phoneHref}`} className="btn btn-ghost"><Phone size={15} /> Call us</a>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-xl font-bold">Explore more services</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/services/${o.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-semibold text-ink transition hover:border-hot hover:text-hot-600"
            >
              {o.short}
              <ArrowRight size={15} className="shrink-0 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
