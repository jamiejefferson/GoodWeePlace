import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { celebrate } from '../../utils/confetti'

function StickerRequestForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('sticker_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            message: formData.message || null,
            status: 'pending'
          }
        ])

      if (insertError) throw insertError

      // Celebrate!
      celebrate()
      setSuccess(true)

      // Reset form
      setFormData({
        name: '',
        email: '',
        address: '',
        message: ''
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
    }
  }

  if (success) {
    return (
      <div className="success">
        <p>Thank you! Your sticker request has been received. We'll send it to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="section-heading">Get Your Sticker</h2>
      <p className="text-body-large-normal" style={{ marginBottom: '2rem' }}>
        Request a free Good Wee Place sticker to display at your venue.
      </p>

      {error && <div className="error">{error}</div>}

      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Your Name *
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
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="address" className="form-label">
          Mailing Address *
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Where should we send the sticker?"
        />
      </div>

      <div className="form-field">
        <label htmlFor="message" className="form-label">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Request Sticker'}
      </button>
    </form>
  )
}

export default StickerRequestForm
