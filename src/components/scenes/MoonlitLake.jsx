import useMediaQuery from '../../hooks/useMediaQuery'
import './scenes.css'

/**
 * Fully hand-built SVG scene: moonlit lake, mountains, drifting clouds,
 * town lights and hanging lanterns. No photograph required.
 *
 * On a portrait phone the sides get cropped hard, so the frame is anchored to
 * the right to keep the moon and the lanterns in shot.
 */
export default function MoonlitLake({ id = 'lake' }) {
  const u = (n) => `${id}-${n}`
  const narrow = useMediaQuery('(max-width: 820px)')
  const par = narrow ? 'xMaxYMid slice' : 'xMidYMid slice'

  return (
    <div className="scene scene--lake" aria-hidden="true">
      <svg className="scene__svg scene__svg--drift" viewBox="0 0 1440 900" preserveAspectRatio={par}>
        <defs>
          <linearGradient id={u('sky')} x1="0" y1="0" x2="0.15" y2="1">
            <stop offset="0%" stopColor="#020408" />
            <stop offset="26%" stopColor="#050a16" />
            <stop offset="48%" stopColor="#0c1128" />
            <stop offset="68%" stopColor="#1a1733" />
            <stop offset="84%" stopColor="#2e2040" />
            <stop offset="94%" stopColor="#48283f" />
            <stop offset="100%" stopColor="#5e3442" />
          </linearGradient>

          <linearGradient id={u('water')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22182b" />
            <stop offset="8%" stopColor="#12111f" />
            <stop offset="34%" stopColor="#0a0f20" />
            <stop offset="100%" stopColor="#02040a" />
          </linearGradient>

          <linearGradient id={u('mtnFar')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b2748" />
            <stop offset="100%" stopColor="#131228" />
          </linearGradient>

          <linearGradient id={u('mtnMid')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16142c" />
            <stop offset="100%" stopColor="#070914" />
          </linearGradient>

          <linearGradient id={u('mtnNear')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a16" />
            <stop offset="100%" stopColor="#03040a" />
          </linearGradient>

          <radialGradient id={u('moonGlow')}>
            <stop offset="0%" stopColor="#fff6e2" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#ffe6c0" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={u('horizonGlow')}>
            <stop offset="0%" stopColor="#ff9f6c" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#c76a72" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ff9d6e" stopOpacity="0" />
          </radialGradient>

          <filter id={u('soft')} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="26" />
          </filter>

          <filter id={u('softer')} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          <mask id={u('crescent')}>
            <rect width="1440" height="900" fill="#000" />
            <circle cx="1178" cy="128" r="46" fill="#fff" />
            <circle cx="1156" cy="114" r="42" fill="#000" />
          </mask>
        </defs>

        {/* sky */}
        <rect width="1440" height="900" fill={`url(#${u('sky')})`} />
        <ellipse cx="820" cy="524" rx="520" ry="112" fill={`url(#${u('horizonGlow')})`} />

        {/* moon */}
        <circle cx="1176" cy="122" r="150" fill={`url(#${u('moonGlow')})`} />
        <rect width="1440" height="900" fill="#fdf3df" mask={`url(#${u('crescent')})`} />

        {/* clouds */}
        <g filter={`url(#${u('soft')})`} opacity="0.78">
          <ellipse className="scene__cloud scene__cloud--a" cx="300" cy="170" rx="290" ry="52" fill="#2a2447" />
          <ellipse className="scene__cloud scene__cloud--b" cx="980" cy="112" rx="330" ry="44" fill="#241f3f" />
          <ellipse className="scene__cloud scene__cloud--c" cx="640" cy="268" rx="420" ry="46" fill="#33284b" />
          <ellipse className="scene__cloud scene__cloud--b" cx="1290" cy="235" rx="260" ry="38" fill="#3a2a4a" />
        </g>

        {/* mountains */}
        <path
          fill={`url(#${u('mtnFar')})`}
          d="M0 520 L120 424 L212 470 L330 372 L442 452 L560 394 L662 456 L782 388 L900 448 L1012 400 L1132 462 L1262 408 L1362 456 L1440 426 L1440 520 Z"
        />
        <path
          fill={`url(#${u('mtnMid')})`}
          d="M0 522 L92 478 L204 506 L302 452 L424 500 L522 466 L642 508 L764 458 L884 502 L982 468 L1104 512 L1232 466 L1344 506 L1440 476 L1440 522 Z"
        />
        {/* town lights along the far shore */}
        <g className="scene__town">
          {Array.from({ length: 44 }, (_, i) => {
            const x = 120 + i * 29.4 + ((i * 37) % 13)
            const y = 500 + ((i * 17) % 14)
            return <circle key={i} cx={x} cy={y} r={1.5 + ((i * 7) % 3) * 0.5} fill="#ffcf94" opacity={0.5 + ((i * 11) % 5) / 10} />
          })}
        </g>

        {/* nearest ridge, in front of the town */}
        <path
          fill={`url(#${u('mtnNear')})`}
          d="M0 524 L74 502 L168 518 L268 490 L372 516 L470 496 L580 520 L690 492 L806 518 L918 498 L1036 522 L1160 496 L1276 520 L1380 502 L1440 516 L1440 524 Z"
        />

        {/* water */}
        <rect y="520" width="1440" height="380" fill={`url(#${u('water')})`} />

        {/* moon reflection */}
        <g opacity="0.5" filter={`url(#${u('softer')})`}>
          {Array.from({ length: 13 }, (_, i) => (
            <ellipse
              key={i}
              className="scene__shimmer"
              cx={1176 + (i % 2 ? 9 : -7)}
              cy={534 + i * 26}
              rx={26 + i * 4}
              ry={2.4}
              fill="#ffe9c4"
              opacity={0.62 - i * 0.04}
              style={{ animationDelay: `${i * 0.28}s` }}
            />
          ))}
        </g>

        {/* town light reflections */}
        <g opacity="0.32" filter={`url(#${u('softer')})`}>
          {Array.from({ length: 22 }, (_, i) => (
            <ellipse key={i} cx={140 + i * 58} cy={544 + ((i * 13) % 30)} rx={16} ry={1.6} fill="#ffc98c" />
          ))}
        </g>

        {/* foreground jetty */}
        <path d="M0 900 L0 792 L470 754 L560 760 L560 900 Z" fill="#080a14" opacity="0.94" />
        <path d="M0 792 L470 754 L470 766 L0 806 Z" fill="#141019" opacity="0.9" />
      </svg>

      {/* hanging foliage + lanterns (separate layer, parallaxes independently) */}
      <svg className="scene__svg scene__svg--fg" viewBox="0 0 1440 900" preserveAspectRatio={par}>
        <defs>
          <radialGradient id={u('lampGlow')}>
            <stop offset="0%" stopColor="#ffd79a" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ffb26b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff9d4d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* branch, top-right */}
        <path
          d="M1440 22 C1330 46 1258 96 1206 158 C1170 200 1140 236 1096 258"
          stroke="#0a0a12"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <g fill="#0a0a12" opacity="0.95">
          {[
            [1408, 40], [1360, 66], [1318, 96], [1282, 128], [1246, 160], [1212, 196], [1176, 222], [1138, 246],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="26" ry="10" transform={`rotate(${-32 + i * 5} ${x} ${y})`} />
          ))}
        </g>

        {/* three hanging lanterns */}
        {[
          [1268, 150, 1],
          [1358, 96, 0.86],
          [1160, 236, 0.72],
        ].map(([x, y, s], i) => (
          <g key={i} className="scene__lantern" style={{ animationDelay: `${i * 1.4}s`, transformOrigin: `${x}px ${y - 60}px` }}>
            <circle cx={x} cy={y + 46 * s} r={120 * s} fill={`url(#${u('lampGlow')})`} />
            <line x1={x} y1={y - 64 * s} x2={x} y2={y + 12 * s} stroke="#0a0a12" strokeWidth="2.5" />
            <rect
              x={x - 15 * s}
              y={y + 12 * s}
              width={30 * s}
              height={40 * s}
              rx={4 * s}
              fill="#120d12"
              stroke="#3a2a20"
              strokeWidth="1.5"
            />
            <rect x={x - 9 * s} y={y + 18 * s} width={18 * s} height={28 * s} rx={2} fill="#ffc987" className="scene__flame" />
            <rect x={x - 18 * s} y={y + 6 * s} width={36 * s} height={8 * s} rx={3} fill="#0e0a0e" />
          </g>
        ))}

        {/* foreground foliage, bottom-left */}
        <g fill="#05060c">
          <path d="M0 900 L0 700 C60 720 92 764 108 812 C124 858 150 884 186 900 Z" />
          <path d="M0 760 C48 742 88 706 108 660 C118 700 106 748 74 782 Z" opacity="0.9" />
        </g>
      </svg>

      <div className="scene__grade scene__grade--night" />
    </div>
  )
}
