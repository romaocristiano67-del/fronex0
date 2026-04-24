"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Container, Section, Grid } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { ServiceVisual } from '../ui/ServiceVisual';
import { Button } from '../ui/Button';
import { services } from '../../config/content';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { useAuth } from '../../contexts/AuthContext';

export const Services = () => {
  const [offset, setOffset] = useState(0);
  const { profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY || 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="services" className="relative overflow-hidden pt-8">
      <div
        className="absolute right-[-12rem] top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl"
        style={{ transform: `translate3d(0, ${offset * 0.08}px, 0)` }}
      />
      <div
        className="absolute left-[-10rem] top-44 h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-3xl"
        style={{ transform: `translate3d(0, ${offset * 0.04}px, 0)` }}
      />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="section-chip mx-auto">catalogo premium de servicos</div>
            <h2 className="mt-6 text-4xl font-semibold text-white md:text-6xl">
              Servicos desenhados para parecer premium, funcionar bem e vender melhor.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/[0.66]">
              Cada oferta tem posicionamento claro, visual ativo em loop, preco base e um CTA direto para WhatsApp com
              contexto automatico.
            </p>
          </div>
        </Reveal>

        <Grid cols={3} gap="large" className="items-stretch">
          {services.map((service, index) => {
            const whatsappUrl = buildWhatsAppUrl({
              serviceTitle: service.title,
              priceLabel: service.priceLabel,
              context: service.context,
              userName: profile?.full_name,
            });

            return (
              <Reveal key={service.slug} delay={index * 70}>
                <Card variant="gradient" hover className="service-card h-full p-5 md:p-6">
                  <CardHeader>
                    <ServiceVisual icon={service.icon} accent={service.accent} label={service.motionLabel} />
                  </CardHeader>

                  <CardContent className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-white/[0.38]">{service.shortTitle}</div>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{service.title}</h3>
                      </div>
                      <div className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.10] px-3 py-1 text-xs text-cyan-100">
                        {service.priceLabel}
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-white/[0.68] md:text-[0.97rem]">{service.description}</p>

                    <div className="mt-6 grid gap-3">
                      {service.deliverables.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm text-white/[0.62]">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--service-accent)] shadow-[0_0_16px_var(--service-accent)]" style={{ '--service-accent': service.accent }} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href={whatsappUrl} target="_blank" rel="noreferrer" className="flex-1">
                      Pedir atendimento
                    </Button>
                    <Button href="#contact" variant="secondary" className="flex-1">
                      Ver processo
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};
