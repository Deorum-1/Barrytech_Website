import { Link } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import LazyVideo from '../components/LazyVideo.jsx'
import GoalMarquee from '../components/GoalMarquee.jsx'
import PromiseMarquee from '../components/PromiseMarquee.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/services.js'
import { company } from '../data/company.js'
// Used as the poster and the reduced-motion fallback for the feature band video
import datacenter from '../assets/images/datacenter.jpg'
import soc from '../assets/images/cloud-platform.jpg'
import networkSupport from '../assets/images/network-support.jpg'
import webProducts from '../assets/images/dashboard.png'
import projectDelivery from '../assets/images/datacenter.jpg'

// The five key areas that enable digital success (our promise section)
const keyAreas = [
  ['Server', 'IT Infrastructure and Cloud Solutions', 'Build a reliable, scalable, and high-performance technology foundation through enterprise networking, data centers, cloud computing, and IT systems management.'],
  ['ShieldCheck', 'Cybersecurity and Digital Trust', 'Protect organizational systems, data, applications, and users through network security, endpoint protection, identity management, threat detection, and risk management.'],
  ['BrainCircuit', 'Artificial Intelligence and Digital Innovation', 'Accelerate business growth through AI adoption, intelligent automation, AI security, and innovative digital technologies.'],
  ['Code2', 'Digital Transformation and Business Applications', 'Modernize business operations through application development, system integration, process automation, data analytics, and digital platforms.'],
  ['Headset', 'Managed Services, Consulting and Digital Skills', 'Ensure operational excellence and sustainable digital growth through IT support, technology consulting, project management, and professional training.'],
]

// Solutions by use case — one card per outcome a business actually asks for
const wants = [
  { tab: 'Digital products', items: [['Launch digital products', 'Websites, e-commerce, web apps, and mobile apps built for growth.', 'web-app-development', webProducts]] },
  { tab: 'Project delivery', items: [['Deliver on time', 'Structured project management from planning through handover.', 'project-management', projectDelivery]] },
  { tab: 'Managed IT', items: [['Hand off daily IT', 'Help desk, managed network, cloud, and cybersecurity services.', 'managed-it', networkSupport]] },
  { tab: 'Cybersecurity', items: [['Protect your organization end to end', 'Next-generation firewalls, ZTNA, EDR/XDR, and DDoS protection.', 'cybersecurity', soc]] },
  { tab: 'IT infrastructure', items: [['Build solid infrastructure', 'Networks, servers, data centers, cloud, and virtualization.', 'it-infrastructure', datacenter]] },
]

// Ribbon content: top row lists our services, bottom row lists the sub-services behind them
const serviceRibbon = services.map((s) => s.short)
const subServiceRibbon = services.flatMap((s) => s.offerings.slice(0, 4).map(([title]) => title))

export default function Home() {
  usePageMeta(
    null,
    'BarryTech delivers cybersecurity, IT infrastructure, managed IT, physical security, software, and AI solutions for businesses in Nigeria.',
  )

  return (
    <>
      <Hero />

      {/* marquee ribbon */}
      <section className="overflow-hidden bg-ink py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
          {/* four repeats keep the ribbon seamless even on ultra-wide screens */}
          {[...Array(4)].flatMap((_, k) =>
            serviceRibbon.map((t, n) => (
              <span key={`${k}-${n}`} className="flex items-center font-display text-sm font-bold uppercase tracking-widest text-slate-400">
                <span className="px-8">{t}</span>
                <span className="text-hot">✦</span>
              </span>
            ))
          )}
        </div>
        <div className="mt-3 flex w-max animate-[marquee_240s_linear_infinite_reverse] gap-0 whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) =>
            subServiceRibbon.map((t, n) => (
              <span key={`${k}-${n}`} className="flex items-center font-display text-sm font-bold uppercase tracking-widest text-slate-600">
                <span className="px-8">{t}</span>
                <span className="text-brand-400">✦</span>
              </span>
            ))
          )}
        </div>
      </section>

      {/* enabling digital success */}
      <section id="enabling-digital-success" data-nav-switch className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Enabling digital success</h2>
            <p className="mt-5 text-lg">Organizations move to BarryTech for world-class security and optimization, delivered with a customer-focused, affordable approach.</p>
          </Reveal>
        </div>
        <PromiseMarquee areas={keyAreas} />
      </section>

      {/* I want to... */}
      <section className="bg-brand-50 py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Solutions by use case</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">I want to&hellip;</h2>
            </div>
            <p className="max-w-sm">Explore the services behind each use case, organized by the outcome you need.</p>
          </Reveal>
        </div>

        <GoalMarquee goals={wants} />
      </section>

      {/* services grid */}
      <section className="container-x py-20 sm:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-5xl">Everything your technology needs</h2>
          </div>
          <Link to="/services" className="btn btn-outline">View all services</Link>
        </Reveal>
        <div className="mt-12 grid auto-rows-fr gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group relative block h-full min-h-[13rem] bg-white [perspective:1200px] sm:min-h-[14rem]">
              <div className="flip-inner relative h-full w-full transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                {/* front — the service name */}
                <div className="flip-face flex h-full flex-col items-start justify-center gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand transition group-hover:bg-hot group-hover:text-white">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h3 className="text-xl font-bold leading-tight">{s.short}</h3>
                </div>
                {/* back — what the service covers */}
                <div className="flip-face flip-face-back absolute inset-0 flex flex-col bg-ink p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-hot-400">{s.short}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-300">{s.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-hot-400">
                    Explore service <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <Link to="/contact" className="group relative flex flex-col justify-between gap-6 bg-ink p-7 text-white transition duration-300 hover:bg-brand-800">
            <div>
              <MessageCircle size={30} className="text-hot" />
              <h3 className="mt-5 text-lg font-bold text-white">Not sure where to start?</h3>
              <p className="mt-2 text-sm text-slate-300">Tell us what is slowing you down. We will point you to the right service.</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-hot-400">
              Talk to our team <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* how we work */}
      <section className="border-t border-slate-100 bg-white pb-20 pt-20 sm:pb-24 sm:pt-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">A clear path of our approach from assessment to support.</h2>
            <p className="mt-5 text-lg">No jargon and no surprises. You always know what we are doing, why it matters, and what happens next.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {company.howWeWork.map(([t, d], n) => (
              <Reveal key={t} delay={n * 0.08} className="h-full">
                <div className="relative h-full rounded-3xl border border-slate-200 p-7 transition duration-300 hover:border-brand-200 hover:shadow-lg">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-hot-600 font-display text-sm font-bold text-white">{n + 1}</span>
                  <h3 className="mt-5 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* feature band: full-bleed background video */}
      <section className="swoosh-bg relative isolate overflow-hidden text-white">
        <img
          src={datacenter}
          alt=""
          className="absolute inset-0 -z-20 hidden h-full w-full object-cover motion-reduce:block"
        />
        <LazyVideo
          src="/videos/hero-bg.mp4"
          poster={datacenter}
          className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        />
        {/* dark brand overlay keeps text readable over any footage */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-brand-800/70" />

        <div className="container-x py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The BarryTech difference</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">Why choose BarryTech?</h2>
            <ul className="mt-8 space-y-4">
              {company.whyChoose.map((w) => <li key={w} className="flex gap-3"><Check className="mt-1 shrink-0 text-hot" size={20} /><span className="text-slate-200">{w}</span></li>)}
            </ul>
            <Link to="/about" className="btn btn-red mt-10">About BarryTech</Link>
          </Reveal>
        </div>
      </section>

      {/* marquee — our core values */}
      <section className="overflow-hidden border-b border-slate-100 bg-white py-8" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap font-display text-2xl font-bold text-brand-200">
          {/* four repeats keep one loop half wider than an ultra-wide screen */}
          {[...Array(4)].flatMap((_, k) =>
            company.values.map(([t], n) => (
              <span key={`${k}-${n}`} className="flex items-center">
                {t}
                <span className="ml-12 text-hot">/</span>
              </span>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20 text-center sm:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-5xl">{company.slogan}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg">Tell us about your environment and we will recommend a practical, secure, and cost-effective path forward.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn-red">Work with us <ArrowRight size={16} /></Link>
            <a href={`tel:${company.contact.phoneHref}`} className="btn btn-outline">
              <Phone size={15} /> Call {company.contact.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
