import { createContext, useContext, useEffect, useState } from 'react'
import { defaultData, loadSiteData, merge, PREVIEW_CHANNEL } from '../lib/store'

const SiteDataContext = createContext(defaultData)

/**
 * Provides the merged site data to every component.
 * When the page runs inside the /admin live preview it also accepts draft
 * updates, "show me this field" requests, and point-and-click field picking.
 */
export function SiteDataProvider({ children }) {
  const [data, setData] = useState(() => (typeof window === 'undefined' ? defaultData : loadSiteData()))
  const [picking, setPicking] = useState(false)

  useEffect(() => {
    const onMessage = (event) => {
      const msg = event.data
      if (!msg || msg.channel !== PREVIEW_CHANNEL) return
      if (msg.type === 'data') setData(merge(defaultData, msg.payload || {}))
      if (msg.type === 'highlight') highlight(msg.field)
      if (msg.type === 'pick') setPicking(Boolean(msg.on))
    }
    window.addEventListener('message', onMessage)
    if (window.parent !== window) {
      window.parent.postMessage({ channel: PREVIEW_CHANNEL, type: 'ready' }, '*')
    }
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // point & edit: clicking any labelled element tells the editor to open it
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-picking', picking)
    if (!picking) return undefined

    const onClick = (e) => {
      const el = e.target.closest?.('[data-field]')
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      window.parent.postMessage(
        { channel: PREVIEW_CHANNEL, type: 'picked', field: el.getAttribute('data-field') },
        '*'
      )
    }
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      root.classList.remove('is-picking')
    }
  }, [picking])

  // keep other open tabs in sync
  useEffect(() => {
    const onStorage = () => setData(loadSiteData())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
}

let highlightTimer = null
function highlight(field) {
  if (!field) return
  const el = document.querySelector(`[data-field="${cssEscape(field)}"]`)
  if (!el) return
  document.querySelectorAll('.is-field-highlight').forEach((n) => n.classList.remove('is-field-highlight'))
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.add('is-field-highlight')
  window.clearTimeout(highlightTimer)
  highlightTimer = window.setTimeout(() => el.classList.remove('is-field-highlight'), 2600)
}

function cssEscape(value) {
  return window.CSS && CSS.escape ? CSS.escape(value) : String(value).replace(/["\\]/g, '\\$&')
}

export function useSiteData() {
  return useContext(SiteDataContext)
}

export default SiteDataContext
