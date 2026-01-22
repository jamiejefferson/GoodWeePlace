# Domain Connection Checklist

Quick checklist to connect your domain to Vercel. Follow `CONNECT-DOMAIN-STEP-BY-STEP.md` for detailed instructions.

## Quick Steps

### ✅ Step 1: Add Domain in Vercel
- [ ] Go to: https://vercel.com/jjs-projects-97daa8bc
- [ ] Click your project
- [ ] Settings → Domains
- [ ] Enter your domain (e.g., `goodweeplace.com`)
- [ ] Click "Add"
- [ ] Copy the nameservers or DNS records Vercel shows

**Status:** ⏳ Pending user action

---

### ✅ Step 2: Configure DNS
Choose one option:

**Option A: Nameservers (Easiest)**
- [ ] Go to your domain registrar
- [ ] Find DNS/Nameservers settings
- [ ] Replace with Vercel's nameservers
- [ ] Save changes

**Option B: DNS Records**
- [ ] Go to your DNS provider
- [ ] Add the DNS record Vercel provided
- [ ] Save changes

**Status:** ⏳ Pending user action

---

### ✅ Step 3: Wait for Verification
- [ ] Wait 1-2 hours (can take up to 48 hours)
- [ ] Check Vercel dashboard → Settings → Domains
- [ ] Look for green checkmark ✅
- [ ] SSL certificate will auto-provision (5-10 min after verification)

**Status:** ⏳ Waiting for DNS propagation

---

### ✅ Step 4: Update Supabase
- [ ] Go to: https://app.supabase.com
- [ ] Select your project
- [ ] Authentication → URL Configuration
- [ ] Add redirect URLs:
  ```
  https://yourdomain.com
  https://yourdomain.com/**
  https://www.yourdomain.com
  https://www.yourdomain.com/**
  ```
- [ ] Update Site URL to: `https://yourdomain.com`
- [ ] Click "Save"

**Status:** ⏳ Pending user action

---

### ✅ Step 5: Test Everything
- [ ] Visit: `https://yourdomain.com`
- [ ] Site loads correctly
- [ ] HTTPS works (lock icon)
- [ ] All pages work: `/`, `/what-it-means`, `/forms`, `/press-release`
- [ ] No 404 errors
- [ ] Authentication works (try `/admin`)
- [ ] Map displays (if configured)

**Status:** ⏳ Pending verification

---

## Current Status

Track your progress here:

**Step 1:** ⬜ Not started | ⏳ In progress | ✅ Complete
**Step 2:** ⬜ Not started | ⏳ In progress | ✅ Complete  
**Step 3:** ⬜ Not started | ⏳ Waiting | ✅ Complete
**Step 4:** ⬜ Not started | ⏳ In progress | ✅ Complete
**Step 5:** ⬜ Not started | ⏳ In progress | ✅ Complete

---

## Need Help?

- **Detailed guide:** See `CONNECT-DOMAIN-STEP-BY-STEP.md`
- **Troubleshooting:** See `DOMAIN-SETUP.md`
- **Supabase help:** See `SUPABASE-PRODUCTION-SETUP.md`

---

## Quick Links

- **Vercel Dashboard:** https://vercel.com/jjs-projects-97daa8bc
- **Supabase Dashboard:** https://app.supabase.com
- **Common Registrars:**
  - GoDaddy: https://godaddy.com
  - Namecheap: https://namecheap.com
  - Google Domains: https://domains.google.com
  - Cloudflare: https://cloudflare.com
