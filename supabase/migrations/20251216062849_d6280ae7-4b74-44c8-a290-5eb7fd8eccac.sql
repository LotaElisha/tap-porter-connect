-- Create a secure view that only exposes non-sensitive porter information
CREATE OR REPLACE VIEW public.public_porter_profiles AS
SELECT 
  id,
  full_name,
  profile_photo_url,
  region,
  years_experience,
  certifications,
  average_rating,
  total_ratings,
  membership_number,
  status
FROM public.members_porters
WHERE status = 'active';

-- Grant public access to the view
GRANT SELECT ON public.public_porter_profiles TO anon, authenticated;

-- Remove the overly permissive public SELECT policy on the base table
DROP POLICY IF EXISTS "Anyone can view active porters" ON public.members_porters;

-- Create a more restrictive policy - only the porter themselves can view their full record
CREATE POLICY "Porters can view own full profile"
ON public.members_porters
FOR SELECT
USING (auth.uid() = user_id);