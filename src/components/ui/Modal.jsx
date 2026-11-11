import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import './modal.css'

const EASE = [0.22, 0.61, 0.36, 1]

/** Shared dialog shell: portal, escape-to-close, scroll lock, focus return. */
export default function Modal({ open, onClose, children, label = 'Dialog', variant = 'dark', wide = false }) {
  const returnTo = useRef(null)
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    returnTo.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    const t = window.setTimeout(() => panel.current?.focus(), 60)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
      window.setTimeout(() => {
        document.body.style.overflow = prev
      }, 0)
      if (returnTo.current instanceof HTMLElement) returnTo.current.focus()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: EASE }}
          onClick={onClose}
          role="presentation"
        >
          <div className="modal__veil" />
          <motion.div
            ref={panel}
            className={`modal__panel modal__panel--${variant} ${wide ? 'modal__panel--wide' : ''}`}
            initial={{ opacity: 0, y: 34, scale: 0.965, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.62, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={1.5} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
