import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUp, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { services } from '../data/services.js'
import { company } from '../data/company.js'
import logo from '../assets/logo.png'

const { contact } = company

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="swoosh-bg text-slate-300">
      {/* Conversion band — home and contact already close with their own CTA */}
      {pathname !== '/' && pathname !== '/contact' && (
        <div className="border-b border-white/10">
          <div className="container-x flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-hot">Let&rsquo;s talk</p>
              <h2 className="mt-2 max-w-xl text-2xl font-bold text-white sm:text-3xl">
                Have a project, or a security concern you want checked?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-red">
                Start a conversation
                <ArrowRight size={16} />
              </Link>
              <a href={`tel:${contact.phoneHref}`} className="btn border border-white/30 text-white hover:bg-white hover:text-ink">
                <Phone size={15} /> {contact.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="inline-block rounded-xl bg-white p-3"><img src={logo} alt="BarryTech" className="h-10 w-auto" /></span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{company.slogan}</p>
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-white"
          >
            <MessageCircle size={16} className="text-hot" /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="transition hover:text-white" to={`/services/${s.slug}`}>{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="transition hover:text-white" to="/about">About us</Link></li>
            <li><Link className="transition hover:text-white" to="/services">All services</Link></li>
            <li><Link className="transition hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="flex gap-2 transition hover:text-white">
                <Mail size={16} className="mt-0.5 shrink-0 text-hot" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phoneHref}`} className="flex gap-2 transition hover:text-white">
                <Phone size={16} className="mt-0.5 shrink-0 text-hot" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="flex gap-2 transition hover:text-white">
                <MapPin size={16} className="mt-0.5 shrink-0 text-hot" /> {contact.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {company.full}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-semibold text-slate-300 transition hover:border-white/40 hover:text-white"
          >
            <ArrowUp size={13} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
