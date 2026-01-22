# 🚀 START HERE: Connect Your Domain

**Quick start guide to connect your custom domain to your live Vercel site.**

## ⚡ Quick Summary

You need to complete 5 steps (mostly clicking buttons in web dashboards):

1. **Add domain in Vercel** (2 minutes)
2. **Configure DNS at registrar** (5 minutes)
3. **Wait for verification** (1-2 hours - automatic)
4. **Update Supabase** (2 minutes)
5. **Test everything** (5 minutes)

**Total active time:** ~10 minutes  
**Total wait time:** 1-2 hours

---

## 📋 Step-by-Step (Follow in Order)

### Step 1: Add Domain in Vercel ⏳

**Time:** 2 minutes  
**Action Required:** Click buttons in Vercel dashboard

1. **Open Vercel:**
   - Go to: https://vercel.com/jjs-projects-97daa8bc
   - Sign in if needed

2. **Find Your Project:**
   - Click on your **Good Wee Place** project

3. **Go to Domains:**
   - Click **Settings** tab (top)
   - Click **Domains** (left sidebar)

4. **Add Your Domain:**
   - In the input field, type your domain (e.g., `goodweeplace.com`)
   - Click **"Add"** or **"Add Domain"**

5. **Copy Configuration Info:**
   - Vercel will show you either:
     - **Nameservers** (like `ns1.vercel-dns.com`)
     - **DNS Records** (A or CNAME records)
   - **Copy these** - you'll need them in Step 2!

**✅ Checkpoint:** You should see your domain listed in Vercel with "Pending" status.

**📖 Need more detail?** See `CONNECT-DOMAIN-STEP-BY-STEP.md` Step 1

---

### Step 2: Configure DNS ⏳

**Time:** 5 minutes  
**Action Required:** Update DNS at your domain registrar

**Choose ONE option:**

#### Option A: Use Vercel Nameservers (Easiest) ⭐ Recommended

1. **Copy nameservers from Vercel** (from Step 1)
2. **Go to your domain registrar** (where you bought the domain):
   - GoDaddy: https://godaddy.com
   - Namecheap: https://namecheap.com
   - Google Domains: https://domains.google.com
   - Or wherever you bought it
3. **Find DNS/Nameservers settings:**
   - Look for "DNS Settings", "Nameservers", or "DNS Management"
4. **Update nameservers:**
   - Delete old nameservers
   - Add Vercel's nameservers (from Step 1)
   - Save changes

#### Option B: Add DNS Records

1. **Copy DNS records from Vercel** (from Step 1)
2. **Go to your DNS provider**
3. **Add the DNS record** Vercel provided
4. **Save changes**

**✅ Checkpoint:** DNS changes are saved at your registrar.

**📖 Need more detail?** See `CONNECT-DOMAIN-STEP-BY-STEP.md` Step 2

---

### Step 3: Wait for Verification ⏳

**Time:** 1-2 hours (usually)  
**Action Required:** Wait and check back

1. **Wait 1-2 hours** (can take up to 48 hours, but usually faster)
2. **Check Vercel dashboard:**
   - Go back to: Settings → Domains
   - Look for your domain status:
     - ⏳ **"Pending"** = Still waiting (check back later)
     - ✅ **"Valid"** = Success! Domain is connected!
     - ❌ **"Invalid"** = Check DNS settings

3. **SSL Certificate:**
   - Automatically provisioned after DNS verification
   - Takes 5-10 minutes after DNS is verified

**✅ Checkpoint:** Domain shows "Valid" ✅ in Vercel dashboard.

**📖 Need more detail?** See `CONNECT-DOMAIN-STEP-BY-STEP.md` Step 3

---

### Step 4: Update Supabase ⏳

**Time:** 2 minutes  
**Action Required:** Update Supabase settings

**⚠️ IMPORTANT:** Do this AFTER Step 3 is complete, or authentication won't work!

1. **Go to Supabase:**
   - Visit: https://app.supabase.com
   - Sign in and select your project

2. **Go to URL Configuration:**
   - Click **Authentication** (left sidebar)
   - Click **URL Configuration**

3. **Add Redirect URLs:**
   - In **Redirect URLs** field, add (replace `yourdomain.com` with your actual domain):
     ```
     https://yourdomain.com
     https://yourdomain.com/**
     https://www.yourdomain.com
     https://www.yourdomain.com/**
     ```
   - Add each on a new line
   - Click **"Save"**

4. **Update Site URL:**
   - Find **Site URL** field
   - Set to: `https://yourdomain.com`
   - Click **"Save"**

**✅ Checkpoint:** Supabase redirect URLs updated.

**📖 Need more detail?** See `CONNECT-DOMAIN-STEP-BY-STEP.md` Step 4

---

### Step 5: Test Everything ✅

**Time:** 5 minutes  
**Action Required:** Visit your site and test

1. **Visit your domain:**
   - Go to: `https://yourdomain.com`
   - Site should load!

2. **Test these:**
   - [ ] Site loads at your domain
   - [ ] HTTPS works (lock icon in browser)
   - [ ] Home page works: `/`
   - [ ] Other pages work: `/what-it-means`, `/forms`, `/press-release`
   - [ ] No 404 errors when refreshing
   - [ ] Authentication works (try `/admin` login)
   - [ ] Map displays (if configured)

**✅ Checkpoint:** Everything works!

**📖 Need more detail?** See `CONNECT-DOMAIN-STEP-BY-STEP.md` Step 5

---

## 🎉 You're Done!

Your site is now live at your custom domain!

---

## 🆘 Need Help?

**Stuck on a step?**
- See `CONNECT-DOMAIN-STEP-BY-STEP.md` for detailed instructions
- See `DOMAIN-SETUP.md` for troubleshooting
- See `SUPABASE-PRODUCTION-SETUP.md` for Supabase help

**Common Issues:**
- Domain still "Pending"? Wait longer (can take up to 48 hours)
- Getting 404 errors? Check `FIX-404-ERROR.md`
- Authentication not working? Make sure you completed Step 4

---

## 📝 Quick Checklist

Use this to track your progress:

- [ ] Step 1: Added domain in Vercel
- [ ] Step 2: Configured DNS at registrar
- [ ] Step 3: Domain verified in Vercel (green checkmark)
- [ ] Step 4: Updated Supabase redirect URLs
- [ ] Step 5: Tested site - everything works!

---

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/jjs-projects-97daa8bc
- **Supabase Dashboard:** https://app.supabase.com
- **Your Site:** `https://yourdomain.com` (after setup)

---

**Ready to start?** Begin with Step 1 above! 🚀
