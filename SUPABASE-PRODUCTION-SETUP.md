# Supabase Production Configuration Guide

Complete guide for configuring Supabase to work with your production domain.

## Overview

When deploying to production, you need to update Supabase settings to:
1. Allow authentication redirects from your production domain
2. Configure CORS if needed
3. Update site URL for proper email links
4. Ensure security settings are production-ready

## Prerequisites

- [ ] Supabase project created
- [ ] Production domain ready (e.g., `https://goodweeplace.com`)
- [ ] Access to Supabase Dashboard

## Step 1: Configure Authentication Redirect URLs

This is **critical** - without this, users won't be able to log in on your production site.

### In Supabase Dashboard

1. **Go to your Supabase project dashboard**

2. **Navigate to:** Authentication → URL Configuration

3. **Add Redirect URLs:**
   
   Add your production domain(s):
   ```
   https://yourdomain.com
   https://yourdomain.com/**
   https://www.yourdomain.com
   https://www.yourdomain.com/**
   ```
   
   **Note:** 
   - Include both `www` and non-`www` versions if you use both
   - The `/**` wildcard allows all routes to handle auth callbacks
   - Add each URL on a new line

4. **Update Site URL:**
   
   Set the **Site URL** to your production domain:
   ```
   https://yourdomain.com
   ```
   
   This is used for:
   - Email confirmation links
   - Password reset emails
   - Magic link emails

5. **Click "Save"**

### Redirect URL Examples

For domain `goodweeplace.com`:
```
https://goodweeplace.com
https://goodweeplace.com/**
https://www.goodweeplace.com
https://www.goodweeplace.com/**
```

For subdomain `app.goodweeplace.com`:
```
https://app.goodweeplace.com
https://app.goodweeplace.com/**
```

## Step 2: Configure CORS (If Needed)

Supabase typically handles CORS automatically, but you may need to configure it for custom scenarios.

### Check CORS Settings

1. **Go to:** Settings → API

2. **Review CORS settings:**
   - Supabase usually allows all origins by default
   - For production, you may want to restrict to your domain

3. **If restricting CORS:**
   - Add your production domain to allowed origins
   - Format: `https://yourdomain.com`

**Note:** Most Supabase projects work without CORS configuration. Only configure if you encounter CORS errors.

## Step 3: Verify Email Settings

Ensure email authentication works correctly in production.

### Email Provider Configuration

1. **Go to:** Authentication → Providers → Email

2. **Verify settings:**
   - [ ] Email provider is enabled
   - [ ] Email templates are configured
   - [ ] SMTP settings are correct (if using custom SMTP)

3. **Test email delivery:**
   - Try password reset flow
   - Verify emails are received
   - Check spam folder if needed

### Email Templates

Supabase provides default email templates. You can customize them:

1. **Go to:** Authentication → Email Templates

2. **Customize templates:**
   - Confirmation email
   - Password reset email
   - Magic link email

3. **Update links:**
   - Ensure links point to your production domain
   - Use `{{ .SiteURL }}` variable (automatically uses Site URL setting)

## Step 4: Storage Bucket Configuration

Verify storage buckets are configured for production.

### Check Bucket Settings

1. **Go to:** Storage

2. **Verify buckets exist:**
   - [ ] `stickers` bucket exists and is public
   - [ ] `logos` bucket exists and is public

3. **Check bucket policies:**
   - Public buckets should allow read access
   - Upload policies should be configured correctly

### Storage CORS (If Needed)

If you encounter CORS errors with storage:

1. **Go to:** Storage → Settings

2. **Configure CORS:**
   - Add your production domain
   - Allow necessary HTTP methods (GET, POST, PUT, DELETE)

## Step 5: Database Security

Review Row Level Security (RLS) policies for production.

### Verify RLS Policies

1. **Go to:** Authentication → Policies

2. **Review policies:**
   - Ensure RLS is enabled on all tables
   - Verify policies match production requirements
   - Test that public read access works for approved venues

3. **Check admin policies:**
   - Verify admin users can access admin routes
   - Test admin dashboard functionality

### Migration Status

Ensure all migrations are run:

1. **Go to:** SQL Editor

2. **Verify migrations:**
   - [ ] `001_initial_schema.sql` - Run
   - [ ] `002_admin_policies.sql` - Run
   - [ ] `003_add_website_to_venues.sql` - Run

## Step 6: API Keys and Security

### Verify API Keys

1. **Go to:** Settings → API

2. **Review keys:**
   - **Project URL:** Use this for `VITE_SUPABASE_URL`
   - **anon/public key:** Use this for `VITE_SUPABASE_ANON_KEY`
   - **service_role key:** Use this for `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

3. **Security notes:**
   - ✅ `anon` key is safe to expose in client-side code
   - ⚠️ `service_role` key should NEVER be exposed in client-side code
   - ⚠️ `service_role` key should only be used server-side

### Rate Limiting

Supabase has built-in rate limiting. For production:

1. **Monitor usage:**
   - Check API usage in dashboard
   - Monitor for abuse

2. **Configure if needed:**
   - Adjust rate limits in project settings
   - Set up alerts for unusual activity

## Step 7: Environment-Specific Configuration

### Development vs Production

You may want separate Supabase projects:

- **Development:** For local development
- **Production:** For live site

### Using Same Project for Both

If using the same project:

1. **Add both domains to redirect URLs:**
   ```
   http://localhost:5173
   http://localhost:5173/**
   https://yourdomain.com
   https://yourdomain.com/**
   ```

2. **Site URL:** Set to production domain (development will still work)

## Step 8: Testing Production Configuration

### Pre-Deployment Checklist

- [ ] Redirect URLs added for production domain
- [ ] Site URL set to production domain
- [ ] Email templates configured
- [ ] Storage buckets configured
- [ ] RLS policies verified
- [ ] All migrations run

### Post-Deployment Testing

1. **Test Authentication:**
   - [ ] User can register new account
   - [ ] User can log in
   - [ ] User can log out
   - [ ] Password reset works
   - [ ] Email confirmation works

2. **Test Admin Access:**
   - [ ] Admin can log in
   - [ ] Admin dashboard loads
   - [ ] Admin can approve/reject submissions

3. **Test Data Access:**
   - [ ] Public can view approved venues
   - [ ] Public can submit forms
   - [ ] Map displays venues correctly

4. **Test Storage:**
   - [ ] Images can be uploaded
   - [ ] Images display correctly
   - [ ] Public access works

## Troubleshooting

### Authentication Not Working

**Error: "Invalid redirect URL"**
- Solution: Add production domain to Redirect URLs in Supabase
- Verify URL matches exactly (including https://)
- Check for trailing slashes

**Error: "Email not confirmed"**
- Solution: Check email provider settings
- Verify email templates
- Check spam folder

### CORS Errors

**Error: "CORS policy blocked"**
- Solution: Add domain to CORS settings (if restricting)
- Or verify Supabase allows all origins (default)
- Check browser console for specific error

### Storage Access Issues

**Error: "Storage bucket not found"**
- Solution: Verify buckets exist in Supabase Storage
- Check bucket names match code (`stickers`, `logos`)
- Verify buckets are set to public

**Error: "Permission denied"**
- Solution: Check bucket policies
- Verify RLS policies on storage
- Check user authentication status

### Email Not Sending

**Emails not received**
- Check SMTP settings (if using custom SMTP)
- Verify email provider is enabled
- Check spam folder
- Review email logs in Supabase dashboard

## Security Best Practices

### Production Checklist

- [ ] Use HTTPS only (Vercel handles this)
- [ ] `service_role` key never exposed in client
- [ ] RLS enabled on all tables
- [ ] Rate limiting configured
- [ ] Regular backups enabled
- [ ] Monitor for suspicious activity

### API Key Security

- ✅ **Safe in client:** `anon` key (in `VITE_SUPABASE_ANON_KEY`)
- ❌ **Never in client:** `service_role` key
- ✅ **Safe in server:** `service_role` key (server-side only)

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/security)
- [Supabase CORS Configuration](https://supabase.com/docs/guides/api/cors)

## Quick Reference

### Redirect URLs Format
```
https://yourdomain.com
https://yourdomain.com/**
```

### Site URL Format
```
https://yourdomain.com
```

### Environment Variables
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Review browser console errors
3. Verify all configuration steps completed
4. Check Supabase status page
5. Consult Supabase documentation
