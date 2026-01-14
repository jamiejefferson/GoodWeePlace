-- Admin policies for managing venues, endorsements, and sticker requests
-- These policies allow authenticated admin users to read and update all records

-- Admin can read all venues (approved and unapproved)
CREATE POLICY "Admins can read all venues" ON venues
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin can update venues (for approval)
CREATE POLICY "Admins can update venues" ON venues
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete venues (for rejection)
CREATE POLICY "Admins can delete venues" ON venues
  FOR DELETE
  TO authenticated
  USING (true);

-- Admin can read all sticker requests
CREATE POLICY "Admins can read all sticker requests" ON sticker_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin can update sticker requests (for status changes)
CREATE POLICY "Admins can update sticker requests" ON sticker_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can read all endorsements (approved and unapproved)
CREATE POLICY "Admins can read all endorsements" ON endorsements
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin can update endorsements (for approval)
CREATE POLICY "Admins can update endorsements" ON endorsements
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete endorsements (for rejection)
CREATE POLICY "Admins can delete endorsements" ON endorsements
  FOR DELETE
  TO authenticated
  USING (true);

-- Note: After running this migration, you'll need to create admin users in Supabase Auth
-- and ensure they have the 'authenticated' role. You can do this through the Supabase dashboard.
