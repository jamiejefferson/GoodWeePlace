import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { celebrate } from '../../utils/confetti'

function EndorsementForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    brand_name: '',
    contact_name: '',
    contact_email: '',
    quote: '',
    logo: null
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, logo: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      let logoUrl = null

      // Upload logo if provided
      if (formData.logo) {
        setUploading(true)
        const fileExt = formData.logo.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `logos/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(filePath, formData.logo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('logos')
          .getPublicUrl(filePath)

        logoUrl = publicUrl
        setUploading(false)
      }

      // Insert endorsement
      const { error: insertError } = await supabase
        .from('endorsements')
        .insert([
          {
            brand_name: formData.brand_name,
            contact_name: formData.contact_name,
            contact_email: formData.contact_email,
            quote: formData.quote,
            logo_url: logoUrl,
            approved: false
          }
        ])

      if (insertError) throw insertError

      // Celebrate!
      celebrate()
      setSuccess(true)

      // Reset form
      setFormData({
        brand_name: '',
        contact_name: '',
        contact_email: '',
        quote: '',
        logo: null
      })

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
        <p>Thank you! Your endorsement has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="section-heading">Endorse Good Wee Place</h2>
      <p className="text-body-large-normal" style={{ marginBottom: '2rem' }}>
        Share your brand's support for trans and genderqueer safe spaces.
      </p>

      {error && <div className="error">{error}</div>}

      <div className="form-field">
        <label htmlFor="brand_name" className="form-label">
          Brand Name *
        </label>
        <input
          type="text"
          id="brand_name"
          name="brand_name"
          value={formData.brand_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact_name" className="form-label">
          Contact Name *
        </label>
        <input
          type="text"
          id="contact_name"
          name="contact_name"
          value={formData.contact_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact_email" className="form-label">
          Contact Email *
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="quote" className="form-label">
          Quote *
        </label>
        <textarea
          id="quote"
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Why does your brand support Good Wee Place?"
        />
      </div>

      <div className="form-field">
        <label htmlFor="logo" className="form-label">
          Brand Logo *
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>

      <button type="submit" disabled={submitting || uploading}>
        {uploading ? 'Uploading...' : submitting ? 'Submitting...' : 'Submit Endorsement'}
      </button>
    </form>
  )
}

export default EndorsementForm
