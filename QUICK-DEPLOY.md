# Quick Deploy to Vercel

Your project needs to be deployed to Vercel first before you can add a domain. Here's how:

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push Code to GitHub

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com) and sign in
   - Click **"New repository"**
   - Name it: `good-wee-place` (or any name you like)
   - Make it **Public** or **Private** (your choice)
   - **Don't** initialize with README, .gitignore, or license
   - Click **"Create repository"**

2. **Push your code to GitHub:**
   ```bash
   cd /Users/jamie.jefferson/AppDev/GoodWeePlace
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Good Wee Place"
   
   # Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

   **Replace:**
   - `YOUR_USERNAME` with your GitHub username
   - `REPO_NAME` with your repository name

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/jjs-projects-97daa8bc](https://vercel.com/jjs-projects-97daa8bc)
   - Sign in if needed

2. **Add New Project:**
   - Click **"Add New Project"** or **"Import Project"**
   - Select **GitHub** (or your Git provider)
   - Authorize Vercel to access your repositories if prompted

3. **Select Repository:**
   - Find and select your `good-wee-place` repository
   - Click **"Import"**

4. **Configure Project:**
   - **Framework Preset:** Should auto-detect as "Vite"
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (should auto-detect)
   - **Output Directory:** `dist` (should auto-detect)
   - **Install Command:** `npm install` (should auto-detect)

5. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add these three variables:
     ```
     VITE_SUPABASE_URL = your_supabase_url_here
     VITE_SUPABASE_ANON_KEY = your_supabase_anon_key_here
     SUPABASE_SERVICE_ROLE_KEY = your_service_role_key_here
     ```
   - Get these from: Supabase Dashboard → Settings → API
   - Select **"Production"** environment for all
   - Click **"Save"**

6. **Deploy:**
   - Click **"Deploy"**
   - Wait for build to complete (usually 1-2 minutes)

7. **Get Your Deployment URL:**
   - After deployment, you'll get a URL like: `good-wee-place-xxxxx.vercel.app`
   - Your site is now live! 🎉

---

## Option 2: Deploy via Vercel CLI (Alternative)

If you prefer command line:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /Users/jamie.jefferson/AppDev/GoodWeePlace
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Set environment variables when prompted

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## After Deployment

Once your project is deployed:

1. **You'll see it in your Vercel dashboard:**
   - Go to [vercel.com/jjs-projects-97daa8bc](https://vercel.com/jjs-projects-97daa8bc)
   - Your "Good Wee Place" project should appear

2. **Then you can add your domain:**
   - Click on your project
   - Go to **Settings → Domains**
   - Add your domain
   - Follow the DNS setup (see `DOMAIN-SETUP.md`)

---

## Troubleshooting

### "No repository found"
- Make sure you've pushed your code to GitHub first
- Verify the repository is accessible to Vercel

### Build fails with "Missing environment variables"
- Make sure you added all three environment variables in Vercel
- Check that values are correct (no extra spaces)

### "Framework not detected"
- Vercel should auto-detect Vite
- If not, manually select "Vite" as framework preset

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Repository connected to Vercel
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Site loads at `.vercel.app` URL
- [ ] Ready to add custom domain

---

## Next Steps After Deployment

1. ✅ Test your site at the `.vercel.app` URL
2. ✅ Verify all functionality works
3. ✅ Then add your custom domain (see `DOMAIN-SETUP.md`)
