import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LocationForm from '../components/LocationForm/LocationForm'
import StickerRequestForm from '../components/StickerRequestForm/StickerRequestForm'
import EndorsementForm from '../components/EndorsementForm/EndorsementForm'
import QuoteForm from '../components/QuoteForm/QuoteForm'

function FormsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const formType = searchParams.get('type') // 'location', 'sticker', or 'endorsement'

  useEffect(() => {
    // Scroll to top when form type changes
    window.scrollTo(0, 0)
  }, [formType])

  const handleSuccess = () => {
    // Navigate back to home after successful submission
    navigate('/')
  }

  return (
    <div>
      <section className="section">
        <div className="container">
          {formType === 'location' && (
            <LocationForm onSuccess={handleSuccess} />
          )}
          {formType === 'sticker' && (
            <StickerRequestForm onSuccess={handleSuccess} />
          )}
          {formType === 'endorsement' && (
            <EndorsementForm onSuccess={handleSuccess} />
          )}
          {formType === 'quote' && (
            <QuoteForm onSuccess={handleSuccess} />
          )}
          {!formType && (
            <div>
              <h2>Forms</h2>
              <p>Please select a form from the navigation menu.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FormsPage
