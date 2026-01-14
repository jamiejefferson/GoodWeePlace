# Admin User Setup

To create the admin user with the credentials:
- Email: `jj@eqtr.com`
- Password: `GWP2026!`

## Steps:

1. **Get your Supabase Service Role Key:**
   - Go to your Supabase Dashboard
   - Navigate to Settings > API
   - Copy the `service_role` key (this is different from the `anon` key - keep it secret!)

2. **Add to your .env file:**
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

4. **Run the setup script:**
   ```bash
   npm run create-admin
   ```

5. **Log in:**
   - Go to `/admin` in your app
   - Use email: `jj@eqtr.com`
   - Use password: `GWP2026!`

## Alternative: Manual Setup

If you prefer to create the user manually:

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" or "Invite user"
3. Enter email: `jj@eqtr.com`
4. Set password: `GWP2026!`
5. The user will be created and can log in immediately
