-- Add fulfilled_at column to record when a sticker request was fulfilled
ALTER TABLE sticker_requests ADD COLUMN fulfilled_at TIMESTAMP WITH TIME ZONE;
