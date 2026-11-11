import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { useStory } from '../context/StoryContext'
import { heartOutline, heartPoint, heartSegment, heartTs, VIEW } from '../lib/heart'
import PhotoPlaceholder from './ui/PhotoPlaceholder'
import StarField from './atmosphere/StarField'
import Reveal from './ui/Reveal'
import './constellation.css'

const EASE = [0.22, 0.61, 0.36, 1]

export default function MemoryConstellation() {
  const { constellation, memories } = useSiteData()
  const { openedStars, openStar, forgiven } = useStory()
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState(null)

  const n = Math.max(memories.length, 1)
  const ts = useMemo(() => heartTs(n), [n])

  const stars = useMemo(() => ts.map((t) => heartPoint(t)), [ts])

  // faint stars that sit between the memory stars and complete the outline
  const dust = useMemo(() => {
    const out = []
    const per = 6
    for (let i = 0; i < n; i += 1) {
      const t0 = ts[i]
      const t1 = ts[(i + 1) % n] + (i === n - 1 ? Math.PI * 2 : 0)
      for (let k = 1; k < per; k += 1) {
        const p = heartPoint(t0 + ((t1 - t0) * k) / per)
        out.push({ ...p, pair: i, k })
      }
    }
    return out
  }, [ts, n])

  const links = useMemo(
    () =>
      ts.map((t0, i) => ({
        i,
        next: (i + 1) % n,
        d: heartSegment(t0, ts[(i + 1) % n] + (i === n - 1 ? Math.PI * 2 : 0)),
      })),
    [ts, n]
  )

  const outline = useMemo(() => heartOutline(), [])
  const found = openedStars.size
  const complete = forgiven || found >= n

  const pick = (i) => {
    openStar(i)
    setSelected(i)
  }

  const step = (dir) => {
    const next = ((selected ?? 0) + dir + n) % n
    pick(next)
  }

  const isLit = (i) => complete || openedStars.has(i)
  const isLinked = (l) => complete || (openedStars.has(l.i) && openedStars.has(l.next))

  const memory = selected === null ? null : memories[selected]

  // nothing to map if the customer removed every memory
  if (!memories.length) return null

  return (
    <section className="section constellation band-both-alt" id="constellation">
      <div className="backdrop constellation__bg" aria-hidden="true">
        <StarField count={80} seed={71} opacity={0.55} />
        <div className="constellation__haze" />
      </div>

      <div className="shell constellation__shell">
        <header className="constellation__head">
          <Reveal as="p" className="eyebrow" data-field="constellation.label" y={14}>
            {constellation.label}
          </Reveal>
          <Reveal as="h2" className="h1" data-field="constellation.heading" delay={0.06}>
            {constellation.heading}
          </Reveal>
          <Reveal as="p" className="constellation__sub muted" data-field="constellation.sub" delay={0.14}>
            {complete ? constellation.complete : constellation.sub}
          </Reveal>
          <Reveal className="constellation__count" delay={0.2}>
            <span className="constellation__bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${complete ? 1 : found / n})` }} />
            </span>
            <span>
              {complete ? n : found} / {n} memories
            </span>
          </Reveal>
        </header>

        <div className={`constellation__stage ${complete ? 'is-complete' : ''}`}>
          <svg
            className="constellation__svg"
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="Memory constellation. Select a star to open a memory."
          >
            <defs>
              <radialGradient id="starGlow">
                <stop offset="0%" stopColor="#fff8e6" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#ffe6b8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="linkLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8c5c5" />
                <stop offset="50%" stopColor="#f6e3c4" />
                <stop offset="100%" stopColor="#c58f9d" />
              </linearGradient>
              <filter id="starBlur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* the shape, only just hinted at until the stars are found */}
            <path d={outline} className="constellation__ghost" />

            {/* the finished heart, glowing behind everything */}
            <AnimatePresence>
              {complete && (
                <motion.path
                  key="outline"
                  d={outline}
                  className="constellation__outline"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 2.6, ease: EASE }}
                />
              )}
            </AnimatePresence>

            {/* connections */}
            {links.map((l) => (
              <AnimatePresence key={`l${l.i}`}>
                {isLinked(l) && (
                  <motion.path
                    d={l.d}
                    className="constellation__link"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 1.3, ease: EASE }}
                  />
                )}
              </AnimatePresence>
            ))}

            {/* dust stars between memories */}
            {dust.map((d, i) => (
              <circle
                key={`d${i}`}
                cx={d.x}
                cy={d.y}
                r={complete || openedStars.has(d.pair) ? 2.1 : 1.3}
                className={`constellation__dust ${complete || openedStars.has(d.pair) ? 'is-lit' : ''}`}
                style={{ animationDelay: `${(i % 7) * 0.6}s` }}
              />
            ))}

            {/* memory stars */}
            {stars.map((p, i) => {
              const lit = isLit(i)
              return (
                <g
                  key={`s${i}`}
                  className={`constellation__star ${lit ? 'is-lit' : ''} ${selected === i ? 'is-active' : ''}`}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      pick(i)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Memory ${i + 1}: ${memories[i].title}`}
                  transform={`translate(${p.x} ${p.y})`}
                >
                  <circle className="constellation__hit" r="34" fill="transparent" />
                  <circle className="constellation__starGlow" r="26" fill="url(#starGlow)" />
                  <path
                    className="constellation__spark"
                    d="M0 -13 L2.6 -3.2 L12.4 0 L2.6 3.2 L0 13 L-2.6 3.2 L-12.4 0 L-2.6 -3.2 Z"
                  />
                  <circle className="constellation__core" r="3.1" />
                  <circle className="constellation__ring" r="12" />
                </g>
              )
            })}
          </svg>

          {/* -------------------------------------------------------- the card */}
          <AnimatePresence mode="wait">
            {memory && (
              <motion.aside
                key={selected}
                className="starcard"
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <button className="starcard__close" onClick={() => setSelected(null)} aria-label="Close memory">
                  <X size={15} strokeWidth={1.6} />
                </button>

                <div className="starcard__row">
                  <div className="starcard__thumb">
                    {memory.image ? (
                      <img src={memory.image} alt={memory.title} loading="lazy" />
                    ) : (
                      <PhotoPlaceholder index={selected} ratio="1 / 1" />
                    )}
                  </div>
                  <div className="starcard__meta">
                    <p className="starcard__date">{memory.date}</p>
                    <h3 className="starcard__title">{memory.title}</h3>
                  </div>
                </div>

                <p className="starcard__text">{memory.message}</p>

                <div className="starcard__nav">
                  <button onClick={() => step(-1)} aria-label="Previous memory">
                    <ChevronLeft size={16} strokeWidth={1.6} />
                  </button>
                  <span className="starcard__dots" aria-hidden="true">
                    {memories.map((m, i) => (
                      <i key={`${m.title}${i}`} className={i === selected ? 'is-on' : ''} />
                    ))}
                  </span>
                  <button onClick={() => step(1)} aria-label="Next memory">
                    <ChevronRight size={16} strokeWidth={1.6} />
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
