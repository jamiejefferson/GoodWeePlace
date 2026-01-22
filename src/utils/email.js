/**
 * Email utility for sending notifications via Resend API
 * 
 * To use this, add RESEND_API_KEY to your .env file:
 * RESEND_API_KEY=re_your_api_key_here
 * 
 * Get your API key from: https://resend.com/api-keys
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY
const RESEND_API_URL = 'https://api.resend.com/emails'

/**
 * Send an email using Resend API
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML email body
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendEmail(to, subject, html) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.')
    return { success: false, error: 'Email service not configured' }
  }

  if (!to || !to.trim()) {
    console.warn('No recipient email provided. Email not sent.')
    return { success: false, error: 'No recipient email' }
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Good Wee Place <noreply@goodweeplace.com>', // Update with your verified domain
        to: [to],
        subject: subject,
        html: html
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const data = await response.json()
    console.log('Email sent successfully:', data)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Send venue approval notification email
 */
export async function sendVenueApprovalEmail(email, venueName) {
  const subject = 'Your venue is now live on Good Wee Place!'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <p>Heya,</p>
      <p>Thank you so much for displaying your Good Wee Place sticker! Your venue is now live on the site for anyone, that's looking for a good wee place to go, to find.</p>
      <p>Love,<br>Good Wee Place Fam<br>XX</p>
    </div>
  `
  return sendEmail(email, subject, html)
}

/**
 * Send quote approval notification email
 */
export async function sendQuoteApprovalEmail(email) {
  const subject = 'Your quote is now live on Good Wee Place!'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <p>Heya,</p>
      <p>Thank you so much for sharing your thoughts about Good Wee Place! We massively appreciate your input. Your quote is now live on the site. Please tell your friends.</p>
      <p>Love,<br>Good Wee Place Fam<br>XX</p>
    </div>
  `
  return sendEmail(email, subject, html)
}

/**
 * Send sticker request confirmation email
 */
export async function sendStickerRequestEmail(email, name) {
  const subject = 'Your Good Wee Place sticker is on its way!'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <p>Heya,</p>
      <p>Thank you so much for requesting your gorgeous Good Wee Place sticker!</p>
      <p>We'll pop it in the post right away and it'll be with you before you can say "Trans Liberation Now"!</p>
      <p>Remember, getting a Good Wee Place sticker is free - as is being nice - so please pass the message on to friends who you think should make it clear that theirs is a Good Wee Place too.</p>
      <p>Love,<br>Good Wee Place Fam<br>XX</p>
    </div>
  `
  return sendEmail(email, subject, html)
}
