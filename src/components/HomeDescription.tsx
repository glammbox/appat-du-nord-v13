interface HomeDescriptionProps {
  locale: 'fr' | 'en'
}

export function HomeDescription({ locale }: HomeDescriptionProps) {
  const t = {
    title: locale === 'fr' ? 'LE QUÉBEC À VOTRE PORTÉE' : 'QUEBEC AT YOUR FINGERTIPS',
    p1fr: <><strong style={{ color: 'var(--accent-gold)' }}>Appât du Nord</strong> est votre portail de pêche tout-en-un pour le Québec. Conçu par des pêcheurs passionnés, pour des pêcheurs passionnés.</>,
    p1en: <><strong style={{ color: 'var(--accent-gold)' }}>Appât du Nord</strong> is your all-in-one fishing portal for Quebec. Built by passionate anglers, for passionate anglers.</>,
    p2fr: "Ici, vous trouverez tout ce dont vous avez besoin avant de mettre votre bateau à l'eau : les espèces présentes dans chaque plan d'eau, les conditions saisonnières, les meilleurs leurres par espèce, les mises à l'eau accessibles, et l'équipement de qualité livré directement chez vous.",
    p2en: "Here you'll find everything you need before launching your boat: species in each water body, seasonal conditions, best lures by species, accessible boat launches, and quality gear delivered to your door.",
    p3fr: <>"Notre priorité ? <strong style={{ color: 'var(--accent)' }}>Le maskinongé.</strong> Ce géant des eaux douces qui hante le Saint-Laurent, l'Outaouais et le Lac des Deux Montagnes. Mais pas seulement — grand brochet, achigan, doré jaune, truite mouchetée et esturgeon : le Québec est une province de pêcheurs, et Appât du Nord est leur quartier général.</>,
    p3en: <>"Our priority? <strong style={{ color: 'var(--accent)' }}>Muskellunge.</strong> The giant of freshwater, haunting the St. Lawrence, Outaouais and Lac des Deux Montagnes. But not only — northern pike, bass, walleye, speckled trout and sturgeon: Quebec is a fishing province, and Appât du Nord is their headquarters.</>,
    p4fr: "Explorez nos 41 plans d'eau, consultez nos fiches espèces, préparez votre saison.",
    p4en: "Explore our 41 water bodies, browse species profiles, and plan your season.",
    p5fr: "Appât du Nord grandit avec une vision simple : commencer fort au Québec, puis étendre cette même qualité de contenu vers l'Ontario et, un jour, partout au Canada. On veut bâtir une plateforme utile terrain par terrain, espèce par espèce, sans perdre l'ADN local qui fait la vraie différence.",
    p5en: "Appât du Nord is growing with a simple vision: start strong in Quebec, then bring that same level of quality to Ontario and, eventually, across Canada. The goal is to build a platform that stays useful water by water and species by species without losing the local DNA that matters most.",
    p6fr: "La pêche se transmet mieux quand les pêcheurs partagent entre eux. Avec le temps, Appât du Nord veut mettre en valeur les observations du terrain, les habitudes saisonnières, les mises à l'eau, les leurres qui produisent et les petits détails qu'on apprend normalement après des années sur l'eau.",
    p6en: "Fishing knowledge gets better when anglers share what they learn. Over time, Appât du Nord aims to highlight on-the-water observations, seasonal patterns, launches, productive lures, and the small details that usually take years to figure out.",
    p7fr: "On croit aussi qu'une bonne journée de pêche commence par des décisions prudentes. Météo, vent, pluie, niveau de confort, sécurité sur l'eau et préparation du trajet comptent autant que le choix du leurre. Mieux lire les conditions, c'est non seulement pêcher mieux, c'est revenir au quai en sécurité.",
    p7en: "We also believe a good fishing day starts with smart decisions. Weather, wind, rain, comfort level, on-water safety, and trip planning matter just as much as lure choice. Reading conditions better does not only help you catch more fish — it helps you get back to the launch safely.",
    stat1: locale === 'fr' ? "Plans d'eau" : 'Water Bodies',
    stat2: locale === 'fr' ? 'Espèces' : 'Species',
    stat3: locale === 'fr' ? 'Produits' : 'Products',
    footer: locale === 'fr'
      ? '🇨🇦 Données conformes aux règlements de pêche du Québec · Saison 2026'
      : '🇨🇦 Data compliant with Quebec fishing regulations · Season 2026',
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top section: 2-column grid — text left, tall photo right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'flex-start',
        }}
        className="home-description-top"
      >
        {/* LEFT — Text content */}
        <div>
          <h2
            className="text-3xl font-bold mb-5"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)', letterSpacing: '0.05em' }}
          >
            {t.title}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>{locale === 'fr' ? t.p1fr : t.p1en}</p>
            <p>{locale === 'fr' ? t.p2fr : t.p2en}</p>
            <p>{locale === 'fr' ? t.p3fr : t.p3en}</p>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {locale === 'fr' ? t.p4fr : t.p4en}
            </p>
            <p>{locale === 'fr' ? t.p5fr : t.p5en}</p>
            <p>{locale === 'fr' ? t.p6fr : t.p6en}</p>
            <p>{locale === 'fr' ? t.p7fr : t.p7en}</p>
          </div>
        </div>

        {/* RIGHT — Tall vertical photo */}
        <div>
          <img
            src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
            alt={locale === 'fr' ? 'Pêcheur dans la nature québécoise' : 'Fisherman in Quebec nature'}
            style={{
              height: '400px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Bottom — Stats row, full width, 3 cards side by side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {[
          { label: t.stat1, value: '41' },
          { label: t.stat2, value: '21' },
          { label: t.stat3, value: '162' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-4 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--accent-gold)' }}
            >
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        className="rounded-lg p-3 text-xs mt-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
      >
        {t.footer}
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .home-description-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
