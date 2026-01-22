import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { celebrate } from '../utils/confetti'
import { sendVenueApprovalEmail, sendQuoteApprovalEmail, sendStickerRequestEmail } from '../utils/email'

function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pendingVenues, setPendingVenues] = useState([])
  const [allVenues, setAllVenues] = useState([])
  const [pendingEndorsements, setPendingEndorsements] = useState([])
  const [stickerRequests, setStickerRequests] = useState([])
  const [pendingQuotes, setPendingQuotes] = useState([])
  const [allQuotes, setAllQuotes] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [editingVenue, setEditingVenue] = useState(null)
  const [editingQuote, setEditingQuote] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    address: '',
    description: '',
    website: '',
    approved: false,
    latitude: '',
    longitude: '',
    email: ''
  })
  const [editQuoteData, setEditQuoteData] = useState({
    quote: '',
    nickname: '',
    instagram_handle: '',
    approved: false,
    email: ''
  })
  const [geocoding, setGeocoding] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  // Geocoding function (copied from LocationForm)
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
            'User-Agent': 'GoodWeePlace/1.0',
            'Accept': 'application/json'
          }
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
      return null
    }
    return null
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setSigningIn(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      alert('Error signing in: ' + error.message)
    } finally {
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const fetchData = async () => {
    // Fetch pending venues
    const { data: pending } = await supabase
      .from('venues')
      .select('*')
      .eq('approved', false)
      .order('created_at', { ascending: false })
    setPendingVenues(pending || [])

    // Fetch all venues (approved and pending)
    const { data: all } = await supabase
      .from('venues')
      .select('*')
      .order('created_at', { ascending: false })
    setAllVenues(all || [])

    // Fetch pending endorsements
    const { data: endorsements } = await supabase
      .from('endorsements')
      .select('*')
      .eq('approved', false)
      .order('created_at', { ascending: false })
    setPendingEndorsements(endorsements || [])

    // Fetch sticker requests
    const { data: requests, error: requestsError } = await supabase
      .from('sticker_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (requestsError) {
      console.error('Error fetching sticker requests:', requestsError)
      console.error('Error details:', {
        message: requestsError.message,
        details: requestsError.details,
        hint: requestsError.hint,
        code: requestsError.code
      })
      alert('Error fetching sticker requests: ' + requestsError.message + '\n\nCheck console for details.')
    } else {
      console.log('Successfully fetched sticker requests:', requests?.length || 0)
      setStickerRequests(requests || [])
    }

    // Fetch pending quotes
    const { data: pendingQuotes } = await supabase
      .from('community_quotes')
      .select('*')
      .eq('approved', false)
      .order('created_at', { ascending: false })
    setPendingQuotes(pendingQuotes || [])

    // Fetch all quotes (approved and pending)
    const { data: allQuotes } = await supabase
      .from('community_quotes')
      .select('*')
      .order('created_at', { ascending: false })
    setAllQuotes(allQuotes || [])
  }

  const approveVenue = async (id) => {
    try {
      // First, fetch the venue to get the email address
      const { data: venue, error: fetchError } = await supabase
        .from('venues')
        .select('email, name')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Update the venue to approved
      const { error } = await supabase
        .from('venues')
        .update({ approved: true })
        .eq('id', id)
      if (error) throw error

      // Send email notification if email is available
      if (venue?.email) {
        try {
          await sendVenueApprovalEmail(venue.email, venue.name)
        } catch (emailError) {
          console.error('Error sending approval email:', emailError)
          // Don't fail the approval if email fails
        }
      }

      celebrate()
      fetchData()
    } catch (error) {
      alert('Error approving venue: ' + error.message)
    }
  }

  const rejectVenue = async (id) => {
    try {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error rejecting venue: ' + error.message)
    }
  }

  const approveEndorsement = async (id) => {
    try {
      const { error } = await supabase
        .from('endorsements')
        .update({ approved: true })
        .eq('id', id)
      if (error) throw error
      celebrate()
      fetchData()
    } catch (error) {
      alert('Error approving endorsement: ' + error.message)
    }
  }

  const rejectEndorsement = async (id) => {
    try {
      const { error } = await supabase
        .from('endorsements')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error rejecting endorsement: ' + error.message)
    }
  }

  const updateStickerRequestStatus = async (id, status) => {
    try {
      // If marking as 'sent', fetch the request to get email and name
      if (status === 'sent') {
        const { data: request, error: fetchError } = await supabase
          .from('sticker_requests')
          .select('email, name')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError

        // Update the status
        const { error } = await supabase
          .from('sticker_requests')
          .update({ status })
          .eq('id', id)
        if (error) throw error

        // Send email notification if email is available
        if (request?.email) {
          try {
            await sendStickerRequestEmail(request.email, request.name)
          } catch (emailError) {
            console.error('Error sending sticker request email:', emailError)
            // Don't fail the status update if email fails
          }
        }
      } else {
        // For other status updates, just update the status
        const { error } = await supabase
          .from('sticker_requests')
          .update({ status })
          .eq('id', id)
        if (error) throw error
      }

      fetchData()
    } catch (error) {
      alert('Error updating status: ' + error.message)
    }
  }

  const handleDeleteStickerRequest = async (id) => {
    if (!confirm('Are you sure you want to delete this sticker request? This action cannot be undone.')) {
      return
    }
    try {
      const { error } = await supabase
        .from('sticker_requests')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error deleting sticker request: ' + error.message)
    }
  }

  const handleEditVenue = (venue) => {
    setEditFormData({
      name: venue.name || '',
      address: venue.address || '',
      description: venue.description || '',
      website: venue.website || '',
      approved: venue.approved || false,
      latitude: venue.latitude || '',
      longitude: venue.longitude || '',
      email: venue.email || ''
    })
    setEditingVenue(venue.id)
  }

  const handleRegeocode = async () => {
    setGeocoding(true)
    try {
      const coords = await geocodeAddress(editFormData.address)
      if (coords) {
        setEditFormData({
          ...editFormData,
          latitude: coords.lat,
          longitude: coords.lon
        })
        alert(`Coordinates updated:\nLatitude: ${coords.lat}\nLongitude: ${coords.lon}`)
      } else {
        alert('Could not geocode address. Please check the address or enter coordinates manually.')
      }
    } catch (error) {
      alert('Geocoding failed: ' + error.message)
    } finally {
      setGeocoding(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingVenue(null)
    setEditFormData({
      name: '',
      address: '',
      description: '',
      website: '',
      approved: false,
      latitude: '',
      longitude: '',
      email: ''
    })
  }

  const handleSaveEdit = async () => {
    try {
      // Check if we're approving (changing from unapproved to approved)
      const { data: currentVenue } = await supabase
        .from('venues')
        .select('approved, email')
        .eq('id', editingVenue)
        .single()

      const isBeingApproved = !currentVenue?.approved && editFormData.approved

      // Update the venue
      const { error } = await supabase
        .from('venues')
        .update({
          name: editFormData.name,
          address: editFormData.address,
          description: editFormData.description || null,
          website: editFormData.website || null,
          email: editFormData.email.trim() || null,
          approved: editFormData.approved,
          latitude: parseFloat(editFormData.latitude),
          longitude: parseFloat(editFormData.longitude)
        })
        .eq('id', editingVenue)

      if (error) throw error

      // Send email notification if being approved and email is available
      if (isBeingApproved && (editFormData.email || currentVenue?.email)) {
        const emailToUse = editFormData.email || currentVenue?.email
        try {
          await sendVenueApprovalEmail(emailToUse, editFormData.name)
        } catch (emailError) {
          console.error('Error sending approval email:', emailError)
          // Don't fail the update if email fails
        }
      }

      celebrate()
      handleCancelEdit()
      fetchData()
    } catch (error) {
      alert('Error updating venue: ' + error.message)
    }
  }

  const handleDeleteVenue = async (id) => {
    if (!confirm('Are you sure you want to delete this venue? This action cannot be undone.')) {
      return
    }
    try {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error deleting venue: ' + error.message)
    }
  }

  const approveQuote = async (id) => {
    try {
      // First, fetch the quote to get the email address
      const { data: quote, error: fetchError } = await supabase
        .from('community_quotes')
        .select('email')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Update the quote to approved
      const { error } = await supabase
        .from('community_quotes')
        .update({ approved: true })
        .eq('id', id)
      if (error) throw error

      // Send email notification if email is available
      if (quote?.email) {
        try {
          await sendQuoteApprovalEmail(quote.email)
        } catch (emailError) {
          console.error('Error sending approval email:', emailError)
          // Don't fail the approval if email fails
        }
      }

      celebrate()
      fetchData()
    } catch (error) {
      alert('Error approving quote: ' + error.message)
    }
  }

  const rejectQuote = async (id) => {
    try {
      const { error } = await supabase
        .from('community_quotes')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error rejecting quote: ' + error.message)
    }
  }

  const handleEditQuote = (quote) => {
    setEditQuoteData({
      quote: quote.quote || '',
      nickname: quote.nickname || '',
      instagram_handle: quote.instagram_handle || '',
      approved: quote.approved || false,
      email: quote.email || ''
    })
    setEditingQuote(quote.id)
  }

  const handleCancelEditQuote = () => {
    setEditingQuote(null)
    setEditQuoteData({
      quote: '',
      nickname: '',
      instagram_handle: '',
      approved: false,
      email: ''
    })
  }

  const handleSaveEditQuote = async () => {
    try {
      // Check if we're approving (changing from unapproved to approved)
      const { data: currentQuote } = await supabase
        .from('community_quotes')
        .select('approved, email')
        .eq('id', editingQuote)
        .single()

      const isBeingApproved = !currentQuote?.approved && editQuoteData.approved

      // Clean up Instagram handle
      const cleanInstagramHandle = editQuoteData.instagram_handle
        ? editQuoteData.instagram_handle.replace('@', '').trim()
        : null

      // Update the quote
      const { error } = await supabase
        .from('community_quotes')
        .update({
          quote: editQuoteData.quote.trim(),
          nickname: editQuoteData.nickname.trim() || null,
          instagram_handle: cleanInstagramHandle || null,
          email: editQuoteData.email.trim() || null,
          approved: editQuoteData.approved
        })
        .eq('id', editingQuote)

      if (error) throw error

      // Send email notification if being approved and email is available
      if (isBeingApproved && (editQuoteData.email || currentQuote?.email)) {
        const emailToUse = editQuoteData.email || currentQuote?.email
        try {
          await sendQuoteApprovalEmail(emailToUse)
        } catch (emailError) {
          console.error('Error sending approval email:', emailError)
          // Don't fail the update if email fails
        }
      }

      celebrate()
      handleCancelEditQuote()
      fetchData()
    } catch (error) {
      alert('Error updating quote: ' + error.message)
    }
  }

  const handleDeleteQuote = async (id) => {
    if (!confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
      return
    }
    try {
      const { error } = await supabase
        .from('community_quotes')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error deleting quote: ' + error.message)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: '400px' }}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSignIn} style={{ marginTop: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={signingIn}>
              {signingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1>Admin Dashboard</h1>
        </div>

        {/* All Venues */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading">All Venues ({allVenues.length})</h2>
          {allVenues.length === 0 ? (
            <p>No venues.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {allVenues.map((venue) => (
                <div
                  key={venue.id}
                  style={{
                    border: '1px solid black',
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: venue.approved ? '#f0f0f0' : 'white'
                  }}
                >
                  {editingVenue === venue.id ? (
                    <div>
                      <div className="form-field">
                        <label className="form-label">Venue Name *</label>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Address *</label>
                        <input
                          type="text"
                          value={editFormData.address}
                          onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                          style={{ width: '100%' }}
                        />
                        <button
                          type="button"
                          onClick={handleRegeocode}
                          disabled={geocoding}
                          style={{ marginTop: '0.5rem' }}
                        >
                          {geocoding ? 'Geocoding...' : 'Re-geocode Address'}
                        </button>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Latitude *</label>
                        <input
                          type="number"
                          step="any"
                          value={editFormData.latitude}
                          onChange={(e) => setEditFormData({ ...editFormData, latitude: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Longitude *</label>
                        <input
                          type="number"
                          step="any"
                          value={editFormData.longitude}
                          onChange={(e) => setEditFormData({ ...editFormData, longitude: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Description</label>
                        <textarea
                          value={editFormData.description}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                          rows="3"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Website</label>
                        <input
                          type="url"
                          value={editFormData.website}
                          onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                          placeholder="https://example.com"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          placeholder="venue@example.com"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            checked={editFormData.approved}
                            onChange={(e) => setEditFormData({ ...editFormData, approved: e.target.checked })}
                          />
                          Approved
                        </label>
                      </div>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <h3>{venue.name}</h3>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          fontSize: '0.875rem',
                          backgroundColor: venue.approved ? '#d4edda' : '#fff3cd',
                          border: '1px solid black'
                        }}>
                          {venue.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p><strong>Address:</strong> {venue.address}</p>
                      <p><strong>Coordinates:</strong> {venue.latitude}, {venue.longitude}</p>
                      {venue.description && <p><strong>Description:</strong> {venue.description}</p>}
                      {venue.website && <p><strong>Website:</strong> <a href={venue.website} target="_blank" rel="noopener noreferrer">{venue.website}</a></p>}
                      {venue.email && <p><strong>Email:</strong> {venue.email}</p>}
                      {venue.sticker_photo_url && (
                        <img
                          src={venue.sticker_photo_url}
                          alt="Sticker photo"
                          style={{ maxWidth: '200px', marginTop: '0.5rem' }}
                        />
                      )}
                      <p><strong>Submitted:</strong> {new Date(venue.created_at).toLocaleDateString()}</p>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={() => handleEditVenue(venue)}>Edit</button>
                        {!venue.approved && (
                          <button onClick={() => approveVenue(venue.id)}>Approve</button>
                        )}
                        <button onClick={() => handleDeleteVenue(venue.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pending Venues (Quick View) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading">Pending Venue Approvals ({pendingVenues.length})</h2>
          {pendingVenues.length === 0 ? (
            <p>No pending venues.</p>
          ) : (
            <p className="text-body-large-normal">See "All Venues" section above to manage pending venues.</p>
          )}
        </section>

        {/* Pending Endorsements */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading">Pending Endorsement Approvals ({pendingEndorsements.length})</h2>
          {pendingEndorsements.length === 0 ? (
            <p>No pending endorsements.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {pendingEndorsements.map((endorsement) => (
                <div
                  key={endorsement.id}
                  style={{
                    border: '1px solid black',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <h3>{endorsement.brand_name}</h3>
                  <p><strong>Contact:</strong> {endorsement.contact_name} ({endorsement.contact_email})</p>
                  <p><strong>Quote:</strong> "{endorsement.quote}"</p>
                  {endorsement.logo_url && (
                    <img
                      src={endorsement.logo_url}
                      alt={endorsement.brand_name}
                      style={{ maxWidth: '200px', marginTop: '0.5rem' }}
                    />
                  )}
                  <p><strong>Submitted:</strong> {new Date(endorsement.created_at).toLocaleDateString()}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => approveEndorsement(endorsement.id)}>Approve</button>
                    <button onClick={() => rejectEndorsement(endorsement.id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Community Quotes */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading">Community Quotes ({allQuotes.length})</h2>
          {allQuotes.length === 0 ? (
            <p>No quotes.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {allQuotes.map((quote) => (
                <div
                  key={quote.id}
                  style={{
                    border: '1px solid black',
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: quote.approved ? '#f0f0f0' : 'white'
                  }}
                >
                  {editingQuote === quote.id ? (
                    <div>
                      <div className="form-field">
                        <label className="form-label">Quote *</label>
                        <textarea
                          value={editQuoteData.quote}
                          onChange={(e) => setEditQuoteData({ ...editQuoteData, quote: e.target.value })}
                          rows="4"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Nickname</label>
                        <input
                          type="text"
                          value={editQuoteData.nickname}
                          onChange={(e) => setEditQuoteData({ ...editQuoteData, nickname: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Instagram Handle</label>
                        <input
                          type="text"
                          value={editQuoteData.instagram_handle}
                          onChange={(e) => setEditQuoteData({ ...editQuoteData, instagram_handle: e.target.value })}
                          placeholder="@handle or handle"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          value={editQuoteData.email}
                          onChange={(e) => setEditQuoteData({ ...editQuoteData, email: e.target.value })}
                          placeholder="quote@example.com"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            checked={editQuoteData.approved}
                            onChange={(e) => setEditQuoteData({ ...editQuoteData, approved: e.target.checked })}
                          />
                          Approved
                        </label>
                      </div>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                        <button onClick={handleSaveEditQuote}>Save</button>
                        <button onClick={handleCancelEditQuote}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, marginBottom: '0.5rem' }}><strong>Quote:</strong> "{quote.quote}"</p>
                          {quote.nickname && <p style={{ margin: 0, marginBottom: '0.25rem' }}><strong>Nickname:</strong> {quote.nickname}</p>}
                          {quote.instagram_handle && (
                            <p style={{ margin: 0, marginBottom: '0.25rem' }}>
                              <strong>Instagram:</strong>{' '}
                              <a href={`https://instagram.com/${quote.instagram_handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                @{quote.instagram_handle.replace('@', '')}
                              </a>
                            </p>
                          )}
                          {quote.email && (
                            <p style={{ margin: 0 }}>
                              <strong>Email:</strong> {quote.email}
                            </p>
                          )}
                        </div>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          fontSize: '0.875rem',
                          backgroundColor: quote.approved ? '#d4edda' : '#fff3cd',
                          border: '1px solid black'
                        }}>
                          {quote.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p><strong>Submitted:</strong> {new Date(quote.created_at).toLocaleDateString()}</p>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={() => handleEditQuote(quote)}>Edit</button>
                        {!quote.approved && (
                          <button onClick={() => approveQuote(quote.id)}>Approve</button>
                        )}
                        <button onClick={() => handleDeleteQuote(quote.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pending Quotes (Quick View) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading">Pending Quote Approvals ({pendingQuotes.length})</h2>
          {pendingQuotes.length === 0 ? (
            <p>No pending quotes.</p>
          ) : (
            <p className="text-body-large-normal">See "Community Quotes" section above to manage pending quotes.</p>
          )}
        </section>

        {/* Sticker Requests */}
        <section>
          <h2 className="section-heading">Sticker Requests ({stickerRequests.length})</h2>
          {stickerRequests.length === 0 ? (
            <p>No sticker requests.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {stickerRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    border: '1px solid black',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <h3>{request.name}</h3>
                  <p><strong>Email:</strong> {request.email}</p>
                  <p><strong>Address:</strong> {request.address}</p>
                  {request.message && <p><strong>Message:</strong> {request.message}</p>}
                  <p><strong>Status:</strong> {request.status}</p>
                  <p><strong>Requested:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={() => updateStickerRequestStatus(request.id, 'pending')}>
                      Mark Pending
                    </button>
                    <button onClick={() => updateStickerRequestStatus(request.id, 'sent')}>
                      Mark Sent
                    </button>
                    <button onClick={() => updateStickerRequestStatus(request.id, 'fulfilled')}>
                      Mark Fulfilled
                    </button>
                    <button 
                      onClick={() => handleDeleteStickerRequest(request.id)}
                      style={{ color: 'var(--color-trans-blue)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminPage
