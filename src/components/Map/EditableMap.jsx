import { useRef, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import './Map.css'

// Custom marker icon - using target.png (same as main map)
const createCustomIcon = () => {
  return L.icon({
    iconUrl: '/target.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

// Component to recenter map when coordinates change
function MapRecenter({ lat, lng }) {
  const map = useMap()

  useEffect(() => {
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], map.getZoom())
    }
  }, [lat, lng, map])

  return null
}

// Draggable marker component
function DraggableMarker({ position, onPositionChange }) {
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const latlng = marker.getLatLng()
          onPositionChange(latlng.lat, latlng.lng)
        }
      },
    }),
    [onPositionChange]
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={createCustomIcon()}
    />
  )
}

function EditableMap({ latitude, longitude, onPositionChange }) {
  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)

  // Default to Glasgow center if no valid coordinates
  const hasValidCoords = !isNaN(lat) && !isNaN(lng)
  const center = hasValidCoords ? [lat, lng] : [55.8642, -4.2518]
  const position = hasValidCoords ? [lat, lng] : [55.8642, -4.2518]

  return (
    <div style={{
      width: '100%',
      height: '300px',
      border: '1px solid black',
      marginBottom: '1rem'
    }}>
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter lat={lat} lng={lng} />
        <DraggableMarker
          position={position}
          onPositionChange={onPositionChange}
        />
      </MapContainer>
      <p style={{
        fontSize: '0.875rem',
        color: '#666',
        marginTop: '0.5rem',
        marginBottom: 0
      }}>
        Drag the marker to adjust the location
      </p>
    </div>
  )
}

export default EditableMap
