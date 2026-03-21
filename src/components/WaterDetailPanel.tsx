import { Water } from '../lib/waters'
// WaterPermit used via water.permits

const speciesIdMap: Record<string, string> = {
  'Maskinongé': 'maskinonge',
  'Grand Brochet': 'brochet',
  'Achigan': 'achigan',
  'Achigan à Grande Bouche': 'achigan',
  'Achigan à Petite Bouche': 'achigan',
  'Doré Jaune': 'dore',
  'Truite Mouchetée': 'truite',
  'Touladi': 'truite',
  'Truite Arc-en-ciel': 'truite',
  'Esturgeon': 'esturgeon',
  'Bar Rayé': 'esturgeon',
  'Ouananiche': 'truite',
  'Perchaude': 'dore',
  'Saumon Atlantique': 'truite',
}

interface WaterDetailPanelProps {
  water: Water
  onClose: () => void
  onViewGear: () => void
  locale: 'fr' | 'en'
  onViewSpecies?: (id: string) => void
}

export function WaterDetailPanel({ water, onClose, onViewGear, locale, onViewSpecies }: WaterDetailPanelProps) {
  const fishImages: Record<string, string> = {
    'Maskinongé': 'maskinonge.jpg',
    'Grand Brochet': 'grand-brochet.jpg',
    'Achigan': 'achigan-grande-bouche.jpg',
    'Doré Jaune': 'dore-jaune.jpg',
    'Truite Mouchetée': 'truite-mouchetee.jpg',
    'Touladi': 'touladi.jpg',
    'Esturgeon': 'esturgeon.jpg',
    'Bar Rayé': 'bar-raye.jpg',
    'Ouananiche': 'truite-mouchetee.jpg',
    'Truite Arc-en-ciel': 'truite-mouchetee.jpg',
    'Perchaude': 'dore-jaune.jpg',
    'Saumon Atlantique': 'bar-raye.jpg',
  }

  return (
    <div
      className="rounded-xl overflow-hidden mt-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="relative">
        <img
          src={`/images/lakes/${water.imageFile}`}
          alt={water.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/lakes/lake-1.jpg' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(6,14,24,0.95))' }}
        />
        <div className="absolute bottom-0 left-0 p-4">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}
          >
            {water.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--accent-gold)' }}>{water.region}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(6,14,24,0.8)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          ×
        </button>
      </div>

      {/* Description */}
      {(water.descFr || water.descEn) && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {locale === 'fr' ? water.descFr : water.descEn}
          </p>
        </div>
      )}

      {/* Content Grid */}
      <div className="p-4 grid md:grid-cols-2 gap-4">
        {/* Left */}
        <div className="space-y-4">
          {/* Species — clickable badges */}
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'ESPÈCES PRÉSENTES' : 'PRESENT SPECIES'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {water.species.map((sp) => {
                const speciesId = speciesIdMap[sp]
                return (
                  <button
                    key={sp}
                    onClick={() => speciesId && onViewSpecies && onViewSpecies(speciesId)}
                    className="flex items-center gap-2 px-2 py-1 rounded transition-all"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      cursor: speciesId && onViewSpecies ? 'pointer' : 'default',
                      textAlign: 'left',
                    }}
                    title={speciesId && onViewSpecies ? (locale === 'fr' ? `Voir ${sp}` : `View ${sp}`) : undefined}
                  >
                    {fishImages[sp] && (
                      <img
                        src={`/images/fish/${fishImages[sp]}`}
                        alt={sp}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sp}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Best Season */}
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'MEILLEURE SAISON' : 'BEST SEASON'}
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{water.bestSeason}</p>
          </div>

          {/* Boat Launches — addresses + Google Maps link */}
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? "MISES À L'EAU" : 'BOAT LAUNCHES'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {water.boatLaunches.map((launch) => (
                <li key={launch} style={{ marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>📍 {launch}</span>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(launch)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '0.5rem', color: 'var(--accent)', fontSize: '0.75rem' }}
                  >
                    Directions →
                  </a>
                </li>
              ))}
            </ul>

            {/* Fishing license(s) */}
            {water.permits && water.permits.length > 0 ? (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {water.permits.map((permit, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.4rem' }}>
                      {locale === 'fr' ? permit.labelFr : permit.labelEn}
                    </p>
                    <a href={permit.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-block', padding: '0.35rem 0.75rem', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.72rem', textDecoration: 'none' }}>
                      {locale === 'fr' ? 'Acheter / Voir →' : 'Buy / View →'}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>
                  {locale === 'fr' ? '🎫 Un permis de pêche est requis pour pêcher au Québec.' : '🎫 A fishing permit is required to fish in Quebec.'}
                </p>
                <a href="https://mondossierchassepeche.gouv.qc.ca/" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', padding: '0.4rem 0.8rem', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.75rem', textDecoration: 'none' }}>
                  {locale === 'fr' ? 'Acheter un permis →' : 'Buy a permit →'}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
          {/* Weather Widget */}
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'CONDITIONS MÉTÉO' : 'WEATHER CONDITIONS'}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              🌡️ {water.weatherRegion} — {locale === 'fr' ? 'Météo en temps réel intégrée (Open-Meteo)' : 'Real-time weather via Open-Meteo'}
            </p>
          </div>

          {/* Fishing Score */}
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'SCORE DE PÊCHE' : 'FISHING SCORE'}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              🎣 {locale === 'fr' ? 'Score de pêche — Voir Calendrier pour le score du jour' : 'Fishing score — See Calendar for today\'s score'}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onViewGear}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            {locale === 'fr' ? "Voir l'équipement pour cette zone →" : 'View gear for this zone →'}
          </button>
        </div>
      </div>
    </div>
  )
}
