import { useState } from 'react'
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { services } from '../data/services.js'

// TODO: replace with the real contact details and connect the form to your backend/email service (e.g. Formspree, EmailJS).
const CONTACT = { email: 'info@sai.com.ng', phone: '+234 816 733 7873', address: '84, Orimerunmi Road, Olowotedo, Mowe, Ogun State' }

export default function Contact() {
  const [sent, setSent] = useState(false)
  const field = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30'
  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const body = `Name: ${d.name}\nCompany: ${d.company}\nPhone: ${d.phone}\nService: ${d.service}\n\n${d.message}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry: ' + d.service)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <>
      <PageHeader crumb="Contact" title="Tell us what you need to protect, build, or run." text="Share a few details and we will recommend a practical next step." />
      <section className="container-x grid gap-14 py-24 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          {[[Mail, 'Email', CONTACT.email], [Phone, 'Phone', CONTACT.phone], [MapPin, 'Location', CONTACT.address]].map(([I, l, v]) => (
            <div key={l} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-hot"><I size={22} /></span><div><div className="text-sm text-slate-500">{l}</div><div className="font-semibold text-ink">{v}</div></div></div>
          ))}
        </div>
        <form onSubmit={submit} className="rounded-3xl bg-brand-50 p-8 lg:col-span-3">
          {sent ? (
            <div className="py-10 text-center"><CheckCircle2 className="mx-auto text-brand" size={48} /><h2 className="mt-4 text-2xl font-bold">Your email app should open now</h2><p className="mt-2">Send the drafted message to reach our team.</p><button type="button" className="btn btn-blue mt-6" onClick={() => setSent(false)}>Write another</button></div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-ink">Full name<input name="name" required className={field} /></label>
              <label className="text-sm font-semibold text-ink">Company<input name="company" className={field} /></label>
              <label className="text-sm font-semibold text-ink">Phone<input name="phone" type="tel" className={field} /></label>
              <label className="text-sm font-semibold text-ink">Service<select name="service" className={field}>{services.map((s) => <option key={s.slug}>{s.short}</option>)}<option>Other</option></select></label>
              <label className="text-sm font-semibold text-ink sm:col-span-2">How can we help?<textarea name="message" rows="5" required className={field} /></label>
              <button className="btn btn-red justify-center sm:col-span-2">Send message</button>
            </div>
          )}
        </form>
      </section>
    </>
  )
}
