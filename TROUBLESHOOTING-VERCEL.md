# Troubleshooting Vercel Deployment

Your site at https://my-project-7lf315joq-jjs-projects-97daa8bc.vercel.app/ isn't working. Let's fix it!

## Most Common Issue: Missing Environment Variables

The app requires Supabase environment variables. If they're missing, the site will crash on load.

### Step 1: Check What Error You're Seeing

**In your browser:**
1. Open the site: https://my-project-7lf315joq-jjs-projects-97daa8bc.vercel.app/
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for errors - you'll likely see:
   - `"Missing Supabase environment variables"` 
   - Or a blank white page

### Step 2: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/jjs-projects-97daa8bc
   - Click on your **"my-project"** (or "Good Wee Place") project

2. **Go to Settings:**
   - Click **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add These Three Variables:**
   
   Click **"Add New"** and add each one:
   
   **Variable 1:**
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** Your Supabase project URL (get from Supabase Dashboard → Settings → API)
   - **Environments:** Select **Production**, **Preview**, and **Development**
   - Click **Save**
   
   **Variable 2:**
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key (get from Supabase Dashboard → Settings → API)
   - **Environments:** Select **Production**, **Preview**, and **Development**
   - Click **Save**
   
   **Variable 3:**
   - **Key:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** Your Supabase service role key (get from Supabase Dashboard → Settings → API)
   - **Environments:** Select **Production**, **Preview**, and **Development**
   - Click **Save**

4. **Redeploy:**
   - After adding variables, go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger a new deployment

### Step 3: Get Your Supabase Credentials

If you don't have them:

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Sign in and select your project

2. **Navigate to Settings → API:**
   - You'll see:
     - **Project URL** → This is your `VITE_SUPABASE_URL`
     - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`
     - **service_role** key (secret) → This is your `SUPABASE_SERVICE_ROLE_KEY`

3. **Copy each value** and paste into Vercel environment variables

## Other Common Issues

### Issue: Build Failed

**Check build logs:**
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the failed deployment
3. Check the **Build Logs** tab
4. Look for error messages

**Common build errors:**
- Missing dependencies → Check `package.json` is correct
- TypeScript errors → Check code for syntax errors
- Missing files → Verify all files are committed to Git

### Issue: Blank White Page

**Possible causes:**
1. **Missing environment variables** (most common) → See above
2. **JavaScript error** → Check browser console (F12)
3. **Routing issue** → Verify `vercel.json` has rewrite rules

**Fix:**
- Check browser console for errors
- Verify environment variables are set
- Check Vercel deployment logs

### Issue: "404 Not Found" on Routes

**Cause:** SPA routing not configured

**Fix:** Verify `vercel.json` exists and has rewrite rules:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Issue: Map Not Displaying

**Possible causes:**
1. Leaflet CSS not loading
2. Network errors
3. Missing API keys

**Fix:**
- Check browser console for errors
- Verify network tab shows no failed requests
- Check if Leaflet CDN is accessible

## Step-by-Step Fix Checklist

- [ ] Check browser console for specific error
- [ ] Verify environment variables are set in Vercel
- [ ] Check all three variables are added (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Verify variables are set for Production environment
- [ ] Redeploy after adding variables
- [ ] Check Vercel deployment logs for build errors
- [ ] Verify `vercel.json` file exists in repository
- [ ] Check that code is pushed to Git repository

## Quick Test

After adding environment variables and redeploying:

1. **Wait for deployment to complete** (usually 1-2 minutes)
2. **Visit your site:** https://my-project-7lf315joq-jjs-projects-97daa8bc.vercel.app/
3. **Check browser console** (F12) - should see no errors
4. **Test pages:**
   - Home page should load
   - Map should display (if configured)
   - Forms page should load

## Still Not Working?

**Check these:**
1. **Vercel Deployment Logs:**
   - Go to Deployments → Click latest deployment → Check logs

2. **Browser Console:**
   - F12 → Console tab → Look for red errors

3. **Network Tab:**
   - F12 → Network tab → Check for failed requests

4. **Verify Supabase:**
   - Make sure your Supabase project is active
   - Verify credentials are correct
   - Check Supabase dashboard for any errors

## Need More Help?

Share:
- What error you see in browser console
- What Vercel deployment logs show
- Whether environment variables are set

Then I can help you fix the specific issue!
