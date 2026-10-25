import { useState } from 'react'
import { ArrowUpRight, Building2, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send, UserRound } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/services.js'
import { company } from '../data/company.js'
import { sendEmail } from '../lib/emailjs.js'

const { contact } = company

export default function Contact() {
  usePageMeta(
    'Contact',
    'Talk to BarryTech about cybersecurity, IT infrastructure, managed IT, physical security, web development, or AI solutions.',
  )

  const [organizationType, setOrganizationType] = useState('individual')
  const [selectedServices, setSelectedServices] = useState([])
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)
  const field = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 sm:text-sm'

  const toggleService = (slug) => {
    setStatus(null)
    setSelectedServices((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug])
  }

  const submit = async (e) => {
    e.preventDefault()
    if (sending) return

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const organization = String(data.get('organization') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const honeypot = String(data.get('website') ?? '').trim()
    const chosenServices = services.filter((service) => selectedServices.includes(service.slug))

    if (honeypot) {
      setStatus({ type: 'success', message: 'Thanks. Your request has been received.' })
      return
    }

    if (!chosenServices.length) {
      setStatus({ type: 'error', message: 'Choose at least one service so we can send you the right information.' })
      return
    }

    const serviceNames = chosenServices.map((service) => service.title)
    const serviceGuide = chosenServices.map((service) => [
      service.title,
      service.tagline,
      service.intro,
      'What we provide:',
      ...service.offerings.map(([title, description]) => `• ${title}: ${description}`),
      `Learn more: ${window.location.origin}/services/${service.slug}`,
    ].join('\n')).join('\n\n')
    const notificationBody = [
      'New Call BarryTech service request',
      '',
      `Name: ${name}`,
      `Customer type: ${organizationType === 'organization' ? 'Organization' : 'Individual'}`,
      ...(organizationType === 'organization' ? [`Organization: ${organization}`] : []),
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Services requested: ${serviceNames.join(', ')}`,
      ...(message ? ['', 'Additional details:', message] : []),
    ].join('\n')
    const customerBody = [
      `Hello ${name},`,
      '',
      'Thanks for contacting BarryTech. Here is information about the services you selected:',
      '',
      serviceGuide,
      '',
      `For questions or next steps, call ${contact.phone} or reply to this email.`,
      '',
      'BarryTech',
    ].join('\n')

    setSending(true)
    setStatus(null)
    let notificationDelivered = false

    try {
      await sendEmail({
        recipient: contact.email,
        recipientName: 'BarryTech team',
        subject: `Call BarryTech request: ${name}`,
        body: notificationBody,
        replyTo: email,
      })
      notificationDelivered = true

      // EmailJS allows one send request per second.
      await new Promise((resolve) => window.setTimeout(resolve, 1100))

      await sendEmail({
        recipient: email,
        recipientName: name,
        subject: 'Your selected BarryTech services',
        body: customerBody,
        replyTo: contact.email,
      })

      setStatus({ type: 'success', message: `Thanks, ${name}. Your request is with BarryTech, and the selected service information has been emailed to you.` })
      form.reset()
      setSelectedServices([])
      setOrganizationType('individual')
    } catch (error) {
      setStatus({
        type: notificationDelivered ? 'partial' : 'error',
        message: notificationDelivered
          ? `BarryTech received your request, but we could not send the service information to ${email}. Please call ${contact.phone} and we will help you.`
          : error.message,
      })
    } finally {
      setSending(false)
    }
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
          <h2 className="sr-only">Contact details</h2>
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
                <span className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 font-semibold text-ink group-hover:text-brand">
                  <span className="min-w-0 [overflow-wrap:anywhere]">{value}</span>
                  {external && <ArrowUpRight size={14} className="shrink-0 text-slate-400" />}
                </span>
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
            Share as much detail as you can, your current setup, the problem, and any deadlines. We will reply with a practical next step.
          </p>
        </div>

        <form id="call-barrytech-form" onSubmit={submit} aria-labelledby="contact-form-title" className="relative scroll-mt-24 rounded-3xl bg-brand-50 p-6 sm:p-8 lg:col-span-3">
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden" />
          {status?.type === 'success' ? (
            <div className="py-10 text-center" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto text-brand" size={48} />
              <h2 id="contact-form-title" className="mt-4 text-2xl font-bold">Your request has been sent</h2>
              <p className="mx-auto mt-2 max-w-xl text-slate-600">{status.message}</p>
              <button type="button" className="btn btn-blue mt-6" onClick={() => setStatus(null)}>Send another request</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h2 id="contact-form-title" className="text-2xl font-bold text-ink">Book your free assessment</h2>
                <p className="mt-2 text-sm text-slate-600">Tell us who you are and choose the services you want to explore. We’ll email the selected service information to you.</p>
              </div>

              {status && (
                <p className={`sm:col-span-2 rounded-xl px-4 py-3 text-sm ${status.type === 'partial' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'}`} role="alert">
                  {status.message}
                </p>
              )}

              <label className="text-sm font-semibold text-ink">
                Full name <span className="text-hot" aria-hidden="true">*</span>
                <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Phone number <span className="text-hot" aria-hidden="true">*</span>
                <input name="phone" type="tel" required autoComplete="tel" className={field} placeholder="Your phone number" />
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-ink">I am contacting you as <span className="text-hot" aria-hidden="true">*</span></legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'individual', label: 'Individual', icon: UserRound },
                    { value: 'organization', label: 'Organization', icon: Building2 },
                  ].map(({ value, label, icon: Icon }) => (
                    <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold transition ${organizationType === value ? 'border-brand ring-2 ring-brand/20' : 'border-slate-300 hover:border-brand-200'}`}>
                      <input type="radio" name="customer_type" value={value} checked={organizationType === value} onChange={() => setOrganizationType(value)} className="accent-brand" />
                      <Icon size={18} className="text-brand" aria-hidden="true" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {organizationType === 'organization' && (
                <label className="text-sm font-semibold text-ink sm:col-span-2">
                  Organization name <span className="text-hot" aria-hidden="true">*</span>
                  <input name="organization" required autoComplete="organization" className={field} placeholder="Your organization’s name" />
                </label>
              )}

              <label className="text-sm font-semibold text-ink sm:col-span-2">
                Email address <span className="text-hot" aria-hidden="true">*</span>
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
                <span className="mt-1 block text-xs font-normal text-slate-500">We’ll send your selected service information here.</span>
              </label>

              <fieldset className="sm:col-span-2" aria-describedby="service-selection-help">
                <legend className="text-sm font-semibold text-ink">Choose service(s) <span className="text-hot" aria-hidden="true">*</span></legend>
                <p id="service-selection-help" className="mt-1 text-xs text-slate-600">Choose one or more. We’ll send details for each one.</p>
                <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-ink">
                  <input
                    type="checkbox"
                    checked={selectedServices.length === services.length}
                    onChange={() => {
                      setStatus(null)
                      setSelectedServices(selectedServices.length === services.length ? [] : services.map((service) => service.slug))
                    }}
                    className="h-4 w-4 accent-brand"
                  />
                  All services
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <label key={service.slug} className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 transition ${selectedServices.includes(service.slug) ? 'border-brand ring-2 ring-brand/20' : 'border-slate-200 hover:border-brand-200'}`}>
                      <input type="checkbox" name="service" value={service.slug} checked={selectedServices.includes(service.slug)} onChange={() => toggleService(service.slug)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand" />
                      <span>
                        <span className="block text-sm font-semibold text-ink">{service.short}</span>
                        <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-600">{service.tagline}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="text-sm font-semibold text-ink sm:col-span-2">
                Anything else we should know? <span className="font-normal text-slate-500">(optional)</span>
                <textarea name="message" rows="4" className={field} placeholder="Share your goals, current setup, or timing." />
              </label>

              <div className="sm:col-span-2">
                <button type="submit" disabled={sending} className="btn btn-red w-full justify-center disabled:cursor-wait disabled:opacity-70">
                  <Send size={16} /> {sending ? 'Sending your request…' : 'Send me service information'}
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  EmailJS delivers your request to BarryTech and sends the selected service information to you. This site does not store submissions.
                </p>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  )
}
