import { useRef, useState } from 'react'
import { Crosshair, Image as ImageIcon, Trash2, Upload } from 'lucide-react'
import Icon from '../components/ui/Icon'
import { ICON_CHOICES } from './schema'
import { fileToImage } from './image'

/**
 * One editable value. There are no explanatory labels by design — focusing an
 * input flies the live preview to the exact element it controls and pulses it,
 * so you see what you are changing instead of reading about it.
 */
export default function Field({ config, value, onChange, onAim, placeholder, autoFocusKey, registerRef }) {
  const { type } = config
  const common = {
    onFocus: onAim,
    onClick: onAim,
    placeholder: placeholder || '',
    ref: registerRef,
    'data-aim': autoFocusKey,
  }

  if (type === 'image') return <ImageField value={value} onChange={onChange} onAim={onAim} registerRef={registerRef} autoFocusKey={autoFocusKey} />

  if (type === 'icon') {
    return (
      <div className="f f--icons" data-aim={autoFocusKey}>
        {ICON_CHOICES.map((name) => (
          <button
            key={name}
            type="button"
            className={`f__iconbtn ${value === name ? 'is-on' : ''}`}
            onClick={() => {
              onChange(name)
              onAim()
            }}
            aria-label={name}
            aria-pressed={value === name}
          >
            <Icon name={name} size={15} />
          </button>
        ))}
      </div>
    )
  }

  if (type === 'textarea') {
    return (
      <div className="f">
        <textarea
          className="f__input f__input--area"
          rows={4}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          {...common}
        />
        <AimButton onAim={onAim} />
      </div>
    )
  }

  if (type === 'lines') {
    const text = Array.isArray(value) ? value.join('\n') : String(value ?? '')
    return (
      <div className="f">
        <textarea
          className={`f__input f__input--area ${config.script ? 'f__input--script' : ''}`}
          rows={Math.min(8, Math.max(2, text.split('\n').length))}
          value={text}
          onChange={(e) => onChange(e.target.value.split('\n'))}
          {...common}
        />
        <AimButton onAim={onAim} />
        <span className="f__hint">one line each</span>
      </div>
    )
  }

  return (
    <div className="f">
      <input
        className={`f__input ${config.big ? 'f__input--big' : ''} ${config.script ? 'f__input--script' : ''}`}
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        {...common}
      />
      <AimButton onAim={onAim} />
    </div>
  )
}

function AimButton({ onAim }) {
  return (
    <button type="button" className="f__aim" onClick={onAim} title="Show me where this appears">
      <Crosshair size={13} strokeWidth={1.6} />
    </button>
  )
}

function ImageField({ value, onChange, onAim, registerRef, autoFocusKey }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const dataUrl = await fileToImage(file)
      onChange(dataUrl)
      onAim()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="f f--image" data-aim={autoFocusKey}>
      <div
        className={`imgdrop ${busy ? 'is-busy' : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          pick(e.dataTransfer.files?.[0])
        }}
      >
        <div className="imgdrop__preview">
          {value ? <img src={value} alt="" /> : <ImageIcon size={20} strokeWidth={1.3} />}
        </div>

        <div className="imgdrop__actions">
          <button type="button" className="minibtn" onClick={() => input.current?.click()} disabled={busy}>
            <Upload size={13} strokeWidth={1.6} />
            {busy ? 'Working…' : value ? 'Replace' : 'Upload'}
          </button>
          {value ? (
            <button type="button" className="minibtn minibtn--ghost" onClick={() => onChange('')}>
              <Trash2 size={13} strokeWidth={1.6} />
              Remove
            </button>
          ) : null}
          <button type="button" className="minibtn minibtn--ghost" onClick={onAim}>
            <Crosshair size={13} strokeWidth={1.6} />
            Locate
          </button>
        </div>

        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            pick(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>

      <input
        className="f__input f__input--url"
        type="text"
        value={value && value.startsWith('data:') ? '' : value || ''}
        placeholder={value && value.startsWith('data:') ? 'uploaded photo' : '/images/your-photo.jpg'}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onAim}
        ref={registerRef}
      />
      {error ? <span className="f__error">{error}</span> : null}
    </div>
  )
}
