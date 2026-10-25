import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import soc from '../assets/images/soc.jpg'
import datacenter from '../assets/images/datacenter.jpg'
import dashboard from '../assets/images/dashboard.jpg'
import webProducts from '../assets/images/web-products.jpg'
import aiAutomation from '../assets/images/ai-automation.jpg'

const slides = [
  {
    id: 'overview',
    title: 'Empowering businesses through innovative technology.',
    text: 'Modern IT and cybersecurity solutions that improve efficiency, strengthen security, and support digital transformation.',
    cta: ['What we do', '/services'],
    video: '/videos/file.mp4',
    poster: soc,
    align: 'center',
  },
  {
    id: 'infrastructure',
    eyebrow: 'IT infrastructure · Networking',
    title: 'Building the foundation your business runs on.',
    text: 'Networks, servers, data centers, cloud, and virtualization designed, deployed, and maintained for performance, availability, and growth.',
    cta: ['Explore IT infrastructure', '/services/it-infrastructure'],
    video: '/videos/video1.mp4',
    poster: datacenter,
  },
  {
    id: 'cybersecurity',
    eyebrow: 'Cybersecurity · Threat response',
    title: 'Protecting the digital future.',
    text: 'From next-generation firewalls to a Security Operations Center, we help you detect, respond to, and recover from cyber threats.',
    cta: ['Explore cybersecurity', '/services/cybersecurity'],
    video: '/videos/video2.mp4',
    poster: dashboard,
  },
  {
    id: 'web-development',
    eyebrow: 'Web & app development',
    title: 'Websites, apps, and platforms that perform.',
    text: 'Digital experiences built for speed, security, and results, from company websites and e-commerce to custom web applications.',
    cta: ['Explore web development', '/services/web-app-development'],
    video: '/videos/hero-bg.mp4',
    poster: webProducts,
  },
  {
    id: 'ai-solutions',
    eyebrow: 'AI solutions · Secure adoption',
    title: 'Smarter AI. Secure by design.',
    text: 'Practical AI assistants, automation, and analytics, with the governance to keep your data safe.',
    cta: ['See AI solutions', '/services/artificial-intelligence'],
    video: '/videos/ai-solutions.mp4',
    poster: aiAutomation,
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
  const reducedMotion = useReducedMotion()

  const s = slides[i]
  const centered = s.align === 'center'

  return (
    <section
      className="relative overflow-hidden bg-ink pt-[72px] text-white sm:pt-[80px]"
      aria-roledescription="carousel"
      aria-label="BarryTech highlights"
    >
      {/* Poster layer — base image, also the fallback when a slide video is missing */}
      <AnimatePresence>
        <motion.img
          key={s.id}
          src={s.poster}
          alt=""
          variants={videoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Video layer — crossfades with each slide */}
      {!reducedMotion && (
        <AnimatePresence mode="sync">
          <VideoBackground key={s.id} src={s.video} poster={s.poster} />
        </AnimatePresence>
      )}

      {/* Gradient overlays */}
      <div className={`absolute inset-0 ${centered ? 'bg-ink/60' : 'bg-gradient-to-r from-ink/80 via-ink/40 to-ink/10'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/25" />

      <div className="container-x relative flex min-h-[600px] flex-col justify-center py-20 sm:min-h-[640px] sm:py-24">
        <div className={`relative min-h-[350px] max-w-3xl sm:min-h-[330px] ${centered ? 'mx-auto' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial="initial" animate="animate" exit="exit" className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
              {s.eyebrow && (
                <motion.p
                  variants={copy}
                  transition={{ duration: 0.5, ease, delay: 0.02 }}
                  className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200"
                >
                  <span className="h-px w-8 bg-hot" aria-hidden="true" />
                  {s.eyebrow}
                </motion.p>
              )}
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
                className={`mt-6 max-w-xl text-lg text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] ${centered ? 'mx-auto' : ''}`}
              >
                {s.text}
              </motion.p>
              <motion.div
                variants={copy}
                transition={{ duration: 0.65, ease, delay: 0.28 }}
                className={`mt-9 flex flex-wrap gap-4 ${centered ? 'justify-center' : ''}`}
              >
                <Link to={s.cta[1]} className="btn btn-red">{s.cta[0]} <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn btn-ghost">Work with us</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-7 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Go to slide ${n + 1}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className="group/dot flex h-8 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    n === i ? 'w-12 bg-hot' : 'w-6 bg-white/40 group-hover/dot:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-display text-xs font-semibold tracking-widest text-slate-300">
            {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
