# Deployment Guide - Good Wee Place

Complete guide for deploying Good Wee Place to Vercel with a custom domain.

## Prerequisites

- [ ] Code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Domain name ready to use
- [ ] Supabase project set up (see `SUPABASE-PRODUCTION-SETUP.md`)

## Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push
   ```

2. **Verify these files are in your repository:**
   - `vercel.json` ✓
   - `package.json` ✓
   - `vite.config.js` ✓
   - `src/` directory ✓
   - `public/` directory ✓

3. **Verify `.env` is NOT in your repository** (it should be in `.gitignore`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Import your Git repository:**
   - Select your Git provider (GitHub, GitLab, etc.)
   - Choose the repository containing Good Wee Place
   - Click "Import"

4. **Configure project settings:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (should auto-detect)
   - **Output Directory:** `dist` (should auto-detect)
   - **Install Command:** `npm install` (should auto-detect)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
   
   **Important:** 
   - Use your **production** Supabase credentials
   - These are the same values from your `.env` file
   - Get them from: Supabase Dashboard → Settings → API

6. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Set environment variables when prompted

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Custom Domain

### In Vercel Dashboard

1. **Go to your project** in Vercel dashboard

2. **Navigate to Settings → Domains**

3. **Add your domain:**
   - Enter your domain name (e.g., `goodweeplace.com`)
   - Click "Add"

4. **Configure DNS:**
   Vercel will show you DNS records to add. You have two options:

   **Option 1: Use Vercel Nameservers (Recommended)**
   - Copy the nameservers shown
   - Go to your domain registrar (where you bought the domain)
   - Update nameservers to the Vercel ones
   - Wait for DNS propagation (can take up to 48 hours, usually 1-2 hours)

   **Option 2: Add DNS Records**
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to your Vercel deployment URL
   - Follow the specific instructions shown in Vercel dashboard

5. **Wait for DNS verification:**
   - Vercel will automatically verify your domain
   - You'll see a green checkmark when it's ready
   - SSL certificate will be automatically provisioned

### Domain Configuration Details

- **Root domain:** `yourdomain.com`
- **Subdomain:** `www.yourdomain.com` (optional, can redirect to root)
- **SSL:** Automatically provisioned by Vercel (Let's Encrypt)

## Step 4: Update Supabase Configuration

**⚠️ IMPORTANT:** You must update Supabase settings before authentication will work in production.

See `SUPABASE-PRODUCTION-SETUP.md` for detailed instructions.

Quick steps:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your production domain to **Redirect URLs**
3. Update **Site URL** to your production domain

## Step 5: Verify Deployment

### Pre-Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Environment variables set in Vercel
- [ ] Domain added to Vercel project
- [ ] DNS configured and verified
- [ ] Supabase redirect URLs updated

### Post-Deployment Verification

1. **Visit your domain:**
   - Open `https://yourdomain.com` in a browser
   - Verify the site loads correctly

2. **Test all routes:**
   - [ ] Home page (`/`) - Map should display
   - [ ] What It Means page (`/what-it-means`)
   - [ ] Forms page (`/forms`)
   - [ ] Admin page (`/admin`) - Should redirect to login

3. **Test functionality:**
   - [ ] Map displays venues (if any exist)
   - [ ] Forms can be submitted
   - [ ] Authentication works (login/logout)
   - [ ] Admin dashboard accessible after login

4. **Check browser console:**
   - Open DevTools (F12)
   - Check for any errors in Console tab
   - Verify no CORS errors

5. **Test on mobile:**
   - Open site on mobile device
   - Verify responsive design works
   - Test form submissions

## Step 6: Continuous Deployment

Vercel automatically deploys when you push to your main branch:

1. **Make changes locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **Vercel automatically:**
   - Detects the push
   - Runs build
   - Deploys to production
   - Updates your domain

You can view deployment status in Vercel dashboard.

## Environment Variables Reference

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for admin scripts) | Supabase Dashboard → Settings → API → service_role key |

### Setting Environment Variables in Vercel

1. Go to Project → Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save

**Note:** Changes to environment variables require a new deployment to take effect.

## Troubleshooting

### Build Fails

**Error: "Missing Supabase environment variables"**
- Solution: Add environment variables in Vercel dashboard
- Go to Settings → Environment Variables
- Add all three required variables
- Redeploy

**Error: "Module not found"**
- Solution: Ensure `package.json` includes all dependencies
- Run `npm install` locally to verify
- Check `node_modules` is in `.gitignore` (should be)

### Domain Not Working

**Domain shows "Not Found" or doesn't load**
- Check DNS records are correct
- Wait for DNS propagation (can take up to 48 hours)
- Verify domain is added in Vercel dashboard
- Check SSL certificate status in Vercel

**SSL Certificate Issues**
- Vercel automatically provisions SSL
- Wait 5-10 minutes after DNS verification
- Check certificate status in Vercel dashboard

### Authentication Not Working

**Users can't log in**
- Verify Supabase redirect URLs are updated (see `SUPABASE-PRODUCTION-SETUP.md`)
- Check environment variables are set correctly
- Verify Supabase project is active
- Check browser console for errors

### Map Not Displaying

**Map shows blank or errors**
- Check browser console for errors
- Verify Leaflet CSS is loading
- Check network tab for failed requests
- Ensure internet connection (Leaflet loads tiles from CDN)

### Routes Return 404

**Direct URL access returns 404**
- Verify `vercel.json` includes rewrite rules
- Check that all routes redirect to `index.html`
- Clear browser cache and try again

## Performance Optimization

### Already Configured

- ✅ Code splitting (vendor chunks separated)
- ✅ Asset optimization (minification, compression)
- ✅ Caching headers for static assets
- ✅ Security headers

### Additional Optimizations (Optional)

1. **Image Optimization:**
   - Use Vercel's Image Optimization API
   - Compress images before uploading

2. **CDN:**
   - Vercel automatically uses CDN
   - Assets are cached globally

3. **Analytics:**
   - Add Vercel Analytics in dashboard
   - Monitor performance metrics

## Rollback Deployment

If something goes wrong:

1. Go to Vercel dashboard → Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"
4. Your domain will revert to that version

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Supabase Documentation](https://supabase.com/docs)
- Project-specific: See `SUPABASE-PRODUCTION-SETUP.md`

## Next Steps After Deployment

1. ✅ Test all functionality
2. ✅ Monitor error logs in Vercel dashboard
3. ✅ Set up error tracking (optional: Sentry, LogRocket)
4. ✅ Configure analytics (optional: Google Analytics, Plausible)
5. ✅ Set up monitoring alerts
6. ✅ Document any custom configurations
