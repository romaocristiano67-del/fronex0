/**
 * ==========================================================================
 * FRONEX MARKETPLACE — Configuracao Centralizada de Precos
 * ==========================================================================
 *
 * REGRA DE NEGOCIO FUNDAMENTAL:
 *   Taxa base = 700 Kz por dia.
 *   Todos os planos pagos derivam deste valor.
 *
 * Para alterar os precos no futuro, basta modificar a constante
 * DAILY_RATE_KZ abaixo. Todos os calculos e displays sao derivados
 * automaticamente a partir dela.
 *
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// TAXA BASE — 700 Kz/dia (unico ponto de alteracao de preco)
// --------------------------------------------------------------------------
export const DAILY_RATE_KZ = 700;

// --------------------------------------------------------------------------
// Duracao de cada plano em dias
// --------------------------------------------------------------------------
export const PLAN_DURATIONS = {
  free: 0,
  semanal: 7,
  mensal: 30,
  anual: 365,
};

// --------------------------------------------------------------------------
// Calculos automaticos baseados na taxa diaria
// --------------------------------------------------------------------------
export const PLAN_PRICES = {
  free: 0,
  semanal: DAILY_RATE_KZ * PLAN_DURATIONS.semanal,       // 700 * 7  = 4.900 Kz
  mensal: DAILY_RATE_KZ * PLAN_DURATIONS.mensal,          // 700 * 30 = 21.000 Kz
  anual: DAILY_RATE_KZ * PLAN_DURATIONS.anual,            // 700 * 365 = 255.500 Kz
};

// --------------------------------------------------------------------------
// Desconto anual (opcional): A subscrição do schema.sql actual é 189.000 Kz
// o que implica um desconto de ~26% face ao valor diário bruto.
// Aqui documentamos ambos para transparência.
// --------------------------------------------------------------------------
export const ANNUAL_DISCOUNTED_PRICE = 189000; // Preco com desconto de fidelidade
export const ANNUAL_DISCOUNT_PERCENT = Math.round(
  ((PLAN_PRICES.anual - ANNUAL_DISCOUNTED_PRICE) / PLAN_PRICES.anual) * 100
);

// --------------------------------------------------------------------------
// Definicao completa dos planos (usada na pagina de precos e na validacao)
// --------------------------------------------------------------------------
export const PLANS = [
  {
    slug: 'free',
    name: 'Gratuito',
    price: PLAN_PRICES.free,
    priceLabel: 'Gratis',
    period: '',
    description: 'Ideal para explorar a plataforma e criar os teus primeiros anuncios.',
    maxListings: 3,
    features: [
      { text: 'Ate 3 anuncios', included: true },
      { text: 'Visibilidade basica', included: true },
      { text: 'Suporte por WhatsApp', included: true },
      { text: 'Destaque nos resultados', included: false },
      { text: 'Suporte prioritario', included: false },
      { text: 'Analytics avancado', included: false },
    ],
    accent: '#4de3c2',
    popular: false,
  },
  {
    slug: 'semanal',
    name: 'Semanal',
    price: PLAN_PRICES.semanal,
    priceLabel: `${PLAN_PRICES.semanal.toLocaleString('pt-AO')} Kz`,
    period: '/semana',
    description: 'Perfeito para testar o marketplace com visibilidade aumentada.',
    maxListings: 10,
    dailyRate: `${DAILY_RATE_KZ} Kz/dia`,
    features: [
      { text: 'Ate 10 anuncios', included: true },
      { text: 'Visibilidade aumentada', included: true },
      { text: 'Suporte por WhatsApp', included: true },
      { text: 'Destaque nos resultados', included: true },
      { text: 'Analytics basico', included: true },
      { text: 'Suporte prioritario', included: false },
    ],
    accent: '#56c2ff',
    popular: false,
  },
  {
    slug: 'mensal',
    name: 'Mensal',
    price: PLAN_PRICES.mensal,
    priceLabel: `${PLAN_PRICES.mensal.toLocaleString('pt-AO')} Kz`,
    period: '/mes',
    description: 'O plano mais popular para profissionais e negocios em crescimento.',
    maxListings: 50,
    dailyRate: `${DAILY_RATE_KZ} Kz/dia`,
    features: [
      { text: 'Ate 50 anuncios', included: true },
      { text: 'Maxima visibilidade', included: true },
      { text: 'Suporte por WhatsApp', included: true },
      { text: 'Destaque nos resultados', included: true },
      { text: 'Analytics avancado', included: true },
      { text: 'Suporte prioritario', included: true },
    ],
    accent: '#7c6aff',
    popular: true,
  },
  {
    slug: 'anual',
    name: 'Anual',
    price: ANNUAL_DISCOUNTED_PRICE,
    originalPrice: PLAN_PRICES.anual,
    priceLabel: `${ANNUAL_DISCOUNTED_PRICE.toLocaleString('pt-AO')} Kz`,
    period: '/ano',
    description: `Compromisso anual com ${ANNUAL_DISCOUNT_PERCENT}% de desconto. Maximo retorno.`,
    maxListings: 999,
    dailyRate: `${Math.round(ANNUAL_DISCOUNTED_PRICE / 365)} Kz/dia`,
    features: [
      { text: 'Anuncios ilimitados', included: true },
      { text: 'Maxima visibilidade', included: true },
      { text: 'Suporte por WhatsApp', included: true },
      { text: 'Destaque nos resultados', included: true },
      { text: 'Analytics avancado', included: true },
      { text: 'Suporte prioritario + dominio', included: true },
    ],
    accent: '#f59e0b',
    popular: false,
    badge: `${ANNUAL_DISCOUNT_PERCENT}% OFF`,
  },
];
