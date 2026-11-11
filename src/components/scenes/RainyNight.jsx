import './scenes.css'

/** Chapter 01 backdrop: a rainy window over a blurred, sleeping city. */
export default function RainyNight({ id = 'rain' }) {
  const u = (n) => `${id}-${n}`
  return (
    <div className="scene scene--rain" aria-hidden="true">
      <svg className="scene__svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={u('sky')} x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#05070f" />
            <stop offset="45%" stopColor="#0b1024" />
            <stop offset="100%" stopColor="#161a33" />
          </linearGradient>
          <filter id={u('blur')} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id={u('blurBig')} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect width="1440" height="900" fill={`url(#${u('sky')})`} />

        {/* distant city, out of focus */}
        <g filter={`url(#${u('blur')})`} opacity="0.75">
          {Array.from({ length: 26 }, (_, i) => {
            const w = 34 + ((i * 53) % 62)
            const h = 130 + ((i * 97) % 300)
            const x = i * 58 - 20
            return <rect key={i} x={x} y={640 - h} width={w} height={h} fill="#0c1226" />
          })}
        </g>

        {/* window lights bokeh */}
        <g filter={`url(#${u('blurBig')})`}>
          {Array.from({ length: 40 }, (_, i) => {
            const x = ((i * 173) % 1400) + 20
            const y = 360 + ((i * 91) % 260)
            const r = 7 + ((i * 29) % 16)
            const warm = i % 3 !== 0
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill={warm ? '#ffc27a' : '#8fb6ff'}
                opacity={0.18 + ((i * 7) % 6) / 16}
              />
            )
          })}
        </g>

        {/* wet ground */}
        <rect y="640" width="1440" height="260" fill="#070b18" />
        <g opacity="0.34" filter={`url(#${u('blur')})`}>
          {Array.from({ length: 22 }, (_, i) => (
            <ellipse key={i} cx={((i * 211) % 1400) + 20} cy={700 + ((i * 47) % 170)} rx={30} ry={3} fill="#ffb877" />
          ))}
        </g>

        {/* window frame in the foreground */}
        <g fill="none" stroke="#05060c" strokeWidth="26" opacity="0.96">
          <line x1="720" y1="-20" x2="720" y2="920" />
          <line x1="-20" y1="430" x2="1460" y2="430" />
        </g>
        <rect x="-20" y="-20" width="1480" height="940" fill="none" stroke="#05060c" strokeWidth="54" />

        {/* desk edge + cup silhouette */}
        <path d="M0 900 L0 806 L520 790 L520 900 Z" fill="#05060c" />
        <g fill="#0a0912">
          <path d="M188 790 h96 a10 10 0 0 1 10 10 v34 a48 48 0 0 1 -48 48 h-20 a48 48 0 0 1 -48 -48 v-34 a10 10 0 0 1 10 -10 z" />
          <path d="M296 800 a34 26 0 0 1 0 52" fill="none" stroke="#0a0912" strokeWidth="9" />
        </g>
        {/* steam */}
        <g className="scene__steam" stroke="#cbb9c9" strokeWidth="3" fill="none" opacity="0.22" strokeLinecap="round">
          <path d="M214 780 c-14 -26 12 -40 -2 -66" />
          <path d="M244 776 c-14 -30 14 -44 0 -72" style={{ animationDelay: '1.6s' }} />
        </g>
      </svg>

      <div className="rain" />
      <div className="droplets" />
      <div className="scene__grade scene__grade--rain" />
    </div>
  )
}
