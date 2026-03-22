interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
}

export function SiteHeader({ locale, onLocaleToggle, cartCount = 0 }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(13,20,24,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div>
          <h1
            style={{
              fontFamily: 'Newsreader, serif',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '0.08em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            Appât du Nord
          </h1>
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--eyebrow)',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '3px 0 0',
            fontWeight: 500,
          }}>
            {locale === 'fr' ? 'Atlas de pêche — Québec' : 'Quebec Fishing Atlas'}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-5" style={{ color: 'var(--muted-text)' }}>
        <span
          className="hidden md:block"
          style={{ fontSize: 'var(--eyebrow)', color: 'var(--muted-text)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          🇨🇦 {locale === 'fr' ? 'Saison 2026' : 'Season 2026'}
        </span>

        {/* Cart */}
        {cartCount > 0 && (
          <div style={{ position: 'relative', display: 'inline-block', cursor: 'default', color: 'var(--text)' }}>
            🛒
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px',
              background: 'var(--accent)', color: '#0D1418',
              borderRadius: '50%', width: '16px', height: '16px',
              fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700,
            }}>
              {cartCount}
            </span>
          </div>
        )}

        {/* Locale Toggle */}
        <button
          onClick={onLocaleToggle}
          style={{
            padding: '0.4rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--accent)',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--eyebrow)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            borderRadius: '0px',
          }}
        >
          {locale === 'fr' ? 'EN' : 'FR'}
        </button>
      </nav>
    </header>
  )
}
