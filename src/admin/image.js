/**
 * Turn a picked file into a browser-friendly data URL.
 * Images are resized and re-encoded so a 6 MB phone photo becomes ~150 KB and
 * still fits comfortably in localStorage.
 */
export function fileToImage(file, { maxSize = 1400, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('That file is not an image.'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not decode that image.'))
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))

        const draw = (width, height) => {
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          ctx.drawImage(img, 0, 0, width, height)
          return { canvas, ctx }
        }

        const { canvas, ctx } = draw(w, h)

        // PNG is only worth keeping when the image is genuinely transparent —
        // otherwise a screenshot would balloon past the storage budget.
        const type = file.type === 'image/png' && hasAlpha(ctx, w, h) ? 'image/png' : 'image/jpeg'
        let out = canvas.toDataURL(type, quality)

        // last resort for very large images: one smaller, harder pass
        if (out.length > 1_400_000) {
          const s = Math.min(1, 900 / Math.max(w, h))
          const small = draw(Math.round(w * s), Math.round(h * s))
          out = small.canvas.toDataURL('image/jpeg', 0.72)
        }

        resolve(out)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

/** Sample the alpha channel on a grid — cheap, and good enough to decide. */
function hasAlpha(ctx, w, h) {
  try {
    const data = ctx.getImageData(0, 0, w, h).data
    const step = Math.max(4, Math.floor((data.length / 4 / 4000)) * 4)
    for (let i = 3; i < data.length; i += step) {
      if (data[i] < 250) return true
    }
    return false
  } catch {
    return true // tainted canvas: play it safe
  }
}

export function approxBytes(str) {
  return new Blob([str]).size
}

export function prettyBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}
