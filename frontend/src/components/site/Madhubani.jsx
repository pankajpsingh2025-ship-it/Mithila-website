import React, { useId } from "react";

// Stylized Madhubani folk-art sun face (line work). Colored via `currentColor`.
export const SunFace = ({ className = "", strokeWidth = 2 }) => {
  const rays = Array.from({ length: 24 });
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {rays.map((_, i) => {
          const a = (i / rays.length) * Math.PI * 2;
          const r1 = 74;
          const r2 = i % 2 === 0 ? 96 : 88;
          const x1 = 100 + Math.cos(a) * r1;
          const y1 = 100 + Math.sin(a) * r1;
          const x2 = 100 + Math.cos(a) * r2;
          const y2 = 100 + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        <circle cx="100" cy="100" r="66" />
        <circle cx="100" cy="100" r="58" strokeDasharray="2 6" />
        {/* face */}
        <circle cx="84" cy="92" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="116" cy="92" r="4.5" fill="currentColor" stroke="none" />
        <path d="M82 116 Q100 130 118 116" />
        <path d="M76 84 Q84 78 92 84" />
        <path d="M108 84 Q116 78 124 84" />
      </g>
    </svg>
  );
};

// A repeating triangle band (classic Mithila border).
export const TriangleBand = ({ className = "", flip = false, height = 14 }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox={`0 0 120 ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : "none", display: "block" }}
    >
      <defs>
        <pattern id={`tri-${id}`} width="12" height={height} patternUnits="userSpaceOnUse">
          <path d={`M0 ${height} L6 0 L12 ${height} Z`} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="120" height={height} fill={`url(#tri-${id})`} />
    </svg>
  );
};

// Line-work peacock silhouette accent.
export const Peacock = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M70 150 q-6 -34 12 -56 q18 -22 44 -20" />
      <circle cx="128" cy="72" r="7" />
      <path d="M132 68 q10 -6 18 -2" />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (-70 + i * 16) * (Math.PI / 180);
        const len = 70;
        const x = 118 + Math.cos(a) * len;
        const y = 84 + Math.sin(a) * len;
        return (
          <g key={i}>
            <path d={`M118 84 Q${(118 + x) / 2 + 6} ${(84 + y) / 2} ${x} ${y}`} />
            <circle cx={x} cy={y} r="5" />
            <circle cx={x} cy={y} r="2" fill="currentColor" stroke="none" />
          </g>
        );
      })}
      <path d="M60 150 h40" />
    </g>
  </svg>
);

// Decorative section divider with a small sun in the middle.
export const SunDivider = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <span className="h-px w-16 sm:w-28 bg-current opacity-40" />
    <SunFace className="w-8 h-8 opacity-70" strokeWidth={3} />
    <span className="h-px w-16 sm:w-28 bg-current opacity-40" />
  </div>
);
