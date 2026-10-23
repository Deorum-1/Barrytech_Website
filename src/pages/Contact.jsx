import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/services.js'
import { company } from '../data/company.js'

const { contact } = company

export default function Contact() {
  usePageMeta(
    'Contact',
    'Talk to BarryTech about cybersecurity, IT infrastructure, managed IT, physical security, web development, or AI solutions.',
  )

  const [sent, setSent] = useState(false)
  const field = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/30'

  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company || '—'}`,
      `Phone: ${d.phone || '—'}`,
      `Service: ${d.service}`,
      '',
      d.message,
    ].join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${d.service}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const details = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phoneHref}` },
    { icon: MapPin, label: 'Location', value: contact.address, href: contact.maps, external: true },
  ]

  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Tell us what you need to protect, build, or run."
        text="Share a few details and we will recommend a practical next step."
      />

      <section className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-5 lg:gap-14">
        <div className="space-y-4 lg:col-span-2">
          {details.map(({ icon: I, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-brand-200 hover:shadow-md"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-hot"><I size={22} /></span>
              <span className="min-w-0">
                <span className="block text-sm text-slate-500">{label}</span>
                <span className="mt-0.5 flex items-center gap-1.5 font-semibold text-ink group-hover:text-brand">{value}{external && <ArrowUpRight size={14} className="shrink-0 text-slate-400" />}</span>
              </span>
            </a>
          ))}

          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-2xl bg-ink p-5 text-white transition hover:bg-brand-800"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={20} className="text-hot" />
              <span>
                <span className="block text-sm text-slate-300">Prefer chat?</span>
                <span className="font-semibold">Message us on WhatsApp</span>
              </span>
            </span>
            <ArrowUpRight size={18} className="shrink-0 text-slate-300" />
          </a>

          <p className="px-1 pt-2 text-sm text-slate-500">
            Share as much detail as you can — your current setup, the problem, and any deadlines. We will reply with a practical next step.
          </p>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-brand-50 p-6 sm:p-8 lg:col-span-3">
          {sent ? (
            <div className="py-10 text-center" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto text-brand" size={48} />
              <h2 className="mt-4 text-2xl font-bold">Your email app should open now</h2>
              <p className="mt-2">Send the drafted message and our team will get back to you.</p>
              <p className="mt-2 text-sm">
                Email app did not open? Write to{' '}
                <a href={`mailto:${contact.email}`} className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">{contact.email}</a>.
              </p>
              <button type="button" className="btn btn-blue mt-6" onClick={() => setSent(false)}>Write another message</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-ink">
                Full name
                <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Email
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Company
                <input name="company" autoComplete="organization" className={field} placeholder="Company or organization" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Phone
                <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="Optional" />
              </label>
              <label className="text-sm font-semibold text-ink sm:col-span-2">
                Service
                <select name="service" required defaultValue="" className={field}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.slug}>{s.short}</option>)}
                  <option>Other / not sure</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink sm:col-span-2">
                How can we help?
                <textarea name="message" rows="5" required className={field} placeholder="Tell us about your environment, goals, or the issue you are facing." />
              </label>
              <div className="sm:col-span-2">
                <button className="btn btn-red w-full justify-center">
                  <Send size={16} /> Send message
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  This opens your email app with the details filled in. No data is stored on this website.
                </p>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  )
}
