import { ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from './ui/Modal'
import PhotoPlaceholder from './ui/PhotoPlaceholder'
import './memory-modal.css'

/** Full-screen memory viewer with prev / next navigation. */
export default function MemoryModal({ memories, index, onClose, onIndex }) {
  const open = index !== null && index >= 0
  const memory = open ? memories[index] : null
  const many = memories.length > 1

  const step = (dir) => (e) => {
    e.stopPropagation()
    onIndex((index + dir + memories.length) % memories.length)
  }

  return (
    <Modal open={open} onClose={onClose} label={memory?.title || 'Memory'} variant="paper" wide>
      {memory && (
        <div className="memview">
          <div className="memview__photo">
            {memory.image ? (
              <img src={memory.image} alt={memory.title} />
            ) : (
              <PhotoPlaceholder index={index} ratio="1 / 1" />
            )}
            <span className="memview__grain" aria-hidden="true" />
          </div>

          <div className="memview__body">
            <p className="memview__date">{memory.date}</p>
            <h3 className="memview__title">{memory.title}</h3>
            <p className="memview__text">{memory.message}</p>
            <p className="hand memview__caption">{memory.caption || memory.title}</p>

            {many && (
              <div className="memview__nav">
                <button onClick={step(-1)} aria-label="Previous memory">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <span className="memview__dots" aria-hidden="true">
                  {memories.map((m, i) => (
                    <i key={m.title + i} className={i === index ? 'is-on' : ''} />
                  ))}
                </span>
                <button onClick={step(1)} aria-label="Next memory">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
