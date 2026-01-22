-- Add delete policy for sticker requests
-- This allows authenticated admin users to delete sticker requests

CREATE POLICY "Admins can delete sticker requests" ON sticker_requests
  FOR DELETE
  TO authenticated
  USING (true);
