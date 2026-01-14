import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../utils/supabase'

function EndorsementDisplay({ onEmptySquareClick }) {
  const [endorsements, setEndorsements] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    fetchEndorsements()
  }, [])

  const fetchEndorsements = async () => {
    try {
      const { data, error } = await supabase
        .from('endorsements')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEndorsements(data || [])
    } catch (err) {
      console.error('Error fetching endorsements:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create array of squares: existing endorsements + empty slots
  const totalSquares = Math.max(6, endorsements.length + 2) // At least 6 squares, or more if needed
  const squares = []
  
  // Add squares with logos
  endorsements.forEach((endorsement) => {
    squares.push({ type: 'logo', endorsement })
  })
  
  // Add empty squares with plus signs
  for (let i = endorsements.length; i < totalSquares; i++) {
    squares.push({ type: 'empty' })
  }

  if (loading) {
    return <div className="loading">Loading endorsements...</div>
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
        {squares.map((square, index) => (
          <div
            key={square.type === 'logo' ? square.endorsement.id : `empty-${index}`}
            onClick={() => {
              if (square.type === 'empty' && onEmptySquareClick) {
                onEmptySquareClick()
              }
            }}
            style={{
              minWidth: '150px',
              width: '150px',
              height: '150px',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: square.type === 'empty' ? 'pointer' : 'default',
              flexShrink: 0,
              position: 'relative',
              transition: 'opacity 0.2s',
              ...(square.type === 'empty' && {
                ':hover': {
                  opacity: 0.8
                }
              })
            }}
            onMouseEnter={(e) => {
              if (square.type === 'empty') {
                e.currentTarget.style.opacity = '0.8'
              }
            }}
            onMouseLeave={(e) => {
              if (square.type === 'empty') {
                e.currentTarget.style.opacity = '1'
              }
            }}
          >
            {square.type === 'logo' && square.endorsement.logo_url ? (
              <img
                src={square.endorsement.logo_url}
                alt={square.endorsement.brand_name}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain'
                }}
              />
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EndorsementDisplay
