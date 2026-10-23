import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import logo from '../assets/logo.png'
import { services } from '../data/services.js'

const link = ({ isActive }) => `text-sm font-semibold transition hover:text-hot ${isActive ? 'text-hot' : ''}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      {/* Floating rounded navbar pill */}
      <div className={`mx-auto max-w-7xl overflow-hidden rounded-full border transition duration-300 ${scrolled ? 'border-slate-200 bg-white/95 shadow-xl shadow-slate-200/60 backdrop-blur' : 'border-slate-200/60 bg-white shadow-lg shadow-slate-200/40'}`}>
        <div className="flex h-[64px] items-center justify-between px-8 text-ink">
          <Link to="/" onClick={close} aria-label="BarryTech home"><img src={logo} alt="BarryTech, Secure Digital Innovations" className="h-10 w-auto" /></Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            <NavLink to="/" end className={link}>Home</NavLink>
            <NavLink to="/about" className={link}>About</NavLink>
            <div className="group relative">
              <NavLink to="/services" className={(s) => link(s) + ' inline-flex items-center gap-1 py-5'}>Services <ChevronDown size={14} /></NavLink>
              <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="block rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand">{s.short}</Link>
                ))}
              </div>
            </div>
            <NavLink to="/contact" className={link}>Contact</NavLink>
            <Link to="/contact" className="btn btn-red">Work with us</Link>
          </nav>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="max-h-[80vh] overflow-y-auto border-t border-slate-100 bg-white lg:hidden">
            <div className="flex flex-col gap-1 px-6 py-4 text-ink">
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'All services']].map(([to, l]) => (
                <Link key={to} to={to} onClick={close} className="rounded-lg px-2 py-3 font-semibold">{l}</Link>
              ))}
              {services.map((s) => <Link key={s.slug} to={`/services/${s.slug}`} onClick={close} className="px-5 py-2 text-sm text-slate-600">{s.short}</Link>)}
              <Link to="/contact" onClick={close} className="btn btn-red mt-3 justify-center">Work with us</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
