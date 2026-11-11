import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import RainyNight from './scenes/RainyNight'
import StarField from './atmosphere/StarField'
import Reveal from './ui/Reveal'
import Realizations from './Realizations'
import './story.css'

export default function StoryChapter() {
  const { chapter, images } = useSiteData()
  const [open, setOpen] = useState(false)

  return (
    <section className="section story band-both-alt" id="story">
      <div className="backdrop">
        <RainyNight />
        {images.chapter ? (
          <div className="scene__photo-wrap" data-field="images.chapter">
            <img className="scene__photo" src={images.chapter} alt="" loading="lazy" />
          </div>
        ) : null}
        <StarField count={26} seed={31} opacity={0.4} />
      </div>

      <div className="shell story__grid">
        <div className="story__copy">
          <Reveal as="p" className="eyebrow" data-field="chapter.label" y={14}>
            {chapter.label}
          </Reveal>

          <Reveal as="h2" className="h1 story__title" data-field="chapter.heading" delay={0.06}>
            {chapter.heading}
          </Reveal>

          <Reveal as="p" className="lede story__sub" data-field="chapter.sub" delay={0.14}>
            {chapter.sub}
          </Reveal>

          <div className="story__lines" data-field="chapter.lines">
            {chapter.lines.map((line, i) => (
              <Reveal as="p" key={i} delay={0.22 + i * 0.14} y={16} amount={0.5}>
                {line}
              </Reveal>
            ))}
            <Reveal as="p" className="story__strong" data-field="chapter.strong" delay={0.62} y={16} amount={0.5}>
              {chapter.strong}
            </Reveal>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                className="story__expanded"
                data-field="chapter.expanded"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 18 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {chapter.expanded}
              </motion.p>
            )}
          </AnimatePresence>

          <Reveal delay={0.7}>
            <button
              className={`btn story__cta ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              data-field="chapter.cta"
            >
              {open ? 'Close' : chapter.cta}
              <ArrowRight size={15} strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        <Realizations />
      </div>
    </section>
  )
}
