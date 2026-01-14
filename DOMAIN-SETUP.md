# How to Point Your Domain to Vercel

Quick guide for connecting your custom domain to your Vercel deployment.

## Prerequisites

- [ ] Your site is deployed on Vercel (even if it's just the default `.vercel.app` URL)
- [ ] You have access to your domain registrar (where you bought the domain)
- [ ] You have access to your Vercel project dashboard

## Step-by-Step Instructions

### Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Open your Good Wee Place project

2. **Navigate to Domain Settings:**
   - Click on **Settings** tab
   - Click on **Domains** in the left sidebar

3. **Add Your Domain:**
   - Enter your domain name (e.g., `goodweeplace.com`)
   - Click **"Add"** or **"Add Domain"**

4. **Vercel Will Show DNS Instructions:**
   - You'll see specific DNS records you need to add
   - Vercel will show you **two options** (see below)

### Step 2: Choose Your DNS Configuration Method

You have **two options** - choose the one that works best for you:

---

## Option 1: Use Vercel Nameservers (Easiest - Recommended)

**Best for:** Most users, easiest setup, full Vercel DNS management

### Steps:

1. **In Vercel Dashboard:**
   - After adding your domain, Vercel will show you **nameservers**
   - They'll look like:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Copy these nameservers

2. **Go to Your Domain Registrar:**
   - Log into where you bought your domain (GoDaddy, Namecheap, Google Domains, etc.)
   - Find **DNS Settings** or **Nameservers** section

3. **Update Nameservers:**
   - Replace your current nameservers with Vercel's nameservers
   - Save changes

4. **Wait for DNS Propagation:**
   - Usually takes 1-2 hours (can take up to 48 hours)
   - Vercel will automatically verify when it's ready
   - You'll see a green checkmark in Vercel dashboard when verified

**That's it!** Vercel handles everything else automatically.

---

## Option 2: Add DNS Records (Advanced)

**Best for:** Users who want to keep using their current DNS provider

### Steps:

1. **In Vercel Dashboard:**
   - After adding your domain, Vercel will show you **DNS records** to add
   - You'll see something like:
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

2. **Go to Your DNS Provider:**
   - Log into your DNS provider (could be your registrar or a separate DNS service like Cloudflare)
   - Find **DNS Records** or **DNS Management** section

3. **Add the DNS Record:**
   - Click **"Add Record"** or **"Create Record"**
   - Enter the values Vercel provided:
     - **Type:** A or CNAME (as shown by Vercel)
     - **Name/Host:** @ (for root domain) or leave blank
     - **Value/Target:** The value Vercel provided
     - **TTL:** Leave default or set to 3600
   - Save the record

4. **For WWW Subdomain (Optional):**
   - If you want `www.yourdomain.com` to work:
   - Add another CNAME record:
     - **Type:** CNAME
     - **Name:** www
     - **Value:** cname.vercel-dns.com (or what Vercel shows)

5. **Wait for DNS Propagation:**
   - Usually takes 1-2 hours
   - Vercel will verify automatically

---

## Step 3: Verify Domain Connection

### In Vercel Dashboard:

1. **Check Domain Status:**
   - Go to **Settings → Domains**
   - You'll see your domain listed
   - Status will show:
     - ⏳ **"Pending"** - DNS is propagating (wait)
     - ✅ **"Valid"** - Domain is connected and working!
     - ❌ **"Invalid"** - Check DNS settings

2. **SSL Certificate:**
   - Vercel automatically provisions SSL (HTTPS)
   - This happens automatically after DNS verification
   - Usually takes 5-10 minutes after DNS is verified

### Test Your Domain:

1. **Wait for DNS to propagate** (1-2 hours typically)
2. **Visit your domain** in a browser: `https://yourdomain.com`
3. **You should see your site!**

---

## Common Domain Registrars - Quick Links

### Where to Find DNS Settings:

- **GoDaddy:** My Products → Domains → DNS
- **Namecheap:** Domain List → Manage → Advanced DNS
- **Google Domains:** DNS → Custom Records
- **Cloudflare:** DNS → Records
- **Name.com:** Domains → DNS Records
- **Hover:** DNS → DNS Records

---

## Troubleshooting

### Domain Shows "Pending" for a Long Time

**Wait longer:**
- DNS propagation can take up to 48 hours
- Usually completes within 1-2 hours
- Check again in a few hours

**Check DNS settings:**
- Verify nameservers/DNS records are correct
- Make sure you saved changes at your registrar
- Double-check you're editing the right domain

### Domain Shows "Invalid Configuration"

**Check:**
- Nameservers match exactly what Vercel provided
- DNS records match exactly what Vercel provided
- No typos in domain name
- You're editing DNS for the correct domain

### Site Not Loading After DNS Verification

**Try:**
- Clear browser cache
- Try incognito/private browsing
- Check if HTTPS works: `https://yourdomain.com`
- Wait a few more minutes (SSL provisioning takes time)

### "DNS Record Not Found" Error

**Solution:**
- Make sure DNS records are saved at your registrar
- Wait for DNS propagation (can take time)
- Verify record values match Vercel exactly

---

## Quick Checklist

- [ ] Domain added in Vercel dashboard
- [ ] Nameservers or DNS records updated at registrar
- [ ] Changes saved at registrar
- [ ] Waited for DNS propagation (1-2 hours)
- [ ] Domain shows "Valid" in Vercel
- [ ] SSL certificate provisioned (automatic)
- [ ] Site loads at `https://yourdomain.com`

---

## Need Help?

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Vercel DNS Docs:** [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
- **Check DNS propagation:** Use [whatsmydns.net](https://www.whatsmydns.net) to see if DNS has propagated globally

---

## Example: Complete Setup Flow

1. ✅ Deploy site to Vercel → Get `yourproject.vercel.app` URL
2. ✅ Add `goodweeplace.com` in Vercel → Settings → Domains
3. ✅ Vercel shows: "Use nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com"
4. ✅ Go to GoDaddy → DNS Settings → Change nameservers
5. ✅ Wait 1-2 hours
6. ✅ Vercel shows domain as "Valid" ✅
7. ✅ Visit `https://goodweeplace.com` → Site loads! 🎉

That's it! Your domain is now pointing to your Vercel site.
