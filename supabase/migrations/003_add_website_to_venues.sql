-- Add website field to venues table
ALTER TABLE venues ADD COLUMN IF NOT EXISTS website TEXT;

-- No policy changes needed - existing RLS policies cover all columns
