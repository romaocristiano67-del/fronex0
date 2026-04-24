import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { HowItWorks } from '../components/sections/HowItWorks';
import { CTA } from '../components/sections/CTA';
import { siteConfig } from '../config/content';

export const metadata = {
  title: 'Marketplace premium de servicos digitais em Angola',
  description: siteConfig.description,
  keywords: [
    'sites personalizados angola',
    'software de gestao',
    'apps customizados',
    'seguranca de dados',
    'hospedagem premium',
    'fronex',
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <CTA />
    </>
  );
}
