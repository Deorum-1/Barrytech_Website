import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, LifeBuoy, Rocket, Check } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import Counter from '../components/Counter.jsx'
import { services } from '../data/services.js'
import { company } from '../data/company.js'
import datacenter from '../assets/images/datacenter.jpg'

const pillars = [
  [ShieldCheck, 'Digital Protection', "Safeguard your organization's critical assets with layered network, endpoint, cloud, and identity security."],
  [LifeBuoy, 'Service Assurance', 'Drive your business forward without worrying about potential threats or disruptions, backed by proactive monitoring and support.'],
  [Rocket, 'Service Delivery', 'Empowering businesses to navigate the digital landscape with confidence and uninterrupted operations.'],
]

const wants = [
  { tab: 'Protect my business', items: [['Protect your network end-to-end', 'Next-generation firewalls, ZTNA, EDR/XDR, and DDoS protection.', 'cybersecurity'], ['Watch every door', 'CCTV, biometric access control, and integrated security management.', 'physical-security'], ['Prepare for the worst', 'Backup, disaster recovery, and incident response planning.', 'it-infrastructure']] },
  { tab: 'Build and modernize', items: [['Build solid infrastructure', 'Networks, servers, data centers, cloud, and virtualization.', 'it-infrastructure'], ['Launch digital products', 'Websites, e-commerce, web apps, and mobile apps.', 'web-app-development'], ['Deliver on time', 'Structured project management from planning to handover.', 'project-management']] },
  { tab: 'Run and grow smarter', items: [['Hand off daily IT', 'Help desk, managed network, cloud, and cybersecurity services.', 'managed-it'], ['Put AI to work', 'Assistants, automation, analytics, and AI security.', 'artificial-intelligence'], ['Plan your technology', 'IT roadmaps, budgets, asset and license management.', 'managed-it']] },
]

export default function Home() {
  const [tab, setTab] = useState(0)
  return (
    <>
      <Hero />

      {/* stats strip */}
      <section className="bg-brand text-white">
        <div className="container-x grid grid-cols-2 gap-6 py-10 text-center md:grid-cols-4">
          {[[8, '', 'Service areas'], [50, '+', 'Specialist offerings'], [24, '/7', 'Monitoring options'], [100, '%', 'Security-conscious approach']].map(([n, s, l]) => (
            <div key={l}><div className="font-display text-4xl font-extrabold"><Counter to={n} suffix={s} /></div><div className="mt-1 text-sm text-brand-100">{l}</div></div>
          ))}
        </div>
      </section>

      {/* enabling digital success */}
      <section className="container-x py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Enabling digital success</h2>
          <p className="mt-5 text-lg">Organizations move to BarryTech for world-class security and optimization, delivered with a customer-focused, affordable approach.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map(([I, t, d], n) => (
            <Reveal key={t} delay={n * 0.1}>
              <div className="group h-full rounded-3xl border border-slate-200 p-8 transition duration-300 hover:-translate-y-1 hover:border-hot hover:shadow-xl">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand transition group-hover:bg-hot group-hover:text-white"><I size={26} /></span>
                <h3 className="mt-6 text-xl font-bold">{t}</h3>
                <p className="mt-3">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* I want to... */}
      <section className="bg-brand-50 py-24">
        <div className="container-x">
          <Reveal><h2 className="text-3xl font-bold sm:text-5xl">I want to&hellip;</h2></Reveal>
          <div className="mt-8 flex flex-wrap gap-3" role="tablist">
            {wants.map((w, n) => (
              <button key={w.tab} role="tab" aria-selected={tab === n} onClick={() => setTab(n)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition ${tab === n ? 'bg-hot text-white shadow-lg shadow-hot/30' : 'bg-white text-ink hover:bg-brand-100'}`}>{w.tab}</button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3" key={tab}>
            {wants[tab].items.map(([t, d, slug]) => (
              <Link key={t} to={`/services/${slug}`} className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="mt-3 flex-1">{d}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-hot">Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* services grid */}
      <section className="container-x py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-3xl font-bold sm:text-5xl">Everything your technology needs</h2>
          <Link to="/services" className="btn btn-outline">View all services</Link>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group relative bg-white p-7 transition duration-300 hover:bg-ink">
              <Icon name={s.icon} size={30} className="text-brand transition group-hover:text-hot" />
              <h3 className="mt-5 text-lg font-bold transition group-hover:text-white">{s.short}</h3>
              <p className="mt-2 line-clamp-3 text-sm transition group-hover:text-slate-300">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* feature band */}
      <section className="swoosh-bg text-white">
        <div className="container-x grid items-center gap-12 py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-5xl">Why choose BarryTech?</h2>
            <ul className="mt-8 space-y-4">
              {company.whyChoose.map((w) => <li key={w} className="flex gap-3"><Check className="mt-1 shrink-0 text-hot" size={20} /><span className="text-slate-200">{w}</span></li>)}
            </ul>
            <Link to="/about" className="btn btn-red mt-10">About BarryTech</Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-hot to-brand opacity-70 blur-xl animate-drift" />
              <img src={datacenter} alt="Enterprise data center" className="relative rounded-3xl object-cover shadow-2xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* marquee */}
      <section className="overflow-hidden border-b border-slate-100 bg-white py-8" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl font-bold text-brand-200">
          {[...Array(2)].flatMap((_, k) => company.whatWeDo.concat(company.values).map(([t], n) => <span key={`${k}-${n}`}>{t}<span className="ml-12 text-hot">/</span></span>))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-5xl">{company.slogan}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg">Tell us about your environment and we will recommend a practical, secure, and cost-effective path forward.</p>
          <Link to="/contact" className="btn btn-red mt-9">Work with us</Link>
        </Reveal>
      </section>
    </>
  )
}
