import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { company } from '../data/company.js'

const { contact } = company

export default function Contact() {
  usePageMeta(
    'Contact',
    'Get in touch with BarryTech by phone, email, WhatsApp, or visit our office.',
  )

  const details = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phoneHref}` },
    { icon: MapPin, label: 'Location', value: contact.address, href: contact.maps, external: true },
  ]

  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Talk to the BarryTech team."
        text="Reach out with a question, discuss a project, or find the best way to get started."
      />

      <section className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <p className="mb-6 max-w-xl text-slate-600">Choose the contact method that works best for you. Our team will help direct your enquiry.</p>
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
        </div>

        <aside className="flex flex-col items-start justify-center rounded-3xl bg-brand-50 p-8 sm:p-10">
          <p className="eyebrow">Free assessment</p>
          <h2 className="mt-3 max-w-lg text-3xl font-bold">Looking for a practical technology assessment?</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-slate-600">Tell us about your needs and choose the services you want to explore. We will send you tailored information and a practical next step.</p>
          <Link to="/assessment#assessment-form" className="btn btn-red mt-7">
            Book your free assessment <ArrowUpRight size={16} />
          </Link>
        </aside>
      </section>
    </>
  )
}
