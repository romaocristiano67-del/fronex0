"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { heroContent, services, siteConfig } from '../../config/content';

export const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY || 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-36 md:pb-24"
    >
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div
        className="absolute inset-x-0 top-[-10%] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(98,224,255,0.2),transparent_48%)]"
        style={{ transform: `translateY(${offset * 0.16}px)` }}
      />
      <div
        className="absolute -left-20 top-28 h-72 w-72 rounded-full bg-cyan-300/16 blur-3xl"
        style={{ transform: `translate3d(0, ${offset * 0.08}px, 0)` }}
      />
      <div
        className="absolute right-[-3rem] top-40 h-80 w-80 rounded-full bg-blue-500/16 blur-3xl"
        style={{ transform: `translate3d(0, ${offset * 0.12}px, 0)` }}
      />
      <div
        className="absolute bottom-[-6rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl"
        style={{ transform: `translate3d(-50%, ${offset * 0.04}px, 0)` }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/[0.72] backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(118,228,255,0.9)]" />
                {heroContent.badge}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                {heroContent.title}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68] md:text-xl">
                {heroContent.subtitle}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="#services" size="large">
                  {heroContent.cta.primary}
                </Button>
                <Button
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="large"
                >
                  {heroContent.cta.secondary}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {siteConfig.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-xl"
                  >
                    <div className="text-3xl font-semibold text-white">{metric.value}</div>
                    <div className="mt-2 text-sm leading-6 text-white/58">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="lg:justify-self-end">
            <div className="relative mx-auto max-w-[34rem]">
              <div
                className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(93,226,255,0.18),rgba(45,107,255,0.1))] blur-2xl"
                style={{ transform: `translateY(${offset * 0.08}px)` }}
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-5 shadow-[0_30px_100px_rgba(2,10,24,0.4)] backdrop-blur-2xl">
                <div className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-slate-950/[0.55] px-4 py-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/[0.42]">
                      {heroContent.spotlight.label}
                    </div>
                    <div className="mt-2 text-sm text-white/[0.74]">{heroContent.spotlight.value}</div>
                  </div>
                  <div className="rounded-full border border-cyan-300/[0.25] bg-cyan-300/[0.10] px-3 py-1 text-xs text-cyan-100">
                    live setup
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {services.slice(0, 4).map((service, index) => (
                    <div
                      key={service.slug}
                      className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-4"
                      style={{
                        transform: `translateY(${(offset * (0.03 + index * 0.01)).toFixed(2)}px)`,
                      }}
                    >
                        <div className="text-xs uppercase tracking-[0.22em] text-white/[0.38]">{service.shortTitle}</div>
                        <div className="mt-3 text-base font-medium text-white">{service.title}</div>
                        <div className="mt-2 text-sm text-cyan-200/[0.68]">{service.priceLabel}</div>
                      </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-slate-950/[0.45] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">Pipeline Fronex</div>
                      <div className="mt-1 text-sm text-white/[0.55]">Diagnostico, escopo, design, entrega e deploy.</div>
                    </div>
                    <div className="hero-pulse h-12 w-12 rounded-full border border-cyan-300/[0.25] bg-cyan-300/[0.10]" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
