import { useSiteData } from '../context/SiteDataContext'
import Reveal from './ui/Reveal'
import Florals from './ui/Florals'
import Particles from './atmosphere/Particles'
import './letter.css'

/** Section 07 — the written apology, revealed line by line. */
export default function LetterSection() {
  const { saidLetter, senderName } = useSiteData()

  return (
    <section className="section letter band-both" id="apology">
      <div className="backdrop letter__bg" aria-hidden="true" />
      <Florals side="left" />
      <Particles count={8} seed={57} variant="petal" />

      <div className="shell letter__shell">
        <Reveal className="letter__sheet paper deckle" y={40} duration={1.2} amount={0.15}>
          <span className="letter__pin" aria-hidden="true" />

          <p className="eyebrow eyebrow--ink" data-field="saidLetter.label">
            {saidLetter.label}
          </p>

          <Reveal as="h2" className="h2 letter__heading" data-field="saidLetter.heading" delay={0.1}>
            {saidLetter.heading}
          </Reveal>

          <div className="letter__lines" data-field="saidLetter.lines">
            {saidLetter.lines.map((line, i) => (
              <Reveal as="p" className="hand letter__line" key={i} delay={0.18 + i * 0.22} y={14} amount={0.4}>
                {line}
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="letter__closing" data-field="saidLetter.closing" delay={0.24} amount={0.4}>
            {saidLetter.closing}
          </Reveal>

          <Reveal className="letter__sign" delay={0.34} amount={0.4}>
            <span className="script script--md" data-field="saidLetter.signature">
              {saidLetter.signature}
            </span>
            <svg className="letter__flourish" viewBox="0 0 220 40" aria-hidden="true">
              <path
                d="M4 30 C48 6 78 6 108 22 C132 35 158 30 178 14 C190 5 204 6 214 14"
                fill="none"
                stroke="#c1a07f"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="letter__from" data-field="senderName">
              {senderName}
            </span>
          </Reveal>
        </Reveal>
      </div>
    </section>
  )
}
