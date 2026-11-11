import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { useStory } from '../context/StoryContext'
import StarField from './atmosphere/StarField'
import Particles from './atmosphere/Particles'
import Reveal from './ui/Reveal'
import Celebration from './Celebration'
import './forgiveness.css'

const EASE = [0.22, 0.61, 0.36, 1]
const PAD = 10

/**
 * Section 10 — the question.
 * The "No" button steps aside a few times, then settles down and stays
 * perfectly clickable. It is measured against its stage on every move, so it
 * can never end up off-screen, on any viewport.
 */
export default function ForgivenessGame() {
  const { forgiveness } = useSiteData()
  const { forgiven, setForgiven } = useStory()

  const stageRef = useRef(null)
  const noRef = useRef(null)
  const yesRef = useRef(null)

  const [tries, setTries] = useState(0)
  const [pos, setPos] = useState(null) // null = still in its natural place
  const [message, setMessage] = useState('')

  const maxRuns = forgiveness.noMessages.length
  const settled = tries >= maxRuns
  const yesScale = 1 + Math.min(tries, 6) * 0.12

  const clampToStage = useCallback((x, y) => {
    const stage = stageRef.current
    const btn = noRef.current
    if (!stage || !btn) return { x, y }
    const s = stage.getBoundingClientRect()
    const b = btn.getBoundingClientRect()
    const maxX = Math.max(PAD, s.width - b.width - PAD)
    const maxY = Math.max(PAD, s.height - b.height - PAD)
    return {
      x: Math.min(Math.max(x, PAD), maxX),
      y: Math.min(Math.max(y, PAD), maxY),
    }
  }, [])

  const runAway = () => {
    const stage = stageRef.current
    const btn = noRef.current
    if (!stage || !btn) return

    const s = stage.getBoundingClientRect()
    const b = btn.getBoundingClientRect()
    const yes = yesRef.current?.getBoundingClientRect()

    const maxX = Math.max(PAD, s.width - b.width - PAD)
    const maxY = Math.max(PAD, s.height - b.height - PAD)

    let next = { x: PAD, y: PAD }
    for (let attempt = 0; attempt < 14; attempt += 1) {
      const x = PAD + Math.random() * (maxX - PAD)
      const y = PAD + Math.random() * (maxY - PAD)
      next = { x, y }
      if (!yes) break
      // keep clear of the Yes button so both stay comfortably tappable
      const overlapsYes =
        s.left + x < yes.right + 14 &&
        s.left + x + b.width > yes.left - 14 &&
        s.top + y < yes.bottom + 14 &&
        s.top + y + b.height > yes.top - 14
      const movedEnough = !pos || Math.hypot(x - pos.x, y - pos.y) > Math.min(90, maxX * 0.35)
      if (!overlapsYes && movedEnough) break
    }
    setPos(clampToStage(next.x, next.y))
  }

  const onNo = () => {
    setMessage(forgiveness.noMessages[Math.min(tries, maxRuns - 1)])
    if (tries < maxRuns - 1) runAway()
    setTries((t) => t + 1)
  }

  const onYes = () => {
    setMessage('')
    setForgiven(true)
  }

  // keep the escaped button inside its stage when the window changes size
  useEffect(() => {
    if (!pos) return undefined
    const onResize = () => setPos((p) => (p ? clampToStage(p.x, p.y) : p))
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [pos, clampToStage])

  return (
    <section className="section question band-both-alt" id="question">
      <div className="backdrop question__bg" aria-hidden="true">
        <div className="question__moon" />
        <StarField count={80} seed={131} />
        <Particles count={12} seed={137} variant="ember" />
        <div className="question__lanterns">
          {[12, 78, 88].map((left, i) => (
            <span key={left} className="glow-orb" style={{ left: `${left}%`, top: `${18 + i * 22}%`, width: 150, height: 150, background: 'radial-gradient(circle, rgba(255,196,124,0.5), transparent 68%)', animationDelay: `${i * 1.6}s` }} />
          ))}
        </div>
      </div>

      <div
        className={`shell question__shell ${forgiven ? 'is-answered' : ''}`}
        aria-hidden={forgiven || undefined}
        inert={forgiven || undefined}
      >
        <Reveal as="p" className="eyebrow" data-field="forgiveness.label" y={14}>
          {forgiveness.label}
        </Reveal>

        <Reveal as="h2" className="h1 question__title" data-field="forgiveness.question" delay={0.08}>
          {forgiveness.question}
        </Reveal>

        <Reveal as="p" className="muted question__sub" data-field="forgiveness.sub" delay={0.16}>
          {forgiveness.sub}
        </Reveal>

        <div className="question__stage" ref={stageRef}>
          <div className="question__row">
            <div className="question__yeswrap">
              <span className="question__hint hand" data-field="forgiveness.hint" aria-hidden="true">
                {forgiveness.hint}
                <svg viewBox="0 0 70 40" aria-hidden="true">
                  <path d="M66 4 C46 2 22 10 8 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M4 34 L10 22 L18 30 Z" fill="currentColor" />
                </svg>
              </span>
              <button
                ref={yesRef}
                className="yesbtn"
                onClick={onYes}
                style={{ '--yes-scale': yesScale }}
                data-field="forgiveness.yes"
              >
                <span>{forgiveness.yes}</span>
                <Heart size={17} strokeWidth={1.6} fill="currentColor" />
              </button>
            </div>

            <button
              ref={noRef}
              className={`nobtn ${settled ? 'is-settled' : ''}`}
              onClick={onNo}
              data-field="forgiveness.no"
              style={
                pos
                  ? { position: 'absolute', left: `${pos.x}px`, top: `${pos.y}px`, margin: 0 }
                  : undefined
              }
            >
              <span>{forgiveness.no}</span>
              <span className="nobtn__ring" aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {message && !forgiven && (
              <motion.p
                key={message}
                className="question__message hand"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Reveal className="question__aside hand" data-field="forgiveness.aside" delay={0.4}>
          {forgiveness.aside.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </Reveal>
      </div>

      <Celebration open={forgiven} />
    </section>
  )
}
