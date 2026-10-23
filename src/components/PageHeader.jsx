export default function PageHeader({ title, text, crumb }) {
  return (
    <section className="swoosh-bg pt-[72px] text-white sm:pt-[80px]">
      <div className="container-x py-16 sm:py-24">
        {crumb && <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-100">{crumb}</nav>}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-slate-200">{text}</p>}
      </div>
    </section>
  )
}
