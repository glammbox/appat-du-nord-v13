import { useState } from 'react'
import { waters, Water } from '../lib/waters'
import { WaterDetailPanel } from './WaterDetailPanel'

// FIX 2 — Region coords for weather integration
const waterRegionCoords: Record<string, { lat: number; lon: number; label: string }> = {
  "fleuve-stlaurent-ouest": { lat: 45.55, lon: -73.55, label: "Montréal / Saint-Laurent Ouest" },
  "lac-saint-pierre": { lat: 46.20, lon: -72.85, label: "Sorel-Tracy / Lac Saint-Pierre" },
  "riviere-outaouais": { lat: 45.48, lon: -75.70, label: "Gatineau / Outaouais" },
  "lac-deux-montagnes": { lat: 45.45, lon: -74.00, label: "Oka / Lac des Deux Montagnes" },
  "reservoir-gouin": { lat: 48.35, lon: -74.98, label: "La Tuque / Réservoir Gouin" },
  "lac-saint-jean": { lat: 48.52, lon: -72.00, label: "Roberval / Lac Saint-Jean" },
  "lac-memphremagog": { lat: 45.12, lon: -72.23, label: "Magog / Lac Memphrémagog" },
  "lac-champlain": { lat: 45.05, lon: -73.12, label: "Venise-en-Québec" },
  "riviere-richelieu": { lat: 45.32, lon: -73.27, label: "Saint-Jean-sur-Richelieu" },
  "fleuve-stlaurent-est": { lat: 47.80, lon: -69.54, label: "Rivière-du-Loup / Saint-Laurent Est" },
  "riviere-gatineau": { lat: 46.50, lon: -75.50, label: "Gatineau / Hull" },
  "riviere-saint-maurice": { lat: 47.50, lon: -73.50, label: "Shawinigan / Saint-Maurice" },
  "lac-temiscamingue": { lat: 47.20, lon: -79.50, label: "Ville-Marie / Témiscamingue" },
  "lac-abitibi": { lat: 48.70, lon: -79.20, label: "La Sarre / Abitibi" },
  "lac-massawippi": { lat: 45.05, lon: -71.95, label: "North Hatley / Estrie" },
  "fleuve-stlaurent-central": { lat: 46.40, lon: -72.50, label: "Trois-Rivières / Saint-Laurent Central" },
  "riviere-rouge": { lat: 46.40, lon: -74.80, label: "L'Annonciation / Laurentides" },
  "lac-des-seize-iles": { lat: 46.10, lon: -74.70, label: "Labelle / Laurentides" },
  "lac-saint-francois": { lat: 45.15, lon: -74.50, label: "Salaberry-de-Valleyfield" },
  "riviere-madeleine": { lat: 48.90, lon: -65.50, label: "Gaspé / Côte Gaspésienne" },
}

interface WatersMapProps {
  onViewGear?: () => void
  locale: 'fr' | 'en'
  onRegionChange?: (region: { lat: number; lon: number; label: string }) => void
  onViewSpecies?: (id: string) => void
}

export function WatersMap({ onViewGear, locale, onRegionChange, onViewSpecies }: WatersMapProps) {
  const [selectedWater, setSelectedWater] = useState<Water | null>(null)

  const handleWaterClick = (water: Water) => {
    setSelectedWater(water)
    // FIX 2 — Notify parent of region change for weather
    const regionCoords = waterRegionCoords[water.id]
    if (regionCoords && onRegionChange) {
      onRegionChange(regionCoords)
    }
    setTimeout(() => {
      document.getElementById('water-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Build OpenStreetMap URL — zooms to selected water or shows all Quebec
  const mapLat = selectedWater ? (waterRegionCoords[selectedWater.id]?.lat ?? 52) : 52
  const mapLon = selectedWater ? (waterRegionCoords[selectedWater.id]?.lon ?? -72) : -72
  const mapZoom = selectedWater ? 10 : 5
  const mapUrl = selectedWater
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${mapLon - 1}%2C${mapLat - 0.7}%2C${mapLon + 1}%2C${mapLat + 0.7}&layer=mapnik&marker=${mapLat}%2C${mapLon}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-80%2C44%2C-57%2C63&layer=mapnik`

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 2rem' }}>
      <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        {locale === 'fr' ? "PLANS D'EAU DU QUÉBEC" : 'QUEBEC WATER BODIES'}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {locale === 'fr'
          ? "Sélectionnez un plan d'eau — la carte se déplace automatiquement"
          : 'Select a body of water — the map moves automatically'}
      </p>

      {/* Real OpenStreetMap — zooms to selected water */}
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <iframe
          key={`${mapLat}-${mapLon}-${mapZoom}`}
          src={mapUrl}
          title={locale === 'fr' ? 'Carte du Québec' : 'Quebec Map'}
          width="100%"
          height="380"
          style={{ display: 'block', border: 'none' }}
          loading="lazy"
        />
      </div>

      {/* Water selector grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {waters.map((water) => (
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
            <div style={{ fontWeight: 600, marginBottom: '0.15rem', fontSize: '0.8rem' }}>{water.name}</div>
            <div style={{ color: selectedWater?.id === water.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', fontSize: '0.7rem' }}>
              {water.species.slice(0, 3).join(' · ')}
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div id="water-detail">
        {selectedWater ? (
          <WaterDetailPanel water={selectedWater} onViewGear={onViewGear ?? (() => {})} onClose={() => setSelectedWater(null)} locale={locale} onViewSpecies={onViewSpecies} />
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
            {/* FIX 8 — Bilingual prompt */}
            {locale === 'fr'
              ? "👆 Sélectionnez un plan d'eau pour voir les espèces, les mises à l'eau et l'équipement"
              : '👆 Select a body of water to see species, launches and gear'}
          </div>
        )}
      </div>
    </div>
  )
}
