# Email Notification Setup

This guide explains how to set up email notifications for the Good Wee Place admin panel.

## Overview

The application sends email notifications when:
- A venue is approved
- A quote is approved  
- A sticker request is marked as "sent"

## Email Service Setup

The application uses [Resend](https://resend.com) for sending emails. Resend offers a free tier with 3,000 emails/month.

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Go to [Resend API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Good Wee Place Production")
4. Copy the API key (starts with `re_`)

### Step 3: Add API Key to Environment Variables

Add the following to your `.env` file:

```bash
VITE_RESEND_API_KEY=re_your_api_key_here
```

**Important:** 
- The `VITE_` prefix is required for Vite to expose the variable to the client
- Never commit your API key to version control
- Make sure `.env` is in your `.gitignore`

### Step 4: Verify Your Domain (Optional but Recommended)

For production, you should verify your domain with Resend:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain (e.g., `goodweeplace.com`)
3. Add the DNS records provided by Resend
4. Wait for verification (usually takes a few minutes)
5. Update the `from` address in `src/utils/email.js` to use your verified domain

Currently, the `from` address is set to:
```javascript
from: 'Good Wee Place <noreply@goodweeplace.com>'
```

Update this to match your verified domain.

### Step 5: Test Email Sending

1. Start your development server: `npm run dev`
2. Log in to the admin panel
3. Approve a venue, quote, or mark a sticker request as "sent"
4. Check the browser console for any errors
5. Verify the email was received

## Email Templates

The email templates are defined in `src/utils/email.js`. You can customize the messages there.

### Venue Approval Email
Sent when a venue is approved via the admin panel.

### Quote Approval Email  
Sent when a quote is approved via the admin panel.

### Sticker Request Email
Sent when a sticker request status is changed to "sent" in the admin panel.

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `VITE_RESEND_API_KEY` is set correctly in your `.env` file
2. **Check Console**: Look for error messages in the browser console
3. **Check Resend Dashboard**: Go to [Resend Logs](https://resend.com/emails) to see email delivery status
4. **Verify Domain**: If using a custom domain, ensure it's verified in Resend

### "Email service not configured" Warning

This means `VITE_RESEND_API_KEY` is not set. The application will continue to work, but emails won't be sent.

### Rate Limits

Resend free tier allows:
- 3,000 emails per month
- 100 emails per day

If you exceed these limits, you'll need to upgrade your Resend plan.

## Database Migration

Don't forget to run the database migration to add email fields:

```sql
-- Run this in your Supabase SQL Editor
-- File: supabase/migrations/005_add_email_fields.sql
```

This adds:
- `email` field to `venues` table
- `email` field to `community_quotes` table

The `sticker_requests` table already has an `email` field.
