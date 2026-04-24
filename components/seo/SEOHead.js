import React from 'react';
import { services, siteConfig } from '../../config/content';

export const StructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/logo-color.svg`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.whatsappDisplay,
        areaServed: 'Angola',
        sameAs: [siteConfig.links.whatsapp],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}#organization`,
        },
      },
      ...services.map((service) => ({
        '@type': 'Service',
        serviceType: service.title,
        name: service.title,
        description: service.description,
        areaServed: 'Angola',
        provider: {
          '@id': `${siteConfig.url}#organization`,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'AOA',
          price: service.price,
          description: service.priceLabel,
          availability: 'https://schema.org/InStock',
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
