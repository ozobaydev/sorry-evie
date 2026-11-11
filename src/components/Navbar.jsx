import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import './navbar.css'

export default function Navbar() {
  const data = useSiteData()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight the section currently on screen
  useEffect(() => {
    const ids = data.nav.map((n) => n.id)
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [data.nav])

  // lock body scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <a className="nav__logo" href="#home" onClick={(e) => go(e, 'home')} aria-label="Back to the beginning">
          <svg viewBox="0 0 32 30" className="nav__mark" aria-hidden="true">
            <path
              d="M16 27C16 27 2.5 18.8 2.5 10.4 2.5 6 6 2.8 10 2.8c2.6 0 4.8 1.4 6 3.5 1.2-2.1 3.4-3.5 6-3.5 4 0 7.5 3.2 7.5 7.6C29.5 18.8 16 27 16 27z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="nav__word script" data-field="brand">
            {data.brand}
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {data.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={active === item.id ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <a className="btn nav__cta" href="#letter" onClick={(e) => go(e, 'letter')}>
            {data.hero.cta}
            <ArrowRight size={15} strokeWidth={1.6} />
          </a>
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navsheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="navsheet__glow" aria-hidden="true" />
            <nav className="navsheet__links">
              {data.nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <span className="navsheet__num">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              className="btn navsheet__cta"
              href="#letter"
              onClick={(e) => go(e, 'letter')}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.6 }}
            >
              {data.hero.cta}
              <ArrowRight size={15} strokeWidth={1.6} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
