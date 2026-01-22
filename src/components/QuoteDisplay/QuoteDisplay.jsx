import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../utils/supabase'

function QuoteDisplay({ onEmptyCardClick }) {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('community_quotes')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuotes(data || [])
    } catch (err) {
      console.error('Error fetching quotes:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading quotes...</div>
  }

  return (
    <div>
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '1rem 0',
          scrollbarWidth: 'thin',
          scrollbarColor: '#666 #f0f0f0',
          WebkitOverflowScrolling: 'touch'
        }}
        onWheel={(e) => {
          // Horizontal scrolling with mouse wheel
          if (e.deltaY !== 0) {
            e.preventDefault()
            scrollContainerRef.current.scrollLeft += e.deltaY
          }
        }}
      >
        {/* Empty card with plus sign - always first */}
        <div
          onClick={onEmptyCardClick}
          style={{
            minWidth: '420px',
            width: '420px',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            padding: '2rem',
            transition: 'opacity 0.2s',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: '3rem',
              fontWeight: '300',
              lineHeight: '1'
            }}
          >
            +
          </span>
          <span
            style={{
              color: '#fff',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-bold)',
              textAlign: 'center'
            }}
          >
            Add your voice
          </span>
        </div>

        {/* Quote cards */}
        {quotes.map((quote) => (
          <div
            key={quote.id}
            style={{
              minWidth: '420px',
              width: '420px',
              backgroundColor: '#fff',
              border: '1px solid #000',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              gap: '0.75rem'
            }}
          >
            <p className="text-body-large" style={{ margin: 0, fontSize: '1.25rem' }}>
              "{quote.quote}"
            </p>
            {(quote.nickname || quote.instagram_handle) && (
              <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                {quote.nickname && (
                  <p style={{ 
                    fontSize: 'var(--font-size-base)', 
                    fontWeight: 'var(--font-weight-bold)',
                    margin: 0,
                    marginBottom: quote.instagram_handle ? '0.25rem' : 0
                  }}>
                    — {quote.nickname}
                  </p>
                )}
                {quote.instagram_handle && (
                  <a
                    href={`https://instagram.com/${quote.instagram_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-trans-blue)',
                      textDecoration: 'none'
                    }}
                  >
                    @{quote.instagram_handle.replace('@', '')}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuoteDisplay
