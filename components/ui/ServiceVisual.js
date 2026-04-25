import React from 'react';

const icons = {
  web: (
    <path
      d="M7 10.5h18M10 7.5h12A2.5 2.5 0 0 1 24.5 10v10A2.5 2.5 0 0 1 22 22.5H10A2.5 2.5 0 0 1 7.5 20V10A2.5 2.5 0 0 1 10 7.5Zm4.5 7h7m-7 4h4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  dashboard: (
    <path
      d="M8 8.5h6v6H8Zm10 0h6v10h-6Zm-10 10h6v6H8Zm10-4h6v10h-6Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M16 6.5 24 9v6.5c0 4.5-3 8.6-8 10-5-1.4-8-5.5-8-10V9l8-2.5Zm-3 9 2.2 2.2L19.5 13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  media: (
    <path
      d="M8 9.5A2.5 2.5 0 0 1 10.5 7h11A2.5 2.5 0 0 1 24 9.5v13A2.5 2.5 0 0 1 21.5 25h-11A2.5 2.5 0 0 1 8 22.5Zm10 4.5-4 2.5V11.5L18 14Zm-8.5 7h13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mobile: (
    <path
      d="M14 6.5h4A2.5 2.5 0 0 1 20.5 9v14A2.5 2.5 0 0 1 18 25.5h-4A2.5 2.5 0 0 1 11.5 23V9A2.5 2.5 0 0 1 14 6.5Zm0 14h4m-5-11h6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cloud: (
    <path
      d="M10.5 21.5H22a4 4 0 0 0 .7-7.94A6.5 6.5 0 0 0 10 11.2 4.6 4.6 0 0 0 10.5 21.5ZM16 14.5v7m0 0-3-3m3 3 3-3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

import Image from 'next/image';

export const ServiceVisual = ({ icon, image, accent, label }) => {
  return (
    <div
      className="service-visual relative h-56 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05]"
      style={{ '--service-accent': accent }}
    >
      <div className="service-grid absolute inset-0 opacity-60 z-10" />
      <div className="service-orb service-orb-one absolute -left-10 top-4 h-32 w-32 rounded-full blur-3xl z-10" />
      <div className="service-orb service-orb-two absolute bottom-4 right-4 h-28 w-28 rounded-full blur-3xl z-10" />
      <div className="service-scan absolute inset-x-0 top-1/2 h-px -translate-y-1/2 z-10" />
      <div className="service-wave absolute inset-x-6 bottom-6 h-14 rounded-full blur-2xl z-10" />

      {image && (
        <div className="absolute inset-0 z-0">
          <Image src={image} alt={label} fill className="object-cover opacity-40 mix-blend-overlay transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
      )}

      <div className="relative z-20 flex h-full flex-col justify-between p-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-slate-950/[0.50] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/[0.58]">
          <span className="h-2 w-2 rounded-full bg-[var(--service-accent)] shadow-[0_0_18px_var(--service-accent)]" />
          {label}
        </div>

        <div className="flex items-end justify-between">
          <div className="rounded-[1.2rem] border border-white/[0.12] bg-slate-950/[0.55] p-4 backdrop-blur-xl">
            <svg
              width="34"
              height="34"
              viewBox="0 0 32 32"
              fill="none"
              stroke="var(--service-accent)"
              strokeWidth="1.8"
              className="drop-shadow-[0_0_18px_var(--service-accent)]"
              aria-hidden="true"
            >
              {icons[icon]}
            </svg>
          </div>

          <div className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-xs text-white/[0.62]">
            motion loop
          </div>
        </div>
      </div>
    </div>
  );
};
