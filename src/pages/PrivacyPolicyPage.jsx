import { Link } from 'react-router-dom'

function PrivacyPolicyPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>Privacy Notice</h1>
        <div style={{ marginTop: '2rem' }}>
          <p className="text-body-large">
            Good Wee Place collects information through our forms to support our mission of creating safer spaces for trans and genderqueer people in Glasgow.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>What we collect and why</h2>
          <p className="text-body-large">
            Depending on which form you use, we may collect:
          </p>
          <ul className="list-content">
            <li className="list-item-content">
              <strong>Your name and email</strong> – so we can respond to you and keep in touch
            </li>
            <li className="list-item-content">
              <strong>Your address</strong> – so we can post stickers to you
            </li>
            <li className="list-item-content">
              <strong>Company/venue name and logo</strong> – to list participating venues on our site and materials
            </li>
            <li className="list-item-content">
              <strong>Instagram handle</strong> – to tag and celebrate venues and supporters
            </li>
            <li className="list-item-content">
              <strong>Quotes and endorsements</strong> – to share on our website and social media (with your permission)
            </li>
          </ul>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Our legal basis</h2>
          <p className="text-body-large">
            We process your data based on your consent, which you give when you submit a form. For venue listings, we also have a legitimate interest in promoting safe spaces.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Who sees your data</h2>
          <p className="text-body-large">
            Your contact details are kept private and only seen by the Good Wee Place team. Venue names, logos, quotes, and Instagram handles may be shared publicly as part of our campaign – we'll only do this where you've agreed.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>How long we keep it</h2>
          <p className="text-body-large">
            We keep your information only as long as needed. Contact details are retained while we're in touch with you; public content (like quotes and venue listings) stays up unless you ask us to remove it.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Your rights</h2>
          <p className="text-body-large">
            Under UK GDPR, you have the right to:
          </p>
          <ul className="list-content">
            <li className="list-item-content">
              Access the data we hold about you
            </li>
            <li className="list-item-content">
              Correct any inaccuracies
            </li>
            <li className="list-item-content">
              Request deletion of your data
            </li>
            <li className="list-item-content">
              Withdraw your consent at any time
            </li>
            <li className="list-item-content">
              Lodge a complaint with the Information Commissioner's Office (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--color-trans-blue)' }}>ico.org.uk</a>)
            </li>
          </ul>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Get in touch</h2>
          <p className="text-body-large">
            Questions about your data? Contact us at heya@goodweeplace.com.
          </p>
          <p className="text-body-large" style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            By submitting a form, you confirm you've read this notice and consent to us using your information as described.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
