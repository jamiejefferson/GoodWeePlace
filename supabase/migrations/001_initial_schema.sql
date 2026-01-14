-- Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  sticker_photo_url TEXT,
  description TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sticker_requests table
CREATE TABLE IF NOT EXISTS sticker_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'fulfilled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create endorsements table
CREATE TABLE IF NOT EXISTS endorsements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticker_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

-- Policies for venues: anyone can read approved venues, anyone can insert
CREATE POLICY "Anyone can view approved venues" ON venues
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert venues" ON venues
  FOR INSERT WITH CHECK (true);

-- Policies for sticker_requests: anyone can insert, only admins can read
CREATE POLICY "Anyone can insert sticker requests" ON sticker_requests
  FOR INSERT WITH CHECK (true);

-- Policies for endorsements: anyone can read approved endorsements, anyone can insert
CREATE POLICY "Anyone can view approved endorsements" ON endorsements
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert endorsements" ON endorsements
  FOR INSERT WITH CHECK (true);

-- Note: Admin policies for reading all data and updating approvals should be created
-- through Supabase dashboard or via authenticated user policies
-- For now, these basic policies allow public read of approved items and public insert
