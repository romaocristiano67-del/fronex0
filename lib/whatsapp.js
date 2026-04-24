import { siteConfig } from '../config/content';

export const formatKz = (value) =>
  new Intl.NumberFormat('pt-PT').format(Number(value || 0));

export const buildWhatsAppMessage = ({
  serviceTitle,
  priceLabel,
  context,
  userName,
}) => {
  const cleanName = typeof userName === 'string' ? userName.trim() : '';
  const intro = cleanName
    ? `Ola! Sou ${cleanName} e tenho interesse em ${serviceTitle}.`
    : `Ola! Tenho interesse em ${serviceTitle}.`;

  return [
    intro,
    priceLabel ? `Preco base: ${priceLabel}.` : '',
    context ? `Contexto: ${context}` : '',
    'Gostaria de receber orientacao sobre escopo, prazo e proximo passo.',
  ]
    .filter(Boolean)
    .join('\n');
};

export const buildWhatsAppUrl = ({
  serviceTitle,
  priceLabel,
  context,
  userName,
}) => {
  const message = buildWhatsAppMessage({
    serviceTitle,
    priceLabel,
    context,
    userName,
  });

  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
