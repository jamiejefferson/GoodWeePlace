# Quick Start - Good Wee Place

## ✅ Setup Complete!

Your project has been set up and the development server is running.

## Current Status

- ✅ Project structure consolidated (files moved from nested directory)
- ✅ Dependencies installed
- ✅ Development server running on **http://localhost:5173**
- ✅ All application files in place

## Next Steps

### 1. Configure Supabase (Required)

Your `.env` file exists. Make sure it contains your actual Supabase credentials:

```bash
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

**Get these from:** Supabase Dashboard → Settings → API

### 2. Set Up Database

Run the migrations in your Supabase SQL Editor (in order):
- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_admin_policies.sql`
- `supabase/migrations/003_add_website_to_venues.sql`

### 3. Create Storage Buckets

In Supabase Dashboard → Storage, create:
- `stickers` (public)
- `logos` (public)

### 4. Access Your Application

Open your browser and go to: **http://localhost:5173**

## Available Routes

- `/` - Home page with map
- `/what-it-means` - Information page
- `/forms` - Forms for venue registration, sticker requests, endorsements
- `/admin` - Admin dashboard (requires login)

## Admin Login

To create the admin user:
```bash
npm run create-admin
```

Then login with:
- Email: `jj@eqtr.com`
- Password: `GWP2026!`

## Restarting the Application

To restart the app after closing it:

1. **Navigate to project:**
   ```bash
   cd /path/to/GoodWeePlace
   ```

2. **Verify `.env` file exists:**
   - Check it's in the project root
   - Verify it has all three variables with actual values

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Test:**
   - Open `http://localhost:5173`
   - Check browser console (F12) for errors

**Note:** You don't need to run `npm install` again unless `node_modules` is missing.

## Troubleshooting

### "Missing Supabase environment variables" error

**Local:**
1. Check that `.env` file exists in project root
2. Verify all three variables are set with actual values (not placeholders):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

**Production (Vercel):**
- Add environment variables in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

### App won't start
- Verify Node.js is installed: `node --version` (should be 16+)
- Check `.env` file exists and has correct values
- Try: `npm install` to reinstall dependencies
- Check terminal for specific error messages

## Full Documentation

See `SETUP-INSTRUCTIONS.md` for detailed setup and troubleshooting guide.
