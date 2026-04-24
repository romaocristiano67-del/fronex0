import React from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { BrandLogo } from '../ui/BrandLogo';
import { navigation, services, siteConfig } from '../../config/content';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <Container>
        <div className="relative py-14">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
            <div>
              <BrandLogo />
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/[0.68]">
                A Fronex desenha experiencias digitais, software de operacao e infraestrutura de presenca online
                com linguagem visual premium e foco em conversao.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {siteConfig.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/[0.72]"
                  >
                    <span className="mr-2 font-semibold text-white">{metric.value}</span>
                    {metric.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">Navegacao</h4>
              <div className="mt-5 grid gap-3">
                {navigation.main.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm text-white/[0.68] transition-colors duration-200 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">Contato direto</h4>
              <div className="mt-5 space-y-3 text-sm text-white/70">
                <p>{siteConfig.contact.whatsappDisplay}</p>
                <p>{siteConfig.contact.email}</p>
                <p>{siteConfig.contact.location}</p>
                <p>{siteConfig.contact.responseTime}</p>
              </div>
              <Button
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6"
                size="small"
              >
                Pedir atendimento
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-3 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="rounded-2xl border border-white/[0.08] bg-slate-950/[0.30] p-4">
                <div className="text-sm font-medium text-white">{service.title}</div>
                <div className="mt-1 text-sm text-cyan-200/70">{service.priceLabel}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/[0.45] md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} {siteConfig.name}. Experiencias digitais prontas para crescer.</p>
            <div className="flex flex-wrap gap-4">
              <span>SEO basico</span>
              <span>Deploy Vercel ready</span>
              <span>Schema Supabase revisado</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
