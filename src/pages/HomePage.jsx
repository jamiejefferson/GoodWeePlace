import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { motionTokens } from '../motion/motionTokens'
import Map from '../components/Map/Map'
import { useVenues } from '../hooks/useVenues'
import EndorsementDisplay from '../components/EndorsementDisplay/EndorsementDisplay'
import QuoteDisplay from '../components/QuoteDisplay/QuoteDisplay'

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const { venues } = useVenues()

  // Handle hash navigation for backward compatibility
  useEffect(() => {
    if (location.hash === '#register') {
      navigate('/forms?type=location', { replace: true })
    } else if (location.hash === '#request') {
      navigate('/forms?type=sticker', { replace: true })
    }
  }, [location.hash, navigate])

  return (
    <div>
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <motion.img
            src="/Sticker.svg"
            alt="Good Wee Place"
            className="hero-image"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 10 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: [0, -8, 0] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: motionTokens.duration.slow, ease: motionTokens.ease.out },
                    scale: { duration: motionTokens.duration.slow, ease: motionTokens.ease.out },
                    y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
                  }
            }
          />

          <motion.p
            className="hero-text"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: motionTokens.duration.base, ease: motionTokens.ease.out, delay: 0.06 }
            }
          >
            A venture to help make life safer for trans and genderqueer people in Glasgow and beyond. Venues display our
            sticker to show they&apos;re a safe, welcoming space.
          </motion.p>
          
          <motion.div
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: motionTokens.duration.base, ease: motionTokens.ease.out, delay: 0.12 }
            }
          >
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { y: 0 }}>
              <Link className="cta-link" to="/what-it-means">
                What it means <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container">
          <Reveal as={motion.h2} className="section-heading">
            {venues.length > 0 ? `Visit one of ${venues.length} Good Wee Places` : 'Find a Good Wee Place'}
          </Reveal>
          <Reveal delay={0.05}>
            <Map />
          </Reveal>
        </div>
      </section>

      {/* Community Quotes Section */}
      <section className="section">
        <div className="container">
          <Reveal as={motion.h2} className="section-heading" style={{ marginBottom: '1rem' }}>
            From the community
          </Reveal>
          <Reveal delay={0.05}>
            <QuoteDisplay 
              onEmptyCardClick={() => {
                navigate('/forms?type=quote')
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* Endorsements Section */}
      <section className="section">
        <div className="container">
          <Reveal as={motion.h2} className="section-heading" style={{ marginBottom: '1rem' }}>
            Endorsed by
          </Reveal>
          <Reveal delay={0.05}>
            <EndorsementDisplay 
              onEmptySquareClick={() => {
                navigate('/forms?type=endorsement')
              }}
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default HomePage
