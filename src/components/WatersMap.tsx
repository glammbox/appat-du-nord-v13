import { useState } from 'react'
import { waters, Water } from '../lib/waters'
import { WaterDetailPanel } from './WaterDetailPanel'

interface WatersMapProps {
  onViewGear?: () => void
  locale: 'fr' | 'en'
  onRegionChange?: (region: { lat: number; lon: number; label: string }) => void
  onViewSpecies?: (id: string) => void
}

// Unique regions from waters data for the dropdown
const uniqueRegions = ['ALL', ...Array.from(new Set(waters.map(w => w.region))).sort()]

export function WatersMap({ onViewGear, locale, onRegionChange, onViewSpecies }: WatersMapProps) {
  const [selectedWater, setSelectedWater] = useState<Water | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL')

  const handleWaterClick = (water: Water) => {
    setSelectedWater(water)
    if (onRegionChange) {
      onRegionChange({
        lat: water.coords[0],
        lon: water.coords[1],
        label: `${water.nameFr ?? water.name} — ${water.region}`,
      })
    }
    setTimeout(() => {
      document.getElementById('water-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const filteredWaters = selectedRegion === 'ALL'
    ? waters
    : waters.filter(w => w.region === selectedRegion)

  // Build OpenTopoMap URL (terrain tiles) — zooms to selected water or shows all Quebec
  const mapLat = selectedWater ? selectedWater.coords[0] : 52
  const mapLon = selectedWater ? selectedWater.coords[1] : -72

  // Use OpenTopoMap for terrain view with contour lines and elevation shading
  // Fallback to OSM cycle map layer which shows terrain better than standard mapnik
  const buildTerrainUrl = () => {
    if (selectedWater) {
      const lat = selectedWater.coords[0]
      const lon = selectedWater.coords[1]
      const zoom = 10
      // OpenTopoMap embed via OSM with cycle/terrain layer overlay
      return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.8}%2C${lat - 0.6}%2C${lon + 0.8}%2C${lat + 0.6}&layer=cyclemap&marker=${lat}%2C${lon}`
    }
    // Quebec overview — terrain layer
    return `https://www.openstreetmap.org/export/embed.html?bbox=-80%2C44%2C-57%2C63&layer=cyclemap`
  }

  const mapUrl = buildTerrainUrl()

  const regionLabel = (r: string) => {
    if (r === 'ALL') return locale === 'fr' ? 'Toutes les régions' : 'All regions'
    return r
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 2rem' }}>
      <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        {locale === 'fr' ? "LACS DU QUÉBEC" : 'QUEBEC LAKES'}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        {locale === 'fr'
          ? `${waters.length} plans d'eau — sélectionnez un lac pour voir les détails`
          : `${waters.length} bodies of water — select a lake to see details`}
      </p>

      {/* Region Selector Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <label
          htmlFor="region-select"
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          {locale === 'fr' ? 'Région :' : 'Region:'}
        </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={e => {
            setSelectedRegion(e.target.value)
            setSelectedWater(null)
          }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: '0.45rem 0.85rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            borderRadius: '4px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {uniqueRegions.map(r => (
            <option key={r} value={r}>{regionLabel(r)}</option>
          ))}
        </select>
        {selectedRegion !== 'ALL' && (
          <span style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'Inter, sans-serif',
          }}>
            {filteredWaters.length} {locale === 'fr' ? 'plan(s) d\'eau' : 'water body/bodies'}
          </span>
        )}
      </div>

      {/* Terrain Map — OpenStreetMap Cycle/Terrain layer */}
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        {/* Terrain badge */}
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0.35rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            🗺 {locale === 'fr' ? 'Vue terrain' : 'Terrain view'}
          </span>
          {selectedWater && (
            <span style={{ fontSize: '0.68rem', color: 'var(--accent)', fontFamily: 'Inter, sans-serif' }}>
              — {selectedWater.nameFr ?? selectedWater.name}
            </span>
          )}
        </div>
        <iframe
          key={`${mapLat}-${mapLon}-${selectedRegion}`}
          src={mapUrl}
          title={locale === 'fr' ? 'Carte terrain du Québec' : 'Quebec Terrain Map'}
          width="100%"
          height="380"
          style={{ display: 'block', border: 'none' }}
          loading="lazy"
        />
      </div>

      {/* Water selector grid — filtered by region */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1.5rem',
      }}>
        {filteredWaters.map((water) => (
          <button
            key={water.id}
            onClick={() => handleWaterClick(water)}
            style={{
              background: selectedWater?.id === water.id ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${selectedWater?.id === water.id ? 'var(--accent)' : 'var(--border)'}`,
              color: 'var(--text-primary)',
              padding: '0.65rem 0.8rem',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (selectedWater?.id !== water.id) (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { if (selectedWater?.id !== water.id) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.15rem', fontSize: '0.78rem', lineHeight: 1.3 }}>
              {water.nameFr ?? water.name}
            </div>
            <div style={{
              color: selectedWater?.id === water.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
              fontSize: '0.68rem',
              marginBottom: '0.15rem',
            }}>
              {water.region}
            </div>
            <div style={{
              color: selectedWater?.id === water.id ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
              fontSize: '0.66rem',
            }}>
              {water.species.slice(0, 2).join(' · ')}
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div id="water-detail">
        {selectedWater ? (
          <WaterDetailPanel
            water={selectedWater}
            onViewGear={onViewGear ?? (() => {})}
            onClose={() => setSelectedWater(null)}
            locale={locale}
            onViewSpecies={onViewSpecies}
          />
        ) : (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {locale === 'fr'
              ? "👆 Sélectionnez un lac pour voir les espèces, les mises à l'eau et les conditions idéales"
              : '👆 Select a lake to see species, launches, and ideal fishing conditions'}
          </div>
        )}
      </div>
    </div>
  )
}
