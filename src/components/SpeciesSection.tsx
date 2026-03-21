import { useState } from 'react'
import { speciesData, ActivityLevel } from '../lib/species'

const activityColors: Record<ActivityLevel, string> = {
  HOT: '#D4261C',
  ACTIVE: '#C8A84B',
  SLOW: '#4A6A82',
  CLOSED: '#1A2E42',
}

const monthNamesFr = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
const monthNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface SpeciesSectionProps {
  onScrollToArsenal: (speciesId: string) => void
  locale: 'fr' | 'en'
  initialSpecies?: string
}

export function SpeciesSection({ onScrollToArsenal, locale, initialSpecies }: SpeciesSectionProps) {
  const [activeSpecies, setActiveSpecies] = useState(initialSpecies || speciesData[0].id)

  const species = speciesData.find(s => s.id === activeSpecies) || speciesData[0]
  const monthNames = locale === 'fr' ? monthNamesFr : monthNamesEn

  const activityLabels: Record<ActivityLevel, string> = locale === 'fr'
    ? { HOT: 'HOT 🔴', ACTIVE: 'ACTIF 🟠', SLOW: 'LENT ⚫', CLOSED: 'FERMÉ ⚪' }
    : { HOT: 'HOT 🔴', ACTIVE: 'ACTIVE 🟠', SLOW: 'SLOW ⚫', CLOSED: 'CLOSED ⚪' }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}>
        {locale === 'fr' ? 'ESPÈCES DU QUÉBEC' : 'QUEBEC SPECIES'}
      </h2>

      {/* Tab Row */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-1">
        {speciesData.map((sp) => (
          <button
            key={sp.id}
            onClick={() => setActiveSpecies(sp.id)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              fontFamily: 'Oswald, sans-serif',
              background: activeSpecies === sp.id ? 'var(--accent)' : 'var(--surface)',
              color: activeSpecies === sp.id ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${activeSpecies === sp.id ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <img
              src={`/images/fish/${sp.imageFile}`}
              alt={sp.name}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            {sp.name}
            {sp.catchRelease && <span className="text-xs">C&R</span>}
          </button>
        ))}
      </div>

      {/* Species Detail */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left: Photo */}
        <div className="md:col-span-2">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <img
              src={`/images/fish/${species.imageFile}`}
              alt={species.name}
              style={{ width: '100%', height: '280px', objectFit: 'contain', objectPosition: 'center', background: 'var(--bg-elevated)' }}
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero/fishing-hero.jpg' }}
            />
          </div>
          {/* Sub-types */}
          {species.subtypes && (
            <div className="mt-3 space-y-2">
              {species.subtypes.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <img
                    src={`/images/fish/${sub.imageFile}`}
                    alt={sub.name}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
                      {sub.name}
                    </div>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {sub.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h3 className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}>
              {species.name}
            </h3>
            <p className="text-sm mt-1 italic" style={{ color: 'var(--accent-gold)' }}>{species.tagline}</p>
            {species.catchRelease && (
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--accent)', color: 'white' }}>
                {locale === 'fr' ? '♻️ REMISE À L\'EAU OBLIGATOIRE' : '♻️ CATCH & RELEASE REQUIRED'}
              </span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: locale === 'fr' ? 'Taille moyenne' : 'Average size', value: species.avgSize },
              { label: locale === 'fr' ? 'Taille max' : 'Max size', value: species.maxSize },
              { label: locale === 'fr' ? "Température eau" : 'Water temperature', value: species.waterTemp },
              { label: locale === 'fr' ? 'Saison Québec' : 'Quebec season', value: species.quebecSeason },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-2 rounded-lg"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
              </div>
            ))}
            <div className="col-span-2 p-2 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                {locale === 'fr' ? 'Habitat' : 'Habitat'}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{species.habitat}</div>
            </div>
          </div>

          {/* Monthly Activity */}
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'ACTIVITÉ MENSUELLE' : 'MONTHLY ACTIVITY'}
            </div>
            <div className="flex gap-1">
              {species.monthlyActivity.map((level, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className="h-6 rounded-sm mb-1"
                    style={{ background: activityColors[level], minWidth: '4px' }}
                    title={activityLabels[level]}
                  />
                  <div className="text-xs" style={{ color: 'var(--text-muted)', fontSize: '9px' }}>
                    {monthNames[i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2 flex-wrap">
              {Object.entries(activityColors).map(([level, color]) => (
                <div key={level} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                    {activityLabels[level as ActivityLevel]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'CONSEILS DE PRO' : 'PRO TIPS'}
            </div>
            <ol className="space-y-1.5">
              {species.proTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--accent)', color: 'white', fontSize: '10px' }}
                  >
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>

          {/* Notable Catch */}
          {species.notableCatch && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--accent-gold)' }}>
              <div className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
                {locale === 'fr' ? 'PRISES NOTABLES' : 'NOTABLE CATCHES'}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{species.notableCatch}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {locale === 'fr' ? 'Source : Communauté Appât du Nord' : 'Source: Appât du Nord Community'}
              </p>
            </div>
          )}

          {/* Best Lures */}
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'Oswald, sans-serif' }}>
              {locale === 'fr' ? 'MEILLEURS LEURRES' : 'BEST LURES'}
            </div>
            <div className="flex gap-2 flex-wrap">
              {species.lureImages.map((img, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img
                    src={`/images/lures/${img}`}
                    alt={species.bestLures[i]}
                    className="w-12 h-12 rounded object-cover"
                    style={{ border: '1px solid var(--border)' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/lures/jig.jpg' }}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-muted)', fontSize: '9px' }}>
                    {species.bestLures[i]}
                  </span>
                </div>
              ))}
            </div>
            {/* FIX 1: click-through to Arsenal */}
            <button
              onClick={() => onScrollToArsenal(species.id)}
              className="mt-2 text-xs underline"
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {locale === 'fr' ? 'Voir les leurres →' : 'View lures →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
