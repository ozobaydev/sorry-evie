import { useEffect } from 'react'

/**
 * Marks every <section> that is well away from the viewport as idle.
 *
 * All the ambient loops — drifting scenery, twinkling stars, falling petals,
 * swaying flowers — otherwise keep ticking for all eleven sections at once,
 * whether or not anyone can see them. On a laptop that was the difference
 * between a steady 60fps and a stuttering 38.
 *
 * A generous margin means a section is already running by the time it scrolls
 * into view, so nothing ever visibly "starts".
 */
export default function useIdleSections() {
  useEffect(() => {
    const sections = document.querySelectorAll('main > section, footer')
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    sections.forEach((s) => s.classList.add('is-idle'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-idle', !entry.isIntersecting)
        })
      },
      { rootMargin: '60% 0px 60% 0px' }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
}
