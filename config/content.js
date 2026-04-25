const defaultUrl = process.env.SITE_URL || 'https://fronex.site';
const defaultWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '244946419129';

const normalizedWhatsappNumber = defaultWhatsappNumber.replace(/\D/g, '') || '244946419129';

const formatWhatsappDisplay = (value) => {
  if (value.length === 12 && value.startsWith('244')) {
    return `+${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)} ${value.slice(9)}`;
  }

  return `+${value}`;
};

export const siteConfig = {
  name: 'FRONEX',
  shortName: 'Fronex',
  description:
    'Plataforma premium para criar sites, software, apps, seguranca digital e operacoes digitais com acabamento de nivel internacional.',
  url: defaultUrl,
  ogImage: '/brand/og-image.svg',
  locale: 'pt_AO',
  contact: {
    whatsappNumber: normalizedWhatsappNumber,
    whatsappDisplay: formatWhatsappDisplay(normalizedWhatsappNumber),
    email: 'hello@fronex.site',
    location: 'Luanda, Angola',
    responseTime: 'Resposta em ate 24 horas',
  },
  links: {
    whatsapp: `https://wa.me/${normalizedWhatsappNumber}`,
  },
  metrics: [
    { value: '6', label: 'servicos estruturados para venda' },
    { value: '24h', label: 'tempo medio de resposta comercial' },
    { value: '100%', label: 'foco em entrega sob medida' },
  ],
};

export const navigation = {
  main: [
    { name: 'Inicio', href: '#top' },
    { name: 'Servicos', href: '#services' },
    { name: 'Processo', href: '#how-it-works' },
    { name: 'Contato', href: '#contact' },
  ],
  social: [{ name: 'WhatsApp', href: siteConfig.links.whatsapp, icon: 'whatsapp' }],
};

export const heroContent = {
  badge: 'Marketplace de servicos digitais com entrega premium',
  title: 'Construimos presenca, software e operacao digital com padrao real de produto.',
  subtitle:
    'A Fronex junta design, engenharia e estrategia para tirar ideias do rascunho e levar negocios para uma experiencia digital elegante, rapida e pronta para vender.',
  cta: {
    primary: 'Explorar Servicos',
    secondary: 'Falar no WhatsApp',
  },
  spotlight: {
    label: 'Stack principal',
    value: 'Next.js, React, Supabase e UX premium',
  },
};

export const services = [
  {
    slug: 'sites-personalizados',
    title: 'Sites Personalizados',
    shortTitle: 'Web',
    description:
      'Sites institucionais, landing pages e experiencias sob medida em Next.js e React, com performance, SEO e acabamento visual premium.',
    price: 12000,
    priceLabel: 'a partir de 12.000 Kz',
    context: 'Preciso de um site personalizado com design premium e alta performance.',
    icon: 'web',
    image: '/assets/services/sites-personalizados.jpeg',
    accent: '#56c2ff',
    motionLabel: 'UI em movimento',
    deliverables: ['Next.js e React', 'SEO tecnico', 'Design responsivo', 'Deploy pronto para Vercel'],
  },
  {
    slug: 'software-de-gestao',
    title: 'Software de Gestao',
    shortTitle: 'ERP',
    description:
      'Sistemas para vendas, stock, operacoes e rotinas internas com fluxos claros, seguranca basica e estrutura escalavel.',
    price: 20000,
    priceLabel: 'a partir de 20.000 Kz',
    context: 'Quero um software de gestao para controlar operacoes, stock ou vendas.',
    icon: 'dashboard',
    image: '/assets/services/software-de-gestao.jpeg',
    accent: '#4de3c2',
    motionLabel: 'Dados em fluxo',
    deliverables: ['Painel administrativo', 'Controlo de stock', 'Usuarios e perfis', 'Base de dados estruturada'],
  },
  {
    slug: 'seguranca-de-dados',
    title: 'Seguranca de Dados',
    shortTitle: 'Cyber',
    description:
      'Auditoria de exposicao, boas praticas de acesso, endurecimento basico e orientacao para proteger informacao critica.',
    price: 18000,
    priceLabel: 'a partir de 18.000 Kz',
    context: 'Tenho interesse em seguranca de dados e reforco de acessos da plataforma.',
    icon: 'shield',
    image: '/assets/services/seguranca-de-dados.jpeg',
    accent: '#73a7ff',
    motionLabel: 'Protecao ativa',
    deliverables: ['Revisao de riscos', 'Boas praticas de acesso', 'Hardening basico', 'Orientacao de backup'],
  },
  {
    slug: 'edicao-pro',
    title: 'Edicao Pro',
    shortTitle: 'Media',
    description:
      'Tratamento visual para fotografia, video e materiais promocionais com ritmo, consistencia e look tecnologico refinado.',
    price: 12000,
    priceLabel: 'a partir de 12.000 Kz',
    context: 'Preciso de edicao profissional para foto, video ou materiais promocionais.',
    icon: 'media',
    image: '/assets/services/edicao-pro.jpeg',
    accent: '#7cb6ff',
    motionLabel: 'Frames em loop',
    deliverables: ['Color e acabamento', 'Motion graphics', 'Export para redes', 'Visual consistente'],
  },
  {
    slug: 'apps-customizados',
    title: 'Apps Customizados',
    shortTitle: 'Apps',
    description:
      'Aplicacoes moveis e paineis conectados a API, desenhados para uso real, jornadas claras e crescimento futuro.',
    price: 20000,
    priceLabel: 'a partir de 20.000 Kz',
    context: 'Quero desenvolver um app customizado para iOS, Android ou painel conectado.',
    icon: 'mobile',
    image: '/assets/services/apps-customizados.jpeg',
    accent: '#5ee1ff',
    motionLabel: 'Experiencia mobile',
    deliverables: ['Fluxos moveis', 'Painel integrado', 'Escopo sob medida', 'Arquitetura de produto'],
  },
  {
    slug: 'hospedagem-premium-fronex',
    title: 'Hospedagem Premium Fronex',
    shortTitle: 'Cloud',
    description:
      'Hospedagem operacional para publicar, monitorar e manter o projeto no ar com configuracao simples e suporte comercial.',
    price: 700,
    priceLabel: '700 Kz por dia',
    context: 'Quero aderir a hospedagem premium da Fronex para manter o projeto online.',
    icon: 'cloud',
    image: '/assets/services/hospedagem-premium-fronex.jpeg',
    accent: '#6ce8ff',
    motionLabel: 'Infraestrutura viva',
    deliverables: ['Publicacao assistida', 'Monitorizacao basica', 'Ambiente estavel', 'Acompanhamento comercial'],
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Diagnostico',
    description:
      'Entramos no contexto do negocio, identificamos prioridade comercial e definimos a entrega certa para o momento.',
  },
  {
    step: '02',
    title: 'Direcao visual e tecnica',
    description:
      'Alinhamos UX, stack, estrutura e custos para evitar retrabalho e manter a execucao clara desde o inicio.',
  },
  {
    step: '03',
    title: 'Construcao',
    description:
      'Desenvolvemos a solucao com iteracoes curtas, refinando visual, performance e detalhes funcionais.',
  },
  {
    step: '04',
    title: 'Entrega e evolucao',
    description:
      'Publicamos, validamos o funcionamento e deixamos base pronta para escalar com seguranca e continuidade.',
  },
];

export const ctaContent = {
  title: 'Pronto para transformar a Fronex num canal real de vendas?',
  subtitle:
    'Escolha um servico, abra a conversa no WhatsApp e receba um atendimento com contexto, preco base e direcao do projeto.',
  button: 'Abrir WhatsApp',
};
