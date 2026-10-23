import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Mail, Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import { services } from '../data/services.js'
import { company } from '../data/company.js'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [light, setLight] = useState(false)
  const headerRef = useRef(null)
  const { pathname } = useLocation()
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

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-300 ${
      isActive
        ? light ? 'text-hot-700' : 'text-hot'
        : light ? 'text-slate-600 hover:text-ink' : 'text-slate-300 hover:text-white'
    }`

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="w-full max-w-7xl" aria-label="Main navigation">
        {/* ── Pill bar ─────────────────────────────────────────── */}
        <div
          className={`relative flex items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-md transition-all duration-500 ease-out sm:px-5 sm:py-2.5 ${
            light
              ? 'border-slate-200/90 bg-white text-ink shadow-lg shadow-ink/10'
              : 'border-white/15 bg-ink/95 text-white shadow-lg shadow-ink/30'
          }`}
        >
          {/* Logo */}
          <Link to="/" onClick={close} aria-label="BarryTech home" className="shrink-0">
            <span
              className={`flex items-center rounded-xl px-2 py-1.5 transition-all duration-500 ${
                light ? 'bg-transparent shadow-none' : 'bg-white shadow-sm'
              }`}
            >
              <img src={logo} alt="BarryTech" className="h-6 w-auto sm:h-7" />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 xl:gap-7">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {label}
              </NavLink>
            ))}

            {/* Services dropdown */}
            <div className="group relative">
              <NavLink to="/services" className={linkClass}>
                Services
                <ChevronDown size={13} className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </NavLink>
              <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div
                  className={`rounded-2xl border p-2 shadow-2xl backdrop-blur transition-colors duration-500 ${
                    light ? 'border-slate-200 bg-white' : 'border-white/10 bg-ink/95'
                  }`}
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                        light
                          ? 'text-slate-600 hover:bg-brand-50 hover:text-brand'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {s.short}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className={`mt-1 block rounded-xl border-t px-4 pb-2.5 pt-3 text-sm font-semibold transition ${
                      light
                        ? 'border-slate-100 text-hot-700 hover:text-hot-600'
                        : 'border-white/10 text-hot hover:text-hot-100'
                    }`}
                  >
                    View all services
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className={`hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 lg:inline-flex ${
                light
                  ? 'bg-hot-700 text-white shadow-lg shadow-hot/20 hover:bg-hot-600'
                  : 'bg-white text-ink shadow-[0_0_20px_6px_rgba(255,255,255,0.28)] hover:bg-slate-100 hover:shadow-[0_0_24px_8px_rgba(255,255,255,0.38)]'
              }`}
            >
              Work with us
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                light ? 'text-ink hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ───────────────────────────────────── */}
        {open && (
          <div
            id="mobile-menu"
            className={`absolute inset-x-3 top-[calc(100%+8px)] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl border px-5 py-5 shadow-2xl backdrop-blur-md transition-colors duration-500 sm:inset-x-4 lg:hidden ${
              light ? 'border-slate-200 bg-white text-ink' : 'border-white/10 bg-ink/95 text-white'
            }`}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={close}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-300 ${
                      light
                        ? isActive ? 'text-hot-700' : 'text-slate-700 hover:bg-brand-50'
                        : isActive ? 'text-hot' : 'text-slate-200 hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Services accordion */}
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-300 ${
                  light ? 'text-slate-700 hover:bg-brand-50' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div
                  id="mobile-services"
                  className={`ml-3 flex flex-col border-l pl-3 ${light ? 'border-slate-200' : 'border-white/10'}`}
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={close}
                      className={`rounded-lg px-3 py-2 text-sm transition ${
                        light
                          ? 'text-slate-600 hover:bg-brand-50 hover:text-brand'
                          : 'text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {s.short}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            <div className={`mt-5 space-y-1 border-t pt-4 ${light ? 'border-slate-200' : 'border-white/10'}`}>
              <a
                href={`mailto:${company.contact.email}`}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-300 ${
                  light ? 'text-slate-600 hover:bg-brand-50 hover:text-ink' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Mail size={16} className="text-hot" /> {company.contact.email}
              </a>
            </div>

            <Link
              to="/contact"
              onClick={close}
              className={`mt-4 flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 ${
                light ? 'bg-hot-700 hover:bg-hot-600' : 'bg-hot hover:bg-hot-700'
              }`}
            >
              Work with us
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
