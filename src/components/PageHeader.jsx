export default function PageHeader({ title, text, crumb }) {
  return (
    <section className="swoosh-bg pt-[72px] text-white sm:pt-[80px]">
      <div className="container-x py-16 sm:py-24">
        {crumb && <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-100">{crumb}</nav>}
        <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">{text}</p>}
      </div>
      <div data-nav-switch aria-hidden="true" />
    </section>
  )
}
