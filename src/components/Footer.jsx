import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { services } from '../data/services.js'
import { company } from '../data/company.js'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="swoosh-bg text-slate-300">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <span className="inline-block rounded-xl bg-white p-3"><img src={logo} alt="BarryTech" className="h-10 w-auto" /></span>
          <p className="mt-5 text-sm leading-relaxed">{company.slogan}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">{services.map((s) => <li key={s.slug}><Link className="hover:text-white" to={`/services/${s.slug}`}>{s.short}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" to="/about">About us</Link></li>
            <li><Link className="hover:text-white" to="/services">All services</Link></li>
            <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-hot" /> info@barrytech.com</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-hot" /> +234 000 000 0000</li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-hot" /> Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© {new Date().getFullYear()} {company.full}. All rights reserved.</div>
    </footer>
  )
}
