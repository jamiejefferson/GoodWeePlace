import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import { celebrate } from '../../utils/confetti'
import { compressImage } from '../../utils/imageCompression'

function LocationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    description: '',
    website: '',
    email: '',
    sticker_photo: null
  })
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, sticker_photo: e.target.files[0] }))
  }

  // Simple geocoding - using Nominatim with proper headers and fallback
  const geocodeAddress = async (address) => {
    try {
      // Only append "Glasgow, Scotland, UK" if the address doesn't already contain location info
      const hasLocation = /paisley|glasgow|scotland|uk/i.test(address)
      const searchQuery = hasLocation
        ? encodeURIComponent(address)
        : encodeURIComponent(address + ', Glasgow, Scotland, UK')

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1&addressdetails=1&extratags=1&namedetails=1`,
        {
          headers: {
            'User-Agent': 'GoodWeePlace/1.0', // Nominatim requires User-Agent
            'Accept': 'application/json'
          },
          // Add a small delay to respect Nominatim's rate limiting
        }
      )
      
      if (!response.ok) {
        throw new Error(`Geocoding service returned ${response.status}`)
      }
      
      const data = await response.json()
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        }
      }
    } catch (err) {
      console.error('Geocoding error:', err)
      // Fallback: Return Glasgow city center coordinates if geocoding fails
      // This allows the form to still submit, admin can fix coordinates later
      console.warn('Geocoding failed, using Glasgow city center as fallback')
      return {
        lat: 55.8642,
        lon: -4.2518
      }
    }
    // If no results but no error, also use fallback
    console.warn('No geocoding results, using Glasgow city center as fallback')
    return {
      lat: 55.8642,
      lon: -4.2518
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!consentAccepted) {
      setError('Please accept the privacy policy to continue.')
      return
    }

    setSubmitting(true)

    try {
      // Geocode address (will use fallback if geocoding fails)
      const coords = await geocodeAddress(formData.address)
      if (!coords) {
        // This shouldn't happen now since geocodeAddress has a fallback,
        // but keep as safety check
        throw new Error('Could not determine location coordinates.')
      }

      let stickerPhotoUrl = null

      // Upload sticker photo if provided
      if (formData.sticker_photo) {
        setUploading(true)
        try {
          // Compress image before upload
          const compressedImage = await compressImage(formData.sticker_photo)
          const fileName = `${Math.random()}.jpg`
          const filePath = `stickers/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('stickers')
            .upload(filePath, compressedImage, {
              contentType: 'image/jpeg'
            })

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase.storage
            .from('stickers')
            .getPublicUrl(filePath)

          stickerPhotoUrl = publicUrl
        } catch (compressionError) {
          console.warn('Image compression failed, uploading original:', compressionError)
          // Fallback to original file if compression fails
          const fileExt = formData.sticker_photo.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `stickers/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('stickers')
            .upload(filePath, formData.sticker_photo)

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase.storage
            .from('stickers')
            .getPublicUrl(filePath)

          stickerPhotoUrl = publicUrl
        }
        setUploading(false)
      }

      // Validate and format website URL
      let websiteUrl = formData.website.trim() || null
      if (websiteUrl && !websiteUrl.match(/^https?:\/\//i)) {
        websiteUrl = `https://${websiteUrl}`
      }

      // Insert venue
      const { error: insertError } = await supabase
        .from('venues')
        .insert([
          {
            name: formData.name,
            address: formData.address,
            latitude: coords.lat,
            longitude: coords.lon,
            description: formData.description || null,
            website: websiteUrl,
            email: formData.email.trim() || null,
            sticker_photo_url: stickerPhotoUrl,
            approved: false
          }
        ])

      if (insertError) throw insertError

      // Celebrate!
      celebrate()
      setSuccess(true)
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        description: '',
        website: '',
        email: '',
        sticker_photo: null
      })
      setConsentAccepted(false)

      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
          setSuccess(false)
        }, 2000)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  if (success) {
    return (
      <div className="success">
        <p>Thank you! Your location has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="section-heading">Add Your Venue</h2>
      <p className="text-body-large-normal" style={{ marginBottom: '2rem' }}>
        If you have a Good Wee Place sticker displayed, register your venue here.
      </p>

      {error && <div className="error">{error}</div>}

      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Venue Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="address" className="form-label">
          Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="e.g., 123 Main Street, Glasgow"
        />
      </div>

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-field">
        <label htmlFor="website" className="form-label">
          Website (optional)
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
        <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#666' }}>
          We'll email you when your venue is approved and goes live.
        </p>
      </div>

      <div className="form-field">
        <label htmlFor="sticker_photo" className="form-label">
          Photo of Sticker (optional)
        </label>
        <input
          type="file"
          id="sticker_photo"
          name="sticker_photo"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <div className="form-field">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            required
            style={{ cursor: 'pointer', flexShrink: 0, maxWidth: '500px', width: '38px' }}
          />
          <span className="form-label" style={{ marginBottom: 0 }}>
            I have read and accept the <Link to="/privacy-policy" style={{ color: 'var(--color-trans-blue)', textDecoration: 'underline', display: 'inline', maxWidth: 'none', width: 'auto' }}>privacy policy</Link>
          </span>
        </label>
      </div>

      <button type="submit" disabled={submitting || uploading}>
        {uploading ? 'Uploading...' : submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default LocationForm
