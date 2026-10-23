import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import soc from '../assets/images/soc.jpg'
import datacenter from '../assets/images/datacenter.jpg'
import dashboard from '../assets/images/dashboard.jpg'

const slides = [
  {
    eyebrow: 'IT infrastructure · Cybersecurity',
    title: 'Empowering businesses through technology.',
    text: 'Modern IT and cybersecurity solutions that improve efficiency, strengthen security, and support digital transformation.',
    cta: ['What we do', '/services'],
    video: '/videos/file.mp4',
    poster: soc,
  },
  {
    eyebrow: 'Security operations · Threat response',
    title: 'Protecting the digital future.',
    text: 'From next-generation firewalls to a Security Operations Center, we help you detect, respond to, and recover from cyber threats.',
    cta: ['Explore cybersecurity', '/services/cybersecurity'],
    video: '/videos/video1.mp4',
    poster: datacenter,
  },
  {
    eyebrow: 'AI solutions · Governance',
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
  exit: { opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
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
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  )
}

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const autoplay = !paused && !reducedMotion

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [autoplay, i])

  const s = slides[i]

  return (
    <section
      className="relative overflow-hidden bg-ink pt-[72px] text-white sm:pt-[80px]"
      aria-roledescription="carousel"
      aria-label="BarryTech highlights"
    >
      {/* Video layer — crossfades with each slide */}
      {!reducedMotion && (
        <AnimatePresence mode="sync">
          <VideoBackground key={s.video} src={s.video} poster={s.poster} />
        </AnimatePresence>
      )}

      {/* Static fallback image for reduced-motion */}
      <img src={s.poster} alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/25" />

      <div className="container-x relative flex min-h-[600px] flex-col justify-center py-20 sm:min-h-[640px] sm:py-24">
        <div className="relative min-h-[350px] max-w-3xl sm:min-h-[330px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial="initial" animate="animate" exit="exit" className="max-w-3xl">
              <motion.p
                variants={copy}
                transition={{ duration: 0.5, ease, delay: 0.02 }}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200"
              >
                <span className="h-px w-8 bg-hot" aria-hidden="true" />
                {s.eyebrow}
              </motion.p>
              <motion.h1
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.08 }}
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-6xl"
              >
                {s.title}
              </motion.h1>
              <motion.p
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.18 }}
                className="mt-6 max-w-xl text-lg text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              >
                {s.text}
              </motion.p>
              <motion.div
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.28 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link to={s.cta[1]} className="btn btn-red">{s.cta[0]} <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn btn-ghost">Work with us</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-7 flex items-center gap-4">
          <div className="flex gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Go to slide ${n + 1}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${n === i ? 'w-12 bg-white/25' : 'w-6 bg-white/40 hover:bg-white/70'}`}
              >
                {n === i && (
                  <motion.span
                    key={`fill-${i}-${autoplay}`}
                    className="absolute inset-y-0 left-0 bg-hot"
                    initial={{ width: autoplay ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: autoplay ? 7 : 0, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <span className="font-display text-xs font-semibold tracking-widest text-slate-300">
            {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
