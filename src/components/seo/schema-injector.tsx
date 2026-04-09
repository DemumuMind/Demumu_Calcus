import Script from 'next/script';

interface SchemaInjectorProps {
  schemas: object | object[];
}

export function SchemaInjector({ schemas }: SchemaInjectorProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  
  return (
    <>
      {schemaArray.map((schema, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  );
}
