# Good Wee Place

A website for a social enterprise helping trans and genderqueer people find safe spaces in Glasgow and beyond.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Run the migration files in order in your Supabase SQL editor:
     - `supabase/migrations/001_initial_schema.sql` (creates tables and basic policies)
     - `supabase/migrations/002_admin_policies.sql` (creates admin access policies)
   - Create two storage buckets in Supabase Storage:
     - `stickers` (set to public)
     - `logos` (set to public)
   - Set up authentication (email/password) in Supabase Auth
   - Create an admin user account through Supabase Auth (this will be used to access the admin dashboard)

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

## Features

- Interactive map showing approved venues
- Location registration for venues with stickers
- Sticker request form
- Brand endorsement system with approval workflow
- Admin dashboard for managing approvals

## Design

- Minimal black and white design
- Trans flag colors (#5BCEFA, #F5A9B8) used only for celebrations and accents
- Helvetica font throughout
- Confetti celebrations on successful actions

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```
