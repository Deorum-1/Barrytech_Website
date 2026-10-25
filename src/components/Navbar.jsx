import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Mail, Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import logoOnLight from '../assets/logo-on-light.png'
import Icon from './Icon.jsx'
import { services } from '../data/services.js'
import { company } from '../data/company.js'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

const serviceBlurbs = {
  'it-infrastructure': 'Networks, servers & cloud',
  'physical-security': 'CCTV, access & intrusion',
  cybersecurity: 'Defense, detection & response',
  'managed-it': 'Proactive IT support',
  'project-management': 'Planning through delivery',
  'web-app-development': 'Websites, apps & platforms',
  'artificial-intelligence': 'Automation, analytics & AI',
}

const easeOut = [0.22, 1, 0.36, 1]

function ActivePill({ light, reduce }) {
  return (
    <motion.span
      layoutId="nav-active-pill"
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
      className={`absolute inset-0 rounded-full ring-1 ${
        light ? 'bg-brand-50 ring-brand-100' : 'bg-white/10 ring-white/10'
      }`}
      aria-hidden="true"
    />
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [light, setLight] = useState(false)
  const headerRef = useRef(null)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const close = () => { setOpen(false); setServicesOpen(false) }

  useEffect(() => { close() }, [pathname])

  useLayoutEffect(() => {
    const trigger = document.querySelector('[data-nav-switch]')
    if (!trigger) {
      setLight(false)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const navBottom = headerRef.current?.getBoundingClientRect().bottom ?? 80
      // Keep the floating bar contrasted against the section behind it:
      // white over dark/blue headers, brand blue over light content.
      setLight(trigger.getBoundingClientRect().top > navBottom)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => { if (event.key === 'Escape') close() }
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) close()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const navLinkClass = ({ isActive }) =>
    `group/link relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-300 ${
      isActive
        ? light ? 'text-brand-900' : 'text-white'
        : light
          ? 'text-brand-700 hover:bg-brand-50 hover:text-brand-900'
          : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
    }`

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="w-full max-w-7xl" aria-label="Main navigation">
        <div
          className={`relative flex items-center justify-between gap-3 rounded-full border px-2.5 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-500 ease-out sm:px-4 ${
            light
              ? 'border-white/80 bg-white text-ink shadow-[0_10px_36px_-16px_rgba(7,27,48,0.45)] ring-1 ring-ink/[0.06]'
              : 'border-white/10 bg-brand-800/95 text-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.04]'
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              onClick={close}
              aria-label="BarryTech home"
              className="group shrink-0 rounded-2xl focus-visible:outline-offset-4"
            >
              <span>
                <img
                  src={light ? logoOnLight : logo}
                  alt="BarryTech — Secure Digital Innovations"
                  width="931"
                  height="268"
                  className="h-9 w-auto transition-transform duration-500 group-hover:scale-[1.02] sm:h-10"
                />
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-0.5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && <ActivePill light={light} reduce={reduce} />}
                    <span className="relative flex items-center gap-1.5">
                      {label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-hot" aria-hidden="true" />}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            <div className="group relative">
              <NavLink to="/services" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && <ActivePill light={light} reduce={reduce} />}
                    <span className="relative flex items-center gap-1.5">
                      Services
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-hot" aria-hidden="true" />}
                      <ChevronDown
                        size={13}
                        className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                )}
              </NavLink>

              <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div
                  className={`relative rounded-3xl border p-2 backdrop-blur-xl ${
                    light
                      ? 'border-slate-200/90 bg-white shadow-[0_28px_70px_-30px_rgba(7,27,48,0.45)]'
                      : 'border-white/10 bg-brand-800/95 shadow-[0_34px_80px_-24px_rgba(0,0,0,0.95)]'
                  }`}
                >
                  <span
                    className={`absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t ${
                      light ? 'border-slate-200/90 bg-white' : 'border-white/10 bg-brand-800'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-1.5">
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${light ? 'text-brand-700' : 'text-slate-400'}`}>
                      What we do
                    </p>
                    <Link
                      to="/services"
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                        light ? 'text-hot-700 hover:text-hot-600' : 'text-hot-100 hover:text-white'
                      }`}
                    >
                      All services <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-0.5">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className={`group/item flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
                          light ? 'hover:bg-brand-50' : 'hover:bg-white/[0.06]'
                        }`}
                      >
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                            light
                              ? 'bg-brand-50 text-brand group-hover/item:bg-white'
                              : 'bg-white/[0.06] text-brand-200 group-hover/item:bg-white/10'
                          }`}
                        >
                          <Icon name={service.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-[12.5px] font-semibold ${light ? 'text-brand-900' : 'text-white'}`}>
                            {service.short}
                          </span>
                          <span className={`block truncate text-[10.5px] ${light ? 'text-brand-700' : 'text-slate-400'}`}>
                            {serviceBlurbs[service.slug]}
                          </span>
                        </span>
                        <ArrowRight
                          size={13}
                          className={`shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100 ${
                            light ? 'text-hot-700' : 'text-hot'
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>

                  <div
                    className={`mt-1 flex items-center justify-between gap-3 border-t px-3 pb-1 pt-3 ${
                      light ? 'border-slate-100' : 'border-white/10'
                    }`}
                  >
                    <p className={`text-[11px] ${light ? 'text-brand-700' : 'text-slate-400'}`}>
                      Not sure where to start? We&rsquo;ll help you scope it.
                    </p>
                    <Link
                      to="/contact"
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                        light ? 'bg-ink text-white hover:bg-brand-800' : 'bg-white text-ink hover:bg-slate-100'
                      }`}
                    >
                      Talk to us <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/contact"
              className={`group hidden items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 lg:inline-flex ${
                light
                  ? 'bg-hot-700 shadow-lg shadow-hot/20 hover:bg-hot-600'
                  : 'bg-hot-600 shadow-[0_12px_32px_-12px_rgba(255,20,20,0.8)] hover:bg-hot-700'
              }`}
            >
              Speak to an Expert
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 lg:hidden ${
                open
                  ? light ? 'border-ink bg-ink text-white' : 'border-white bg-white text-ink'
                  : light
                    ? 'border-brand-200 text-brand-800 hover:border-brand-300 hover:bg-brand-50'
                    : 'border-white/15 text-slate-200 hover:border-white/25 hover:bg-white/10 hover:text-white'
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={reduce ? false : { opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className={`absolute inset-x-3 top-[calc(100%+8px)] max-h-[calc(100dvh-6rem)] origin-top overflow-y-auto rounded-3xl border p-2.5 shadow-2xl backdrop-blur-xl transition-colors duration-500 sm:inset-x-4 lg:hidden ${
                light
                  ? 'border-slate-200 bg-white text-ink shadow-ink/15'
                  : 'border-white/10 bg-brand-800/95 text-white shadow-black/50'
              }`}
            >
              <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
                {navLinks.map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                        light
                          ? isActive ? 'bg-brand-50 text-brand-900' : 'text-brand-700 hover:bg-brand-50'
                          : isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/[0.06]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive
                          ? <span className="h-1.5 w-1.5 rounded-full bg-hot" aria-hidden="true" />
                          : <ChevronRight size={15} className={light ? 'text-brand-400' : 'text-slate-600'} aria-hidden="true" />}
                      </>
                    )}
                  </NavLink>
                ))}

                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  className={`mt-1 flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                    light ? 'text-brand-700 hover:bg-brand-50' : 'text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  Services
                  <span className="flex items-center gap-2">
                    {pathname.startsWith('/services') && <span className="h-1.5 w-1.5 rounded-full bg-hot" aria-hidden="true" />}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {servicesOpen && (
                  <div
                    id="mobile-services"
                    className={`mb-1 ml-3 flex flex-col gap-0.5 border-l pl-3 ${light ? 'border-slate-200' : 'border-white/10'}`}
                  >
                    {services.map((service) => (
                      <NavLink
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={close}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-colors ${
                            light
                              ? isActive ? 'bg-brand-50 font-semibold text-brand-900' : 'text-brand-700 hover:bg-brand-50 hover:text-brand-900'
                              : isActive ? 'bg-white/10 font-semibold text-white' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                          }`
                        }
                      >
                        <Icon
                          name={service.icon}
                          size={14}
                          strokeWidth={1.8}
                          className={`shrink-0 ${light ? 'text-brand' : 'text-brand-200'}`}
                          aria-hidden="true"
                        />
                        {service.short}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/services"
                      onClick={close}
                      className={`mt-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold ${
                        light ? 'text-hot-700 hover:bg-brand-50' : 'text-hot-100 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      All services <ArrowRight size={13} aria-hidden="true" />
                    </NavLink>
                  </div>
                )}
              </nav>

              <div className={`mt-3 border-t px-1 pt-3 ${light ? 'border-slate-100' : 'border-white/10'}`}>
                <a
                  href={`mailto:${company.contact.email}`}
                  className={`flex items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors ${
                    light ? 'hover:bg-brand-50' : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                      light ? 'bg-hot-100 text-hot-700' : 'bg-white/10 text-hot'
                    }`}
                  >
                    <Mail size={14} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${light ? 'text-brand-700' : 'text-slate-400'}`}>
                      Email us
                    </span>
                    <span className={`block text-[13px] font-medium ${light ? 'text-brand-800' : 'text-slate-200'}`}>
                      {company.contact.email}
                    </span>
                  </span>
                </a>
              </div>

              <Link
                to="/contact"
                onClick={close}
                className="group mt-3 flex items-center justify-center gap-2 rounded-full bg-hot-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-hot/25 transition-colors duration-300 hover:bg-hot-700"
              >
                Speak to an Expert
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <p className={`pb-1 pt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] ${light ? 'text-brand-700' : 'text-slate-400'}`}>
                Secure Digital Innovations
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
