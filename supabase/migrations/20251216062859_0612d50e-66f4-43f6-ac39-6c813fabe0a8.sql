-- Fix security definer view issue by recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.public_porter_profiles;

CREATE VIEW public.public_porter_profiles 
WITH (security_invoker = true) AS
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

-- Re-grant public access to the view
GRANT SELECT ON public.public_porter_profiles TO anon, authenticated;

-- Add a policy on the base table to allow viewing through the view for active porters
CREATE POLICY "Public can view active porter basic info"
ON public.members_porters
FOR SELECT
USING (status = 'active');