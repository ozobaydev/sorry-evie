import { motion, useScroll, useSpring } from 'framer-motion'
import './scroll-progress.css'

/** A hairline of light that fills as the story is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  return <motion.div className="scrollbar" style={{ scaleX: width }} aria-hidden="true" />
}
