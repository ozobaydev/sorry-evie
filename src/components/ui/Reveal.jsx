import { motion, useReducedMotion } from 'framer-motion'

/**
 * The house scroll-reveal: slow, soft, never bouncy.
 * Falls back to a plain element when the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  blur = 8,
  duration = 1.05,
  once = true,
  amount = 0.3,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
