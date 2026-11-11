import defaultData from '../config/siteData'

export const STORAGE_KEY = 'one-moment:site-data'
export const PREVIEW_CHANNEL = 'one-moment:preview'

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Deep-merge saved overrides on top of the defaults from siteData.js. */
export function merge(base, patch) {
  if (patch === undefined || patch === null) return base
  if (Array.isArray(base) || Array.isArray(patch)) return patch
  if (!isObject(base) || !isObject(patch)) return patch
  const out = { ...base }
  for (const key of Object.keys(patch)) out[key] = merge(base[key], patch[key])
  return out
}

/** Read one value out of a nested object using an "a.b.0.c" path. */
export function getPath(obj, path) {
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc === undefined || acc === null ? undefined : acc[key]), obj)
}

/** Immutably write one value into a nested object using an "a.b.0.c" path. */
export function setPath(obj, path, value) {
  const keys = String(path).split('.')
  const clone = Array.isArray(obj) ? [...obj] : { ...obj }
  let cursor = clone
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const next = cursor[key]
    cursor[key] = Array.isArray(next) ? [...next] : isObject(next) ? { ...next } : /^\d+$/.test(keys[i + 1]) ? [] : {}
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return clone
}

export function loadOverrides() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveOverrides(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return { ok: true }
  } catch (error) {
    return { ok: false, error }
  }
}

export function clearOverrides() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function loadSiteData() {
  return merge(defaultData, loadOverrides())
}

export { defaultData }
