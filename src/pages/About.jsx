import { Target, Telescope } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { company } from '../data/company.js'
import soc from '../assets/images/dashboard.jpg'

export default function About() {
  usePageMeta(
    'About us',
    'BarryTech is a technology-driven IT and cybersecurity company helping organizations protect digital assets and grow with confidence.',
  )

  return (
    <>
      <PageHeader crumb="About us" title="Technology that creates opportunities and protects them." text={company.headline} />

      <section className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="eyebrow">About BarryTech</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Who we are</h2>
          <div className="mt-6 space-y-5 text-lg">{company.who.map((p) => <p key={p}>{p}</p>)}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={soc}
            alt="Cybersecurity monitoring dashboard with infrastructure health and security analytics"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
        </Reveal>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">Purpose</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What drives us</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[[Target, 'Our mission', company.mission], [Telescope, 'Our vision', company.vision]].map(([I, t, d]) => (
              <Reveal key={t} className="h-full">
                <div className="h-full rounded-3xl bg-white p-9 shadow-sm">
                  <I className="text-hot" size={32} />
                  <h3 className="mt-5 text-2xl font-bold">{t}</h3>
                  <p className="mt-3 text-lg">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <p className="eyebrow">Expertise</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What we do</h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {company.whatWeDo.map(([t, d]) => (
            <Reveal key={t}>
              <div className="border-l-4 border-brand pl-5 transition hover:border-hot">
                <h3 className="text-lg font-bold">{t}</h3>
                <p className="mt-1">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="swoosh-bg py-16 text-white sm:py-24">
        <div className="container-x">
          <p className="eyebrow">What guides us</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Our core values</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map(([t, d]) => (
              <Reveal key={t} className="h-full">
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur transition hover:border-hot hover:bg-white/10">
                  <h3 className="text-xl font-bold text-white">{t}</h3>
                  <p className="mt-2 text-slate-300">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
