import PhotoPlaceholder from './PhotoPlaceholder'
import './polaroid.css'

/** A tilted instant photograph. Click opens the full memory. */
export default function Polaroid({
  memory,
  index = 0,
  rotate = 0,
  onClick,
  field,
  size = 'md',
  showMeta = true,
  tabIndex = 0,
}) {
  const interactive = typeof onClick === 'function'

  return (
    <div
      className={`polaroid polaroid--${size} ${interactive ? 'polaroid--tap' : ''}`}
      style={{ '--rot': `${rotate}deg` }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!interactive) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? tabIndex : undefined}
      aria-label={interactive ? `Open memory: ${memory.title}` : undefined}
      data-field={field}
    >
      <div className="polaroid__frame">
        <div className="polaroid__photo">
          {memory.image ? (
            <img src={memory.image} alt={memory.title} loading="lazy" decoding="async" />
          ) : (
            <PhotoPlaceholder index={index} />
          )}
          <span className="polaroid__sheen" />
        </div>
        {showMeta && (
          <div className="polaroid__meta">
            <span className="polaroid__caption hand">{memory.caption || memory.title}</span>
            <span className="polaroid__date">{memory.date}</span>
          </div>
        )}
      </div>
      <span className="polaroid__tape" aria-hidden="true" />
    </div>
  )
}
