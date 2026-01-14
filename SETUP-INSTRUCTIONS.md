# Good Wee Place - Setup Instructions

## Quick Start

Follow these steps to get the application running on your new laptop.

## Step 1: Create .env File

Create a `.env` file in the project root with your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these values:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings > API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Set Up Supabase Database

### Run Migrations

In your Supabase Dashboard, go to **SQL Editor** and run these migrations in order:

1. **001_initial_schema.sql** - Creates tables and basic policies
2. **002_admin_policies.sql** - Creates admin access policies  
3. **003_add_website_to_venues.sql** - Adds website field to venues

You can find these files in: `supabase/migrations/`

### Create Storage Buckets

1. Go to **Storage** in your Supabase Dashboard
2. Create two public buckets:
   - **Bucket name:** `stickers` → Set to **Public**
   - **Bucket name:** `logos` → Set to **Public**

### Enable Authentication

1. Go to **Authentication > Providers** in Supabase Dashboard
2. Ensure **Email** provider is enabled
3. Configure email settings if needed

## Step 3: Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Step 4: Create Admin User (Optional)

If you need to create the admin user:

```bash
npm run create-admin
```

This will create a user with:
- **Email:** `jj@eqtr.com`
- **Password:** `GWP2026!`

## Step 5: Start Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

## Verification Checklist

- [ ] `.env` file created with Supabase credentials
- [ ] All three migrations run in Supabase SQL Editor
- [ ] Storage buckets `stickers` and `logos` created and set to public
- [ ] Email authentication enabled in Supabase
- [ ] Development server starts without errors
- [ ] Application loads at `http://localhost:5173`
- [ ] Map displays (if venues exist)
- [ ] Forms can be submitted
- [ ] Admin dashboard accessible at `/admin`

## Troubleshooting

### "Missing Supabase environment variables" error
- Check that `.env` file exists in project root
- Verify all three environment variables are set
- Restart the dev server after creating/updating `.env`

### "Cannot connect to Supabase" error
- Verify your Supabase project is active
- Check that URLs and keys in `.env` are correct
- Ensure you're using the correct project (not a different environment)

### Map not displaying
- Check browser console for errors
- Verify Leaflet CSS is loading
- Ensure you have internet connection (Leaflet loads tiles from CDN)

### Admin page not accessible
- Run `npm run create-admin` to create admin user
- Verify admin policies migration (002) was run
- Check that you're logged in with admin credentials

## Project Structure

```
GoodWeePlace/
├── src/
│   ├── components/     # React components (Map, Forms, etc.)
│   ├── pages/         # Page components (Home, Admin, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utilities (Supabase client, confetti, etc.)
│   └── styles/        # CSS files
├── public/            # Static assets (images, icons)
├── supabase/
│   └── migrations/   # Database migration files
├── scripts/           # Utility scripts (admin creation, etc.)
└── .env              # Environment variables (create this!)
```

## Next Steps

Once the application is running:
1. Test the venue registration form
2. Test the sticker request form
3. Test the brand endorsement form
4. Access admin dashboard at `/admin` to approve submissions
5. Verify venues appear on the map after approval
