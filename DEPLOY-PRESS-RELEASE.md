# Deploy Press Release Page to Live Site

Instructions for deploying the new press release page to your live Vercel site.

## What Was Added

1. ✅ New press release page at `/press-release`
2. ✅ Footer link added next to "Login" button
3. ✅ Route added to App.jsx

## Step 1: Verify Changes Locally

Before deploying, test locally:

```bash
cd /Users/jamie.jefferson/AppDev/GoodWeePlace
npm run dev
```

Then check:
- [ ] Home page loads: `http://localhost:5173/`
- [ ] Press release page loads: `http://localhost:5173/press-release`
- [ ] Footer shows "Press Release" link next to "Login"
- [ ] Link works and navigates to press release page
- [ ] No console errors (press F12 to check)

## Step 2: Commit Changes to Git

Once you've verified everything works locally:

```bash
# Make sure you're in the project directory
cd /Users/jamie.jefferson/AppDev/GoodWeePlace

# Check what files changed
git status

# Add all the new/changed files
git add src/pages/PressReleasePage.jsx
git add src/App.jsx
git add src/components/Layout.jsx

# Commit with a descriptive message
git commit -m "Add press release page and footer link"

# Push to your repository
git push
```

## Step 3: Vercel Auto-Deployment

Vercel will automatically:
1. Detect the push to your repository
2. Start a new deployment
3. Build the project
4. Deploy to production

**Wait time:** Usually 1-2 minutes

## Step 4: Monitor Deployment

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/jjs-projects-97daa8bc
   - Click on your project

2. **Check Deployments:**
   - Go to **Deployments** tab
   - You'll see a new deployment in progress
   - Wait for it to show "Ready" ✅

3. **Check Build Logs (if needed):**
   - Click on the deployment
   - Check **Build Logs** tab for any errors
   - If there are errors, fix them and push again

## Step 5: Verify on Live Site

After deployment completes:

1. **Visit your live site:**
   - Go to your Vercel URL or custom domain

2. **Test the press release page:**
   - [ ] Scroll to footer
   - [ ] See "Press Release" link next to "Login"
   - [ ] Click "Press Release" link
   - [ ] Page loads with all content
   - [ ] No 404 errors
   - [ ] Page refresh works (no 404)

3. **Test navigation:**
   - [ ] Can navigate back to home
   - [ ] All other pages still work
   - [ ] Footer link appears on all pages

## Troubleshooting

### Build Fails

**Check build logs in Vercel:**
- Look for specific error messages
- Common issues:
  - Syntax errors in new files
  - Missing imports
  - TypeScript/ESLint errors

**Fix and redeploy:**
- Fix the error locally
- Test with `npm run build`
- Commit and push again

### Page Shows 404

**If `/press-release` shows 404:**
- Verify `vercel.json` has the rewrite rules (should already be there)
- Check that the route is added in `App.jsx`
- Try redeploying

### Footer Link Not Showing

**Check:**
- Verify `Layout.jsx` was updated and committed
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check in incognito/private browsing

### Changes Not Appearing

**Wait longer:**
- Vercel deployments can take 2-3 minutes
- Check deployment status in dashboard
- Make sure deployment shows "Ready" ✅

**Clear cache:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or try incognito/private browsing

## Quick Command Reference

```bash
# Navigate to project
cd /Users/jamie.jefferson/AppDev/GoodWeePlace

# Check status
git status

# Add files
git add src/pages/PressReleasePage.jsx src/App.jsx src/components/Layout.jsx

# Commit
git commit -m "Add press release page and footer link"

# Push to deploy
git push
```

## Files Changed

- ✅ `src/pages/PressReleasePage.jsx` (new file)
- ✅ `src/App.jsx` (added route)
- ✅ `src/components/Layout.jsx` (added footer link)

## Next Steps After Deployment

Once live:
- [ ] Share the press release URL with your team
- [ ] Update any external links if needed
- [ ] Monitor for any issues
- [ ] Consider adding to main navigation menu if desired

## Need Help?

If something goes wrong:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all files were committed
4. Try redeploying manually in Vercel dashboard
