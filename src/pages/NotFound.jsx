import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/services.js'

export default function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for does not exist. Browse BarryTech services or contact our team.')

  return (
    <>
      <PageHeader
        crumb="404"
        title="This page took a wrong turn."
        text="The link may be outdated or the page may have moved. Here are a few useful places to go instead."
      />
      <section className="container-x py-16 sm:py-20">
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn btn-red"><Home size={16} /> Back to home</Link>
          <Link to="/services" className="btn btn-outline">Browse services <ArrowRight size={16} /></Link>
          <Link to="/contact" className="btn btn-outline">Contact us</Link>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-semibold text-ink transition hover:border-hot hover:text-hot-600"
            >
              {s.short}
              <ArrowRight size={15} className="shrink-0 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
