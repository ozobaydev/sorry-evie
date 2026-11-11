import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import Polaroid from './ui/Polaroid'
import Reveal from './ui/Reveal'
import Florals from './ui/Florals'
import Particles from './atmosphere/Particles'
import MemoryModal from './MemoryModal'
import './memory-gallery.css'

// a repeating scatter pattern so any number of photos looks hand-placed
const SCATTER = [-4.5, 2.8, -1.9, 4.1, -3.2, 1.6]
const LIFT = [0, 26, 8, 34, 4, 22]

export default function MemoryGallery() {
  const { memoriesSection, memories } = useSiteData()
  const [index, setIndex] = useState(null)

  return (
    <section className="section gallery band-both" id="memories">
      <div className="backdrop gallery__bg" aria-hidden="true" />
      <Florals side="both" density={2} />
      <Particles count={12} seed={41} variant="petal" />

      <div className="shell">
        <div className="gallery__head">
          <div>
            <Reveal as="p" className="eyebrow eyebrow--ink" data-field="memoriesSection.label" y={14}>
              {memoriesSection.label}
            </Reveal>
            <Reveal as="h2" className="h1 gallery__title" data-field="memoriesSection.heading" delay={0.06}>
              {memoriesSection.heading}
            </Reveal>
            <Reveal as="p" className="gallery__sub" data-field="memoriesSection.sub" delay={0.14}>
              {memoriesSection.sub}
            </Reveal>
            <Reveal className="gallery__body" data-field="memoriesSection.body" delay={0.22}>
              {memoriesSection.body.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </Reveal>
            <Reveal delay={0.32}>
              <button
                className="btn btn--ink gallery__cta"
                onClick={() => setIndex(0)}
                data-field="memoriesSection.cta"
              >
                {memoriesSection.cta}
                <ArrowRight size={15} strokeWidth={1.6} />
              </button>
            </Reveal>
          </div>

          <Reveal
            as="p"
            className="script script--md gallery__script"
            data-field="memoriesSection.script"
            delay={0.3}
            y={18}
          >
            {memoriesSection.script}
          </Reveal>
        </div>

        <div className="gallery__grid" data-field="memories">
          {memories.map((memory, i) => (
            <Reveal
              key={`${memory.title}-${i}`}
              className="gallery__cell"
              delay={i * 0.08}
              y={30}
              amount={0.25}
              style={{ '--lift': `${LIFT[i % LIFT.length]}px` }}
            >
              <Polaroid
                memory={memory}
                index={i}
                rotate={SCATTER[i % SCATTER.length]}
                onClick={() => setIndex(i)}
                field={`memories.${i}`}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <MemoryModal memories={memories} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
