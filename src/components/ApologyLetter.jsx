import { Heart } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import Reveal from './ui/Reveal'
import Polaroid from './ui/Polaroid'
import Florals from './ui/Florals'
import Particles from './atmosphere/Particles'
import './apology.css'

export default function ApologyLetter() {
  const { letter, images, memories } = useSiteData()

  const polaroid = {
    title: 'Us',
    date: '',
    caption: letter.polaroidCaption,
    image: images.apology || memories[2]?.image || '',
  }

  return (
    <section className="section apology band-both" id="letter">
      <div className="backdrop apology__bg" aria-hidden="true" />
      <Florals side="both" />
      <Particles count={9} seed={23} variant="petal" />

      <div className="shell apology__grid">
        {/* -------------------------------------------------- the note + photo */}
        <Reveal className="apology__left" y={34} duration={1.2}>
          <div className="notecard paper deckle" data-field="letter.note">
            <span className="notecard__clip" aria-hidden="true" />
            {letter.note.map((line, i) => (
              <p className="hand notecard__line" key={i} style={{ '--i': i }}>
                {line}
              </p>
            ))}
            <p className="hand notecard__sign" data-field="letter.noteSign">
              {letter.noteSign} <Heart size={13} strokeWidth={1.4} />
            </p>
          </div>

          <div className="apology__photo" data-field="images.apology">
            <Polaroid memory={polaroid} index={2} rotate={3.2} size="sm" />
          </div>
        </Reveal>

        {/* ------------------------------------------------------- the heading */}
        <div className="apology__mid">
          <Reveal as="p" className="eyebrow eyebrow--ink" data-field="letter.label" y={16}>
            {letter.label}
          </Reveal>

          <Reveal as="h2" className="h1 apology__heading" data-field="letter.heading" delay={0.08}>
            {letter.heading.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </Reveal>

          <Reveal as="p" className="apology__sub" data-field="letter.sub" delay={0.18}>
            {letter.sub}
          </Reveal>

          <Reveal as="p" className="script script--md apology__script" data-field="letter.script" delay={0.28}>
            {letter.script}
          </Reveal>

          <Reveal className="apology__foot" delay={0.4}>
            <Heart size={14} strokeWidth={1.4} />
            <span data-field="letter.footnote">{letter.footnote}</span>
          </Reveal>
        </div>

        {/* ----------------------------------------------------- the checklist */}
        <ul className="apology__list" data-field="letter.checklist">
          {letter.checklist.map((item, i) => (
            <Reveal as="li" key={item} delay={0.1 + i * 0.09} y={18} amount={0.6}>
              <span className="apology__tick" aria-hidden="true">
                <Heart size={13} strokeWidth={1.5} />
              </span>
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
