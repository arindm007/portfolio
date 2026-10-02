import type { Project } from '@/lib/data';

const label = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 10,
  letterSpacing: '0.14em',
  fill: 'var(--muted)',
} as const;

/** Ten tools in orbit around one context store, for the MCP server. */
function Orbit() {
  const rings = [
    { r: 70, count: 3, spin: 'viz-spin-fast', phase: 20 },
    { r: 120, count: 3, spin: 'viz-spin-slow', phase: 75 },
    { r: 170, count: 4, spin: 'viz-spin', phase: 10 },
  ];

  return (
    <>
      {rings.map((ring) => (
        <g key={ring.r} className={ring.spin}>
          <circle cx="200" cy="200" r={ring.r} fill="none" stroke="var(--line)" strokeDasharray="2 6" />
          {Array.from({ length: ring.count }, (_, i) => {
            const angle = ((360 / ring.count) * i + ring.phase) * (Math.PI / 180);
            const x = Math.round((200 + Math.cos(angle) * ring.r) * 100) / 100;
            const y = Math.round((200 + Math.sin(angle) * ring.r) * 100) / 100;
            return (
              <g key={i}>
                {i === 0 && (
                  <line
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="var(--accent)"
                    strokeOpacity="0.55"
                    strokeDasharray="4 10"
                    className="viz-dash"
                  />
                )}
                <circle cx={x} cy={y} r="9" fill="var(--bg)" stroke="var(--line)" />
                <circle cx={x} cy={y} r="3" fill={i === 0 ? 'var(--accent)' : 'var(--fg)'} />
              </g>
            );
          })}
        </g>
      ))}
      <circle cx="200" cy="200" r="10" fill="none" stroke="var(--accent)" className="viz-ping" />
      <circle cx="200" cy="200" r="10" fill="var(--accent)" />
      <text x="24" y="38" style={label}>MCP · 10 TOOLS</text>
      <text x="376" y="376" textAnchor="end" style={label}>OAUTH 2.1 · PKCE</text>
    </>
  );
}

/** A road running to the horizon, with the scene being scanned and boxed. */
function Road() {
  const bracket = (x: number, y: number, w: number, h: number, c = 10) =>
    `M${x} ${y + c}V${y}H${x + c} M${x + w - c} ${y}H${x + w}V${y + c} M${x + w} ${y + h - c}V${y + h}H${x + w - c} M${x + c} ${y + h}H${x}V${y + h - c}`;

  return (
    <>
      <line x1="0" y1="150" x2="400" y2="150" stroke="var(--line)" />
      <path d="M200 150L20 400M200 150L380 400" stroke="var(--fg)" strokeOpacity="0.5" fill="none" />
      <path d="M200 150L-140 400M200 150L540 400" stroke="var(--line)" fill="none" />
      <line
        x1="200"
        y1="150"
        x2="200"
        y2="400"
        stroke="var(--fg)"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeDasharray="14 14"
        className="viz-dash"
        style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
      />
      {[190, 240, 310].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--line)" strokeDasharray="1 7" />
      ))}

      <g className="viz-blink">
        <path d={bracket(232, 196, 78, 58)} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <text x="232" y="186" style={{ ...label, fill: 'var(--accent)' }}>HAZARD</text>
      </g>
      <g className="viz-blink" style={{ animationDelay: '1.4s' }}>
        <path d={bracket(96, 172, 52, 40, 8)} stroke="var(--fg)" strokeOpacity="0.8" strokeWidth="1.5" fill="none" />
        <text x="96" y="162" style={label}>OBJECT</text>
      </g>

      <g className="viz-scan">
        <line x1="0" y1="120" x2="400" y2="120" stroke="var(--accent)" strokeOpacity="0.8" />
        <rect x="0" y="96" width="400" height="24" fill="url(#scan-fade)" />
      </g>
      <defs>
        <linearGradient id="scan-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <text x="24" y="38" style={label}>GEMINI 2.5 FLASH</text>
      <text x="376" y="38" textAnchor="end" style={label}>&lt; 500 MS</text>
    </>
  );
}

/** A listening avatar over a live waveform, for the interviewer. */
function Voice() {
  const bars = 29;

  return (
    <>
      <circle cx="200" cy="150" r="56" fill="none" stroke="var(--accent)" className="viz-ping" style={{ animationDuration: '3.6s' }} />
      <circle cx="200" cy="150" r="56" fill="var(--bg)" stroke="var(--fg)" strokeOpacity="0.6" />
      <circle cx="200" cy="134" r="16" fill="none" stroke="var(--fg)" strokeOpacity="0.6" />
      <path d="M166 186a34 30 0 0 1 68 0" fill="none" stroke="var(--fg)" strokeOpacity="0.6" />
      {Array.from({ length: bars }, (_, i) => {
        // Taller in the middle, so the row reads as one voice rather than noise.
        const height = Math.round(14 + Math.sin((i / (bars - 1)) * Math.PI) * 54 * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7))));
        return (
          <rect
            key={i}
            x={60 + i * 10}
            y={300 - height / 2}
            width="2"
            height={height}
            rx="1"
            fill={i % 7 === 3 ? 'var(--accent)' : 'var(--fg)'}
            fillOpacity={i % 7 === 3 ? 1 : 0.7}
            className="viz-wave"
            style={{ animationDelay: `${-((i * 137) % 1300)}ms`, animationDuration: `${900 + ((i * 53) % 700)}ms` }}
          />
        );
      })}
      <text x="24" y="38" style={label}>MISTRAL 7B · LORA</text>
      <text x="376" y="376" textAnchor="end" style={label}>RESPONSE SCORING</text>
    </>
  );
}

export default function ProjectVisual({ kind, className }: { kind: Project['visual']; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden>
      {kind === 'orbit' && <Orbit />}
      {kind === 'road' && <Road />}
      {kind === 'voice' && <Voice />}
    </svg>
  );
}
