/**
 * Parametric heart, fitted to the constellation viewBox.
 *
 * The curve's extents are measured rather than assumed — the two lobes peak
 * near y = +11.95, which is easy to guess wrong and lops the top off the heart.
 * A single uniform scale keeps the shape honest, and the padding leaves room
 * for the star glows and the stroke to spill past the outline.
 */
export const VIEW = { w: 600, h: 560 }

const PAD = 42

/** The raw curve, before it is fitted to the viewBox. */
function raw(t) {
  return {
    x: 16 * Math.sin(t) ** 3,
    y: 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t),
  }
}

// measure once, at module load
const EXT = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const steps = 2000
  for (let i = 0; i <= steps; i += 1) {
    const { x, y } = raw((i / steps) * Math.PI * 2)
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  return { minX, maxX, minY, maxY }
})()

const SCALE = Math.min((VIEW.w - PAD * 2) / (EXT.maxX - EXT.minX), (VIEW.h - PAD * 2) / (EXT.maxY - EXT.minY))
const MID_X = (EXT.minX + EXT.maxX) / 2
const MID_Y = (EXT.minY + EXT.maxY) / 2

export function heartPoint(t) {
  const { x, y } = raw(t)
  return {
    x: VIEW.w / 2 + (x - MID_X) * SCALE,
    y: VIEW.h / 2 - (y - MID_Y) * SCALE,
  }
}

/** t values that place `n` stars evenly around the heart, starting at the top dip. */
export function heartTs(n) {
  return Array.from({ length: n }, (_, i) => Math.PI / 2 + (i * 2 * Math.PI) / n)
}

/** An SVG path following the heart between two t values. */
export function heartSegment(t0, t1, steps = 24) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = t0 + ((t1 - t0) * i) / steps
    const p = heartPoint(t)
    pts.push(`${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  }
  return `M${pts.join(' L')}`
}

/** The complete outline, used for the final glow. */
export function heartOutline(steps = 220) {
  return `${heartSegment(0, Math.PI * 2, steps)} Z`
}
