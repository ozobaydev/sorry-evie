import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import SunriseValley from './scenes/SunriseValley'
import StarField from './atmosphere/StarField'
import Particles from './atmosphere/Particles'
import Reveal from './ui/Reveal'
import './beginning.css'

/**
 * Section 09 — night turns into morning as you scroll.
 * The whole transition rides on one CSS variable (`--dawn`) written directly
 * by a motion value, so scrolling never triggers a React render.
 */
export default function NewBeginning() {
  const { newBeginning, images } = useSiteData()
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0.05, 0.62], [0, 1], { clamp: true })
  const dawn = useSpring(raw, { stiffness: 60, damping: 24, mass: 0.6 })
  const starFade = useTransform(dawn, [0, 0.7], [0.85, 0])

  return (
    <section className="section beginning band-both" id="beginning" ref={ref}>
      <motion.div className="backdrop" style={reduced ? { '--dawn': 1 } : { '--dawn': dawn }}>
        <SunriseValley id="dawn-a" />
        {images.sunrise ? (
          <div className="scene__photo-wrap" data-field="images.sunrise">
            <img className="scene__photo" src={images.sunrise} alt="" loading="lazy" />
          </div>
        ) : null}
        <motion.div className="beginning__stars" style={reduced ? { opacity: 0 } : { opacity: starFade }}>
          <StarField count={70} seed={97} />
        </motion.div>
        <Particles count={14} seed={103} variant="ember" />
      </motion.div>

      <div className="shell beginning__shell">
        <Reveal as="p" className="eyebrow" data-field="newBeginning.label" y={14}>
          {newBeginning.label}
        </Reveal>

        <Reveal as="h2" className="h1 beginning__title" data-field="newBeginning.heading" delay={0.08}>
          {newBeginning.heading}
        </Reveal>

        <Reveal as="p" className="lede beginning__sub" data-field="newBeginning.sub" delay={0.2}>
          {newBeginning.sub}
        </Reveal>

        <Reveal as="p" className="script script--xl beginning__script" data-field="newBeginning.script" delay={0.32}>
          {newBeginning.script}
        </Reveal>

        <Reveal delay={0.44}>
          <button
            className="btn beginning__cta"
            onClick={() => document.getElementById('question')?.scrollIntoView({ behavior: 'smooth' })}
            data-field="newBeginning.cta"
          >
            {newBeginning.cta}
            <ArrowRight size={16} strokeWidth={1.6} />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
