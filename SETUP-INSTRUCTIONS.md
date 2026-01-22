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

## Restarting the Application

If you need to restart the app (after closing terminal, restarting computer, switching machines, etc.):

### Quick Restart Steps

1. **Navigate to project directory:**
   ```bash
   cd /path/to/GoodWeePlace
   ```

2. **Verify `.env` file exists:**
   - Check that `.env` file is in the project root
   - Open it and verify it contains all three variables:
     ```
     VITE_SUPABASE_URL=your_actual_url
     VITE_SUPABASE_ANON_KEY=your_actual_key
     SUPABASE_SERVICE_ROLE_KEY=your_actual_key
     ```
   - Make sure values are actual credentials (not placeholders)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify it's working:**
   - Open `http://localhost:5173` in your browser
   - Press F12 to open browser console
   - Check for any errors
   - If you see "Missing Supabase environment variables", your `.env` file is missing or incomplete

### If Dependencies Are Missing

If `node_modules` is missing or you get "command not found" errors:

```bash
# Reinstall dependencies
npm install
```

### If Environment Variables Are Missing

If you see "Missing Supabase environment variables":

1. **Check `.env` file exists:**
   ```bash
   ls -la .env
   ```

2. **Create or update `.env` file:**
   - Get credentials from: Supabase Dashboard → Settings → API
   - Add all three variables (see Step 1 above)

3. **Restart the dev server:**
   ```bash
   # Stop the server (Ctrl+C if running)
   npm run dev
   ```

### Complete Fresh Start Checklist

If starting completely fresh (new machine, cloned repo, etc.):

- [ ] Node.js installed (`node --version` shows 16+)
- [ ] npm installed (`npm --version`)
- [ ] Project files present (especially `src/`, `package.json`)
- [ ] `.env` file created with all three Supabase variables
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase migrations run (if new database)
- [ ] Storage buckets created in Supabase
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] Site loads at `http://localhost:5173`
- [ ] No errors in browser console

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

**Local Development:**
- Check that `.env` file exists in project root
- Verify all three environment variables are set:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Make sure values are actual credentials (not placeholders like "your_supabase_url_here")
- Restart the dev server after creating/updating `.env`:
  ```bash
  # Stop server (Ctrl+C)
  npm run dev
  ```

**Production (Vercel):**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all three variables for Production, Preview, and Development environments
- Redeploy after adding variables

### "Cannot connect to Supabase" error
- Verify your Supabase project is active (check Supabase dashboard)
- Check that URLs and keys in `.env` are correct (no extra spaces, quotes, etc.)
- Ensure you're using the correct project (not a different environment)
- Verify Supabase project hasn't been paused or deleted

### Application won't start
1. **Check Node.js version:**
   ```bash
   node --version  # Should be 16 or higher
   ```

2. **Verify dependencies:**
   ```bash
   npm install  # Reinstall if needed
   ```

3. **Check for errors:**
   - Look at terminal output when running `npm run dev`
   - Check for missing files or syntax errors

### Map not displaying
- Check browser console (F12) for errors
- Verify Leaflet CSS is loading (check Network tab)
- Ensure you have internet connection (Leaflet loads tiles from CDN)
- Check that Supabase is returning venue data

### Admin page not accessible
- Run `npm run create-admin` to create admin user
- Verify admin policies migration (002) was run in Supabase
- Check that you're logged in with admin credentials:
  - Email: `jj@eqtr.com`
  - Password: `GWP2026!`
- Clear browser cache and try again

### Port already in use
If port 5173 is already in use:
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Build errors
If `npm run build` fails:
- Check for TypeScript/JavaScript syntax errors
- Verify all imports are correct
- Check that all dependencies are installed
- Review build output for specific error messages

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
