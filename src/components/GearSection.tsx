import { useState } from 'react'
import { products, SpeciesTag, LureType } from '../lib/products'

const speciesFiltersFr: { id: SpeciesTag | 'tous'; label: string; color: string }[] = [
  { id: 'tous', label: 'TOUS', color: 'var(--text-secondary)' },
  { id: 'maskinonge', label: 'MASKINONGÉ', color: '#D4261C' },
  { id: 'brochet', label: 'BROCHET', color: '#2E7D32' },
  { id: 'achigan', label: 'ACHIGAN', color: '#1565C0' },
  { id: 'dore', label: 'DORÉ', color: '#C8A84B' },
  { id: 'truite', label: 'TRUITE', color: '#6A1B9A' },
]

const speciesFiltersEn: { id: SpeciesTag | 'tous'; label: string; color: string }[] = [
  { id: 'tous', label: 'ALL', color: 'var(--text-secondary)' },
  { id: 'maskinonge', label: 'MUSKELLUNGE', color: '#D4261C' },
  { id: 'brochet', label: 'PIKE', color: '#2E7D32' },
  { id: 'achigan', label: 'BASS', color: '#1565C0' },
  { id: 'dore', label: 'WALLEYE', color: '#C8A84B' },
  { id: 'truite', label: 'TROUT', color: '#6A1B9A' },
]

const lureFilters: { id: LureType | 'tous'; label: string }[] = [
  { id: 'tous', label: 'TOUS' },
  { id: 'bucktail', label: 'BUCKTAIL' },
  { id: 'crankbait', label: 'CRANKBAIT' },
  { id: 'swimbait', label: 'SWIMBAIT' },
  { id: 'topwater', label: 'TOPWATER' },
  { id: 'jig', label: 'JIG' },
  { id: 'spinner', label: 'SPINNER' },
  { id: 'cuillere', label: 'CUILLÈRE' },
  { id: 'softbait', label: 'SOFTBAIT' },
  { id: 'glide-bait', label: 'GLIDE BAIT' },
  { id: 'equipement', label: 'ÉQUIPEMENT' },
]

const speciesColors: Record<string, string> = {
  maskinonge: '#D4261C',
  brochet: '#2E7D32',
  achigan: '#1565C0',
  dore: '#C8A84B',
  truite: '#6A1B9A',
}

const speciesNamesFr: Record<string, string> = {
  maskinonge: 'Maskinongé',
  brochet: 'Brochet',
  achigan: 'Achigan',
  dore: 'Doré',
  truite: 'Truite',
}

const speciesNamesEn: Record<string, string> = {
  maskinonge: 'Musky',
  brochet: 'Pike',
  achigan: 'Bass',
  dore: 'Walleye',
  truite: 'Trout',
}

interface GearSectionProps {
  initialSpeciesFilter?: string
  onAddToCart: (product: { id: string; name: string; price: number }) => void
  locale: 'fr' | 'en'
}

export function GearSection({ initialSpeciesFilter, onAddToCart, locale }: GearSectionProps) {
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesTag | 'tous'>(
    (initialSpeciesFilter as SpeciesTag) || 'tous'
  )
  const [lureFilter, setLureFilter] = useState<LureType | 'tous'>('tous')

  // Primary: both filters
  const bothFiltered = products.filter((p) => {
    const sp = speciesFilter || 'tous'
    const lt = lureFilter || 'tous'
    const matchSpecies = sp === 'tous' || p.species.includes(sp as SpeciesTag)
    const matchLure = lt === 'tous' || p.type === lt
    return matchSpecies && matchLure
  })
  // Fallback: species only (never show 0)
  const speciesOnly = products.filter((p) => {
    const sp = speciesFilter || 'tous'
    return sp === 'tous' || p.species.includes(sp as SpeciesTag)
  })
  // If both filters returns 0, use species-only; if still 0 show all 34
  const filtered = bothFiltered.length > 0 ? bothFiltered : (speciesOnly.length > 0 ? speciesOnly : products)

  const speciesFilters = locale === 'fr' ? speciesFiltersFr : speciesFiltersEn
  const speciesNames = locale === 'fr' ? speciesNamesFr : speciesNamesEn

  const lureFilterDisplay = lureFilters.map(f => ({
    ...f,
    label: f.id === 'tous' ? (locale === 'fr' ? 'TOUS' : 'ALL') : f.label
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}>
        {locale === 'fr' ? 'ARSENAL — ÉQUIPEMENT DE PÊCHE' : 'ARSENAL — FISHING GEAR'}
      </h2>

      {/* Species Filter */}
      <div className="flex overflow-x-auto gap-2 mb-3 pb-1">
        {speciesFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSpeciesFilter(f.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.08em',
              background: speciesFilter === f.id ? f.color : 'var(--surface)',
              color: speciesFilter === f.id ? 'white' : f.color,
              border: `1px solid ${f.color}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lure Type Filter */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-1">
        {lureFilterDisplay.map((f) => (
          <button
            key={f.id}
            onClick={() => setLureFilter(f.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.05em',
              background: lureFilter === f.id ? 'var(--water)' : 'var(--surface)',
              color: lureFilter === f.id ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${lureFilter === f.id ? 'var(--water)' : 'var(--border)'}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        {locale === 'fr'
          ? `${filtered.length} produit${filtered.length !== 1 ? 's' : ''} trouvé${filtered.length !== 1 ? 's' : ''}`
          : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="relative">
              {/* FIX 4: proper lure image sizing with contain */}
              <img
                src={`/images/lures/${product.imageFile}`}
                alt={product.name}
                style={{ width: '100%', height: '180px', objectFit: 'contain', background: 'white', padding: '0.5rem' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/lures/jig.jpg' }}
              />
              {/* Species badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {product.species.map((sp) => (
                  <span
                    key={sp}
                    className="px-1.5 py-0.5 rounded text-xs font-bold"
                    style={{
                      background: speciesColors[sp] || '#666',
                      color: 'white',
                      fontSize: '9px',
                    }}
                  >
                    {speciesNames[sp] || sp}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3">
              <div
                className="text-xs px-2 py-0.5 rounded-full mb-1 inline-block"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontSize: '10px' }}
              >
                {product.typeFR}
              </div>
              <h4 className="text-sm font-semibold mb-2 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Oswald, sans-serif' }}>
                {product.name}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
                  ${product.price}
                  <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}> CAD</span>
                </span>
                <button
                  onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price })}
                  className="text-xs px-2 py-1.5 rounded transition-all active:scale-95"
                  style={{
                    background: 'var(--accent)',
                    color: 'white',
                    fontFamily: 'Oswald, sans-serif',
                    letterSpacing: '0.05em',
                    fontSize: '10px',
                  }}
                >
                  {locale === 'fr' ? 'AJOUTER' : 'ADD'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <div className="text-4xl mb-3">🎣</div>
          <p>{locale === 'fr' ? 'Aucun produit pour cette combinaison de filtres.' : 'No products for this filter combination.'}</p>
        </div>
      )}
    </div>
  )
}
