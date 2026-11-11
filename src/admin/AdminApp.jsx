import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Check,
  Download,
  ExternalLink,
  Monitor,
  MousePointerClick,
  Plus,
  RotateCcw,
  Smartphone,
  Trash2,
  Upload,
} from 'lucide-react'
import GROUPS from './schema'
import Field from './Field'
import SectionThumb from './SectionThumb'
import { approxBytes, prettyBytes } from './image'
import { clearOverrides, defaultData, getPath, PREVIEW_CHANNEL, saveOverrides, setPath, loadSiteData } from '../lib/store'
import './admin.css'

const PREVIEW_SRC = `${import.meta.env.BASE_URL || '/'}?preview=1`

export default function AdminApp() {
  const [draft, setDraft] = useState(() => loadSiteData())
  const [open, setOpen] = useState('basics')
  const [device, setDevice] = useState('desktop')
  const [picking, setPicking] = useState(false)
  const [saved, setSaved] = useState('idle')
  const [error, setError] = useState('')

  const frame = useRef(null)
  const inputs = useRef(new Map())
  const fileIn = useRef(null)

  const post = useCallback((msg) => {
    frame.current?.contentWindow?.postMessage({ channel: PREVIEW_CHANNEL, ...msg }, '*')
  }, [])

  /* ------------------------------------------------------------- messages */
  useEffect(() => {
    const onMessage = (event) => {
      const msg = event.data
      if (!msg || msg.channel !== PREVIEW_CHANNEL) return
      if (msg.type === 'ready') post({ type: 'data', payload: draft })
      if (msg.type === 'picked') selectField(msg.field)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  })

  /* --------------------------------------------------- push draft to frame */
  useEffect(() => {
    const t = window.setTimeout(() => post({ type: 'data', payload: draft }), 90)
    return () => window.clearTimeout(t)
  }, [draft, post])

  /* ------------------------------------------------------------ autosave */
  useEffect(() => {
    setSaved('saving')
    const t = window.setTimeout(() => {
      const result = saveOverrides(draft)
      if (result.ok) {
        setSaved('saved')
        setError('')
      } else {
        setSaved('error')
        setError('This browser ran out of storage — try smaller photos, or export your settings instead.')
      }
    }, 550)
    return () => window.clearTimeout(t)
  }, [draft])

  useEffect(() => {
    post({ type: 'pick', on: picking })
  }, [picking, post])

  /* --------------------------------------------------------------- edits */
  const update = useCallback((path, value) => {
    setDraft((d) => setPath(d, path, value))
  }, [])

  const aim = useCallback(
    (path) => {
      post({ type: 'highlight', field: path })
    },
    [post]
  )

  const groupOf = useCallback((field) => {
    return GROUPS.find((g) =>
      g.fields.some((f) => f.path === field || field.startsWith(`${f.path}.`))
    )
  }, [])

  const selectField = useCallback(
    (field) => {
      const group = groupOf(field)
      if (group) setOpen(group.id)
      window.setTimeout(() => {
        const el = inputs.current.get(field) || inputs.current.get(field.split('.').slice(0, 2).join('.'))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.focus({ preventScroll: true })
        }
      }, 120)
      aim(field)
    },
    [aim, groupOf]
  )

  const registerRef = useCallback(
    (path) => (el) => {
      if (el) inputs.current.set(path, el)
      else inputs.current.delete(path)
    },
    []
  )

  /* ------------------------------------------------------------- actions */
  const reset = () => {
    if (!window.confirm('Put every word and photo back to the original template?')) return
    clearOverrides()
    setDraft(defaultData)
  }

  const download = (name, text, mime) => {
    const url = URL.createObjectURL(new Blob([text], { type: mime }))
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const exportJson = () => download('site-content.json', JSON.stringify(draft, null, 2), 'application/json')

  const exportModule = () =>
    download(
      'siteData.js',
      `/* Generated from /admin — replace src/config/siteData.js with this file. */\n\nconst siteData = ${JSON.stringify(
        draft,
        null,
        2
      )}\n\nexport default siteData\n`,
      'text/javascript'
    )

  const importJson = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        setDraft(JSON.parse(reader.result))
        setError('')
      } catch {
        setError('That file was not valid JSON.')
      }
    }
    reader.readAsText(file)
  }

  const size = useMemo(() => approxBytes(JSON.stringify(draft)), [draft])

  return (
    <div className="admin">
      {/* ------------------------------------------------------------ top bar */}
      <header className="admin__bar">
        <div className="admin__brand">
          <span className="admin__dot" />
          <strong>Make it yours</strong>
          <span className="admin__sub">every change shows up on the right, live</span>
        </div>

        <div className="admin__tools">
          <span className={`admin__save admin__save--${saved}`}>
            {saved === 'saved' ? <Check size={13} strokeWidth={2} /> : null}
            {saved === 'saving' ? 'saving…' : saved === 'error' ? 'not saved' : 'saved'}
          </span>

          <button
            className={`tool ${picking ? 'is-on' : ''}`}
            onClick={() => setPicking((v) => !v)}
            title="Click any text or photo in the preview to jump to its field"
          >
            <MousePointerClick size={14} strokeWidth={1.6} />
            Point &amp; edit
          </button>

          <div className="seg">
            <button className={device === 'desktop' ? 'is-on' : ''} onClick={() => setDevice('desktop')} title="Desktop">
              <Monitor size={14} strokeWidth={1.6} />
            </button>
            <button className={device === 'mobile' ? 'is-on' : ''} onClick={() => setDevice('mobile')} title="Phone">
              <Smartphone size={14} strokeWidth={1.6} />
            </button>
          </div>

          <button className="tool" onClick={() => fileIn.current?.click()} title="Load a saved file">
            <Upload size={14} strokeWidth={1.6} />
          </button>
          <input
            ref={fileIn}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              importJson(e.target.files?.[0])
              e.target.value = ''
            }}
          />

          <button className="tool" onClick={exportJson} title="Save your content to a file">
            <Download size={14} strokeWidth={1.6} />
          </button>

          <button className="tool" onClick={exportModule} title="Download siteData.js for the source code">
            siteData.js
          </button>

          <button className="tool tool--warn" onClick={reset} title="Back to the original template">
            <RotateCcw size={14} strokeWidth={1.6} />
          </button>

          <a className="tool" href={import.meta.env.BASE_URL || '/'} title="Open the website">
            <ExternalLink size={14} strokeWidth={1.6} />
          </a>
        </div>
      </header>

      {error ? <p className="admin__error">{error}</p> : null}

      <div className="admin__body">
        {/* --------------------------------------------------------- editor */}
        <aside className="panel">
          {GROUPS.map((group) => {
            const isOpen = open === group.id
            return (
              <section key={group.id} className={`group ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="group__head"
                  onClick={() => {
                    setOpen(isOpen ? '' : group.id)
                    if (!isOpen && group.jump) post({ type: 'highlight', field: group.fields[0].path })
                  }}
                  aria-expanded={isOpen}
                >
                  <SectionThumb name={group.thumb} />
                  <span className="group__name">{group.name}</span>
                  <span className="group__chev" aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className="group__body">
                    {group.fields.map((f) =>
                      f.type === 'list' ? (
                        <ListEditor
                          key={f.path}
                          config={f}
                          items={getPath(draft, f.path) || []}
                          onChange={(next) => update(f.path, next)}
                          onAim={aim}
                          registerRef={registerRef}
                          basePath={f.path}
                        />
                      ) : (
                        <Field
                          key={f.path}
                          config={f}
                          value={getPath(draft, f.path)}
                          placeholder={asPlaceholder(getPath(defaultData, f.path))}
                          onChange={(v) => update(f.path, v)}
                          onAim={() => aim(f.path)}
                          autoFocusKey={f.path}
                          registerRef={registerRef(f.path)}
                        />
                      )
                    )}
                  </div>
                )}
              </section>
            )
          })}

          <p className="panel__foot">
            Saved in this browser ({prettyBytes(size)}). Use <strong>siteData.js</strong> to bake your version into the
            source code permanently.
          </p>
        </aside>

        {/* -------------------------------------------------------- preview */}
        <main className={`stage stage--${device}`}>
          <div className="stage__frame">
            <iframe ref={frame} src={PREVIEW_SRC} title="Live preview of your website" />
            {picking ? <span className="stage__badge">click anything in the page</span> : null}
          </div>
        </main>
      </div>
    </div>
  )
}

function asPlaceholder(value) {
  if (Array.isArray(value)) return value.join('\n')
  return typeof value === 'string' ? value : ''
}

/* ----------------------------------------------------------- list editor */
function ListEditor({ config, items, onChange, onAim, registerRef, basePath }) {
  const [openItem, setOpenItem] = useState(0)

  const setItem = (i, key, value) => {
    const next = items.map((item, idx) => (idx === i ? { ...item, [key]: value } : item))
    onChange(next)
  }

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpenItem(j)
  }

  const add = () => {
    if (items.length >= (config.max ?? 12)) return
    onChange([...items, { ...config.blank }])
    setOpenItem(items.length)
  }

  const remove = (i) => {
    if (items.length <= (config.min ?? 0)) return
    onChange(items.filter((_, idx) => idx !== i))
    setOpenItem(0)
  }

  return (
    <div className="list">
      {items.map((item, i) => {
        const isOpen = openItem === i
        return (
          <div key={i} className={`list__item ${isOpen ? 'is-open' : ''}`}>
            <div className="list__head">
              <button className="list__toggle" onClick={() => setOpenItem(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span className="list__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="list__label">{config.itemLabel(item) || '—'}</span>
              </button>
              <span className="list__ops">
                <button onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                  <ArrowUp size={12} strokeWidth={1.8} />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down">
                  <ArrowDown size={12} strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => remove(i)}
                  disabled={items.length <= (config.min ?? 0)}
                  title="Remove"
                  className="is-danger"
                >
                  <Trash2 size={12} strokeWidth={1.8} />
                </button>
              </span>
            </div>

            {isOpen && (
              <div className="list__body">
                {config.itemFields.map((f) => (
                  <Field
                    key={f.key}
                    config={f}
                    value={item[f.key]}
                    onChange={(v) => setItem(i, f.key, v)}
                    onAim={() => onAim(`${basePath}.${i}`)}
                    autoFocusKey={`${basePath}.${i}.${f.key}`}
                    registerRef={registerRef(`${basePath}.${i}.${f.key}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {items.length < (config.max ?? 12) && (
        <button className="list__add" onClick={add}>
          <Plus size={13} strokeWidth={1.8} />
          Add
        </button>
      )}
    </div>
  )
}
