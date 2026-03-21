type Section = 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils'

interface SectionNavProps {
  active: Section
  onSelect: (s: Section) => void
  locale: 'fr' | 'en'
}

const sections: { id: Section; labelFr: string; labelEn: string; icon: string }[] = [
  { id: 'especes', labelFr: 'ESPÈCES', labelEn: 'SPECIES', icon: '🐟' },
  { id: 'arsenal', labelFr: 'ARSENAL', labelEn: 'GEAR', icon: '🎣' },
  { id: 'calendrier', labelFr: 'CALENDRIER', labelEn: 'CALENDAR', icon: '📅' },
  { id: 'conseils', labelFr: 'CONSEILS', labelEn: 'TIPS', icon: '💡' },
  { id: 'eaux', labelFr: 'EAUX', labelEn: 'WATERS', icon: '🗺️' },
]

export function SectionNav({ active, onSelect, locale }: SectionNavProps) {
  return (
    <div
      className="sticky top-[57px] z-30 py-3"
      style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.08em',
              background: active === s.id ? 'var(--accent)' : 'var(--surface)',
              color: active === s.id ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${active === s.id ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <span>{s.icon}</span>
            <span>{locale === 'fr' ? s.labelFr : s.labelEn}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
