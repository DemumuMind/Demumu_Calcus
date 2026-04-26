const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcus-site.vercel.app';

export function generateClientCalculatorSchema(
  name: string,
  description: string,
  url: string,
  category?: string,
  faqs?: Array<{ question: string; answer: string }>
) {
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name,
      description,
      url: `${SITE_URL}${url}`,
      applicationCategory: 'CalculatorApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB'
      }
    }
  ];

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}
