import { useMemo } from 'react'
import './atmosphere.css'

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/**
 * Slow floating dust / fireflies / petals.
 * `variant`: 'dust' | 'ember' | 'petal'
 */
export default function Particles({ count = 18, seed = 3, variant = 'dust', className = '' }) {
  const bits = useMemo(() => {
    const rand = rng(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      // dust/ember draw their glow with a gradient, so the box is ~2.4x the
      // visible core (a box-shadow would repaint on every frame instead)
      size: variant === 'petal' ? 5 + rand() * 7 : (1.6 + rand() * 3.4) * 2.4,
      delay: `${rand() * 14}s`,
      duration: `${14 + rand() * 18}s`,
      drift: `${(rand() - 0.5) * 90}px`,
      spin: `${(rand() - 0.5) * 180}deg`,
      alpha: 0.2 + rand() * 0.55,
    }))
  }, [count, seed, variant])

  return (
    <div className={`particles particles--${variant} ${className}`} aria-hidden="true">
      {bits.map((b) => (
        <span
          key={b.id}
          className="particles__bit"
          style={{
            left: b.left,
            top: b.top,
            width: `${b.size}px`,
            height: variant === 'petal' ? `${b.size * 0.66}px` : `${b.size}px`,
            '--p-delay': b.delay,
            '--p-duration': b.duration,
            '--p-drift': b.drift,
            '--p-spin': b.spin,
            '--p-alpha': b.alpha,
          }}
        />
      ))}
    </div>
  )
}
