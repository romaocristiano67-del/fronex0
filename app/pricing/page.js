import React from 'react';
import Link from 'next/link';
import { PLANS, DAILY_RATE_KZ } from '@/config/pricing';

export const metadata = {
  title: 'Planos e Precos',
  description: `Escolhe o plano ideal para o teu negocio. A partir de ${DAILY_RATE_KZ} Kz por dia no marketplace Fronex.`,
};

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-white/20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(124,106,255,0.6)]" />
            planos e precos
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Investe no crescimento do teu negocio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Todos os planos pagos sao calculados com base na taxa de{' '}
            <span className="font-semibold text-indigo-400">{DAILY_RATE_KZ} Kz por dia</span>.
            Escolhe a duracao que melhor se adapta a tua realidade.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.slug}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                plan.popular
                  ? 'border-indigo-500/40 bg-slate-900/80 shadow-[0_0_40px_rgba(124,106,255,0.12)]'
                  : 'border-white/10 bg-slate-900/40 hover:border-white/20'
              } backdrop-blur-xl`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -right-8 top-5 rotate-45 bg-indigo-500 px-10 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  Popular
                </div>
              )}

              {/* Discount badge */}
              {plan.badge && (
                <div className="mb-4 inline-flex w-fit items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 ring-1 ring-amber-500/20">
                  {plan.badge}
                </div>
              )}

              {/* Plan name & description */}
              <h3
                className="text-xl font-bold text-white"
                style={{ color: plan.accent }}
              >
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{plan.description}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {plan.price === 0 ? 'Gratis' : `${plan.price.toLocaleString('pt-AO')}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm font-medium text-white/40">Kz{plan.period}</span>
                )}
              </div>

              {/* Daily rate callout */}
              {plan.dailyRate && (
                <p className="mt-1 text-xs text-white/40">
                  equivale a {plan.dailyRate}
                </p>
              )}

              {/* Original price (strikethrough for annual) */}
              {plan.originalPrice && plan.originalPrice > plan.price && (
                <p className="mt-1 text-xs text-white/30 line-through">
                  {plan.originalPrice.toLocaleString('pt-AO')} Kz sem desconto
                </p>
              )}

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? <CheckIcon /> : <CrossIcon />}
                    <span className={`text-sm ${feature.included ? 'text-white/70' : 'text-white/30'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.slug === 'free' ? '/dashboard' : `/dashboard/assinatura?plan=${plan.slug}`}
                className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 hover:shadow-indigo-500/40'
                    : 'bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20'
                }`}
              >
                {plan.slug === 'free' ? 'Comecar Gratis' : 'Escolher Plano'}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
            <h3 className="mb-2 text-lg font-semibold text-white">Como funciona o calculo?</h3>
            <p className="text-sm leading-relaxed text-white/50">
              A taxa base do marketplace Fronex e de{' '}
              <span className="font-semibold text-indigo-400">{DAILY_RATE_KZ} Kz por dia</span>.
              Os planos semanal e mensal multiplicam essa taxa pelos dias de duracao.
              O plano anual oferece um desconto de fidelidade significativo para quem se compromete a longo prazo.
              Todos os planos incluem acesso ao painel de controlo e publicacao de anuncios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
