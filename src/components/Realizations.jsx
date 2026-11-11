import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSiteData } from '../context/SiteDataContext'
import Icon from './ui/Icon'
import Modal from './ui/Modal'
import Reveal from './ui/Reveal'
import './realizations.css'

const EASE = [0.22, 0.61, 0.36, 1]

/**
 * "The things I realized" — five glass bubbles. Each opens a short,
 * customizable explanation.
 */
export default function Realizations() {
  const { realizations } = useSiteData()
  const [openIndex, setOpenIndex] = useState(null)
  const reduced = useReducedMotion()
  const active = openIndex === null ? null : realizations.items[openIndex]

  return (
    <div className="realize">
      <Reveal as="p" className="eyebrow realize__label" data-field="realizations.label" y={14}>
        {realizations.label}
      </Reveal>

      <div className="realize__cloud" data-field="realizations.items">
        {realizations.items.map((item, i) => (
          <motion.button
            key={item.title}
            className="realize__card glass"
            onClick={() => setOpenIndex(i)}
            initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: i * 0.11, ease: EASE }}
            style={{ '--float-delay': `${i * 0.9}s` }}
            aria-label={`${item.title} — read more`}
          >
            <span className="realize__icon">
              <Icon name={item.icon} size={17} />
            </span>
            <span className="realize__text">{item.title}</span>
          </motion.button>
        ))}
      </div>

      <Reveal as="p" className="script script--sm realize__script" data-field="realizations.script" delay={0.3}>
        {realizations.script}
      </Reveal>

      <Modal open={openIndex !== null} onClose={() => setOpenIndex(null)} label={active?.title || 'Realization'}>
        {active && (
          <>
            <span className="modal__icon">
              <Icon name={active.icon} size={22} />
            </span>
            <p className="modal__eyebrow">I realize now</p>
            <h3 className="modal__title">{active.title}</h3>
            <p className="modal__text">{active.detail}</p>
          </>
        )}
      </Modal>
    </div>
  )
}
