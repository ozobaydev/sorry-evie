import './scenes.css'

/**
 * The healing landscape. Everything reacts to the CSS variable `--dawn`
 * (0 = night, 1 = full sunrise) which the parent animates on scroll — so the
 * whole night-to-morning transition costs zero React re-renders.
 */
export default function SunriseValley({ id = 'dawn', showPath = true }) {
  const u = (n) => `${id}-${n}`
  return (
    <div className="scene scene--dawn" aria-hidden="true">
      <svg className="scene__svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={u('night')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050a1a" />
            <stop offset="55%" stopColor="#151a38" />
            <stop offset="100%" stopColor="#3a2b46" />
          </linearGradient>
          <linearGradient id={u('morning')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b3f6b" />
            <stop offset="34%" stopColor="#8a6f92" />
            <stop offset="62%" stopColor="#dc9d84" />
            <stop offset="82%" stopColor="#f4c78d" />
            <stop offset="100%" stopColor="#ffe6b8" />
          </linearGradient>
          <radialGradient id={u('sun')}>
            <stop offset="0%" stopColor="#fff8e6" />
            <stop offset="28%" stopColor="#ffdf9e" stopOpacity="0.92" />
            <stop offset="62%" stopColor="#ffb072" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#ff9a5c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={u('ridge1')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b5a7a" />
            <stop offset="100%" stopColor="#41355a" />
          </linearGradient>
          <linearGradient id={u('ridge2')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#463a5c" />
            <stop offset="100%" stopColor="#241d3a" />
          </linearGradient>
          <linearGradient id={u('meadow')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b4d55" />
            <stop offset="22%" stopColor="#3d3049" />
            <stop offset="100%" stopColor="#120e1e" />
          </linearGradient>
          <linearGradient id={u('path')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6dcb2" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffeccb" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* two skies, cross-faded by --dawn */}
        <rect width="1440" height="900" fill={`url(#${u('night')})`} />
        <rect className="dawn-fade" width="1440" height="900" fill={`url(#${u('morning')})`} />

        {/* sun climbs as --dawn grows */}
        <g className="dawn-sun">
          <circle cx="720" cy="560" r="300" fill={`url(#${u('sun')})`} />
          <circle cx="720" cy="560" r="62" fill="#fff6df" opacity="0.96" />
        </g>

        {/* ridges */}
        <path
          fill={`url(#${u('ridge1')})`}
          opacity="0.95"
          d="M0 566 L150 470 L268 528 L392 424 L512 512 L636 442 L742 506 L864 430 L988 514 L1108 452 L1238 528 L1348 468 L1440 512 L1440 620 L0 620 Z"
        />
        <path
          fill={`url(#${u('ridge2')})`}
          d="M0 620 L120 566 L246 606 L360 552 L492 604 L604 566 L730 616 L858 560 L980 606 L1110 566 L1240 612 L1352 574 L1440 606 L1440 700 L0 700 Z"
        />

        {/* meadow */}
        <path fill={`url(#${u('meadow')})`} d="M0 686 C260 660 520 706 720 692 C960 676 1200 712 1440 682 L1440 900 L0 900 Z" />

        {/* winding path to the horizon */}
        {showPath && (
          <>
            <path
              className="dawn-path"
              d="M690 690 C700 760 620 792 500 826 C380 860 300 878 250 900"
              stroke={`url(#${u('path')})`}
              strokeWidth="34"
              fill="none"
              strokeLinecap="round"
            />
            <path
              className="dawn-path dawn-path--line"
              d="M690 690 C700 760 620 792 500 826 C380 860 300 878 250 900"
              stroke="#fff3d8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 16"
              strokeLinecap="round"
              opacity="0.6"
            />
          </>
        )}

        {/* mist sitting in the valley */}
        <ellipse className="dawn-mist" cx="720" cy="676" rx="900" ry="34" fill="#ffd9b0" />
        <ellipse className="dawn-mist dawn-mist--soft" cx="460" cy="704" rx="620" ry="22" fill="#ffe4c4" />

        {/* meadow flowers — they bloom in as the sun rises */}
        <g className="dawn-blooms">
          {Array.from({ length: 30 }, (_, i) => {
            const x = ((i * 227) % 1420) + 12
            const y = 712 + ((i * 83) % 176)
            const depth = (y - 712) / 176 // nearer the bottom = nearer the camera
            const s = 0.42 + depth * 0.75
            const hue = i % 3
            const fill = hue === 0 ? '#e6c2c4' : hue === 1 ? '#d9b57f' : '#c08b9a'
            return (
              <g
                key={i}
                style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${(i % 9) * 0.22}s` }}
                className="dawn-bloom"
              >
                <line x1={x} y1={y} x2={x} y2={y + 16 * s} stroke="#241f26" strokeWidth={1.1} opacity="0.55" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    cx={x}
                    cy={y - 3.4 * s}
                    rx={1.7 * s}
                    ry={3.4 * s}
                    fill={fill}
                    opacity="0.8"
                    transform={`rotate(${a} ${x} ${y})`}
                  />
                ))}
                <circle cx={x} cy={y} r={1.1 * s} fill="#fff3d8" opacity="0.85" />
              </g>
            )
          })}
        </g>

        {/* grass silhouettes */}
        <g stroke="#0d0a16" strokeWidth="2.4" opacity="0.55" fill="none" strokeLinecap="round">
          {Array.from({ length: 46 }, (_, i) => {
            const x = i * 32 + ((i * 17) % 18)
            const h = 22 + ((i * 41) % 40)
            return <path key={i} d={`M${x} 900 C${x + 5} ${900 - h * 0.6} ${x - 6} ${900 - h * 0.8} ${x + 3} ${900 - h}`} />
          })}
        </g>
      </svg>

      <div className="scene__grade scene__grade--dawn" />
    </div>
  )
}
