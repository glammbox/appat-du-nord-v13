interface HomeDescriptionProps {
  locale: 'fr' | 'en'
}

export function HomeDescription({ locale }: HomeDescriptionProps) {
  const t = {
    title: locale === 'fr' ? 'TOUT CE DONT VOUS AVEZ BESOIN' : 'EVERYTHING YOU NEED',
    p1fr: <><strong style={{ color: 'var(--accent-gold)' }}>Appât du Nord</strong> est le portail de pêche complet pour le Québec. 21 espèces documentées, 41 plans d'eau cartographiés, règlements à jour, météo en temps réel et équipement livré chez vous — tout en un seul endroit.</>,
    p1en: <><strong style={{ color: 'var(--accent-gold)' }}>Appât du Nord</strong> is Quebec's complete fishing portal. 21 documented species, 41 mapped water bodies, up-to-date regulations, real-time weather and gear delivered to your door — all in one place.</>,
    p2fr: "Chaque fiche espèce comprend les meilleures saisons, les leurres qui produisent, les lacs où elle se trouve, les techniques éprouvées et les règlements en vigueur. Du saumon atlantique à l'esturgeon, chaque poisson a sa page complète.",
    p2en: "Every species profile includes peak seasons, top-producing lures, the lakes where it lives, proven techniques, and current regulations. From Atlantic salmon to lake sturgeon, every fish gets its own complete page.",
    p3fr: "Nos 41 plans d'eau couvrent tout le Québec, avec coordonnées GPS, mises à l'eau, conditions saisonnières, météo intégrée et les espèces présentes dans chaque lac. Cliquez sur un lac — tout y est.",
    p3en: "Our 41 water bodies cover all of Quebec, with GPS coordinates, boat launches, seasonal conditions, integrated weather and every species present in each lake. Click a lake — everything is there.",
    p4fr: "L'Arsenal présente plus de 160 produits triés par espèce : leurres, hameçons, lignes, équipement complet. Chaque produit est lié directement aux meilleurs pêcheurs d'Amazon.ca. Ajoutez au panier, recevez à la maison.",
    p4en: "The Arsenal features over 160 products sorted by species: lures, hooks, lines, complete gear. Every product links directly to top-rated items on Amazon.ca. Add to cart, receive at home.",
    p5fr: "Le Calendrier suit vos conditions de pêche en temps réel : météo locale, score de pêche du jour, prévisions 7 jours et calendrier mensuel par région. Planifiez votre sortie avec les bonnes données.",
    p5en: "The Calendar tracks your fishing conditions in real time: local weather, daily fishing score, 7-day forecast and monthly calendar by region. Plan your outing with the right data.",
    p6fr: "Consultez aussi les tournois 2026–2027, les guides de pêche par région, les règlements du MRNF avec alertes saisonnières, et la bibliothèque des espèces avec fiches complètes FR/EN.",
    p6en: "Also browse 2026–2027 tournaments, regional fishing guides, MRNF regulations with seasonal alerts, and the complete species library with full FR/EN profiles.",
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
            <p>{locale === 'fr' ? t.p4fr : t.p4en}</p>
            <p>{locale === 'fr' ? t.p5fr : t.p5en}</p>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {locale === 'fr' ? t.p6fr : t.p6en}
            </p>
          </div>
        </div>

        {/* RIGHT — Tall vertical photo */}
        <div>
          <img
            src="/images/hero/fisherman-vertical.jpg"
            alt={locale === 'fr' ? 'Pêcheur au bord du lac' : 'Angler fishing at the lake'}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              borderRadius: '8px',
              display: 'block',
              minHeight: '400px',
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
