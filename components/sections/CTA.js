import React from 'react';
import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { ctaContent, services, siteConfig } from '../../config/content';
import { buildWhatsAppUrl } from '../../lib/whatsapp';

export const CTA = () => {
  const primaryService = services[0];
  const whatsappUrl = buildWhatsAppUrl({
    serviceTitle: primaryService.title,
    priceLabel: primaryService.priceLabel,
    context: 'Quero conversar sobre a melhor solucao da Fronex para o meu negocio.',
  });

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(118,228,255,0.13),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(45,107,255,0.14),transparent_28%)]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-7 shadow-[0_30px_100px_rgba(2,10,24,0.38)] backdrop-blur-2xl md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="section-chip w-fit">contato direto</div>
                <h2 className="mt-6 max-w-3xl text-4xl font-semibold text-white md:text-5xl">{ctaContent.title}</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/[0.66]">{ctaContent.subtitle}</p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer" size="large">
                    {ctaContent.button}
                  </Button>
                  <Button href="#services" variant="secondary" size="large">
                    Rever servicos
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/[0.42] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">WhatsApp</div>
                  <div className="mt-3 text-lg font-medium text-white">{siteConfig.contact.whatsappDisplay}</div>
                  <p className="mt-2 text-sm leading-6 text-white/60">Mensagem automatica com servico escolhido e contexto de interesse.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/[0.42] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">Email</div>
                  <div className="mt-3 text-lg font-medium text-white">{siteConfig.contact.email}</div>
                  <p className="mt-2 text-sm leading-6 text-white/60">Canal complementar para propostas, documentos e alinhamento formal.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/[0.42] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">Mercado</div>
                  <div className="mt-3 text-lg font-medium text-white">{siteConfig.contact.location}</div>
                  <p className="mt-2 text-sm leading-6 text-white/60">Copy, moeda e proposta comercial alinhadas para Angola.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/[0.42] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">Atendimento</div>
                  <div className="mt-3 text-lg font-medium text-white">{siteConfig.contact.responseTime}</div>
                  <p className="mt-2 text-sm leading-6 text-white/60">Fluxo simples para iniciar rapido sem perder percecao premium.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
