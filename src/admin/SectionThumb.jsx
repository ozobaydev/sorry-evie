/** Tiny wireframes so each group is recognised by shape, not by reading. */
const THUMBS = {
  basics: (
    <>
      <rect x="4" y="6" width="18" height="3" rx="1.5" fill="#e8c5c5" />
      <rect x="4" y="13" width="30" height="3" rx="1.5" fill="#f4e8d7" opacity="0.6" />
      <rect x="4" y="20" width="24" height="3" rx="1.5" fill="#f4e8d7" opacity="0.35" />
    </>
  ),
  hero: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#0d1430" />
      <circle cx="38" cy="7" r="3.4" fill="#f6e8cd" />
      <path d="M0 22 L10 15 L18 20 L28 12 L38 20 L48 15 L48 32 L0 32 Z" fill="#2b2450" />
      <rect x="5" y="9" width="16" height="2.6" rx="1.3" fill="#f4e8d7" />
      <rect x="5" y="14" width="10" height="2" rx="1" fill="#e8c5c5" opacity="0.8" />
    </>
  ),
  paper: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#f4e8d7" />
      <rect x="5" y="6" width="16" height="20" rx="1" fill="#fff" opacity="0.75" transform="rotate(-4 13 16)" />
      <rect x="26" y="8" width="17" height="2.4" rx="1.2" fill="#8a6a58" />
      <rect x="26" y="14" width="13" height="2" rx="1" fill="#b08b74" />
      <rect x="26" y="19" width="15" height="2" rx="1" fill="#c58f9d" />
    </>
  ),
  rain: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#0b1024" />
      <g stroke="#7d93c4" strokeWidth="1" opacity="0.55">
        <line x1="6" y1="3" x2="3" y2="10" />
        <line x1="16" y1="5" x2="13" y2="12" />
        <line x1="27" y1="2" x2="24" y2="9" />
        <line x1="38" y1="6" x2="35" y2="13" />
      </g>
      <rect x="4" y="18" width="18" height="2.6" rx="1.3" fill="#f4e8d7" />
      <rect x="4" y="24" width="12" height="2" rx="1" fill="#c58f9d" />
    </>
  ),
  cards: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#101b35" />
      {[3, 18, 33].map((x) => (
        <rect key={x} x={x} y="7" width="12" height="9" rx="4" fill="#ffffff" opacity="0.16" />
      ))}
      {[10, 26].map((x) => (
        <rect key={x} x={x} y="19" width="12" height="9" rx="4" fill="#ffffff" opacity="0.16" />
      ))}
    </>
  ),
  photos: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#f2e2d2" />
      {[
        [4, 6, -6],
        [18, 4, 4],
        [32, 7, -3],
      ].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x + 6} ${y + 9})`}>
          <rect x={x} y={y} width="12" height="16" rx="1" fill="#fff" />
          <rect x={x + 1.4} y={y + 1.4} width="9.2" height="10" fill="#8e7aa0" />
        </g>
      ))}
    </>
  ),
  stars: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#0a1128" />
      <path
        d="M24 25 C14 18 12 12 16 9 C19 6.6 23 8.4 24 11 C25 8.4 29 6.6 32 9 C36 12 34 18 24 25 Z"
        fill="none"
        stroke="#f6e3c4"
        strokeWidth="0.8"
        opacity="0.7"
      />
      {[
        [24, 25],
        [16, 9],
        [32, 9],
        [24, 11],
        [14, 16],
        [34, 16],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#fff6df" />
      ))}
    </>
  ),
  promise: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#ecd2cd" />
      {[3, 15, 27, 39].map((x) => (
        <g key={x}>
          <rect x={x - 1} y="8" width="9" height="17" rx="2" fill="#fff" opacity="0.85" />
          <circle cx={x + 3.5} cy="13" r="2.6" fill="none" stroke="#a96c7d" strokeWidth="0.8" />
          <rect x={x + 0.6} y="18" width="6.8" height="1.4" rx="0.7" fill="#c58f9d" />
        </g>
      ))}
    </>
  ),
  sunrise: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#f0b98a" />
      <rect x="0" y="0" width="48" height="14" fill="#7e6b96" />
      <circle cx="24" cy="16" r="6" fill="#fff3d6" />
      <path d="M0 20 L12 13 L22 19 L32 12 L48 20 L48 32 L0 32 Z" fill="#5a4a6e" />
      <path d="M26 22 C27 26 20 28 14 32" stroke="#ffeccb" strokeWidth="2" fill="none" />
    </>
  ),
  question: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#0f1430" />
      <rect x="6" y="13" width="17" height="8" rx="4" fill="#c76d8b" />
      <rect x="27" y="13" width="15" height="8" rx="4" fill="none" stroke="#f4e8d7" strokeWidth="0.8" opacity="0.6" />
      <rect x="12" y="6" width="24" height="2.4" rx="1.2" fill="#f4e8d7" opacity="0.8" />
    </>
  ),
  celebrate: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#141026" />
      <circle cx="24" cy="16" r="11" fill="#ffcf9a" opacity="0.28" />
      <path
        d="M24 23 C17 18 16 13 19 11 C21 9.6 23.4 10.8 24 12.6 C24.6 10.8 27 9.6 29 11 C32 13 31 18 24 23 Z"
        fill="none"
        stroke="#ffe6b8"
        strokeWidth="0.9"
      />
      {[
        [8, 24],
        [40, 22],
        [14, 8],
        [36, 7],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#ffd79a" />
      ))}
    </>
  ),
  footer: (
    <>
      <rect x="0" y="0" width="48" height="32" fill="#101b35" />
      <rect x="4" y="12" width="10" height="3" rx="1.5" fill="#e8c5c5" />
      <rect x="19" y="13" width="14" height="1.6" rx="0.8" fill="#f4e8d7" opacity="0.45" />
      {[36, 41].map((x) => (
        <circle key={x} cx={x} cy="14" r="2.4" fill="none" stroke="#f4e8d7" strokeWidth="0.7" opacity="0.6" />
      ))}
      <rect x="4" y="22" width="40" height="0.8" fill="#f4e8d7" opacity="0.2" />
    </>
  ),
}

export default function SectionThumb({ name }) {
  return (
    <svg className="thumb" viewBox="0 0 48 32" aria-hidden="true">
      <rect x="0" y="0" width="48" height="32" fill="#1a1730" />
      {THUMBS[name] || THUMBS.basics}
    </svg>
  )
}
