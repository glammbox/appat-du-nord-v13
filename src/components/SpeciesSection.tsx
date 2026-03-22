import { useState } from 'react'
import { speciesData, ActivityLevel } from '../lib/species'

const activityColors: Record<ActivityLevel, string> = {
  HOT: '#C0392B',
  ACTIVE: '#4D7C8A',
  SLOW: '#29414A',
  CLOSED: '#0D1418',
}

// Species groupings for parent-category filter
type SpeciesGroup = 'ALL' | 'TROUT' | 'BASS' | 'PIKE' | 'WALLEYE' | 'OTHER'

const SPECIES_GROUPS: Record<string, SpeciesGroup> = {
  'brook-trout': 'TROUT',
  'brown-trout': 'TROUT',
  'lake-trout': 'TROUT',
  'rainbow-trout': 'TROUT',
  'splake': 'TROUT',
  'atlantic-salmon': 'TROUT',
  'arctic-char': 'TROUT',
  'largemouth-bass': 'BASS',
  'smallmouth-bass': 'BASS',
  'muskellunge': 'PIKE',
  'northern-pike': 'PIKE',
  'walleye': 'WALLEYE',
  'perch': 'OTHER',
  'whitefish': 'OTHER',
  'sturgeon': 'OTHER',
  'carp': 'OTHER',
  'catfish': 'OTHER',
  'crappie': 'OTHER',
  'bluegill': 'OTHER',
  'eel': 'OTHER',
  'drum': 'OTHER',
}

const GROUP_LABELS_FR: Record<SpeciesGroup, string> = {
  ALL: 'Toutes',
  TROUT: 'Truite / Saumon',
  BASS: 'Achigan',
  PIKE: 'Brochet / Maskinongé',
  WALLEYE: 'Doré',
  OTHER: 'Autres',
}
const GROUP_LABELS_EN: Record<SpeciesGroup, string> = {
  ALL: 'All',
  TROUT: 'Trout / Salmon',
  BASS: 'Bass',
  PIKE: 'Pike / Muskie',
  WALLEYE: 'Walleye',
  OTHER: 'Other',
}
const GROUPS_ORDER: SpeciesGroup[] = ['ALL', 'TROUT', 'BASS', 'PIKE', 'WALLEYE', 'OTHER']

const monthNamesFr = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
const monthNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface SpeciesSectionProps {
  onScrollToArsenal: (speciesId: string) => void
  locale: 'fr' | 'en'
  initialSpecies?: string
}

export function SpeciesSection({ onScrollToArsenal, locale, initialSpecies }: SpeciesSectionProps) {
  const [activeGroup, setActiveGroup] = useState<SpeciesGroup>('ALL')
  const [activeSpecies, setActiveSpecies] = useState(initialSpecies || speciesData[0].id)
  const [showAllLures, setShowAllLures] = useState(false)

  const filteredSpecies = activeGroup === 'ALL'
    ? speciesData
    : speciesData.filter(sp => (SPECIES_GROUPS[sp.id] || 'OTHER') === activeGroup)

  const groupLabels = locale === 'fr' ? GROUP_LABELS_FR : GROUP_LABELS_EN

  const species = speciesData.find(s => s.id === activeSpecies) || speciesData[0]
  const monthNames = locale === 'fr' ? monthNamesFr : monthNamesEn

  const activityLabels: Record<ActivityLevel, string> = locale === 'fr'
    ? { HOT: 'HOT', ACTIVE: 'ACTIF', SLOW: 'LENT', CLOSED: 'FERMÉ' }
    : { HOT: 'HOT', ACTIVE: 'ACTIVE', SLOW: 'SLOW', CLOSED: 'CLOSED' }

  const displayName = locale === 'fr' ? species.nameFr : species.nameEn
  const tagline = locale === 'fr' ? species.taglineFr : species.tagline
  const appearance = locale === 'fr' ? species.appearanceFr : species.appearance
  const habitat = locale === 'fr' ? species.habitatFr : species.habitat
  const record = locale === 'fr' ? species.quebecRecordFr : species.quebecRecord
  const legalSize = locale === 'fr' ? (species.legalSizeFr || species.legalSize) : species.legalSize
  const possessionNote = locale === 'fr' ? (species.possessionNoteFr || species.possessionNote) : species.possessionNote
  const bestMonths = locale === 'fr' ? species.bestMonthsFr : species.bestMonths
  const proTips = locale === 'fr' && species.proTipsFr ? species.proTipsFr : species.proTips

  const visibleLures = showAllLures ? species.bestLures : species.bestLures.slice(0, 12)

  return (
    <div
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem 3rem',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2rem', paddingTop: '2rem' }}>
        <p className="eyebrow">
          {locale === 'fr' ? 'Encyclopédie des espèces' : 'Species Encyclopedia'}
        </p>
        <h2 style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 'var(--headline)',
          color: 'var(--text)',
          margin: '0.5rem 0 0',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          {locale === 'fr' ? 'Espèces du Québec' : 'Quebec Species'}
        </h2>
        <p style={{ color: 'var(--muted-text)', fontSize: 'var(--small)', marginTop: '0.5rem' }}>
          {locale === 'fr'
            ? '21 espèces en ordre alphabétique · Données complètes · FR/EN'
            : '21 species alphabetically · Complete data · FR/EN'}
        </p>
      </div>

      {/* Group Filter Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginBottom: '1rem',
      }}>
        {GROUPS_ORDER.map((group) => {
          const isActive = activeGroup === group
          return (
            <button
              key={group}
              onClick={() => {
                setActiveGroup(group)
                // Auto-select first species in this group
                const firstInGroup = group === 'ALL'
                  ? speciesData[0]
                  : speciesData.find(sp => (SPECIES_GROUPS[sp.id] || 'OTHER') === group)
                if (firstInGroup) { setActiveSpecies(firstInGroup.id); setShowAllLures(false) }
              }}
              style={{
                padding: '0.35rem 0.85rem',
                background: isActive ? 'var(--accent)' : 'var(--surface-2)',
                color: isActive ? '#fff' : 'var(--muted-text)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '0px',
                fontSize: '0.7rem',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {groupLabels[group]}
            </button>
          )
        })}
      </div>

      {/* Species Tab Strip */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '0.5rem',
        marginBottom: '2rem',
        paddingBottom: '0.75rem',
        scrollbarWidth: 'thin',
      }}>
        {filteredSpecies.map((sp) => {
          const tabName = locale === 'fr' ? sp.nameFr.split(' / ')[0] : sp.nameEn
          const isActive = activeSpecies === sp.id
          return (
            <button
              key={sp.id}
              onClick={() => { setActiveSpecies(sp.id); setShowAllLures(false) }}
              style={{
                flexShrink: 0,
                padding: '0.5rem 1rem',
                background: isActive ? 'var(--accent)' : 'var(--surface)',
                color: isActive ? '#0D1418' : 'var(--muted-text)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '0px',
                fontSize: 'var(--eyebrow)',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tabName}
              {sp.catchRelease && (
                <span style={{ marginLeft: '0.4rem', opacity: 0.7, fontSize: '9px' }}>C&R</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Species Detail Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>

        {/* Left Column */}
        <div>
          {/* Species Image Placeholder */}
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            overflow: 'hidden',
          }}>
            <img
              src={`/images/fish/${species.imageFile}`}
              alt={displayName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = 'none'
                el.parentElement!.innerHTML = `<div style="color:var(--muted-text);font-size:3rem;text-align:center">🎣<br/><span style="font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase">${displayName}</span></div>`
              }}
            />
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: locale === 'fr' ? 'Nom scientifique' : 'Scientific name', value: species.scientificName, italic: true },
              { label: locale === 'fr' ? 'Taille moyenne' : 'Average size', value: species.avgSize },
              { label: locale === 'fr' ? 'Taille maximale' : 'Max size', value: species.maxSize },
              { label: locale === 'fr' ? "Temp. optimale" : 'Optimal temp.', value: species.waterTemp },
              { label: locale === 'fr' ? 'Meilleurs mois' : 'Best months', value: bestMonths },
              { label: locale === 'fr' ? 'Saison Québec' : 'Quebec season', value: species.quebecSeason },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: '0.6rem 0.75rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {stat.label}
                </span>
                <span style={{
                  color: 'var(--text)',
                  fontSize: 'var(--small)',
                  fontStyle: stat.italic ? 'italic' : 'normal',
                  fontWeight: stat.italic ? 300 : 400,
                }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Size / Regulations */}
          {legalSize && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(184,92,70,0.12)',
              border: '1px solid var(--danger)',
            }}>
              <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>
                {locale === 'fr' ? 'Taille légale' : 'Legal size'}
              </p>
              <p style={{ color: 'var(--text)', fontSize: 'var(--small)', margin: 0 }}>{legalSize}</p>
              {possessionNote && (
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', marginTop: '0.4rem', fontStyle: 'italic' }}>{possessionNote}</p>
              )}
            </div>
          )}

          {/* C&R Badge */}
          {species.catchRelease && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.6rem 0.75rem',
              background: 'rgba(126,166,106,0.15)',
              border: '1px solid var(--success)',
              textAlign: 'center',
            }}>
              <span style={{ color: 'var(--success)', fontSize: 'var(--small)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ♻ {locale === 'fr' ? 'Remise à l\'eau obligatoire' : 'Catch & Release Required'}
              </span>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Species Name & Tagline */}
          <div>
            <h3 style={{
              fontFamily: 'Newsreader, serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              color: 'var(--text)',
              margin: '0 0 0.25rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}>
              {displayName}
            </h3>
            <p style={{
              color: 'var(--accent)',
              fontSize: 'var(--small)',
              fontStyle: 'italic',
              margin: '0 0 0.75rem',
              lineHeight: 1.5,
            }}>
              {tagline}
            </p>
          </div>

          {/* Appearance */}
          <div>
            <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {locale === 'fr' ? 'Identification' : 'Identification'}
            </p>
            <p style={{ color: 'var(--text)', fontSize: 'var(--small)', lineHeight: 1.7, margin: 0 }}>{appearance}</p>
          </div>

          {/* Habitat */}
          <div>
            <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Habitat
            </p>
            <p style={{ color: 'var(--text)', fontSize: 'var(--small)', lineHeight: 1.7, margin: 0 }}>{habitat}</p>
          </div>

          {/* Monthly Activity */}
          <div>
            <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {locale === 'fr' ? 'Activité mensuelle' : 'Monthly Activity'}
            </p>
            <div style={{ display: 'flex', gap: '3px' }}>
              {species.monthlyActivity.map((level, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    style={{
                      height: '28px',
                      background: activityColors[level],
                      border: '1px solid var(--border)',
                      marginBottom: '4px',
                    }}
                    title={activityLabels[level]}
                  />
                  <span style={{ color: 'var(--muted-text)', fontSize: '9px', display: 'block' }}>
                    {monthNames[i]}
                  </span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              {(Object.entries(activityColors) as [ActivityLevel, string][]).map(([level, color]) => (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', background: color, border: '1px solid var(--border)' }} />
                  <span style={{ color: 'var(--muted-text)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {activityLabels[level]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quebec Record */}
          {record && (
            <div style={{
              padding: '1rem',
              background: 'var(--surface)',
              border: `1px solid ${species.quebecRecordOfficial ? 'var(--accent)' : 'var(--border)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                  {locale === 'fr' ? 'Record Québec' : 'Quebec Record'}
                </p>
                <span style={{
                  padding: '2px 6px',
                  background: species.quebecRecordOfficial ? 'var(--accent)' : 'var(--surface-2)',
                  color: species.quebecRecordOfficial ? '#0D1418' : 'var(--muted-text)',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {species.quebecRecordOfficial
                    ? (locale === 'fr' ? 'OFFICIEL' : 'OFFICIAL')
                    : (locale === 'fr' ? 'RAPPORTÉ' : 'REPORTED')}
                </span>
              </div>
              <p style={{ color: 'var(--text)', fontSize: 'var(--small)', margin: 0, lineHeight: 1.5 }}>{record}</p>
            </div>
          )}

          {/* Pro Tips */}
          <div>
            <p style={{ color: 'var(--accent)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {locale === 'fr' ? 'Conseils de pro' : 'Pro Tips'}
            </p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {proTips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    background: 'var(--accent)',
                    color: '#0D1418',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text)', fontSize: 'var(--small)', lineHeight: 1.6 }}>{tip}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Best Lures */}
          <div>
            <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {locale === 'fr' ? `Leurres & Montages (${species.bestLures.length})` : `Lures & Rigs (${species.bestLures.length})`}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {visibleLures.map((lure, i) => (
                <span
                  key={i}
                  style={{
                    padding: '0.3rem 0.6rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: 'var(--eyebrow)',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lure}
                </span>
              ))}
            </div>
            {species.bestLures.length > 12 && (
              <button
                onClick={() => setShowAllLures(!showAllLures)}
                style={{
                  marginTop: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontSize: 'var(--small)',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  letterSpacing: '0.05em',
                }}
              >
                {showAllLures
                  ? (locale === 'fr' ? '▲ Moins' : '▲ Show less')
                  : `▼ ${locale === 'fr' ? `Voir les ${species.bestLures.length - 12} autres` : `Show ${species.bestLures.length - 12} more`}`}
              </button>
            )}

            {/* Gear */}
            {species.gear && species.gear.length > 0 && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
                  {locale === 'fr' ? 'Équipement recommandé' : 'Recommended Gear'}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {species.gear.map((g, i) => (
                    <li key={i} style={{ color: 'var(--text)', fontSize: 'var(--small)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-alt)', marginTop: '2px' }}>—</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => onScrollToArsenal(species.id)}
              style={{
                marginTop: '0.75rem',
                padding: '0.6rem 1.25rem',
                background: 'var(--accent)',
                color: '#0D1418',
                border: 'none',
                fontSize: 'var(--eyebrow)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {locale === 'fr' ? 'Voir l\'arsenal →' : 'View arsenal →'}
            </button>
          </div>

          {/* Best Lakes */}
          {species.bestLakes && species.bestLakes.length > 0 && (
            <div>
              <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {locale === 'fr' ? 'Meilleurs plans d\'eau' : 'Best Lakes'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {species.bestLakes.map((lake, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: 'rgba(77,124,138,0.15)',
                      border: '1px solid var(--accent-alt)',
                      color: 'var(--text)',
                      fontSize: 'var(--eyebrow)',
                    }}
                  >
                    {lake}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tournaments */}
          {species.tournaments && species.tournaments.length > 0 && (
            <div>
              <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {locale === 'fr' ? 'Tournois 2026' : 'Tournaments 2026'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {species.tournaments.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.75rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ color: 'var(--text)', fontSize: 'var(--small)', fontWeight: 500, marginBottom: '0.2rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.05em' }}>
                      {t.date} · {t.location}
                    </div>
                    {t.notes && (
                      <div style={{ color: 'var(--warning)', fontSize: 'var(--eyebrow)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                        ⚠ {t.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
