import React from 'react';

export const BrandLogo = ({ className = '', monochrome = false, compact = false }) => {
  const stroke = monochrome ? 'rgba(255,255,255,0.92)' : 'url(#fronex-stroke)';
  const fill = monochrome ? 'rgba(255,255,255,0.98)' : 'url(#fronex-fill)';
  const textColor = monochrome ? 'text-white' : 'text-slate-50';
  const subColor = monochrome ? 'text-white/60' : 'text-cyan-200/70';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="fronex-fill" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#76E4FF" />
            <stop offset="1" stopColor="#2D6BFF" />
          </linearGradient>
          <linearGradient id="fronex-stroke" x1="8" y1="5" x2="33" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9EEBFF" />
            <stop offset="1" stopColor="#3A78FF" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="40" height="40" rx="14" fill="rgba(9,14,26,0.72)" stroke="rgba(255,255,255,0.16)" />
        <path d="M13 29.5V12.5H29.5" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 28.5L29.5 12.5" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M19 13H29V23" stroke={fill} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {!compact && (
        <div className="leading-none">
          <div className={`text-[1.05rem] font-semibold tracking-[0.28em] uppercase ${textColor}`}>
            FRONEX
          </div>
          <div className={`mt-1 text-[0.62rem] uppercase tracking-[0.32em] ${subColor}`}>
            digital frontier
          </div>
        </div>
      )}
    </div>
  );
};
