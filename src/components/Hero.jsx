import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import soc from '../assets/images/soc.jpg'
import datacenter from '../assets/images/datacenter.jpg'
import dashboard from '../assets/images/dashboard.jpg'

const slides = [
  {
    title: 'Empowering businesses through technology.',
    text: 'Modern IT and cybersecurity solutions that improve efficiency, strengthen security, and support digital transformation.',
    cta: ['What we do', '/services'],
    video: '/videos/file.mp4',
    poster: soc,
  },
  {
    title: 'Protecting the digital future.',
    text: 'From next-generation firewalls to a Security Operations Center, we help you detect, respond to, and recover from cyber threats.',
    cta: ['Explore cybersecurity', '/services/cybersecurity'],
    video: '/videos/video1.mp4',
    poster: datacenter,
  },
  {
    title: 'Smarter AI. Secure by design.',
    text: 'Practical AI assistants, automation, and analytics, with the governance to keep your data safe.',
    cta: ['See AI solutions', '/services/artificial-intelligence'],
    video: '/videos/video2.mp4',
    poster: dashboard,
  },
]

const ease = [0.22, 1, 0.36, 1]

const copy = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const videoVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
}

function VideoBackground({ src, poster }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.load()
      ref.current.play().catch(() => {})
    }
  }, [src])
  return (
    <motion.video
      ref={ref}
      key={src}
      variants={videoVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 h-full w-full scale-105 object-cover motion-reduce:hidden"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  )
}

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [i])

  const s = slides[i]

  return (
    <section className="relative overflow-hidden bg-ink pt-[73px] text-white">
      {/* Video layer — crossfades with each slide */}
      <AnimatePresence mode="sync">
        <VideoBackground key={s.video} src={s.video} poster={s.poster} />
      </AnimatePresence>

      {/* Static fallback image for reduced-motion */}
      <img src={s.poster} alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />

      <div className="container-x relative flex min-h-[620px] flex-col justify-center py-24">
        <div className="relative min-h-[320px] max-w-3xl sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial="initial" animate="animate" exit="exit" className="max-w-3xl">
              <motion.h1
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.05 }}
                className="font-display text-4xl font-extrabold leading-[1.1] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-6xl"
              >
                {s.title}
              </motion.h1>
              <motion.p
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.16 }}
                className="mt-6 max-w-xl text-lg text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              >
                {s.text}
              </motion.p>
              <motion.div
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.28 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link to={s.cta[1]} className="btn btn-red">{s.cta[0]}</Link>
                <Link to="/contact" className="btn btn-ghost">Work with us</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 flex gap-2" role="tablist" aria-label="Hero slides">
          {slides.map((_, n) => (
            <button
              key={n}
              role="tab"
              aria-selected={n === i}
              aria-label={`Slide ${n + 1}`}
              onClick={() => setI(n)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${n === i ? 'w-12 bg-white/25' : 'w-6 bg-white/40 hover:bg-white/70'}`}
            >
              {n === i && (
                <motion.span
                  key={`fill-${i}`}
                  className="absolute inset-y-0 left-0 bg-hot"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
