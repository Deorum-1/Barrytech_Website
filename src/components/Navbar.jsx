import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { services } from '../data/services.js'

const navLink = ({ isActive }) =>
  `text-sm font-semibold transition hover:text-hot ${isActive ? 'text-hot' : 'text-ink'}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => { setOpen(false); setServicesOpen(false) }

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) close() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pillBase = 'border transition-all duration-300'
  const pillStyle = scrolled
    ? 'border-slate-200 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur'
    : 'border-slate-200/60 bg-white shadow-md shadow-slate-100/60'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">

      {/* ── Desktop pill ─────────────────────────────────── */}
      <div className={`mx-auto hidden max-w-7xl lg:block`}>
        <div className={`${pillBase} ${pillStyle} rounded-full`}>
          <div className="flex h-[60px] items-center justify-between px-8 text-ink">
            <Link to="/" aria-label="BarryTech home">
              <img src={logo} alt="BarryTech" className="h-10 w-auto" />
            </Link>
            <nav className="flex items-center gap-8" aria-label="Main">
              <NavLink to="/" end className={navLink}>Home</NavLink>
              <NavLink to="/about" className={navLink}>About</NavLink>

              {/* Services dropdown */}
              <div className="group relative">
                <NavLink
                  to="/services"
                  className={(s) => navLink(s) + ' inline-flex items-center gap-1 py-4'}
                >
                  Services <ChevronDown size={14} />
                </NavLink>
                <div className="invisible absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink hover:bg-brand-50 hover:text-brand"
                    >
                      {s.short}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/contact" className={navLink}>Contact</NavLink>
              <Link to="/contact" className="btn btn-red">Work with us</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Mobile card ───────────────────────────────────── */}
      <div className={`mx-auto lg:hidden`}>
        <div className={`${pillBase} ${pillStyle} ${open ? 'rounded-3xl' : 'rounded-full'}`}>

          {/* Mobile topbar */}
          <div className="flex h-[56px] items-center justify-between px-5 text-ink sm:px-6">
            <Link to="/" onClick={close} aria-label="BarryTech home">
              <img src={logo} alt="BarryTech" className="h-9 w-auto" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-ink transition hover:bg-brand-50 hover:text-brand"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-100 px-5 pb-5 pt-3 sm:px-6">

                  {/* Primary links */}
                  <nav className="flex flex-col" aria-label="Mobile main">
                    {[['/', 'Home', true], ['/about', 'About', false]].map(([to, label, end]) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={close}
                        className={({ isActive }) =>
                          `rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-brand-50 hover:text-brand ${isActive ? 'text-hot' : 'text-ink'}`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}

                    {/* Services accordion */}
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-brand-50 hover:text-brand"
                    >
                      Services
                      {servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 flex flex-col border-l-2 border-brand-100 pl-3">
                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                onClick={close}
                                className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-brand-50 hover:text-brand"
                              >
                                {s.short}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <NavLink
                      to="/contact"
                      onClick={close}
                      className={({ isActive }) =>
                        `rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-brand-50 hover:text-brand ${isActive ? 'text-hot' : 'text-ink'}`
                      }
                    >
                      Contact
                    </NavLink>
                  </nav>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    onClick={close}
                    className="btn btn-red mt-4 w-full justify-center"
                  >
                    Work with us
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </header>
  )
}
