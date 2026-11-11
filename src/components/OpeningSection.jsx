import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import MoonlitLake from './scenes/MoonlitLake'
import StarField from './atmosphere/StarField'
import Particles from './atmosphere/Particles'
import './opening.css'

const EASE = [0.22, 0.61, 0.36, 1]

export default function OpeningSection() {
  const { hero, images } = useSiteData()
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '42%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const step = (i) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.15, delay: reduced ? 0 : 0.35 + i * 0.28, ease: EASE },
  })

  const scrollDown = () => {
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section opening band-bottom" id="home" ref={ref}>
      <motion.div className="backdrop" style={reduced ? undefined : { y: bgY }}>
        <MoonlitLake />
        {images.hero ? (
          <div className="scene__photo-wrap" data-field="images.hero">
            <img className="scene__photo" src={images.hero} alt="" />
          </div>
        ) : null}
        <StarField count={90} seed={11} />
        <Particles count={16} seed={5} variant="dust" />
        <Particles count={7} seed={19} variant="ember" />
      </motion.div>

      <motion.div className="shell opening__shell" style={reduced ? undefined : { y: textY, opacity: fade }}>
        <div className="opening__copy">
          <motion.p className="eyebrow" data-field="hero.eyebrow" {...step(0)}>
            {hero.eyebrow}
          </motion.p>

          <motion.h1 className="display opening__title" data-field="hero.title" {...step(1)}>
            {hero.title}
          </motion.h1>

          <motion.p className="lede opening__sub" data-field="hero.subtitle" {...step(2)}>
            {hero.subtitle}
          </motion.p>

          <motion.p className="script script--lg opening__script" data-field="hero.script" {...step(3)}>
            {hero.script}
          </motion.p>

          <motion.div className="opening__body body-sm" data-field="hero.body" {...step(4)}>
            {hero.body.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
            <strong data-field="hero.bodyStrong">{hero.bodyStrong}</strong>
          </motion.div>

          <motion.div {...step(5)}>
            <button className="btn opening__cta" onClick={scrollDown} data-field="hero.cta">
              {hero.cta}
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="scroll-hint"
        onClick={scrollDown}
        style={reduced ? undefined : { opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        aria-label="Scroll to the next section"
      >
        <span data-field="hero.scrollHint">{hero.scrollHint}</span>
        <span className="scroll-hint__rail" aria-hidden="true">
          <span className="scroll-hint__dot" />
        </span>
      </motion.button>
    </section>
  )
}
