# Good Wee Place

A website for a social enterprise helping trans and genderqueer people find safe spaces in Glasgow and beyond.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm installed
- Supabase account (free tier works)

### Initial Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
   Create a `.env` file in the project root with your Supabase credentials:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

   For email notifications (venue/quote approval, sticker “sent”), add:
```bash
VITE_RESEND_API_KEY=re_your_resend_api_key
```
   See `EMAIL-SETUP.md` for details.

   **Get Supabase values from:** Supabase Dashboard → Settings → API

3. **Set up Supabase:**
   - Create a new Supabase project at https://supabase.com
   - Run the migration files in order in your Supabase SQL editor:
     - `supabase/migrations/001_initial_schema.sql` (creates tables and basic policies)
     - `supabase/migrations/002_admin_policies.sql` (creates admin access policies)
     - `supabase/migrations/003_add_website_to_venues.sql` (adds website field)
     - `supabase/migrations/004_community_quotes.sql` (community quotes table)
     - `supabase/migrations/005_add_email_fields.sql` (email on venues, quotes, etc.)
     - `supabase/migrations/006_add_sticker_request_delete_policy.sql` (admin delete sticker requests)
     - `supabase/migrations/007_add_instagram_handle_to_venues.sql` (optional Instagram handle on venues)
   - Create two storage buckets in Supabase Storage:
     - `stickers` (set to public)
     - `logos` (set to public)
   - Set up authentication (email/password) in Supabase Auth

4. **Create admin user (optional):**
```bash
npm run create-admin
```
   This creates a user with email: `jj@eqtr.com` and password: `GWP2026!`

5. **Start the development server:**
```bash
npm run dev
```

   The application will be available at: `http://localhost:5173`

## Restarting the Application

If you need to restart the app (after closing terminal, restarting computer, etc.):

1. **Navigate to project directory:**
```bash
cd /path/to/GoodWeePlace
```

2. **Verify `.env` file exists:**
   - Check that `.env` file is in the project root
   - Verify it contains all three environment variables with actual values

3. **Start the development server:**
```bash
npm run dev
```

4. **Verify it's working:**
   - Open `http://localhost:5173` in your browser
   - Check browser console (F12) for any errors
   - If you see "Missing Supabase environment variables", check your `.env` file

**Note:** You don't need to run `npm install` again unless you've added new dependencies or deleted `node_modules`.

## Features

- Interactive map showing approved venues
- Location registration for venues with stickers (optional website, email, Instagram handle)
- Sticker request form
- Brand endorsement system with approval workflow
- Community quotes (“Add your voice”) with approval workflow
- Admin dashboard for managing approvals, editing venues (including dragging the map pin to fix location), and “Share to Instagram” for approved venues
- Email notifications (Resend) when venues or quotes are approved, or sticker requests are marked “sent”

## Design

- Minimal black and white design
- Trans flag colors (#5BCEFA, #F5A9B8) used only for celebrations and accents
- Helvetica font throughout
- Confetti celebrations on successful actions

## Recent Changes

### Admin & Venues
- **Venue edit map:** When editing a venue in admin, an `EditableMap` lets you drag the pin to correct the location; latitude/longitude update and are saved with the venue.
- **Venue Instagram handle:** Optional field on venue registration and in admin; used when “Share to Instagram” is clicked for an approved venue.
- **Share to Instagram:** Admin shows a “Share to Instagram” button for approved venues; see `src/utils/instagramShare.js`.

### Email Notifications
- **Resend:** Venue approval, quote approval, and sticker “sent” trigger emails when `VITE_RESEND_API_KEY` is set and the record has an email. See `EMAIL-SETUP.md`.

### Styling Updates

**Privacy Policy Links:**
- Updated font-size of privacy policy links in form labels from 24px to 18px
- CSS rule added: `.form-label a { font-size: 18px; }` in `src/styles/design-system.css`
- Applies to all privacy policy links in: LocationForm, EndorsementForm, StickerRequestForm, and QuoteForm

**Form Checkbox Styling:**
- Standardized privacy policy checkbox label styling across all forms
- All forms now use consistent styling:
  - Label: `display: flex`, `alignItems: center`, `gap: 0.5rem`, `cursor: pointer`
  - Checkbox input: `cursor: pointer`, `flexShrink: 0`, `maxWidth: 500px`, `width: 38px`
- Updated components: EndorsementForm, StickerRequestForm, QuoteForm (LocationForm already had this styling)

**Privacy Policy Page:**
- Updated contact email from placeholder `[your email address]` to `heya@goodweeplace.com`
- File: `src/pages/PrivacyPolicyPage.jsx`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run create-admin` - Create admin user in Supabase

## Production Deployment

For deploying to Vercel with a custom domain, see:
- `DEPLOYMENT.md` - Complete deployment guide
- `DOMAIN-SETUP.md` - Custom domain configuration
- `SUPABASE-PRODUCTION-SETUP.md` - Supabase production configuration

## Troubleshooting

### "Missing Supabase environment variables" error
- **Local development:** Check that `.env` file exists and has all three Supabase variables (and `VITE_RESEND_API_KEY` if using email)
- **Production (Vercel):** Add environment variables in Vercel dashboard → Settings → Environment Variables
- Restart dev server after updating `.env` file

### Application won't start
1. Verify `.env` file exists in project root
2. Check all three environment variables are set with actual values (not placeholders)
3. Verify Node.js version: `node --version` (should be 16+)
4. Try reinstalling dependencies: `rm -rf node_modules && npm install`

### Map not displaying
- Check browser console for errors
- Verify internet connection (Leaflet loads tiles from CDN)
- Check that Supabase connection is working

See `SETUP-INSTRUCTIONS.md` for detailed troubleshooting guide.
