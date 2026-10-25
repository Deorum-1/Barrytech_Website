import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { Send } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        })
      })
      return () => window.cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Link
        to="/contact#call-barrytech-form"
        aria-label="Book your free assessment"
        className="fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-hot px-4 py-3 text-sm font-bold text-white shadow-lg shadow-ink/20 transition hover:-translate-y-0.5 hover:bg-hot-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5"
      >
        <Send size={16} aria-hidden="true" />
        Book your free assessment
      </Link>
    </MotionConfig>
  )
}
