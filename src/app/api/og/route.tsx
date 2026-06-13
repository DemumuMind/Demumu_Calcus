import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Calcus';
  const description = searchParams.get('description') || 'Онлайн калькуляторы';
  const category = searchParams.get('category') || '';

  // Color based on category
  const categoryColors: Record<string, string> = {
    'nauka-i-ucheba': '#3B82F6',
    'konvertery': '#10B981',
    'procenty': '#8B5CF6',
    'tajmery': '#F59E0B',
    'kulinarnye-mery': '#EF4444',
    'zdorove-i-krasota': '#EC4899',
    'stroitelstvo-i-remont': '#F97316',
    'transport': '#6366F1',
    'tekhnologii': '#14B8A6',
    'povsednevnoe': '#64748B',
  };

  const accentColor = categoryColors[category] || '#3B82F6';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: '#0A0A0A',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '6px',
            backgroundColor: accentColor,
            borderRadius: '3px',
            marginBottom: '40px',
          }}
        />

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              backgroundColor: accentColor + '22',
              border: '1px solid ' + accentColor + '44',
              borderRadius: '100px',
              marginBottom: '24px',
              fontSize: '18px',
              color: accentColor,
            }}
          >
            {category.replace(/-/g, ' ')}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: '26px',
            color: '#94A3B8',
            marginTop: '20px',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            Calcus
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              color: '#475569',
            }}
          >
            759+ онлайн-калькуляторов
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
