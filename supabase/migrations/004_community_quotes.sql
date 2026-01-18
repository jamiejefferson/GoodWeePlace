-- Create community_quotes table
CREATE TABLE IF NOT EXISTS community_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  nickname TEXT,
  instagram_handle TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE community_quotes ENABLE ROW LEVEL SECURITY;

-- Policies for community_quotes: anyone can read approved quotes, anyone can insert
CREATE POLICY "Anyone can view approved quotes" ON community_quotes
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert quotes" ON community_quotes
  FOR INSERT WITH CHECK (true);

-- Note: Admin policies for reading all quotes and updating/deleting should be created
-- in the admin policies migration (002_admin_policies.sql or a new migration)
