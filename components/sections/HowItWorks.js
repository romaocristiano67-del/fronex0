import React from 'react';
import { Container, Section, Grid } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { howItWorks } from '../../config/content';

export const HowItWorks = () => {
  return (
    <Section id="how-it-works" className="relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="section-chip mx-auto">processo claro</div>
            <h2 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
              Um fluxo comercial e tecnico desenhado para evitar bagunca.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/[0.66]">
              A Fronex organiza a entrega em quatro etapas objetivas, com mais previsibilidade, menos ruido e melhor
              percecao de valor.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 right-4 top-12 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] lg:block" />

          <Grid cols={4} gap="large">
            {howItWorks.map((step, index) => (
              <Reveal key={step.step} delay={index * 80}>
                <div className="group relative h-full rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
                  <div className="mb-8 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.10] text-2xl font-semibold text-white shadow-[0_0_30px_rgba(118,228,255,0.08)]">
                      {step.step}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/[0.66]">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Grid>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 backdrop-blur-2xl lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">entrega com criterio</div>
              <h3 className="mt-4 text-3xl font-semibold text-white">Prazos realistas, visibilidade comercial e base pronta para crescer.</h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/[0.64]">
                O foco nao e so publicar uma interface bonita. A proposta e sair com copy alinhada, experiencia premium,
                CTA comercial direto, estrutura de dados segura e compatibilidade com deploy no Vercel.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/[0.40] p-5">
                <div className="text-sm font-medium text-white">Performance</div>
                <p className="mt-2 text-sm leading-6 text-white/60">Assets leves, animacoes controladas, lazy loading e estrutura mais limpa.</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/[0.40] p-5">
                <div className="text-sm font-medium text-white">Confianca</div>
                <p className="mt-2 text-sm leading-6 text-white/60">Metadata, favicon, OG, schema SQL corrigido e menos placeholders falsos.</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/[0.40] p-5">
                <div className="text-sm font-medium text-white">UX premium</div>
                <p className="mt-2 text-sm leading-6 text-white/60">Glassmorphism refinado, profundidade, hover luminoso e hierarquia visual forte.</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/[0.40] p-5">
                <div className="text-sm font-medium text-white">WhatsApp ready</div>
                <p className="mt-2 text-sm leading-6 text-white/60">Cada servico abre uma conversa contextualizada e pronta para fechar atendimento.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
