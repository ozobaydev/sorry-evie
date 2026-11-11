import './florals.css'

function Blossom({ x, y, s = 1, tone = 0 }) {
  const palette = [
    ['#f7dfe3', '#e2aab7', '#c58f9d'],
    ['#fdf3e2', '#f0dcb8', '#d8b477'],
    ['#f9e9ec', '#eec2cb', '#d59fae'],
  ][tone % 3]
  return (
    <g className="floral__blossom">
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse
          key={a}
          cx={x}
          cy={y - 7 * s}
          rx={4.6 * s}
          ry={7.6 * s}
          fill={i % 2 ? palette[0] : palette[1]}
          transform={`rotate(${a} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={2.6 * s} fill={palette[2]} />
      <circle cx={x - 0.8 * s} cy={y - 0.8 * s} r={1.1 * s} fill="#fff8e8" opacity="0.9" />
    </g>
  )
}

function Leaf({ x, y, r = 0, s = 1 }) {
  return (
    <path
      d={`M${x} ${y} c ${9 * s} ${-6 * s} ${20 * s} ${-4 * s} ${26 * s} ${2 * s} c ${-8 * s} ${7 * s} ${-19 * s} ${7 * s} ${-26 * s} ${-2 * s} z`}
      fill="#9fae94"
      opacity="0.85"
      transform={`rotate(${r} ${x} ${y})`}
    />
  )
}

/**
 * Decorative flower sprigs for the cream / paper sections.
 * `side`: 'left' | 'right' | 'both'
 */
export default function Florals({ side = 'left', className = '', density = 1 }) {
  const sprig = (flip) => (
    <svg
      className={`floral floral--${flip ? 'right' : 'left'}`}
      viewBox="0 0 260 420"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g className="floral__sprig" transform={flip ? 'translate(260,0) scale(-1,1)' : undefined}>
        <path
          d="M18 418 C36 330 22 250 52 180 C74 128 60 74 96 26"
          stroke="#8b9c82"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M6 418 C48 356 78 300 92 236 C104 182 132 140 168 112"
          stroke="#8b9c82"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <Leaf x={44} y={296} r={-28} s={1.1} />
        <Leaf x={62} y={214} r={-52} s={0.9} />
        <Leaf x={84} y={148} r={-14} s={1} />
        <Leaf x={112} y={196} r={38} s={0.8} />
        <Leaf x={30} y={358} r={12} s={1.2} />

        <Blossom x={96} y={28} s={1.25} tone={0} />
        <Blossom x={64} y={78} s={0.95} tone={2} />
        <Blossom x={128} y={92} s={0.8} tone={1} />
        <Blossom x={52} y={168} s={1.05} tone={0} />
        <Blossom x={118} y={214} s={0.75} tone={2} />
        <Blossom x={34} y={262} s={0.9} tone={1} />
        {density > 1 && (
          <>
            <Blossom x={150} y={150} s={0.7} tone={0} />
            <Blossom x={20} y={330} s={0.85} tone={2} />
          </>
        )}
      </g>
    </svg>
  )

  return (
    <div className={`florals florals--${side} ${className}`} aria-hidden="true">
      {(side === 'left' || side === 'both') && sprig(false)}
      {(side === 'right' || side === 'both') && sprig(true)}
    </div>
  )
}
