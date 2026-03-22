type Section = 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils'

interface SectionNavProps {
  active: Section
  onSelect: (s: Section) => void
  locale: 'fr' | 'en'
}

const sections: { id: Section; labelFr: string; labelEn: string }[] = [
  { id: 'especes', labelFr: 'Espèces', labelEn: 'Species' },
  { id: 'arsenal', labelFr: 'Arsenal', labelEn: 'Gear' },
  { id: 'calendrier', labelFr: 'Calendrier', labelEn: 'Calendar' },
  { id: 'conseils', labelFr: 'Conseils', labelEn: 'Tips' },
  { id: 'eaux', labelFr: 'Eaux', labelEn: 'Waters' },
]

export function SectionNav({ active, onSelect, locale }: SectionNavProps) {
  return (
    <div
      className="sticky top-[65px] z-30 py-0"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex gap-0 overflow-x-auto px-0 scrollbar-hide">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              flex: 'none',
              padding: '0.85rem 1.5rem',
              background: 'transparent',
              color: active === s.id ? 'var(--text)' : 'var(--muted-text)',
              border: 'none',
              borderBottom: active === s.id ? '2px solid var(--accent)' : '2px solid transparent',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--eyebrow)',
              fontWeight: active === s.id ? 700 : 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {locale === 'fr' ? s.labelFr : s.labelEn}
          </button>
        ))}
      </div>
    </div>
  )
}
