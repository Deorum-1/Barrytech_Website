import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import soc from '../assets/images/soc.jpg'

const slides = [
  { title: 'Empowering businesses through technology.', text: 'Modern IT and cybersecurity solutions that improve efficiency, strengthen security, and support digital transformation.', cta: ['What we do', '/services'] },
  { title: 'Protecting the digital future.', text: 'From next-generation firewalls to a Security Operations Center, we help you detect, respond to, and recover from cyber threats.', cta: ['Explore cybersecurity', '/services/cybersecurity'] },
  { title: 'Smarter AI. Secure by design.', text: 'Practical AI assistants, automation, and analytics, with the governance to keep your data safe.', cta: ['See AI solutions', '/services/artificial-intelligence'] },
]

export default function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7000); return () => clearInterval(t) }, [])
  const s = slides[i]
  return (
    <section className="swoosh-bg relative overflow-hidden pt-[73px] text-white">
      <img src={soc} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
      <svg className="pointer-events-none absolute -right-24 top-10 w-[900px] max-w-none opacity-80" viewBox="0 0 900 500" fill="none" aria-hidden="true">
        <path d="M30 80 C 300 -10, 800 0, 880 260 C 800 420, 500 470, 330 440" stroke="#0a5a96" strokeWidth="26" strokeLinecap="round" strokeDasharray="1800" strokeDashoffset="1800" className="animate-dash" />
        <path d="M60 450 C -40 300, 40 120, 200 70" stroke="#ff1414" strokeWidth="14" strokeLinecap="round" strokeDasharray="700" strokeDashoffset="700" className="animate-dash" style={{ animationDelay: '.6s' }} />
      </svg>
      <div className="container-x relative flex min-h-[620px] flex-col justify-center py-24">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl">{s.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">{s.text}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to={s.cta[1]} className="btn btn-red">{s.cta[0]}</Link>
              <Link to="/contact" className="btn btn-ghost">Work with us</Link>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 flex gap-2" role="tablist" aria-label="Hero slides">
          {slides.map((_, n) => (
            <button key={n} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? 'w-12 bg-hot' : 'w-6 bg-white/40 hover:bg-white/70'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
