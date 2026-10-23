import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import logo from '../assets/logo.png'
import { services } from '../data/services.js'

const navLinks = [
  { to: '/',        label: 'Home',    end: true  },
  { to: '/about',   label: 'About',   end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Navbar() {
  const [open, setOpen]             = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const close = () => { setOpen(false); setServicesOpen(false) }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="relative w-full max-w-7xl">

        {/* ── Pill bar ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-full border border-slate-700 bg-ink/70 px-6 py-3 text-white backdrop-blur-md">

          {/* Logo */}
          <Link to="/" onClick={close} aria-label="BarryTech home">
            <img src={logo} alt="BarryTech" className="h-9 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex ml-8">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-white ${isActive ? 'text-hot' : 'text-slate-300'}`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Services dropdown */}
            <div className="group relative">
              <NavLink to="/services"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 text-sm font-medium transition hover:text-white ${isActive ? 'text-hot' : 'text-slate-300'}`
                }
              >
                Services <ChevronDown size={13} className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              </NavLink>
              {/* Dropdown panel */}
              <div className="invisible absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-700 bg-ink/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 ml-10 md:flex">
            <Link to="/contact"
              className="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Get in touch
            </Link>
            <Link to="/contact"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-[0px_0px_20px_6px_rgba(255,255,255,0.35)] transition duration-300 hover:bg-slate-100 hover:shadow-[0px_0px_28px_10px_rgba(255,255,255,0.45)]"
            >
              Work with us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden text-slate-300 hover:text-white transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile dropdown ───────────────────────────────────── */}
        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] w-full rounded-3xl border border-slate-700 bg-ink/70 px-6 py-5 text-white shadow-xl backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={close}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-white/10 ${isActive ? 'text-hot' : 'text-slate-200'}`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Services accordion */}
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="ml-3 flex flex-col border-l border-slate-700 pl-3">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} onClick={close}
                      className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      {s.short}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {/* Mobile CTAs */}
            <div className="mt-5 flex flex-col gap-3">
              <Link to="/contact" onClick={close}
                className="rounded-full border border-slate-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Get in touch
              </Link>
              <Link to="/contact" onClick={close}
                className="rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-ink shadow-[0px_0px_20px_6px_rgba(255,255,255,0.3)] transition hover:bg-slate-100"
              >
                Work with us
              </Link>
            </div>
          </div>
        )}

      </nav>
    </header>
  )
}
