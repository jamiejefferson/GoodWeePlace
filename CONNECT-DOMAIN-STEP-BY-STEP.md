# Connect Your Domain - Step-by-Step Guide

Follow these exact steps to connect your custom domain to your live Vercel site.

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] Your domain name (e.g., `goodweeplace.com`)
- [ ] Access to your domain registrar (where you bought the domain)
- [ ] Access to your Vercel dashboard: https://vercel.com/jjs-projects-97daa8bc
- [ ] Access to your Supabase dashboard

---

## Step 1: Add Domain in Vercel Dashboard

### 1.1 Go to Your Vercel Project

1. Visit: https://vercel.com/jjs-projects-97daa8bc
2. Sign in if needed
3. Click on your **Good Wee Place** project (or the project name you see)

### 1.2 Navigate to Domain Settings

1. Click the **Settings** tab at the top
2. In the left sidebar, click **Domains**

### 1.3 Add Your Domain

1. In the "Domains" section, you'll see an input field
2. Enter your domain name (e.g., `goodweeplace.com`)
   - **Don't** include `http://` or `https://`
   - **Don't** include `www.` (add that separately if needed)
3. Click **"Add"** or **"Add Domain"**

### 1.4 Vercel Shows Configuration Options

After adding, Vercel will display:
- DNS configuration instructions
- Two options: Nameservers OR DNS Records
- Specific values you need to use

**📝 Note:** Keep this page open - you'll need the information it shows!

---

## Step 2: Configure DNS at Your Domain Registrar

You have **two options**. Choose the one that works best for you:

---

### Option A: Use Vercel Nameservers (Recommended - Easiest)

**Best for:** Most users, simplest setup

#### 2A.1 Copy Nameservers from Vercel

In Vercel dashboard, you'll see nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
Copy these exactly.

#### 2A.2 Go to Your Domain Registrar

1. Log into where you bought your domain:
   - **GoDaddy:** godaddy.com
   - **Namecheap:** namecheap.com
   - **Google Domains:** domains.google.com
   - **Cloudflare:** cloudflare.com
   - **Other:** Your registrar's website

2. Find your domain in your account

#### 2A.3 Update Nameservers

1. Look for **"DNS Settings"**, **"Nameservers"**, or **"DNS Management"**
2. Click to edit nameservers
3. Replace existing nameservers with Vercel's:
   - Delete old nameservers
   - Add: `ns1.vercel-dns.com`
   - Add: `ns2.vercel-dns.com`
4. **Save changes**

#### 2A.4 Wait for DNS Propagation

- Usually takes **1-2 hours** (can take up to 48 hours)
- Vercel will automatically verify
- Check back in Vercel dashboard - you'll see status update

---

### Option B: Add DNS Records (Keep Current DNS Provider)

**Best for:** Users who want to keep using their current DNS provider

#### 2B.1 Get DNS Records from Vercel

In Vercel dashboard, you'll see DNS records to add, like:
```
Type: A
Name: @
Value: 76.76.21.21
```
OR
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

Copy these values exactly.

#### 2B.2 Go to Your DNS Provider

1. Log into your DNS provider (could be your registrar or separate service like Cloudflare)
2. Find **"DNS Records"** or **"DNS Management"**

#### 2B.3 Add DNS Record

1. Click **"Add Record"** or **"Create Record"**
2. Enter values from Vercel:
   - **Type:** A or CNAME (as shown by Vercel)
   - **Name/Host:** `@` (for root domain) or leave blank
   - **Value/Target:** The value Vercel provided
   - **TTL:** Leave default (usually 3600)
3. **Save** the record

#### 2B.4 Add WWW Subdomain (Optional)

If you want `www.yourdomain.com` to work:
1. Add another CNAME record:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com` (or what Vercel shows)
2. **Save**

#### 2B.5 Wait for DNS Propagation

- Usually takes **1-2 hours**
- Vercel will automatically verify
- Check Vercel dashboard for status

---

## Step 3: Wait for Verification

### 3.1 Check Status in Vercel

1. Go back to Vercel Dashboard → Settings → Domains
2. You'll see your domain listed with status:
   - ⏳ **"Pending"** - DNS is propagating (wait)
   - ✅ **"Valid"** - Domain is connected!
   - ❌ **"Invalid"** - Check DNS settings

### 3.2 SSL Certificate

- Vercel automatically provisions SSL (HTTPS)
- Happens automatically after DNS verification
- Usually takes 5-10 minutes after DNS is verified

### 3.3 Test Your Domain

Once status shows **"Valid"**:
1. Visit your domain: `https://yourdomain.com`
2. You should see your site!
3. Check that HTTPS works (lock icon in browser)

---

## Step 4: Update Supabase Configuration

**⚠️ IMPORTANT:** Do this after your domain is verified, or authentication won't work!

### 4.1 Go to Supabase Dashboard

1. Visit: https://app.supabase.com
2. Sign in and select your project

### 4.2 Update Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. In **Redirect URLs**, add:
   ```
   https://yourdomain.com
   https://yourdomain.com/**
   https://www.yourdomain.com
   https://www.yourdomain.com/**
   ```
   (Replace `yourdomain.com` with your actual domain)
3. Add each URL on a new line
4. Click **"Save"**

### 4.3 Update Site URL

1. In the same page, find **Site URL**
2. Set it to: `https://yourdomain.com`
3. Click **"Save"**

### 4.4 Test Authentication

1. Visit your site at your custom domain
2. Try logging in to admin: `/admin`
3. Authentication should work now!

---

## Step 5: Final Verification

Test everything works:

- [ ] Domain loads: `https://yourdomain.com`
- [ ] HTTPS works (lock icon in browser)
- [ ] Home page displays correctly
- [ ] All routes work: `/what-it-means`, `/forms`, `/press-release`
- [ ] No 404 errors when refreshing pages
- [ ] Authentication works (can log in)
- [ ] Map displays (if configured)
- [ ] Forms work

---

## Troubleshooting

### Domain Shows "Pending" for Hours

**Wait longer:**
- DNS propagation can take up to 48 hours
- Usually completes within 1-2 hours
- Check again in a few hours

**Check DNS:**
- Verify nameservers/DNS records are correct
- Make sure you saved changes at registrar
- Double-check you're editing the right domain

### Domain Shows "Invalid Configuration"

**Check:**
- Nameservers match exactly what Vercel provided
- DNS records match exactly what Vercel provided
- No typos in domain name
- You're editing DNS for the correct domain

### Site Not Loading After Verification

**Try:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try incognito/private browsing
- Check if HTTPS works: `https://yourdomain.com`
- Wait a few more minutes (SSL provisioning takes time)

### Authentication Not Working

**Fix:**
- Make sure you updated Supabase redirect URLs (Step 4)
- Verify URLs match exactly (including `https://`)
- Check for trailing slashes
- Clear browser cache and try again

---

## Quick Reference

### Where to Find Things

**Vercel Dashboard:**
- https://vercel.com/jjs-projects-97daa8bc
- Settings → Domains

**Supabase Dashboard:**
- https://app.supabase.com
- Authentication → URL Configuration

**Common Registrars:**
- **GoDaddy:** My Products → Domains → DNS
- **Namecheap:** Domain List → Manage → Advanced DNS
- **Google Domains:** DNS → Custom Records
- **Cloudflare:** DNS → Records

### Expected Timeline

- **DNS Propagation:** 1-2 hours (can take up to 48 hours)
- **SSL Certificate:** 5-10 minutes after DNS verification
- **Total Time:** Usually 1-3 hours from start to finish

---

## Need Help?

If you get stuck:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all steps completed
4. See `DOMAIN-SETUP.md` for more detailed troubleshooting
5. See `SUPABASE-PRODUCTION-SETUP.md` for Supabase help

---

## Success Checklist

When everything is working, you should have:

- ✅ Domain added in Vercel
- ✅ DNS configured at registrar
- ✅ Domain verified in Vercel (green checkmark)
- ✅ SSL certificate active (HTTPS works)
- ✅ Site loads at custom domain
- ✅ Supabase redirect URLs updated
- ✅ Authentication works
- ✅ All pages accessible

**Congratulations!** Your site is now live at your custom domain! 🎉
