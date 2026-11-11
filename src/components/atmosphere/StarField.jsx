import { useMemo } from 'react'
import './atmosphere.css'

/** Deterministic pseudo-random so the sky never re-shuffles between renders. */
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/**
 * A star layer built for the compositor.
 *
 * The bulk of the sky is one inline SVG that is painted a single time and then
 * never touched again. Only a small handful of stars actually animate, and they
 * animate `opacity` alone — no box-shadow, no transform — so the GPU can fade
 * them without the main thread repainting anything.
 *
 * (An earlier version gave all ~90 stars a box-shadow and a scale animation,
 * which meant repainting every shadow on every frame. That alone cost roughly
 * a third of the frame budget.)
 */
export default function StarField({ count = 70, seed = 7, className = '', maxSize = 2.4, opacity = 1 }) {
  const { still, twinkling } = useMemo(() => {
    const rand = rng(seed)
    const liveCount = Math.max(4, Math.min(10, Math.round(count / 9)))
    const all = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 78,
      r: 0.35 + rand() * (maxSize / 2),
      alpha: 0.28 + rand() * 0.6,
      delay: rand() * 6,
      duration: 3.6 + rand() * 5.4,
    }))
    return { still: all, twinkling: all.slice(0, liveCount) }
  }, [count, seed, maxSize])

  return (
    <div className={`starfield ${className}`} style={{ opacity }} aria-hidden="true">
      {/* painted once — the whole static sky in a single element */}
      <svg className="starfield__still" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {still.map((s) => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.r * 0.09} fill="#fff" opacity={s.alpha} />
        ))}
      </svg>

      {/* the few that breathe — opacity only, so they stay on the GPU */}
      {twinkling.map((s) => (
        <span
          key={`t${s.id}`}
          className="starfield__twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.r * 2.6}px`,
            height: `${s.r * 2.6}px`,
            '--twinkle-delay': `${s.delay}s`,
            '--twinkle-duration': `${s.duration}s`,
            '--twinkle-alpha': s.alpha,
          }}
        />
      ))}
    </div>
  )
}
