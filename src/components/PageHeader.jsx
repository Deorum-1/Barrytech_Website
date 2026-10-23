export default function PageHeader({ title, text, crumb }) {
  return (
    <section className="swoosh-bg pt-[73px] text-white">
      <div className="container-x py-20 sm:py-28">
        {crumb && <p className="mb-4 text-sm text-brand-200">{crumb}</p>}
        <h1 className="max-w-4xl text-4xl font-extrabold text-white sm:text-6xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-slate-200">{text}</p>}
      </div>
    </section>
  )
}
