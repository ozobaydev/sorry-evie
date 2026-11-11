import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { heartOutline, heartPoint, heartTs, VIEW } from '../lib/heart'
import './celebration.css'

const EASE = [0.22, 0.61, 0.36, 1]

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** The reward: a slow, warm, cinematic bloom of light. */
export default function Celebration({ open }) {
  const { celebration } = useSiteData()
  const reduced = useReducedMotion()

  const sparks = useMemo(() => {
    const rand = rng(17)
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      left: `${rand() * 100}%`,
      size: 2 + rand() * 4,
      delay: `${rand() * 5}s`,
      duration: `${7 + rand() * 9}s`,
      drift: `${(rand() - 0.5) * 160}px`,
      hue: i % 4,
      alpha: 0.35 + rand() * 0.6,
    }))
  }, [])

  const heartStars = useMemo(() => heartTs(22).map((t) => heartPoint(t)), [])
  const outline = useMemo(() => heartOutline(), [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="celebrate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          role="status"
          aria-live="polite"
        >
          {/* 1 — the room darkens, then fills with warm light */}
          <motion.div
            className="celebrate__veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <motion.div
            className="celebrate__glow"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.6, delay: 0.5, ease: EASE }}
          />

          {/* 2 — the heart constellation draws itself behind the words */}
          <svg
            className="celebrate__heart"
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="celStar">
                <stop offset="0%" stopColor="#fff7e4" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <motion.path
              d={outline}
              className="celebrate__heartline"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduced ? 0 : 3.2, delay: 0.6, ease: EASE }}
            />
            {heartStars.map((p, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.8 + i * 0.07, ease: EASE }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              >
                <circle cx={p.x} cy={p.y} r="16" fill="url(#celStar)" />
                <circle cx={p.x} cy={p.y} r="2.4" fill="#fff8e8" className="celebrate__twinkle" style={{ animationDelay: `${i * 0.24}s` }} />
              </motion.g>
            ))}
          </svg>

          {/* 3 — fireflies rising */}
          <div className="celebrate__sparks" aria-hidden="true">
            {sparks.map((s) => (
              <span
                key={s.id}
                className={`celebrate__spark celebrate__spark--${s.hue}`}
                style={{
                  left: s.left,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  '--c-delay': s.delay,
                  '--c-duration': s.duration,
                  '--c-drift': s.drift,
                  '--c-alpha': s.alpha,
                }}
              />
            ))}
          </div>

          {/* 4 — flowers bloom along the bottom edge */}
          <svg className="celebrate__blooms" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
            {Array.from({ length: 17 }, (_, i) => {
              const x = 26 + i * 70
              const y = 122 - ((i * 37) % 30)
              const tone = i % 3
              const fill = tone === 0 ? '#e2b6bd' : tone === 1 ? '#d9b489' : '#c9909f'
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 1.1 + (i % 8) * 0.13, ease: EASE }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <line x1={x} y1={y} x2={x} y2={140} stroke="#7c8a6f" strokeWidth="2" opacity="0.7" />
                  {[0, 72, 144, 216, 288].map((a) => (
                    <ellipse key={a} cx={x} cy={y - 6} rx="3.4" ry="6.4" fill={fill} transform={`rotate(${a} ${x} ${y})`} />
                  ))}
                  <circle cx={x} cy={y} r="2.2" fill="#fff2d4" />
                </motion.g>
              )
            })}
          </svg>

          {/* 5 — the words */}
          <div className="celebrate__words" data-field="celebration.lines">
            {celebration.lines.map((line, i) => (
              <motion.p
                key={line}
                className={i === 0 ? 'celebrate__lead' : 'celebrate__line'}
                initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1 + i * 0.85, ease: EASE }}
              >
                {line}
              </motion.p>
            ))}

            <motion.button
              className="btn celebrate__cta"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 + celebration.lines.length * 0.85, ease: EASE }}
              onClick={() => document.getElementById('final')?.scrollIntoView({ behavior: 'smooth' })}
              data-field="celebration.button"
            >
              {celebration.button}
              <ArrowRight size={15} strokeWidth={1.6} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
