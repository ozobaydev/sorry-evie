/**
 * A small illustrated "photograph" used whenever the customer has not
 * supplied their own image yet. Six hand-tuned scenes, picked by index, so a
 * fresh install already looks like a finished product.
 */
const SCENES = [
  { sky: ['#20264f', '#7b4a67', '#e0956f'], sun: '#ffd9a1', land: '#171633', kind: 'mountains' },
  { sky: ['#0d1330', '#2b2350', '#6a4a70'], sun: '#f6e7c6', land: '#0b0d20', kind: 'city' },
  { sky: ['#3a2a4a', '#a2637a', '#f0b088'], sun: '#fff0cd', land: '#241a30', kind: 'sea' },
  { sky: ['#122b3f', '#3d6a72', '#c9d3a4'], sun: '#fbf3cd', land: '#12251f', kind: 'forest' },
  { sky: ['#241733', '#5b3350', '#c97a6d'], sun: '#ffdca8', land: '#1b1226', kind: 'mountains' },
  { sky: ['#0b1a33', '#33436e', '#d3a07f'], sun: '#ffeccc', land: '#0a1122', kind: 'sea' },
]

export default function PhotoPlaceholder({ index = 0, ratio = '4 / 5', className = '' }) {
  const s = SCENES[index % SCENES.length]
  const uid = `ph${index}`

  return (
    <svg
      className={className}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ aspectRatio: ratio, width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="Illustrated memory photograph"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.sky[0]} />
          <stop offset="52%" stopColor={s.sky[1]} />
          <stop offset="100%" stopColor={s.sky[2]} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor={s.sun} stopOpacity="0.95" />
          <stop offset="60%" stopColor={s.sun} stopOpacity="0.16" />
          <stop offset="100%" stopColor={s.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.sky[2]} stopOpacity="0.65" />
          <stop offset="100%" stopColor={s.land} />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <circle cx="240" cy="300" r="150" fill={`url(#${uid}-glow)`} />
      <circle cx="240" cy="300" r="30" fill={s.sun} opacity="0.85" />

      {/* stars for the darker scenes */}
      {s.kind !== 'forest' &&
        Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 97) % 380) + 10}
            cy={((i * 53) % 190) + 12}
            r={((i * 7) % 3) * 0.4 + 0.8}
            fill="#fff"
            opacity={0.25 + ((i * 11) % 5) / 12}
          />
        ))}

      {s.kind === 'mountains' && (
        <>
          <path d="M0 340 L70 262 L128 310 L196 232 L262 306 L330 254 L400 320 L400 500 L0 500 Z" fill={s.land} opacity="0.82" />
          <path d="M0 380 L84 328 L164 372 L246 318 L330 372 L400 340 L400 500 L0 500 Z" fill={s.land} />
        </>
      )}

      {s.kind === 'city' && (
        <>
          <g fill={s.land} opacity="0.9">
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={i * 34} y={330 - ((i * 61) % 110)} width={26} height={300} />
            ))}
          </g>
          <g fill={s.sun} opacity="0.5">
            {Array.from({ length: 34 }, (_, i) => (
              <rect key={i} x={((i * 71) % 380) + 6} y={340 + ((i * 43) % 120)} width={3} height={4} />
            ))}
          </g>
        </>
      )}

      {s.kind === 'sea' && (
        <>
          <rect y="330" width="400" height="170" fill={`url(#${uid}-water)`} />
          <g opacity="0.5" fill={s.sun}>
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse key={i} cx={240} cy={344 + i * 18} rx={30 + i * 5} ry={1.6} opacity={0.6 - i * 0.06} />
            ))}
          </g>
        </>
      )}

      {s.kind === 'forest' && (
        <g fill={s.land}>
          <path d="M0 500 L0 300 C40 320 56 360 66 400 C76 440 96 476 128 500 Z" />
          <path d="M400 500 L400 280 C356 306 336 352 326 396 C314 442 292 478 258 500 Z" />
          <path d="M0 420 C90 396 160 430 220 412 C290 392 350 424 400 408 L400 500 L0 500 Z" opacity="0.9" />
        </g>
      )}

      {/* two figures, always — this is a memory of two people */}
      <g fill="#000" opacity="0.78" transform="translate(0,-6)">
        <ellipse cx="168" cy="446" rx="26" ry="6" opacity="0.35" />
        <ellipse cx="214" cy="446" rx="26" ry="6" opacity="0.35" />
        <path d="M168 446 c-9 0 -13 -18 -12 -32 1 -14 4 -26 12 -30 -6 -4 -8 -11 -8 -17 0 -9 8 -15 16 -15 s16 6 16 15 c0 6 -2 13 -8 17 8 4 11 16 12 30 1 14 -3 32 -12 32 z" />
        <path d="M214 446 c-9 0 -13 -18 -12 -32 1 -14 4 -26 12 -30 -6 -4 -8 -11 -8 -17 0 -9 8 -15 16 -15 s16 6 16 15 c0 6 -2 13 -8 17 8 4 11 16 12 30 1 14 -3 32 -12 32 z" />
      </g>

      {/* vignette */}
      <defs>
        <radialGradient id={`${uid}-vig`}>
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${uid}-vig)`} />
    </svg>
  )
}
