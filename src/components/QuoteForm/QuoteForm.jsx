import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import { celebrate } from '../../utils/confetti'

function QuoteForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    quote: '',
    nickname: '',
    instagram_handle: ''
  })
  const [consentAccepted, setConsentAccepted] = useState(false)
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

    if (!consentAccepted) {
      setError('Please accept the privacy policy to continue.')
      return
    }

    setSubmitting(true)

    try {
      // Clean up Instagram handle (remove @ if present)
      const cleanInstagramHandle = formData.instagram_handle
        ? formData.instagram_handle.replace('@', '').trim()
        : null

      // Insert quote
      const { error: insertError } = await supabase
        .from('community_quotes')
        .insert([
          {
            quote: formData.quote.trim(),
            nickname: formData.nickname.trim() || null,
            instagram_handle: cleanInstagramHandle || null,
            approved: false
          }
        ])

      if (insertError) throw insertError

      // Celebrate!
      celebrate()
      setSuccess(true)

      // Reset form
      setFormData({
        quote: '',
        nickname: '',
        instagram_handle: ''
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
    }
  }

  if (success) {
    return (
      <div className="success">
        <p>Thank you! Your quote has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="section-heading">Add Your Voice</h2>
      <p className="text-body-large-normal" style={{ marginBottom: '2rem' }}>
        Share your thoughts about Good Wee Place and what it means to you.
      </p>

      {error && <div className="error">{error}</div>}

      <div className="form-field">
        <label htmlFor="quote" className="form-label">
          Your Quote *
        </label>
        <textarea
          id="quote"
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          rows="6"
          placeholder="What would you like to say?"
        />
      </div>

      <div className="form-field">
        <label htmlFor="nickname" className="form-label">
          Nickname (optional)
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="How you'd like to be credited"
        />
      </div>

      <div className="form-field">
        <label htmlFor="instagram_handle" className="form-label">
          Instagram Handle (optional)
        </label>
        <input
          type="text"
          id="instagram_handle"
          name="instagram_handle"
          value={formData.instagram_handle}
          onChange={handleChange}
          placeholder="@yourhandle or yourhandle"
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

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Quote'}
      </button>
    </form>
  )
}

export default QuoteForm
