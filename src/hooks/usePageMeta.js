import { useEffect } from 'react'

const DEFAULT_DESCRIPTION =
  'BarryTech delivers cybersecurity, IT infrastructure, managed IT, physical security, software, and AI solutions for modern businesses.'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const fullTitle = title ? `${title} | BarryTech` : 'BarryTech | Secure Digital Innovations'
    const url = window.location.href
    const image = `${window.location.origin}/og-image.png`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setLink('canonical', url)
  }, [title, description])
}
