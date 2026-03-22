interface HeroProps {
  locale: 'fr' | 'en'
}

export function Hero({ locale }: HeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: '72vh', minHeight: '400px' }}
    >
      <img
        src="/images/hero/fishing-hero.jpg"
        alt={locale === 'fr' ? 'Pêche au Québec' : 'Quebec Fishing'}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 60%' }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,20,24,0.3) 0%, rgba(13,20,24,0.7) 60%, rgba(13,20,24,0.95) 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 md:pb-16">
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: 'var(--eyebrow)',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500,
          margin: '0 0 1rem',
        }}>
          {locale === 'fr' ? 'Atlas de pêche · Québec · 2026' : 'Fishing Atlas · Quebec · 2026'}
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 'var(--display)',
          color: 'var(--text)',
          letterSpacing: '0.03em',
          fontWeight: 600,
          margin: '0 0 1rem',
          lineHeight: 1.05,
          maxWidth: '900px',
          textShadow: '0 2px 40px rgba(0,0,0,0.5)',
        }}>
          {locale === 'fr' ? 'Lisez l\'eau.\nChassez les géants.' : 'Read the water.\nHunt the giants.'}
        </h2>

        {/* Sub */}
        <p style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.1rem',
          color: 'var(--muted-text)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          margin: '0 0 2rem',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}>
          {locale === 'fr'
            ? '21 espèces · 40 plans d\'eau · Règlements · Tournois · Guides · Météo'
            : '21 species · 40 lakes · Regulations · Tournaments · Guides · Weather'}
        </p>

        {/* CTA chip */}
        <div>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'var(--accent)',
            color: '#0D1418',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--eyebrow)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            {locale === 'fr' ? 'Saison 2026' : 'Season 2026'}
          </span>
        </div>
      </div>
    </div>
  )
}
