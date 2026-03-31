import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from '../motion/motionTokens'

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

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
            aria-expanded={isMenuOpen}
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMenuOpen(false)
            }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: motionTokens.duration.base, ease: motionTokens.ease.out }
            }
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--color-white)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '2rem',
              paddingLeft: 'var(--spacing-md)',
              overflow: 'hidden',
              overscrollBehavior: 'none'
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: motionTokens.duration.base, ease: motionTokens.ease.out, delay: 0.05 }
              }
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
            </motion.div>

            <motion.ul
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'flex-start',
                width: '80vw',
                maxWidth: 'none'
              }}
            >
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.out } },
                }}
                style={{ margin: 0, padding: 0 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              >
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
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  What&apos;s a Good Wee Place?
                </Link>
              </motion.li>

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.out } },
                }}
                style={{ margin: 0, padding: 0 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              >
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
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Add Your Venue
                </button>
              </motion.li>

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.out } },
                }}
                style={{ margin: 0, padding: 0 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              >
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
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Get Your Sticker
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

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
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <Link
            to="/press-release"
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-trans-blue)',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Press
          </Link>
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
