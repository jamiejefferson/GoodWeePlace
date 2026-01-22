# Fix: Missing Supabase Environment Variables

You're seeing: `Uncaught Error: Missing Supabase environment variables`

This means the environment variables aren't set in Vercel. Here's exactly how to fix it:

## Step-by-Step Fix

### Step 1: Get Your Supabase Credentials

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Sign in and select your project

2. **Navigate to Settings → API:**
   - You'll see three important values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)
     - **service_role** key (long string starting with `eyJ...` - this one is secret!)

3. **Copy each value** - you'll need them in the next step

### Step 2: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/jjs-projects-97daa8bc
   - Click on your project (the one that's not working)

2. **Go to Settings:**
   - Click the **Settings** tab at the top
   - Click **Environment Variables** in the left sidebar

3. **Add Variable 1 - VITE_SUPABASE_URL:**
   - Click **"Add New"** button
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** Paste your Supabase Project URL (from Step 1)
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **"Save"**

4. **Add Variable 2 - VITE_SUPABASE_ANON_KEY:**
   - Click **"Add New"** button again
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Paste your Supabase anon/public key (from Step 1)
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

5. **Add Variable 3 - SUPABASE_SERVICE_ROLE_KEY:**
   - Click **"Add New"** button again
   - **Key:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** Paste your Supabase service_role key (from Step 1)
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

### Step 3: Redeploy Your Site

After adding all three variables, you need to redeploy:

**Option A: Redeploy from Dashboard (Easiest)**
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

**Option B: Trigger New Deployment**
- Make a small change to your code and push to Git
- Vercel will automatically deploy

### Step 4: Wait and Test

1. **Wait for deployment** (usually 1-2 minutes)
   - You'll see "Building..." then "Ready"
   - The deployment status will turn green ✅

2. **Test your site:**
   - Visit: https://my-project-7lf315joq-jjs-projects-97daa8bc.vercel.app/
   - Press F12 → Console tab
   - The error should be gone! ✅

## Visual Guide

### What You Should See in Vercel:

**Environment Variables Section:**
```
VITE_SUPABASE_URL          [Production] [Preview] [Development]
VITE_SUPABASE_ANON_KEY     [Production] [Preview] [Development]
SUPABASE_SERVICE_ROLE_KEY  [Production] [Preview] [Development]
```

### Important Notes:

⚠️ **Make sure you:**
- Use the exact key names (case-sensitive): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Don't add quotes around the values
- Don't add spaces before/after values
- Select all three environments (Production, Preview, Development) for each variable
- Redeploy after adding variables (they don't apply to existing deployments)

## Quick Checklist

- [ ] Got Supabase credentials from Supabase Dashboard → Settings → API
- [ ] Added `VITE_SUPABASE_URL` in Vercel
- [ ] Added `VITE_SUPABASE_ANON_KEY` in Vercel
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY` in Vercel
- [ ] Selected all three environments for each variable
- [ ] Redeployed the site
- [ ] Waited for deployment to complete
- [ ] Tested the site - error should be gone!

## Still Seeing the Error?

If you still see the error after redeploying:

1. **Double-check variable names:**
   - Must be exactly: `VITE_SUPABASE_URL` (not `SUPABASE_URL`)
   - Must be exactly: `VITE_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

2. **Verify values:**
   - No extra spaces
   - No quotes
   - Complete values copied from Supabase

3. **Check deployment:**
   - Make sure you redeployed AFTER adding variables
   - Check deployment logs for any errors

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or try incognito/private browsing

## After It Works

Once the error is gone, you should see:
- ✅ Site loads without errors
- ✅ Map displays (if configured)
- ✅ Forms work
- ✅ No errors in browser console

Then you can proceed to add your custom domain!
