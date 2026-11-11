import { Heart } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import Icon from './ui/Icon'
import './footer.css'

export default function Footer() {
  const data = useSiteData()
  const { footer } = data

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__brand">
          <span className="footer__mark" aria-hidden="true">
            <Heart size={20} strokeWidth={1.3} />
          </span>
          <span className="script footer__word" data-field="brand">
            {data.brand}
          </span>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {data.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__note" data-field="footer.text">
          {footer.text.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>

        <div className="footer__socials">
          {footer.socials.map((s, i) => (
            <a
              key={`${s.icon}${i}`}
              href={s.url || '#'}
              onClick={s.url ? undefined : (e) => e.preventDefault()}
              target={s.url ? '_blank' : undefined}
              rel={s.url ? 'noreferrer noopener' : undefined}
              aria-label={s.icon}
              className={s.url ? '' : 'is-empty'}
            >
              <Icon name={s.icon} size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="shell footer__base">
        <span data-field="footer.small">{footer.small}</span>
        <span data-field="date">{data.date}</span>
      </div>
    </footer>
  )
}
