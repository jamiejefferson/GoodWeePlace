# Migration Checklist: Copying Project to New Laptop

Use this checklist when copying your Good Wee Place project from one laptop to another.

## 🔴 CRITICAL - Must Copy

### 1. **`src/` directory (ENTIRE FOLDER)**
   - **What it is:** All your React components, pages, routes, utilities, and application logic
   - **Why critical:** Without this, you only have a placeholder app
   - **What to look for:** Should contain multiple `.jsx`/`.js` files including:
     - Components (e.g., `Map.jsx`, `Admin.jsx`, `StickerForm.jsx`, etc.)
     - Pages/routes
     - Utilities/hooks
     - Any subdirectories like `components/`, `pages/`, `utils/`, etc.
   - **Action:** Copy the entire `src/` folder from old laptop

### 2. **`.env` file (root directory)**
   - **What it is:** Environment variables containing your Supabase credentials
   - **Why critical:** App won't connect to database without this
   - **Note:** This file is gitignored, so it won't be in version control
   - **Format should be:**
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```
   - **If missing:** Get credentials from Supabase Dashboard → Settings → API
   - **Action:** Copy `.env` file from old laptop, or recreate manually

---

## 🟡 IMPORTANT - Copy If They Exist

### 3. **`public/` directory**
   - **What it is:** Static assets (images, icons, fonts)
   - **What to look for:** 
     - `target.png` (favicon)
     - `GWPSticker.png`
     - Any other images or assets
   - **Action:** Copy entire `public/` folder if it contains files

### 4. **`supabase/migrations/` directory**
   - **What it is:** SQL migration files for database setup
   - **What to look for:** Files like:
     - `001_initial_schema.sql`
     - `002_admin_policies.sql`
   - **Note:** Only needed if you manage migrations locally
   - **If database already set up:** Not required
   - **Action:** Copy if you have migration files

### 5. **`scripts/` directory**
   - **What it is:** Utility scripts (e.g., admin user creation)
   - **What to look for:** Files like `create-admin-user.js`
   - **Action:** Copy if you have custom scripts

---

## ✅ ALREADY PRESENT - No Need to Copy

These files are already in your project:
- `package.json` ✓
- `package-lock.json` ✓
- `vite.config.js` ✓
- `index.html` ✓
- `.gitignore` ✓
- `README.md` ✓
- `README-SETUP.md` ✓

---

## ❌ DO NOT COPY

These will be regenerated or reinstalled:
- `node_modules/` → Run `npm install` instead
- `dist/` → Run `npm run build` to regenerate
- `.env.local`, `.env.production` → Recreate `.env` manually if needed

---

## 📋 Setup Steps After Copying

1. **Copy all files** listed above to your new laptop
2. **Install dependencies:**
   ```bash
   cd /path/to/GoodWeePlace
   npm install
   ```
3. **Verify `.env` file exists** and has correct Supabase credentials
4. **Start the dev server:**
   ```bash
   npm run dev
   ```
5. **Open browser** to the URL shown in terminal (usually `http://localhost:5173`)

---

## ✅ Verification Checklist

After copying, verify you have:

- [ ] `src/` directory contains multiple component files (not just `App.jsx`)
- [ ] `.env` file exists in root directory with Supabase credentials
- [ ] `public/` directory with assets (if your app uses them)
- [ ] `supabase/migrations/` directory (if you manage migrations locally)
- [ ] `scripts/` directory (if you have custom scripts)

---

## 🚨 Common Issues

### Issue: "Development server is running!" but no actual site
**Solution:** The `src/` directory is missing or incomplete. Copy the full `src/` folder from old laptop.

### Issue: "Cannot find module" errors
**Solution:** Run `npm install` to reinstall dependencies.

### Issue: Supabase connection errors
**Solution:** Check `.env` file exists and has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Issue: Port already in use
**Solution:** Kill the process using the port, or change Vite port in `vite.config.js`.

---

## 📝 Notes

- The most critical missing piece is usually the **`src/` directory** with your actual application code
- The **`.env` file** is gitignored, so it must be copied manually or recreated
- Always run `npm install` on the new machine to ensure dependencies match your system
- If you're using Git, you could also pull from your repository instead of manually copying
