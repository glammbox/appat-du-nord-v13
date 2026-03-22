import { useState, useEffect } from 'react'

const books = [
  { id: 'muskie', title: 'Maskinongé', subtitle: 'Le géant des eaux', emoji: '🐟', file: '/guides/book-muskie.md' },
  { id: 'pike', title: 'Grand Brochet', subtitle: 'Le prédateur des marais', emoji: '🐠', file: '/guides/book-pike.md' },
  { id: 'walleye', title: 'Doré Jaune', subtitle: 'Le roi de la nuit', emoji: '🐡', file: '/guides/book-walleye.md' },
  { id: 'trout', title: 'Truite & Omble', subtitle: 'Les joyaux des rivières', emoji: '🎣', file: '/guides/book-trout.md' },
  { id: 'bass', title: 'Achigan', subtitle: 'Le combattant des lacs', emoji: '🐠', file: '/guides/book-bass.md' },
]

interface GuidesSectionProps {
  locale?: 'fr' | 'en'
}

export function GuidesSection({ locale = 'fr' }: GuidesSectionProps) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [bookContent, setBookContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedBook) return
    const book = books.find(b => b.id === selectedBook)
    if (!book) return
    setLoading(true)
    setBookContent('')
    fetch(book.file)
      .then(r => r.text())
      .then(text => { setBookContent(text); setLoading(false) })
      .catch(() => { setBookContent(locale === 'fr' ? 'Erreur de chargement du guide.' : 'Failed to load guide.'); setLoading(false) })
  }, [selectedBook, locale])

  const selectedBookData = books.find(b => b.id === selectedBook)

  // Render markdown-ish content (headings, paragraphs)
  function renderContent(md: string) {
    const lines = md.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={i} style={{
            fontFamily: 'Newsreader, serif',
            fontSize: '1.2rem',
            color: '#C0392B',
            margin: '1.5rem 0 0.5rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderBottom: '1px solid #2a3540',
            paddingBottom: '0.3rem',
          }}>
            {line.replace(/^## /, '')}
          </h3>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h2 key={i} style={{
            fontFamily: 'Newsreader, serif',
            fontSize: '1.6rem',
            color: 'var(--text)',
            margin: '0 0 1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>
            {line.replace(/^# /, '')}
          </h2>
        )
      } else if (line.trim().startsWith('- ')) {
        // Collect list items
        const items: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().replace(/^- /, ''))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
            {items.map((item, j) => (
              <li key={j} style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.2rem' }}>
                {item}
              </li>
            ))}
          </ul>
        )
        continue
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} style={{
            color: 'var(--text)',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            margin: '0 0 0.75rem',
          }}>
            {line}
          </p>
        )
      }
      i++
    }
    return elements
  }

  return (
    <div
      id="guides"
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '3rem 1.5rem',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="eyebrow">
          {locale === 'fr' ? 'Bibliothèque de pêche' : 'Fishing Library'}
        </p>
        <h2 style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 'var(--headline)',
          color: 'var(--text)',
          margin: '0.5rem 0 0',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          {locale === 'fr' ? 'Guides des Espèces' : 'Species Guides'}
        </h2>
        <p style={{ color: 'var(--muted-text)', fontSize: 'var(--small)', marginTop: '0.5rem' }}>
          {locale === 'fr'
            ? '5 guides complets · Comportement · Habitat · Techniques · FR/EN'
            : '5 complete guides · Behavior · Habitat · Techniques · FR/EN'}
        </p>
      </div>

      {/* Book Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: selectedBook ? '2rem' : '0',
      }}>
        {books.map((book) => {
          const isActive = selectedBook === book.id
          return (
            <div
              key={book.id}
              style={{
                background: isActive ? 'rgba(192,57,43,0.12)' : 'var(--surface)',
                border: `1px solid ${isActive ? '#C0392B' : 'var(--border)'}`,
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{book.emoji}</div>
              <div>
                <div style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: '1.1rem',
                  color: 'var(--text)',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                }}>
                  {book.title}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--muted-text)',
                  fontStyle: 'italic',
                  letterSpacing: '0.03em',
                }}>
                  {book.subtitle}
                </div>
              </div>
              <button
                onClick={() => setSelectedBook(isActive ? null : book.id)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: isActive ? '#C0392B' : 'var(--surface-2)',
                  color: isActive ? '#fff' : 'var(--accent)',
                  border: `1px solid ${isActive ? '#C0392B' : 'var(--border)'}`,
                  fontSize: '0.72rem',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
              >
                {isActive
                  ? (locale === 'fr' ? '✕ Fermer' : '✕ Close')
                  : (locale === 'fr' ? 'Lire le guide →' : 'Read guide →')}
              </button>
            </div>
          )
        })}
      </div>

      {/* Book Content Panel */}
      {selectedBook && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #C0392B',
          padding: '2rem',
          maxHeight: '70vh',
          overflowY: 'auto',
          scrollbarColor: '#C0392B #1a1a1a',
          scrollbarWidth: 'thin',
        }}>
          {/* Panel header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{selectedBookData?.emoji}</span>
              <div>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: '1.25rem', color: 'var(--text)', fontWeight: 600 }}>
                  {selectedBookData?.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontStyle: 'italic' }}>
                  {selectedBookData?.subtitle}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedBook(null)}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--muted-text)',
                padding: '0.35rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {locale === 'fr' ? 'Fermer ✕' : 'Close ✕'}
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--muted-text)', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
              {locale === 'fr' ? 'Chargement...' : 'Loading...'}
            </div>
          ) : (
            <div>{renderContent(bookContent)}</div>
          )}
        </div>
      )}
    </div>
  )
}
