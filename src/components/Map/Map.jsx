import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useVenues } from '../../hooks/useVenues'
import { celebrate } from '../../utils/confetti'
import './Map.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom marker icon - using target.png
const createCustomIcon = () => {
  return L.icon({
    iconUrl: '/target.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

function Map() {
  const { venues, loading } = useVenues()
  const [hasCelebrated, setHasCelebrated] = useState(false)
  const mapRef = useRef(null)

  // Glasgow coordinates
  const glasgowCenter = [55.8642, -4.2518]

  // Celebrate when venues are first loaded
  useEffect(() => {
    if (venues.length > 0 && !hasCelebrated && !loading) {
      celebrate()
      setHasCelebrated(true)
    }
  }, [venues, loading, hasCelebrated])

  if (loading) {
    return <div className="loading">Loading map...</div>
  }

  return (
    <div style={{ width: '100%', height: '650px', margin: '2rem 0', border: '3px solid var(--color-black)' }}>
      <MapContainer
        center={glasgowCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.latitude, venue.longitude]}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="venue-popup">
                {venue.sticker_photo_url && (
                  <img
                    src={venue.sticker_photo_url}
                    alt={`${venue.name} sticker`}
                    className="venue-popup-image"
                  />
                )}
                <div className="venue-popup-content">
                  <h3 className="venue-popup-title"><strong>{venue.name}</strong>, is a Good Wee Place</h3>
                  <p className="venue-popup-address">{venue.address}</p>
                  {venue.description && (
                    <p className="venue-popup-description">{venue.description}</p>
                  )}
                  <div className="venue-popup-links">
                    {venue.website && (
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-popup-link venue-popup-link-left"
                      >
                        Web
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue-popup-link venue-popup-link-right"
                    >
                      Go
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
