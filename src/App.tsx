import { useState, useRef, lazy, Suspense } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/Hero'
import { SectionNav } from './components/SectionNav'
import { HomeDescription } from './components/HomeDescription'
import { SiteFooter } from './components/SiteFooter'
import { useToast } from './components/Toast'

// Lazy-load all heavy sections to prevent startup crashes
const WatersMap = lazy(() => import('./components/WatersMap').then(m => ({ default: m.WatersMap })))
const SpeciesSection = lazy(() => import('./components/SpeciesSection').then(m => ({ default: m.SpeciesSection })))
const CalendarSection = lazy(() => import('./components/CalendarSection').then(m => ({ default: m.CalendarSection })))
const GearSection = lazy(() => import('./components/GearSection').then(m => ({ default: m.GearSection })))
const TipsSection = lazy(() => import('./components/TipsSection').then(m => ({ default: m.TipsSection })))

type Section = 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils'
type Locale = 'fr' | 'en'

interface WeatherRegion {
  lat: number
  lon: number
  label: string
}

const LoadingSection = () => (
  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
    Chargement...
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState<Section>('especes')
  const [gearSpeciesFilter, setGearSpeciesFilter] = useState<string | undefined>(undefined)
  const [locale, setLocale] = useState<Locale>('fr')
  const [weatherRegion, setWeatherRegion] = useState<WeatherRegion | undefined>(undefined)
  const [cartCount, setCartCount] = useState(0)
  const [activeSpecies, setActiveSpecies] = useState<string | undefined>(undefined)
  const { showToast, ToastComponent } = useToast()
  const mainRef = useRef<HTMLDivElement>(null)

  const handleSectionSelect = (section: Section) => {
    setActiveSection(section)
    setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleScrollToArsenal = (speciesId: string) => {
    setGearSpeciesFilter(speciesId)
    setActiveSection('arsenal')
    setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleViewGearFromWater = () => {
    setActiveSection('arsenal')
  }

  // FIX 7 — Shopify-ready cart with localStorage
  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    const cart = JSON.parse(localStorage.getItem('appat-cart') || '[]')
    const existing = cart.find((item: { id: string; qty: number }) => item.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ ...product, qty: 1 })
    }
    localStorage.setItem('appat-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
    showToast(locale === 'fr' ? `"${product.name}" ajouté au panier!` : `"${product.name}" added to cart!`)
  }

  // Legacy handler for GearSection which passes productName string
  const handleAddToCartLegacy = (productName: string) => {
    handleAddToCart({ id: productName, name: productName, price: 0 })
  }

  const handleLocaleToggle = () => {
    setLocale(l => l === 'fr' ? 'en' : 'fr')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <SiteHeader locale={locale} onLocaleToggle={handleLocaleToggle} cartCount={cartCount} />
      <Hero locale={locale} />
      <SectionNav active={activeSection} onSelect={handleSectionSelect} locale={locale} />
      <HomeDescription locale={locale} />
      <div ref={mainRef} style={{ paddingTop: '1rem' }}>
        <Suspense fallback={<LoadingSection />}>
          {activeSection === 'eaux' && (
            <WatersMap
              onViewGear={handleViewGearFromWater}
              locale={locale}
              onRegionChange={setWeatherRegion}
              onViewSpecies={(id) => { setActiveSpecies(id); handleSectionSelect('especes') }}
            />
          )}
          {activeSection === 'especes' && (
            <SpeciesSection onScrollToArsenal={handleScrollToArsenal} locale={locale} initialSpecies={activeSpecies} />
          )}
          {activeSection === 'calendrier' && (
            <CalendarSection locale={locale} weatherRegion={weatherRegion} />
          )}
          {activeSection === 'arsenal' && (
            <GearSection
              key={gearSpeciesFilter ?? 'all'}
              initialSpeciesFilter={gearSpeciesFilter}
              onAddToCart={handleAddToCart}
              locale={locale}
            />
          )}
          {activeSection === 'conseils' && (
            <TipsSection locale={locale} />
          )}
        </Suspense>
      </div>
      <SiteFooter
        locale={locale}
        onSectionChange={(s) => handleSectionSelect(s as Section)}
      />
      {ToastComponent}
    </div>
  )
}

export default App
