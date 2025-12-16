-- Remove the permissive policy that still exposes all columns
DROP POLICY IF EXISTS "Public can view active porter basic info" ON public.members_porters;

-- Drop the view since it won't work with SECURITY INVOKER without public access to base table
DROP VIEW IF EXISTS public.public_porter_profiles;

-- Create a SECURITY DEFINER function that returns only non-sensitive porter data
CREATE OR REPLACE FUNCTION public.get_public_porter_profiles()
RETURNS TABLE (
  id uuid,
  full_name text,
  profile_photo_url text,
  region text,
  years_experience integer,
  certifications text[],
  average_rating numeric,
  total_ratings integer,
  membership_number text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    full_name,
    profile_photo_url,
    region,
    years_experience,
    certifications,
    average_rating,
    total_ratings,
    membership_number
  FROM public.members_porters
  WHERE status = 'active'
  ORDER BY average_rating DESC NULLS LAST;
$$;

-- Create a function to get a single porter's public profile by ID
CREATE OR REPLACE FUNCTION public.get_public_porter_profile(porter_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  profile_photo_url text,
  region text,
  years_experience integer,
  certifications text[],
  average_rating numeric,
  total_ratings integer,
  membership_number text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    full_name,
    profile_photo_url,
    region,
    years_experience,
    certifications,
    average_rating,
    total_ratings,
    membership_number
  FROM public.members_porters
  WHERE id = porter_id AND status = 'active';
$$;