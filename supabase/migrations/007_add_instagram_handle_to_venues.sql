-- Add instagram_handle field to venues table (optional, for tagging when sharing on Instagram)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS instagram_handle TEXT;
