interface HeroProps {
  locale: 'fr' | 'en'
}

export function Hero({ locale }: HeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: '60vh', minHeight: '320px' }}
    >
      <img
        src="/images/hero/fishing-hero.jpg"
        alt={locale === 'fr' ? 'Pêche au Québec' : 'Quebec Fishing'}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 20%' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,14,24,0.45)' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2
          className="text-5xl md:text-7xl font-bold mb-4"
          style={{
            fontFamily: 'Oswald, sans-serif',
            color: 'var(--text-primary)',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            letterSpacing: '0.05em',
          }}
        >
          {locale === 'fr' ? 'Lisez l\'eau. Chassez les géants.' : 'Read the water. Hunt the giants.'}
        </h2>
        <p
          className="text-lg md:text-xl mb-2"
          style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.2em' }}
        >
          {locale === 'fr' ? 'Intelligence de pêche pour le Québec.' : 'Quebec fishing intelligence.'}
        </p>
        <p
          className="text-sm md:text-base max-w-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          {locale === 'fr'
            ? 'Maskinongé · Grand Brochet · Achigan · Doré Jaune · Truite · Esturgeon'
            : 'Muskellunge · Northern Pike · Bass · Walleye · Trout · Sturgeon'}
        </p>
        <div
          className="mt-6 px-4 py-1 rounded text-xs font-semibold tracking-widest"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          {locale === 'fr' ? 'SAISON 2026' : 'SEASON 2026'}
        </div>
      </div>
    </div>
  )
}
