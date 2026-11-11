import { useSiteData } from '../context/SiteDataContext'
import SunriseValley from './scenes/SunriseValley'
import Particles from './atmosphere/Particles'
import Reveal from './ui/Reveal'
import './final.css'

/** Section 11 — the same path, in full morning light. */
export default function FinalMessage() {
  const { final, images, date, personName } = useSiteData()

  return (
    <section className="section final band-top" id="final">
      <div className="backdrop final__bg" style={{ '--dawn': 1 }}>
        <SunriseValley id="dawn-b" />
        {images.sunrise ? (
          <div className="scene__photo-wrap" data-field="images.sunrise">
            <img className="scene__photo" src={images.sunrise} alt="" loading="lazy" />
          </div>
        ) : null}
        <Particles count={12} seed={151} variant="ember" />
        <div className="final__wash" />
      </div>

      <div className="shell final__shell">
        <Reveal as="h2" className="h1 final__title" data-field="final.heading">
          {final.heading}
        </Reveal>

        <Reveal as="p" className="lede final__sub" data-field="final.sub" delay={0.14}>
          {final.sub}
        </Reveal>

        <Reveal className="final__lines" data-field="final.lines" delay={0.24}>
          {final.lines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </Reveal>

        <Reveal as="p" className="script script--xl final__script" data-field="final.script" delay={0.36}>
          {final.script}
        </Reveal>

        <Reveal className="final__stamp" delay={0.48}>
          <span className="final__rule" aria-hidden="true" />
          <span data-field="personName">For {personName}</span>
          <span className="final__dot" aria-hidden="true" />
          <span data-field="date">{date}</span>
          <span className="final__rule" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
