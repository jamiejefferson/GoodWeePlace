import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleRegisterClick = (e) => {
    e.preventDefault()
    setIsMenuOpen(false)
    navigate('/forms?type=location')
  }

  const handleRequestClick = (e) => {
    e.preventDefault()
    setIsMenuOpen(false)
    navigate('/forms?type=sticker')
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div>
      <nav>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/target.png" 
              alt="Good Wee Place" 
              style={{ 
                height: '37px', 
                width: 'auto',
                display: 'block'
              }} 
            />
          </Link>
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 1001,
              position: 'relative'
            }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              // Close icon (X)
              <>
                <span style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: 'var(--color-black)',
                  transform: 'rotate(45deg) translate(8px, 8px)',
                  transition: 'transform 0.3s ease'
                }}></span>
                <span style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: 'var(--color-black)',
                  transform: 'rotate(-45deg) translate(-8px, 8px)',
                  transition: 'transform 0.3s ease'
                }}></span>
              </>
            ) : (
              // Hamburger icon
              <>
                <span style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: 'var(--color-black)',
                  transition: 'transform 0.3s ease'
                }}></span>
                <span style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: 'var(--color-black)',
                  transition: 'transform 0.3s ease'
                }}></span>
                <span style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: 'var(--color-black)',
                  transition: 'transform 0.3s ease'
                }}></span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        onClick={(e) => {
          // Close menu if clicking on the overlay background (not on menu items)
          if (e.target === e.currentTarget) {
            setIsMenuOpen(false)
          }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--color-white)',
          zIndex: 1000,
          display: isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '2rem',
          paddingLeft: 'var(--spacing-md)',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          overflow: 'hidden',
          overscrollBehavior: 'none'
        }}
      >
        <Link 
          to="/" 
          onClick={handleLinkClick}
          style={{ 
            display: 'block', 
            marginBottom: '2rem',
            textDecoration: 'none'
          }}
        >
          <img 
            src="/target.png" 
            alt="Good Wee Place" 
            style={{ 
              height: '60px', 
              width: 'auto',
              display: 'block'
            }} 
          />
        </Link>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'flex-start',
          width: '80vw',
          maxWidth: 'none'
        }}>
          <li style={{ margin: 0, padding: 0 }}>
            <Link
              to="/what-it-means"
              onClick={handleLinkClick}
              style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-black)',
                textDecoration: 'none',
                display: 'block',
                lineHeight: '1.1',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              What's a Good Wee Place?
            </Link>
          </li>
          <li style={{ margin: 0, padding: 0 }}>
            <button
              onClick={handleRegisterClick}
              style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-black)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                fontFamily: 'inherit',
                lineHeight: '1.1',
                textAlign: 'left',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Add Your Venue
            </button>
          </li>
          <li style={{ margin: 0, padding: 0 }}>
            <button
              onClick={handleRequestClick}
              style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-black)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                fontFamily: 'inherit',
                lineHeight: '1.1',
                textAlign: 'left',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Get Your Sticker
            </button>
          </li>
        </ul>
      </div>

      <main>
        {children}
      </main>

      <footer style={{
        padding: 'var(--spacing-md) 0',
        marginTop: 'var(--spacing-2xl)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Link
            to="/admin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-trans-blue)',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Login
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
