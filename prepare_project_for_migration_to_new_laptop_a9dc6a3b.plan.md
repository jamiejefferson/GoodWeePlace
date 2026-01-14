---
name: Prepare project for migration to new laptop
overview: Create a comprehensive migration guide and verify all critical files are documented for moving the Good Wee Place project to a new laptop, ensuring nothing is missed during the transfer.
todos:
  - id: create-env-example
    content: Create .env.example template file showing required environment variables
    status: pending
  - id: create-migration-guide
    content: Create comprehensive MIGRATION-GUIDE.md with step-by-step instructions
    status: pending
  - id: verify-project-structure
    content: Verify all critical directories and files are present and documented
    status: pending
---

## Overview

Prepare the Good Wee Place project for migration to a new laptop by documenting all critical files, setup steps, and verification procedures.

## Current Project Structure Analysis

Based on the project structure, here's what exists:

### Critical Files/Directories Present:

- `src/` - Complete React application with all components, pages, hooks, utils, and styles
- `public/` - Contains `target.png`, `GWPSticker.png`, `Sticker.svg`
- `supabase/migrations/` - Contains 3 migration files (001, 002, 003)
- `scripts/` - Contains `create-admin-user.js`
- `package.json` and `package-lock.json` - Dependencies defined
- `vite.config.js` - Build configuration
- `.gitignore` - Properly configured (excludes `.env`, `node_modules`, `dist`)

### Files That Need Manual Setup:

- `.env` - Gitignored, must be recreated on new laptop with Supabase credentials

## Migration Plan

### Phase 1: Document Current State

1. **Create migration package list** - Document exact files/directories to copy
2. **Create .env template** - Document required environment variables without exposing secrets
3. **Verify all critical files exist** - Ensure nothing is missing

### Phase 2: Create Migration Guide

1. **Step-by-step copy instructions** - What to copy from old laptop
2. **Step-by-step setup instructions** - What to do on new laptop
3. **Verification checklist** - How to confirm everything works

### Phase 3: Create Helper Files (Optional)

1. **.env.example** - Template showing required variables (without actual secrets)
2. **MIGRATION-GUIDE.md** - Comprehensive step-by-step guide

## Files to Create/Update

1. **`.env.example`** - Template file showing required environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **`MIGRATION-GUIDE.md`** - Comprehensive migration guide with:

   - Exact file list to copy
   - Setup steps for new laptop
   - Verification procedures
   - Troubleshooting section

## Copy Checklist (for user reference)

### Must Copy:

- [ ] `src/` (entire directory)
- [ ] `.env` (from old laptop root)
- [ ] `public/` (entire directory)
- [ ] `supabase/migrations/` (entire directory)
- [ ] `scripts/` (entire directory)

### Already in Git (no need to copy):

- `package.json`
- `package-lock.json`
- `vite.config.js`
- `index.html`
- `.gitignore`
- `README.md`
- `README-SETUP.md`
- `MIGRATION-CHECKLIST.md`

### Will be regenerated:

- `node_modules/` → Run `npm install`
- `dist/` → Run `npm run build` (if needed)

## Setup Steps for New Laptop

1. Copy all files from checklist
2. Run `npm install`
3. Create `.env` file with Supabase credentials
4. Run `npm run create-admin` (if needed)
5. Run `npm run dev`
6. Verify app loads and connects to Supabase