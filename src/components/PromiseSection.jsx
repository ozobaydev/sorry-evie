import { motion, useReducedMotion } from 'framer-motion'
import { useSiteData } from '../context/SiteDataContext'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Florals from './ui/Florals'
import Particles from './atmosphere/Particles'
import './promises.css'

const EASE = [0.22, 0.61, 0.36, 1]

/** Section 08 — cream fades into dusty rose as the promises arrive. */
export default function PromiseSection() {
  const { promiseSection, promises } = useSiteData()
  const reduced = useReducedMotion()

  return (
    <section className="section promises band-both-alt" id="promises">
      <div className="backdrop promises__bg" aria-hidden="true" />
      <Florals side="right" />
      <Particles count={10} seed={83} variant="petal" />

      <div className="shell">
        <div className="promises__head">
          <div>
            <Reveal as="p" className="eyebrow eyebrow--ink" data-field="promiseSection.label" y={14}>
              {promiseSection.label}
            </Reveal>
            <Reveal as="h2" className="h1 promises__title" data-field="promiseSection.heading" delay={0.06}>
              {promiseSection.heading}
            </Reveal>
            <Reveal className="promises__sub" data-field="promiseSection.sub" delay={0.14}>
              {promiseSection.sub.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </Reveal>
          </div>

          <Reveal
            as="p"
            className="script script--md promises__script"
            data-field="promiseSection.script"
            delay={0.24}
          >
            {promiseSection.script}
          </Reveal>
        </div>

        <div className="promises__grid" data-field="promises">
          {promises.map((promise, i) => (
            <motion.article
              key={promise.title}
              className="promise"
              initial={reduced ? false : { opacity: 0, y: 34, filter: 'blur(9px)' }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, delay: i * 0.13, ease: EASE }}
            >
              <span className="promise__no">0{i + 1}</span>
              <span className="promise__icon">
                <Icon name={promise.icon} size={22} strokeWidth={1.15} />
              </span>
              <h3 className="promise__title">{promise.title}</h3>
              <p className="promise__text">{promise.message}</p>
              <span className="promise__rule" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
