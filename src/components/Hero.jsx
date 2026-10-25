import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import soc from '../assets/images/cloud-platform.jpg'
import datacenter from '../assets/images/datacenter.jpg'
import webProducts from '../assets/images/dashboard.png'
import aiAutomation from '../assets/images/cloud-platform.jpg'

const SLIDE_MAX_MS = 8000 // a video longer than this is cut off and the next slide starts
const SLIDE_LOAD_TIMEOUT_MS = 15000 // allow larger videos time to load before falling back
const SLIDE_STATIC_MS = 5000 // used when there is no video (reduced motion or a failed video)

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
    poster: soc,
  },
  {
    id: 'web-development',
    eyebrow: 'Web & app development',
    title: 'Websites, apps, and platforms that perform.',
    text: 'Digital experiences built for speed, security, and results, from company websites and e-commerce to custom web applications.',
    cta: ['Explore web development', '/services/web-app-development'],
    video: '/videos/hero-bg2.mp4',
    maxDurationMs: 22000,
    poster: webProducts,
  },
  {
    id: 'ai-solutions',
    eyebrow: 'AI solutions · Secure adoption',
    title: 'Smarter AI. Secure by design.',
    text: 'Practical AI assistants, automation, and analytics, with the governance to keep your data safe.',
    cta: ['See AI solutions', '/services/artificial-intelligence'],
    video: '/videos/video3.mp4',
    poster: aiAutomation,
  },
]

const ease = [0.22, 1, 0.36, 1]

const copy = {
  initial: { opacity: 0, y: 20 },
  animate: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease, delay } }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
}

function VideoBackground({ src, maxDurationMs = SLIDE_MAX_MS, onEnded, onFail, onStart, onProgress }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ref.current?.play().catch(() => onFail?.(src))
  }, [src])

  return (
    <motion.video
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onPlaying={() => {
        setReady(true)
        onStart?.(src)
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget
        if (!v.duration) return
        // match the cap so the bar is full exactly when the cut-off hits
        const total = Math.min(v.duration, maxDurationMs / 1000)
        onProgress?.(src, Math.min(v.currentTime / total, 1))
      }}
      onEnded={onEnded}
      onError={() => onFail?.(src)}
      className="absolute inset-0 z-[2] h-full w-full object-cover motion-reduce:hidden"
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" onError={() => onFail?.(src)} />
    </motion.video>
  )
}

export default function Hero() {
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState(false) // current slide's video could not play
  const [startedVideo, setStartedVideo] = useState(null)
  const reducedMotion = useReducedMotion()
  const noVideo = reducedMotion || failed

  // Progress is tagged with its video, so a fading-out video can't move the new slide's bar
  const [progress, setProgress] = useState({ src: null, p: 0 })
  const s = slides[i]
  const centered = s.align === 'center'
  const slideMaxDurationMs = s.maxDurationMs ?? SLIDE_MAX_MS
  const currentVideo = useRef(slides[i].video)
  currentVideo.current = slides[i].video
  const handleVideoStart = (src) => {
    if (src === currentVideo.current) setStartedVideo(src)
  }
  const handleVideoFail = (src) => {
    if (src === currentVideo.current) setFailed(true)
  }
  const handleProgress = (src, p) => {
    if (src === currentVideo.current) setProgress({ src, p })
  }

  // Start every slide with an empty bar (prevents a full-bar flash when the carousel loops)
  useEffect(() => {
    setProgress({ src: null, p: 0 })
    setStartedVideo(null)
  }, [i])

  const next = () => setI((n) => (n + 1) % slides.length)
  const previous = () => { setFailed(false); setI((n) => (n - 1 + slides.length) % slides.length) }
  const goTo = (n) => { setFailed(false); setI(n) }

  // Don't spend a slide's playback time while its video is still loading.
  useEffect(() => {
    if (!noVideo && startedVideo !== s.video) {
      const loadTimer = setTimeout(() => setFailed(true), SLIDE_LOAD_TIMEOUT_MS)
      return () => clearTimeout(loadTimer)
    }

    // Fallback timer: guarantees the hero advances if "ended" never fires.
    const t = setTimeout(() => { setFailed(false); next() }, noVideo ? SLIDE_STATIC_MS : slideMaxDurationMs)
    return () => clearTimeout(t)
  }, [i, noVideo, s.video, slideMaxDurationMs, startedVideo])

  const handleEnded = (src) => {
    if (src !== currentVideo.current) return
    setFailed(false)
    next()
  }

  return (
    <section
      className="relative isolate min-h-[80vh] overflow-hidden bg-ink pt-[72px] text-white sm:pt-[80px]"
      aria-roledescription="carousel"
      aria-label="BarryTech highlights"
    >
      {/* Poster layers: all mounted, so there is never an empty frame */}
      {slides.map((sl, n) => (
        <img
          key={sl.id}
          src={sl.poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
            n === i ? 'z-[1] opacity-100 delay-0' : 'z-0 opacity-0 delay-500'
          }`}
        />
      ))}

      {/* Video layer: plays once, then the hero moves to the next slide */}
      {!reducedMotion && (
        <AnimatePresence>
          <VideoBackground
            key={s.id}
            src={s.video}
            maxDurationMs={slideMaxDurationMs}
            onEnded={() => handleEnded(s.video)}
            onFail={handleVideoFail}
            onStart={handleVideoStart}
            onProgress={handleProgress}
          />
        </AnimatePresence>
      )}

      {/* Gradient overlays */}
      <div className={`absolute inset-0 z-[3] ${centered ? 'bg-ink/65' : 'bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20'}`} />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
      {s.id === 'web-development' && <div className="absolute inset-0 z-[3] bg-brand/25" aria-hidden="true" />}

      <div className="container-x relative z-[4] flex min-h-[calc(80vh-72px)] flex-col justify-center py-20 sm:min-h-[calc(80vh-80px)] sm:py-24">
        <div className={`relative min-h-[350px] max-w-3xl sm:min-h-[330px] ${centered ? 'mx-auto' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial="initial" animate="animate" exit="exit" className={`max-w-3xl p-6 sm:p-8 ${centered ? 'mx-auto text-center' : ''}`}>
              {s.eyebrow && (
                <motion.p
                  variants={copy}
                  custom={0}
                  className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200 ${centered ? 'justify-center' : ''}`}
                >
                  <span className="h-px w-8 bg-hot" aria-hidden="true" />
                  {s.eyebrow}
                </motion.p>
              )}
              <motion.h1
                variants={copy}
                custom={0.05}
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-6xl"
              >
                {s.title}
              </motion.h1>
              <motion.p
                variants={copy}
                custom={0.1}
                className={`mt-6 max-w-xl text-lg text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] ${centered ? 'mx-auto' : ''}`}
              >
                {s.text}
              </motion.p>
              <motion.div
                variants={copy}
                custom={0.15}
                className={`mt-9 flex flex-wrap gap-4 ${centered ? 'justify-center' : ''}`}
              >
                <Link to={s.cta[1]} className="btn btn-red">{s.cta[0]} <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn btn-ghost">Work with us</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual navigation with per-slide progress indicators */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={previous}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-ink/25 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Go to slide ${n + 1}`}
                aria-current={n === i}
                onClick={() => goTo(n)}
                className="group/dot flex h-8 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot"
              >
                <span
                  className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    n === i ? 'w-10 bg-white/30 sm:w-12' : 'w-3 bg-white/40 group-hover/dot:bg-white/70 sm:w-6'
                  }`}
                >
                  {n === i && (
                    noVideo ? (
                      <motion.span
                        key={`static-${i}`}
                        className="absolute inset-0 origin-left rounded-full bg-hot"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_STATIC_MS / 1000, ease: 'linear' }}
                      />
                    ) : (
                      <span
                        key={`video-${i}`}
                        className="absolute inset-0 origin-left rounded-full bg-hot transition-transform duration-300 ease-linear"
                        style={{ transform: `scaleX(${progress.src === s.video ? progress.p : 0})` }}
                      />
                    )
                  )}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => { setFailed(false); next() }}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-ink/25 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
