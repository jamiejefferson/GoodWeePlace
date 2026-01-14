import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Map from '../components/Map/Map'
import EndorsementDisplay from '../components/EndorsementDisplay/EndorsementDisplay'

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()

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
          <img
            src="/Sticker.svg"
            alt="Good Wee Place"
            className="hero-image"
          />
          <p className="hero-text">
            A venture to help make life safer for trans and genderqueer people in Glasgow and beyond.
            Venues display our sticker to show they're a safe, welcoming space.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/what-it-means">More</Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Find a Good Wee Place</h2>
          <Map />
        </div>
      </section>

      {/* Endorsements Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>Endorsed by</h2>
          <EndorsementDisplay 
            onEmptySquareClick={() => {
              navigate('/forms?type=endorsement')
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
