import { Link } from 'react-router-dom'
import { Target, Telescope } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { company } from '../data/company.js'
import soc from '../assets/images/soc.jpg'

export default function About() {
  return (
    <>
      <PageHeader crumb="About us" title="Technology that creates opportunities and protects them." text={company.headline} />
      <section className="container-x grid gap-12 py-24 lg:grid-cols-2">
        <Reveal><h2 className="text-3xl font-bold sm:text-4xl">Who we are</h2><div className="mt-6 space-y-5 text-lg">{company.who.map((p) => <p key={p}>{p}</p>)}</div></Reveal>
        <Reveal delay={0.1}><img src={soc} alt="Cybersecurity operations and threat monitoring" className="rounded-3xl object-cover shadow-xl" /></Reveal>
      </section>
      <section className="bg-brand-50 py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[[Target, 'Our mission', company.mission], [Telescope, 'Our vision', company.vision]].map(([I, t, d]) => (
            <Reveal key={t}><div className="h-full rounded-3xl bg-white p-9 shadow-sm"><I className="text-hot" size={32} /><h3 className="mt-5 text-2xl font-bold">{t}</h3><p className="mt-3 text-lg">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
      <section className="container-x py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">What we do</h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {company.whatWeDo.map(([t, d]) => (
            <Reveal key={t}><div className="border-l-4 border-brand pl-5 transition hover:border-hot"><h3 className="text-lg font-bold">{t}</h3><p className="mt-1">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
      <section className="swoosh-bg py-24 text-white">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our core values</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map(([t, d]) => (
              <Reveal key={t}><div className="h-full rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur transition hover:border-hot hover:bg-white/10"><h3 className="text-xl font-bold text-white">{t}</h3><p className="mt-2 text-slate-300">{d}</p></div></Reveal>
            ))}
          </div>
          <Link to="/contact" className="btn btn-red mt-12">Work with us</Link>
        </div>
      </section>
    </>
  )
}
