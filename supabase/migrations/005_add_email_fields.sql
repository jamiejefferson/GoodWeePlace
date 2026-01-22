-- Add email field to venues table
ALTER TABLE venues ADD COLUMN IF NOT EXISTS email TEXT;

-- Add email field to community_quotes table
ALTER TABLE community_quotes ADD COLUMN IF NOT EXISTS email TEXT;
