import { useState } from 'react'
import { tips, TipSpecies } from '../lib/tips'

const speciesFiltersFr: { id: TipSpecies | 'tous'; label: string }[] = [
  { id: 'maskinonge', label: 'MASKINONGÉ' },
  { id: 'brochet', label: 'BROCHET' },
  { id: 'achigan', label: 'ACHIGAN' },
  { id: 'dore', label: 'DORÉ' },
  { id: 'truite', label: 'TRUITE' },
  { id: 'esturgeon', label: 'ESTURGEON' },
]

const speciesFiltersEn: { id: TipSpecies | 'tous'; label: string }[] = [
  { id: 'maskinonge', label: 'MUSKELLUNGE' },
  { id: 'brochet', label: 'PIKE' },
  { id: 'achigan', label: 'BASS' },
  { id: 'dore', label: 'WALLEYE' },
  { id: 'truite', label: 'TROUT' },
  { id: 'esturgeon', label: 'STURGEON' },
]

const speciesColors: Record<string, string> = {
  maskinonge: '#D4261C',
  brochet: '#2E7D32',
  achigan: '#1565C0',
  dore: '#C8A84B',
  truite: '#6A1B9A',
  esturgeon: '#37474F',
}

interface TipsSectionProps {
  locale: 'fr' | 'en'
}

export function TipsSection({ locale }: TipsSectionProps) {
  const [filter, setFilter] = useState<TipSpecies | 'tous'>('maskinonge')

  const filtered = filter === 'tous' ? tips : tips.filter(t => t.species === filter)
  const speciesFilters = locale === 'fr' ? speciesFiltersFr : speciesFiltersEn

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}>
        {locale === 'fr' ? 'CONSEILS DE PÊCHE' : 'FISHING TIPS'}
      </h2>

      {/* Filter */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-1">
        {speciesFilters.map((f) => {
          const color = f.id === 'tous' ? 'var(--text-secondary)' : speciesColors[f.id]
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                fontFamily: 'Oswald, sans-serif',
                letterSpacing: '0.08em',
                background: filter === f.id ? (f.id === 'tous' ? 'var(--water)' : color) : 'var(--surface)',
                color: filter === f.id ? 'white' : color,
                border: `1px solid ${f.id === 'tous' ? 'var(--border)' : color}`,
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Fish Identifier Section */}
      <div
        className="mb-8 p-5 rounded-xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--accent)', letterSpacing: '0.05em' }}
        >
          🐟 {locale === 'fr' ? 'Identifier votre prise' : 'Identify Your Catch'}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {locale === 'fr'
            ? 'Utilisez iPêche — l\'application officielle de reconnaissance des poissons du Québec. Consultez aussi la fiche officielle de toutes les espèces sur le site du gouvernement du Québec.'
            : 'Use iPêche — Quebec\'s official fish ID app. Also consult the official species list on the Quebec government website.'}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.quebec.ca/loisirs-sport-plein-air/chasse-peche/peche/especes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '4px',
              fontSize: '0.75rem',
              textDecoration: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            🇨🇦 {locale === 'fr' ? 'Espèces — Québec.ca' : 'Species — Quebec.ca'}
          </a>
          <a
            href="https://apps.apple.com/ca/app/ip%C3%AAche/id1160834366"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              textDecoration: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.05em',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            🍎 iPêche — App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=ca.qc.mddefp.ipeche"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              textDecoration: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.05em',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            🤖 iPêche — Google Play
          </a>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-xl"
            style={{
              background: 'var(--surface)',
              border: `1px solid ${speciesColors[tip.species] || 'var(--border)'}44`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: `${speciesColors[tip.species]}22` || 'var(--bg-elevated)',
                  color: speciesColors[tip.species] || 'var(--text-muted)',
                  border: `1px solid ${speciesColors[tip.species]}44` || 'var(--border)',
                  fontSize: '10px',
                  fontFamily: 'Oswald, sans-serif',
                }}
              >
                {tip.speciesFR}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ color: i < tip.stars ? '#C8A84B' : 'var(--border)', fontSize: '12px' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'en' && tip.textEN ? tip.textEN : tip.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
