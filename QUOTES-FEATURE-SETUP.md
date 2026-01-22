# Community Quotes Feature - Setup Guide

The community quotes carousel feature has been implemented! Here's what was created and what you need to do.

## ✅ What Was Created

### Database
- **Migration file:** `supabase/migrations/004_community_quotes.sql`
  - Creates `community_quotes` table
  - Sets up RLS policies for public read/insert
- **Admin policies:** Updated `supabase/migrations/002_admin_policies.sql`
  - Adds admin read/update/delete policies for quotes

### Components
- **QuoteDisplay:** `src/components/QuoteDisplay/QuoteDisplay.jsx`
  - Carousel component with quote cards
  - Empty card with plus sign and "Add your voice" text
  - Horizontal scrolling with mouse wheel support
- **QuoteForm:** `src/components/QuoteForm/QuoteForm.jsx`
  - Form for submitting quotes
  - Fields: quote (required), nickname (optional), instagram_handle (optional)
  - Matches existing form styling

### Integration
- **HomePage:** Added "From the community" section above "Endorsed by"
- **FormsPage:** Added quote form routing (`type=quote`)
- **AdminPage:** Added quote management section with approve/edit/delete

## 📋 Setup Steps

### Step 1: Run Database Migration

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Select your project
   - Go to **SQL Editor**

2. **Run the migration:**
   - Open `supabase/migrations/004_community_quotes.sql`
   - Copy the SQL content
   - Paste into Supabase SQL Editor
   - Click **Run**

3. **Update admin policies:**
   - Open `supabase/migrations/002_admin_policies.sql`
   - Copy the new policies (at the end of the file)
   - Paste into Supabase SQL Editor
   - Click **Run**

   Or run the entire updated `002_admin_policies.sql` file if you haven't run it before.

### Step 2: Test Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test the feature:**
   - [ ] Visit homepage - see "From the community" section
   - [ ] See empty card with plus sign and "Add your voice"
   - [ ] Click empty card - navigates to quote form
   - [ ] Submit a test quote
   - [ ] Check admin dashboard - quote appears
   - [ ] Approve quote in admin
   - [ ] Quote appears in carousel on homepage

### Step 3: Deploy to Production

1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add community quotes carousel feature"
   git push
   ```

2. **Run migration in production Supabase:**
   - Go to your production Supabase project
   - Run `004_community_quotes.sql` migration
   - Update admin policies

3. **Vercel will auto-deploy** (1-2 minutes)

## 🎨 Feature Details

### Quote Card Design
- **Empty card:** Black background, white plus sign, "Add your voice" text
- **Quote cards:** White background, black border, quote text in quotes
- **Attribution:** Shows nickname (if provided) and Instagram handle (if provided)
- **Instagram links:** Clickable links to Instagram profiles

### Form Fields
- **Quote** (required): Textarea for the quote text
- **Nickname** (optional): How the person wants to be credited
- **Instagram Handle** (optional): Instagram username (with or without @)

### Admin Features
- View all quotes (approved and pending)
- Approve quotes (makes them visible on site)
- Edit quotes (update text, nickname, handle, approval status)
- Delete quotes
- See pending count

## 📍 File Locations

**New Files:**
- `supabase/migrations/004_community_quotes.sql`
- `src/components/QuoteDisplay/QuoteDisplay.jsx`
- `src/components/QuoteForm/QuoteForm.jsx`

**Updated Files:**
- `supabase/migrations/002_admin_policies.sql`
- `src/pages/HomePage.jsx`
- `src/pages/FormsPage.jsx`
- `src/pages/AdminPage.jsx`

## 🔍 Testing Checklist

After setup, verify:
- [ ] Migration runs successfully in Supabase
- [ ] Quote carousel displays on homepage
- [ ] Empty card appears first with "Add your voice"
- [ ] Clicking empty card navigates to form
- [ ] Form submits successfully
- [ ] Quote appears in admin dashboard (pending)
- [ ] Admin can approve quote
- [ ] Approved quote appears in carousel
- [ ] Admin can edit quote
- [ ] Admin can delete quote
- [ ] Instagram handle links work (if provided)
- [ ] Styling matches rest of site
- [ ] Responsive on mobile

## 🐛 Troubleshooting

### "Table community_quotes does not exist"
- **Fix:** Run the migration `004_community_quotes.sql` in Supabase SQL Editor

### "Permission denied" errors
- **Fix:** Run the updated admin policies from `002_admin_policies.sql`

### Quotes not appearing in carousel
- **Check:** Quote must be approved (approved=true) in database
- **Check:** Admin dashboard shows quote as approved

### Form submission fails
- **Check:** Browser console for errors
- **Check:** Supabase table exists and policies are set
- **Check:** Environment variables are set correctly

## 📝 Next Steps

1. Run the database migration
2. Test locally
3. Deploy to production
4. Run migration in production Supabase
5. Start collecting quotes!

The feature is ready to use! 🎉
