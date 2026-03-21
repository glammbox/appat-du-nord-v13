interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
}

export function SiteHeader({ locale, onLocaleToggle, cartCount = 0 }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
      style={{
        background: 'rgba(6,14,24,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎣</span>
        <div>
          <h1
            className="text-xl font-bold leading-none"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)', letterSpacing: '0.05em' }}
          >
            APPÂT DU NORD
          </h1>
          <p className="text-xs" style={{ color: 'var(--accent-gold)', letterSpacing: '0.15em' }}>
            {locale === 'fr' ? 'PÊCHE AU QUÉBEC' : 'QUEBEC FISHING'}
          </p>
        </div>
      </div>
      <nav className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <span className="hidden md:block text-xs" style={{ color: 'var(--text-muted)' }}>
          🇨🇦 Québec · {locale === 'fr' ? 'Saison 2026' : 'Season 2026'}
        </span>

        {/* FIX 7 — Cart icon with badge */}
        {cartCount > 0 && (
          <div style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}>
            🛒
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px',
              background: 'var(--accent)', color: 'white',
              borderRadius: '50%', width: '16px', height: '16px',
              fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{cartCount}</span>
          </div>
        )}

        <button
          onClick={onLocaleToggle}
          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--accent-gold)',
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          {locale === 'fr' ? 'EN' : 'FR'}
        </button>
      </nav>
    </header>
  )
}
